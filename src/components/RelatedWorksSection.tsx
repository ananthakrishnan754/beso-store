'use client';

import React from 'react';
import Link from 'next/link';

export function RelatedWorksSection() {
  const projects = [
    {
      id: 'proj-1',
      title: 'Zerodha Technology Hub',
      sector: 'Fintech Headquarters',
      city: 'Bengaluru',
      scope: '180 Workstations & Ergonomic Seating',
      year: '2024',
      image: '/assets/images/portfolio-zerodha.png',
      fallbackImage: '/assets/images/editorial-workspace.jpg',
      productsUsed: [
        { name: 'EZEEBEE Zig Zag Executive Chair', slug: 'ezeebee-zig-zag-executive-chair' },
        { name: 'BESO Horizon Manager Table', slug: 'beso-horizon-manager-table' },
      ],
      description: 'Complete fit-out of 4 engineering floors with high-back active sync chairs and heavy-duty cable-managed executive desks.',
    },
    {
      id: 'proj-2',
      title: 'Ather Studio Workspace',
      sector: 'EV Design Studio',
      city: 'Whitefield, Bengaluru',
      scope: '65 Height-Adjustable Desking Clusters',
      year: '2023',
      image: '/assets/images/portfolio-ather.png',
      fallbackImage: '/assets/images/beso-curated-executive-suite.jpg',
      productsUsed: [
        { name: 'BESO FlexRise Smart Desk', slug: 'beso-flexrise-height-adjustable-table' },
        { name: 'EZEEBEE Mesh Manager Chair', slug: 'ezeebee-mesh-manager-chair' },
      ],
      description: 'Collaborative sit-stand clusters with custom walnut timber desktops and silent dual motors for industrial design engineers.',
    },
    {
      id: 'proj-3',
      title: 'Khosla Ventures Innovation Suite',
      sector: 'Executive Venture Offices',
      city: 'Mumbai',
      scope: 'C-Suite Furniture & Boardroom Desking',
      year: '2023',
      image: '/assets/images/portfolio-khosla.png',
      fallbackImage: '/assets/images/editorial-workspace.jpg',
      productsUsed: [
        { name: 'BESO Prestige Executive Chair', slug: 'beso-prestige-executive-chair' },
        { name: 'BESO Crown Executive Chair', slug: 'beso-crown-executive-chair' },
      ],
      description: 'Full-grain Italian leather seating and solid teak conference desking designed for boardroom endurance and aesthetic gravity.',
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/10 bg-app">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
            Commercial Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
            Related Works &amp; Fit-Outs
          </h2>
          <p className="text-sm text-ink/50 mt-1 max-w-xl">
            From hyper-growth tech campuses in Bengaluru to C-suite executive suites in Mumbai, see where BESO engineering is deployed.
          </p>
        </div>

        <a
          href="https://wa.me/918099952624?text=Hi%20BESO!%20I%20want%20to%20discuss%20a%20commercial%20workspace%20fit-out."
          target="_blank"
          rel="noopener noreferrer"
          className="self-start md:self-auto px-6 py-3 rounded-full border border-line/15 text-xs font-bold uppercase tracking-wider text-ink hover:bg-surfaceSubtle transition-all"
        >
          Request Procurement Catalog ↗
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="group rounded-3xl bg-surface border border-line/10 overflow-hidden hover:border-line/20 hover:shadow-card-hover transition-all flex flex-col"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/10] bg-[#0d1115] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={proj.image}
                onError={(e) => {
                  // Fallback if image not generated yet
                  (e.currentTarget as HTMLImageElement).src = proj.fallbackImage;
                }}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold">
                {proj.sector}
              </div>
              <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-mono">
                {proj.city} · {proj.year}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-lg text-ink group-hover:text-accent transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs font-bold text-accent mt-1">
                  Scope: {proj.scope}
                </p>
                <p className="text-xs text-ink/60 mt-2 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              {/* Products Deployed */}
              <div className="pt-3 border-t border-line/8 space-y-2">
                <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest block">
                  Furniture Specified:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {proj.productsUsed.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="px-2.5 py-1 rounded-full bg-surfaceSubtle text-[11px] font-medium text-ink/80 hover:text-ink hover:bg-ink/5 transition-colors"
                    >
                      {p.name} →
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
