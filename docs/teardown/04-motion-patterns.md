# Teardown 04 — Top motion patterns (multi-source study)

Not a single site — a study of the **highest-impact scroll/animation patterns**
currently used by award-winning sites (Awwwards SOTD / Godly / GSAP showcase),
chosen for being implementable **dependency-free** (CSS + a single rAF loop)
so they ship in our Next.js app without adding GSAP/Lenis/three.js.

**Sources (structure/motion patterns only — no code or assets copied):**
- Awwwards — Best Animation / Scroll websites, "30 Great Websites with Parallax
  Scrolling" (awwwards.com/websites/animation, /inspiration/scroll-animations).
- GSAP showcase patterns (demos.gsap.com, GSAP Vault): *pinned horizontal gallery,
  scroll video scrub, parallax hero, SplitText reveal, magnetic cursor, velocity
  marquee, count-up stats*.
- A1 gallery "100 best scroll animation sites" (typographic/editorial studios).

## The patterns that carry "top" motion sites
1. **Pinned horizontal scroll** — vertical scroll drives a track of full-height
   panels sideways; a progress readout rides the same value. (Apple-keynote feel.)
2. **Scroll-scrub** — a pinned media element's transform/size is *locked to scroll
   progress* (not triggered), so motion is reversible and tactile.
3. **Multi-layer parallax** — 2–3 background layers translate at different speeds.
4. **Text mask reveal** — headline lines rise out of `overflow-hidden` masks,
   staggered (the `.kine` system already in this repo).
5. **Magnetic buttons + custom cursor** — the cursor lags with easing; buttons
   lean toward the pointer.
6. **Velocity marquee** — an infinite ticker whose speed/direction reacts to scroll.
7. **Count-up stats** — numbers animate when they enter view.
8. **Scroll progress indicator** — a global progress bar tying it together.

## Reference teardown notes
Both references studied earlier (Beyond Medals, Céragrès) confirmed the *motion*
principle: no keyframe libraries — motion is **scroll-linked** (parallax / sticky)
plus hover CSS transitions. The strongest award sites add **pinning + scrub**.

---

# Implemented — Concept 7 "Kinetic"

A motion-led, light editorial concept (base `#F4F2ED`, ink `#121212`, accent
`#E4521E`, bold grotesk) that packages the patterns above for furniture:

| Section | Pattern |
|---|---|
| Hero | multi-layer parallax + line-mask headline + magnetic CTA + custom cursor |
| The line | **pinned horizontal scroll** (5 flagship panels pan sideways with a progress bar) |
| Ergonomics | **scroll-scrub** pinned product (scale + spec copy locked to progress) |
| Ticker | **velocity marquee** (reverses/speeds with scroll direction) |
| Numbers | **count-up stats** |
| Statement | **word-by-word reveal** on scroll |
| Footer | — |

All hand-rolled: one `requestAnimationFrame` scroll loop writing `transform`
only (GPU), reduced-motion aware, no third-party animation dependency.
