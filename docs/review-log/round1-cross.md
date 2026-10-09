# Phase 5 Cross-Review — Round 1 (Gemini, 5 concepts shown)

| # | Concept | Impact | Distinct. | Type | Brand | CTA | Total |
|---|---|---|---|---|---|---|---|
| 01 | Warm-Ivory Editorial Atelier | 9 | 8 | 9 | 10 | 8 | **44/50** |
| 05 | Dark Obsidian Luxe | 8 | 6 | 8 | 8 | 7 | 37/50 |
| 07 | Brutalist White | 7 | 8 | 7 | 5 | 7 | 34/50 |
| 06 | Dark Bento Data Grid | 7 | 6 | 6 | 5 | 8 | 32/50 |
| 08 | Dark Instrument HUD | 6 | 7 | 4 | 2 | 4 | **23/50** |

**Winner:** 01 Atelier (warm-ivory editorial = premium physical craftsmanship)
**Weakest:** 08 Kinetic Spine — *"Complete mismatch. Over-indexed on telemetry,
monospace callouts, sci-fi aesthetic. Destroys executive furniture credibility."*

## Fixes applied to 08 (Gemini round 1)

1. BG `#000000` → warm charcoal `#141312`; cyan grid lines → `rgba(235,230,224,0.08)`
2. H1 → refined grotesque 56px/64px, weight 400, tracking -0.02em; monospace
   restricted to SKU/dimension metadata only, 12px/16px, `#8E8A85`
3. CTA: wireframe → solid pill, height 48px, padding 0 28px, bg `#EBE6E0`,
   text `#141312`, 14px/600, radius 9999px, hover `#FFFFFF`,
   `transition: all 200ms cubic-bezier(0.16,1,0.3,1)`
4. Strip HUD reticles/crosshairs/faux coordinates; hero container
   max-width 1200px, padding 96px 24px 64px
5. Telemetry overlays → bottom utility dock: bg `#1C1B19`, border-top 1px
   `rgba(255,255,255,0.08)`, padding 16px 32px, slide `translateY(0)` with
   `350ms cubic-bezier(0.25,1,0.5,1)`

## Gemini follow-up notes (open)

- Draft a full copy deck for 01 Atelier
- Convert 06 Bento into a "luxury spec module" (less DevTools, more spec sheet)
