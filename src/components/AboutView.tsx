'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

const STATS = [
  { val: '20+ Years', label: 'Craftsmanship & Ergonomic Legacy' },
  { val: '10,000+', label: 'Founder Cabins & Enterprise Workspaces' },
  { val: '28 States', label: 'Pan-India White-Glove Direct Setup' },
  { val: '4.9 ★', label: 'Rated by 1,400+ Verified Enterprise Clients' },
];

const PILLARS = [
  {
    icon: '◬',
    title: 'Anatomical Ergonomics',
    category: 'BIOMECHANICAL ALIGNMENT',
    desc: 'BIFMA X5.1 certified synchro-tilt mechanisms, active spring lumbar architecture, and pressure-mapped cold-cure foam engineered to eliminate lower back and cervical spine strain across 14-hour work sprints.',
  },
  {
    icon: '♧',
    title: 'Scandinavian Oak & Pure Hides',
    category: 'SUSTAINABLE MATERIALS',
    desc: 'We pair solid FSC-certified blonde oak timber and non-toxic low-VOC Italian lacquers with hand-selected top-grain Italian Nappa hides that develop a rich patina over decades of daily use.',
  },
  {
    icon: '△',
    title: '100,000-Cycle Durability Testing',
    category: 'FACTORY SPEC QUALITY',
    desc: 'Before any chair or desk leaves our 12,000 sq ft Bengaluru engineering hub, it undergoes rigorous multi-axis drop tests, caster roll-cycle stress, and hydraulic cylinder pressure checks.',
  },
  {
    icon: '♢',
    title: 'Pan-India White-Glove Logistics',
    category: 'ZERO-DAMAGE PROMISE',
    desc: 'Direct dispatches with zero-transit damage guarantee. Certified BESO technicians handle doorstep unboxing, millimeter-accurate desk levelling, and complete assembly in all 28 states.',
  },
];

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

const CERTIFICATIONS = [
  {
    badge: 'BIFMA X5.1',
    title: 'BIFMA International Certified',
    desc: 'Exceeds American National Standard for office furnishings safety, durability, and structural adequacy.',
  },
  {
    badge: 'ISO 9001:2015',
    title: 'Certified Quality Management',
    desc: 'Precision manufacturing protocols with traceable material certifications from timber to hydraulics.',
  },
  {
    badge: 'BS 5852',
    title: 'Fire Retardant Compliant',
    desc: 'Upholstery fabrics and moulded cold-cure foams tested for flame resistance and low toxicity.',
  },
  {
    badge: 'IGBC Green',
    title: 'Green Building Council Partner',
    desc: 'Low-VOC finishes, recyclable die-cast alloy chassis, and sustainably managed timber supply chains.',
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
    <div className="text-ink min-h-screen">
      {/* ─── Ambient Glows ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 12% 15%, rgb(var(--accent-rgb) / 0.12), transparent 45%), radial-gradient(circle at 88% 75%, rgb(var(--gold-rgb) / 0.10), transparent 50%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* ─── 1. Hero Section ─── */}
        <section className="space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/80 dark:border-white/20 bg-white/60 dark:bg-white/10 text-accent text-xs font-bold tracking-[0.2em] uppercase shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E99A15] shadow-[0_0_0_3px_#F8E5C5] dark:shadow-[0_0_0_3px_#4A3215]" />
            <span>Architectural Ergonomics · Bengaluru · Est. 2004</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-serif font-bold text-ink tracking-tight leading-[1.05]">
            Furniture That Calibrates<br />
            <span className="bg-gradient-to-r from-[#D98E38] via-[#C27526] to-[#A35B16] bg-clip-text text-transparent">
              Body, Mind &amp; Space
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-ink/75 font-normal leading-relaxed max-w-3xl">
            BESO began with a singular mission: to eliminate the physical toll of sedentary work through contract-grade ergonomic engineering and Scandinavian craftsmanship. For over two decades, we have designed seating and desking systems that fuse aerospace precision with the enduring warmth of natural oak.
          </p>

          {/* 4 Glassmorphic Stat Cards (matching beso-product-card.html glass style) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="p-4 sm:p-5 rounded-2xl border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/70 via-white/50 to-[#FFF7EC]/40 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl shadow-[0_18px_40px_rgba(79,49,20,0.08),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_18px_40px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-accent tracking-tight">
                  {s.val}
                </div>
                <div className="text-xs sm:text-xs text-ink/65 font-medium mt-1 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 2. Flagship Experience Centre & Video Walkthrough ─── */}
        <section className="rounded-[2.2rem] sm:rounded-[2.8rem] border border-white/85 dark:border-white/15 bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/40 dark:from-[#241A12]/85 dark:via-[#1B130E]/80 dark:to-[#140D08]/85 backdrop-blur-2xl p-6 sm:p-10 md:p-12 shadow-[0_28px_80px_rgba(79,49,20,0.13),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden">
          {/* Specular glass reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-[2.8rem]"
            style={{
              background:
                'radial-gradient(ellipse at 8% 8%, rgba(255,255,255,0.7), transparent 48%), radial-gradient(ellipse at 92% 92%, rgb(var(--accent-rgb) / 0.08), transparent 45%)',
            }}
          />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                Store &amp; Workshop Walkthrough
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ink tracking-tight">
                Inside the BESO Experience Centre &amp; Craft Studio
              </h2>
              <p className="text-xs sm:text-sm text-ink/70 mt-1 max-w-2xl leading-relaxed">
                Take a look inside our 100 Feet Road Indiranagar flagship showroom and 12,000 sq ft centralized engineering facility. Designed to allow founders and architects to test real-scale ergonomic environments.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto shrink-0 flex-wrap">
              <a
                href="https://maps.google.com/?q=42+100+Feet+Road+Indiranagar+Bangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3 rounded-full bg-[#2D1B10] text-[#FFFAF3] text-xs font-bold uppercase tracking-wider hover:translate-y-[-2px] shadow-lg transition-all"
              >
                Get Directions ↗
              </a>
              <a
                href="https://wa.me/918099952624?text=Hi%20BESO!%20I'd%20like%20to%20schedule%20a%20private%20visit%20to%20the%20Indiranagar%20experience%20centre."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 text-xs font-bold text-ink hover:bg-white/80 transition-all shadow-sm"
              >
                Book VIP Consult 💬
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
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Showroom Feed · 100 Feet Rd, Indiranagar</span>
            </div>

            {/* Video Controls Pill */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-stone-900 flex items-center justify-center text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-stone-900 flex items-center justify-center text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? '🔇' : '🔊'}
              </button>
            </div>
          </div>

          {/* Showroom Specs Row */}
          <div className="relative z-10 grid sm:grid-cols-3 gap-4 pt-4 border-t border-white/60 dark:border-white/10 text-xs text-ink/75">
            <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-sm">
              <span className="font-bold text-ink block text-sm mb-1">Showroom Testing Bay</span>
              <span>Test 40+ configured ergonomic chairs, dual-motor desks, and material swatches in person.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-sm">
              <span className="font-bold text-ink block text-sm mb-1">Ergonomic Specialists</span>
              <span>Personalized posture consults and workspace planning with certified consultants.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-sm">
              <span className="font-bold text-ink block text-sm mb-1">Pan-India Dispatches</span>
              <span>Direct dispatches supported by our 12,000 sq ft centralized warehousing hub.</span>
            </div>
          </div>
        </section>

        {/* ─── 3. The 4 Architectural Pillars (Inspired by beso-product-card.html) ─── */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              Engineered Without Compromise
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
              The Four Pillars of BESO Architecture
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p) => (
              <div
                key={p.title}
                className="p-6 rounded-[2rem] border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/75 via-white/55 to-[#FFF7EC]/40 dark:from-white/10 dark:via-white/5 dark:to-transparent backdrop-blur-xl shadow-[0_20px_50px_rgba(79,49,20,0.08),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between hover:translate-y-[-2px] transition-all"
              >
                <div>
                  <div className="w-11 h-11 rounded-full border border-white/90 dark:border-white/20 bg-white/70 dark:bg-white/15 text-accent flex items-center justify-center text-lg font-bold shadow-sm mb-4">
                    {p.icon}
                  </div>
                  <small className="block text-[9px] font-bold tracking-[0.2em] text-[#A19588] uppercase mb-1">
                    {p.category}
                  </small>
                  <h3 className="text-lg font-bold text-ink mb-2 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-xs text-ink/70 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 4. Interactive 20-Year Milestones Timeline ─── */}
        <section className="rounded-[2.5rem] border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/75 via-white/50 to-[#FFF7EC]/40 dark:from-[#241A12]/80 dark:via-[#1B130E]/75 dark:to-[#140D08]/80 backdrop-blur-xl p-6 sm:p-10 md:p-12 shadow-[0_28px_80px_rgba(79,49,20,0.10)] space-y-8">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              Two Decades in the Making
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink tracking-tight">
              The Evolution of BESO Furniture
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {MILESTONES.map((m, idx) => (
              <div
                key={m.year}
                className="p-5 rounded-2xl border border-white/70 dark:border-white/15 bg-white/50 dark:bg-white/5 backdrop-blur-md shadow-sm space-y-2 relative"
              >
                <div className="text-xl sm:text-2xl font-black text-accent">
                  {m.year}
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-ink leading-snug">
                  {m.title}
                </h4>
                <p className="text-[11px] text-ink/65 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 5. Certifications & Compliance ─── */}
        <section className="space-y-6">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
              Verified Rigour
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-ink tracking-tight">
              Certifications &amp; Commercial Compliance
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((c) => (
              <div
                key={c.badge}
                className="p-5 rounded-2xl border border-white/70 dark:border-white/15 bg-white/55 dark:bg-white/5 backdrop-blur-md shadow-sm space-y-2 hover:bg-white/70 transition-all"
              >
                <span className="px-2.5 py-1 rounded-full bg-accent/15 text-accent text-[10px] font-black uppercase tracking-wider border border-accent/20 inline-block">
                  {c.badge}
                </span>
                <h3 className="font-bold text-ink text-sm">{c.title}</h3>
                <p className="text-xs text-ink/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 6. Craftsman Manifesto Banner ─── */}
        <section className="rounded-[2.2rem] bg-gradient-to-r from-[#2A1C12] via-[#20150D] to-[#170E08] text-[#FAF5EC] p-8 sm:p-12 md:p-16 border border-white/15 shadow-2xl relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-[450px] h-[450px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 100% 0%, rgb(var(--accent-rgb) / 0.25), transparent 70%)',
            }}
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="text-5xl text-[#C27526] font-serif leading-none block select-none">
              “
            </span>
            <blockquote className="text-xl sm:text-2xl md:text-3xl font-serif font-normal italic leading-snug text-white/95">
              True luxury in the modern workplace isn’t gold leaf or ornament—it is physical freedom. The quiet sensation of sitting down for nine hours and finishing the day without an ounce of neck fatigue or lower-back stiffness.
            </blockquote>
            <div className="pt-2">
              <div className="font-extrabold text-sm tracking-wider uppercase text-white">
                The BESO Design Studio
              </div>
              <div className="text-xs text-white/60">
                Architectural Ergonomics &amp; Woodworking · Indiranagar, Bengaluru
              </div>
            </div>
          </div>
        </section>

        {/* ─── 7. CTA: Explore Shop or Consult ─── */}
        <section className="text-center py-6 sm:py-10 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-ink">
            Ready to Transform Your Workspace?
          </h2>
          <p className="text-sm text-ink/65 max-w-xl mx-auto">
            Browse our full flagship line of BIFMA certified executive chairs and height-adjustable desks or consult with our Bangalore studio.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
            <Link
              href="/products"
              className="px-8 py-3.5 rounded-full bg-[#2D1B10] text-[#FFFAF3] text-xs font-extrabold uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Explore Shop →
            </Link>
            <a
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I'd%20like%20to%20discuss%20furnishing%20my%20office%20workspace."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 text-xs font-bold text-ink hover:bg-white/80 transition-all shadow-sm"
            >
              Consult an Ergonomist 💬
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
