# Teardown 01 — Wanderhotels (mode switch)

**Reference:** https://www.wanderhotels.com/en/?season=winter
**Writeup:** https://www.cssdesignawards.com/sites/wanderhotels/49974/ — CSSDA
"Special Kudos" (Aug 2026), agency **KWER** (Austria). Tags: colorful,
eCommerce, photographic. Scores ≈7.6 (UI 7.63 / UX 7.72 / Innovation 7.43).

**Idea to borrow (principles only):** one home page that changes character with a
**Summer / Winter** switch — video, copy, tiles and products swap — on a warm
cream canvas with big, light editorial type and rich photography.

## Evidence captured (`docs/teardown/wander/`)
- `wander-{1440,768,390}-top.jpg` + `-full.jpg`; `_data.json` (network + fonts).
- Page height 6435 / 7434 / 6564 px.

## What the DOM/network actually shows
- **Two layered fullscreen `<video>` elements**, both `muted loop autoplay
  playsinline`, `object-fit:cover`. Both are in the DOM at once; the second is
  `position:absolute; top:0; left:0`. → the season switch is a **cross-fade / wipe
  between two stacked videos**, not a reload. Sources are Summer and Winter
  "abend" (evening) clips, each with a desktop and a **mobile-specific** cut.
- **No GSAP / Lenis / ScrollTrigger / Swiper / three.js** in the network. Motion is
  **CSS transitions + vanilla JS** (soft, ~0.8–1.2 s). The compass/dial is an SVG
  animated with CSS/JS, loaded further down the page.
- **Fonts:** `gyst-variable` (display) + `acumin-pro` (UI), via Adobe Fonts.
- **Type:** H1/H2 **61.6px / line-height 1.0 / weight 300** — large, light, tight.
- **Colours:** body `#F4F1EE` (cream) on `#383838` (deep ink).
- **Toggle:** `.season-switch` buttons — `Summer` / `Winter`.

## The 3 details that carry the "premium" feel
1. **Full-bleed dual-video hero with a soft cross-fade** — the warm cream chrome
   around an immersive, looping photograph is what reads expensive.
2. **Very large, light display type** (≈60px, weight 300, lh 1.0) on cream, with
   short stacked headline lines — calm, editorial, not shouty.
3. **Personalisation + rich photography pacing** — the name input and the
   staggered editorial tiles make it feel made-for-you rather than templated.

## Map reference section → BESO section
| Reference | BESO |
|---|---|
| Season switch (Summer/Winter) | **Mode switch OFFICE / HOME** (cross-fade hero video, swap copy, tiles, products; `?mode=home`, persisted) |
| Fullscreen dual-video hero, stacked headline | Hero video per mode; "Furniture / built for / the work / you do." (Office) / "…the life / you live." (Home) |
| Personalised greeting | "What should we call you?" → headline + CTA use the name (localStorage, skippable) |
| Editorial tiles grid | **8 real-link tiles**: Shop, Compare, Preview in AR, Bulk quote, Ergo expert, Showroom, Offers, Newsletter |
| Product carousel + inquiries/book | Featured carousel (Crown, FlexRise, Prestige…) with **Enquire / View** |
| Animated compass SVG | **Multi-part SVG dial that rotates with scroll = FlexRise 70–120 cm height gauge** |
| Two big image panels | **OFFICE / HOME** panels — hover expands, click sets mode |
| "Best reasons" | **6 BESO reasons** + 2 photos (see content-gaps for verification) |
| Catalogue + newsletter + icon footer | "Flip through BESO" → `/products`; newsletter (no invented prizes); footer icon links |

## Original execution notes (no copying)
- Our **own copy**, real BESO products/prices/links, Office/Home semantics.
- Our own **height-gauge dial** (not a compass), scroll-linked and lerp-smoothed.
- Cream/sand + one accent per mode (Office = deep teal, Home = terracotta).
- Video is image-to-video from real BESO photos (interim clips until client media
  arrives — see `docs/content-gaps.md`).
