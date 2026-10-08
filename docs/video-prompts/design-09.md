# Design 09 — Showroom Runway

**Technique:** B (horizontal scroll + scrub) · **Duration:** 7s · **Ratio:** 21:9
**Status:** prompt drafted | attempt: — | score: —

## Prompt (image-to-video, first frame = our real photo)

Subject: First frame: showroom aisle with BESO chair at left, desks receding right

Camera move: Continuous track dolly 4m right along the aisle at walking pace, constant speed, camera height 140cm, no cuts

Lens: 35mm f/2.8, mild background falloff
Lighting: Showroom gallery light, constant exposure
Palette: Runway #EDE7DC, gallery #1C1B1A, sage #7A8B6F

Loop: n/a

## Negative prompt
no cuts, no text, no logos, no people, no furniture warping, no camera shake, no flicker, no lighting change

## Segments (for longer moves)
If a single generation cannot hold 6-8s, split into 2 segments where segment 2's
first frame = segment 1's last frame (extracted via ffmpeg), then concat.

## Attempts log
| # | score | result | change made |
|---|---|---|---|
