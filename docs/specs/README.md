# Specs — directory & plan of record

Concepts are built **one at a time**, each must pass the quality gate
(Lighthouse mobile ≥85, CLS <0.1, no console errors, no horizontal overflow,
keyboard switcher, AA contrast, and Gemini scoring **every axis ≥8.5** vs the
references) before the next starts. A concept that cannot pass is deleted, not
shipped.

References are cited only from `docs/refs/` (screenshots I opened +
Gemini's descriptions in `docs/refs/_descriptions.md`).

**Build order (first batch of 3):**

| # | Concept | Studio voice | References (opened) |
|---|---|---|---|
| 01 | **Atelier** | Warm editorial atelier — one chair, one room. | Fritz Hansen, Cassina, Hem |
| 02 | **Monolith** | Dark sculptural spotlight — chair as sculpture. | Poltrona Frau, Minimal Gallery, Wilkhahn |
| 03 | **Anatomy** | Engineering dossier, done luxe. | Apple (MacBook Pro), Wilkhahn, Humanscale |

**Reserve concepts (specced when their turn comes, only if a slot is open):**

| # | Concept | Voice | Likely references |
|---|---|---|---|
| 04 | Atrium | Architectural B2B workplace at scale | Humanscale, Steelcase, Haworth |
| 05 | Fjord | Scandinavian quiet minimalism | Muuto, HAY, Normann Copenhagen |
| 06 | Grain | Materiality & tactile craft | Wilkhahn, USM, Ferm Living |
| 07 | Lumen | Warm light-led editorial storytelling | Ferm Living, Flos, Aesop |
| 08 | Marché | Premium direct commerce | Article, Fully, Knoll |

Shared, non-negotiable rules across every concept: real BESO photography as the
hero of each screen; ≤2 typefaces; one documented spacing scale; a real
per-section reason to exist; motion that serves the story; AA contrast; a
poster/`prefers-reduced-motion`/Save-Data fallback for every clip.
