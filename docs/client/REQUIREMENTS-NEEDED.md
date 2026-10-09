# BESO Website — What We Need From the Client

_This is the content and decisions checklist. Where something is missing we use
a clearly-marked placeholder and log it in [`content-gaps.md`](../content-gaps.md),
rather than inventing it._

## A. Review of the product sheet you shared

**File:** "BESO WEBSITE PRODUCT DETAILS" (Google Sheet, single tab).
**Columns:** SL. NO. · PRODUCT ID · PRODUCT NAME · DESCRIPTION · PRICE ·
SPECIFICATIONS · DIMENSIONS · COLORS AVAILABLE · ANY OTHER MENTIONS ·
PHOTO 1 … PHOTO 9.

**What it contains right now:** the correct *header structure*, but only
**3 sample rows** (office sofa 2328, office chair LM-262A-1, office table
07-B222) and only **4 images** for 9 photo columns. Most detail cells are empty.

**Answer to "is this format enough to make 3D models and product details?"**

The **format (the columns) is the right idea** — it is close to enough. The
**contents are not complete enough yet**, so as provided it supports *some*
product pages and *rough* models, not a full, consistent build. Specifically:

- **Product detail pages — need, per product:**
  - `DESCRIPTION` filled (2 of 3 samples are blank/short).
  - `SPECIFICATIONS` filled (mostly blank) — e.g. material, mechanism, mesh/foam,
    armrest type, finish, warranty.
  - `DIMENSIONS` complete and consistent — ideally **W × D × H in mm**, plus
    seat height / desk height range where relevant. (Sample uses feet/inches for
    the sofa and inconsistent formatting for the table.)
  - `COLORS AVAILABLE` — full list (samples show one colour).
  - `ANY OTHER MENTIONS` — assembly, lead time, certification, warranty, etc.

- **3D models — need more than a front photo.** Our current 3D is clean
  CAD-style geometry built from dimensions, not a photoreal scan. To model well
  we need, **per product**:
  - Accurate **dimensions** (the single most important input), and
  - **Multi-angle photos** — if you use the PHOTO columns, please define them as
    consistent angles: **front, 45° ¾, side, back, top**, on a **plain,
    uncluttered background**, even lighting, no people, no logos, no harsh
    shadows, no obstructions. One front photo alone gives a low-fidelity model.
  - **If the manufacturer already has 3D/CAD files (STEP/OBJ/FBX/GLTF), that is
    by far the best source** and skips photo-based modelling entirely — please
    tell us if these exist.

- **Honest limitation:** photoreal 3D from single photos of **upholstered or
  curved** furniture (sofas, padded chairs) is unreliable — machine
  reconstruction hallucinates the unseen side. Clean CAD geometry from
  dimensions or real CAD files is what works. We will not silently ship a
  warped model.

**One-line ask:** keep this exact sheet format, but (1) fill every column for
**all** products, (2) use the PHOTO columns as a **defined set of angles**, and
(3) tell us whether manufacturer CAD files exist.

## B. Content & assets we are waiting on

1. **Final photography** — multi-angle per product (or a photographer brief we
   can follow).
2. **Final hero videos** — you said you would provide these; we have generated
   interim clips to prove the layout.
3. **Completed product sheet** (per section A) for all products.
4. **Logo files** — vector (SVG/AI/EPS) if available; we are using a PNG.
5. **Brand basics** — confirm exact brand name spelling and any tagline.
6. **Legal/contact** — GST/legal entity name for the footer, and confirmation of
   the phone/WhatsApp/address to publish.

## C. Decisions we need on the concept / site

7. **Concept direction** — please **select one** of the concepts shown, or give
   specific direction (see D).
8. **Mode scope** — for the "Office / Home" concept: are these two customer
   types (B2B vs home) or two collections?
9. **Sections** — confirm the must-haves (e.g. AR, 3D viewer, compare,
   bulk/quote, showroom, newsletter) and anything you want removed.
10. **3D scope** — do you have manufacturer CAD files, or should we model from
    dimensions/photos? How many products need a 3D model (all 79, or flagships)?
11. **Languages / regions** — India-only, or multiple?

## D. What "basic" needs to become

To act on feedback like "it feels basic", we need it turned into specifics.
Please give us any of the following (even one helps a lot):

- **2–3 reference websites** whose *feel* you like (any brand, not just
  furniture) — we will do a proper teardown and match the quality.
- The **feeling** you want: e.g. "expensive and calm", "bold and modern",
  "warm and personal", "tech and precise".
- What specifically feels basic in the **current** page: the hero, the type,
  the spacing, the images, the colours, the motion?
- **Budget tier** for media (real photoshoot/video vs generated) — this sets the
  achievable ceiling for "premium".
