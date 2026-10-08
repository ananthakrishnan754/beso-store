# Design 08 — Kinetic Spine

**Technique:** A (scrub) + D (trigger play) · **Duration:** 8s + 4s · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: executive-chair-07.jpg at neutral tilt

Camera move: Static camera. The chair itself articulates: backrest tilts back ~25° while seat pan counter-tilts, then gas-lift rises 12cm — one continuous mechanical motion, constant speed

Lens: 85mm, f/3.5, locked focus on the synchro mechanism
Lighting: Dark viewport, instrument-teal edge light from below, fixed
Palette: Viewport #101215, teal #4DE0C0, screen white #F4F1EA

Loop: n/a (scrub)

## Negative prompt
no cuts, no text, no logos, no people, NO morphing of geometry (rigid parts only move as a mechanism), no wobble, no flicker, no lighting change, no camera shake

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
