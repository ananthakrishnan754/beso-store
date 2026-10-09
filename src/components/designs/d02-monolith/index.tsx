'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ViewInYourRoom} from '@/components/ViewInYourRoom';
import products from '@/data/products.json';

/* 02 — Monolith · the chair as sculpture: obsidian stage, single light, serif.
   Spec: docs/specs/02-monolith.md · Refs: Poltrona Frau, Minimal Gallery, Wilkhahn. */

const DISPLAY = '"Cormorant Garamond", Georgia, "Times New Roman", serif';
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
  {p: prestige, tag: 'Full-grain leather', img: '/assets/images/d02-hero.jpg'},
  {p: crown, tag: 'Woven mesh', img: '/assets/images/d02-crown.jpg'},
  {p: flexrise, tag: 'Solid walnut', img: '/assets/images/d02-flexrise.jpg'},
];

const studies = [
  {src: '/assets/images/d02-hero.jpg', pos: 'object-[38%_30%]', no: 'I', label: 'Leather & lumbar'},
  {src: '/assets/images/d02-crown.jpg', pos: 'object-[55%_38%]', no: 'II', label: 'Mesh & frame'},
  {src: '/assets/images/d02-flexrise.jpg', pos: 'object-[50%_66%]', no: 'III', label: 'Lift column & control'},
];

const reviews = [
  {name: 'Rohit Sharma', role: 'Facilities Head · IT company', quote: 'Ordered 40 ergonomic chairs for our Bengaluru office. White-glove install in two days, and invoicing was seamless.'},
  {name: 'Shreya Iyer', role: 'Studio owner · Design firm', quote: 'The FlexRise desks transformed our workstations. Quiet motors, solid walnut, and the team handled details we never expected.'},
  {name: 'Arjun Mehta', role: 'Procurement lead · Consulting', quote: 'The 48-hour turnaround was real, support is priority, and the pricing genuinely beat the market.'},
];

export default function Design02() {
  return (
    <div className="bg-[#0E0D0C] text-[#EDE6DA]" style={{fontFamily: BODY}}>
      {/* ── Hero — the object under a single light ─────────────────────── */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        <img
          src="/assets/images/d02-hero.jpg"
          alt="A BESO leather executive chair isolated under a single spotlight on a dark stage"
          className="absolute inset-0 h-full w-full object-cover object-[50%_46%]"
          style={{filter: 'brightness(1.07) contrast(0.95) saturate(1.02)'}}
          fetchPriority="high"
        />
        <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(14,13,12,0.55) 0%, rgba(14,13,12,0.06) 30%, rgba(14,13,12,0.5) 74%, rgba(14,13,12,0.96) 100%)'}} />
        <header className="absolute inset-x-0 top-0 z-20">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-6 lg:px-10 lg:py-8">
            <img src="/assets/images/beso-logo-white-transparent.png" alt="BESO" className="h-5 w-auto" />
            <nav className="flex items-center gap-6 text-[12px] uppercase tracking-[0.2em] text-[#EDE6DA]/80 lg:gap-9">
              <Link href="/products" className="transition-colors hover:text-[#EDE6DA]">Collection</Link>
              <Link href="#collection" className="hidden transition-colors hover:text-[#EDE6DA] sm:inline">Objects</Link>
              <Link href="#showroom" className="hidden transition-colors hover:text-[#EDE6DA] sm:inline">Showroom</Link>
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#EDE6DA]">Contact</a>
            </nav>
          </div>
        </header>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pb-20 lg:px-10 lg:pb-28">
          <span className="text-[12px] uppercase tracking-[0.24em] text-[#C9A15A]">BESO · The Object</span>
          <h1
            className="mt-5 max-w-[15ch] text-[clamp(48px,7vw,88px)] leading-[0.95] tracking-[-0.012em]"
            style={{fontFamily: DISPLAY, fontWeight: 500}}
          >
            Weight, held in light.
          </h1>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.7] text-[#EDE6DA]/80">
            Full-grain leather, an anatomical frame, and a five-star base machined
            from a single cast — a chair made to be looked at, then sat in.
          </p>
          <Link
            href="/products"
            className="group mt-10 inline-flex w-fit items-center gap-3 border-b border-[#C9A15A]/50 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#EDE6DA] transition-colors duration-300 hover:border-[#C9A15A]"
          >
            Explore the object
            <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-[#EDE6DA]/15 pt-4 text-[12px] tracking-[0.16em] text-[#EDE6DA]/60" style={{fontFamily: MONO}}>
            <span>PRESTIGE · FULL-GRAIN LEATHER</span>
            <span className="text-[#C9A15A]">/</span>
            <span>LOAD 150 KG</span>
          </div>
        </div>
      </section>

      {/* ── Object study — three macro crops of the same form ──────────── */}
      <section className="border-t border-[#EDE6DA]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <Reveal>
            <h2 className="max-w-[22ch] text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
              Study of a single form.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {studies.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <figure className="border border-[#EDE6DA]/12">
                  <div className="overflow-hidden bg-[#1B1917]">
                    <img src={s.src} alt={s.label} loading="lazy" className={`aspect-[4/5] w-full scale-[1.6] object-cover ${s.pos}`} />
                  </div>
                  <figcaption className="flex items-center justify-between border-t border-[#EDE6DA]/12 px-4 py-3">
                    <span className="text-[12px] tracking-[0.18em] text-[#C9A15A]" style={{fontFamily: MONO}}>{s.no}</span>
                    <span className="text-[12px] text-[#EDE6DA]/70">{s.label}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The collection — dark gallery of objects ───────────────────── */}
      <section id="collection" className="border-t border-[#EDE6DA]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
              The collection
            </h2>
            <Link href="/products" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C9A15A] underline decoration-[#C9A15A]/30 underline-offset-[6px] hover:decoration-[#C9A15A]">
              All 79 objects
            </Link>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-3 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-2">
            {trio.map((f, i) => (
              <Reveal key={f.p?.slug ?? i} className="max-sm:w-[80vw] max-sm:shrink-0 max-sm:snap-start">
                <Link href={`/products/${f.p?.slug}`} className="group block">
                  <div className="relative overflow-hidden bg-[#1B1917]">
                    <img
                      src={f.img ?? src(f.p)}
                      alt={f.p?.name ?? ''}
                      loading="lazy"
                      className="aspect-[3/4] w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" style={{background: 'linear-gradient(180deg, rgba(14,13,12,0) 0%, rgba(14,13,12,0.9) 100%)'}} />
                    <span className="absolute left-4 top-4 text-[12px] tracking-[0.18em] text-[#C9A15A]" style={{fontFamily: MONO}}>0{i + 1}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[#EDE6DA]/15 pt-3">
                    <h3 className="text-[20px] leading-[1.1]" style={{fontFamily: DISPLAY, fontWeight: 550}}>{f.p?.name}</h3>
                    <span className="shrink-0 text-[14px] font-semibold tabular-nums text-[#EDE6DA]">{money(f.p?.price)}</span>
                  </div>
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.16em] text-[#EDE6DA]/50">{f.tag}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── For workplaces — quiet trust ───────────────────────────────── */}
      <section className="border-t border-[#EDE6DA]/10 bg-[#1B1917]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="text-[12px] uppercase tracking-[0.24em] text-[#C9A15A]">For workplaces</span>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(30px,3.6vw,46px)] leading-[1.04] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                Furnished by teams, not just individuals.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.7] text-[#EDE6DA]/70">
                Offices, studios and co-working floors across India — specified,
                delivered and installed, from a single desk to a whole floor.
              </p>
              <a
                href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20a%20workspace%20quote."
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 inline-flex w-fit items-center gap-3 border-b border-[#C9A15A]/50 pb-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#EDE6DA] transition-colors duration-300 hover:border-[#C9A15A]"
              >
                Request a quote
                <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </a>
            </div>
            <div className="self-end lg:col-span-5">
              <div className="border-t border-[#EDE6DA]/15">
                {[
                  ['Pan-India install', 'Delivery, assembly and placement handled end to end.'],
                  ['GST invoicing', 'Clean purchase orders for procurement and finance.'],
                  ['Five-year warranty', 'On every chair, desk and mechanism we sell.'],
                ].map(([t, d]) => (
                  <div key={t} className="border-b border-[#EDE6DA]/12 py-5">
                    <div className="text-[15px] font-semibold text-[#EDE6DA]">{t}</div>
                    <p className="mt-1 text-[14px] leading-[1.6] text-[#EDE6DA]/60">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Owners ─────────────────────────────────────────────────────── */}
      <section className="border-t border-[#EDE6DA]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
            {reviews.map((r) => (
              <Reveal key={r.name}>
                <blockquote className="flex h-full flex-col">
                  <p className="text-[clamp(22px,2.4vw,30px)] leading-[1.35] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-6 border-t border-[#EDE6DA]/12 pt-3 text-[12px] text-[#EDE6DA]/60">
                    <span className="font-semibold text-[#EDE6DA]">{r.name}</span>
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
      <section className="border-t border-[#EDE6DA]/10 bg-[#1B1917]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <span className="text-[12px] uppercase tracking-[0.24em] text-[#C9A15A]">Before you buy</span>
            <h2 className="mt-4 text-[clamp(30px,3.6vw,44px)] leading-[1.04] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
              Set the Prestige in your own room.
            </h2>
            <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.7] text-[#EDE6DA]/70">
              Place it to scale with your desk and light, straight from your phone.
            </p>
            <div className="mt-8">
              <ViewInYourRoom
                slug="beso-prestige-executive-chair"
                productName="BESO Prestige Executive Chair"
                poster={src(prestige)}
                variant="solid"
                label="View in your room"
              />
            </div>
          </div>
          <figure className="overflow-hidden lg:col-span-7">
            <img src="/assets/images/d02-hero.jpg" alt="BESO leather executive chair under a single light" loading="lazy" className="h-[42vh] w-full object-cover object-[50%_40%] lg:h-[58vh]" />
          </figure>
        </div>
      </section>

      {/* ── Close ──────────────────────────────────────────────────────── */}
      <section id="showroom" className="border-t border-[#EDE6DA]/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="text-[clamp(40px,5.4vw,68px)] leading-[0.98] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                Come sit with us.
              </h2>
              <p className="mt-5 max-w-[48ch] text-[17px] leading-[1.65] text-[#EDE6DA]/70">
                Our Hyderabad showroom holds the full collection. Bring your
                measurements — we will map the room with you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20to%20book%20a%20showroom%20visit."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full bg-[#C9A15A] px-7 text-[14px] font-semibold text-[#0E0D0C] transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#EDE6DA]"
                >
                  WhatsApp an expert
                </a>
                <a href="tel:+918919317980" className="text-[14px] font-semibold text-[#EDE6DA] underline decoration-[#C9A15A]/40 decoration-1 underline-offset-[6px] hover:decoration-[#C9A15A]">
                  Call 089193 17980
                </a>
              </div>
            </div>
            <address className="not-italic leading-[1.9] text-[15px] text-[#EDE6DA]/70 lg:col-span-5 lg:pt-3">
              <div className="text-[12px] uppercase tracking-[0.2em] text-[#C9A15A]">Showroom</div>
              <div className="mt-3 text-[#EDE6DA]">5-8-91/5, Mahesh Nagar Colony</div>
              <div>Abids, Hyderabad 500001</div>
              <div className="mt-4">
                <a href="tel:+918919317980" className="text-[#EDE6DA] hover:text-[#C9A15A]">089193 17980</a>
              </div>
              <div>
                <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[#EDE6DA] hover:text-[#C9A15A]">+91 80999 52624</a>
              </div>
            </address>
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#EDE6DA]/10 bg-[#0A0A09]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <img src="/assets/images/beso-logo-white-transparent.png" alt="BESO" className="h-5 w-auto" />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.18em] text-[#EDE6DA]/60">
            <Link href="/products" className="transition-colors hover:text-[#EDE6DA]">Collection</Link>
            <Link href="/compare" className="transition-colors hover:text-[#EDE6DA]">Compare</Link>
            <Link href="/about" className="transition-colors hover:text-[#EDE6DA]">About</Link>
            <Link href="/contact" className="transition-colors hover:text-[#EDE6DA]">Contact</Link>
          </nav>
          <p className="text-[12px] text-[#EDE6DA]/45">© 2025 Furniture Space · BESO · Hyderabad</p>
        </div>
      </footer>
    </div>
  );
}
