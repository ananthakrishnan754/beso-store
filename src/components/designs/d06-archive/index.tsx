'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import products from '@/data/products.json';

/* Concept · "Archive" — furniture build of a streetwear-store structure
   (teardown: docs/teardown/beyondmedals.md). Own content/assets only.
   Structure: announcement bar · 3-zone nav · 2-up hero video · video module ·
   staggered catalogue · editorial break · gallery index · stacked footer. */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, "DejaVu Sans Mono", monospace';
const GROTESK = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const INK = '#141313';
const BASE = '#FFFDFA';
const ACCENT = '#2A4EEF';

type Product = {slug: string; name: string; price: number; image: string; category?: string};
const list = products as unknown as Product[];
const pimg = (p: Product) => `/${p.image}`;
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const countBy = (re: RegExp) => list.filter((p) => re.test(p.name)).length;
const imgBy = (re: RegExp) => { const p = list.find((x) => re.test(x.name)); return p ? pimg(p) : ''; };

const CLIPS = [
  {base: '/assets/videos/bm/studio-desk', title: 'The Work Series', meta: 'Office · film 01'},
  {base: '/assets/videos/bm/light-crown', title: 'Crown', meta: 'Office chair'},
  {base: '/assets/videos/bm/dark-prestige', title: 'Prestige', meta: 'Executive leather'},
  {base: '/assets/videos/bm/walnut-flexrise', title: 'FlexRise', meta: 'Sit–stand desk'},
  {base: '/assets/videos/bm/mesh-crown', title: 'Mesh Series', meta: 'Home · film 02'},
];

const galleries = [
  {label: 'Office chairs', re: /chair/i},
  {label: 'Executive tables', re: /table/i},
  {label: 'Bar stools', re: /stool/i},
  {label: 'Dining', re: /dining/i},
  {label: 'Gaming', re: /gaming/i},
];

export default function DesignArchive() {
  const [query, setQuery] = useState('');
  const [clip, setClip] = useState(0);
  const [email, setEmail] = useState('');
  const [agree, setAgree] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const filtered = query.trim() ? list.filter((p) => p.name.toLowerCase().includes(query.trim().toLowerCase())) : list;
  const catalog = filtered.slice(0, 12);

  useEffect(() => { const t = setInterval(() => setClip((v) => (v + 1) % CLIPS.length), 9000); return () => clearInterval(t); }, []);

  // Scroll parallax on media — matches the reference's translateY-on-scroll feel.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf: number | null = null;
    const els = [...document.querySelectorAll<HTMLElement>('[data-plx]')];
    const tick = () => {
      raf = null; const vh = window.innerHeight;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -120 || r.top > vh + 120) continue;
        const p = (vh / 2 - (r.top + r.height / 2)) / vh;
        const s = parseFloat(el.dataset.plx || '0.1');
        el.style.transform = `translate3d(0, ${(-p * s * 100).toFixed(1)}px, 0) scale(1.09)`;
      }
    };
    const on = () => { if (raf == null) raf = requestAnimationFrame(tick); };
    on();
    window.addEventListener('scroll', on, {passive: true});
    window.addEventListener('resize', on);
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="text-[#141313]" style={{fontFamily: MONO, background: BASE}}>
      {/* ── Announcement bar ───────────────────────────────────────────── */}
      <div className="bg-[#141313] px-4 py-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#FFFDFA]">
        Free shipping across India · 48-hour dispatch · GST invoicing
      </div>

      {/* ── Nav — 3 zones ──────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-[#141313]/15 bg-[#FFFDFA]/95">
        <div className="grid grid-cols-3 items-center px-4 py-4 lg:px-6">
          <nav className="flex items-center gap-5 text-[12px] uppercase tracking-[0.14em] text-[#141313]/75">
            <Link href="/products" className="transition-colors hover:text-[#2A4EEF]">Shop</Link>
            <Link href="/compare" className="hidden transition-colors hover:text-[#2A4EEF] sm:inline">Explore</Link>
            <button onClick={() => setSearchOpen((v) => !v)} className="transition-colors hover:text-[#2A4EEF]">Search</button>
          </nav>
          <Link href="/" className="justify-self-center">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
          </Link>
          <nav className="flex items-center justify-end gap-5 text-[12px] uppercase tracking-[0.14em] text-[#141313]/75">
            <Link href="/products" className="hidden transition-colors hover:text-[#2A4EEF] sm:inline">Archive</Link>
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#2A4EEF]">Enquire</a>
          </nav>
        </div>
        {searchOpen && (
          <div className="border-t border-[#141313]/12 px-4 py-3 lg:px-6">
            <input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search pieces" className="w-full bg-transparent text-[14px] uppercase tracking-[0.1em] placeholder:text-[#141313]/35 focus:outline-none" />
          </div>
        )}
      </header>

      {/* ── Hero — two panels ──────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2">
        {[
          {base: '/assets/videos/bm/light-crown', poster: '/assets/videos/bm/light-crown-poster.jpg', title: 'The Work Series', cta: 'Shop now', href: '/products', tint: 'rgba(10,10,10,0.28)'},
          {base: '/assets/videos/bm/dark-prestige', poster: '/assets/videos/bm/dark-prestige-poster.jpg', title: 'The Home Series', cta: 'Explore', href: '/products', tint: 'rgba(10,10,10,0.42)'},
        ].map((h) => (
          <div key={h.title} className="relative h-[62svh] overflow-hidden md:h-[90svh]">
            <video data-plx="0.12" autoPlay muted loop playsInline poster={h.poster} className="absolute inset-0 h-full w-full object-cover">
              <source src={`${h.base}.webm`} type="video/webm" />
              <source src={`${h.base}.mp4`} type="video/mp4" />
            </video>
            <div className="absolute inset-0" style={{background: `linear-gradient(180deg, rgba(10,10,10,0.12), ${h.tint})`}} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
              <h1 className="text-[clamp(30px,4.6vw,58px)] font-bold uppercase leading-[0.92] tracking-[-0.01em] text-[#F6F3EE]" style={{fontFamily: GROTESK}}>{h.title}</h1>
              <Link href={h.href} className="border border-[#F6F3EE]/70 bg-[#141313]/40 px-5 py-2 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE] transition-colors hover:bg-[#F6F3EE] hover:text-[#141313]">{h.cta}</Link>
            </div>
          </div>
        ))}
      </section>

      {/* ── Video module ───────────────────────────────────────────────── */}
      <section className="px-4 py-14 lg:px-6 lg:py-24">
        <div className="flex items-end justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#141313]/50">Videos</span>
          <Link href="/products" className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">View all</Link>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-12">
          <div className="relative overflow-hidden bg-[#111] lg:col-span-8">
            <video key={clip} autoPlay muted loop playsInline poster={`${CLIPS[clip].base}-poster.jpg`} className="aspect-[16/10] w-full object-cover">
              <source src={`${CLIPS[clip].base}.webm`} type="video/webm" />
              <source src={`${CLIPS[clip].base}.mp4`} type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-4 text-[11px] uppercase tracking-[0.14em] text-[#F6F3EE]">
              <span>{CLIPS[clip].title}</span><span className="text-[#F6F3EE]/70">{CLIPS[clip].meta}</span>
            </div>
          </div>
          <ul className="grid grid-cols-2 gap-3 lg:col-span-4 lg:grid-cols-1">
            {CLIPS.map((c, i) => (
              <li key={c.title}>
                <button onClick={() => setClip(i)} className="group flex w-full items-center gap-3 text-left">
                  <span className="relative h-14 w-12 shrink-0 overflow-hidden bg-[#111]">
                    <img src={`${c.base}-poster.jpg`} alt="" className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100" style={{outline: i === clip ? `2px solid ${INK}` : 'none', outlineOffset: -2}} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12px] uppercase tracking-[0.12em]">{c.title}</span>
                    <span className="block truncate text-[11px] text-[#141313]/45">{c.meta}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Catalogue — staggered ──────────────────────────────────────── */}
      <section className="px-4 pb-16 lg:px-6 lg:pb-24">
        <div className="flex items-end justify-between">
          <span className="text-[11px] uppercase tracking-[0.18em] text-[#141313]/50">{query ? `Search · ${filtered.length}` : 'Latest'}</span>
          <Link href="/products" className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">See all 79</Link>
        </div>
        <div className="mx-auto mt-6 grid max-w-[1392px] grid-cols-2 gap-3 md:grid-cols-4">
          {catalog.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 60} className={i % 2 === 1 ? 'md:mt-10' : ''}>
              <Link href={`/products/${p.slug}`} className="group block">
                <div className="overflow-hidden bg-[#F5F5DB]">
                  <img src={pimg(p)} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-[10px] tracking-[0.14em] text-[#141313]/45">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-[10px] tracking-[0.14em] text-[#141313]/45">{p.category === 'home' ? 'Home' : 'Office'}</span>
                </div>
                <div className="mt-1 truncate text-[12px] uppercase tracking-[0.08em]">{p.name}</div>
                <div className="mt-0.5 text-[11px] text-[#141313]/55">{money(p.price)}</div>
              </Link>
            </Reveal>
          ))}
          {catalog.length === 0 && <p className="col-span-full py-8 text-[13px] uppercase tracking-[0.12em] text-[#141313]/50">No pieces match “{query}”.</p>}
        </div>
      </section>

      {/* ── Editorial break ────────────────────────────────────────────── */}
      <section className="relative h-[64svh] overflow-hidden">
        <video data-plx="0.16" autoPlay muted loop playsInline poster="/assets/videos/bm/walnut-flexrise-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/assets/videos/bm/walnut-flexrise.webm" type="video/webm" />
          <source src="/assets/videos/bm/walnut-flexrise.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{background: 'rgba(10,10,10,0.42)'}} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <h2 className="text-[clamp(28px,6vw,84px)] font-bold uppercase leading-[0.9] tracking-[-0.01em] text-[#F6F3EE]" style={{fontFamily: GROTESK}}>Built for the work day</h2>
          <Link href="/products" className="border border-[#F6F3EE]/70 px-6 py-2 text-[11px] uppercase tracking-[0.16em] text-[#F6F3EE] transition-colors hover:bg-[#F6F3EE] hover:text-[#141313]">Explore the collection</Link>
        </div>
      </section>

      {/* ── Gallery index ──────────────────────────────────────────────── */}
      <section className="px-4 py-14 lg:px-6 lg:py-24">
        <div className="flex items-end justify-between">
          <h2 className="text-[clamp(20px,2.4vw,30px)] font-bold uppercase tracking-[-0.01em]" style={{fontFamily: GROTESK}}>Gallery</h2>
          <Link href="/products" className="text-[11px] uppercase tracking-[0.18em] underline underline-offset-4">Have a look</Link>
        </div>
        <ul className="mt-6">
          {galleries.map((g) => (
            <li key={g.label} className="border-b border-dotted border-[#141313]/25">
              <Link href="/products" className="flex items-center justify-between gap-4 py-4 text-[13px] uppercase tracking-[0.12em]">
                <span>{g.label}</span>
                <span className="text-[#141313]/45">{countBy(g.re)} pieces</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#141313]/15 bg-[#141313] text-[#FFFDFA]">
        <div className="grid gap-10 px-4 py-14 text-[12px] lg:grid-cols-4 lg:px-6 lg:py-20">
          <div className="lg:col-span-2 lg:max-w-md">
            <div className="text-[13px] font-bold uppercase tracking-[0.14em]">The BESO letter</div>
            <p className="mt-3 text-[13px] leading-[1.6] text-[#FFFDFA]/60">New pieces, trade notes and workspace ideas. No spam.</p>
            {subscribed ? (
              <p className="mt-5 text-[13px] uppercase tracking-[0.12em]">Thanks — you&rsquo;re on the list.</p>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim() && agree) setSubscribed(true); }} className="mt-5">
                <div className="flex border-b border-[#FFFDFA]/40">
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" className="w-full bg-transparent py-3 text-[13px] uppercase tracking-[0.1em] text-[#FFFDFA] placeholder:text-[#FFFDFA]/40 focus:outline-none" />
                  <button type="submit" className="shrink-0 px-3 text-[11px] uppercase tracking-[0.16em] disabled:opacity-40" disabled={!agree}>Subscribe</button>
                </div>
                <label className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-[#FFFDFA]/60">
                  <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="accent-white" /> I accept the terms
                </label>
              </form>
            )}
            <p className="mt-8 max-w-sm text-[12px] leading-[1.7] text-[#FFFDFA]/50">BESO — premium furniture for modern offices and homes. Ergonomic chairs, sit-stand desks and tables, made for the way people work. Hyderabad, India.</p>
            <div className="mt-4 text-[12px] text-[#FFFDFA]/60">
              <div>5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad 500001</div>
              <a href="tel:+918919317980" className="hover:text-white">089193 17980</a> · <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:text-white">+91 80999 52624</a>
            </div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#FFFDFA]/45">Information</div>
            <ul className="mt-3 space-y-2 text-[13px] text-[#FFFDFA]/75">
              {[['About', '/about'], ['Shipping', '/contact'], ['Returns & claims', '/contact'], ['Terms & conditions', '/contact'], ['Privacy policy', '/contact']].map(([l, h]) => (
                <li key={l}><Link href={h} className="hover:text-white">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#FFFDFA]/45">Social</div>
            <ul className="mt-3 space-y-2 text-[13px] text-[#FFFDFA]/75">
              <li><a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:text-white">WhatsApp</a></li>
              <li className="text-[#FFFDFA]/30">Instagram</li>
              <li className="text-[#FFFDFA]/30">Facebook</li>
            </ul>
            <div className="mt-6 text-[11px] uppercase tracking-[0.16em] text-[#FFFDFA]/45">Payment</div>
            <p className="mt-2 text-[12px] text-[#FFFDFA]/50">Secure checkout · GST invoices</p>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[#FFFDFA]/15 px-4 py-4 text-[11px] uppercase tracking-[0.14em] text-[#FFFDFA]/50 lg:px-6">
          <span>EN / INR</span><span>© 2025 Furniture Space · BESO</span>
        </div>
      </footer>
    </div>
  );
}
