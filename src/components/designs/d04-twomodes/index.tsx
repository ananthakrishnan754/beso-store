'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import products from '@/data/products.json';

/* Concept · "Two Modes" — one home page that changes character with an
   OFFICE / HOME switch (teardown: docs/teardown/01-wanderhotels.md).
   Original execution: real BESO content, Office/Home semantics, height-gauge dial. */

const DISPLAY = 'Fraunces, Georgia, "Times New Roman", serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

type Mode = 'office' | 'home';
type Product = {slug: string; name: string; price: number; image: string};
const list = products as unknown as Product[];
const find = (s: string) => list.find((p) => p.slug === s);
const crown = find('beso-crown-executive-chair');
const flexrise = find('beso-flexrise-height-adjustable-table');
const prestige = find('beso-prestige-executive-chair');
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const src = (p?: Product) => (p ? `/${p.image}` : '');

const MODES = {
  office: {
    eyebrow: 'BESO for workplaces',
    headline: ['Furniture', 'for people', 'who work', 'hard.'],
    sub: 'Ergonomic seating and sit-stand desks for the working day — specified for one desk or a whole floor.',
    accent: '#235A6B',
    video: '/assets/videos/hero-bg-ivory',
    poster: '/assets/images/d01-hero.jpg',
    image: '/assets/images/d01-hero.jpg',
  },
  home: {
    eyebrow: 'BESO for home',
    headline: ['Furniture', 'for people', 'who rest', 'well.'],
    sub: 'The same ergonomics, scaled to the corner where you read, write and unwind.',
    accent: '#B4593A',
    video: '/assets/videos/hero-bg',
    poster: '/assets/images/editorial-workspace.jpg',
    image: '/assets/images/editorial-workspace.jpg',
  },
} as const;

const tiles = [
  {label: 'Shop', title: 'Shop the collection', caption: '79 pieces across office and home.', img: '/assets/images/products/executive-chair-07.jpg', href: '/products'},
  {label: 'Compare', title: 'Compare chairs', caption: 'Put flagships side by side.', img: '/assets/images/products/executive-chair-04.jpg', href: '/compare'},
  {label: 'AR', title: 'Preview in AR', caption: 'Place a piece in your room.', img: '/assets/images/products/height-table-01.jpg', href: '#ar'},
  {label: 'Bulk', title: 'Bulk quote', caption: 'Teams, floors and fit-outs.', img: '/assets/images/d01-hero.jpg', href: 'https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20a%20bulk%20quote.'},
  {label: 'Expert', title: 'Talk to an ergo expert', caption: 'Find the right setup for how you sit.', img: '/assets/images/products/executive-chair-07.jpg', href: 'https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20ergonomic%20advice.'},
  {label: 'Visit', title: 'Visit the showroom', caption: 'Abids, Hyderabad.', img: '/assets/images/d01-hero.jpg', href: '#showroom'},
  {label: 'Guide', title: 'Ways to work', caption: 'Desk and posture ideas.', img: '/assets/images/editorial-workspace.jpg', href: '/products'},
  {label: 'Newsletter', title: 'The BESO letter', caption: 'New pieces and workspace ideas.', img: '/assets/images/products/executive-chair-04.jpg', href: '#newsletter'},
];

const featured = [crown, flexrise, prestige].filter(Boolean) as Product[];

const reasons = [
  ['Free shipping', 'Pan-India delivery'],
  ['5-year warranty', 'On chairs, desks and mechanisms'],
  ['10-day trial', 'Live with it before you commit'],
  ['Expert setup', 'Assembly and placement included'],
  ['48-hour dispatch', 'From the Hyderabad warehouse'],
  ['AR preview', 'See it to scale in your room'],
];

export default function DesignTwoModes() {
  const [mode, setMode] = useState<Mode>('office');
  const [name, setName] = useState('');
  const [draft, setDraft] = useState('');
  const [news, setNews] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // hydrate mode + name (URL wins, then local)
  useEffect(() => {
    try {
      const q = new URLSearchParams(window.location.search).get('mode');
      const s = localStorage.getItem('beso-mode') as Mode | null;
      const next: Mode = q === 'home' || q === 'office' ? q : s === 'home' ? 'home' : 'office';
      setMode(next);
      setName(localStorage.getItem('beso-name') || '');
    } catch { /* */ }
  }, []);

  const pick = useCallback((m: Mode) => {
    setMode(m);
    try { localStorage.setItem('beso-mode', m); } catch { /* */ }
    const url = m === 'office' ? window.location.pathname : `${window.location.pathname}?mode=home`;
    window.history.replaceState(null, '', url);
  }, []);

  const submitName = (e: React.FormEvent) => {
    e.preventDefault();
    const n = draft.trim().slice(0, 24);
    setName(n);
    try { localStorage.setItem('beso-name', n); } catch { /* */ }
  };

  const M = MODES[mode];

  // scroll-linked height-gauge dial (lerp-smoothed)
  const dialRef = useRef<HTMLDivElement | null>(null);
  const [deg, setDeg] = useState(-135);
  useEffect(() => {
    let raf = 0; let target = -135; let cur = -135;
    const onScroll = () => {
      const el = dialRef.current; if (!el) return;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      target = -135 + p * 270;
    };
    const loop = () => {
      cur += (target - cur) * 0.08;
      setDeg(cur);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('scroll', onScroll, {passive: true});
    onScroll(); loop();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scroller = useRef<HTMLDivElement | null>(null);
  const nudge = (dir: number) => scroller.current?.scrollBy({left: dir * 360, behavior: 'smooth'});

  return (
    <div className="bg-[#F4F1EE] text-[#232220]" style={{fontFamily: BODY}}>
      {/* ── Header with mode switch ────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#232220]/10 bg-[#F4F1EE]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 px-5 py-4 lg:px-10">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] text-[#232220]/70 md:flex">
            <Link href="/products" className="hover:text-[#232220]">Collection</Link>
            <Link href="/compare" className="hover:text-[#232220]">Compare</Link>
            <Link href="#showroom" className="hover:text-[#232220]">Showroom</Link>
          </nav>
          <div className="flex items-center gap-1 rounded-full border border-[#232220]/15 p-1 text-[12px] font-semibold uppercase tracking-[0.12em]">
            {(['office', 'home'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => pick(m)}
                aria-pressed={mode === m}
                className="rounded-full px-4 py-1.5 transition-colors duration-500 ease-in-out"
                style={mode === m ? {background: MODES[m].accent, color: '#F4F1EE'} : {color: '#232220'}}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero — dual video, mode cross-fade ─────────────────────────── */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        {(['office', 'home'] as Mode[]).map((m) => (
          <video
            key={m}
            aria-hidden={mode !== m}
            autoPlay muted loop playsInline poster={MODES[m].poster}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ease-in-out"
            style={{opacity: mode === m ? 1 : 0}}
          >
            <source src={`${MODES[m].video}.webm`} type="video/webm" />
            <source src={`${MODES[m].video}.mp4`} type="video/mp4" />
          </video>
        ))}
        <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(30,28,26,0.35) 0%, rgba(30,28,26,0.05) 34%, rgba(30,28,26,0.55) 82%, rgba(30,28,26,0.85) 100%)'}} />

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 pb-16 pt-24 lg:px-10 lg:pb-24">
          <span className="text-[12px] uppercase tracking-[0.2em]" style={{color: '#F4F1EE'}}>{name ? `Hi ${name} — ${M.eyebrow}` : M.eyebrow}</span>
          <h1 className="mt-4 text-[clamp(42px,7.5vw,96px)] font-light leading-[0.98] tracking-[-0.02em] text-[#F7F4F0]" style={{fontFamily: DISPLAY, fontWeight: 360}}>
            {M.headline.map((line) => (<span key={line} className="block">{line}</span>))}
          </h1>
          <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-[#F4F1EE]/85">{name ? `${name}, ${M.sub.charAt(0).toLowerCase()}${M.sub.slice(1)}` : M.sub}</p>

          {/* personalisation */}
          <div className="mt-8 max-w-md">
            {name ? (
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-[#F4F1EE] px-7 text-[14px] font-semibold text-[#232220] transition-transform duration-500 hover:scale-[1.02]">
                  {name}, shop the {mode === 'office' ? 'workplace' : 'home'} range
                </Link>
                <button onClick={() => { setName(''); try{localStorage.removeItem('beso-name');}catch{} }} className="text-[13px] text-[#F4F1EE]/80 underline underline-offset-4 hover:text-[#F4F1EE]">Not {name}?</button>
              </div>
            ) : (
              <form onSubmit={submitName} className="flex flex-wrap items-center gap-3">
                <label htmlFor="beso-name" className="text-[13px] text-[#F4F1EE]/85">What should we call you?</label>
                <input
                  id="beso-name" value={draft} onChange={(e) => setDraft(e.target.value)}
                  placeholder="First name" className="h-11 w-40 rounded-full border border-[#F4F1EE]/40 bg-[#F4F1EE]/10 px-4 text-[14px] text-[#F4F1EE] placeholder:text-[#F4F1EE]/50 focus:border-[#F4F1EE] focus:outline-none"
                />
                <button type="submit" className="h-11 rounded-full bg-[#F4F1EE] px-5 text-[13px] font-semibold text-[#232220]">Continue</button>
                <button type="button" onClick={() => setDraft('')} className="text-[13px] text-[#F4F1EE]/60 underline underline-offset-4">Skip</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Editorial tiles ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(26px,3.2vw,40px)] font-light leading-[1.05] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 380}}>Where would you like to go?</h2>
          <span className="text-[12px] uppercase tracking-[0.16em] text-[#232220]/50" style={{fontFamily: MONO}}>Eight ways in</span>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={(i % 4) * 70} className={i % 2 === 1 ? 'lg:mt-10' : ''}>
              <Link href={t.href} target={t.href.startsWith('http') ? '_blank' : undefined} rel={t.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="group block">
                <div className="overflow-hidden rounded-2xl bg-[#E7E1D8]">
                  <img src={t.img} alt={t.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.06]" />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.18em]" style={{color: M.accent, fontFamily: MONO}}>{t.label}</span>
                  <span className="text-[#232220]/30">↗</span>
                </div>
                <h3 className="mt-1 text-[19px] leading-[1.15]" style={{fontFamily: DISPLAY, fontWeight: 420}}>{t.title}</h3>
                <p className="mt-1 text-[13px] leading-[1.5] text-[#232220]/55">{t.caption}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Featured carousel ──────────────────────────────────────────── */}
      <section className="border-y border-[#232220]/10 bg-[#EFEAE2]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-[12px] uppercase tracking-[0.16em]" style={{color: M.accent, fontFamily: MONO}}>Featured</span>
              <h2 className="mt-2 text-[clamp(26px,3.2vw,40px)] font-light leading-[1.05]" style={{fontFamily: DISPLAY, fontWeight: 380}}>The pieces people ask about</h2>
            </div>
            <div className="flex gap-2">
              <button onClick={() => nudge(-1)} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#232220]/20 transition-colors hover:bg-[#232220] hover:text-[#F4F1EE]">‹</button>
              <button onClick={() => nudge(1)} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#232220]/20 transition-colors hover:bg-[#232220] hover:text-[#F4F1EE]">›</button>
            </div>
          </div>
          <div ref={scroller} className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none]">
            {featured.concat(list.slice(0, 6)).filter((p, i, a) => a.findIndex((x) => x.slug === p.slug) === i).slice(0, 9).map((p) => (
              <article key={p.slug} className="w-[76vw] shrink-0 snap-start sm:w-[340px]">
                <div className="overflow-hidden rounded-2xl bg-[#E7E1D8]">
                  <img src={src(p)} alt={p.name} loading="lazy" className="aspect-[4/3] w-full object-contain p-6" />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-4">
                  <h3 className="text-[18px] leading-[1.15]" style={{fontFamily: DISPLAY, fontWeight: 420}}>{p.name}</h3>
                  <span className="shrink-0 text-[14px] font-semibold tabular-nums">{money(p.price)}</span>
                </div>
                <div className="mt-3 flex items-center gap-4 text-[13px]">
                  <Link href={`/products/${p.slug}`} className="font-semibold underline underline-offset-4" style={{color: M.accent}}>View</Link>
                  <a href={`https://wa.me/918099952624?text=Hi%20BESO!%20I%27m%20interested%20in%20the%20${encodeURIComponent(p.name)}.`} target="_blank" rel="noopener noreferrer" className="text-[#232220]/60 underline underline-offset-4 hover:text-[#232220]">Enquire</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Height-gauge dial ──────────────────────────────────────────── */}
      <section ref={dialRef} className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-[12px] uppercase tracking-[0.16em]" style={{color: M.accent, fontFamily: MONO}}>FlexRise</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,48px)] font-light leading-[1.04] tracking-[-0.015em]" style={{fontFamily: DISPLAY, fontWeight: 380}}>From sit to stand, 70 to 120&nbsp;cm.</h2>
            <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.65] text-[#232220]/65">Scroll and the gauge turns with you — the same travel the FlexRise gives you between a seated and a standing day.</p>
            <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-8 gap-y-4">
              {[['Travel', '70–120 cm'], ['Motor', 'Dual, quiet'], ['Memory', '4 presets'], ['Load', '100 kg']].map(([k, v]) => (
                <div key={k} className="border-t border-[#232220]/15 pt-3">
                  <dt className="text-[11px] uppercase tracking-[0.16em] text-[#232220]/50" style={{fontFamily: MONO}}>{k}</dt>
                  <dd className="mt-1 text-[18px] tabular-nums" style={{fontFamily: DISPLAY, fontWeight: 460}}>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex justify-center">
            <div className="relative h-[300px] w-[300px]">
              <div className="absolute left-1/2 top-1/2 h-px w-[130px] -translate-y-1/2" style={{background: M.accent, transform: `rotate(${deg}deg)`, transformOrigin: '0 50%', transition: 'background 500ms ease-in-out'}} />
              <svg viewBox="0 0 300 300" className="h-full w-full">
                <circle cx="150" cy="150" r="120" fill="none" stroke="#232220" strokeOpacity="0.15" />
                {Array.from({length: 37}).map((_, i) => {
                  const a = (-135 + i * 7.5) * (Math.PI / 180);
                  const r1 = 104, r2 = i % 3 === 0 ? 118 : 112;
                  return <line key={i} x1={150 + Math.cos(a) * r1} y1={150 + Math.sin(a) * r1} x2={150 + Math.cos(a) * r2} y2={150 + Math.sin(a) * r2} stroke="#232220" strokeOpacity={i % 3 === 0 ? 0.5 : 0.22} />;
                })}
                <text x="150" y="132" textAnchor="middle" className="tabular-nums" style={{fontFamily: DISPLAY, fontSize: 40, fill: '#232220'}}>{Math.round(70 + ((deg + 135) / 270) * 50)}</text>
                <text x="150" y="158" textAnchor="middle" style={{fontFamily: MONO, fontSize: 12, letterSpacing: 2, fill: '#232220', opacity: 0.5}}>CM</text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Office / Home fork ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-5 pb-16 lg:px-10 lg:pb-24">
        <div className="grid gap-4 md:grid-cols-2">
          {(['office', 'home'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { pick(m); document.getElementById('featured')?.scrollIntoView({behavior: 'smooth'}); }}
              onMouseEnter={() => pick(m)}
              className="group relative block h-[46vh] overflow-hidden rounded-3xl text-left lg:h-[62vh]"
            >
              <img src={MODES[m].image} alt={m} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-in-out group-hover:scale-[1.05]" />
              <div className="absolute inset-0 transition-opacity duration-700" style={{background: `linear-gradient(180deg, rgba(20,18,16,0.05), rgba(20,18,16,0.7))`, opacity: mode === m ? 1 : 0.92}} />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <span className="text-[12px] uppercase tracking-[0.18em] text-[#F4F1EE]/80" style={{fontFamily: MONO}}>{m}</span>
                <div className="mt-2 text-[clamp(26px,3vw,40px)] font-light text-[#F4F1EE]" style={{fontFamily: DISPLAY, fontWeight: 380}}>
                  {m === 'office' ? 'Set up the workplace' : 'Set up the home'}
                </div>
                <span className="mt-3 inline-block text-[13px] text-[#F4F1EE] underline underline-offset-4">Switch to {m}</span>
              </div>
              {mode === m && <span className="absolute right-6 top-6 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#F4F1EE]" style={{background: MODES[m].accent}}>Active</span>}
            </button>
          ))}
        </div>
      </section>

      {/* ── Six reasons ────────────────────────────────────────────────── */}
      <section className="border-y border-[#232220]/10 bg-[#EFEAE2]">
        <div className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24">
          <h2 className="text-[clamp(26px,3.2vw,40px)] font-light leading-[1.05]" style={{fontFamily: DISPLAY, fontWeight: 380}}>Six reasons people choose BESO</h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12">
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {reasons.map(([t, d], i) => (
                <div key={t} className="border-t border-[#232220]/15 pt-4">
                  <span className="text-[12px]" style={{color: M.accent, fontFamily: MONO}}>0{i + 1}</span>
                  <h3 className="mt-1 text-[18px]" style={{fontFamily: DISPLAY, fontWeight: 420}}>{t}</h3>
                  <p className="mt-1 text-[13px] leading-[1.5] text-[#232220]/55">{d}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-4 lg:col-span-4">
              <img src="/assets/images/d01-hero.jpg" alt="A BESO workspace" loading="lazy" className="h-40 w-full rounded-2xl object-cover lg:h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Flip through + newsletter ──────────────────────────────────── */}
      <section className="mx-auto max-w-[1280px] px-5 py-16 lg:px-10 lg:py-24" id="newsletter">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col justify-center rounded-3xl bg-[#232220] p-8 text-[#F4F1EE] lg:p-12">
            <span className="text-[12px] uppercase tracking-[0.16em] text-[#F4F1EE]/60" style={{fontFamily: MONO}}>Flip through BESO</span>
            <h2 className="mt-3 text-[clamp(26px,3.4vw,44px)] font-light leading-[1.04]" style={{fontFamily: DISPLAY, fontWeight: 380}}>Browse the whole catalogue, side by side.</h2>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex h-12 items-center rounded-full bg-[#F4F1EE] px-7 text-[14px] font-semibold text-[#232220]">Shop all pieces</Link>
              <Link href="/compare" className="inline-flex h-12 items-center rounded-full border border-[#F4F1EE]/40 px-7 text-[14px] font-semibold text-[#F4F1EE]">Compare</Link>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-[clamp(24px,3vw,36px)] font-light leading-[1.05]" style={{fontFamily: DISPLAY, fontWeight: 380}}>The BESO letter</h2>
            <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.6] text-[#232220]/60">New pieces, workspace ideas and ergonomic notes. No spam.</p>
            {subscribed ? (
              <p className="mt-6 text-[15px] font-semibold" style={{color: M.accent}}>Thanks — you&rsquo;re on the list.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (news.trim()) setSubscribed(true); }} className="mt-6 flex max-w-md flex-wrap gap-3">
                <input type="email" required value={news} onChange={(e) => setNews(e.target.value)} placeholder="you@example.com" className="h-12 flex-1 rounded-full border border-[#232220]/20 bg-transparent px-5 text-[14px] focus:border-[#232220] focus:outline-none" />
                <button type="submit" className="h-12 rounded-full px-6 text-[13px] font-semibold text-[#F4F1EE] transition-colors duration-500" style={{background: M.accent}}>Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer id="showroom" className="border-t border-[#232220]/10">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-5 py-14 lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-2">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
            <p className="mt-4 max-w-sm text-[14px] leading-[1.6] text-[#232220]/55">5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad 500001.</p>
            <p className="mt-2 text-[14px] text-[#232220]/55">
              <a href="tel:+918919317980" className="hover:text-[#232220]">089193 17980</a> · <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:text-[#232220]">+91 80999 52624</a>
            </p>
          </div>
          <nav className="space-y-2 text-[14px] text-[#232220]/70">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#232220]/40" style={{fontFamily: MONO}}>Explore</div>
            <div><Link href="/products" className="hover:text-[#232220]">Shop</Link></div>
            <div><Link href="/compare" className="hover:text-[#232220]">Compare</Link></div>
            <div><Link href="/about" className="hover:text-[#232220]">About</Link></div>
            <div><Link href="/contact" className="hover:text-[#232220]">Contact</Link></div>
          </nav>
          <div className="space-y-2 text-[14px] text-[#232220]/70">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#232220]/40" style={{fontFamily: MONO}}>Talk to us</div>
            <div><a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:text-[#232220]">WhatsApp expert</a></div>
            <div><a href="mailto:hello@thebesostore.com" className="hover:text-[#232220]">Email</a></div>
            <div className="pt-2 text-[12px] text-[#232220]/40">© 2025 Furniture Space · BESO</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
