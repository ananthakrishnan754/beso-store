# Design 06 — The Spec Sheet Bento

**Technique:** D (play-on-enter) + C (small loops) · **Duration:** 4s · **Ratio:** 1:1
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: macro of chair tilt mechanism (crown chair base region)

Camera move: Slow push 0.3m into the tilt mechanism, constant speed, locked height

Lens: 85mm macro, f/2.8, razor DoF on the mechanism
Lighting: Hard raking light to reveal machining, fixed
Palette: Grid dark #121316, data blue #2B6DE0

Loop: Mandatory for the small tile loops

## Negative prompt
no cuts, no text, no logos, no people, no metal warping, no flicker, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
