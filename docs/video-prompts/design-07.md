# Design 07 — Clinical Monolith

**Technique:** A (scrub frames) · **Duration:** 6s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: executive-chair-07.jpg on pure lab-white cyc wall

Camera move: Perfectly linear push-in along chair centerline, mechanical constant speed, absolutely locked

Lens: 40mm f/5.6 deep focus, clinical clarity
Lighting: Flat frontal studio light, clinical white balance, constant
Palette: Lab white #FFFFFF, lab black #000000

Loop: n/a

## Negative prompt
no cuts, no text, no logos, no people, no perspective drift, no warping, no flicker, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
