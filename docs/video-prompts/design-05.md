# Design 05 — Obsidian Precision

**Technique:** B (scrub video, dark) · **Duration:** 7s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: executive-chair-07.jpg relit dark — Crown chair on obsidian platform

Camera move: Continuous 45° orbit about the chair at constant angular speed, no cuts, camera height 100cm

Lens: 50mm f/2.0, spotlight follows subject
Lighting: Single directional spotlight from upper-right, emerald rim light, constant intensity
Palette: Obsidian #0E0E10, brass #C9A227, emerald #0F4C3A

Loop: n/a

## Negative prompt
no cuts, no text, no logos, no people, no chair warping (arms/legs/wheels), no spotlight flicker, no camera shake, no exposure change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
