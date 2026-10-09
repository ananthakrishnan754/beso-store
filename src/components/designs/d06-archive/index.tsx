'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

/* Concept · "Archive" — a dense editorial photo/video wall, streetwear-store
   structure applied to furniture (teardown: docs/teardown/beyondmedals.md).
   Own content/assets only; mono typography, warm-white base, near-black ink. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, "DejaVu Sans Mono", monospace';
const INK = '#141313';
const BASE = '#FFFDFA';

type Product = {slug: string; name: string; price: number; image: string; category?: string};
const list = products as unknown as Product[];
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const pimg = (p: Product) => `/${p.image}`;

const VIDEOS = [
  {src: '/assets/videos/mode-office', label: 'Office film'},
  {src: '/assets/videos/mode-home', label: 'Home film'},
  {src: '/assets/videos/d05-hero', label: 'The Prestige'},
];

// Build a dense wall: product photos with a few full-bleed video tiles mixed in.
type Tile = {kind: 'img'; p: Product} | {kind: 'video'; v: (typeof VIDEOS)[number]};
const wall: Tile[] = (() => {
  const out: Tile[] = [];
  const base = list.slice(0, 36);
  base.forEach((p, i) => {
    if (i === 5) out.push({kind: 'video', v: VIDEOS[0]});
    if (i === 14) out.push({kind: 'video', v: VIDEOS[1]});
    if (i === 24) out.push({kind: 'video', v: VIDEOS[2]});
    out.push({kind: 'img', p});
  });
  return out;
})();

const NAV = [
  {label: 'Shop', href: '/products'},
  {label: 'Explore', href: '/compare'},
  {label: 'Archive', href: '/products'},
];

export default function DesignArchive() {
  const [query, setQuery] = useState('');
  const [ticker, setTicker] = useState(0);
  const filtered = query.trim()
    ? list.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 36)
    : null;
  const grid: Tile[] = filtered ? filtered.map((p) => ({kind: 'img', p})) : wall;

  // hero video loop counter (currently one clip; kept simple)
  useEffect(() => { const t = setInterval(() => setTicker((v) => v + 1), 8000); return () => clearInterval(t); }, []);

  return (
    <div className="text-[#141313]" style={{fontFamily: MONO, background: BASE}}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#141313]/15 bg-[#FFFDFA]/90 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4 px-4 py-4 lg:px-6">
          <div className="flex items-center gap-6">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
            <nav className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-[#141313]/70 md:flex">
              {NAV.map((n) => (<Link key={n.label} href={n.href} className="transition-colors hover:text-[#141313]">{n.label}</Link>))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 border border-[#141313]/20 px-3 py-2 sm:flex">
              <span className="text-[11px] text-[#141313]/40">⌕</span>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pieces" className="w-28 bg-transparent text-[12px] uppercase tracking-[0.1em] placeholder:text-[#141313]/35 focus:outline-none lg:w-40" />
            </div>
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[12px] uppercase tracking-[0.14em] underline underline-offset-4">Enquire</a>
          </div>
        </div>
      </header>

      {/* ── Hero — video + giant title ─────────────────────────────────── */}
      <section className="relative h-[88svh] overflow-hidden">
        <video autoPlay muted loop playsInline poster="/assets/videos/mode-office-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/videos/mode-office.webm" type="video/webm" />
          <source src="/assets/videos/mode-office.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(10,10,10,0.25), rgba(10,10,10,0.05) 40%, rgba(10,10,10,0.55))'}} />
        <div className="relative z-10 flex h-full flex-col justify-between px-4 py-6 lg:px-6">
          <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE]">
            <span>BESO · Furniture</span><span>{ticker % 2 === 0 ? 'Office' : 'Home'}</span>
          </div>
          <div>
            <h1 className="text-[clamp(48px,13vw,190px)] font-bold uppercase leading-[0.86] tracking-[-0.02em] text-[#F6F3EE]">The Work Series</h1>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[12px] uppercase tracking-[0.14em] text-[#F6F3EE]/85">
              <span>79 pieces · office &amp; home</span>
              <Link href="/products" className="underline underline-offset-4">Shop the collection</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-[#141313]/15 py-3">
        <div className="marquee flex whitespace-nowrap text-[12px] uppercase tracking-[0.18em] text-[#141313]/70">
          {Array.from({length: 2}).map((_, k) => (
            <span key={k} className="flex shrink-0">
              {['Free shipping', '5-year warranty', '48-hour dispatch', 'AR preview', 'GST invoicing', 'Pan-India install'].map((t) => (
                <span key={t} className="mx-6 flex items-center gap-6">{t}<span className="text-[#141313]/30">◆</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── The wall — dense photos + videos ───────────────────────────── */}
      <section id="archive" className="px-2 py-2 lg:px-3">
        <div className="columns-2 gap-2 md:columns-3 lg:columns-4 [&>*]:mb-2">
          {grid.map((t, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden bg-[#F5F5DB]">
              {t.kind === 'video' ? (
                <div className="relative aspect-[4/5]">
                  <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source src={`${t.v.src}.webm`} type="video/webm" />
                    <source src={`${t.v.src}.mp4`} type="video/mp4" />
                  </video>
                  <span className="absolute left-2 top-2 bg-[#141313]/70 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-[#FFFDFA]">{t.v.label}</span>
                </div>
              ) : (
                <Link href={`/products/${t.p.slug}`} className="group block">
                  <img src={pimg(t.p)} alt={t.p.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
                  <div className="flex items-center justify-between px-1 py-1.5 text-[10px] uppercase tracking-[0.1em] text-[#141313]/60">
                    <span className="truncate pr-2">{t.p.name}</span><span className="shrink-0 tabular-nums">{money(t.p.price)}</span>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
        {filtered && filtered.length === 0 && (
          <p className="px-4 py-10 text-[13px] uppercase tracking-[0.14em] text-[#141313]/50">No pieces match “{query}”.</p>
        )}
      </section>

      {/* ── Second banner — HOME ───────────────────────────────────────── */}
      <section className="relative h-[70svh] overflow-hidden">
        <video autoPlay muted loop playsInline poster="/assets/videos/mode-home-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/videos/mode-home.webm" type="video/webm" />
          <source src="/assets/videos/mode-home.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background: 'linear-gradient(180deg, rgba(10,10,10,0.2), rgba(10,10,10,0.5))'}} />
        <div className="relative z-10 flex h-full items-center justify-center">
          <h2 className="px-6 text-center text-[clamp(40px,10vw,150px)] font-bold uppercase leading-[0.88] tracking-[-0.02em] text-[#F6F3EE]">The Home Series</h2>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#141313]/15">
        <div className="grid gap-8 px-4 py-12 text-[12px] uppercase tracking-[0.12em] text-[#141313]/70 sm:grid-cols-2 lg:grid-cols-5 lg:px-6">
          <div>
            <div className="text-[13px] font-bold text-[#141313]">BESO</div>
            <p className="mt-3 normal-case tracking-normal text-[12px] text-[#141313]/55">5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad 500001</p>
            <p className="mt-2 normal-case tracking-normal text-[12px] text-[#141313]/55"><a href="tel:+918919317980" className="hover:text-[#141313]">089193 17980</a></p>
          </div>
          <FooterCol title="Shop" links={[['All pieces', '/products'], ['Compare', '/compare'], ['Office', '/products'], ['Home', '/products']]} />
          <FooterCol title="Customer Service" links={[['Contact', '/contact'], ['Shipping', '/contact'], ['Returns', '/contact'], ['Warranty', '/contact']]} />
          <FooterCol title="Information" links={[['About', '/about'], ['Terms', '/contact'], ['Privacy', '/contact']]} />
          <div>
            <div className="text-[11px] tracking-[0.16em] text-[#141313]/45">Social</div>
            <div className="mt-3 flex gap-3">
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-9 w-9 items-center justify-center border border-[#141313]/20 hover:bg-[#141313] hover:text-[#FFFDFA]">W</a>
              <span className="flex h-9 w-9 items-center justify-center border border-[#141313]/15 text-[#141313]/30">ig</span>
              <span className="flex h-9 w-9 items-center justify-center border border-[#141313]/15 text-[#141313]/30">fb</span>
            </div>
            <div className="mt-6 text-[11px] tracking-[0.16em] text-[#141313]/45">Payment</div>
            <p className="mt-2 normal-case tracking-normal text-[11px] text-[#141313]/40">Secure checkout · GST invoices</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#141313]/12 px-4 py-4 text-[11px] uppercase tracking-[0.14em] text-[#141313]/45 lg:px-6">
          <span>© 2025 Furniture Space · BESO</span>
          <span>Hyd, IN</span>
        </div>
      </footer>
    </div>
  );
}

function FooterCol({title, links}: {title: string; links: [string, string][]}) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.16em] text-[#141313]/45">{title}</div>
      <ul className="mt-3 space-y-2 normal-case tracking-normal text-[13px]">
        {links.map(([label, href]) => (<li key={label}><Link href={href} className="hover:text-[#141313]">{label}</Link></li>))}
      </ul>
    </div>
  );
}
