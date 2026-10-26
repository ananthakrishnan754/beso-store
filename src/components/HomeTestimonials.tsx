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
        <span className="text-xs font-bold text-brandLime uppercase tracking-widest inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-brandLime animate-pulse" />
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
            className="p-8 rounded-3xl bg-surface border border-line/10 shadow-sm hover:border-brandLime/40 hover:shadow-card-hover transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500 text-sm">
                {'★'.repeat(t.rating)}
              </div>
              <blockquote className="text-sm text-ink/75 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-line/8 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-ink/5 text-ink font-bold text-xs flex items-center justify-center shrink-0 border border-line/10">
                {t.avatar}
              </div>
              <div>
                <h4 className="font-bold text-sm text-ink">{t.name}</h4>
                <p className="text-[11px] text-ink/50">{t.role}</p>
                <p className="text-[10px] font-semibold text-brandLime mt-0.5">{t.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
