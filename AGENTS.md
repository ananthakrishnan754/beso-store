# AGENTS.md - Veo 3 Video Generation & Integration for BESO Store

## Overview

This file contains instructions for generating and integrating 360-degree turntable videos for BESO Store's flagship products using Veo 3 AI video generation.

---

## Phase 1: Infrastructure Setup

### 1.1 Create Video Directory

```bash
mkdir -p public/assets/videos/products
```

### 1.2 Verify Source Photos Exist

Source photos are located in `public/assets/images/products/`:
- `executive-chair-07.jpg` → BESO Crown Executive Chair
- `height-table-01.jpg` → BESO FlexRise Height-Adjustable Table
- `executive-chair-04.jpg` → BESO Prestige Executive Chair

---

## Phase 2: Veo 3 Video Generation

### 2.1 Hero Background Video (Text-to-Video)

**Storage Path:** `public/assets/videos/hero-bg.webm` (already exists)

**Veo 3 Prompt:**
```
A cinematic high-end studio video of a modern ergonomic executive office chair positioned in a minimalist dark luxury room. The camera glides subtly around the chair in slow motion. Soft volumetric lighting highlights the breathable mesh textures, polished chrome metal base, and ergonomic curves. Deep dark slate and ambient green rim lighting. Ultra-wide 16:9 aspect ratio, 4k resolution, 60fps, photorealistic, seamless loop video.
```

#### 2.1.1 Themed Hero Variants (4 clips — same chair & camera, different color themes)

Each theme that has a dedicated clip is wired via `heroVideo` in `src/lib/themes.ts`; the
`HeroVideo` component (`src/components/HeroVideo.tsx`) swaps the `<source>` by the active
`data-theme` and falls back to the Night Luxe clip when missing. WebM preferred, MP4 fallback.

| Theme slug | WebM / MP4 base path |
|---|---|
| `night-luxe` (default) | `public/assets/videos/hero-bg.webm/.mp4` (existing clip) |
| `ivory-minimal` | `public/assets/videos/hero-bg-ivory.webm/.mp4` |
| `walnut-midcentury` | `public/assets/videos/hero-bg-walnut.webm/.mp4` |
| `industrial-loft` | `public/assets/videos/hero-bg-loft.webm/.mp4` |

**Bulk generation:** `GEMINI_API_KEY=... node scripts/generate-hero-videos.mjs`
(run `node scripts/generate-hero-videos.mjs --only ivory-minimal` for one clip; each clip is a paid Veo 3 generation).

**Ivory Minimal prompt:**
```
A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a bright, airy minimalist room. Warm ivory linen walls and floor, soft diffused morning daylight flooding in, gentle soft shadows, airy negative space. Chair in matte black and warm greige upholstery. Low contrast, calm, clean, hotel-lounge feel. Seamless loop, photorealistic, 8k, 60fps.
```

**Generation status (Sep 2026):** `ivory-minimal` clip DONE (`hero-bg-ivory.webm/.mp4`, 1280×720 VP9/h264 10s, generated via Gemini web Veo "Videos" tool).
`walnut-midcentury` and `industrial-loft` clips NOT yet generated — Gemini hit "Video Generation Limit Reached" (daily cap) before they could be produced. Re-run generation on a later day; `HeroVideo` gracefully falls back to the Night Luxe clip (`hero-bg.webm`) for any missing theme clip, so the site remains fully functional.

**Walnut Mid-Century prompt:**
```
A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a warm mid-century room. Cream walls, walnut wood paneling and furniture accents, terrazzo floor. Golden-hour light with burnt-orange and amber rim glow wrapping the chair edges. Warm, rich, premium vintage-moderne mood. Seamless loop, photorealistic, 8k, 60fps.
```

**Industrial Loft prompt:**
```
A cinematic ultra-wide 16:9 studio film of a modern ergonomic executive office chair in a dark industrial loft. Raw charcoal concrete walls, exposed steel beams, utility amber sodium lighting casting deep hard shadows, faint fog at the floor. Chair accents in black leather and brushed metal. Gritty, high-drama, editorial. Seamless loop, photorealistic, 8k, 60fps.
```

---

### 2.2 BESO Crown Executive Chair (Image-to-Video)

**Product ID:** 7  
**Slug:** `beso-crown-executive-chair`  
**Source Photo:** `public/assets/images/products/executive-chair-07.jpg`  
**Live URL:** `https://thebesostore.com/wp-content/uploads/2025/07/J163A.jpg`

**Veo 3 Prompt:**
```
A studio-lit 360-degree rotation video of a premium ergonomic office chair, the BESO Crown. The chair features a high-back design with a dark black double-layered mesh backrest, an adjustable headrest, and a thick, plush memory foam seat cushion upholstered in matte black fabric. The armrests are adjustable 3D polyurethane. The chair rotates smoothly on a polished silver aluminum alloy 5-star base with premium black nylon caster wheels. The camera is locked at a fixed eye-level perspective, capturing a seamless, continuous turntable spin. The background is a clean, minimalist studio setting with deep black space and a subtle, soft green volumetric rim light highlighting the silhouette and textures of the mesh and aluminum. Photorealistic, 8k resolution, ultra-detailed fabric and metal textures, smooth 24fps motion, looped video.
```

**Output Files:**
- `public/assets/videos/products/beso-crown-3d.webm`
- `public/assets/videos/products/beso-crown-3d.mp4`

---

### 2.3 BESO FlexRise Height-Adjustable Table (Image-to-Video)

**Product ID:** 21  
**Slug:** `beso-flexrise-height-adjustable-table`  
**Source Photo:** `public/assets/images/products/height-table-01.jpg`  
**Live URL:** `https://thebesostore.com/wp-content/uploads/2021/08/Y201_BLACK.jpg`

**Veo 3 Prompt:**
```
A high-end studio-lit 360-degree rotation video of a modern height-adjustable standing desk, the BESO FlexRise. The desk has a thick, premium solid walnut wood top with a visible natural grain and sleek beveled edges. The underframe is a powder-coated steel dual-motor frame in clean matte white, showing telescoping legs. On the front-right edge, a small, sleek digital control panel with a blue LED memory readout is visible. The desk rotates smoothly and continuously on a central turntable. The camera is positioned at a 30-degree high angle, capturing the wood texture on the top as it spins. The background is a dark, warm-toned minimalist studio with soft warm spotlights casting elegant shadows on the floor. Photorealistic, 8k resolution, ultra-detailed wood grain and metal textures, smooth 24fps motion, looped video.
```

**Output Files:**
- `public/assets/videos/products/beso-flexrise-3d.webm`
- `public/assets/videos/products/beso-flexrise-3d.mp4`

---

### 2.4 BESO Prestige Executive Chair (Image-to-Video)

**Product ID:** 4  
**Slug:** `beso-prestige-executive-chair`  
**Source Photo:** `public/assets/images/products/executive-chair-04.jpg`  
**Live URL:** `https://thebesostore.com/wp-content/uploads/2025/07/F101.jpg`

**Veo 3 Prompt:**
```
A luxurious studio-lit 360-degree rotation video of an executive leather chair, the BESO Prestige. The chair is fully upholstered in rich, full-grain dark brown leather with double-stitched seams and premium ergonomic padding. The armrests are padded with matching leather and supported by dark steel frames. The chair rotates smoothly on a heavy-duty chrome 5-star base with matching dark walnut wood inserts on each spoke and premium black wheels. The camera is locked at a fixed mid-level angle, capturing the texture and sheen of the premium leather as it spins. The background is a dark, professional study room setting, softly blurred, with warm golden rim lighting. Photorealistic, 8k resolution, ultra-detailed leather texture with natural folds, smooth 24fps motion, looped video.
```

**Output Files:**
- `public/assets/videos/products/beso-prestige-3d.webm`
- `public/assets/videos/products/beso-prestige-3d.mp4`

---

## Phase 3: Data Integration

### 3.1 Update products.json

Edit `src/data/products.json` and update the `"video"` field for each product:

**Product ID 7 (BESO Crown Executive Chair):**
```json
"video": "/assets/videos/products/beso-crown-3d.webm"
```

**Product ID 21 (BESO FlexRise Height-Adjustable Table):**
```json
"video": "/assets/videos/products/beso-flexrise-3d.webm"
```

**Product ID 4 (BESO Prestige Executive Chair):**
```json
"video": "/assets/videos/products/beso-prestige-3d.webm"
```

---

## Phase 4: Verification

### 4.1 Verify File Structure

After video generation, the directory should contain:
```
public/assets/videos/
├── hero-bg.webm
├── hero-bg.mp4
└── products/
    ├── beso-crown-3d.webm
    ├── beso-crown-3d.mp4
    ├── beso-flexrise-3d.webm
    ├── beso-flexrise-3d.mp4
    ├── beso-prestige-3d.webm
    └── beso-prestige-3d.mp4
```

### 4.2 Test Product Pages

Verify video playback at:
- `/products/beso-crown-executive-chair`
- `/products/beso-flexrise-height-adjustable-table`
- `/products/beso-prestige-executive-chair`

---

## Technical Notes

- **Video Format Priority:** WebM preferred for web, MP4 as fallback
- **Product3DViewer Component:** Located at `src/components/Product3DViewer.tsx`
- **Automatic Fallback:** If no product video exists, falls back to `hero-bg.webm`
- **Video Toggle:** Users can switch between 3D Veo Video and Interactive 3D Canvas modes

---

## Summary Checklist

- [ ] Create `public/assets/videos/products/` directory
- [ ] Generate BESO Crown video (Product ID 7)
- [ ] Generate BESO FlexRise video (Product ID 21)
- [ ] Generate BESO Prestige video (Product ID 4)
- [ ] Upload all videos to correct paths
- [ ] Update `src/data/products.json` with video paths
- [ ] Verify video playback on product pages

---

## Phase 5: Realistic 3D Product Models (SF3D image-to-3D)

### 5.1 What this is

Per-product GLB models generated from the client's **real product photos** using
Stability AI's **Stable Fast 3D (SF3D)** — single-image → textured mesh with
UV-unwrapped PBR materials (baseColor / metallic / roughness), exported as glTF
binary. Outputs land at `public/assets/models/products/<slug>.glb`.

**Front-end wiring (DONE):**
- `src/app/products/[slug]/page.tsx` checks `fs` for `public/assets/models/products/<slug>.glb` and passes `modelUrl` to `Product3DViewer`.
- `Product3DViewer` gained a **`model` view mode** rendered with `<model-viewer>` (lazy-imported `@google/model-viewer`, already a dependency), alongside the existing `video` and `canvas` (wireframe) modes, with a mode-toggle overlay.
- Custom element JSX types declared in `src/types/model-viewer.d.ts`.
- Fallback: products without a GLB simply don't show the "3D Model" toggle (wireframe/video remain).

### 5.2 Approach: procedural CAD-style models (chosen — not AI)

Single-image AI reconstruction (SF3D) was evaluated and **rejected**: the back half
of furniture is hallucinated from one photo → mushy "blobby" geometry. Final
approach is **procedural CAD** — clean primitives + PBR materials built in
Three.js and exported to GLB by `scripts/generate-models.mjs`:

- 13 subcategory builders: executive/manager/staff/visitor/gaming chairs,
  dining chairs, bar stools, executive/manager/staff/center/height-adjustable
  tables, and sofa.
- Consistent premium material palette per subcategory (matte fabric / PU /
  chrome / brushed steel / walnut / oak / light-oak / marble / brass).
- `node scripts/generate-models.mjs`            → all 79 products
- `node scripts/generate-models.mjs --only beso-crown-executive-chair` → one
- Output: `public/assets/models/products/<slug>.glb` (≈30–60KB each).
- Models rotate 115° so the camera shows a ¾ front, matching the hero photos.
- Node 24 has no `FileReader`, which GLTFExporter needs for binary GLB — the
  script polyfills it via `Blob.arrayBuffer()`.

### 5.3 Regenerate

```bash
cd /home/ananthakrishnan/oc/beso-store
node scripts/generate-models.mjs
npm run build
# restart next start (see §5.4) so new GLBs are served
```

### 5.4 Post-generation (IMPORTANT — `next start` snapshots static files)

`next start` only serves static files that existed at startup; global rebuild +
restart after adding GLBs or they 404:
```bash
kill -9 $(ss -ltnp | grep ':3001' | grep -oP 'pid=\K[0-9]+'); \
  (setsid nohup env PORT=3001 npm start > nohup.out 2>&1 < /dev/null &)
```

### 5.5 Notes / pitfalls

- Keep the UI's "3D Model" toggle hidden (`modelUrl` undefined) unless the
  GLB exists — page.tsx checks `fs` before wiring it.
- SF3D toolchain still exists on the big partition
  (`/media/ananthakrishnan/C88AA8DB8AA8C6F21/3d-work/`) if richer AI meshes are
  wanted later (needs waste-free single-angle photos — not the current set).
