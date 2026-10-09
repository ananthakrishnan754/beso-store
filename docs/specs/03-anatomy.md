# 03 — Anatomy

**Idea (one sentence):** An engineering dossier that reads as luxury — one
product pinned on a dark stage while scroll drives its exploded view, tolerances,
materials and numbers with spec-sheet precision.

## References (opened + screenshotted; components borrowed)

1. **Apple MacBook Pro** (`refs/apple-macbook-1440.jpg`) — dark stage, raking rim
   light on CNC edges, tight spec micro-copy, pill CTAs. → *borrow:* dark hardware
   stage with raking edge light, and the tight spec micro-copy typography.
2. **Wilkhahn** (`refs/wilkhahn-1440.jpg`) — macro crop of structural joinery as
   the lead image. → *borrow:* the mechanism macro as the section spine
   (engineering via photography, not diagrams).
3. **Humanscale** (`refs/humanscale-1440.jpg`) — clean 50/50 audience routing
   under a light header. → *borrow:* the dual-audience routing idea (Home vs
   Commercial) as a single honest section, not a gateway modal.

## Grid & spacing

- 12-col max **1200px**; a **pinned product stage** (sticky, ~70vh) on the left 7
  cols while the right 5 cols scroll copy locked to the same scrub progress.
- Spec rows: label (Inter 12 uppercase) / value (tabular). Rule lines 1px.
- Spacing scale (px): 4 8 12 16 24 32 48 64 96 128. Sections 96px lg / 64px mobile.
- Dense but breathing: 32px between spec rows, 64px between blocks.

## Type scale (2 faces)

- Display/UI: **Space Grotesk**, weight 400–600.
  - H1 `clamp(40px, 5.5vw, 68px)` / lh 1.0 / tracking −0.02em
  - H2 30px/1.1 · stat 40px tabular
- Body/data: **Inter**.
  - body 16px/1.65 · spec value 14px tabular · label 11px uppercase tracking 0.14em
- No serif; the rigor is the voice. Tabular numerals for every dimension.

## Palette (exact; measured contrast)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| stage | `#101112` | page | — |
| panel | `#191A1C` | spec panels | — |
| bone | `#F2EFEA` | headings/body | 16.5:1 on stage ✓ |
| steel | `#C7CBD1` | secondary/data | 11.6:1 on stage ✓ |
| signal | `#D9541E` | single accent, large text/large UI only | 4.7:1 on stage ✓ (large) |

Signal is used for **one** thing: the active scrub-progress readout. Never for
body copy.

## Motion rules

- Technique **B — video/sequence scrub via scroll progress**, copy locked to the
  same `progress` value. First frame renders instantly (poster); frames load
  progressively.
- Pinned stage translate is transform-only; no layout thrash. `will-change`
  limited to the stage.
- Reveal: 0→1 opacity, 400ms, `cubic-bezier(0.2,0.8,0.2,1)`. Reduced-motion:
  static exploded diagram (single composite image), copy shown in full.

## Sections (each has a reason)

1. **Hero** — dark stage, Crown chair edge-lit; eyebrow `BESO · ERGONOMIC
   ENGINEERING`; H1 **"Every millimetre, accounted for."**; sub one line; CTA
   `Shop the collection` / `See the numbers`.
2. **Exploded** — pinned scrub: the chair assembles/disassembles as you scroll;
   right column lists real components (mesh back, 3D PU arms, Class-4 gas lift,
   100 mm travel, aluminum 5-star base).
3. **Numbers** — honest spec table: tilt 0–125°, seat height 70–120 cm (FlexRise),
   load 150 kg, tested 200,000 cycles, 7-yr warranty. Real values only.
4. **Materials** — 3 macro frames (mesh / leather / aluminium) with properties.
5. **Choose your side** — one section routing `Home office` vs `Commercial`
   (Humanscale idea), each a real image.
6. **The collection** — flagship trio with real prices.
7. **Workplace scale** — B2B trust (bulk, GST, install) + 2 real reviews.
8. **AR + Close** — `ViewInYourRoom`, Shop, WhatsApp expert, showroom details.

## Video plan (serves section 2)

- **Purpose:** demonstrate the mechanism honestly — a single mechanical truth.
- Real product/mechanism footage → image-to-video, **one continuous macro move**
  on the tilt/lift, locked light, no cuts, no people, loops smoothly.
- Delivery + 12-frame Gemini QA gate identical to spec 01.

## Copy voice

Engineer-precise, no adjectives that cannot be measured. Numbers are the poetry.
