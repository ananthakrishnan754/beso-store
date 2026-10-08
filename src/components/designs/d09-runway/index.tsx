'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 09 — Showroom Runway · Technique B (horizontal) · Godly rhythm + Molteni curation */
const RUNWAY = [
  ['/assets/images/products/executive-chair-07.jpg', '01', 'Crown Executive', '₹49,990'],
  ['/assets/images/products/height-table-01.jpg', '02', 'FlexRise Standing Desk', '₹42,990'],
  ['/assets/images/products/executive-chair-04.jpg', '03', 'Prestige Executive', '₹64,990'],
  ['/assets/images/products/gaming-chair-01.jpg', '04', 'Racing Series', '₹24,990'],
  ['/assets/images/products/executive-table-01.jpg', '05', 'Boardroom Table', '₹58,990'],
];

export default function Design09() {
  return (
    <main className="bg-[#EDE7DC] min-h-screen text-[#1C1B1A]">
      <section className="px-5 sm:px-6 md:px-10 lg:px-16 pt-32 pb-10">
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A8B6F] font-bold">Showroom Runway</span>
            <h1 className="font-display font-bold text-[clamp(40px,6vw,86px)] leading-[0.97] tracking-tight mt-4">
              Walk the aisle.<br /><span className="italic text-[#7A8B6F]">Side to side.</span>
            </h1>
          </div>
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#1C1B1A]/50">Scroll to travel →</div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#1C1B1A]/50 mt-1">05 stops</div>
          </div>
        </Reveal>
      </section>

      {/* Horizontal runway scrub (vertical scroll drives horizontal dolly) */}
      <section className="px-5 sm:px-6 md:px-10 lg:px-16 pb-6">
        <ScrubVideo src="/assets/videos/designs/09.mp4" poster="/assets/images/products/executive-table-01.jpg" railVh={320} className="rounded-[1.5rem]">
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#1C1B1A]/70 via-transparent to-transparent" />
          <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between pointer-events-none">
            <span className="text-white/85 text-[11px] uppercase tracking-[0.24em] font-bold">Runway · 4 m track</span>
            <span className="font-display text-white text-2xl md:text-3xl">Boardroom</span>
          </div>
          {/* progress ticks */}
          <div className="absolute top-5 left-7 right-7 flex gap-2 pointer-events-none" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <span key={i} className="h-0.5 flex-1 bg-white/30 rounded-full" />
            ))}
          </div>
        </ScrubVideo>
      </section>

      {/* Horizontal snap gallery */}
      <section className="py-14">
        <div className="px-5 sm:px-6 md:px-10 lg:px-16 flex items-center justify-between mb-6">
          <span className="text-[11px] uppercase tracking-[0.24em] text-[#7A8B6F] font-bold">The stops</span>
          <Link href="/products" className="text-[13px] font-semibold uppercase tracking-[0.14em] hover:text-[#7A8B6F] transition-colors">Full catalog →</Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 px-5 sm:px-6 md:px-10 lg:px-16 snap-x snap-mandatory no-scrollbar">
          {RUNWAY.map(([img, n, name, price], i) => (
            <Reveal key={n} delay={i * 0.05}>
              <Link href="/products" className="group block w-[240px] md:w-[280px] shrink-0 snap-start">
                <div className="bg-[#F7F3EA] border border-[#1C1B1A]/10 rounded-xl overflow-hidden">
                  <div className="aspect-[4/5] bg-[#E6DFD2] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <div className="p-5 flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#7A8B6F] font-bold">{n}</div>
                      <div className="font-semibold mt-1.5 leading-tight">{name}</div>
                    </div>
                    <div className="font-bold shrink-0">{price}</div>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <TrustBlock tone="light" />
      <FlagshipTrio tone="light" />
      <ReviewsBlock tone="light" />
      <ArSection tone="light" />
      <ExpertCta tone="light" />
    </main>
  );
}
