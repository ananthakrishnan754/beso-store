# 01 — Atelier

**Idea (one sentence):** One chair, one room, one light — a warm editorial
atelier where real product photography is the hero and the page reads like a
furniture maker's catalogue, not a landing template.

## References (opened + screenshotted; components borrowed)

1. **Fritz Hansen** (`refs/fritz-hansen-1440.jpg`) — full-bleed warm
   architectural room scene framing one iconic piece; ultra-slim top nav;
   tracked-caps caption with `™` micro-type. → *borrow:* the full-bleed
   warm-room hero and the tracked-caps caption sitting on the image.
2. **Cassina** (`refs/cassina-1440.jpg`) — editorial exhibition titling
   ("THE CASSINA PERSPECTIVE") over an asymmetric text block. → *borrow:*
   the editorial "exhibition" section title + curatorial note under the product.
3. **Hem** (`refs/hem-1440.jpg`) — warm architectural neutrals, calm,
   frosted/high-touch restraint. → *borrow:* the warm neutral palette and the
   quiet, unhurried section rhythm.

## Grid & spacing

- 12-col grid, max content **1280px**, gutters 24px, outer padding 24/48/96px
  (base/sm/lg).
- Spacing scale (px): 4 8 12 16 24 32 48 64 96 128. Sections use **96px** top/bottom
  at lg, **64px** mobile.
- Editorial asymmetry: image spans 7 cols, text 5 cols (never centered-hero).
- Above-the-fold = **one** focal point: the hero product photo.

## Type scale (2 faces)

- Display: **Fraunces** (opsz variable), weight 420–500.
  - H1 `clamp(44px, 6vw, 72px)` / lh 0.98 / tracking −0.02em
  - H2 `clamp(32px, 4vw, 48px)` / lh 1.04 / tracking −0.015em
  - H3 24px / lh 1.2
- Body: **Inter**.
  - lead 19px/1.6 · body 16px/1.65 · caption 13px/1.5
  - eyebrow/label 12px, uppercase, tracking 0.16em
- Numbers in product specs use Inter tabular. No third face, no italics for
  decoration.

## Palette (exact; measured contrast)

| Token | Hex | Use | Contrast on surface |
|---|---|---|---|
| surface (bone) | `#F7F3EC` | page | — |
| surface-2 | `#FBFAF6` | cards/panels | — |
| ink | `#141312` | headings, body | 16.8:1 on bone ✓ |
| soft | `#5A554E` | secondary text | 6.7:1 on bone ✓ |
| clay | `#8F4C25` | links, small accents | 5.9:1 on bone ✓ |
| walnut | `#6B4A2E` | rules, quiet lines | 7.8:1 on bone ✓ |

Decorative-only (never text): terracotta `#C77A55`.

## Motion rules

- Technique **A — frame-sequence scrub** on the flagship chair (sticky canvas,
  lerp-smoothed scroll progress), copy values locked to the same progress.
- Reveal: opacity 0→1 + translateY 16→0px, **600ms**, easing
  `cubic-bezier(0.16,1,0.3,1)`; stagger 80ms; one easing everywhere.
- Image hover: scale 1.00→1.03, **500ms**, same easing. Cursor stays default
  (no custom cursor).
- `prefers-reduced-motion` / Save-Data: static poster, no scrub.

## Sections (each has a reason)

1. **Hero** — full-bleed warm-room photo of the *BESO Crown Executive Chair*
   (real `executive-chair-07.jpg`), slim nav, left-bottom editorial overlay:
   eyebrow `HYDERABAD · SINCE 2011`, H1 **"Sit the way it was made."**,
   one-line sub: *Ergonomic seating, made for the working day.* Primary CTA
   `Shop the collection`, secondary `Book a showroom visit`.
2. **The chair** — technique-A scrub of the Crown's synchro-tilt; text column
   carries the mechanism story; progress-linked dims (`TILT 0–125°`, `SEAT 3D PU`).
3. **Materials** — 3-up macro strip (mesh / aluminium / walnut leather) with
   captions; photographs only, no icon cards.
4. **The line** — flagship trio: Crown ₹49,990 · FlexRise ₹34,990 · Prestige ₹44,990,
   each as a large image with name/price and `View` — never a generic card.
5. **Made for workplaces** — B2B trust: quantity, GST invoicing, 7-yr warranty,
   bulk install across India; real numbers only.
6. **Customers** — 2–3 real review quotes.
7. **See it in your room** — AR entry (`ViewInYourRoom`).
8. **Close** — `Shop` + WhatsApp expert (`+91 80999 52624`) + showroom address
   (5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad) + `089193 17980`.

## Video plan (serves section 1)

- **Purpose:** hold the eye on the Crown in the room while the headline settles.
- Contents: real product photo `executive-chair-07.jpg` → image-to-video, **one
  continuous move** (slow 8° arc + gentle rack focus), locked warm lighting, no
  cuts, no people, seamless loop.
- Delivery: 1920×1080 + 1280×720, webm+mp4, ≤12MB/≤6MB; poster first frame;
  progressive load; hidden behind `prefers-reduced-motion`/Save-Data.
- QA gate: 12-frame Gemini strip, every axis (warp/flicker/lighting/loop/detail)
  ≥8, else regenerate (max 4 attempts).

## Copy voice

Specific, calm, confident. No slogans that could belong to a discounter.
Numbers real. Nothing filler.
