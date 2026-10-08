# Design 03 — Ergonomic Manifesto

**Technique:** A (scrub frames) · **Duration:** 6s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: executive-chair-04.jpg (Prestige leather chair, cream studio)

Camera move: One slow linear dolly-in 0.8m toward the chair's backrest seam detail, constant speed, locked height

Lens: 50mm macro-look, f/2.5, shallow DoF resolving the stitching
Lighting: Single soft key from upper-left, fixed, constant exposure
Palette: Linen #F6F2E9, ink, annotation red #C0392B

Loop: n/a

## Negative prompt
no cuts, no text, no logos, no people, no leather warping or morphing, no zoom pulses, no flicker, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
