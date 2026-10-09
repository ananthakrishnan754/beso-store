# 02 — Monolith

**Idea (one sentence):** The chair as sculpture — a charcoal stage, a single
raking light, and one isolated product presented with museum gravity.

## References (opened + screenshotted; components borrowed)

1. **Poltrona Frau** (`refs/poltrona-frau-1440.jpg`) — full-viewport dark stage,
   theatrical spotlight on one isolated chair, centered with flanking arrows. →
   *borrow:* the dark single-object stage and the dramatic chiaroscuro lighting.
2. **Minimal Gallery** (`refs/minimal-gallery-1440.jpg`) — inky-black canvas with
   a refined transitional serif headline. → *borrow:* the black canvas + literary
   serif display headline treatment.
3. **Wilkhahn** (`refs/wilkhahn-1440.jpg`) — extreme macro crop of chair
   structure/joinery. → *borrow:* the macro structural close-up as a section
   opener (engineering implied, not diagrammed).

## Grid & spacing

- Centered single-axis stage for the hero (max 1440px, full-bleed image); content
  grid 12-col max 1200px elsewhere.
- Spacing scale (px): 4 8 12 16 24 32 48 64 96 128 160. Sections **128px** lg /
  72px mobile. Sparse — whitespace is the material.
- One focal point per screen; never more than two text blocks in view.

## Type scale (2 faces)

- Display: **Cormorant Garamond**, weight 400–500.
  - H1 `clamp(52px, 8vw, 104px)` / lh 0.94 / tracking −0.01em
  - H2 `clamp(36px, 5vw, 64px)` / lh 1.0
- Micro/UI: **Inter**.
  - label 12px uppercase tracking 0.18em · body 16px/1.7 · caption 12px/1.5
- Rules/labels in Inter uppercase; the serif carries all display.

## Palette (exact; measured contrast)

| Token | Hex | Use | Contrast |
|---|---|---|---|
| obsidian | `#0E0D0C` | page (stage) | — |
| graphite | `#1B1917` | panels/lift | — |
| bone | `#EDE6DA` | display + body | 15.7:1 on obsidian ✓ |
| mist | `#9A938A` | secondary (large/body ≥16px) | 6.4:1 on obsidian ✓ |
| brass | `#C9A15A` | accents, links, focus | 8.1:1 on obsidian ✓ |

Brass is the only chroma; used sparingly (<5% of surface).

## Motion rules

- Technique **C — ambient loop + reveals**: a slow looping spotlight glide as the
  hero background, sections fade/rise on enter.
- Reveal: opacity 0→1 + translateY 24→0px, **800ms**, `cubic-bezier(0.22,1,0.36,1)`;
  spotlight drift loops over 20s. One easing throughout.
- Focus ring: 2px brass, 2px offset (keyboard).

## Sections (each has a reason)

1. **Hero** — full-bleed dark stage, *BESO Prestige Executive Chair*
   (`executive-chair-04.jpg`) lit by a single raking light; centered display
   **"Weight, held in light."**; micro sub, `Explore` + `Book a visit`.
2. **Object study** — macro structural strip (armrest joinery, base, stitch) from
   real photos; serif caption per frame.
3. **In the room** — quiet counterpoint: one warm interior still to prove it lives
   in a real workspace (single image, generous margin).
4. **The collection** — flagship trio, dark, image-first, name + price.
5. **Crafted for the workplace** — B2B trust block (bulk, GST, warranty, install).
6. **Owners** — real review quotes, restrained.
7. **See it in your room** — AR entry, dark-theme.
8. **Close** — Shop + WhatsApp expert + showroom details.

## Video plan (serves section 1)

- **Purpose:** make the Prestige feel sculptural — light travelling across leather.
- Real photo `executive-chair-04.jpg` → image-to-video, **one continuous move**
  (slow orbit or a light sweep across the leather), locked exposure, no cuts, no
  people, seamless loop, matched to obsidian/brass.
- Delivery + QA gate identical to spec 01 (1080/720, webm+mp4, poster, 12-frame
  Gemini QA all axes ≥8).

## Copy voice

Sparse and certain; short declaratives; materials named precisely. No exclamation,
no hype.
