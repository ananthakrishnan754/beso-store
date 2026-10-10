# Concept 6 (Archive) — Media Prompts & Asset Placement Specification

This document defines the exact media assets, generative AI prompts (Veo 3 for video, Midjourney v6 / Imagen 3 for photography), dimensions, aspect ratios, encoding formats, and file locations required for **Concept 6 (Archive)** — the Beyond Medals-inspired editorial furniture flagship page.

---

## 1. Directory Tree & Asset Placement Map

All media files must be placed directly into the following local paths under `public/`:

```
public/assets/
├── images/
│   ├── editorial-hero.jpg                 <-- Hero Right: Editorial Still (4:5 / 1:1 portrait)
│   ├── editorial-workspace.jpg            <-- Collage Story 1: "The Atelier" (2:3 tall portrait)
│   ├── d01-hero.jpg                       <-- Collage Story 2: "Edition 2026" (3:2 landscape)
│   ├── beso-logo-transparent.png          <-- Header Center: Transparent Wordmark
│   └── products/                          <-- Transparent Cutout Products & Gallery Thumbs
│       ├── executive-chair-07.jpg         <-- 01: BESO Crown Executive Chair
│       ├── executive-chair-04.jpg         <-- 02: BESO Prestige Executive Chair
│       ├── height-table-01.jpg            <-- 03: BESO FlexRise Height Table
│       ├── executive-chair-03.jpg         <-- 04: BESO Milano Executive Chair
│       ├── executive-chair-06.jpg         <-- 05: BESO ErgoMax Executive Chair
│       ├── executive-table-01.jpg         <-- 06: BESO Horizon Executive Table
│       ├── executive-table-10.jpg         <-- 07: BESO Mega Executive Table
│       ├── manager-chair-06.jpg           <-- 08: BESO Premium Manager Chair
│       ├── manager-chair-04.jpg           <-- 09: BESO Ergo Manager Chair
│       ├── executive-table-06.jpg         <-- 10: BESO Executive Z-Desk
│       ├── visitor-chair-01.jpg           <-- Gallery Thumb
│       └── visitor-chair-04.jpg           <-- Gallery Thumb
└── videos/
    └── bm/
        ├── light-crown.webm / .mp4        <-- Hero Left Video / Film 02: Crown Mesh
        ├── light-crown-poster.jpg         <-- Video Poster & HUD Thumbnail
        ├── studio-desk.webm / .mp4        <-- Film 01: Studio Edit (Executive Desk)
        ├── studio-desk-poster.jpg         <-- Video Poster & HUD Thumbnail
        ├── dark-prestige.webm / .mp4      <-- Film 03: Prestige Leather Chair
        ├── dark-prestige-poster.jpg       <-- Video Poster & HUD Thumbnail
        ├── walnut-flexrise.webm / .mp4    <-- Film 04: FlexRise Standing Desk
        ├── walnut-flexrise-poster.jpg     <-- Video Poster & HUD Thumbnail
        ├── mesh-crown.webm / .mp4         <-- Film 05: Home Series Architectural Chair
        └── mesh-crown-poster.jpg          <-- Video Poster & HUD Thumbnail
```

---

## 2. Hero Module (2-Up Split Screen)

The Hero section occupies full viewport height (`100vh`) with zero gutter between two 50/50 split columns.

### 2.1 Hero Left: Ambient Video Loop ("The Work Series")
- **File Paths:**
  - `public/assets/videos/bm/light-crown.webm` (VP9, preferred)
  - `public/assets/videos/bm/light-crown.mp4` (H.264 fallback)
  - `public/assets/videos/bm/light-crown-poster.jpg` (Poster frame)
- **Aspect Ratio:** 4:5 or 16:9 vertical crop, rendered at `1080×1350` or `1440×1800`
- **Veo 3 Video Prompt:**
  ```text
  A cinematic, ultra-sharp 4K studio fashion film of a sleek matte black ergonomic executive office chair with dual-layer breathable mesh and a polished aluminum 5-star base. Slow, continuous push-in camera dolly gliding straight toward the chair. Subtle atmospheric warm lighting cuts across the mesh weave and chrome armrests against an obsidian slate background. Clean architectural mood, 60fps, ultra-detailed fabric micro-textures, perfectly seamless loop video.
  ```

### 2.2 Hero Right: Editorial Still ("Crown Ergonomic")
- **File Path:**
  - `public/assets/images/editorial-hero.jpg`
- **Aspect Ratio:** 4:5 (minimum `1600×2000px`)
- **Midjourney v6 / Imagen 3 Prompt:**
  ```text
  An editorial architectural interior photograph of a modern minimalist executive office suite. A high-end ergonomic executive chair in black mesh and chrome sits beside a floating solid walnut desk. Warm morning directional light casts soft shadows across textured micro-cement walls and herringbone wood flooring. High-end Scandinavian furniture catalogue style, Hasselblad medium format camera, 8k resolution, photorealistic, pristine depth of field. --ar 4:5 --style raw --v 6.0
  ```

---

## 3. ModuleVideoList (Interactive 5-Film Playlist)

A full-width cinematic video showcase featuring a sticky HUD playlist bar with real-time switching between 5 clips.

### 3.1 Film 01: "The Work Series" (Studio Edit)
- **File Paths:**
  - `public/assets/videos/bm/studio-desk.webm` / `.mp4`
  - `public/assets/videos/bm/studio-desk-poster.jpg`
- **Veo 3 Video Prompt:**
  ```text
  Cinematic slow-motion tracking shot across a contemporary executive office desk crafted from natural solid walnut with matte black steel framing. Warm directional studio spotlights highlight the organic wood grain, beveled chamfer edges, and minimal desk accessories. Soft volumetric haze in the background. Ultra-wide 16:9 aspect ratio, 4K, 60fps, photorealistic, seamless loop video.
  ```

### 3.2 Film 02: "Crown Ergonomic" (Mesh Chair)
- **File Paths:**
  - `public/assets/videos/bm/light-crown.webm` / `.mp4`
  - `public/assets/videos/bm/light-crown-poster.jpg`
- **Veo 3 Video Prompt:**
  ```text
  A 360-degree turntable rotation of a premium ergonomic office task chair in a dark luxury minimalist room. Breathable dual-layer mesh backrest, adjustable headrest, and polished silver aluminum five-star caster base. Soft green and amber rim lighting wrapping around the silhouette. Photorealistic, 8k, smooth 24fps motion, looped video.
  ```

### 3.3 Film 03: "Prestige Executive" (Full-Grain Leather)
- **File Paths:**
  - `public/assets/videos/bm/dark-prestige.webm` / `.mp4`
  - `public/assets/videos/bm/dark-prestige-poster.jpg`
- **Veo 3 Video Prompt:**
  ```text
  Cinematic macro glide camera move over rich, dark espresso brown full-grain leather upholstery on a luxury boardroom armchair. Double-stitched seams, plush padded armrests, and brushed dark titanium metal details. Warm golden-hour side lighting accentuating the natural pebble leather grain. 16:9, 4K, photorealistic, seamless slow loop.
  ```

### 3.4 Film 04: "FlexRise Sit–Stand" (Dual-Motor Table)
- **File Paths:**
  - `public/assets/videos/bm/walnut-flexrise.webm` / `.mp4`
  - `public/assets/videos/bm/walnut-flexrise-poster.jpg`
- **Veo 3 Video Prompt:**
  ```text
  A motorized height-adjustable standing desk with a solid live-edge walnut tabletop smoothly elevating from sitting height to standing height. Telescoping white powder-coated dual-motor steel legs in action. Clean minimalist architectural concrete studio with soft diffused skylight. 16:9, 4K, 60fps, smooth mechanical motion, seamless loop video.
  ```

### 3.5 Film 05: "The Home Series" (Architectural Chair)
- **File Paths:**
  - `public/assets/videos/bm/mesh-crown.webm` / `.mp4`
  - `public/assets/videos/bm/mesh-crown-poster.jpg`
- **Veo 3 Video Prompt:**
  ```text
  A slow 45-degree orbit around an ultra-minimalist home office task chair in light greige fabric and sculptural matte white frame. Sunlit Japanese-Nordic interior setting with warm linen drapes fluttering gently in the breeze. Soft, calm, low contrast aesthetic. 16:9, 4K, 60fps, photorealistic, seamless loop.
  ```

---

## 4. ModuleHighlightCollage (16-Column Reverse Editorial Stories)

A dynamic two-story editorial layout placed in reverse column arrangement (Story 1 occupies cols 9–16 on the right; Story 2 occupies cols 1–6 on the left).

### 4.1 Story 1: "The Atelier" (With Interactive Product Hotspot Pin)
- **File Path:**
  - `public/assets/images/editorial-workspace.jpg`
- **Aspect Ratio:** 2:3 Tall Portrait (`1600×2400px`)
- **Interactive Overlay:**
  - Hotspot coordinates: `top: 38%`, `left: 52%` (anchored over the executive chair)
  - Tooltip card: BESO Crown Executive Chair (`₹49,990`) + link to `/products/beso-crown-executive-chair`
- **Midjourney v6 / Imagen 3 Prompt:**
  ```text
  Editorial portrait photograph of a luxury design studio atelier in Hyderabad. An ergonomic black mesh executive chair with polished silver alloy base sits prominently in the foreground beside architectural blueprints and stone material samples. Warm directional raking sunlight through high steel-framed windows. Film grain, tactile textures, high fashion architectural publication mood, Leica SL2, 50mm Summilux lens. --ar 2:3 --v 6.0
  ```

### 4.2 Story 2: "Edition 2026" (Landscape Story)
- **File Path:**
  - `public/assets/images/d01-hero.jpg`
- **Aspect Ratio:** 3:2 Landscape (`2400×1600px`)
- **Midjourney v6 / Imagen 3 Prompt:**
  ```text
  A wide architectural interior shot of an open-plan creative workspace. Multiple modern wooden workstations and ergonomic task chairs organized with clean geometric symmetry. Polished terrazzo flooring, warm travertine walls, and lush potted ficus trees in background. Soft daylight, Kinfolk aesthetic, medium format film look. --ar 3:2 --v 6.0
  ```

---

## 5. ModuleCollectionHighlightGrid ("Latest" Cutout Imagery)

The 10 flagship pieces featured in the asymmetric 16-column grid require clean, cutout product photography on pure white or transparent backgrounds.

| # | Product Name | Slug | Local File Path | Image Spec |
|---|---|---|---|---|
| 01 | BESO Crown Executive Chair | `beso-crown-executive-chair` | `public/assets/images/products/executive-chair-07.jpg` | Cutout ¾ front, mesh back, chrome base |
| 02 | BESO Prestige Executive Chair | `beso-prestige-executive-chair` | `public/assets/images/products/executive-chair-04.jpg` | Cutout ¾ front, dark brown leather |
| 03 | BESO FlexRise Height Table | `beso-flexrise-height-adjustable-table` | `public/assets/images/products/height-table-01.jpg` | Cutout 30° high-angle, walnut top, white frame |
| 04 | BESO Milano Executive Chair | `beso-milano-executive-chair` | `public/assets/images/products/executive-chair-03.jpg` | Cutout, brown leatherette finish |
| 05 | BESO ErgoMax Executive Chair | `beso-ergomax-executive-chair` | `public/assets/images/products/executive-chair-06.jpg` | Cutout, synchro-tilt black mesh |
| 06 | BESO Horizon Executive Table | `beso-horizon-executive-table` | `public/assets/images/products/executive-table-01.jpg` | Cutout, solid walnut top desk |
| 07 | BESO Mega Executive Table | `beso-mega-executive-table` | `public/assets/images/products/executive-table-10.jpg` | Cutout, 8ft conference desk |
| 08 | BESO Premium Manager Chair | `beso-premium-manager-chair` | `public/assets/images/products/manager-chair-06.jpg` | Cutout, charcoal fabric + chrome |
| 09 | BESO Ergo Manager Chair | `beso-ergo-manager-chair` | `public/assets/images/products/manager-chair-04.jpg` | Cutout, black task chair with headrest |
| 10 | BESO Executive Z-Desk | `beso-executive-z-desk` | `public/assets/images/products/executive-table-06.jpg` | Cutout, architectural Z-frame table |

- **Midjourney v6 Studio Isolation Prompt Template:**
  ```text
  Commercial studio product photograph of a modern [furniture piece name], isolated on a pure clean neutral studio backdrop with soft contact shadows on the floor. Studio softbox lighting from 45 degrees, razor sharp focus, pristine metal and fabric textures, 8k catalogue asset. --ar 4:5 --v 6.0
  ```

---

## 6. Technical Encoding & Delivery Rules

1. **Video Codecs:**
   - **Primary:** WebM container with VP9 codec (`-c:v libvpx-vp9 -b:v 2M -crf 30`) for ultra-low payload and instant browser streaming.
   - **Fallback:** MP4 container with H.264 High Profile (`-c:v libx264 -pix_fmt yuv420p -movflags +faststart`) for Safari and legacy devices.
   - **Audio:** All ambient background loops must be encoded **without audio tracks** (`-an`) to allow automatic unmuted/muted autoplay compliance.

2. **Image Formats:**
   - WebP / progressive JPG at 82% quality.
   - Responsive `sizes` attributes wired in Next.js Image components.

3. **Re-deployment Note:**
   Next.js production runtime snapshots static assets at boot time. After copying or generating any new assets under `public/`, execute:
   ```bash
   kill -9 $(ss -ltnp | grep ':3001' | grep -oP 'pid=\K[0-9]+') 2>/dev/null
   npm run build
   (setsid nohup env PORT=3001 npm start > nohup.out 2>&1 < /dev/null &)
   ```
