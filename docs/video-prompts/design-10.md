# Design 10 — The Pop Ergonomic

**Technique:** C (loop) + B (hero scrub) · **Duration:** 4s loop + 6s scrub · **Ratio:** 16:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: gaming-chair photo in a vivid home-studio, peach backdrop

Camera move: Loop: static, only a soft graphic gradient drifts. Scrub hero: fast-but-smooth 0.6m push-in, constant speed

Lens: 40mm f/2.5
Lighting: Bright pop studio light, saturated, fixed
Palette: Peach #FFE9D2, pop orange #FF5C35, ink #161616

Loop: Loop clip mandatory seamless; scrub clip not looped

## Negative prompt
no cuts, no text, no logos, no people, no chair warping, no flicker, no camera shake, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
