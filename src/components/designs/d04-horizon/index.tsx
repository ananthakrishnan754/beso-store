'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {AmbientLoop} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 04 — Living Office Horizon · Technique C · Fatboy warmth + Steelcase structure */
export default function Design04() {
  return (
    <main className="bg-[#F0E9DC] min-h-screen text-[#3B332B]">
      <section className="relative min-h-[92svh] flex items-center overflow-hidden pt-24">
        <AmbientLoop
          src="/assets/videos/designs/04.mp4"
          poster="/assets/images/editorial-workspace.jpg"
          className="absolute inset-0"
          overlay={
            <div className="absolute inset-0 bg-gradient-to-r from-[#F0E9DC]/95 via-[#F0E9DC]/70 to-[#F0E9DC]/10" />
          }
        />
        <div className="relative px-6 sm:px-10 lg:px-20 max-w-2xl">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C9A227] mb-6 inline-flex items-center gap-3">
            <span className="w-8 h-px bg-current" aria-hidden="true" /> Living Office Horizon
          </span>
          <h1 className="font-display font-bold text-[clamp(42px,6.5vw,88px)] leading-[0.97] tracking-tight">
            Work where the light falls.
          </h1>
          <p className="mt-7 text-[16px] leading-[1.7] text-[#3B332B]/75 max-w-[480px]">
            Oak, linen and daylight — furniture chosen for rooms that feel like home before
            nine in the morning.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href="/products" className="bg-[#3B332B] text-[#F6F1E7] px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold">Explore the range</Link>
            <a href="#calm" className="border border-[#3B332B]/30 px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-semibold hover:bg-[#3B332B]/5 transition-colors">The idea</a>
          </div>
        </div>
      </section>

      <section id="calm" className="px-5 sm:px-6 md:px-10 lg:px-16 py-24 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <Reveal className="lg:col-span-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C9A227] font-bold">Design that respects you</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mt-4 leading-[1.05]">The room sets the tempo. The furniture follows.</h2>
            <p className="text-[15px] leading-[1.7] text-[#3B332B]/70 mt-6">
              Horizon pieces are quiet by intention — low contrast, low noise, warm materials.
              Nothing in a BESO room asks for attention; everything makes the day easier.
            </p>
          </Reveal>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {[
              ['Solid oak & walnut', 'Natural grain, matte oil finish, no veneer.'],
              ['Daylight first', 'Products chosen to sit well against real sun.'],
              ['Silent mechanisms', 'Motors below 30 dB — meetings stay meetings.'],
              ['10-day home trial', 'Live with it before you commit.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.06}>
                <div className="bg-[#F7F2E8] border border-[#C9A227]/25 rounded-2xl p-6 h-full">
                  <div className="text-[#C9A227] text-xl mb-3">{'◆'}</div>
                  <div className="font-bold text-[#3B332B]">{t}</div>
                  <p className="text-sm text-[#3B332B]/65 mt-2 leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
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
