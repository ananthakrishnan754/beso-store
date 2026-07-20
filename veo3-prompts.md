# Veo 3 Video Generation & Asset Guide for BESO Store

This guide provides exact **Veo 3 AI Video Prompts**, **Source Photo Locations**, and **Video Storage Directory Paths** for generating and integrating 360-degree turntable videos for BESO Store's flagship products.

---

## 📸 Hero Background Video

* **Purpose:** High-impact, ambient looping video playing behind the Landing Page Hero section.
* **Storage Location for Video File:**
  * WebM format: `public/assets/videos/hero-bg.webm`
  * MP4 format: `public/assets/videos/hero-bg.mp4`
* **Reference Photo:** N/A (Direct text-to-video or video-to-video generation)

### Veo 3 Prompt:
> A cinematic high-end studio video of a modern ergonomic executive office chair positioned in a minimalist dark luxury room. The camera glides subtly around the chair in slow motion. Soft volumetric lighting highlights the breathable mesh textures, polished chrome metal base, and ergonomic curves. Deep dark slate and ambient green rim lighting. Ultra-wide 16:9 aspect ratio, 4k resolution, 60fps, photorealistic, seamless loop video.

---

## 🪑 1. BESO Crown Executive Chair (Flagship 1)

* **Product Name:** BESO Crown Executive Chair
* **Product ID:** `7` | **Slug:** `beso-crown-executive-chair`
* **Source Photo Location (Local Repository):**
  * `public/assets/images/products/executive-chair-07.jpg`
* **Source Photo Location (Live Website URL):**
  * `https://thebesostore.com/wp-content/uploads/2025/07/J163A.jpg`
* **Storage Location for Generated Video File:**
  * Save to: `public/assets/videos/products/beso-crown-3d.webm`
  * Backup MP4: `public/assets/videos/products/beso-crown-3d.mp4`

### Veo 3 Prompt (Image-to-Video):
> A studio-lit 360-degree rotation video of a premium ergonomic office chair, the BESO Crown. The chair features a high-back design with a dark black double-layered mesh backrest, an adjustable headrest, and a thick, plush memory foam seat cushion upholstered in matte black fabric. The armrests are adjustable 3D polyurethane. The chair rotates smoothly on a polished silver aluminum alloy 5-star base with premium black nylon caster wheels. The camera is locked at a fixed eye-level perspective, capturing a seamless, continuous turntable spin. The background is a clean, minimalist studio setting with deep black space and a subtle, soft green volumetric rim light highlighting the silhouette and textures of the mesh and aluminum. Photorealistic, 8k resolution, ultra-detailed fabric and metal textures, smooth 24fps motion, looped video.

---

## 🪵 2. BESO FlexRise Height-Adjustable Table (Flagship 2)

* **Product Name:** BESO FlexRise Height-Adjustable Table
* **Product ID:** `21` | **Slug:** `beso-flexrise-height-adjustable-table`
* **Source Photo Location (Local Repository):**
  * `public/assets/images/products/height-table-01.jpg`
* **Source Photo Location (Live Website URL):**
  * `https://thebesostore.com/wp-content/uploads/2021/08/Y201_BLACK.jpg`
* **Storage Location for Generated Video File:**
  * Save to: `public/assets/videos/products/beso-flexrise-3d.webm`
  * Backup MP4: `public/assets/videos/products/beso-flexrise-3d.mp4`

### Veo 3 Prompt (Image-to-Video):
> A high-end studio-lit 360-degree rotation video of a modern height-adjustable standing desk, the BESO FlexRise. The desk has a thick, premium solid walnut wood top with a visible natural grain and sleek beveled edges. The underframe is a powder-coated steel dual-motor frame in clean matte white, showing telescoping legs. On the front-right edge, a small, sleek digital control panel with a blue LED memory readout is visible. The desk rotates smoothly and continuously on a central turntable. The camera is positioned at a 30-degree high angle, capturing the wood texture on the top as it spins. The background is a dark, warm-toned minimalist studio with soft warm spotlights casting elegant shadows on the floor. Photorealistic, 8k resolution, ultra-detailed wood grain and metal textures, smooth 24fps motion, looped video.

---

## 💼 3. BESO Prestige Executive Chair (Flagship 3)

* **Product Name:** BESO Prestige Executive Chair
* **Product ID:** `4` | **Slug:** `beso-prestige-executive-chair`
* **Source Photo Location (Local Repository):**
  * `public/assets/images/products/executive-chair-04.jpg`
* **Source Photo Location (Live Website URL):**
  * `https://thebesostore.com/wp-content/uploads/2025/07/F101.jpg`
* **Storage Location for Generated Video File:**
  * Save to: `public/assets/videos/products/beso-prestige-3d.webm`
  * Backup MP4: `public/assets/videos/products/beso-prestige-3d.mp4`

### Veo 3 Prompt (Image-to-Video):
> A luxurious studio-lit 360-degree rotation video of an executive leather chair, the BESO Prestige. The chair is fully upholstered in rich, full-grain dark brown leather with double-stitched seams and premium ergonomic padding. The armrests are padded with matching leather and supported by dark steel frames. The chair rotates smoothly on a heavy-duty chrome 5-star base with matching dark walnut wood inserts on each spoke and premium black wheels. The camera is locked at a fixed mid-level angle, capturing the texture and sheen of the premium leather as it spins. The background is a dark, professional study room setting, softly blurred, with warm golden rim lighting. Photorealistic, 8k resolution, ultra-detailed leather texture with natural folds, smooth 24fps motion, looped video.

---

## ⚙️ How to Activate Generated Videos in the Store

Once you generate the video file with Veo 3:

1. **Save the video file** to the designated storage path:
   `public/assets/videos/products/<filename>.webm` (or `.mp4`)

2. **Update `src/data/products.json`**:
   Find the product entry and set the `"video"` field:
   ```json
   {
     "id": 7,
     "name": "BESO Crown Executive Chair",
     "video": "/assets/videos/products/beso-crown-3d.webm"
   }
   ```

3. The product detail page at `/products/<slug>` will automatically play the 3D video rotation with an interactive toggle switch for customer viewing!
