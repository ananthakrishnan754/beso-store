'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo, PlayOnEnter} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 08 — Kinetic Spine · Techniques A + D · instrument viewport + degree ticks */
export default function Design08() {
  return (
    <main className="bg-[#101215] min-h-screen text-[#F4F1EA] font-['Inter',sans-serif]">
      {/* Instrument hero */}
      <section className="min-h-[92svh] relative flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-24 pb-16">
        {/* degree ruler */}
        <div className="absolute top-24 left-5 sm:left-10 lg:left-16 right-5 sm:right-10 lg:right-16 h-6 hidden md:flex items-end gap-0 opacity-60" aria-hidden="true">
          {Array.from({length: 60}).map((_, i) => (
            <span key={i} className={`flex-1 ${i % 5 === 0 ? 'h-5 bg-[#4DE0C0]' : 'h-2.5 bg-white/35'}`} />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4DE0C0] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#4DE0C0] animate-pulse" aria-hidden="true" />
              Kinetic Spine · live readout
            </span>
            <h1 className="font-[800] text-[clamp(40px,6vw,84px)] leading-[0.95] tracking-[-0.03em] mt-6">
              Scroll articulates<br />the <span className="text-[#4DE0C0]">mechanism.</span>
            </h1>
            <p className="mt-6 max-w-[460px] text-[15px] leading-[1.7] text-white/60">
              Every degree below is driven by your scroll position — the same synchro-tilt
              geometry that carries you through a working day.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link href="/products" className="bg-[#4DE0C0] text-[#101215] px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold">Inspect the chair</Link>
              <a href="#readout" className="border border-white/30 text-white px-7 py-3.5 rounded-full text-[13px] uppercase tracking-[0.1em] font-semibold hover:bg-white/10 transition-colors">Live readout</a>
            </div>
            <div className="flex gap-6 mt-10 pt-6 border-t border-white/15 font-['ui-monospace',monospace]">
              {[['TILT', '0–125°'], ['LIFT', '70–120cm'], ['LOAD', '150KG']].map(([k, v]) => (
                <div key={k}>
                  <div className="text-[10px] text-white/45 tracking-[0.2em]">{k}</div>
                  <div className="text-[#4DE0C0] text-lg font-bold tabular-nums">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary scrub viewport */}
          <ScrubVideo src="/assets/videos/designs/08.mp4" poster="/assets/images/products/executive-chair-07.jpg" railVh={300} className="rounded-2xl border border-[#4DE0C0]/25">
            <div className="absolute inset-0 pointer-events-none">
              {/* HUD */}
              <div className="absolute top-4 left-4 font-['ui-monospace',monospace] text-[11px] tracking-widest text-[#4DE0C0] bg-black/50 px-3 py-1.5 rounded">SYNCHRO-TILT · ACTIVE</div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between font-['ui-monospace',monospace] text-[11px] text-white/70">
                <span>SCRUB = TILT</span>
                <span>REV 08 · BESO LAB</span>
              </div>
              <div className="absolute top-4 right-4 w-16 h-16 border border-[#4DE0C0]/60 rounded-full flex items-center justify-center">
                <span className="font-['ui-monospace',monospace] text-[#4DE0C0] text-sm">±25°</span>
              </div>
            </div>
          </ScrubVideo>
        </div>
      </section>

      {/* Trigger-play detail */}
      <section id="readout" className="px-5 sm:px-10 lg:px-16 py-20 border-t border-white/10 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#4DE0C0]">Mechanism detail</span>
            <h2 className="font-[800] text-3xl md:text-5xl leading-[1.02] tracking-tight mt-4">Watch it work, once.</h2>
            <p className="text-white/60 text-[15px] leading-[1.7] mt-5">
              The gas-lift test clip plays a single time when it enters view — then holds
              the last frame so you can read the travel.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-white/70">
              <li className="flex gap-3"><span className="text-[#4DE0C0]">▸</span> 100 mm gas cylinder, Class 4</li>
              <li className="flex gap-3"><span className="text-[#4DE0C0]">▸</span> 3.2 mm steel plate welds</li>
              <li className="flex gap-3"><span className="text-[#4DE0C0]">▸</span> Tested 200,000 cycles</li>
            </ul>
          </div>
          <div className="lg:col-span-7">
            <PlayOnEnter src="/assets/videos/designs/06.mp4" poster="/assets/images/products/executive-chair-07.jpg" className="rounded-2xl border border-[#4DE0C0]/25 aspect-video" />
          </div>
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
