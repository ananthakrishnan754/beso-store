'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import products from '@/data/products.json';

/* Concept · "Atelier Pro" — architectural, material-led, B2B (teardown:
   docs/teardown/02-ceragres.md). Promo-as-hero, mega-menu with preview images,
   index rows, pinned materials, BESO Pro. Real content only. */

const DISPLAY = '"Cormorant Garamond", Georgia, "Times New Roman", serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const INK = '#141414';
const BASE = '#FAFAFA';
const ACCENT = '#8A6A3B';

type Product = {slug: string; name: string; price: number; image: string; category?: string};
const list = products as unknown as Product[];
const img = (p?: Product) => (p ? `/${p.image}` : '');
const firstImg = (re: RegExp) => img(list.find((p) => re.test(p.name)));
const countOf = (re: RegExp) => list.filter((p) => re.test(p.name)).length;
const crown = list.find((p) => p.slug === 'beso-crown-executive-chair');
const flexrise = list.find((p) => p.slug === 'beso-flexrise-height-adjustable-table');
const prestige = list.find((p) => p.slug === 'beso-prestige-executive-chair');

const WA = 'https://wa.me/918099952624';
const waText = (t: string) => `${WA}?text=${encodeURIComponent(t)}`;

const categories = [
  {label: 'Office & Executive Chairs', re: /chair/i, blurb: 'Ergonomic task, executive and visitor seating.'},
  {label: 'Desks & Standing', re: /desk|height|stand/i, blurb: 'Height-adjustable and fixed work desks.'},
  {label: 'Executive Tables', re: /table/i, blurb: 'Conference and executive work tables.'},
  {label: 'Stools & Dining', re: /stool|dining/i, blurb: 'Bar stools, dining chairs and tables.'},
  {label: 'Gaming', re: /gaming/i, blurb: 'Gaming chairs and setups.'},
];

const workspaces = [
  {type: 'IT company', city: 'Bengaluru', detail: '40 ergonomic chairs installed', re: /chair/i},
  {type: 'Design studio', city: 'Hyderabad', detail: 'FlexRise sit-stand workstations', re: /height|stand|flexrise/i},
  {type: 'Consulting team', city: 'Pan-India', detail: 'Bulk fit-out, 48-hour dispatch', re: /table/i},
];

const offer = [
  {label: 'Office & Executive Chairs', re: /chair/i},
  {label: 'Standing Desks', re: /height|adjustable|flexrise|stand/i},
  {label: 'Executive Tables', re: /table/i},
  {label: 'Bar Stools', re: /bar stool|stool/i},
  {label: 'Dining', re: /dining/i},
  {label: 'Gaming', re: /gaming/i},
];

const materials = [
  {label: 'Full-grain leather', note: 'Hand-stitched, ages into patina', img: img(prestige)},
  {label: 'Teak & walnut accents', note: 'Solid, oiled, hand-finished', img: img(flexrise)},
  {label: 'Woven mesh', note: 'Self-tensioning, breathable', img: img(crown)},
  {label: 'Dual quiet motors', note: 'Sit–stand travel, 70–120 cm', img: img(flexrise)},
  {label: 'Load up to 150 kg', note: 'Tested to 200,000 cycles', img: img(crown)},
];

const pro = [
  ['Credit terms', '30-day terms for approved business accounts.'],
  ['Custom POs', 'Raise purchase orders against GST invoices.'],
  ['Account manager', 'One named contact from quote to handover.'],
  ['48-hour turnaround', 'From the Hyderabad warehouse.'],
  ['12,000 sq ft warehouse', 'Stock held for fit-outs and phased rolls.'],
  ['Two showrooms', 'Walk the full collection before you specify.'],
];

export default function DesignAtelierPro() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [audience, setAudience] = useState<'individual' | 'business'>('business');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [hoverImg, setHoverImg] = useState<string | null>(null);

  // pinned materials: scroll progress → active index (lerp-smoothed)
  const matRef = useRef<HTMLDivElement | null>(null);
  const [matActive, setMatActive] = useState(0);
  useEffect(() => {
    let raf = 0; let target = 0; let cur = 0;
    const onScroll = () => {
      const el = matRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      target = Math.min(materials.length - 0.001, p * materials.length);
    };
    const loop = () => { cur += (target - cur) * 0.12; setMatActive(Math.floor(cur)); raf = requestAnimationFrame(loop); };
    window.addEventListener('scroll', onScroll, {passive: true}); onScroll(); loop();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="text-[#141414]" style={{fontFamily: BODY, background: BASE}}>
      {/* Row hover image reveal (Workspaces / Offer) */}
      <div className="pointer-events-none fixed right-10 top-1/2 z-30 hidden h-[320px] w-[430px] -translate-y-1/2 overflow-hidden lg:block" style={{opacity: hoverImg ? 1 : 0, transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1)'}} aria-hidden="true">
        {hoverImg && <img src={hoverImg} alt="" className="h-full w-full object-cover" />}
      </div>

      {/* ── Header + mega-menu ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#141414]/12 bg-[#FAFAFA]/95" onMouseLeave={() => setMenuOpen(false)}>
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="flex items-center">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
          </Link>
          <nav className="hidden items-center gap-8 text-[12px] uppercase tracking-[0.16em] text-[#141414]/70 lg:flex" style={{fontFamily: MONO}}>
            <button onMouseEnter={() => setMenuOpen(true)} onClick={() => setMenuOpen((v) => !v)} className="transition-colors hover:text-[#141414]" aria-expanded={menuOpen}>Collections</button>
            <Link href="#offer" className="transition-colors hover:text-[#141414]">Offer</Link>
            <Link href="#pro" className="transition-colors hover:text-[#141414]">BESO Pro</Link>
            <Link href="#showroom" className="transition-colors hover:text-[#141414]">Showroom</Link>
          </nav>
          <a href={waText("Hi BESO! I'd like a trade consultation.")} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-full px-6 text-[13px] font-semibold text-[#FAFAFA]" style={{background: INK}}>
            WhatsApp an expert
          </a>
        </div>

        {/* mega-menu panel */}
        <div
          className="overflow-hidden border-t border-[#141414]/10 bg-[#FAFAFA] transition-[max-height,opacity] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{maxHeight: menuOpen ? 520 : 0, opacity: menuOpen ? 1 : 0}}
        >
          <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-10 lg:grid-cols-12 lg:px-10">
            <ul className="lg:col-span-6">
              {categories.map((c, i) => (
                <li key={c.label} className="border-b border-[#141414]/10">
                  <button
                    onMouseEnter={() => setActiveCat(i)}
                    onFocus={() => setActiveCat(i)}
                    className="flex w-full items-baseline justify-between gap-6 py-4 text-left"
                  >
                    <span className="text-[clamp(22px,2.4vw,32px)] leading-none transition-colors duration-300" style={{fontFamily: DISPLAY, fontWeight: 500, color: activeCat === i ? ACCENT : INK}}>{c.label}</span>
                    <span className="shrink-0 text-[12px] tabular-nums text-[#141414]/45" style={{fontFamily: MONO}}>{countOf(c.re)}</span>
                  </button>
                  <p className="pb-4 text-[13px] text-[#141414]/55">{c.blurb}</p>
                </li>
              ))}
            </ul>
            <div className="relative lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEEE9]">
                {categories.map((c, i) => (
                  <img key={c.label} src={firstImg(c.re)} alt={c.label} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{opacity: activeCat === i ? 1 : 0}} />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-[12px] uppercase tracking-[0.16em] text-[#141414]/50" style={{fontFamily: MONO}}>
                <span>{categories[activeCat].label}</span>
                <Link href="/products" className="text-[#141414] underline underline-offset-4">Shop all</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Promo-as-hero ──────────────────────────────────────────────── */}
      <section className="relative flex min-h-[86svh] items-end overflow-hidden">
        <video autoPlay muted loop playsInline poster="/assets/videos/d05-hero-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/videos/d05-hero.webm" type="video/webm" />
          <source src="/assets/videos/d05-hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(20,20,20,0.28) 0%, rgba(20,20,20,0.05) 38%, rgba(20,20,20,0.62) 100%)'}} />
        <div className="relative z-10 mx-auto w-full max-w-[1320px] px-6 pb-16 lg:px-10 lg:pb-24">
          <span className="text-[12px] uppercase tracking-[0.24em]" style={{fontFamily: MONO, color: '#F2EFE9'}}>BESO · Trade &amp; Projects</span>
          <h1 className="mt-5 max-w-[20ch] text-[clamp(40px,6.2vw,86px)] font-light leading-[0.98] tracking-[-0.02em] text-[#F7F5F1]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
            Bulk discounts up to 25% from 5 units.
          </h1>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.6] text-[#F7F5F1]/85">
            Office chairs, height-adjustable desks and executive tables for fit-outs
            across India — specified, delivered and installed.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-[#F7F5F1] px-7 text-[14px] font-semibold" style={{color: INK}}>Explore the flagship line</Link>
            <a href={waText("Hi BESO! I'd like a bulk quotation.")} target="_blank" rel="noopener noreferrer" className="text-[14px] font-semibold text-[#F7F5F1] underline decoration-[#F7F5F1]/50 decoration-1 underline-offset-[6px]">WhatsApp for a quote</a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#F7F5F1]/25 pt-4 text-[12px] uppercase tracking-[0.14em] text-[#F7F5F1]/70" style={{fontFamily: MONO}}>
            <span>79 pieces</span><span>·</span><span>48-hour dispatch</span><span>·</span><span>GST invoicing</span>
          </div>
        </div>
      </section>

      {/* ── Brand statement ────────────────────────────────────────────── */}
      <section className="border-b border-[#141414]/10">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-12">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#141414]/45 lg:col-span-3" style={{fontFamily: MONO}}>The house</span>
            <div className="lg:col-span-9">
              <p className="max-w-[62ch] text-[clamp(22px,2.4vw,32px)] leading-[1.35] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>
                Premium furniture for modern offices and homes — ergonomic chairs,
                sit-stand desks and tables, crafted for comfort and designed for the
                way people work.
              </p>
              <Link href="/about" className="mt-6 inline-block text-[12px] uppercase tracking-[0.16em] text-[#141414] underline decoration-[#8A6A3B]/50 decoration-1 underline-offset-[6px] hover:decoration-[#8A6A3B]" style={{fontFamily: MONO}}>About BESO</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Workspaces index ───────────────────────────────────────────── */}
      <section className="border-b border-[#141414]/10">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(26px,3vw,40px)] leading-[1.05] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>Workspaces</h2>
            <Link href="/products" className="text-[12px] uppercase tracking-[0.16em] text-[#141414] underline underline-offset-4" style={{fontFamily: MONO}}>View all</Link>
          </div>
          <ul className="mt-8">
            {workspaces.map((w, i) => (
              <li key={i} className="group border-t border-[#141414]/15">
                <Link href="/products" className="grid grid-cols-12 items-center gap-4 py-6" onMouseEnter={() => setHoverImg(firstImg(w.re))} onMouseLeave={() => setHoverImg(null)}>
                  <span className="col-span-3 text-[12px] uppercase tracking-[0.14em] text-[#141414]/45" style={{fontFamily: MONO}}>{w.type}</span>
                  <span className="col-span-3 text-[12px] uppercase tracking-[0.14em] text-[#141414]/45" style={{fontFamily: MONO}}>{w.city || '—'}</span>
                  <span className="col-span-5 text-[clamp(20px,2.2vw,30px)] leading-tight transition-colors duration-300 group-hover:text-[#8A6A3B]" style={{fontFamily: DISPLAY, fontWeight: 500}}>{w.detail}</span>
                  <span className="col-span-1 justify-self-end text-[#141414]/40 transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
                <div className="pointer-events-none absolute" />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[12px] text-[#141414]/45" style={{fontFamily: MONO}}>Client names and years omitted pending verification — see docs/content-gaps.md.</p>
        </div>
      </section>

      {/* ── Our offer rows ─────────────────────────────────────────────── */}
      <section id="offer" className="border-b border-[#141414]/10 bg-[#F4F3EF]">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
          <span className="text-[12px] uppercase tracking-[0.2em] text-[#141414]/45" style={{fontFamily: MONO}}>Our offer</span>
          <ul className="mt-8">
            {offer.map((o) => {
              const n = countOf(o.re);
              return (
                <li key={o.label} className="group border-t border-[#141414]/15">
                  <Link href="/products" className="flex items-baseline justify-between gap-6 py-6 lg:py-8" onMouseEnter={() => setHoverImg(firstImg(o.re))} onMouseLeave={() => setHoverImg(null)}>
                    <span className="text-[clamp(28px,4vw,54px)] leading-none tracking-[-0.015em] transition-colors duration-300 group-hover:text-[#8A6A3B]" style={{fontFamily: DISPLAY, fontWeight: 500}}>{o.label}</span>
                    <span className="shrink-0 text-[13px] tabular-nums text-[#141414]/45" style={{fontFamily: MONO}}>{n ? `${n} pieces` : 'Enquire'}</span>
                  </Link>
                </li>
              );
            })}
            <li className="border-t border-[#141414]/15" />
          </ul>
        </div>
      </section>

      {/* ── Materials — pinned scroll ──────────────────────────────────── */}
      <section ref={matRef} className="relative border-b border-[#141414]/10" style={{minHeight: `${materials.length * 70 + 40}vh`}}>
        <div className="sticky top-[80px] mx-auto grid max-w-[1320px] items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <span className="text-[12px] uppercase tracking-[0.2em] text-[#141414]/45" style={{fontFamily: MONO}}>Materials</span>
            <ul className="mt-8">
              {materials.map((m, i) => (
                <li key={m.label} className="border-t border-[#141414]/12 py-4 transition-opacity duration-500" style={{opacity: matActive === i ? 1 : 0.4}}>
                  <div className="text-[clamp(20px,2.2vw,28px)] leading-tight" style={{fontFamily: DISPLAY, fontWeight: 500, color: matActive === i ? '#8A6A3B' : INK}}>{m.label}</div>
                  <p className="mt-1 text-[13px] text-[#141414]/55">{m.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-[#EFEEE9]">
              {materials.map((m, i) => (
                <img key={m.label} src={m.img} alt={m.label} className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)]" style={{opacity: matActive === i ? 1 : 0, transform: matActive === i ? 'scale(1.25)' : 'scale(1.3)'}} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BESO Pro ───────────────────────────────────────────────────── */}
      <section id="pro" className="border-b border-[#141414]/10">
        <div className="mx-auto max-w-[1320px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-[12px] uppercase tracking-[0.2em] text-[#141414]/45" style={{fontFamily: MONO}}>BESO Pro</span>
              <h2 className="mt-4 text-[clamp(28px,3.4vw,46px)] leading-[1.03] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>A trade programme built for fit-outs.</h2>
              <a href={waText("Hi BESO! I'd like to join BESO Pro.")} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex h-12 items-center rounded-full px-7 text-[14px] font-semibold text-[#FAFAFA]" style={{background: INK}}>Apply for a trade account</a>
            </div>
            <div className="lg:col-span-8">
              <dl className="grid gap-x-10 sm:grid-cols-2">
                {pro.map(([t, d]) => (
                  <div key={t} className="border-t border-[#141414]/15 py-5">
                    <dt className="text-[17px] font-semibold" style={{fontFamily: DISPLAY, fontWeight: 600}}>{t}</dt>
                    <dd className="mt-1 text-[14px] leading-[1.6] text-[#141414]/60">{d}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Newsletter with audience selector ──────────────────────────── */}
      <section className="border-b border-[#141414]/10 bg-[#F4F3EF]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10 lg:py-24">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(26px,3.2vw,40px)] leading-[1.05] tracking-[-0.01em]" style={{fontFamily: DISPLAY, fontWeight: 500}}>The BESO letter</h2>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-[1.6] text-[#141414]/60">New pieces, trade notes and workspace ideas. No spam.</p>
          </div>
          <div className="lg:col-span-7">
            {subscribed ? (
              <p className="text-[16px] font-semibold" style={{color: ACCENT}}>Thanks — you&rsquo;re on the list.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }}>
                <span className="text-[12px] uppercase tracking-[0.16em] text-[#141414]/45" style={{fontFamily: MONO}}>I am</span>
                <div className="mt-3 flex gap-2">
                  {(['individual', 'business'] as const).map((a) => (
                    <button key={a} type="button" onClick={() => setAudience(a)} aria-pressed={audience === a} className="rounded-full border px-5 py-2 text-[13px] font-semibold capitalize transition-colors duration-300" style={audience === a ? {background: INK, color: '#FAFAFA', borderColor: INK} : {borderColor: 'rgba(20,20,20,0.25)', color: INK}}>{a}</button>
                  ))}
                </div>
                <div className="mt-4 flex max-w-lg flex-wrap gap-3">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-12 flex-1 rounded-full border border-[#141414]/20 bg-transparent px-5 text-[14px] focus:border-[#141414] focus:outline-none" />
                  <button type="submit" className="h-12 rounded-full px-6 text-[13px] font-semibold text-[#FAFAFA]" style={{background: ACCENT}}>Subscribe</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer id="showroom" className="bg-[#111111] text-[#F2EFE9]">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 lg:grid-cols-12 lg:px-10">
          <div className="lg:col-span-5">
            <img src="/assets/images/beso-logo-white-transparent.png" alt="BESO" className="h-5 w-auto" />
            <p className="mt-5 max-w-sm text-[14px] leading-[1.6] text-[#F2EFE9]/60">5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad 500001.</p>
            <p className="mt-2 text-[14px] text-[#F2EFE9]/70"><a href="tel:+918919317980" className="hover:text-white">089193 17980</a> · <a href={WA} target="_blank" rel="noopener noreferrer" className="hover:text-white">+91 80999 52624</a></p>
          </div>
          <nav className="grid grid-cols-2 gap-4 text-[13px] text-[#F2EFE9]/65 lg:col-span-4">
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#F2EFE9]/40" style={{fontFamily: MONO}}>Explore</div>
              <div><Link href="/products" className="hover:text-white">Shop</Link></div>
              <div><Link href="/compare" className="hover:text-white">Compare</Link></div>
              <div><Link href="/about" className="hover:text-white">About</Link></div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-[#F2EFE9]/40" style={{fontFamily: MONO}}>Trade</div>
              <div><a href={waText("Hi BESO! I'd like a trade account.")} target="_blank" rel="noopener noreferrer" className="hover:text-white">BESO Pro</a></div>
              <div><Link href="/contact" className="hover:text-white">Contact</Link></div>
              <div><a href={waText('Hi BESO!')} target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></div>
            </div>
          </nav>
          <div className="flex items-end justify-start gap-3 lg:col-span-3 lg:justify-end">
            <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2EFE9]/25 transition-colors hover:bg-[#F2EFE9] hover:text-[#111]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-.9-.3-.1-.5-.2-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.5-.3zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.4.9.9-3.3-.2-.3A9 9 0 1 1 12 21z" /></svg>
            </a>
            <a href="tel:+918919317980" aria-label="Call" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F2EFE9]/25 transition-colors hover:bg-[#F2EFE9] hover:text-[#111]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.3 0 .7-.2 1l-2.2 2.3z" /></svg>
            </a>
            <p className="self-end text-[12px] text-[#F2EFE9]/45">© 2025 Furniture Space · BESO</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
