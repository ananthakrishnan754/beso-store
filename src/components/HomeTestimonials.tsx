'use client';

import React from 'react';

export function HomeTestimonials() {
  const testimonials = [
    {
      id: 't-1',
      name: 'Ar. Vikram Sengupta',
      role: 'Principal Architect',
      company: 'Studio Morphogenesis, Mumbai',
      quote:
        'BESO desking and ergonomic seating strike a rare balance between structural minimalism and enduring comfort. Their precision in fabrication has made them our go-to partner for commercial fit-outs across India.',
      rating: 5,
      avatar: 'VS',
    },
    {
      id: 't-2',
      name: 'Meera Natarajan',
      role: 'Head of People & Workspaces',
      company: 'CogniSphere Labs, Bengaluru',
      quote:
        'Outfitting three floors with BESO FlexRise desks transformed our engineering floor dynamics. The silent dual motors and solid finish have held up flawlessly across 2 years of rigorous daily use.',
      rating: 5,
      avatar: 'MN',
    },
    {
      id: 't-3',
      name: 'Rajeshwari Varma',
      role: 'Facilities Director',
      company: 'Apex Capital, Hyderabad',
      quote:
        'The pan-India delivery was punctual and the white-glove assembly team took all the hassle away. Every executive chair feels calibrated to the individual executive.',
      rating: 5,
      avatar: 'RV',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/10 bg-surfaceSubtle">
      <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
        <span className="text-xs font-bold text-accent uppercase tracking-widest inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Client Testimonials
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
          Trusted by Architects &amp; Enterprises
        </h2>
        <p className="text-sm text-ink/50 max-w-lg mx-auto">
          Over 10,000 workstations configured and tested across corporate headquarters, studios, and executive homes.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="relative p-8 rounded-3xl border border-white/80 dark:border-white/15 bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/40 dark:from-[#1D140D]/90 dark:via-[#160E08]/85 dark:to-[#0E0905]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(79,49,20,0.08),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.55),_inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-accent/50 dark:hover:border-accent/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 group overflow-hidden"
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 pointer-events-none rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: 'radial-gradient(circle, rgb(var(--accent-rgb)), transparent 70%)' }}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {'★'.repeat(t.rating)}
              </div>
              <blockquote className="text-sm text-ink/80 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="relative z-10 pt-4 border-t border-white/60 dark:border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/80 dark:bg-white/10 text-accent font-bold text-xs flex items-center justify-center shrink-0 border border-white/90 dark:border-white/20 shadow-sm">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-ink">{t.name}</h4>
                <p className="text-[11px] text-ink/50">{t.role}</p>
                <p className="text-[10px] font-semibold text-accent mt-0.5">{t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
