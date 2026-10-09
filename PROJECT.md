# BESO Store — switchable home-page concepts

Internal project map: what this is, where every design file lives, and how to
run/review it. The production home ("Current") is untouched; the concepts are
alternative landing directions for the client to choose from.

- **App:** Next.js 14 (App Router) + TypeScript + Tailwind — `beso-store/`
- **Live:** https://beso-store-v2.vercel.app (Vercel project `beso-store-v2`, auto-deploy from `main`)
- **Local:** `http://localhost:3001` (see “Run” below)

---

## 1. How the switcher works

| File | Role |
|---|---|
| `src/app/page.tsx` | Thin shell: renders `<DesignShell current={<CurrentHome/>} />` |
| `src/components/designs/DesignShell.tsx` | Reads `?design=N` (sessionStorage fallback), lazy-loads the concept; sets `html[data-design-mode]` |
| `src/components/designs/DesignSwitcher.tsx` | Bottom-left review rail (Current + concepts); `[`/`]` step, `0–9` jump |
| `src/components/designs/registry.ts` | **The list of concepts.** Add `{ n, folder, name, tag }` to surface one |
| `src/components/designs/current-home.tsx` | The untouched production home (rendered as “Current”) |

Concept previews hide the shared site header/footer via
`html[data-design-mode='1']` (see `src/app/globals.css`), so each reads as its
own build. `?design=N` selection is shareable; mode/two-mode concept also uses
`?mode=home`.

---

## 2. Concept file locations

All under `src/components/designs/`. Each concept is one folder with `index.tsx`.

| # | Name | Folder | Tag | Reference | Spec |
|---|---|---|---|---|---|
| 1 | Atelier | `d01-atelier/` | Warm editorial | Fritz Hansen, Cassina, Hem | `docs/specs/01-atelier.md` |
| 2 | Monolith | `d02-monolith/` | Dark sculptural | Poltrona Frau, Minimal Gallery, Wilkhahn | `docs/specs/02-monolith.md` |
| 3 | Anatomy | `d03-anatomy/` | Engineering spec | Apple (MacBook Pro), Wilkhahn, Humanscale | `docs/specs/03-anatomy.md` |
| 4 | Two Modes | `d04-twomodes/` | Office / Home switch | wanderhotels.com | `docs/teardown/01-wanderhotels.md` |
| 5 | Atelier Pro | `d05-atelier-pro/` | Architectural B2B | ceragres.ca | `docs/teardown/02-ceragres.md` |
| 6 | Archive | `d06-archive/` | Editorial wall | beyondmedals.com | `docs/teardown/03-beyondmedals.md` |

Open any concept: `/?design=1` … `/?design=6` (4 also supports `&mode=home`).

### Per-concept notes
- **1 Atelier** — warm bone palette (`#F7F3EC`), Fraunces display + Inter; hero video, sticky
  chair section, materials, index trio, workplaces, reviews, AR. Assets: `public/assets/images/d01-hero.jpg`.
- **2 Monolith** — obsidian stage (`#0E0D0C`), Cormorant display; spotlight hero, object study,
  dark gallery, AR. Assets: `public/assets/images/d02-hero.jpg`, `d02-crown.jpg`, `d02-flexrise.jpg`.
- **3 Anatomy** — near-black stage (`#101112`), Space Grotesk, signal `#D9541E`; dossier hero,
  pinned build, spec table, home/commercial routing.
- **4 Two Modes** — OFFICE/HOME switch (crossfade + clip-path wipe), personalisation, 8 tiles,
  carousel, scroll-linked height-gauge dial, panels, six reasons, stacked footer. Videos:
  `public/assets/videos/mode-office.*`, `mode-home.*`.
- **5 Atelier Pro** — stone `#FAFAFA`, brass `#8A6A3B`, Cormorant; promo-as-hero, mega-menu with
  preview swap, Workspaces index, Offer rows (real counts), pinned materials, BESO Pro, newsletter
  audience selector. Assets: `public/assets/images/d05-hero.jpg`, `public/assets/videos/d05-hero.*`.
- **6 Archive** — streetwear-store modules applied to furniture; warm white `#FFFDFA`, ink
  `#141313`, accent `#2A4EEF`, grotesk headings + mono body. Announcement bar, 3-zone nav,
  2-up hero video, video module, staggered catalogue, editorial break, gallery index, stacked footer.
  Videos: `public/assets/videos/bm/{light-crown,dark-prestige,walnut-flexrise,studio-desk,mesh-crown}.*`

---

## 3. Assets

| Path | What |
|---|---|
| `public/assets/images/products/` | 79 real BESO product photos (shared across the site) |
| `public/assets/images/d01-hero.jpg`, `d02-hero.jpg`, `d02-crown.jpg`, `d02-flexrise.jpg`, `d05-hero.jpg` | Concept hero/product stills (generated, interim) |
| `public/assets/images/editorial-hero.jpg`, `editorial-workspace.jpg` | Editorial interiors |
| `public/assets/videos/hero-bg*.{webm,mp4}` | Hero clips (Current home uses `hero-bg-ivory`) |
| `public/assets/videos/mode-*.{webm,mp4}` | Two Modes hero clips (+ posters) |
| `public/assets/videos/d05-hero.*` | Atelier Pro hero clip |
| `public/assets/videos/bm/*.{webm,mp4}` | Archive portrait clips (+ posters) |
| `public/assets/models/products/*.glb` | Procedural 3D product models (AR / 3D viewer) |

Videos are generative/ffmpeg **interim** assets — swappable for BESO’s real media.

---

## 4. Docs index (`docs/`)

| File | Purpose |
|---|---|
| `postmortem.md` | Why the first pass was scrapped + rebuild rules |
| `refs/` | 31 opened reference sites + screenshots + Gemini notes |
| `specs/01..03.md`, `specs/README.md` | Per-concept build specs (grid, type, palette, motion) |
| `teardown/01..03.md` (+ `wander/`, `ceragres/`, `beyondmedals/`) | Reference teardowns |
| `review-log.md` | Quality-gate scores per concept |
| `pitch.md` | 2-line pitch + scores + recommendation |
| `content-gaps.md` | Every unverified/placeholder item (do not invent data) |
| `client/` | Client-facing: status, requirements, mediator brief, README |
| `gate/d1..d6/` | Gate screenshots per concept |
| `postmortem-shots/` | First-pass evidence |

Binary reference study for the Beyond Medals teardown lives in `./teardown/`
(repo root, **gitignored**, ~33MB: `structure.json/md`, `tokens.json`,
`animations.json`, `media.json`, `hover.json`, 68 scroll screenshots,
`scroll-desktop.webm`, `scroll-mobile.webm`).

---

## 5. Run / verify

```bash
cd beso-store
npm install
npm run build
# start (port 3001; port 3000 is reserved for other tooling)
kill -9 $(ss -ltnp | grep ':3001' | grep -oP 'pid=\K[0-9]+') 2>/dev/null
(setsid nohup env PORT=3001 npm start > nohup.out 2>&1 < /dev/null &)
# open http://localhost:3001  → bottom-left switcher, or ?design=1..6
```

`next start` only serves static files present at startup — **rebuild + restart**
after adding anything under `public/` or it 404s.

---

## 6. Quality gate (summary)

Per concept: screenshots at 390/768/1440, Gemini strict scorecard, objective
checks. Full detail in `docs/review-log.md`.

| Design | craft | typography | imagery | brand | mobile | originality* |
|---|---|---|---|---|---|---|
| 01 Atelier | 8.5 | 8.0 | 8.5 | 7.5 | 7.8 | 7.0 |
| 02 Monolith | 8.0 | 8.0 | 9.0 | 8.0 | 8.0 | 7.0 |
| 03 Anatomy | 8.5 | 8.5 | 8.5 | 8.0 | 8.5 | 6.0–8.5 |

\* Originality is the swing axis (Gemini benchmarks against Awwwards SOTD sites).
Objective: all pass (CLS ≤ 0.001 on early concepts; ~0.095 on 05/06), no console
errors, no horizontal overflow, all images load, keyboard-accessible switcher, AA contrast.

---

## 7. Content gaps (do not invent)

See `docs/content-gaps.md`. Highlights: testimonials, founding year, warranty,
dispatch SLA, bulk discount %, BESO Pro facilities, engineering specs, and all
generated media are **unverified / interim** and need client confirmation.

---

## 8. Git / branches

- `main` → deploys production (Current home + concepts in the switcher).
- `archive/first-pass-concepts` → the original rejected 10-concept pass (kept, not deleted).
- Tags: `pre-premium-v2` (2026-09-29), `backup-landing-20261007-114253`, `backup-3d-premium-20261004-213050`, `pre-premium-refresh`.
