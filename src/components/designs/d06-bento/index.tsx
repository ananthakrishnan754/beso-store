'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {PlayOnEnter, AmbientLoop} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 06 — The Spec Sheet Bento · Technique D + C · Godly bento grid, dark UI */
const TILE_BASE = 'rounded-2xl border border-white/10 p-6 overflow-hidden relative';

export default function Design06() {
  return (
    <main className="bg-[#121316] min-h-screen text-[#E8E6E1]">
      {/* Bento hero grid */}
      <section className="px-4 sm:px-6 lg:px-10 pt-28 pb-16">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#2B6DE0]">The Spec Sheet</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mt-3">Everything, at a glance.</h1>
          </div>
          <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Live · Hyderabad warehouse</span>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(140px,auto)] gap-4">
          {/* big product tile with triggered video */}
          <Reveal className="col-span-2 row-span-2">
            <Link href="/products" className={`block h-full bg-[#17181D] ${TILE_BASE} hover:border-[#2B6DE0]/60 transition-colors`}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B6DE0] font-bold">New mechanism study</span>
                <span className="text-[10px] text-white/40">in stock · 214</span>
              </div>
              <PlayOnEnter src="/assets/videos/designs/06.mp4" poster="/assets/images/products/executive-chair-07.jpg" className="rounded-xl aspect-[16/9]">
                <div className="absolute inset-0 flex items-end p-4 pointer-events-none">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 bg-black/50 px-3 py-1.5 rounded-full">▸ plays on view</span>
                </div>
              </PlayOnEnter>
              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <div className="font-bold text-lg">Crown Executive Chair</div>
                  <div className="text-sm text-white/50">Synchro-tilt · 150 kg rated</div>
                </div>
                <div className="font-bold text-[#2B6DE0]">₹49,990</div>
              </div>
            </Link>
          </Reveal>

          {[
            ['Lumbar travel', '125 mm', 'continuous'],
            ['Seat depth', '44–51 cm', 'sliding pan'],
            ['Arm kit', '3D PU', '4-axis'],
            ['Warranty', '7 yr', 'frame + base'],
            ['Dispatch', '48 h', 'from stock'],
            ['Showrooms', '2', 'Hyderabad'],
          ].map(([l, v, s], i) => (
            <Reveal key={l} delay={i * 0.05}>
              <div className={`bg-[#17181D] ${TILE_BASE} h-full flex flex-col justify-between hover:border-[#2B6DE0]/40 transition-colors`}>
                <div className="text-[10px] uppercase tracking-[0.18em] text-white/45">{l}</div>
                <div>
                  <div className="font-display text-3xl md:text-4xl font-bold">{v}</div>
                  <div className="text-xs text-[#2B6DE0] mt-1">{s}</div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal className="col-span-2">
            <AmbientLoop src="/assets/videos/designs/01.mp4" poster="/assets/images/editorial-workspace.jpg" className={`rounded-2xl h-[180px] ${TILE_BASE} p-0`} overlay={
              <div className="absolute inset-0 flex items-end p-5 bg-gradient-to-t from-black/70 to-transparent pointer-events-none">
                <div className="text-sm font-semibold">Warehouse walk · seamless loop</div>
              </div>
            } />
          </Reveal>
        </div>
      </section>

      <TrustBlock tone="dark" />
      <FlagshipTrio tone="dark" />
      <ReviewsBlock tone="dark" />
      <ArSection tone="dark" />
      <ExpertCta tone="dark" />
    </main>
  );
}
