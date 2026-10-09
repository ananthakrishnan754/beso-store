# First-Pass Postmortem — 10 Landing Concepts

**Date:** 2026-10-09 · **Verdict:** first pass rejected. Reset to production home; concepts archived.

The first pass (10 switchable landing concepts, built in one batch) is not
presentable. It is archived, not deleted, on branch `archive/first-pass-concepts`
(tip `ebd31bb`): the ten `d01–d10` design folders, `shared.tsx`, `ScrollVideo.tsx`,
the three generated clips under `public/assets/videos/designs/`, `docs/concepts.md`
and `docs/video-prompts/`. `main` renders only the production home.

Evidence for everything below lives in `docs/postmortem-shots/`
(30 full-page captures at 390/768/1440, contact sheets, 12-frame video strips,
and Gemini's verbatim critiques in `gemini-critique-concepts.txt` /
`gemini-critique-videos.txt`).

---

## 1. How it was reviewed

- **Screenshots:** all 10 concepts at 390 / 768 / 1440 px, full page, from the
  archived build (`docs/postmortem-shots/dNN-{390,768,1440}.jpg`).
- **Gemini (opencli), above-the-fold contact sheet:** harsh Awwwards-jury /
  brand-director critique of the hero of all ten side by side.
- **Gemini (opencli), video QA:** 12 evenly spaced frames per existing clip,
  scored 1–10 on warp / flicker / lighting / loop seam / detail.
- **Objective checks:** `ffprobe`/`ffmpeg` on the clips, DOM measurement
  (page height, horizontal overflow), console capture.

---

## 2. Objective failures (measured, not opinion)

| Check | Result |
|---|---|
| Page height @1440 | **6,612 – 9,518 px** every concept (no editing; everything stacked) |
| Page height @390 | **8,538 – 11,301 px** |
| Horizontal overflow | none (the one thing that passed) |
| Concept videos present | **3 of 10**; `04.mp4`–`10.mp4` returned **404** |
| `03.mp4` | **truncated / corrupt** (`ffmpeg`: *partial file, invalid NAL unit*) |
| `01.mp4` | **720×1280 portrait** in a 16:9 hero slot; `02/03` are 1280×720 |
| Clip quality | all **720p / 24 fps**, ~2.7 MB, 10 s — below the 1080p bar |
| Console | **hydration warning on every concept** (`Extra attributes from server: data-theme, style`) + a 404 per missing clip |
| Shared code | all ten imported one block kit (`shared.tsx`) + one `ScrollVideo.tsx` → one skeleton, ten skins |

---

## 3. Gemini's concept critique (condensed; verbatim in the evidence file)

> *"Most of this is filler. Premium furniture isn't just sold; it's curated.
> These concepts are trying so hard to 'look' the part that they forget to 'be'
> the part."*

| # | Concept | Gemini's takedown (condensed) |
|---|---|---|
| 01 | Warm-Ivory Atelier | Generic centered-headline+CTA template; **no furniture above the fold**; illegible micro-type; stacked capsule buttons, no hierarchy |
| 02 | Executive Humanics | Generic split-screen DTC; cramped 3-stat row; ungrounded desk "floating in space"; discordant alignment |
| 03 | Ergonomic Manifesto | "Typographic soup"; serif/sans fighting; ragged-right block broken; **red italic "geometry" barely legible on beige**; no product |
| 04 | Living Office Horizon | 75 % empty screen mistaken for minimalism; microscopic text; floating pills with zero anchor |
| 05 | Obsidian Precision | Product image/headline overlap; **dark chair on dark olive = looks cheap, hides ergonomics**; yellow-on-image unreadable; "back-alley" vibe |
| 06 | Spec Sheet Bento | Generic dark 3-col cards; grid "an absolute mess"; fragmented tiny specs; dark-on-dark, no product detail; "unconfigured dashboard" |
| 07 | Clinical Monolith | Empty top half; three stacked text layers bottom-left; subtext misaligned vs heavy CTA; brutalist table-cell gimmick |
| 08 | Kinetic Spine | Telemetry/HUD/monospace sci-fi; **"complete mismatch … destroys executive furniture credibility"** (round-1 score 23/50) |
| 09 | Showroom Runway | Off-center image footer; cramped illegible utility labels; cropped desk unrecognizable; italic headline disconnected |
| 10 | Pop Ergonomic | **Worst offender:** "budget retail sale"; red "SIT BETTER. NO JOKES."; crowded badge row; cheap DTC copy |

**Aggregate verdicts (Gemini):**
- *Do the ten feel like one template?* "No — but they suffer the same creative
  anxiety: alternating between wanting to be high-art (brutalist, massive type)
  and wanting to be functional eCommerce (stats, tiny specs, CTAs). Typography
  and grid patterns are wildly inconsistent."
- *Any premium furniture-brand quality (Vitra / Herman Miller / Hem / Muuto)?*
  **"No."** Those brands rely on narrative and materiality — large, warm,
  authentic photography or disciplined sculptural studio shots with generous,
  natural padding and razor-sharp type. "None of these layouts have the
  confidence to let the materials breathe."
- Best-of-a-bad-bunch: 02 (least worst). Worst: 10.

---

## 4. Video QA (Gemini, 12-frame strips) — all three FAIL

| Clip | Warp | Flicker | Lighting | Loop | Detail | Result |
|---|---|---|---|---|---|---|
| 01 | 4 | 3 | 2 | 1 | 5 | **FAIL** |
| 02 | 1 | 3 | 4 | 1 | 4 | **FAIL** |
| 03 | 2 | 2 | 5 | 1 | 6 | **FAIL** |

> *"Every single video commits the fatal AI error of starting from an isolated
> e-commerce image on flat white and hallucinating an environment from frame 2."*
> 02 *"literally transforms one product into a completely different piece of
> furniture mid-video."* 03 has *"nauseating snap-zooms with warping pleat
> geometry."* Putting these on the site *"would make the brand look like a
> fly-by-night drop-shipping operation."* — **None usable.**

This is a sourcing problem, not a tweak: the clips were made by generating an
environment *around a cut-out product*. The fix is a single continuous camera
move **from a real product photo** with locked lighting (see the video rules).

---

## 5. Root causes

1. **Template-first, brand-second.** One layout skeleton + one block kit reused
   ten times. Concepts were "skins" (palette + heading copy), not different
   studios' work.
2. **Off-brand language per concept.** Sci-fi telemetry (08), academic
   spec-sheet (06/07), loud discount DTC (10) — none of it says *premium
   ergonomic furniture*.
3. **Undisciplined typography.** Mixed serif+sans+italic faces, wrestling type
   scales, illegible micro-text, no consistent tracking/line-height; several
   concepts exceed the 2-typeface limit.
4. **The product is not the hero.** Centered headline+paragraph+CTA with no
   furniture (01, 04); floating ungrounded cut-outs (02, 05). Expensive design
   sold without showing the design.
5. **No spacing or grid system.** Either empty-acres "minimalism" (01/04) or
   crammed bottom-left clusters (02/06/07/10). Padding changes every section.
6. **Contrast failures.** Red italic on beige (03), dark-on-dark (05/06),
   yellow-on-photo (05) — below AA in the exact places meant to communicate.
7. **Copywriting was sprint-quality.** "NO JOKES.", "Sit properly." — cleverness
   instead of confidence.
8. **Motion/video unauthored.** 7 clips missing, 3 hallucinate environments and
   warp the product, no loop seams, portrait/landscape mismatch, 720p.
9. **No quality gate.** The batch was "verified" only against a structural
   checklist (six blocks present, unique H1s, 0 page errors) — never craft,
   contrast, mobile, or motion. Nothing was ever compared to a reference.
10. **Research from memory.** References were noted from recall, not from sites
    actually opened and screenshotted.

---

## 6. What the rebuild must do (each root cause → a binding rule)

| # | Root cause | Binding rule for the new designs |
|---|---|---|
| 1 | One template reused | Build one design at a time; each from 3 *opened* references; no shared block kit. Different type, grid, palette, motion, and studio voice per design. |
| 2 | Off-brand language | Every design must read "premium ergonomic furniture" with no explanation. A concept that mixes in sci-fi / discount / academic tone is cut. |
| 3 | Type chaos | ≤2 named typefaces; one documented type scale (sizes/tracking/line-height); no micro-text below 12 px; no decorative italics. |
| 4 | Product not hero | Real BESO product photography is the focal point of every above-the-fold screen; products are cropped, masked, and lit intentionally — never in a generic card. |
| 5 | No spacing system | Fixed spacing scale and grid per spec; consistent section rhythm; whitespace is composed, not left over. |
| 6 | Contrast failures | Every text/background pair ≥ WCAG AA, verified in-spec with exact hex + ratio. |
| 7 | Weak copy | Copy is specific and confident; no slogans that could belong to a discounter. |
| 8 | Un-authored motion | Every clip has a one-line purpose, comes from a real photo via a single continuous locked-light camera move, passes a 12-frame Gemini QA (all axes ≥8), and only then is used. Progressive-load poster fallback for mobile/reduced-motion/Save-Data. |
| 9 | No gate | Ship only after: shots at 390/768/1440 + scroll recordings; Gemini vs the 3 references scoring **every axis ≥8.5**; Lighthouse mobile ≥85; CLS <0.1; no console errors; no horizontal overflow; keyboard-accessible switcher; AA contrast. Up to 6 fix rounds, else the concept is deleted. |
| 10 | Memory research | Open and screenshot ≥25 real reference sites (Awwwards/Godly/Land-book + Vitra, Herman Miller, Hem, Muuto, Framery, Fully, Aesop-style editorial, Apple product). Only cited, screenshotted sites count. |

## 7. Plan of record

1. **Restore** production home; archive first pass (done).
2. **Diagnose** (this document).
3. **Raise the bar:** open + screenshot ≥25 references into `docs/refs/`; pick
   3 named references per concept; write a one-page spec per concept in
   `docs/specs/NN.md` (idea, grid/spacing, type scale, palette + contrast,
   motion rules, section-by-section layout + copy, video plan).
4. **Build 3 designs only**, one at a time, never batching; each must pass the
   gate before the next starts.
5. **Gate** each (screenshots + slow/fast/reverse scroll recordings; Gemini
   score ≥8.5/axis vs references; Lighthouse/CLS/a11y/overflow); log in
   `docs/review-log.md`.
6. **Expand** toward 10; ship only passers; report how many passed and why the
   rest were cut.
7. **Deliver** a Vercel preview (switcher = Current + passing designs) and
   `docs/pitch.md` (2-line pitch + final scores per design).
