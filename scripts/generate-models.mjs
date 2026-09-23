/**
 * Procedural CAD-style product model generator (no AI, no external runtime deps).
 * Builds clean PBR-material GLB furniture from Three.js primitives.
 *
 * Usage: node scripts/generate-models.mjs            (all products)
 *        node scripts/generate-models.mjs --only beso-crown-executive-chair
 * Output: public/assets/models/products/<slug>.glb
 */
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import {
  BoxGeometry, CylinderGeometry, CapsuleGeometry, TorusGeometry,
  Mesh, MeshStandardMaterial, Group, Scene, MathUtils, Color
} from 'three';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import products from '../src/data/products.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const rad = (d) => MathUtils.degToRad(d);
const OUT = join(__dirname, '../public/assets/models/products');
mkdirSync(OUT, { recursive: true });

// ─── color/material helpers ─────────────────────────────────────────────────
function rgb(r, g, b) { return new Color(r / 255, g / 255, b / 255); }
function mat(color, { rough = 0.7, metal = 0 } = {}) {
  return new MeshStandardMaterial({ color, roughness: rough, metalness: metal });
}
const fab = (c) => mat(c, { rough: 0.93 });
const pu = (c) => mat(c, { rough: 0.5, metal: 0.02 });
const chrome = () => mat(rgb(224, 224, 228), { rough: 0.28, metal: 0.95 });
const brushed = () => mat(rgb(196, 198, 204), { rough: 0.42, metal: 0.85 });
const woodMat = (c) => mat(c, { rough: 0.42 });
const rubber = () => mat(rgb(24, 24, 26), { rough: 0.75 });

// ─── subcategory palettes (premium, consistent catalog) ─────────────────────
const PALETTES = {
  'executive-chair': { uph: rgb(26, 26, 30), accent: 'chrome', arms: 'matte' },
  'manager-chair': { uph: rgb(56, 58, 62), accent: 'chrome', arms: 'fabric' },
  'staff-chair': { uph: rgb(44, 46, 50), accent: 'chrome', arms: 'none' },
  'visitor-chair': { uph: rgb(82, 88, 96), accent: 'brushed', arms: 'curved' },
  'gaming-chair': { uph: rgb(34, 36, 44), accent: 'brushed', arms: 'padded' },
  'dining-chair': { uph: rgb(196, 178, 154), accent: 'walnut', arms: 'none' },
  'bar-stool': { uph: rgb(172, 152, 134), accent: 'chrome', arms: 'none' },
  'executive-table': { top: 'walnut', frame: 'gray' },
  'manager-table': { top: 'oak', frame: 'gray' },
  'staff-table': { top: 'lightoak', frame: 'light' },
  'center-table': { top: 'marble', frame: 'brass' },
  'height-adjustable-table': { top: 'walnut', frame: 'white' },
  sofa: { uph: rgb(102, 108, 118), frame: 'wood' },
};

const WOODS = {
  walnut: rgb(122, 82, 46),
  oak: rgb(196, 152, 92),
  lightoak: rgb(222, 196, 148),
  marble: rgb(234, 232, 228),
};
const FRAMES = {
  gray: rgb(120, 122, 128),
  light: rgb(196, 198, 202),
  brass: rgb(186, 152, 96),
  white: rgb(236, 238, 240),
};
const ACCENTS = { chrome, brushed };
const LEGWOOD = rgb(96, 64, 38);

// ─── geometry prims ─────────────────────────────────────────────────────────
const box = (w, h, d, m, x = 0, y = 0, z = 0) => {
  const o = new Mesh(new BoxGeometry(w, h, d), m);
  o.position.set(x, y, z);
  return o;
};
const cyl = (rt, rb, h, m, x = 0, y = 0, z = 0, ...rot) => {
  const o = new Mesh(new CylinderGeometry(rt, rb, h, 28), m);
  o.position.set(x, y, z);
  if (rot[0]) o.rotation.x = rot[0];
  if (rot[1]) o.rotation.y = rot[1];
  if (rot[2]) o.rotation.z = rot[2];
  return o;
};
const cap = (r, len, m, x = 0, y = 0, z = 0, rx = 0, rz = 0) => {
  const o = new Mesh(new CapsuleGeometry(r, len, 6, 16), m);
  o.position.set(x, y, z);
  o.rotation.x = rx;
  o.rotation.z = rz;
  return o;
};

// ─── base + 5-star lift (shared by task chairs) ─────────────────────────────
function chairBase({ withArms = false } = {}) {
  const g = new Group();
  const star = chrome();
  const hub = cyl(3.2, 4.4, 2.6, star, 0, 1.3, 0);
  g.add(hub);
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    g.add(cyl(0.62, 0.62, 14.5, star, Math.cos(a) * 6, 1.3, Math.sin(a) * 6, 0, 0, rad(90)));
    const wheel = cyl(1.6, 1.6, 2.6, rubber(), Math.cos(a) * 14, 0.25, Math.sin(a) * 14, rad(90));
    g.add(wheel);
  }
  const lift = cyl(1.25, 1.25, 7.5, brushed(), 0, 4.9, 0);
  g.add(lift);
  return g;
}

function chairBack(uph, { h, tilt = 0, width = 18, topPad = false }) {
  const g = new Group();
  const shell = new Mesh(new BoxGeometry(width, h, 3.6), fab(uph));
  shell.position.set(0, 0, 0);
  g.add(shell);
  if (h > 20) {
    // headrest bump for tall backs
    const hr = new Mesh(new CapsuleGeometry(3.4, 4.5, 8, 14), fab(uph));
    hr.rotation.x = rad(90);
    hr.position.set(0, h / 2 + 2.2, 1.2);
    g.add(hr);
  }
  // lumbar pad
  g.add(box(width * 0.8, 3.4, 1.6, fab(uph), 0, -h / 2 + 4.5, 0.6));
  g.rotation.x = tilt;
  return g;
}

function addArms(g, uph, { x = 8, y = 12.5, len = 9, top = 1.6 } = {}) {
  const arm = mat(uph, { rough: 0.6 });
  for (const s of [-1, 1]) {
    // vertical post
    g.add(cyl(1.1, 1.1, 12, chrome(), s * x, y + 3, 1.5));
    // arm pad
    g.add(cap(1.7, len, arm, s * x, y + 10, 0, 0, 0));
  }
}

function buildTaskChair(color, { backH = 16, arms = 'fabric' } = {}) {
  const g = new Group();
  g.add(chairBase());
  const seat = box(20, 5.5, 19, fab(color), 0, 10.8, 1.5);
  g.add(seat);
  // back
  const backG = chairBack(color, { h: backH, tilt: -0.12, topPad: backH > 20 });
  backG.position.set(0, 11.8 + backH / 2, -8.3);
  g.add(backG);
  if (arms === 'fabric') {
    for (const s of [-1, 1]) {
      g.add(cyl(1.1, 1.1, 11, chrome(), s * 9.5, 13.5, 1));
      g.add(cap(1.7, 8, pu(color), s * 9.5, 19.4, 0.4));
    }
  } else if (arms === 'matte') {
    for (const s of [-1, 1]) {
      g.add(cyl(1.0, 1.0, 12, chrome(), s * 9, 13.5, 1.2));
      g.add(cap(1.7, 8, mat(rgb(30, 30, 34), { rough: 0.6 }), s * 9, 19.2, 0.8));
    }
  }
  return g;
}

function buildVisitorChair(color) {
  const g = new Group();
  // steel sled/tubular frame
  const fr = chrome();
  for (const s of [-1, 1]) {
    g.add(cyl(1.2, 1.2, 26, fr, s * 9, 13, -1.5));
    // runner
    g.add(cyl(1.2, 1.2, 20, fr, s * 9, 1, -1.5, 0, 0, 0));
  }
  g.add(box(19, 5, 17, pu(color), 0, 26.5, 0));
  const backG = chairBack(color, { h: 16, tilt: -0.1 });
  backG.position.set(0, 26.5 + 8, -8);
  g.add(backG);
  return g;
}

function buildGamingChair(color) {
  const g = buildTaskChair(color, { backH: 22, arms: 'padded' });
  // bucket side bolsters
  const uphMat = fab(color);
  for (const s of [-1, 1]) {
    const bolster = box(3.4, 13, 9, uphMat, s * 10.5, 14.5, -4.5);
    g.add(bolster);
  }
  // accent stripe on seat front
  g.add(box(20.5, 0.9, 1.6, mat(rgb(220, 60, 60), { rough: 0.7 }), 0, 11.4, 9.2));
  return g;
}

function buildDiningChair(color) {
  const g = new Group();
  const leg = LEGWOOD;
  const legGeo = new BoxGeometry(2.4, 30, 2.4);
  for (const [x, z] of [[-8, -7], [8, -7], [-8, 7], [8, 7]]) {
    const l = new Mesh(legGeo, woodMat(leg));
    l.position.set(x, 15, z);
    g.add(l);
  }
  g.add(box(19, 4.4, 17, pu(color), 0, 30.5, 0));
  // back frame
  g.add(box(19, 3, 3, woodMat(leg), 0, 45, -8.5));
  for (let i = 0; i < 3; i++) {
    g.add(box(16.5, 2.6, 1.4, pu(color), 0, 41 - i * 4.5, -8.5));
  }
  return g;
}

function buildBarStool(color) {
  const g = new Group();
  const star = chrome();
  const ringMat = shinyMetal();
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
    g.add(cyl(1.3, 1.3, 56, star, Math.cos(a) * 9.5, 28, Math.sin(a) * 9.5, Math.cos(a) * 0.14, 0, -Math.sin(a) * 0.14));
    g.add(cyl(1.3, 1.3, 14, star, Math.cos(a) * 11, 26, Math.sin(a) * 11));
  }
  // footring
  const ring = new Mesh(new TorusGeometry(10.5, 1.2, 12, 28), ringMat);
  ring.rotation.x = rad(90);
  ring.position.y = 30;
  g.add(ring);
  g.add(box(19, 4.6, 18, pu(color), 0, 55.5, 0));
  return g;
}

function shinyMetal() {
  return mat(rgb(212, 214, 220), { rough: 0.3, metal: 0.9 });
}

function buildTable({ top: topC, frame: frameC }, { round = false, post = false } = {}) {
  const g = new Group();
  const topM = marbleMat(topC);
  const topM2 = woodMat(topC);
  const frM = mat(frameC, { metal: 0.75, rough: 0.35 });
  const topGeo = round ? new CylinderGeometry(26, 26, 3.4, 56) : new BoxGeometry(52, 3.4, 26);
  const topMesh = new Mesh(topGeo, round ? topM : topM2);
  topMesh.position.y = 54;
  g.add(topMesh);
  if (!round) {
    for (const s of [-1, 1]) {
      g.add(box(2.6, 50, 16, frM, s * 17, 27, 0));
      g.add(box(17, 2.6, 16, frM, 0, 3, 0));
    }
  } else if (post) {
    g.add(cyl(3.2, 4.5, 54, frM, 0, 27, 0));
  }
  return g;
}

function marbleMat(c) { return mat(c, { rough: 0.12, metal: 0 }); }

function buildHeightTable({ top: topC, frame: frameC }) {
  const g = buildTable({ top: topC, frame: frameC });
  // control panel on front edge
  const ctl = box(6, 2, 0.8, mat(rgb(30, 30, 34), { rough: 0.5 }), 0, 55, 13.6);
  g.add(ctl);
  for (const s of [-1, 1]) {
    // telescoping legs
    g.add(cyl(2.6, 2.6, 46, chrome(), s * 17, 27, 0));
  }
  return g;
}

function buildSofa(color) {
  const g = new Group();
  const sM = fab(color);
  g.add(box(60, 10, 26, sM, 0, 10, 0));
  g.add(box(57, 7, 23, sM, 0, 18.5, 0));
  g.add(box(60, 16, 7, sM, 0, 30, -9));
  for (const s of [-1, 1]) g.add(box(5.5, 15, 23, sM, s * 27, 24, 0));
  for (const [x, z] of [[-26, -10], [26, -10], [-26, 10], [26, 10]]) {
    g.add(cyl(1.8, 1.8, 6, woodMat(LEGWOOD), x, 3, z));
  }
  return g;
}

// ─── dispatch ───────────────────────────────────────────────────────────────
const build = {
  'executive-chair': (p) => buildTaskChair(PALETTES['executive-chair'].uph, { backH: 20, arms: 'matte' }),
  'manager-chair': (p) => buildTaskChair(PALETTES['manager-chair'].uph, { backH: 16, arms: 'fabric' }),
  'staff-chair': (p) => buildTaskChair(PALETTES['staff-chair'].uph, { backH: 13, arms: 'none' }),
  'visitor-chair': (p) => buildVisitorChair(PALETTES['visitor-chair'].uph),
  'gaming-chair': (p) => buildGamingChair(PALETTES['gaming-chair'].uph),
  'dining-chair': (p) => buildDiningChair(PALETTES['dining-chair'].uph),
  'bar-stool': (p) => buildBarStool(PALETTES['bar-stool'].uph),
  'executive-table': (p) => buildTable(PALETTES['executive-table']),
  'manager-table': (p) => buildTable(PALETTES['manager-table']),
  'staff-table': (p) => buildTable(PALETTES['staff-table']),
  'center-table': (p) => buildTable(PALETTES['center-table'], { round: true, post: true }),
  'height-adjustable-table': (p) => buildHeightTable(PALETTES['height-adjustable-table']),
  sofa: (p) => buildSofa(PALETTES['sofa'].uph),
};

// ─── export ─────────────────────────────────────────────────────────────────
// Node 24 lacks FileReader, which GLTFExporter's GLB path needs; polyfill it.
globalThis.FileReader = class FileReader {
  constructor() {
    this.onloadend = null;
  }
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

const exportGLB = (scene) =>
  new Promise((res, rej) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (result) => {
        // binary:true yields a Uint8Array (read via FileReader polyfill)
        res(Buffer.from(result));
      },
      rej,
      { binary: true, onlyVisible: true }
    );
  });

const onlySlug = process.argv.find((a) => a.startsWith('--only='))?.split('=')[1];
let count = 0;
for (const p of products) {
  if (onlySlug && p.slug !== onlySlug) continue;
  const builder = build[p.subcategory];
  if (!builder) {
    console.error(`SKIP ${p.slug} (no builder for ${p.subcategory})`);
    continue;
  }
  const scene = new Scene();
  const g = builder(p);
  g.rotation.y = rad(-115);
  scene.add(g);
  const glb = await exportGLB(scene);
  const outPath = join(OUT, `${p.slug}.glb`);
  writeFileSync(outPath, glb);
  count++;
  console.log(`ok ${p.slug} [${p.subcategory}] ${(glb.length / 1024).toFixed(0)}KB`);
}
console.log(`\n${count} models → public/assets/models/products/`);