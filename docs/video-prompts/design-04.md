# Design 04 — Living Office Horizon

**Technique:** C (loop + parallax) · **Duration:** 5s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: height-table-01.jpg composited into a soft-daylight oak home office

Camera move: Static camera; only volumetric daylight drift and dust motes move

Lens: 35mm, f/2.2
Lighting: Soft west-window daylight, gentle parallax in light pool
Palette: Sand #F0E9DC, oak, brass #C9A227

Loop: Mandatory seamless — light pool must loop

## Negative prompt
no cuts, no text, no logos, no people, no furniture warping, no camera movement, no flicker

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
