'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 07 — Clinical Monolith · Technique A · Herman Miller brutalism */
export default function Design07() {
  return (
    <main className="bg-white min-h-screen text-black">
      {/* Monolith hero */}
      <section className="px-5 sm:px-8 lg:px-14 pt-32 pb-14 border-b-2 border-black">
        <Reveal>
          <div className="flex items-start justify-between gap-6">
            <div className="min-w-0">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0033FF]">Unit 01 — Ergonomics</span>
              <h1 className="font-[900] uppercase text-[clamp(52px,10vw,150px)] leading-[0.85] tracking-[-0.04em] mt-5 break-words">
                Sit<br />Properly.
              </h1>
            </div>
            <div className="hidden md:block text-right shrink-0">
              <div className="text-[11px] uppercase tracking-[0.2em] text-black/50">Hyderabad</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-black/50">2026 · IND</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#0033FF] font-bold">79 SKU</div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12 pt-8 border-t-2 border-black">
            <p className="md:col-span-2 text-[17px] leading-[1.55] font-medium max-w-2xl">
              No mood boards. No lifestyle promises. A chair is a machine for sitting — so we
              publish its load rating, its tilt range, its certification, and its price. Then we ship it in 48 hours.
            </p>
            <div className="flex md:justify-end items-start gap-3">
              <Link href="/products" className="bg-black text-white px-8 py-4 text-[13px] uppercase tracking-[0.1em] font-bold">Catalog</Link>
              <a href="#spec07" className="border-2 border-black px-8 py-4 text-[13px] uppercase tracking-[0.1em] font-bold hover:bg-black hover:text-white transition-colors">Specs</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Blueprint scrub */}
      <section className="px-5 sm:px-8 lg:px-14 py-16">
        <div className="flex items-center gap-4 mb-5">
          <span className="text-[11px] uppercase tracking-[0.24em] font-bold text-[#0033FF]">FIG. 1 — LINEAR PUSH-IN</span>
          <div className="h-0.5 flex-1 bg-black" />
        </div>
        <ScrubVideo src="/assets/videos/designs/07.mp4" poster="/assets/images/products/executive-chair-07.jpg" railVh={240} className="border-2 border-black">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-6 top-6 border-2 border-black bg-white px-4 py-3 font-bold text-black text-sm uppercase tracking-wider">Load rated 150 KG</div>
            <div className="absolute right-6 bottom-6 bg-[#0033FF] text-white px-5 py-3 font-black text-xl md:text-3xl">SCROLL ↓</div>
            <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#0033FF]/60" aria-hidden="true" />
          </div>
        </ScrubVideo>
      </section>

      {/* Spec table */}
      <section id="spec07" className="px-5 sm:px-8 lg:px-14 py-12 border-t-2 border-black scroll-mt-24">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-6">Specification</h2>
        <table className="w-full border-collapse text-left">
          <tbody>
            {[['Backrest', 'Double-layer mesh, 125 mm lumbar travel'], ['Base', 'Polished aluminium, 5-star, 650 mm'], ['Arms', '3D PU, 4-axis'], ['Certification', 'BIFMA X5.1 / EN 1335'], ['Warranty', '7 years structural'], ['Dispatch', '48 hours from stock']].map(([k, v]) => (
              <tr key={k} className="border-b-2 border-black">
                <td className="py-4 pr-6 text-[13px] uppercase tracking-[0.16em] font-bold w-[40%] align-top">{k}</td>
                <td className="py-4 text-[17px] font-medium">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <TrustBlock tone="light" />
      <FlagshipTrio tone="light" />
      <ReviewsBlock tone="light" />
      <ArSection tone="light" />
      <ExpertCta tone="light" />
    </main>
  );
}
