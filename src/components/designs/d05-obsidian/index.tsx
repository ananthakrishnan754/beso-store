'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 05 — Obsidian Precision · Technique B · Lumina dark-luxe spotlight */
export default function Design05() {
  return (
    <main className="bg-[#0E0E10] min-h-screen text-[#F2EFE8]">
      {/* Dark full-bleed scrub hero */}
      <section className="relative">
        <ScrubVideo src="/assets/videos/designs/05.mp4" poster="/assets/images/products/executive-chair-07.jpg" railVh={220} className="">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/35 to-[#0E0E10]/70 pointer-events-none" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center px-6 pt-24">
              <span className="text-[11px] font-bold uppercase tracking-[0.34em] text-[#C9A227]">Obsidian Precision</span>
              <h1 className="font-display font-bold text-[clamp(46px,8vw,110px)] leading-[0.94] tracking-[-0.03em] mt-6">
                Built for the<br /><span className="italic text-[#C9A227]">last hour.</span>
              </h1>
              <p className="mt-7 max-w-[520px] mx-auto text-[15px] leading-[1.7] text-white/65">
                Directional-lit, obsessively specified, and quietly dark — furniture for
                people who finish the work after everyone leaves.
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-9">
                <Link href="/products" className="bg-[#C9A227] text-[#0E0E10] px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold">Shop the dark line</Link>
                <a href="#darkspecs" className="border border-white/30 text-white px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-semibold hover:bg-white/10 transition-colors">Specifications</a>
              </div>
            </div>
          </div>
        </ScrubVideo>
      </section>

      <section id="darkspecs" className="px-5 sm:px-6 md:px-10 lg:px-16 py-24 scroll-mt-24">
        <Reveal className="mb-14">
          <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-[#C9A227]">In the dark, details matter</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mt-4">Three signature pieces</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            ['/assets/images/products/executive-chair-07.jpg', 'Crown', 'Emerald mesh · brass base', '₹49,990'],
            ['/assets/images/products/height-table-01.jpg', 'FlexRise', 'Smoked walnut · dual motor', '₹42,990'],
            ['/assets/images/products/executive-chair-04.jpg', 'Prestige', 'Cognac leather · steel', '₹64,990'],
          ].map(([img, n, s, p], i) => (
            <Reveal key={n} delay={i * 0.07}>
              <Link href="/products" className="group block bg-[#15151A] border border-white/10 rounded-2xl overflow-hidden hover:border-[#C9A227]/50 transition-colors">
                <div className="aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={n} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="font-display text-xl">{n}</div>
                  <div className="text-sm text-white/55 mt-1">{s}</div>
                  <div className="text-[#C9A227] font-bold mt-4">{p}</div>
                </div>
              </Link>
            </Reveal>
          ))}
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
