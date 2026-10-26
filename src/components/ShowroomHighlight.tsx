'use client';

import React, { useState, useEffect, useRef } from 'react';

export function ShowroomHighlight() {
  // Dual-video crossfade state
  const [activeClip, setActiveClip] = useState<'A' | 'B'>('A');
  const videoRefA = useRef<HTMLVideoElement | null>(null);
  const videoRefB = useRef<HTMLVideoElement | null>(null);

  // Crossfade interval: 8 seconds per clip
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClip((prev) => {
        const next = prev === 'A' ? 'B' : 'A';
        if (next === 'A' && videoRefA.current) {
          videoRefA.current.currentTime = 0;
          videoRefA.current.play().catch(() => {});
        } else if (next === 'B' && videoRefB.current) {
          videoRefB.current.currentTime = 0;
          videoRefB.current.play().catch(() => {});
        }
        return next;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/10 bg-app">
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-surface to-surfaceSubtle border border-line/15 overflow-hidden p-8 sm:p-12 md:p-16 grid lg:grid-cols-12 gap-10 items-center shadow-xl">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brandLime/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Content Column */}
        <div className="lg:col-span-7 space-y-6 z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight leading-tight">
            Touch, Test &amp; Feel the <span className="text-gradient">Ergonomics</span>
          </h2>

          <p className="text-sm sm:text-base text-ink/65 leading-relaxed max-w-xl">
            Experience our full line of BIFMA-certified executive chairs and dual-motor sit-stand desks in person. Our ergonomics specialists are available for posture assessments and personalized setups.
          </p>

          <div className="space-y-4 pt-2">
            {/* Bengaluru Flagship */}
            <div className="p-4 rounded-2xl bg-surface border border-line/10 flex items-start gap-4">
              <span className="text-2xl mt-0.5">📍</span>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-extrabold text-sm text-ink">Bengaluru Flagship Showroom</h4>
                  <span className="px-2 py-0.5 rounded-full bg-brandLime/20 text-ink text-[10px] font-bold">
                    Primary Showroom
                  </span>
                </div>
                <p className="text-xs text-ink/70">
                  42, 100 Feet Road, Indiranagar, Bengaluru, Karnataka – 560038
                </p>
                <p className="text-[11px] text-ink/50">
                  Mon – Sat: 10:00 AM – 8:00 PM IST (Sundays by appointment)
                </p>
              </div>
            </div>

            {/* Hyderabad Logistics & Warehouse */}
            <div className="p-4 rounded-2xl bg-surface border border-line/10 flex items-start gap-4">
              <span className="text-2xl mt-0.5">🏢</span>
              <div className="space-y-1">
                <h4 className="font-extrabold text-sm text-ink">Hyderabad Experience &amp; 12,000 Sq Ft Warehouse</h4>
                <p className="text-xs text-ink/70">
                  5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad, Telangana – 500001
                </p>
                <p className="text-[11px] text-ink/50">
                  Mon – Sat: 10:00 AM – 7:30 PM IST · Bulk B2B Dispatches
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://maps.google.com/?q=42+100+Feet+Road+Indiranagar+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-ink text-app text-xs uppercase tracking-wider font-extrabold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <span>Get Directions on Google Maps</span>
              <span>↗</span>
            </a>
            <a
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I%20would%20like%20to%20book%20an%20in-person%20showroom%20visit."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-line/15 text-xs font-bold text-ink hover:bg-surfaceSubtle transition-all"
            >
              Schedule Concierge Visit
            </a>
          </div>
        </div>

        {/* Right side: Dual-Video Loop Player with Smooth Crossfade */}
        <div className="lg:col-span-5 relative z-10 flex justify-center">
          <div className="w-full max-w-md rounded-3xl overflow-hidden border border-line/15 shadow-2xl relative bg-[#0b0e12] aspect-[4/5]">
            {/* Video Clip A */}
            <video
              ref={videoRefA}
              src="/assets/videos/showroom-tour-1.mp4"
              poster="/assets/images/editorial-workspace.jpg"
              autoPlay
              muted
              playsInline
              loop
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activeClip === 'A' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />

            {/* Video Clip B */}
            <video
              ref={videoRefB}
              src="/assets/videos/showroom-tour-2.mp4"
              poster="/assets/images/beso-curated-executive-suite.jpg"
              autoPlay
              muted
              playsInline
              loop
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                activeClip === 'B' ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            />

            {/* Subtle bottom vignette & badge */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none z-20" />


            <div className="absolute bottom-6 left-6 right-6 z-20 text-white space-y-1">
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeClip === 'A' ? 'w-6 bg-brandLime' : 'w-2 bg-white/40'
                  }`}
                />
                <span
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeClip === 'B' ? 'w-6 bg-brandLime' : 'w-2 bg-white/40'
                  }`}
                />
              </div>
              <h4 className="text-base font-extrabold">Walk Through Our Experience Center</h4>
              <p className="text-xs text-white/70">
                Over 40+ configured ergonomic chairs, director tables, and dual-motor smart desks available to test.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
