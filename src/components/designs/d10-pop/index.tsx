'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {AmbientLoop, ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 10 — The Pop Ergonomic · Techniques C + B · Fatboy bold DTC */
const STAT_BADGE = 'inline-flex items-center gap-2 rounded-full bg-[#FF5C35] text-white px-4 py-2 text-[12px] font-black uppercase tracking-wider';

export default function Design10() {
  return (
    <main className="bg-[#FFE9D2] min-h-screen text-[#161616]">
      {/* Pop hero with loop bg + bold type */}
      <section className="relative min-h-[90svh] flex items-center overflow-hidden pt-24 pb-14">
        <AmbientLoop
          src="/assets/videos/designs/10.mp4"
          poster="/assets/images/products/gaming-chair-01.jpg"
          className="absolute inset-0"
          overlay={<div className="absolute inset-0 bg-gradient-to-r from-[#FFE9D2]/94 via-[#FFE9D2]/72 to-[#FFE9D2]/25" />}
        />
        <div className="relative px-5 sm:px-8 lg:px-16 w-full">
          <span className={STAT_BADGE}>★ 4.9 · 1,204 verified owners</span>
          <h1 className="font-[900] uppercase text-[clamp(56px,12vw,168px)] leading-[0.82] tracking-[-0.04em] mt-6">
            Sit better.<br />
            <span className="text-[#FF5C35]">No jokes.</span>
          </h1>
          <p className="mt-7 max-w-[520px] text-[17px] font-semibold leading-[1.5] text-[#161616]/75">
            Ergonomic chairs and desks with a 10-day home trial and a 48-hour dispatch —
            because deciding should be the easy part.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href="/products" className="bg-[#161616] text-white px-9 py-4 rounded-full text-[14px] uppercase tracking-[0.08em] font-black">Shop now</Link>
            <a href="#stats10" className="bg-[#FF5C35] text-white px-9 py-4 rounded-full text-[14px] uppercase tracking-[0.08em] font-black hover:scale-[1.03] transition-transform">See the stats</a>
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            <span className="rounded-full bg-white/70 border border-[#161616]/15 px-4 py-2 text-[12px] font-bold">🚚 48h dispatch</span>
            <span className="rounded-full bg-white/70 border border-[#161616]/15 px-4 py-2 text-[12px] font-bold">↩︎ 10-day trial</span>
            <span className="rounded-full bg-white/70 border border-[#161616]/15 px-4 py-2 text-[12px] font-bold">🛡 7-year warranty</span>
          </div>
        </div>
      </section>

      {/* Big stat band */}
      <section id="stats10" className="px-5 sm:px-8 lg:px-16 py-16 scroll-mt-24">
        <div className="bg-[#161616] rounded-[1.5rem] p-8 md:p-12 grid md:grid-cols-3 gap-8 text-center">
          {[
            ['38%', 'users report less back pain', '#FF5C35'],
            ['4.9', 'average from 1,204 owners', '#FFE9D2'],
            ['48h', 'dispatch from Hyderabad', '#4ADE80'],
          ].map(([n, l, c]) => (
            <Reveal key={l}>
              <div>
                <div className="font-[900] text-[clamp(44px,7vw,76px)] leading-none" style={{color: c}}>{n}</div>
                <div className="text-white/60 text-[12px] uppercase tracking-[0.16em] mt-4">{l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Scrub hero strip */}
      <section className="px-5 sm:px-8 lg:px-16 pb-14">
        <ScrubVideo src="/assets/videos/designs/10.mp4" poster="/assets/images/products/executive-chair-04.jpg" railVh={220} className="rounded-[1.5rem] border-4 border-[#161616]">
          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-[#161616]/85 to-transparent pointer-events-none">
            <span className="inline-block bg-[#FF5C35] text-white font-black uppercase tracking-wide px-4 py-2 text-sm">Scroll to zoom the leather</span>
          </div>
        </ScrubVideo>
      </section>

      <TrustBlock tone="light" />
      <FlagshipTrio tone="light" />
      <ReviewsBlock tone="light" />
      <ArSection tone="light" />
      <ExpertCta tone="light" />
    </main>
  );
}
