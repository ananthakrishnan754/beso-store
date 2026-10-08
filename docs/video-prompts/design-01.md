# Design 01 — The Hyderabad Atelier

**Technique:** C (ambient loop) · **Duration:** 5s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: executive-chair-07.jpg (BESO Crown chair on cream studio bg)

Camera move: Static locked tripod, only the light moves — a slow daylight sweep left-to-right across a warm stone showroom wall behind the chair

Lens: 35mm, f/2.8, shallow background falloff
Lighting: Warm morning sun rake, honey-amber, fixed direction, constant intensity drift
Palette: Warm stone #F3ECE1, ivory, honey amber

Loop: Mandatory: light sweep must return to start frame; verify by double playback

## Negative prompt
no cuts, no text, no logos, no people or hands, no camera movement, no chair warping (arms, legs, wheels, backrest), no flicker, no color shift

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
