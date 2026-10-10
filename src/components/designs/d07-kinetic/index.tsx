'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

/* Concept · "Kinetic" — a motion-led concept packing the top scroll patterns
   (pinned horizontal scroll, scroll-scrub, parallax layers, line-mask headline,
   magnetic cursor, velocity marquee, count-up stats). Hand-rolled rAF, no anim
   deps. Research: docs/teardown/04-motion-patterns.md */

const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const INK = '#121212';
const BASE = '#F4F2ED';
const ACCENT = '#E4521E';

type Product = {slug: string; name: string; price: number; image: string};
const list = products as unknown as Product[];
const pimg = (p?: Product) => (p ? `/${p.image}` : '');
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const bySlug = (s: string) => list.find((p) => p.slug === s);
const crown = bySlug('beso-crown-executive-chair');
const flexrise = bySlug('beso-flexrise-height-adjustable-table');
const prestige = bySlug('beso-prestige-executive-chair');

const panels = [crown, prestige, flexrise, list.find((p) => /milano executive chair/i.test(p.name)), list.find((p) => /horizon executive table/i.test(p.name))].filter(Boolean) as Product[];

const stats = [
  {n: 79, label: 'pieces in the catalogue', suffix: ''},
  {n: 58, label: 'workplace pieces', suffix: ''},
  {n: 48, label: 'hour dispatch', suffix: 'h'},
  {n: 5, label: 'year warranty', suffix: 'yr'},
];

const reasons = ['Free shipping', '5-year warranty', '48-hour dispatch', 'AR preview', 'GST invoicing', 'Pan-India install', 'Ergo expert'];

export default function DesignKinetic() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const layerBackRef = useRef<HTMLImageElement | null>(null);
  const layerFrontRef = useRef<HTMLImageElement | null>(null);
  const horizRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const scrubRef = useRef<HTMLDivElement | null>(null);
  const scrubImgRef = useRef<HTMLImageElement | null>(null);
  const scrubLinesRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLParagraphElement | null>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;
    let marqueeX = 0, lastY = window.scrollY;
    let raf = 0;
    const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      raf = 0;
      const vh = window.innerHeight, vw = window.innerWidth, y = window.scrollY;
      // cursor lerp
      if (cursorRef.current) { cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18; cursorRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`; }
      // hero parallax
      if (heroRef.current) {
        const hp = clamp(y / vh);
        if (layerBackRef.current) layerBackRef.current.style.transform = `translate3d(0, ${hp * 90}px, 0) scale(1.1)`;
        if (layerFrontRef.current) layerFrontRef.current.style.transform = `translate3d(0, ${hp * -60}px, 0)`;
      }
      // horizontal pinned scroll
      if (horizRef.current && trackRef.current) {
        const r = horizRef.current.getBoundingClientRect();
        const total = r.height - vh;
        const p = clamp(-r.top / total);
        const dist = (panels.length - 1) * vw;
        trackRef.current.style.transform = `translate3d(${-p * dist}px, 0, 0)`;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      }
      // scroll-scrub
      if (scrubRef.current) {
        const r = scrubRef.current.getBoundingClientRect();
        const total = r.height - vh;
        const p = clamp(-r.top / total);
        if (scrubImgRef.current) scrubImgRef.current.style.transform = `scale(${1 + p * 0.28})`;
        const lines = scrubLinesRef.current?.children;
        if (lines) for (let i = 0; i < lines.length; i++) { const el = lines[i] as HTMLElement; el.style.opacity = String(clamp((p - i * 0.14) / 0.28)); el.style.transform = `translateY(${(1 - clamp((p - i * 0.14) / 0.28)) * 18}px)`; }
      }
      // velocity marquee
      if (marqueeRef.current) {
        const dy = y - lastY; lastY = y;
        marqueeX -= 0.6 + dy * 0.35;
        const half = marqueeRef.current.scrollWidth / 2;
        if (marqueeX <= -half) marqueeX += half; if (marqueeX > 0) marqueeX -= half;
        marqueeRef.current.style.transform = `translate3d(${marqueeX}px, 0, 0)`;
      }
      // word reveal
      if (wordsRef.current) {
        const r = wordsRef.current.getBoundingClientRect();
        const p = clamp((vh * 0.85 - r.top) / (vh * 0.5));
        const ws = wordsRef.current.querySelectorAll('span');
        ws.forEach((w, i) => { const t = clamp((p - i / (ws.length * 1.25)) * 4); (w as HTMLElement).style.opacity = String(0.18 + t * 0.82); });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove, {passive: true});
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, [reduce, panels.length]);

  const magnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return;
    const t = e.currentTarget; const r = t.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2), yy = e.clientY - (r.top + r.height / 2);
    t.style.transform = `translate(${x * 0.25}px, ${yy * 0.35}px)`;
  };
  const unmagnet = (e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.transform = 'translate(0,0)'; };

  return (
    <div className="text-[#121212]" style={{fontFamily: BODY, background: BASE}}>
      {/* custom cursor */}
      <div ref={cursorRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full lg:block" style={{background: ACCENT, mixBlendMode: 'multiply'}} />

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/"><img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} /></Link>
          <nav className="flex items-center gap-7 text-[12px] uppercase tracking-[0.16em] text-[#121212]/70" style={{fontFamily: MONO}}>
            <Link href="/products" className="transition-colors hover:text-[#121212]">Shop</Link>
            <Link href="/compare" className="hidden transition-colors hover:text-[#121212] sm:inline">Compare</Link>
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#121212]">Enquire</a>
          </nav>
        </div>
      </header>

      {/* ── Hero — parallax layers + line-mask headline ────────────────── */}
      <section ref={heroRef} className="relative flex min-h-[100svh] items-end overflow-hidden">
        <img ref={layerBackRef} src="/assets/images/editorial-workspace.jpg" alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <img ref={layerFrontRef} src={pimg(crown)} alt="BESO Crown executive chair" className="absolute right-[6%] top-[16%] hidden h-[58vh] w-auto object-contain lg:block" />

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 lg:px-10 lg:pb-28">
          <span className="text-[12px] uppercase tracking-[0.28em] text-[#121212]/50" style={{fontFamily: MONO}}>BESO · Movement</span>
          <h1 className="mt-4 text-[clamp(46px,9vw,150px)] font-bold uppercase leading-[0.86] tracking-[-0.03em]" style={{fontFamily: DISPLAY}}>
            <span className="kine-mask"><span className="kine">Furniture</span></span>
            <span className="kine-mask"><span className="kine" style={{animationDelay: '0.08s'}}>that moves</span></span>
            <span className="kine-mask"><span className="kine" style={{animationDelay: '0.16s'}}>with you.</span></span>
          </h1>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/products" onMouseMove={magnet} onMouseLeave={unmagnet} className="inline-flex h-14 items-center rounded-full px-8 text-[14px] font-semibold text-[#F4F2ED] transition-[background] duration-300" style={{background: INK}}>Shop the collection</Link>
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[13px] uppercase tracking-[0.14em] underline underline-offset-[6px] decoration-[#E4521E]/50 hover:decoration-[#E4521E]" style={{fontFamily: MONO}}>Talk to an expert →</a>
          </div>
          <div className="mt-10 text-[11px] uppercase tracking-[0.2em] text-[#121212]/40" style={{fontFamily: MONO}}>Scroll ↓</div>
        </div>
      </section>

      {/* ── Pinned horizontal gallery ──────────────────────────────────── */}
      <section ref={horizRef} className="relative" style={{height: `${(panels.length) * 100}vh`}}>
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <div className="flex h-full items-center" style={{height: '100%'}}>
            <div ref={trackRef} className="flex h-full" style={{willChange: 'transform'}}>
              {panels.map((p, i) => (
                <div key={p.slug} className="relative flex h-full w-[100vw] shrink-0 items-center justify-center px-6">
                  <div className="flex h-[74vh] w-full max-w-[1100px] flex-col overflow-hidden rounded-[18px] bg-[#F5F5DB] lg:flex-row">
                    <div className="flex flex-1 items-center justify-center p-8">
                      <img src={pimg(p)} alt={p.name} className="h-full w-auto object-contain" />
                    </div>
                    <div className="flex w-full flex-col justify-between border-t border-[#121212]/10 p-8 lg:w-[420px] lg:border-l lg:border-t-0">
                      <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.18em] text-[#121212]/45" style={{fontFamily: MONO}}>
                        <span>{String(i + 1).padStart(2, '0')} / {String(panels.length).padStart(2, '0')}</span><span>BESO</span>
                      </div>
                      <div>
                        <h2 className="text-[clamp(28px,3vw,42px)] leading-[1.02] tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>{p.name}</h2>
                        <div className="mt-3 text-[16px] font-semibold tabular-nums">{money(p.price)}</div>
                        <Link href={`/products/${p.slug}`} className="mt-6 inline-flex h-11 items-center rounded-full border border-[#121212]/25 px-6 text-[13px] font-semibold transition-colors hover:bg-[#121212] hover:text-[#F4F2ED]">View piece</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* progress */}
          <div className="absolute bottom-8 left-1/2 h-[2px] w-[220px] -translate-x-1/2 bg-[#121212]/15">
            <div ref={barRef} className="h-full origin-left" style={{background: ACCENT, transform: 'scaleX(0)'}} />
          </div>
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.2em] text-[#121212]/45" style={{fontFamily: MONO}}>The line — scroll</div>
        </div>
      </section>

      {/* ── Scroll-scrub pinned product ────────────────────────────────── */}
      <section ref={scrubRef} className="relative bg-[#121212] text-[#F4F2ED]" style={{height: '240vh'}}>
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div className="mx-auto grid w-full max-w-[1400px] items-center gap-10 px-6 lg:grid-cols-2 lg:px-10">
            <div>
              <span className="text-[12px] uppercase tracking-[0.24em] text-[#E4521E]" style={{fontFamily: MONO}}>Ergonomics</span>
              <h2 className="mt-4 text-[clamp(34px,4.6vw,68px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]" style={{fontFamily: DISPLAY}}>Held in<br />one motion.</h2>
              <div ref={scrubLinesRef} className="mt-8 space-y-5 text-[16px] leading-[1.6] text-[#F4F2ED]/85">
                {[['Synchro-tilt', 'Back and seat recline together, 0–125°.'], ['3D armrests', 'Height, depth and pivot, without leaving posture.'], ['Class-4 lift', '100 mm travel, tested to 200,000 cycles.'], ['Cast base', 'One-piece aluminium, rated to 150 kg.']].map(([t, d]) => (
                  <div key={t}><div className="text-[15px] font-semibold" style={{color: ACCENT}}>{t}</div><div className="text-[15px] text-[#F4F2ED]/60">{d}</div></div>
                ))}
              </div>
            </div>
            <div className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-[18px] bg-[#1B1B1B]">
              <img ref={scrubImgRef} src={pimg(prestige)} alt="BESO Prestige executive chair" className="h-full w-auto object-contain p-8 will-change-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Velocity marquee ───────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-[#121212]/12 py-6">
        <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
          {Array.from({length: 2}).map((_, k) => (
            <span key={k} className="flex shrink-0 items-center text-[clamp(28px,5vw,72px)] font-bold uppercase tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>
              {reasons.map((t) => (<span key={t} className="mx-6 flex items-center gap-6">{t}<span style={{color: ACCENT}}>✳</span></span>))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Count-up stats ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10 lg:py-28">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((s) => (<CountStat key={s.label} n={s.n} suffix={s.suffix} label={s.label} />))}
        </div>
      </section>

      {/* ── Word reveal statement ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1100px] px-6 pb-24 lg:px-10 lg:pb-32">
        <p ref={wordsRef} className="text-[clamp(24px,3.4vw,46px)] font-semibold leading-[1.25] tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>
          {'Ergonomic seating and sit-stand desks, engineered in Hyderabad for the way people actually work — specified for one desk or a whole floor.'.split(' ').map((w, i) => (<span key={i} className="inline-block" style={{opacity: 0.18, transition: 'opacity 120ms linear'}}>{w}&nbsp;</span>))}
        </p>
      </section>

      {/* ── Close / footer ─────────────────────────────────────────────── */}
      <footer className="bg-[#121212] text-[#F4F2ED]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <div className="text-[clamp(30px,5vw,64px)] font-bold uppercase leading-[0.95] tracking-[-0.03em]" style={{fontFamily: DISPLAY}}>Come sit with us.</div>
            <div className="mt-4 flex flex-wrap gap-x-7 gap-y-3 text-[13px] uppercase tracking-[0.14em]" style={{fontFamily: MONO}}>
              <Link href="/products" className="underline underline-offset-4 decoration-[#E4521E]/60 hover:decoration-[#E4521E]">Shop the collection</Link>
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-[#E4521E]/60 hover:decoration-[#E4521E]">WhatsApp an expert</a>
              <a href="tel:+918919317980" className="underline underline-offset-4 decoration-[#E4521E]/60 hover:decoration-[#E4521E]">089193 17980</a>
            </div>
          </div>
          <p className="text-[12px] leading-[1.7] text-[#F4F2ED]/55" style={{fontFamily: MONO}}>5-8-91/5, Mahesh Nagar Colony<br />Abids, Hyderabad 500001<br />© 2025 Furniture Space · BESO</p>
        </div>
      </footer>
    </div>
  );
}

function CountStat({n, suffix, label}: {n: number; suffix: string; label: string}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(n); return; }
    const io = new IntersectionObserver((es) => { if (!es[0].isIntersecting) return; io.disconnect(); const t0 = performance.now(); const step = (now: number) => { const k = Math.min(1, (now - t0) / 1400); setVal(Math.round(n * (1 - Math.pow(1 - k, 4)))); if (k < 1) requestAnimationFrame(step); }; requestAnimationFrame(step); }, {threshold: 0.5});
    io.observe(el); return () => io.disconnect();
  }, [n]);
  return (
    <div>
      <span ref={ref} className="text-[clamp(40px,6vw,84px)] font-bold leading-none tabular-nums" style={{fontFamily: DISPLAY}}>{val}{suffix}</span>
      <div className="mt-2 text-[12px] uppercase tracking-[0.16em] text-[#121212]/50" style={{fontFamily: MONO}}>{label}</div>
    </div>
  );
}
