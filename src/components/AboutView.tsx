'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

const MILESTONES = [
  {
    year: '2004',
    title: 'Bespoke Joinery Studio Founded',
    desc: 'Started as a boutique architectural woodworking studio in Bengaluru, handcrafting custom teak and oak boardroom tables for premier law firms and architect chambers.',
  },
  {
    year: '2011',
    title: 'Ergonomic Engineering & BIFMA Standards',
    desc: 'Established our in-house testing facility and partnered with leading orthopedic ergonomics consultants to engineer calibrated mesh and synchronous recline mechanisms.',
  },
  {
    year: '2018',
    title: 'The FlexRise Smart Desking Innovation',
    desc: 'Launched India’s premier dual-motor standing desk system with anti-collision gyros and whisper-quiet (<45 dB) lifting columns for high-growth tech founders.',
  },
  {
    year: '2023',
    title: '100 Feet Road Indiranagar Flagship Centre',
    desc: 'Inaugurated our premier 2-floor experience centre in Bengaluru, allowing architects and founders to test 40+ configured chairs and live sit-stand workstations.',
  },
  {
    year: 'Today',
    title: 'Trusted by 10,000+ Visionary Workplaces',
    desc: 'Partnered with prominent Indian enterprises, startups (Ather, Zerodha, etc.), and private founder suites delivering contract-grade ergonomic performance nationwide.',
  },
];

export function AboutView() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="text-ink min-h-screen font-['Inter',sans-serif]">
      {/* ─── Architectural Orange Ambient Glows ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 12% 15%, rgba(255, 85, 0, 0.16), transparent 45%), radial-gradient(circle at 88% 75%, rgba(255, 107, 0, 0.12), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* ─── 1. Hero Section (Quiet Editorial Entry in Poppins & Inter) ─── */}
        <section className="space-y-4 max-w-4xl">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_10px_#FF5500] animate-pulse" />
            <span className="text-xs font-['Poppins',sans-serif] font-bold text-[#FF5500] tracking-[0.25em] uppercase">
              Philosophy &amp; Atelier
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-['Poppins',sans-serif] font-extrabold text-ink tracking-tight leading-[1.08]">
            Furniture That Calibrates<br />
            <span className="bg-gradient-to-r from-[#FF7A1A] via-[#FF5500] to-[#E04400] bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(255,85,0,0.3)]">
              Body, Mind &amp; Space
            </span>
          </h1>
        </section>

        {/* ─── 2. Flagship Experience Centre & Video Walkthrough ─── */}
        <section className="rounded-[2.2rem] sm:rounded-[2.8rem] border border-white/85 dark:border-white/15 bg-gradient-to-br from-white/85 via-white/65 to-[#FFF7EC]/50 dark:from-[#1F150D]/90 dark:via-[#170E08]/85 dark:to-[#0F0A06]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_28px_80px_rgba(79,49,20,0.13),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(255,255,255,0.12)] space-y-8 relative overflow-hidden">
          {/* Specular glass reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2.8rem]"
            style={{
              background:
                'radial-gradient(ellipse at 8% 8%, rgba(255,255,255,0.7), transparent 48%), radial-gradient(ellipse at 92% 92%, rgba(255, 85, 0, 0.12), transparent 45%)',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-['Poppins',sans-serif] font-bold text-[#FF5500] uppercase tracking-widest block mb-1">
                Store &amp; Workshop Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold text-ink tracking-tight">
                Inside the BESO Experience Centre &amp; Craft Studio
              </h2>
              <p className="text-xs sm:text-sm font-['Inter',sans-serif] text-ink/75 mt-1.5 max-w-2xl leading-relaxed">
                Take a look inside our 100 Feet Road Indiranagar flagship showroom and 12,000 sq ft centralized engineering facility. Designed to allow founders and architects to test real-scale ergonomic environments.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0 flex-wrap">
              <a
                href="https://maps.google.com/?q=42+100+Feet+Road+Indiranagar+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#FF5500] hover:bg-[#E04400] text-white text-xs font-['Poppins',sans-serif] font-bold uppercase tracking-wider hover:translate-y-[-2px] shadow-[0_10px_25px_rgba(255,85,0,0.35)] transition-all active:scale-95"
              >
                Get Directions ↗
              </a>
              <a
                href="https://wa.me/918099952624?text=Hi%20BESO!%20I'd%20like%20to%20schedule%20a%20private%20visit%20to%20the%20Indiranagar%20experience%20centre."
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 text-xs font-['Poppins',sans-serif] font-semibold text-ink hover:text-[#FF5500] hover:border-[#FF5500]/40 transition-all shadow-sm active:scale-95"
              >
                Book VIP Consult
              </a>
            </div>
          </div>

          {/* High-Definition Real Showroom Video Loop with Controls */}
          <div className="relative z-10 aspect-video w-full rounded-[1.8rem] sm:rounded-[2.2rem] overflow-hidden shadow-2xl border border-white/80 dark:border-white/20 bg-black group">
            <video
              ref={videoRef}
              src="/assets/videos/showroom-tour-1.mp4"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            />

            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Video Overlay Top Badge */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 text-white/95 text-[11px] font-['Inter',sans-serif] font-medium tracking-wide shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse shadow-[0_0_10px_#FF5500]" />
              <span>Live Showroom Feed · 100 Feet Rd, Indiranagar</span>
            </div>

            {/* Video Controls Pill */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-black/55 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center hover:bg-black/75 hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? (
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="w-9 h-9 rounded-full bg-black/55 backdrop-blur-xl border border-white/25 text-white flex items-center justify-center hover:bg-black/75 hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Showroom Specs Row */}
          <div className="relative z-10 grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/60 dark:border-white/10 text-xs text-ink/75">
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#1A120B]/70 border border-white/80 dark:border-white/15 backdrop-blur-xl shadow-sm transition-all hover:bg-white/80 dark:hover:bg-[#20150D]/80 hover:border-[#FF5500]/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Poppins',sans-serif] font-bold text-ink text-sm">Showroom Testing Bay</span>
                <span className="font-['Poppins',sans-serif] text-[11px] text-[#FF5500] font-bold tracking-wider">01</span>
              </div>
              <span className="font-['Inter',sans-serif] text-ink/70 leading-relaxed">Test 40+ configured ergonomic chairs, dual-motor desks, and material swatches in person.</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#1A120B]/70 border border-white/80 dark:border-white/15 backdrop-blur-xl shadow-sm transition-all hover:bg-white/80 dark:hover:bg-[#20150D]/80 hover:border-[#FF5500]/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Poppins',sans-serif] font-bold text-ink text-sm">Ergonomic Specialists</span>
                <span className="font-['Poppins',sans-serif] text-[11px] text-[#FF5500] font-bold tracking-wider">02</span>
              </div>
              <span className="font-['Inter',sans-serif] text-ink/70 leading-relaxed">Personalized posture consults and workspace planning with certified consultants.</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#1A120B]/70 border border-white/80 dark:border-white/15 backdrop-blur-xl shadow-sm transition-all hover:bg-white/80 dark:hover:bg-[#20150D]/80 hover:border-[#FF5500]/30">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Poppins',sans-serif] font-bold text-ink text-sm">Pan-India Dispatches</span>
                <span className="font-['Poppins',sans-serif] text-[11px] text-[#FF5500] font-bold tracking-wider">03</span>
              </div>
              <span className="font-['Inter',sans-serif] text-ink/70 leading-relaxed">Direct dispatches supported by our 12,000 sq ft centralized warehousing hub.</span>
            </div>
          </div>
        </section>

        {/* ─── 3. Interactive 20-Year Milestones Timeline ─── */}
        <section className="rounded-[2.5rem] border border-white/85 dark:border-white/15 bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/50 dark:from-[#1F150D]/90 dark:via-[#170E08]/85 dark:to-[#0F0A06]/90 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_28px_80px_rgba(79,49,20,0.12),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.6),_inset_0_1px_0_rgba(255,255,255,0.12)] space-y-8 relative overflow-hidden">
          <div
            className="absolute -top-24 -left-24 w-72 h-72 pointer-events-none rounded-full blur-3xl opacity-20"
            style={{ background: 'radial-gradient(circle, #FF5500, transparent 70%)' }}
          />

          <div className="relative z-10">
            <span className="text-xs font-['Poppins',sans-serif] font-bold text-[#FF5500] uppercase tracking-widest block mb-1">
              Two Decades in the Making
            </span>
            <h2 className="text-2xl sm:text-4xl font-['Poppins',sans-serif] font-bold text-ink tracking-tight">
              The Evolution of BESO Furniture
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative z-10">
            {MILESTONES.map((m) => (
              <div
                key={m.year}
                className="p-5 rounded-2xl border border-white/80 dark:border-white/15 bg-white/70 dark:bg-[#1A120B]/75 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.06),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)] space-y-2.5 relative transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5500]/50 hover:shadow-[0_16px_36px_rgba(255,85,0,0.15)] group"
              >
                <div className="text-2xl sm:text-3xl font-['Poppins',sans-serif] font-extrabold text-[#FF5500] tracking-tight group-hover:scale-105 transition-transform">
                  {m.year}
                </div>
                <h4 className="font-['Poppins',sans-serif] font-bold text-xs sm:text-sm text-ink leading-snug">
                  {m.title}
                </h4>
                <p className="font-['Inter',sans-serif] text-[11px] text-ink/70 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Craftsman Manifesto Banner ─── */}
        <section className="rounded-[2.2rem] bg-gradient-to-r from-[#20150D] via-[#170E08] to-[#0E0805] text-[#FAF5EC] p-8 sm:p-12 md:p-16 border border-white/15 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 100% 0%, rgba(255, 85, 0, 0.22), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-6xl text-[#FF5500] font-['Poppins',sans-serif] font-black leading-none block select-none">
              “
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-['Poppins',sans-serif] font-medium leading-snug text-white/95">
              True luxury in the modern workplace isn’t gold leaf or ornament—it is physical freedom. The quiet sensation of sitting down for nine hours and finishing the day without an ounce of neck fatigue or lower-back stiffness.
            </blockquote>
            <div className="pt-2">
              <div className="font-['Poppins',sans-serif] font-extrabold text-sm tracking-wider uppercase text-white">
                The BESO Design Studio
              </div>
              <div className="font-['Inter',sans-serif] text-xs text-white/60 mt-0.5">
                Architectural Ergonomics &amp; Woodworking · Indiranagar, Bengaluru
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. CTA: Explore Shop or Consult ─── */}
        <section className="text-center py-6 sm:py-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-['Poppins',sans-serif] font-bold text-ink tracking-tight">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-sm font-['Inter',sans-serif] text-ink/70 max-w-xl mx-auto leading-relaxed">
            Browse our full flagship line of BIFMA certified executive chairs and height-adjustable desks or consult with our Bangalore studio.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-[#FF5500] hover:bg-[#E04400] text-white text-xs font-['Poppins',sans-serif] font-bold uppercase tracking-widest shadow-[0_12px_28px_rgba(255,85,0,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              Explore Shop →
            </Link>
            <a
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I'd%20like%20to%20discuss%20furnishing%20my%20office%20workspace."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 text-xs font-['Poppins',sans-serif] font-semibold text-ink hover:text-[#FF5500] hover:border-[#FF5500]/40 active:scale-95 transition-all shadow-sm"
            >
              Consult an Ergonomist ↗
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
