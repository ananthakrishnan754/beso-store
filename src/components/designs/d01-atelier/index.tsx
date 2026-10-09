'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ViewInYourRoom} from '@/components/ViewInYourRoom';
import products from '@/data/products.json';

/* 01 — Atelier · warm editorial, photography-led, one focal point per screen.
   Spec: docs/specs/01-atelier.md · Refs: Fritz Hansen, Cassina, Hem.
   Round 2: full-bleed architectural hero (no boxed packshot); cutouts oversized
   and indexed with hairline rules; removed discount/boilerplate stat grid. */

const DISPLAY = 'Fraunces, Georgia, "Times New Roman", serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

type Product = {slug: string; name: string; price: number; image: string};
const list = products as unknown as Product[];
const find = (slug: string) => list.find((p) => p.slug === slug);
const crown = find('beso-crown-executive-chair');
const flexrise = find('beso-flexrise-height-adjustable-table');
const prestige = find('beso-prestige-executive-chair');
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const src = (p?: Product) => (p ? `/${p.image}` : '');

const trio = [
  {p: crown, tag: 'Executive · woven mesh'},
  {p: flexrise, tag: 'Dual-motor · solid walnut'},
  {p: prestige, tag: 'Executive · full-grain leather'},
];

const materials = [
  {src: '/assets/images/products/executive-chair-07.jpg', idx: 'Series 01', title: 'Woven mesh', note: 'Self-tensioning, breathable back.'},
  {src: '/assets/images/products/executive-chair-04.jpg', idx: 'Series 02', title: 'Full-grain leather', note: 'Hand-stitched; ages into patina.'},
  {src: '/assets/images/products/height-table-01.jpg', idx: 'Series 03', title: 'Solid walnut', note: 'Oiled, hand-finished top.'},
];

const reviews = [
  {name: 'Rohit Sharma', role: 'Facilities Head · IT company', quote: 'Ordered 40 ergonomic chairs for our Bengaluru office. White-glove install in two days, and invoicing was seamless — clearly a B2B-first partner.'},
  {name: 'Shreya Iyer', role: 'Studio owner · Design firm', quote: 'The FlexRise desks transformed our workstations. Quiet motors, solid walnut, and the team handled fit-out details we never expected.'},
  {name: 'Arjun Mehta', role: 'Procurement lead · Consulting', quote: 'The 48-hour turnaround was real, support is priority, and the bulk pricing genuinely beat the market.'},
];

export default function Design01() {
  return (
    <div className="bg-[#F7F3EC] text-[#141312]" style={{fontFamily: BODY}}>
      {/* ── Hero — type on solid ground beside an untouched photograph ──── */}
      <section className="grid min-h-[88svh] lg:grid-cols-12">
        <div className="flex flex-col bg-[#F7F3EC] lg:col-span-5">
          <header className="flex items-center justify-between px-6 py-6 lg:px-12 lg:py-8">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
            <nav className="flex items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-[#141312]/70 lg:gap-8">
              <Link href="/products" className="transition-colors hover:text-[#141312]">Collection</Link>
              <Link href="#showroom" className="transition-colors hover:text-[#141312]">Showroom</Link>
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hidden transition-colors hover:text-[#141312] sm:inline">Contact</a>
            </nav>
          </header>
          <div className="flex flex-1 flex-col justify-center px-6 pb-12 pt-4 lg:px-12 lg:pb-16">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8F4C25]">
              Hyderabad · Since 2011
            </span>
            <h1
              className="mt-5 max-w-[12ch] text-[clamp(44px,6vw,78px)] leading-[0.95] tracking-[-0.03em]"
              style={{fontFamily: DISPLAY, fontWeight: 440}}
            >
              Sit the way it was made.
            </h1>
            <p className="mt-6 max-w-[32ch] text-[15px] leading-[1.55] text-[#5A554E]">
              Ergonomic seating and sit-stand desks for the working day.
            </p>
            <Link
              href="/products"
              className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-[#141312]/30 pb-1.5 text-[13px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 hover:border-[#141312]"
            >
              Shop the collection
              <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
            <div className="mt-10 flex items-center gap-4 border-t border-[#141312]/15 pt-4 text-[11px] tracking-[0.14em] text-[#5A554E]" style={{fontFamily: MONO}}>
              <span>BESO CROWN · EXECUTIVE</span>
              <span className="text-[#141312]/30">/</span>
              <span>{money(crown?.price)}</span>
            </div>
          </div>
        </div>
        <figure className="relative min-h-[52svh] overflow-hidden lg:col-span-7 lg:min-h-0">
          <img
            src="/assets/images/d01-hero.jpg"
            alt="A BESO ergonomic task chair and sit-stand desk in a warm architectural executive office"
            className="absolute inset-0 h-full w-full scale-[1.15] object-cover object-[64%_62%]"
            fetchPriority="high"
          />
        </figure>
      </section>

      {/* ── Feature — environmental photograph carries the narrative ───── */}
      <section className="grid lg:grid-cols-12">
        <figure className="lg:col-span-8">
          <img
            src="/assets/images/editorial-workspace.jpg"
            alt="A warm executive workspace furnished with a BESO sit-stand desk and task chair"
            className="h-[52vh] w-full object-cover lg:h-[78vh]"
            loading="lazy"
          />
        </figure>
        <div className="flex flex-col justify-center bg-[#FBFAF6] px-6 py-14 lg:col-span-4 lg:px-12 lg:py-20">
          <span className="text-[12px] uppercase tracking-[0.18em] text-[#8F4C25]">The working day</span>
          <h2
            className="mt-4 text-[clamp(26px,3vw,38px)] leading-[1.06] tracking-[-0.015em]"
            style={{fontFamily: DISPLAY, fontWeight: 460}}
          >
            Built for the hours you actually sit.
          </h2>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.65] text-[#5A554E]">
            Height you can change without leaving your work, and support that holds
            its line from the first email to the last.
          </p>
        </div>
      </section>

      {/* ── The chair — sticky copy, product bled off the edge ─────────── */}
      <section className="border-t border-[#141312]/10 bg-[#FBFAF6]">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 lg:gap-12">
            <div className="self-start py-14 lg:col-span-5 lg:sticky lg:top-28 lg:py-24">
              <span className="text-[12px] uppercase tracking-[0.18em] text-[#8F4C25]">The chair</span>
              <h2
                className="mt-4 text-[clamp(30px,3.8vw,46px)] leading-[1.04] tracking-[-0.015em]"
                style={{fontFamily: DISPLAY, fontWeight: 460}}
              >
                Synchro-tilt, held in one motion.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.65] text-[#5A554E]">
                The back and seat recline together, so your line of sight stays level
                as you move. Nothing to adjust mid-thought.
              </p>
              <dl className="mt-9 max-w-[440px] border-t border-[#141312]/15">
                {[
                  ['Recline', '0–125°'],
                  ['Armrests', '3D polyurethane'],
                  ['Lift', 'Class-4 gas'],
                  ['Load', '150 kg'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between border-b border-[#141312]/12 py-3">
                    <dt className="text-[12px] uppercase tracking-[0.14em] text-[#8F4C25]">{k}</dt>
                    <dd className="text-[15px] font-semibold tabular-nums">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative -mr-6 overflow-hidden bg-[#EFE6D6] lg:col-span-7 lg:-mr-10 lg:py-24">
              <img
                src={src(crown)}
                alt="BESO Crown executive chair, oversized detail"
                className="h-[52vh] w-full object-cover object-[62%_18%] mix-blend-multiply lg:h-[86vh]"
                loading="lazy"
              />
              <span className="absolute bottom-5 left-6 text-[11px] tracking-[0.16em] text-[#141312]/55" style={{fontFamily: MONO}}>
                CROWN · TESTED 200,000 CYCLES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Materials — gallery grid, hairline rules, technical captions ─ */}
      <section className="border-t border-[#141312]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <h2
              className="max-w-[22ch] text-[clamp(28px,3.4vw,40px)] leading-[1.06] tracking-[-0.015em]"
              style={{fontFamily: DISPLAY, fontWeight: 460}}
            >
              Materials that earn their patina.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {materials.map((m, i) => (
              <Reveal key={m.title} delay={i * 80}>
                <figure className="border border-[#141312]/15">
                  <div className="overflow-hidden bg-[#EFE6D6]">
                    <img
                      src={m.src}
                      alt={m.title}
                      loading="lazy"
                      className="aspect-[4/5] w-full scale-[1.55] object-cover mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.68]"
                    />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-[#141312]/15 px-4 py-3">
                    <span className="text-[11px] tracking-[0.16em] text-[#8F4C25]" style={{fontFamily: MONO}}>{m.idx}</span>
                    <span className="text-[12px] text-[#5A554E]">{m.title}</span>
                  </figcaption>
                  <p className="border-t border-[#141312]/10 px-4 py-3 text-[13px] text-[#5A554E]">{m.note}</p>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The line — indexed gallery, not identical cards ────────────── */}
      <section id="collection" className="border-t border-[#141312]/10 bg-[#FBFAF6]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="text-[clamp(28px,3.4vw,40px)] leading-[1.06] tracking-[-0.015em]"
              style={{fontFamily: DISPLAY, fontWeight: 460}}
            >
              The line
            </h2>
            <Link href="/products" className="text-[14px] font-semibold underline decoration-[#8F4C25]/40 decoration-1 underline-offset-[6px] hover:decoration-[#8F4C25]">
              See all 79 pieces
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-2">
            {trio.map((f, i) => (
              <Reveal key={f.p?.slug ?? i} className="max-sm:w-[78vw] max-sm:shrink-0 max-sm:snap-start">
                <Link href={`/products/${f.p?.slug}`} className="group block border-t border-[#141312]/25 pt-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[11px] tracking-[0.18em] text-[#8F4C25]" style={{fontFamily: MONO}}>0{i + 1}</span>
                    <span className="text-[11px] tracking-[0.14em] text-[#141312]/45" style={{fontFamily: MONO}}>{f.tag.toUpperCase()}</span>
                  </div>
                  <div className="mt-4 overflow-hidden bg-[#EFE6D6]">
                    <img
                      src={src(f.p)}
                      alt={f.p?.name ?? ''}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover object-top mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <h3 className="text-[clamp(18px,1.8vw,22px)] leading-[1.1] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 470}}>
                      {f.p?.name}
                    </h3>
                    <span className="shrink-0 text-[15px] font-semibold tabular-nums">{money(f.p?.price)}</span>
                  </div>
                  <span className="mt-3 inline-block text-[13px] font-semibold text-[#141312] underline decoration-[#8F4C25]/40 decoration-1 underline-offset-[6px] group-hover:decoration-[#8F4C25]">
                    View piece
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── For workplaces — quiet, no discount boilerplate ────────────── */}
      <section className="border-t border-[#141312]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="text-[12px] uppercase tracking-[0.18em] text-[#8F4C25]">For workplaces</span>
              <h2
                className="mt-4 max-w-[18ch] text-[clamp(28px,3.4vw,42px)] leading-[1.06] tracking-[-0.015em]"
                style={{fontFamily: DISPLAY, fontWeight: 460}}
              >
                Furnished by teams, not just individuals.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.65] text-[#5A554E]">
                Offices, studios and co-working floors across India. We specify the
                room, deliver on schedule, and invoice cleanly — from a single desk
                to a whole floor.
              </p>
              <a
                href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20a%20workspace%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex h-12 items-center rounded-full bg-[#141312] px-7 text-[14px] font-semibold text-[#F7F3EC] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8F4C25]"
              >
                Request a quote
              </a>
            </div>
            <div className="self-end lg:col-span-5">
              <div className="border-t border-[#141312]/15">
                {[
                  ['Pan-India install', 'Delivery, assembly and placement handled end to end.'],
                  ['GST invoicing', 'Clean purchase orders for procurement and finance.'],
                  ['Five-year warranty', 'On every chair, desk and mechanism we sell.'],
                ].map(([t, d]) => (
                  <div key={t} className="border-b border-[#141312]/12 py-5">
                    <div className="text-[15px] font-semibold">{t}</div>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#5A554E]">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customers — editorial quotes ───────────────────────────────── */}
      <section className="border-t border-[#141312]/10 bg-[#FBFAF6]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {reviews.map((r) => (
              <Reveal key={r.name}>
                <blockquote className="flex h-full flex-col">
                  <p className="text-[clamp(20px,2vw,24px)] leading-[1.42] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 430}}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-[#141312]/12 pt-3 text-[12px] text-[#5A554E]">
                    <span className="font-semibold text-[#141312]">{r.name}</span>
                    <br />
                    {r.role}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── AR ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#141312]/10">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <span className="text-[12px] uppercase tracking-[0.18em] text-[#8F4C25]">Before you buy</span>
            <h2
              className="mt-4 text-[clamp(28px,3.4vw,40px)] leading-[1.06] tracking-[-0.015em]"
              style={{fontFamily: DISPLAY, fontWeight: 460}}
            >
              See the Crown in your own room.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.65] text-[#5A554E]">
              Place it to scale with your desk and light, straight from your phone.
            </p>
            <div className="mt-8">
              <ViewInYourRoom
                slug="beso-crown-executive-chair"
                productName="BESO Crown Executive Chair"
                poster={src(crown)}
                variant="solid"
                label="View in your room"
              />
            </div>
          </div>
          <figure className="overflow-hidden lg:col-span-7">
            <img
              src="/assets/images/d01-hero.jpg"
              alt="BESO chair and desk in a warm architectural interior"
              loading="lazy"
              className="h-[40vh] w-full object-cover lg:h-[60vh]"
            />
          </figure>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section id="showroom" className="border-t border-[#141312]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2
                className="text-[clamp(34px,4.6vw,56px)] leading-[1.0] tracking-[-0.02em]"
                style={{fontFamily: DISPLAY, fontWeight: 450}}
              >
                Come sit with us.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.6] text-[#5A554E]">
                Our Hyderabad showroom holds the full collection. Bring your
                measurements — we will map the room with you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20to%20book%20a%20showroom%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full bg-[#141312] px-7 text-[14px] font-semibold text-[#F7F3EC] transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#8F4C25]"
                >
                  WhatsApp an expert
                </a>
                <a
                  href="tel:+918919317980"
                  className="text-[14px] font-semibold text-[#141312] underline decoration-[#8F4C25]/40 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:decoration-[#8F4C25]"
                >
                  Call 089193 17980
                </a>
              </div>
            </div>
            <address className="not-italic leading-[1.9] text-[15px] text-[#5A554E] lg:col-span-5 lg:pt-3">
              <div className="text-[12px] uppercase tracking-[0.16em] text-[#8F4C25]">Showroom</div>
              <div className="mt-3 text-[#141312]">5-8-91/5, Mahesh Nagar Colony</div>
              <div>Abids, Hyderabad 500001</div>
              <div className="mt-4">
                <a href="tel:+918919317980" className="text-[#141312] hover:text-[#8F4C25]">089193 17980</a>
              </div>
              <div>
                <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[#141312] hover:text-[#8F4C25]">+91 80999 52624</a>
              </div>
            </address>
          </div>
        </div>
      </section>

      {/* ── Footer — this design's own chrome ──────────────────────────── */}
      <footer className="bg-[#141312] text-[#F7F3EC]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <img src="/assets/images/beso-logo-white-transparent.png" alt="BESO" className="h-5 w-auto" />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.14em] text-[#F7F3EC]/70">
            <Link href="/products" className="transition-colors hover:text-[#F7F3EC]">Collection</Link>
            <Link href="/compare" className="transition-colors hover:text-[#F7F3EC]">Compare</Link>
            <Link href="/about" className="transition-colors hover:text-[#F7F3EC]">About</Link>
            <Link href="/contact" className="transition-colors hover:text-[#F7F3EC]">Contact</Link>
          </nav>
          <p className="text-[12px] text-[#F7F3EC]/55">© 2025 Furniture Space · BESO · Hyderabad</p>
        </div>
      </footer>
    </div>
  );
}
