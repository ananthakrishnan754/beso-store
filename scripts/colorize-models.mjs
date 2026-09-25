#!/usr/bin/env node
/**
 * colorize-models.mjs — inject metallic-roughness materials (base color) into
 * the detailed shape GLBs so they render with colour instead of flat grey.
 *
 * The Hunyuan shape meshes are single-primitive POSITION-only GLBs. We add a
 * materials array with a subcategory-tuned baseColor and point the mesh at it,
 * then re-serialize as a binary GLB (padding the BIN chunk to 4 bytes).
 *
 * Usage: node scripts/colorize-models.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import products from '../src/data/products.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));
const MODELS = join(__dirname, '../public/assets/models/products');

// Subcategory colour (upholstery/top). Values are [r,g,b], 0..255.
const PALETTES = {
  'executive-chair': [32, 32, 36],        // matte black
  'manager-chair': [58, 60, 65],          // dark grey
  'staff-chair': [48, 50, 55],            // charcoal
  'visitor-chair': [86, 92, 100],         // slate
  'gaming-chair': [40, 42, 52],           // graphite-racing
  'dining-chair': [196, 178, 154],        // greige
  'bar-stool': [190, 168, 146],           // taupe
  'executive-table': [122, 82, 46],       // walnut
  'manager-table': [166, 128, 80],        // oak
  'staff-table': [208, 176, 128],         // light oak
  'center-table': [214, 210, 204],        // marble
  'height-adjustable-table': [122, 82, 46], // walnut
  sofa: [104, 110, 120],                 // slate-sofa
};

function pad4(buf) {
  const pad = (4 - (buf.length % 4)) % 4;
  return pad ? Buffer.concat([buf, Buffer.alloc(pad)]) : buf;
}

function injectMaterial(glb, hex) {
  let gltf;
  const binParts = [];
  let off = 12;
  while (off < glb.length) {
    const length = glb.readUInt32LE(off);
    const type = glb.readUInt32LE(off + 4);
    const data = glb.subarray(off + 8, off + 8 + length);
    if (type === 0x4E4F534A) gltf = JSON.parse(data.toString('utf8'));
    else binParts.push(data);
    off += 8 + length;
  }
  if (!gltf) throw new Error('no glTF JSON chunk');

  // Base color material
  const factor = hex.map((v) => v / 255);
  const material = {
    name: 'beso-color',
    pbrMetallicRoughness: {
      baseColorFactor: [...factor, 1],
      metallicFactor: 0.05,
      roughnessFactor: 0.7,
    },
    doubleSided: true,
  };
  gltf.materials = [material];

  // Point every primitive at the material
  for (const mesh of gltf.meshes || []) {
    for (const prim of mesh.primitives || []) {
      prim.material = 0;
    }
  }

  const jsonBuf = Buffer.from(JSON.stringify(gltf), 'utf8');
  // Rebuild GLB with padding on both JSON and BIN
  const jsonPadded = pad4(jsonBuf);
  const bin = binParts.shift() ?? Buffer.alloc(0);

  const header = Buffer.alloc(12);
  const total = 12 + 8 + jsonPadded.length + 8 + bin.length;
  header.writeUInt32LE(0x46546c67, 0); // glTF
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(total, 8);

  const jsonChunk = Buffer.alloc(8);
  jsonChunk.writeUInt32LE(jsonPadded.length, 0);
  jsonChunk.writeUInt32LE(0x4E4F534A, 4);

  const binChunk = Buffer.alloc(8);
  binChunk.writeUInt32LE(bin.length, 0);
  binChunk.writeUInt32LE(0x004E4942, 4);

  return Buffer.concat([header, jsonChunk, jsonPadded, binChunk, bin]);
}

let count = 0;
for (const p of products) {
  const color = PALETTES[p.subcategory];
  if (!color) {
    console.log(`skip (no palette) ${p.slug} [${p.subcategory}]`);
    continue;
  }
  const file = join(MODELS, `${p.slug}.glb`);
  let glb;
  try {
    glb = readFileSync(file);
  } catch {
    continue;
  }
  const out = injectMaterial(glb, color);
  writeFileSync(file, out);
  count++;
}
console.log(`${count} models colorized → ${MODELS}/`);