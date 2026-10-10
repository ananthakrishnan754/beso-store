'use client';

import {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

/* Concept · "Engineered" — a world-class mattress-site structure applied to
   furniture (teardown: docs/teardown/05-simba.md). Ultra-wide hero video,
   trust strip, layered cross-section storytelling, best-sellers, quiz CTA,
   comparison, reviews, rich footer. Own content only. */

const DISPLAY = 'Manrope, ui-sans-serif, system-ui, sans-serif';
const BODY = 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';
const INK = '#394547';
const BASE = '#FFFFFF';
const ACCENT = '#2C5FB4';
const SAND = '#EFEAE1';

type Product = {slug: string; name: string; price: number; image: string; category?: string};
const list = products as unknown as Product[];
const pimg = (p?: Product) => (p ? `/${p.image}` : '');
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');
const feature = ['beso-crown-executive-chair', 'beso-flexrise-height-adjustable-table', 'beso-prestige-executive-chair', 'beso-milano-executive-chair'].map((s) => list.find((p) => p.slug === s)).filter(Boolean) as Product[];
const bestsellers = feature.length ? feature : list.slice(0, 4);

const trust = [
  ['Engineering', 'Ergonomic by design'],
  ['Free delivery', 'Pan-India shipping'],
  ['5-year cover', 'On chair & mechanism'],
  ['30-day trial', 'Live with it first'],
];

const layers = [
  {name: 'Woven mesh back', note: 'Self-tensioning, breathable', color: '#AEBBC4'},
  {name: 'Contour memory foam', note: 'Pressure-relieving seat', color: '#E3D6C1'},
  {name: 'Steel synchro frame', note: 'Tilt 0–125°', color: '#C4CBD2'},
  {name: 'Aluminium star base', note: 'One cast, rated 150 kg', color: '#D7DEE3'},
];

const reviews = [
  {who: 'Rohit · IT company, Bengaluru', q: 'Forty chairs installed in two days — smooth from quote to setup.'},
  {who: 'Shreya · Design studio', q: 'The sit-stand desks changed how our studio works. Quiet and solid.'},
  {who: 'Arjun · Consulting', q: 'Fast turnaround, clean invoicing, and the pricing held up.'},
  {who: 'Meera · Home workspace', q: 'Long evenings at the desk finally feel comfortable.'},
];

export default function DesignEngineered() {
  const layerRef = useRef<HTMLDivElement | null>(null);
  const lastIdx = useRef(-1);
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0, cur = 0, target = 0;
    const onScroll = () => {
      const el = layerRef.current; if (!el) return;
      const r = el.getBoundingClientRect(); const vh = window.innerHeight;
      const p = Math.min(0.999, Math.max(0, (vh * 0.8 - r.top) / (vh * 0.9)));
      target = p * layers.length;
    };
    const loop = () => {
      cur += (target - cur) * 0.1;
      const idx = Math.min(layers.length - 1, Math.floor(cur));
      if (idx !== lastIdx.current) { lastIdx.current = idx; setActive(idx); }
      raf = requestAnimationFrame(loop);
    };
    onScroll(); loop();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div style={{fontFamily: BODY, background: BASE, color: INK}}>
      {/* announcement */}
      <div className="border-b border-[#DFE3E4] bg-[#F7F9FA] px-4 py-2 text-center text-[11px] uppercase tracking-[0.14em] text-[#394547]/70" style={{fontFamily: MONO}}>
        Free delivery across India · 5-year cover · 30-day trial
      </div>

      {/* header */}
      <header className="sticky top-0 z-40 border-b border-[#DFE3E4] bg-white/95">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-2"><img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} /></Link>
          <nav className="hidden items-center gap-7 text-[14px] text-[#394547]/80 md:flex">
            <Link href="/products" className="hover:text-[#394547]">Chairs</Link>
            <Link href="/products" className="hover:text-[#394547]">Desks</Link>
            <Link href="/products" className="hover:text-[#394547]">Tables</Link>
            <Link href="/compare" className="hover:text-[#394547]">Compare</Link>
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hidden text-[14px] text-[#394547]/70 hover:text-[#394547] sm:inline">Help</a>
            <Link href="/products" className="inline-flex h-10 items-center rounded-full bg-[#394547] px-5 text-[13px] font-semibold text-white">Find your chair</Link>
          </div>
        </div>
      </header>

      {/* hero — ultra-wide video */}
      <section className="relative">
        <video autoPlay muted loop playsInline poster="/assets/videos/hero-bg-ivory-poster.jpg" className="h-[56svh] w-full object-cover lg:h-[68svh]">
          <source src="/assets/videos/hero-bg-ivory.webm" type="video/webm" />
          <source src="/assets/videos/hero-bg-ivory.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/40 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white to-transparent" />
        <div className="mx-auto max-w-[1200px] px-5">
          <div className="relative -mt-20 rounded-3xl border border-[#DFE3E4] bg-white p-8 shadow-[0_30px_70px_-35px_rgba(57,69,71,0.5)] lg:p-12">
            <div className="flex items-center gap-3">
              <span className="h-px w-8" style={{background: ACCENT}} />
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#394547]" style={{fontFamily: MONO}}>BESO · Ergonomic furniture</span>
            </div>
            <h1 className="mt-4 max-w-[16ch] text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.02] tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>Engineered for work.</h1>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[#394547]/75">Ergonomic chairs and sit-stand desks, built layer by layer for the way you actually sit — for one desk or a whole floor.</p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link href="/products" className="inline-flex h-12 items-center rounded-full px-7 text-[15px] font-semibold text-white" style={{background: INK}}>Shop the collection</Link>
              <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="text-[15px] font-semibold text-[#394547] underline decoration-[#2C5FB4]/50 underline-offset-4 hover:decoration-[#2C5FB4]">Take the 2-min quiz →</a>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px px-5 py-10 md:grid-cols-4">
        {trust.map(([t, d]) => (
          <div key={t} className="border-t border-[#DFE3E4] px-1 py-5">
            <div className="text-[15px] font-semibold">{t}</div>
            <div className="mt-1 text-[13px] text-[#394547]/60">{d}</div>
          </div>
        ))}
      </section>

      {/* layered cross-section */}
      <section ref={layerRef} className="bg-[#F7F9FA]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          <div>
            <span className="text-[12px] uppercase tracking-[0.2em]" style={{color: ACCENT, fontFamily: MONO}}>What&rsquo;s inside</span>
            <h2 className="mt-3 text-[clamp(28px,3.6vw,46px)] font-extrabold leading-[1.05] tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>Four layers. One posture.</h2>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.65] text-[#394547]/70">Like a mattress, a good chair is built in layers. Each one does a job — support, cushion, motion and base.</p>
            <ul className="mt-8">
              {layers.map((l, i) => (
                <li key={l.name} className="flex items-center gap-4 border-t border-[#DFE3E4] py-4 transition-opacity duration-500" style={{opacity: active === i ? 1 : 0.45}}>
                  <span className="h-4 w-10 shrink-0 rounded-full" style={{background: l.color, boxShadow: active === i ? `0 0 0 2px ${ACCENT}` : 'none'}} />
                  <span className="w-full">
                    <span className="block text-[16px] font-semibold">{l.name}</span>
                    <span className="block text-[13px] text-[#394547]/55">{l.note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="overflow-hidden rounded-3xl border border-[#DFE3E4] bg-white">
            <img src="/assets/images/engineered/layers.jpg" alt="BESO chair — exploded layer cutaway" className="w-full object-cover" loading="lazy" />
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#DFE3E4] px-5 py-4 text-[12px] uppercase tracking-[0.1em] text-[#394547]/55" style={{fontFamily: MONO}}>
              <span>Layered construction</span><span>1:1 cutaway</span>
            </div>
          </div>
        </div>
      </section>

      {/* best sellers */}
      <section className="mx-auto max-w-[1200px] px-5 py-12 lg:py-16">
        <div className="flex items-end justify-between gap-6">
          <h2 className="text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>Best sellers</h2>
          <Link href="/products" className="shrink-0 text-[13px] font-semibold underline underline-offset-4 hover:text-[#2C5FB4]">Shop all →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4">
          {bestsellers.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}`} className="group flex flex-col">
              <div className="overflow-hidden rounded-2xl bg-[#F5F5DB]">
                <img src={pimg(p)} alt={p.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="mt-3 flex flex-1 flex-col">
                <h3 className="min-h-[2.6em] text-[15px] font-semibold leading-snug">{p.name}</h3>
                <div className="mt-0.5 text-[14px] text-[#394547]/60">From {money(p.price)}</div>
                <span className="mt-3 inline-flex h-9 items-center self-start rounded-full border border-[#394547]/25 px-4 text-[13px] font-semibold transition-colors group-hover:bg-[#394547] group-hover:text-white">Shop</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* quiz CTA */}
      <section className="bg-[#394547] text-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <h2 className="text-[clamp(26px,3.4vw,44px)] font-extrabold leading-[1.05] tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>Not sure which chair?</h2>
            <p className="mt-3 max-w-[42ch] text-[16px] leading-[1.6] text-white/75">Answer three quick questions and we&rsquo;ll match you to the right seat and desk for how you work.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 lg:justify-end">
            <a href="https://wa.me/918099952624?text=Hi%20BESO!%20Help%20me%20choose%20a%20chair." target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-[#394547]">Talk to a specialist</a>
            <Link href="/compare" className="inline-flex h-12 items-center rounded-full border border-white/40 px-7 text-[14px] font-semibold text-white">Compare models</Link>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 lg:py-24">
        <h2 className="text-[clamp(26px,3.2vw,40px)] font-extrabold tracking-[-0.02em]" style={{fontFamily: DISPLAY}}>Loved by workplaces</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r) => (
            <figure key={r.who} className="flex flex-col rounded-2xl border border-[#DFE3E4] p-6">
              <div className="text-[13px] font-semibold" style={{color: ACCENT}}>Verified buyer</div>
              <blockquote className="mt-3 flex-1 text-[15px] leading-[1.6] text-[#394547]/85">&ldquo;{r.q}&rdquo;</blockquote>
              <figcaption className="mt-4 text-[13px] text-[#394547]/55">{r.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-[#DFE3E4] bg-[#F7F9FA]">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:max-w-xs">
            <img src="/assets/images/beso-logo-transparent.png" alt="BESO" className="h-5 w-auto" style={{filter: 'brightness(0)'}} />
            <p className="mt-4 text-[14px] leading-[1.7] text-[#394547]/60">Ergonomic chairs and sit-stand desks, engineered in Hyderabad. 5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad 500001.</p>
            <p className="mt-2 text-[14px] text-[#394547]/70"><a href="tel:+918919317980" className="hover:text-[#394547]">089193 17980</a><br /><a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:text-[#394547]">+91 80999 52624</a></p>
          </div>
          <div className="text-[14px]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#394547]/45" style={{fontFamily: MONO}}>Shop</div>
            <ul className="mt-3 space-y-2 text-[#394547]/75">
              <li><Link href="/products" className="hover:text-[#394547]">All products</Link></li>
              <li><Link href="/compare" className="hover:text-[#394547]">Compare</Link></li>
              <li><Link href="/products" className="hover:text-[#394547]">Offers</Link></li>
            </ul>
          </div>
          <div className="text-[14px]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#394547]/45" style={{fontFamily: MONO}}>Support</div>
            <ul className="mt-3 space-y-2 text-[#394547]/75">
              <li><Link href="/contact" className="hover:text-[#394547]">Contact</Link></li>
              <li><Link href="/contact" className="hover:text-[#394547]">Delivery &amp; returns</Link></li>
              <li><Link href="/contact" className="hover:text-[#394547]">Warranty</Link></li>
            </ul>
          </div>
          <div className="text-[14px]">
            <div className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#394547]/45" style={{fontFamily: MONO}}>Company</div>
            <ul className="mt-3 space-y-2 text-[#394547]/75">
              <li><Link href="/about" className="hover:text-[#394547]">About</Link></li>
              <li><a href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20a%20trade%20quote." target="_blank" rel="noopener noreferrer" className="hover:text-[#394547]">Bulk &amp; trade</a></li>
              <li><Link href="/contact" className="hover:text-[#394547]">Help centre</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#DFE3E4] py-4 text-center text-[12px] text-[#394547]/45" style={{fontFamily: MONO}}>© 2025 Furniture Space · BESO</div>
      </footer>
    </div>
  );
}
