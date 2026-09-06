/**
 * Build script — composes the "AR Meeting Room" GLB for the homepage AR demo.
 *
 * Reads the DRACO-compressed open-source models (aedifex, MIT), decodes them
 * via @gltf-transform, arranges a table + 4 chairs in three.js, and exports a
 * single-buffer GLB.
 *
 * Run: node scripts/compose-meeting-room.mjs
 * Output: public/assets/models/beso-meeting-room.glb
 */
import { readFile, writeFile, mkdtemp } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { statSync } from 'fs';
import { NodeIO } from '@gltf-transform/core';
import { KHRDracoMeshCompression } from '@gltf-transform/extensions';
import { createDecoderModule } from 'draco3d';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import * as THREE from 'three';

// Node polyfill: GLTFExporter reads the Blob via FileReader when binary.
globalThis.FileReader ??= class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

const TABLE = 'public/assets/models/office-table.glb';
const CHAIR = 'public/assets/models/office-chair.glb';
const OUT = 'public/assets/models/beso-meeting-room.glb';

// Model bounds (meters) used to place the chairs around the table.
const tableW = 1.5; // table x
const tableD = 0.61; // table z
const chairD = 0.69; // chair depth (z)
const CLEAR = 0.35; // breathing room around the table

const positions = [
  [tableW / 2 + chairD / 2 + CLEAR, 0, -90],
  [0, tableD / 2 + chairD / 2 + CLEAR, 180],
  [-(tableW / 2 + chairD / 2 + CLEAR), 0, 90],
  [0, -(tableD / 2 + chairD / 2 + CLEAR), 0],
];

// ── Decode DRACO-compressed sources into plain GLB temp files ──────────────
const dir = await mkdtemp(join(tmpdir(), 'beso-ar-'));
const reader = new NodeIO().registerExtensions([KHRDracoMeshCompression]).registerDependencies({ 'draco3d.decoder': await createDecoderModule() });
const writer = new NodeIO();

async function toPlain(src) {
  const out = join(dir, src.split('/').pop());
  await writer.write(out, await reader.read(src));
  return out;
}

const loader = new GLTFLoader();
async function loadPlain(relPath) {
  const buf = await readFile(relPath);
  return loader.parseAsync(new Uint8Array(buf).buffer, relPath);
}

// ── Compose the scene ──────────────────────────────────────────────────────
const table = await loadPlain(await toPlain(TABLE));
const chair = await loadPlain(await toPlain(CHAIR));

const room = new THREE.Group();
room.name = 'BESO Meeting Room';
room.add(table.scene);

for (const [x, z, yaw] of positions) {
  const copy = chair.scene.clone(true);
  copy.position.set(x, 0, z);
  copy.rotation.y = THREE.MathUtils.degToRad(yaw);
  room.add(copy);
}

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(room, { binary: true });
await writeFile(OUT, Buffer.from(glb));
console.log('wrote', OUT, `(${statSync(OUT).size} bytes)`);