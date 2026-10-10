# Teardown 05 — Simba Sleep (world-class mattress DTC)

**Reference:** https://www.simbasleep.com — "Engineering the perfect night's
sleep", a canonical world-class mattress/sleep e-commerce site.

**Idea to borrow (structure only):** the **mattress-DTC playbook**, applied to
furniture — ultra-wide hero video, a **trust strip**, **layered cross-section
storytelling**, best-sellers, a guide/quiz CTA, comparison, reviews, rich footer.

## Measured (Playwright, `teardown/simba/`)
- **Font:** `Barlow` (clean humanist sans). Base `#FFFFFF`, ink `#394547`
  (cool slate-green) on white.
- **Hero media:** an **ultra-wide video 1843×774 (2.38:1)**, 1080p.
- 155 images; page height ≈ 7211 (desktop) / 8408 (mobile).
- **No JS animation libraries** in the network.
- Sections seen: header (132px) → hero → "Buy direct at Simba…" band → tech
  storytelling → best-sellers → … → footer (About / Customer Service / …).
- Container widths ~1024, cards ~420/480.

## The mattress-DTC structure (what makes it "world class")
1. **Announcement/trust bar** (delivery · trial · guarantee).
2. **Ultra-wide hero video** with a single bold promise headline.
3. **Trust strip** — a row of guarantees under the hero.
4. **"What's inside"** — the signature **layered cross-section** (foam / springs /
   base) that explains the product like an engineering cutaway.
5. **Best-sellers grid** with "From £X" + Shop.
6. **Guided buying** — a quiz / "not sure?" CTA.
7. **Comparison**, **reviews**, **sustainability**, newsletter, rich footer.

## Map reference → BESO
| Simba | BESO (concept 8 "Engineered") |
|---|---|
| Trust bar | Free delivery · 5-year cover · 30-day trial |
| Ultra-wide hero video | Chair/desk studio clip + card with "Engineered for work." |
| Trust strip | Engineering · Free delivery · 5-year cover · 30-day trial |
| **Layered cross-section** | **"Four layers. One posture."** — mesh / memory foam / steel frame / aluminium base, scroll-revealed |
| Best sellers | Crown, FlexRise, Prestige, Milano with "From ₹" + Shop |
| Quiz CTA | "Not sure which chair?" → specialist / compare |
| Reviews | Verified-buyer quotes |
| Footer | Shop / Support columns + contact |

## Original execution
- Our own copy, products, prices and assets. White/clean palette with a calm
  blue accent `#4C7FE0`, `Manrope` display + `Inter` body (no copied type/assets).
- The **layered cross-section** is rebuilt with real BESO construction layers,
  not mattress layers, and scroll-revealed (the mattress-site signature).
