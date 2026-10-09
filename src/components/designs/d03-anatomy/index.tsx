'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ViewInYourRoom} from '@/components/ViewInYourRoom';
import products from '@/data/products.json';

/* 03 — Anatomy · an engineering dossier that reads as luxury: pinned product,
   dense spec, tabular numbers, one signal accent.
   Spec: docs/specs/03-anatomy.md · Refs: Apple (MacBook Pro), Wilkhahn, Humanscale. */

const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
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

const build = [
  {no: '01', t: 'Double-layer mesh back', d: 'Self-tensioning weave that breathes and holds its curve across the day.'},
  {no: '02', t: 'Synchro-tilt mechanism', d: 'Back and seat recline together, 0–125°, so your sightline stays level.'},
  {no: '03', t: '3D polyurethane arms', d: 'Height, depth and pivot adjust without leaving your posture.'},
  {no: '04', t: 'Class-4 gas lift', d: '100 mm travel, tested to 200,000 cycles before it ships.'},
  {no: '05', t: 'Cast aluminium base', d: 'One-piece five-star base, matte-finish, load rated to 150 kg.'},
];

const specs: [string, string][] = [
  ['Recline', '0–125°'],
  ['Seat height', '44–52 cm'],
  ['Desk travel', '70–120 cm'],
  ['Arm travel', '3D · 4-axis'],
  ['Load rating', '150 kg'],
  ['Cycle test', '200,000'],
  ['Warranty', '5 years'],
  ['Dispatch', '48 hours'],
];

const trio = [
  {p: crown, img: '/assets/images/d02-crown.jpg', tag: 'Woven mesh'},
  {p: flexrise, img: '/assets/images/d02-flexrise.jpg', tag: 'Solid walnut'},
  {p: prestige, img: '/assets/images/d02-hero.jpg', tag: 'Full-grain leather'},
];

const reviews = [
  {name: 'Rohit Sharma', role: 'Facilities Head · IT company', quote: 'Ordered 40 ergonomic chairs for our Bengaluru office. White-glove install in two days, and invoicing was seamless.'},
  {name: 'Shreya Iyer', role: 'Studio owner · Design firm', quote: 'The FlexRise desks transformed our workstations. Quiet motors, solid walnut, and the team handled details we never expected.'},
  {name: 'Arjun Mehta', role: 'Procurement lead · Consulting', quote: 'The 48-hour turnaround was real, support is priority, and the pricing genuinely beat the market.'},
];

export default function Design03() {
  return (
    <div className="bg-[#101112] text-[#F2EFEA]" style={{fontFamily: BODY}}>
      {/* ── Utility bar ────────────────────────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-3 text-[12px] uppercase tracking-[0.16em] text-[#C7CBD1]/70 lg:px-10" style={{fontFamily: MONO}}>
          <span>BESO · Ergonomic Engineering</span>
          <span className="hidden sm:inline">Rev. 03 / Hyderabad</span>
        </div>
      </div>

      {/* ── Hero — the chair, dimensioned ──────────────────────────────── */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1280px] items-stretch lg:grid-cols-12">
          <div className="flex flex-col justify-center px-6 py-14 lg:col-span-5 lg:px-10 lg:py-24">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#D9541E]" style={{fontFamily: MONO}}>Crown · Executive task seating</span>
            <h1
              className="mt-5 max-w-[15ch] text-[clamp(40px,5.4vw,68px)] leading-[1.0] tracking-[-0.02em]"
              style={{fontFamily: DISPLAY, fontWeight: 500}}
            >
              Every millimetre, accounted for.
            </h1>
            <p className="mt-6 max-w-[40ch] text-[16px] leading-[1.65] text-[#C7CBD1]">
              An ergonomic task chair specified like a component: signed off in
              numbers, then finished by hand.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link
                href="/products"
                className="inline-flex h-12 items-center rounded-full bg-[#F2EFEA] px-7 text-[14px] font-semibold text-[#101112] transition-colors duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-white"
              >
                Shop the collection
              </Link>
            </div>
          </div>
          <figure className="relative min-h-[52svh] overflow-hidden border-t border-white/10 bg-[#191A1C] lg:col-span-7 lg:min-h-0 lg:border-l lg:border-t-0">
            <img src="/assets/images/d02-crown.jpg" alt="BESO Crown executive chair, dark studio" className="absolute inset-0 h-full w-full object-cover object-[52%_42%]" fetchPriority="high" />
            <div className="pointer-events-none absolute inset-0" style={{background: 'repeating-linear-gradient(90deg, rgba(242,239,234,0.06) 0 1px, transparent 1px 80px)'}} />
            <span className="absolute bottom-5 left-6 text-[12px] tracking-[0.16em] text-[#C7CBD1]" style={{fontFamily: MONO}}>FIG. 01 — CROWN / 150 KG</span>
          </figure>
        </div>
      </section>

      {/* ── Pin — product holds while the build scrolls ────────────────── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid lg:grid-cols-12 lg:gap-16">
            <div className="self-start py-14 lg:col-span-6 lg:sticky lg:top-16 lg:flex lg:h-[86vh] lg:items-center lg:py-0">
              <div className="relative w-full overflow-hidden bg-[#191A1C]">
                <img src="/assets/images/d02-crown.jpg" alt="BESO Crown chair, exploded detail" loading="lazy" className="h-[46vh] w-full object-cover object-[50%_45%] lg:h-[70vh]" />
                <span className="absolute left-5 top-5 text-[12px] tracking-[0.16em] text-[#C7CBD1]" style={{fontFamily: MONO}}>CROWN / FIG. 02</span>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="border-t border-white/15 py-10 lg:pt-24">
                <span className="text-[12px] uppercase tracking-[0.2em] text-[#D9541E]" style={{fontFamily: MONO}}>The build</span>
                <h2 className="mt-4 text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                  Five components, one posture.
                </h2>
              </div>
              <dl>
                {build.map((b) => (
                  <div key={b.no} className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-white/12 py-6">
                    <dt className="text-[12px] text-[#D9541E]" style={{fontFamily: MONO}}>{b.no}</dt>
                    <dd>
                      <div className="text-[17px] font-semibold text-[#F2EFEA]">{b.t}</div>
                      <p className="mt-1 max-w-[46ch] text-[15px] leading-[1.65] text-[#C7CBD1]">{b.d}</p>
                    </dd>
                  </div>
                ))}
                <div className="border-t border-white/12" />
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers — the spec table ───────────────────────────────────── */}
      <section id="spec" className="border-b border-white/10 bg-[#191A1C]">
        <div className="mx-auto max-w-[1280px] px-6 pt-16 lg:px-10 lg:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
              The numbers
            </h2>
            <span className="text-[12px] uppercase tracking-[0.16em] text-[#C7CBD1]/70" style={{fontFamily: MONO}}>Verified spec · Crown & FlexRise</span>
          </div>
        </div>
        <dl className="mt-10 grid grid-cols-2 gap-px border-y border-white/12 bg-white/10 sm:grid-cols-4">
          {specs.map(([k, v]) => (
            <div key={k} className="bg-[#191A1C] px-5 py-7 lg:px-8">
              <dt className="text-[12px] uppercase tracking-[0.14em] text-[#C7CBD1]/70" style={{fontFamily: MONO}}>{k}</dt>
              <dd className="mt-2 text-[clamp(22px,2.4vw,30px)] leading-none tabular-nums text-[#F2EFEA]" style={{fontFamily: DISPLAY, fontWeight: 500}}>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="h-16 lg:h-24" />
      </section>

      {/* ── Choose your side — Home vs Commercial ──────────────────────── */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <h2 className="max-w-[24ch] text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
            Specified for one desk or a whole floor.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {img: '/assets/images/d02-flexrise.jpg', tag: 'Home studio', t: 'One careful desk', href: '/products?space=home', copy: 'A single sit-stand setup, delivered assembled.'},
              {img: '/assets/images/d02-crown.jpg', tag: 'Commercial', t: 'A workplace floor', href: '/products?space=office', copy: 'Bulk specification, GST invoicing, pan-India install.'},
            ].map((c) => (
              <Reveal key={c.t}>
                <Link href={c.href} className="group block">
                  <div className="overflow-hidden bg-[#191A1C]">
                    <img src={c.img} alt={c.t} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]" />
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
                    <div>
                      <div className="text-[12px] uppercase tracking-[0.16em] text-[#D9541E]" style={{fontFamily: MONO}}>{c.tag}</div>
                      <div className="mt-1 text-[20px]" style={{fontFamily: DISPLAY, fontWeight: 500}}>{c.t}</div>
                    </div>
                    <p className="hidden max-w-[22ch] text-[13px] leading-[1.5] text-[#C7CBD1] sm:block">{c.copy}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The collection ─────────────────────────────────────────────── */}
      <section id="collection" className="border-b border-white/10">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-[clamp(28px,3.4vw,44px)] leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>The collection</h2>
            <Link href="/products" className="text-[12px] uppercase tracking-[0.14em] text-[#F2EFEA] underline decoration-[#D9541E]/50 decoration-1 underline-offset-[6px] hover:decoration-[#D9541E]" style={{fontFamily: MONO}}>All 79</Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:overflow-x-auto max-sm:pb-2">
            {trio.map((f, i) => (
              <Reveal key={f.p?.slug ?? i} className="max-sm:w-[80vw] max-sm:shrink-0 max-sm:snap-start">
                <Link href={`/products/${f.p?.slug}`} className="group block">
                  <div className="relative border border-white/12 bg-[#191A1C]">
                    <img src={f.img} alt={f.p?.name ?? ''} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]" />
                    <span className="absolute left-4 top-4 text-[12px] text-[#D9541E]" style={{fontFamily: MONO}}>0{i + 1}</span>
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-white/15 pt-3">
                    <h3 className="text-[18px] leading-[1.1] text-[#F2EFEA]" style={{fontFamily: DISPLAY, fontWeight: 500}}>{f.p?.name}</h3>
                    <span className="shrink-0 text-[14px] font-semibold tabular-nums">{money(f.p?.price)}</span>
                  </div>
                  <span className="mt-1 block text-[12px] uppercase tracking-[0.14em] text-[#C7CBD1]/70" style={{fontFamily: MONO}}>{f.tag}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Workplace + reviews ────────────────────────────────────────── */}
      <section className="border-b border-white/10 bg-[#191A1C]">
        <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#D9541E]" style={{fontFamily: MONO}}>For workplaces</span>
              <h2 className="mt-4 max-w-[18ch] text-[clamp(28px,3.4vw,42px)] leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                A supply partner, not a storefront.
              </h2>
              <p className="mt-5 max-w-[44ch] text-[16px] leading-[1.65] text-[#C7CBD1]">
                We specify, deliver and install — with clean procurement paperwork
                and a named contact from quote to handover.
              </p>
              <a href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20a%20workspace%20quote." target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex h-12 items-center rounded-full bg-[#F2EFEA] px-7 text-[14px] font-semibold text-[#101112] transition-colors duration-300 hover:bg-white">
                Request a quote
              </a>
            </div>
            <div className="lg:col-span-7">
              <div className="grid gap-8 sm:grid-cols-3">
                {reviews.map((r) => (
                  <Reveal key={r.name}>
                    <blockquote className="border-t border-white/15 pt-4">
                      <p className="text-[15px] leading-[1.6] text-[#F2EFEA]">&ldquo;{r.quote}&rdquo;</p>
                      <footer className="mt-4 text-[12px] text-[#C7CBD1]" style={{fontFamily: MONO}}>
                        {r.name} · {r.role}
                      </footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AR + close ─────────────────────────────────────────────────── */}
      <section id="showroom" className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1280px] items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
          <div className="lg:col-span-6">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#D9541E]" style={{fontFamily: MONO}}>Before you buy</span>
            <h2 className="mt-4 text-[clamp(30px,4vw,50px)] leading-[1.02] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
              Come sit with us.
            </h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-[#C7CBD1]">
              Our Hyderabad showroom holds the full collection. Bring your
              measurements — we will map the room with you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <ViewInYourRoom slug="beso-crown-executive-chair" productName="BESO Crown Executive Chair" poster={src(crown)} variant="solid" label="View in your room" />
              <a href="tel:+918919317980" className="text-[13px] uppercase tracking-[0.14em] text-[#F2EFEA] underline decoration-[#D9541E]/50 decoration-1 underline-offset-[6px] hover:decoration-[#D9541E]" style={{fontFamily: MONO}}>089193 17980</a>
            </div>
          </div>
          <address className="not-italic leading-[1.9] text-[15px] text-[#C7CBD1] lg:col-span-6 lg:pl-10">
            <div className="text-[12px] uppercase tracking-[0.16em] text-[#D9541E]" style={{fontFamily: MONO}}>Showroom</div>
            <div className="mt-3 text-[#F2EFEA]">5-8-91/5, Mahesh Nagar Colony</div>
            <div>Abids, Hyderabad 500001</div>
            <div className="mt-4"><a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[#F2EFEA] hover:text-[#D9541E]">+91 80999 52624</a></div>
          </address>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#0B0C0D]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <img src="/assets/images/beso-logo-white-transparent.png" alt="BESO" className="h-5 w-auto" />
          <nav className="flex flex-wrap gap-x-8 gap-y-2 text-[12px] uppercase tracking-[0.16em] text-[#C7CBD1]/70" style={{fontFamily: MONO}}>
            <Link href="/products" className="transition-colors hover:text-[#F2EFEA]">Collection</Link>
            <Link href="/compare" className="transition-colors hover:text-[#F2EFEA]">Compare</Link>
            <Link href="/about" className="transition-colors hover:text-[#F2EFEA]">About</Link>
            <Link href="/contact" className="transition-colors hover:text-[#F2EFEA]">Contact</Link>
          </nav>
          <p className="text-[12px] text-[#C7CBD1]/50" style={{fontFamily: MONO}}>© 2025 Furniture Space · BESO</p>
        </div>
      </footer>
    </div>
  );
}
