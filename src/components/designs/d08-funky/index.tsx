'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

/* Concept · "Funky" — loud, playful, pop. Generated funky imagery/video,
   a mood/accent switcher, tilted product stickers, giant marquee, speech-bubble
   reviews. Own content/assets only. */

const DISPLAY = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const INK = '#141414';
const CREAM = '#FFF7EC';

type Product = {slug: string; name: string; price: number; image: string};
const list = products as unknown as Product[];
const pimg = (p?: Product) => (p ? `/${p.image}` : '');
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');

const MOODS = [
  {name: 'Pink', c: '#FF3D8B'},
  {name: 'Cobalt', c: '#2B4CFF'},
  {name: 'Lime', c: '#7BC950'},
  {name: 'Tangerine', c: '#FF7A1A'},
];

const tags = ['NEW', 'HOT', 'WOW', 'YES', 'OOH', 'FUN'];
const stickers = list.slice(0, 8);

const bubbles = [
  {who: 'Rohit · IT, Bengaluru', q: '40 ergonomic chairs, installed in two days. Zero fuss.'},
  {who: 'Shreya · Design studio', q: 'The FlexRise desks are genuinely fun to stand at.'},
  {who: 'Arjun · Consulting', q: 'Fast, tidy, and the pricing actually made sense.'},
];

export default function DesignFunky() {
  const [mood, setMood] = useState(0);
  useEffect(() => {
    try { const s = Number(localStorage.getItem('beso-funky-mood')); if (!Number.isNaN(s) && s >= 0 && s < MOODS.length) setMood(s); } catch { /* */ }
  }, []);
  const pick = (i: number) => { setMood(i); try { localStorage.setItem('beso-funky-mood', String(i)); } catch { /* */ } };
  const accent = MOODS[mood].c;

  return (
    <div style={{fontFamily: BODY, background: CREAM, color: INK, ['--accent' as string]: accent}}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b-[3px] border-[#141414]" style={{background: CREAM}}>
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-full text-[16px] font-bold" style={{background: accent, color: CREAM, fontFamily: DISPLAY}}>B</span>
            <span className="text-[18px] font-bold uppercase tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>BESO</span>
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] font-semibold uppercase tracking-[0.08em] md:flex" style={{fontFamily: DISPLAY}}>
            <Link href="/products" className="transition-colors hover:text-[var(--accent)]">Chairs</Link>
            <Link href="/products" className="transition-colors hover:text-[var(--accent)]">Desks</Link>
            <Link href="/compare" className="transition-colors hover:text-[var(--accent)]">Compare</Link>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] uppercase tracking-[0.14em] text-[#141414]/50 sm:inline" style={{fontFamily: MONO}}>mood</span>
            {MOODS.map((m, i) => (
              <button key={m.name} onClick={() => pick(i)} aria-label={m.name} aria-pressed={mood === i} className="h-6 w-6 rounded-full border-2 border-[#141414] transition-transform hover:scale-110" style={{background: m.c, transform: mood === i ? 'scale(1.15)' : 'none'}} />
            ))}
          </div>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b-[3px] border-[#141414]">
        <video autoPlay muted loop playsInline poster="/assets/videos/funky/hero-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/videos/funky/hero.webm" type="video/webm" />
          <source src="/assets/videos/funky/hero.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 mx-auto flex min-h-[92svh] max-w-[1400px] flex-col justify-between px-5 py-8 lg:px-10">
          <div className="flex items-start justify-between">
            <span className="rounded-full px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white" style={{background: accent, fontFamily: DISPLAY}}>Ergonomics, but fun</span>
            <span className="funky-spin grid h-20 w-20 place-items-center rounded-full border-[3px] border-[#141414] bg-[#FFF7EC] text-center text-[11px] font-bold uppercase leading-tight" style={{fontFamily: DISPLAY}}>★ NEW<br />DROP ★</span>
          </div>
          <div>
            <h1 className="text-[clamp(52px,13vw,190px)] font-bold uppercase leading-[0.82] tracking-[-0.04em]" style={{fontFamily: DISPLAY, WebkitTextStroke: '2px #141414', color: CREAM}}>
              Sit<br /><span style={{color: accent, WebkitTextStroke: '0'}}>pretty.</span>
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link href="/products" className="inline-flex h-14 items-center rounded-full border-[3px] border-[#141414] px-8 text-[15px] font-bold uppercase tracking-[0.06em] text-[#141414] transition-transform hover:-translate-y-1" style={{background: accent, fontFamily: DISPLAY}}>Shop the drop</Link>
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="rounded-full border-[3px] border-[#141414] bg-[#FFF7EC] px-6 py-3 text-[13px] font-bold uppercase tracking-[0.08em]" style={{fontFamily: DISPLAY}}>Talk to a human</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giant marquee ──────────────────────────────────────────────── */}
      <div className="overflow-hidden border-b-[3px] border-[#141414] py-4" style={{background: accent}}>
        <div className="marquee flex whitespace-nowrap">
          {Array.from({length: 2}).map((_, k) => (
            <span key={k} className="flex shrink-0 items-center text-[clamp(34px,7vw,110px)] font-bold uppercase leading-none" style={{fontFamily: DISPLAY, color: CREAM, WebkitTextStroke: '2px #141414'}}>
              {['Comfort', 'Chairs', 'Desks', 'Chaos-free', 'Delivery'].map((t) => (<span key={t} className="mx-6 flex items-center gap-6">{t}<span style={{WebkitTextStroke: '0'}}>✦</span></span>))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Sticker product grid ───────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(34px,6vw,84px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]" style={{fontFamily: DISPLAY}}>Pick a<br />favourite</h2>
          <Link href="/products" className="text-[13px] font-bold uppercase tracking-[0.1em] underline decoration-[3px] underline-offset-4 hover:text-[var(--accent)]" style={{fontFamily: DISPLAY}}>See all 79 →</Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stickers.map((p, i) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group relative block rounded-[18px] border-[3px] border-[#141414] bg-[#F5F5DB] p-4 transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-2 hover:rotate-[-2deg]" style={{transform: `rotate(${i % 2 ? 1.4 : -1.2}deg)`}}>
              <span className="absolute -top-3 left-4 rounded-full border-[3px] border-[#141414] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em]" style={{background: MOODS[i % MOODS.length].c, color: CREAM, fontFamily: DISPLAY}}>{tags[i % tags.length]}</span>
              <img src={pimg(p)} alt={p.name} loading="lazy" className="aspect-square w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="mt-3 border-t-2 border-[#141414]/15 pt-3">
                <div className="truncate text-[13px] font-bold uppercase tracking-[0.02em]" style={{fontFamily: DISPLAY}}>{p.name}</div>
                <div className="mt-0.5 text-[13px] font-semibold tabular-nums">{money(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Mood vibe section ──────────────────────────────────────────── */}
      <section className="border-y-[3px] border-[#141414]" style={{background: accent}}>
        <div className="mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-16 lg:grid-cols-2 lg:px-10">
          <div className="overflow-hidden rounded-[24px] border-[3px] border-[#141414]">
            <video autoPlay muted loop playsInline poster="/assets/videos/funky/desk-poster.jpg" className="h-full w-full object-cover">
              <source src="/assets/videos/funky/desk.webm" type="video/webm" />
              <source src="/assets/videos/funky/desk.mp4" type="video/mp4" />
            </video>
          </div>
          <div style={{color: CREAM}}>
            <h2 className="text-[clamp(34px,5.5vw,80px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]" style={{fontFamily: DISPLAY, WebkitTextStroke: '2px #141414'}}>Work hard.<br />Sit cute.</h2>
            <p className="mt-5 max-w-[44ch] text-[16px] font-medium leading-[1.6]" style={{color: INK}}>Height-adjustable desks, ergonomic chairs and colours you actually want in the room. Built in Hyderabad, shipped across India.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/products" className="inline-flex h-12 items-center rounded-full border-[3px] border-[#141414] bg-[#FFF7EC] px-6 text-[13px] font-bold uppercase tracking-[0.08em] text-[#141414]" style={{fontFamily: DISPLAY}}>Shop desks</Link>
              <Link href="/compare" className="inline-flex h-12 items-center rounded-full border-[3px] border-[#141414] px-6 text-[13px] font-bold uppercase tracking-[0.08em]" style={{fontFamily: DISPLAY, color: CREAM}}>Compare</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Speech-bubble reviews ──────────────────────────────────────── */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10 lg:py-24">
        <h2 className="text-[clamp(30px,5vw,72px)] font-bold uppercase leading-[0.9] tracking-[-0.03em]" style={{fontFamily: DISPLAY}}>Nice things<br />people said</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {bubbles.map((b, i) => (
            <div key={b.who} className="funky-bob relative rounded-[20px] border-[3px] border-[#141414] p-6" style={{background: [MOODS[0].c, MOODS[1].c, MOODS[2].c][i], color: CREAM, animationDelay: `${i * 0.4}s`}}>
              <p className="text-[17px] font-semibold leading-[1.5]" style={{fontFamily: DISPLAY}}>&ldquo;{b.q}&rdquo;</p>
              <div className="mt-4 text-[12px] font-bold uppercase tracking-[0.1em]" style={{fontFamily: MONO}}>{b.who}</div>
              <span className="absolute -bottom-3 left-8 h-6 w-6 rotate-45 border-b-[3px] border-r-[3px] border-[#141414]" style={{background: [MOODS[0].c, MOODS[1].c, MOODS[2].c][i]}} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t-[3px] border-[#141414]" style={{background: INK, color: CREAM}}>
        <div className="mx-auto max-w-[1400px] px-5 py-14 lg:px-10">
          <div className="text-[clamp(40px,10vw,150px)] font-bold uppercase leading-[0.86] tracking-[-0.04em]" style={{fontFamily: DISPLAY, color: accent}}>Come sit<br />with us.</div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-[13px] font-bold uppercase tracking-[0.08em]" style={{fontFamily: DISPLAY}}>
            <Link href="/products" className="underline decoration-[3px] underline-offset-4">Shop</Link>
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="underline decoration-[3px] underline-offset-4">WhatsApp</a>
            <a href="tel:+918919317980" className="underline decoration-[3px] underline-offset-4">089193 17980</a>
          </div>
          <p className="mt-8 text-[12px] leading-[1.7] text-[#FFF7EC]/55" style={{fontFamily: MONO}}>5-8-91/5, Mahesh Nagar Colony · Abids, Hyderabad 500001 · © 2025 Furniture Space · BESO</p>
        </div>
      </footer>
    </div>
  );
}
