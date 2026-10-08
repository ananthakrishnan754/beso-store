# BESO — 10 Switchable Landing Page Concepts

**Status:** Phase 1 complete (research done, Gemini critique passed).
**Rule set:** Current home page untouched ("Current" in the switcher). All 10
concepts keep: Shop CTA, WhatsApp expert CTA, flagship trio (Crown / FlexRise /
Prestige), B2B trust block, reviews, AR section, footer. Real content only.

## References actually opened & captured (Playwright, `~/oc/refs/`)

| Site | URL | Signal extracted |
|---|---|---|
| Herman Miller | hermanmiller.com | High-contrast neutral grids, clinical product silhouetting, structural clarity |
| Steelcase | steelcase.com | Split-screen architectural layout, warm taupe editorial blocks, corporate typography |
| Molteni | molteni.com | Heritage serif over massive negative space, hairline rules, stone/ivory plinths |
| Fatboy | fatboy.com | Chunky bold grotesque type, saturated badges, edge-to-edge lifestyle photography |
| Godly | godly.website | Curated masonry/bento grid, 1px border frames, dark utility pills, micro-interactions |
| Lumina | lumina-luxury-furniture.vercel.app | Dark-luxe gradients, ethereal serif, floating pill CTAs, studio spotlighting |

(Awwwards + Land-book attempts were blocked by bot challenge pages — logged, not cited.)

## Concept set (Gemini-iterated; no two alike)

### On-brand / warm / editorial — 4 concepts

**01 — The Hyderabad Atelier** *(Technique C: ambient loop + reveals)*
Architectural warm stone backgrounds, centered fine-line serifs, hairline
borders, museum-pedestal desk framing. Borrowing: Molteni.
Palette: `#F3ECE1` stone, `#1A1917` ink, `#8A6A3E` bronze.
Type: DM Serif Display (display) + Manrope (body). Motion: slow reveals, hairline draws.

**02 — Executive Humanics** *(Technique B: scroll-scrubbed video)*
Warm taupe asymmetric split-screens pairing boardroom ergonomics with crisp
sans-serif case-study callouts. Borrowing: Steelcase.
Palette: `#E7DFD3` taupe, `#242321` charcoal, `#B44A2E` rust accent.
Type: Manrope extrabold headings. Motion: video scrub synced to callouts.

**03 — Ergonomic Manifesto** *(Technique A: scroll-scrub frame sequence)*
Linen-textured ivory canvas, oversized justified editorial serif titles,
technical annotation overlays on chair silhouettes. Borrowing: Molteni + Herman Miller.
Palette: `#F6F2E9` linen, `#141312` ink, `#C0392B` annotation red.
Type: DM Serif Display huge scale. Motion: frame scrub + annotation reveals.

**04 — Living Office Horizon** *(Technique C: loop + parallax reveals)*
Soft daylight photography, natural oak tones, generous negative space, low-contrast
sand feature blocks. Borrowing: Fatboy warmth + Steelcase structure.
Palette: `#F0E9DC` sand, `#3B332B` bark, `#C9A227` brass.
Type: Manrope light + display serif accents. Motion: light-drift loop, soft parallax.

### Bold / technical / experimental — 6 concepts

**05 — Obsidian Precision** *(Technique B: scroll-scrubbed video, dark)*
Charcoal-to-black vignette, emerald/cognac leather accents, luminous hairline
typography, dramatic directional spotlighting. Borrowing: Lumina dark luxe.
Palette: `#0E0E10` obsidian, `#C9A227` brass, `#0F4C3A` emerald.
Type: thin-weight grotesque + serif italic accents. Motion: spotlight scrub.

**06 — The Spec Sheet Bento** *(Technique D + C: scroll-triggered playback + small loops)*
High-density dark UI grid, micro-metric cards, mechanism zoom tiles, live
availability tags, 1px borders. Borrowing: Godly bento.
Palette: `#121316` grid, `#2B6DE0` data blue, `#E8E6E1` paper.
Type: mono numerals (JetBrains-like) + grotesque. Motion: tile pop, trigger-play.

**07 — Clinical Monolith** *(Technique A: scrub frame sequence)*
Pure laboratory starkness, oversized heavy grotesque headers, engineering
schematics, zero decorative color. Borrowing: Herman Miller brutalism.
Palette: `#FFFFFF` lab white, `#000000` lab black, `#0033FF` blueprint blue.
Type: Archivo/Anton-weight grotesque caps. Motion: hard mechanical frame steps.

**08 — Kinetic Spine** *(Technique A + D: scrub + triggered play)*
Dark viewport where vertical scroll mechanically articulates chair
tilt/height mechanisms, flanked by ticking degree indicators. Borrowing: Lumina
lighting + Herman Miller technical focus.
Palette: `#101215` viewport, `#4DE0C0` instrument teal, `#F4F1EA` screen white.
Type: tabular numerals + condensed grotesque. Motion: scrub-driven articulation.

**09 — Showroom Runway** *(Technique B: horizontal-scroll synced video scrub)*
Full-height side-scrolling track, desks and chairs transitioning from solo
renders to corporate interiors. Borrowing: Godly rhythm + Molteni curation.
Palette: `#EDE7DC` runway, `#1C1B1A` gallery, `#7A8B6F` sage.
Type: wide-tracking display caps. Motion: horizontal pin + scrub.

**10 — The Pop Ergonomic** *(Technique C + B: ambient loop + hero scrub, bold DTC)*
Bold high-impact typography, geometric accent badges on posture stats, vivid
edge-to-edge home-studio photography. Borrowing: Fatboy.
Palette: `#FFE9D2` peach, `#FF5C35` pop orange, `#161616` ink.
Type: fat grotesque display. Motion: badge pops, loop + hero scrub.

## Technique distribution (per mission rules)

| Technique | Designs | Count |
|---|---|---|
| A (scrub frame sequence) | 03, 07, 08 | 3 |
| B (scrub `<video>`) | 02, 05, 09 | 3 |
| A or B (scrubbing) | 02, 03, 05, 07, 08, 09 (+10 partial) | **7 ≥ 5** ✓ |
| C (ambient loop + reveals) | 01, 04, 06, 10 | **4 ≥ 3** ✓ |
| D (scroll-triggered play) | 06, 08 | 2 |
| Combined techniques | 06 (D+C), 08 (A+D), 10 (C+B) | **3 ≥ 2** ✓ |

No two designs share a layout logic: centered pedestal / asymmetric split /
editorial manifest / soft lifestyle / dark spotlight / bento grid / brutalist
monolith / instrument viewport / horizontal runway / pop DTC.

## Video plan per design → `/docs/video-prompts/design-NN.md`

| # | Clip type | Camera move | Palette anchor |
|---|---|---|---|
| 01 | loop 5s | slow light drift across showroom | stone/ivory |
| 02 | scrub 7s | lateral dolly across boardroom | taupe |
| 03 | scrub 6s | slow dolly-in on chair from front | linen |
| 04 | loop 5s | soft light move through window | sand/oak |
| 05 | scrub 7s | orbit 45° around chair, spotlight | obsidian |
| 06 | play-on-enter 4s | mechanism close-up push | grid dark |
| 07 | scrub 6s | linear push, blueprint-style | lab white |
| 08 | scrub 8s + 1 trigger | tilt-mechanism articulation | instrument |
| 09 | scrub 7s (horizontal) | track dolly along showroom | runway |
| 10 | loop 4s + hero scrub 6s | fast but smooth push | pop orange |
