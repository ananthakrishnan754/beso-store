# Teardown 02 — Céragrès (promo-led / material-led)

**Reference:** https://www.ceragres.ca/
**Writeup:** https://www.cssdesignawards.com/sites/ceragres/49917/ — CSSDA
Website of the Day (2026). Tile/stone brand (Quebec).

**Idea to borrow (principles only):** a **promo headline as the entire hero**,
a **mega-menu that reveals large preview images**, and **large typographic index
rows** (projects, offer) with hairline rules — architectural, precise,
material-led.

## Evidence captured (`docs/teardown/ceragres/`)
`ceragres-{1440,768,390}-{top,full}.jpg`, `ceragres-1440-menu.jpg`, `_data.json`.
Heights ≈ 4547 / 4440 / 4728.

## What the DOM/network shows
- **Promo-as-hero:** H1 = the offer — *"JUSQU'À 30 % DE RABAIS JUSQU'AU 18
  OCTOBRE"* (up to 30% off). The page title is the promo too.
- **Fonts: PP Neue Montreal** (Book/Medium) + **PP Neue Mono** for meta labels.
  A precise grotesk; labels are mono/uppercase.
- **Palette:** body `#FAFAFA` (stone) on `#000` text. No colour — the material
  photography carries the tone.
- **Stack:** Nuxt/Vue; **Swiper** for carousels. **No GSAP / Lenis** in the
  network → motion is CSS/Vue transitions (restrained, short).
- **Section spine:** header → promo hero → *"Nos projets"* (projects index
  rows) → *"Notre offre"* (offer rows) → footer. Mega-menu panels drill down
  with preview images.

## The 3 details that carry the effect
1. **Offer-first hero** — a bold all-caps promo occupies the whole first screen
   on a stone ground; nothing else competes.
2. **Mega-menu with large preview images** that swap as you move through
   categories — the menu itself is a photographic experience.
3. **Index rows** (projects, offer) as big type separated by **hairline rules**,
   with an image revealed on hover — reads like an architecture-firm index.

## Map reference section → BESO
| Reference | BESO |
|---|---|
| Promo H1 hero (30% off) | **"Bulk discounts up to 25% from 5 units"** H1 + flagship CTA + WhatsApp link, slow push-in video/still behind |
| Mega-menu w/ preview | Category mega-menu: drill-down list + large preview image swapping on hover |
| "Depuis 1990" statement | Short brand statement (existing BESO copy) + quiet About link |
| "Nos projets" rows | **"Workspaces"** index rows (type · city · detail), hover image, "View all" |
| "Notre offre" rows | **"Our offer"** large rows: chairs, desks, tables… with count + hover image |
| Showroom/materials | **Materials**: pinned scrolled macro (leather / wood / mesh) with spec captions |
| "Programme Pro" | **BESO Pro**: credit terms, POs, account manager, 48h, warehouse, showrooms |
| Newsletter + footer | Newsletter **audience selector** (Individual / Business) + footer |

## Original execution notes
- Our **own copy** and real BESO products/counts; no invented clients/years.
- **Serif display + grotesk labels** (per brief), not the reference's all-grotesk.
- Stone/off-white base, charcoal text, one **brass/walnut** accent; hairline
  rules and a visible grid.
- Motion restrained 0.6–0.9 s cubic-bezier; **clip-path** image reveals.
