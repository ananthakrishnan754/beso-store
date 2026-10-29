'use client';

import React, { useState } from 'react';

/**
 * Floating Concierge Dock
 * Provides seamless, contract-grade floating access to:
 * 1. Live WhatsApp Studio Concierge (Direct consultation with BESO ergonomists)
 * 2. Flagship Showroom Google Maps Directions (42, 100 Feet Road, Indiranagar, Bengaluru)
 *
 * Engineered with Scandinavian glassmorphism, adaptive dark/light tokens, and subtle micro-interactions.
 */
export function FloatingConcierge() {
  const [activeTooltip, setActiveTooltip] = useState<'whatsapp' | 'map' | null>(null);

  const WHATSAPP_URL =
    'https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20to%20consult%20with%20your%20design%20team%20about%20furniture.';
  const MAP_URL = 'https://maps.google.com/?q=42+100+Feet+Road+Indiranagar+Bangalore';

  return (
    <aside
      aria-label="Concierge and Showroom Access"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5 select-none pointer-events-auto"
    >
      {/* ─── Showroom Map Pill ─── */}
      <div className="relative flex items-center group">
        {/* Tooltip on Hover (Desktop) */}
        <div
          role="tooltip"
          className="hidden md:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#18110B]/90 dark:bg-[#18110B]/95 text-[#FAF6F0] text-[11px] font-medium tracking-wide shadow-xl border border-white/15 backdrop-blur-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D98E38]" />
          <span>Flagship Showroom · 100 Feet Rd, Indiranagar</span>
        </div>

        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setActiveTooltip('map')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-full bg-white/80 dark:bg-[#1C130C]/85 text-ink hover:text-accent border border-white/90 dark:border-white/15 backdrop-blur-xl shadow-[0_12px_28px_rgba(0,0,0,0.12)] dark:shadow-[0_14px_32px_rgba(0,0,0,0.55)] hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200 active:scale-95 group/btn"
          aria-label="Get Directions to BESO Flagship Showroom in Indiranagar Bengaluru"
        >
          {/* Compass / Location Pin SVG */}
          <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-accent shrink-0 group-hover/btn:scale-110 transition-transform">
            <svg
              className="w-3.5 h-3.5 fill-none stroke-current"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase text-ink/80 group-hover/btn:text-ink pr-1">
            Showroom
          </span>
        </a>
      </div>

      {/* ─── WhatsApp Studio Concierge Pill ─── */}
      <div className="relative flex items-center group">
        {/* Tooltip on Hover (Desktop) */}
        <div
          role="tooltip"
          className="hidden md:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#18110B]/90 dark:bg-[#18110B]/95 text-[#FAF6F0] text-[11px] font-medium tracking-wide shadow-xl border border-white/15 backdrop-blur-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none whitespace-nowrap"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span>Studio Concierge · Typical reply in 5 mins</span>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setActiveTooltip('whatsapp')}
          onMouseLeave={() => setActiveTooltip(null)}
          className="relative flex items-center gap-2.5 h-11 sm:h-12 px-3.5 sm:px-4 rounded-full bg-[#1C130C] dark:bg-[#FAF6F0] text-[#FAF6F0] dark:text-[#1C130C] border border-white/15 dark:border-white/20 backdrop-blur-xl shadow-[0_16px_36px_rgba(0,0,0,0.25)] dark:shadow-[0_16px_36px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 hover:shadow-2xl transition-all duration-200 active:scale-95 group/btn"
          aria-label="Chat with BESO Design Concierge on WhatsApp"
        >
          {/* WhatsApp SVG Icon with Live Studio Pulse */}
          <div className="relative w-6 h-6 rounded-full bg-emerald-500/15 dark:bg-emerald-600/20 text-emerald-500 dark:text-emerald-700 flex items-center justify-center shrink-0 group-hover/btn:scale-110 transition-transform">
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#1C130C] dark:border-[#FAF6F0]" />
          </div>

          <span className="hidden sm:inline-block text-xs font-semibold tracking-wider uppercase pr-1">
            WhatsApp
          </span>
        </a>
      </div>
    </aside>
  );
}
