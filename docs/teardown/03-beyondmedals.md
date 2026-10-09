# Teardown 03 — Beyond Medals (module editorial store)

**Reference:** https://www.beyondmedals.com/en-AU (via siteinspire).
**Idea to borrow (structure/UI only):** a streetwear e-commerce built from big
**modules** separated by large gaps — announcement bar, 3-zone nav, a **2-up
video hero**, a **video-list module**, a **many-column catalogue grid**, an
editorial break, a **gallery index list**, and a stacked footer.

## Evidence (`docs/teardown/beyondmedals/`)
`bm-{1440,768,390}-{top,full}.jpg`, `_data.json`. Heights ≈ 5575 / 7438 / 6667.
(Full-page screenshots are partly blank — the site lazy-loads modules.)

## What the DOM/network shows
- **Fonts:** `semimono` (a semi-monospace) for essentially everything + a
  fallback sans. Almost all UI is UPPERCASE.
- **Palette:** body `#FFFDFA` (warm white) on `#141313` (near-black).
- **Portrait hero video:** `AW2627_Website_Header.mp4` at **720×900** (4:5) —
  the hero media is portrait, not landscape.
- **Modules** (from computed layout):
  - Root `StartTemplate…container` = flex column, **gap 144px**, height ~5089.
  - `ModuleVideoList` — a **video list** (11 videos) with a
    `314px 620px 314px` grid + a thumbnail strip.
  - `ModuleCollectionHighlightGrid` — a **~11-column** image grid (10 items,
    66px columns, 24px gap).
  - `ModuleGalleryList` — a **160-image** horizontal gallery strip.
  - Footer — `360px ×4` columns.
- **No GSAP/Lenis/Swiper** detected in the network → CSS/framework transitions.

## Gemini layout read (desktop + mobile)
- **Announcement bar** (dark, ~32px, centered uppercase caps).
- **Nav:** 3 zones — left SHOP/EXPLORE/ARCHIVE/SEARCH, center wordmark, right
  LOGIN/HELP/SAVED/BAG; overlaid, ~64px.
- **Hero:** **2 equal columns, 0 gutter**; each a full-height video with a
  centered title + small bordered button. Mobile → stacks, portrait frames.
- **Video module:** full-width video + a "VIDEOS" label and a "LAST DANCE / VIEW
  ALL" sub-bar.
- **Catalogue:** 4-col (desktop) → **staggered 2-col** (mobile); cards carry an
  **index number (01, 02…)**, title, price, and floating EXPLORE badges.
- **Gallery** (mobile): becomes a **text index** — rows of *title · image count*
  separated by dotted hairlines.
- **Footer:** stacked — newsletter (email + subscribe + terms checkbox), brand
  bio, Customer Support, Information links, Social, Payment, currency/copyright.

## Map reference section → BESO
| Reference | BESO |
|---|---|
| Announcement bar | "Free shipping across India · 48-hour dispatch · GST invoicing" |
| 3-zone nav | Shop / Explore / Archive / Search · BESO · Archive / Enquire |
| 2-up video hero | "The Work Series" (light) / "The Home Series" (dark) |
| Video module | 5 furniture film loops (studio, Crown, Prestige, FlexRise, mesh) |
| Staggered catalogue | 12 pieces with index numbers, title, price, category |
| Editorial break | "Built for the work day" video banner |
| Gallery index | Collection rows with **real counts** (chairs 36, tables 35, …) |
| Stacked footer | Newsletter + terms, brand bio, Information, Social, Payment |

## Original execution
- **Our own copy, products and generated clips** — no text, images, video or
  code copied from the reference.
- Typography/`uppercase` and the warm-white/near-black pairing are the only
  borrowed *principles*; structure and module rhythm mirrored.
- Videos are ffmpeg push-ins from real BESO photos (interim) — see content-gaps.
