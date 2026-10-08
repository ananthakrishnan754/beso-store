'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ScrubVideo} from '../ScrollVideo';
import {FlagshipTrio, TrustBlock, ReviewsBlock, ArSection, ExpertCta} from '../shared';

/* 02 — Executive Humanics · Technique B · Steelcase-derived taupe split */
export default function Design02() {
  return (
    <main className="bg-[#E7DFD3] min-h-screen text-[#242321]">
      {/* Split hero */}
      <section className="min-h-[100svh] grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#B44A2E] mb-6">Executive Humanics</span>
          <h1 className="font-display font-bold text-[clamp(40px,5.5vw,76px)] leading-[0.98] tracking-tight">
            The office,<br />re-engineered<br />around <span className="italic text-[#B44A2E]">people.</span>
          </h1>
          <p className="mt-7 max-w-[440px] text-[16px] leading-[1.7] text-[#242321]/70">
            Case-study ergonomics for enterprise floorplates — posture science, measured
            outcomes, and furniture built for the eight-hour mark.
          </p>
          <div className="flex flex-wrap gap-3 mt-9">
            <Link href="/products" className="bg-[#242321] text-[#F4EFE6] px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold">Shop the line</Link>
            <a href="#case" className="border border-[#242321]/30 px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-semibold hover:bg-[#242321]/5 transition-colors">Read the case</a>
          </div>
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#242321]/15 max-w-md">
            {[['38%', 'less reported back pain'], ['4.9', 'average rating'], ['48h', 'dispatch']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl font-bold leading-none">{n}</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-[#242321]/55 mt-2 leading-tight">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative min-h-[52vh] lg:min-h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/images/products/height-table-01.jpg" alt="BESO FlexRise desk" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#242321]/40 to-transparent" />
        </div>
      </section>

      {/* Scrubbed proof section */}
      <section className="px-5 sm:px-6 md:px-10 lg:px-16 py-16 bg-[#DED5C7]">
        <Reveal>
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#B44A2E] font-bold">Motion study</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mt-3">Scroll to travel the floorplate</h2>
            </div>
            <span className="hidden md:block text-[11px] uppercase tracking-[0.2em] text-[#242321]/50">01 / video scrub</span>
          </div>
        </Reveal>
        <ScrubVideo
          src="/assets/videos/designs/02.mp4"
          poster="/assets/images/products/height-table-01.jpg"
          railVh={260}
          className="rounded-[1.5rem]"
        >
          <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-14 pointer-events-none">
            <div className="bg-[#E7DFD3]/85 backdrop-blur-md border border-[#242321]/10 rounded-2xl p-6 max-w-md">
              <div className="text-[11px] uppercase tracking-[0.2em] text-[#B44A2E] font-bold">Callout 01</div>
              <div className="font-display text-2xl mt-2">Dual-motor lift, 25 dB</div>
              <p className="text-sm text-[#242321]/70 mt-2">Transition between sit and stand without breaking focus — 4 memory presets.</p>
            </div>
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
