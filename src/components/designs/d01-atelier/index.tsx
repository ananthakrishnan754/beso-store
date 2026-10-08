'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import HeroVideo from '@/components/HeroVideo';
import {AmbientLoop} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 01 — The Hyderabad Atelier · Technique C · Molteni-derived museum pedestal */
export default function Design01() {
  return (
    <main className="bg-[#F3ECE1] min-h-screen text-[#1A1917]">
      {/* Hero: centered museum pedestal */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#8A6A3E] mb-8">The Hyderabad Atelier</span>
        <h1 className="font-display font-bold tracking-[-0.02em] text-[clamp(44px,8vw,104px)] leading-[0.95]">
          Objects for<br />the way you <span className="italic text-[#8A6A3E]">work.</span>
        </h1>
        <div className="w-24 h-px bg-[#8A6A3E]/40 my-10" aria-hidden="true" />
        <p className="max-w-[560px] text-[16px] leading-[1.7] text-[#1A1917]/70">
          A curated atelier of ergonomic seating and desks — presented like sculpture,
          engineered for eleven-hour days.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          <Link href="/products" className="bg-[#1A1917] text-[#F6F1E7] px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold">Enter the collection</Link>
          <a href="#spaces01" className="border border-[#1A1917]/30 px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-semibold hover:bg-[#1A1917]/5 transition-colors">Browse the rooms</a>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-10 bg-gradient-to-b from-transparent to-[#8A6A3E]/60" aria-hidden="true" />
      </section>

      {/* Plinth presentation */}
      <section id="spaces01" className="px-5 sm:px-6 md:px-10 lg:px-16 py-24 scroll-mt-24">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A6A3E]">Exhibition</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-4">The three pillars</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            ['/assets/images/products/executive-chair-07.jpg', 'Seating', 'Crown Executive Chair'],
            ['/assets/images/products/height-table-01.jpg', 'Desks', 'FlexRise Height-Adjustable'],
            ['/assets/images/products/executive-chair-04.jpg', 'Executive', 'Prestige Full-Grain'],
          ].map(([img, cat, name], i) => (
            <Reveal key={name} delay={i * 0.08}>
              <Link href="/products" className="group block">
                <div className="bg-[#EFE7DA] border border-[#8A6A3E]/20 rounded-t-[999px] rounded-b-3xl p-8 pt-14 pb-10 transition-colors duration-500 group-hover:bg-[#EAE0CF]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={name} className="w-full aspect-[4/5] object-cover rounded-t-[999px] rounded-b-2xl" loading="lazy" />
                </div>
                <div className="text-center mt-6">
                  <div className="text-[11px] uppercase tracking-[0.24em] text-[#8A6A3E] font-bold">{cat}</div>
                  <div className="font-display text-xl mt-2">{name}</div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ambient showroom loop band */}
      <section className="px-5 sm:px-6 md:px-10 lg:px-16 pb-8">
        <Reveal>
          <AmbientLoop
            src="/assets/videos/designs/01.mp4"
            poster="/assets/images/editorial-hero.jpg"
            className="rounded-[1.5rem] h-[46vh] min-h-[320px]"
            overlay={
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1917]/75 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.28em] text-[#E7C99B] font-bold">Showroom · Hyderabad</div>
                  <div className="font-display text-white text-2xl md:text-4xl mt-2 max-w-lg">Where every piece is finished before it ships.</div>
                </div>
              </div>
            }
          />
        </Reveal>
      </section>

      <TrustBlock tone="light" />
      <FlagshipTrio tone="light" />
      <ReviewsBlock tone="light" />
      <ArSection tone="light" />
      <ExpertCta tone="light" />
    </main>
  );
}
