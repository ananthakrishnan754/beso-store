// Veo 3 hero background video generator for BESO Store.
//
// Generates 4 themed hero clips (text-to-video) via the Google Gemini REST API
// and writes WebM (primary) + MP4 (fallback) into public/assets/videos/.
//
// Usage:
//   GEMINI_API_KEY=... node scripts/generate-hero-videos.mjs [--only night-luxe]
//
// Cost/time note: each clip is a paid Veo 3 generation (~1§-2§, several minutes
// each). Run with --only <theme> to generate a single clip.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile, rm, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.VEO_MODEL || 'veo-3.0-generate-001';
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models';
const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../public/assets/videos');
const FFMPEG = process.env.FFMPEG_PATH || 'ffmpeg';

const JOBS = [
  {
    key: 'night-luxe',
    file: 'hero-bg',
    prompt:
      'A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a minimalist dark luxury room. Deep slate-black walls, soft volumetric key light raking across breathable mesh, polished chrome base and ergonomic curves; subtle ambient green rim light tracing the silhouette. Camera glides slowly around the chair. Total darkness pool at the floor, high-contrast, moody. Seamless loop, photorealistic, 8k, 60fps.',
  },
  {
    key: 'ivory-minimal',
    file: 'hero-bg-ivory',
    prompt:
      'A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a bright, airy minimalist room. Warm ivory linen walls and floor, soft diffused morning daylight flooding in, gentle soft shadows, airy negative space. Chair in matte black and warm greige upholstery. Low contrast, calm, clean, hotel-lounge feel. Seamless loop, photorealistic, 8k, 60fps.',
  },
  {
    key: 'walnut-midcentury',
    file: 'hero-bg-walnut',
    prompt:
      'A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a warm mid-century room. Cream walls, walnut wood paneling and furniture accents, terrazzo floor. Golden-hour light with burnt-orange and amber rim glow wrapping the chair edges. Warm, rich, premium vintage-moderne mood. Seamless loop, photorealistic, 8k, 60fps.',
  },
  {
    key: 'industrial-loft',
    file: 'hero-bg-loft',
    prompt:
      'A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a dark industrial loft. Raw charcoal concrete walls, exposed steel beams, utility amber sodium lighting casting deep hard shadows, faint fog at the floor. Chair accents in black leather and brushed metal. Gritty, high-drama, editorial. Seamless loop, photorealistic, 8k, 60fps.',
  },
];

const only = process.argv.indexOf('--only');
const onlyKeys = only !== -1 ? process.argv[only + 1].split(',') : null;
const jobs = onlyKeys
  ? JOBS.filter((j) => onlyKeys.includes(j.key))
  : JOBS;

async function jsonFetch(url, options = {}) {
  const res = await fetch(url, options);
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${typeof body === 'string' ? body : JSON.stringify(body)}`);
  }
  return body;
}

async function generateClip(job) {
  console.log(`\n▶ ${job.key}: submitting prompt to ${MODEL}`);
  const op = await jsonFetch(`${BASE}/${MODEL}:predictLongRunning`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      instances: [{ prompt: job.prompt }],
      parameters: {
        aspectRatio: '16:9',
        resolution: '720p',
        durationSeconds: 8,
        excerptLengthSeconds: 1,
      },
    }),
  });
  console.log(`  operation: ${op.name}`);

  let result;
  for (;;) {
    const poll = await jsonFetch(`${BASE}/${op.name}`, {
      headers: { 'x-goog-api-key': API_KEY },
    });
    if (poll.done) {
      if (poll.error) throw new Error(`generation failed: ${JSON.stringify(poll.error)}`);
      result = poll.response;
      break;
    }
    if (poll.metadata?.progressPercent != null) {
      process.stdout.write(`  progress: ${poll.metadata.progressPercent}%\r`);
    } else {
      process.stdout.write('  waiting…\r');
    }
    await new Promise((r) => setTimeout(r, 10000));
  }

  const part = result?.generatedVideos?.[0] ?? result?.contents?.[0]?.parts?.[0];
  const uri = part?.video?.uri ?? part?.videoMetadata?.src ?? part?.uri;
  if (!uri) {
    throw new Error(`no video URI in response: ${JSON.stringify(result).slice(0, 500)}`);
  }
  console.log(`  got video: ${uri}`);

  const mp4 = resolve(OUT_DIR, `${job.file}.mp4`);
  const webm = resolve(OUT_DIR, `${job.file}.webm`);

  const res = await fetch(uri);
  if (!res.ok) throw new Error(`download failed: HTTP ${res.status}`);
  await rm(mp4, { force: true }).catch(() => {});
  await rm(webm, { force: true }).catch(() => {});
  await writeFile(mp4, Buffer.from(await res.arrayBuffer()));
  console.log(`  saved mp4: ${mp4}`);

  try {
    execFileSync(FFMPEG, ['-y', '-i', mp4, '-c:v', 'libvpx-vp9', '-crf', '32', '-b:v', '0', webm], {
      stdio: 'pipe',
    });
    console.log(`  saved webm: ${webm}`);
  } catch (e) {
    console.warn(`  warning: webm transcode skipped (${e.message})`);
  }
}

if (!API_KEY) {
  console.error(
    'No GEMINI_API_KEY found. Set it, e.g.\n' +
      '  GEMINI_API_KEY=AIza... node scripts/generate-hero-videos.mjs\n' +
      '(or generate clips in Google AI Studio / Veo UI and drop them into public/assets/videos/hero-bg-*.mp4/.webm).'
  );
  process.exit(1);
}

if (jobs.length === 0) {
  console.error('no jobs matched --only value');
  process.exit(1);
}

await mkdir(OUT_DIR, { recursive: true });
for (const job of jobs) {
  await generateClip(job);
}
console.log('\nDone. Deploy assets & reload to see the themed hero clips.');