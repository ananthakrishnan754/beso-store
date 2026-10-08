# Design 02 — Executive Humanics

**Technique:** B (scrub video) · **Duration:** 7s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: height-table-01.jpg (FlexRise standing desk, cream studio)

Camera move: One continuous lateral dolly 1.5m left-to-right at constant speed, camera height 110cm fixed, no cuts

Lens: 50mm, f/2.0, locked focus on desk edge
Lighting: Soft north-window light, constant exposure, fixed direction
Palette: Warm taupe #E7DFD3, charcoal, rust accent

Loop: Not required — scroll scrubs it

## Negative prompt
no cuts, no text, no logos, no people, no desk-edge warping, no height-adjust wobble, no flicker, no camera shake, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
