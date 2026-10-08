'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 03 — Ergonomic Manifesto · Technique A · Molteni + Herman Miller editorial */
export default function Design03() {
  return (
    <main className="bg-[#F6F2E9] min-h-screen text-[#141312]">
      {/* Manifesto hero */}
      <section className="px-6 sm:px-10 lg:px-20 pt-32 pb-20 max-w-5xl">
        <Reveal>
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C0392B]">Ergonomic Manifesto · Vol. 01</span>
          <h1 className="font-display font-bold tracking-[-0.03em] text-[clamp(46px,7.5vw,96px)] leading-[0.94] mt-6 text-justify">
            Comfort is not softness. It is <span className="italic text-[#C0392B]">geometry</span> that disappears while you work.
          </h1>
          <p className="mt-10 max-w-[620px] text-[17px] leading-[1.7] text-[#141312]/70">
            We publish our specifications the way engineers publish drawings: numbers first,
            ornament never. Every chair we ship carries its own evidence.
          </p>
        </Reveal>
      </section>

      {/* Technical scrub with annotation overlays */}
      <section className="px-5 sm:px-6 md:px-10 lg:px-16 pb-16">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#C0392B]">Fig. 01</span>
            <div className="h-px flex-1 bg-[#141312]/20" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#141312]/50">Backrest articulation study</span>
          </div>
        </Reveal>
        <ScrubVideo
          src="/assets/videos/designs/03.mp4"
          poster="/assets/images/products/executive-chair-04.jpg"
          railVh={300}
          className="rounded-2xl border border-[#141312]/15"
        >
          <div className="absolute inset-0 pointer-events-none">
            {/* annotation callouts pinned to progress bands */}
            <div className="absolute top-8 left-8 bg-[#F6F2E9]/92 border border-[#C0392B]/40 rounded-lg px-4 py-3 max-w-[240px]">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C0392B] font-bold">A · Synchro tilt</div>
              <div className="text-sm mt-1 text-[#141312]">125° seat-back angle lock</div>
            </div>
            <div className="absolute bottom-8 right-8 text-right">
              <div className="font-display text-white text-4xl md:text-6xl leading-none drop-shadow-lg">04.9</div>
              <div className="text-[10px] uppercase tracking-[0.24em] text-white/70 mt-1">measured rating</div>
            </div>
            <div className="absolute inset-x-8 top-1/2 h-px bg-white/20" aria-hidden="true" />
          </div>
        </ScrubVideo>
      </section>

      {/* Spec ledger */}
      <section className="px-6 sm:px-10 lg:px-20 py-16 border-t border-[#141312]/15">
        <Reveal>
          <div className="grid md:grid-cols-4 gap-8 text-[#141312]">
            {[
              ['150 kg', 'rated base load'],
              ['7 yr', 'structural warranty'],
              ['BIFMA', 'X5.1 certified'],
              ['12,000', 'sq ft inventory'],
            ].map(([n, l]) => (
              <div key={l} className="border-t border-[#141312]/40 pt-4">
                <div className="font-display text-3xl md:text-4xl font-bold leading-none">{n}</div>
                <div className="text-[11px] uppercase tracking-[0.16em] text-[#141312]/55 mt-3">{l}</div>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-10">
          <Link href="/products" className="text-[13px] uppercase tracking-[0.16em] font-bold text-[#C0392B] border-b border-[#C0392B]/50 pb-1 hover:border-[#C0392B] transition-colors">View the full specification set →</Link>
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
