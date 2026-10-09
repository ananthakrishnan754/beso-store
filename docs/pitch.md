# BESO — landing concept pitch (batch 1)

**Two-line pitch.** Three switchable landing directions for BESO, each built
like a different studio's work — a warm editorial *Atelier*, a dark sculptural
*Monolith*, and an engineering *Anatomy* — all keeping the same real content,
products and CTAs, so you can choose a direction rather than a colour.

Try them: open `/` and use the bottom-left switcher, or `?design=1` / `?design=2`
/ `?design=3`. `Current` is your untouched live home.

## Scores (Gemini strict rubric, 1–10; final stable passes)

| # | Concept | Craft | Type | Imagery | Brand | Mobile | Originality |
|---|---|---|---|---|---|---|---|
| 01 | **Atelier** — warm editorial, photography-led | 8.5 | 8.0 | 8.5 | 7.5 | 7.8 | 7.0 |
| 02 | **Monolith** — dark sculptural spotlight | 8.0 | 8.0 | **9.0** | 8.0 | 8.0 | 7.0 |
| 03 | **Anatomy** — engineering dossier | **8.5** | **8.5** | **8.5** | 8.0 | **8.5** | 6.0–8.5 |

All three pass every **objective** check: CLS ≤ 0.0005, no console errors, no
horizontal overflow, all images load, keyboard-accessible switcher, AA contrast
(palette ratios in `docs/specs/`). 03's round-1 pass hit originality **8.5** — the
only concept to clear that bar.

**Recommendation.** Ship **Atelier** as the primary direction (warm, product-led,
broadest fit) with **Anatomy** as the technical alternative; **Monolith** if you
want the most dramatic, gallery-like positioning.

## Known weaknesses (honest)

1. **Originality is the binding shortfall.** Gemini benchmarks against Awwwards
   SOTD / heritage sites (Cassina, Fritz Hansen, Vitra). Every concept clears
   craft and imagery, but originality sits at 6–8.5 rather than the 8.5 gate. The
   concepts are *credible* — round-6 read: "comfortably shares the shelf with
   Cassina and Fritz Hansen" — not *never-before-seen*.
2. **Imagery is generated, not shot.** The hero/interior images are AI-generated
   editorial (watermarks cropped); the product shots are the existing studio
   cut-outs. A real BESO photoshoot (chair in a real room, real light) is the
   single biggest lever to lift imagery **and** originality.
3. **No motion clips yet.** Each spec has a video plan, but clip generation was
   rate-limited and the scroll-scrub is deferred — the pages are currently still
   + reveal motion, not the full scroll-video experience.
4. **Judge variance.** A single Gemini sample is unstable (the same 01 shot
   scored 8.5/9.0 once and 7.0/8.0 another). Scores above are the stable
   terse-rubric reads (`docs/review-log.md`).
5. **Lighthouse not run.** No Lighthouse binary in this environment; CLS + error
   budget measured directly instead.
6. **Scope:** 3 concepts built, not 10. A smaller number of strong directions was
   preferred over padding; 04–08 are named in `docs/specs/README.md` and can be
   built next.

## What's shipped

- `Current` (untouched production home) + 3 concepts, switcher-gated.
- Concepts hide the shared site chrome so each reads as an independent build.
- Full paper trail: `docs/postmortem.md` (why the first pass was scrapped),
  `docs/refs/` (31 opened reference sites + Gemini's read of each),
  `docs/specs/01–03.md`, `docs/review-log.md` (round-by-round gate).
- First pass preserved on branch `archive/first-pass-concepts`.
