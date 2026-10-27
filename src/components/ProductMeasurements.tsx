'use client';

import React, { useState } from 'react';

interface ProductMeasurementsProps {
  productName: string;
  subcategory: string;
  specs?: Record<string, any>;
  productImage?: string;
}

export function ProductMeasurements({
  productName,
  subcategory,
  specs = {},
  productImage,
}: ProductMeasurementsProps) {
  const [unit, setUnit] = useState<'mm' | 'in'>('mm');

  const isTable = subcategory.includes('table');
  const isStanding = subcategory.includes('height') || productName.toLowerCase().includes('flexrise');

  // Derive authentic contract dimensions
  let heightMm = isTable ? 750 : 1240;
  let lengthMm = isTable ? (isStanding ? 1500 : 1800) : 680;
  let depthMm = isTable ? 750 : 660;

  // Extract from specs if present
  if (specs?.dimensions) {
    const parts = specs.dimensions.replace(/mm/gi, '').split(/x|\*/i).map((v: string) => parseInt(v.trim()));
    if (parts.length >= 3 && !isNaN(parts[0]) && !isNaN(parts[1]) && !isNaN(parts[2])) {
      lengthMm = parts[0];
      depthMm = parts[1];
      heightMm = parts[2];
    }
  }

  const toDisplay = (valMm: number) => {
    if (unit === 'in') {
      return `${(valMm / 25.4).toFixed(1)}″`;
    }
    return `${valMm} MM`;
  };

  const heightDisplay = isStanding
    ? `${toDisplay(700)} – ${toDisplay(1200)}`
    : toDisplay(heightMm);

  // Fallback image if not provided
  const displayImage = productImage
    ? (productImage.startsWith('/') ? productImage : `/${productImage}`)
    : isTable
    ? '/assets/images/products/executive-table-01.jpg'
    : '/assets/images/products/executive-chair-07.jpg';

  return (
    <section className="bg-surface border border-line/10 rounded-[2.5rem] p-8 sm:p-12 md:p-16">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Contract Description & Spec Matrix (Boss's Cabin Style) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-accent uppercase tracking-widest">
                Technical Blueprint · Ergonomics
              </span>

              {/* Unit Toggle */}
              <div className="inline-flex items-center p-1 bg-surfaceSubtle rounded-full border border-line/10">
                <button
                  type="button"
                  onClick={() => setUnit('mm')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    unit === 'mm' ? 'bg-ink text-app shadow-sm' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  MM
                </button>
                <button
                  type="button"
                  onClick={() => setUnit('in')}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                    unit === 'in' ? 'bg-ink text-app shadow-sm' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  IN
                </button>
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              A Closer Look
            </h2>
          </div>

          <p className="text-ink/65 text-sm sm:text-base leading-relaxed">
            {isTable ? (
              <>
                A modular executive workstation system in natural light oak finish with integrated plug-and-play wire management. Set up your executive workspace with precision engineering, solid timber worktops, and heavy-duty cold-rolled steel understructure.
              </>
            ) : (
              <>
                An executive ergonomic task seating system with calibrated synchro-tilt, active lumbar compression, and pneumatic gas-lift stroke. Engineered to support natural spinal alignment throughout continuous 12+ hour executive sessions.
              </>
            )}
          </p>

          {/* Dimension Cards Matrix */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-surfaceSubtle border border-line/8 space-y-1">
              <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest block">
                Height
              </span>
              <div className="text-base sm:text-lg font-black text-ink">
                {heightDisplay}
              </div>
              <span className="text-[10px] text-ink/45">Ground to apex</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surfaceSubtle border border-line/8 space-y-1">
              <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest block">
                Length
              </span>
              <div className="text-base sm:text-lg font-black text-ink">
                {toDisplay(lengthMm)}
              </div>
              <span className="text-[10px] text-ink/45">Front span</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-surfaceSubtle border border-line/8 space-y-1">
              <span className="text-[10px] font-bold text-ink/40 uppercase tracking-widest block">
                Depth
              </span>
              <div className="text-base sm:text-lg font-black text-ink">
                {toDisplay(depthMm)}
              </div>
              <span className="text-[10px] text-ink/45">Front to back</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3 text-xs text-ink/60">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>ANSI/BIFMA X5.1 Standard · Tolerance: ±2 mm</span>
          </div>
        </div>

        {/* Right Column: Isometric Product View with CAD Extension Lines (Exact Boss's Cabin Look) */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="relative w-full max-w-[620px] aspect-[4/3] rounded-3xl bg-white dark:bg-[#121519] border border-line/10 p-6 sm:p-10 flex items-center justify-center shadow-lg select-none overflow-hidden">
            {/* Subtle background drafting grid */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Product Center Render */}
            <div className="relative z-10 w-[68%] h-[68%] flex items-center justify-center">
              {/* Floor shadow */}
              <div className="absolute inset-x-8 -bottom-4 h-10 bg-black/15 rounded-full blur-xl pointer-events-none" />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={displayImage}
                alt={`${productName} Measurements`}
                className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)]"
              />
            </div>

            {/* ─── Vector Architectural Dimension Lines (Exact Boss's Cabin Overlay) ─── */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none text-ink/80 dark:text-white/80 font-mono"
              viewBox="0 0 600 450"
              fill="none"
              stroke="currentColor"
            >
              {/* Height Dimension (Left vertical axis) */}
              <g strokeWidth="1.2">
                {/* Vertical line */}
                <line x1="90" y1="95" x2="90" y2="350" strokeDasharray="3 3" />
                {/* Top & bottom end ticks */}
                <line x1="80" y1="95" x2="100" y2="95" strokeWidth="1.5" />
                <line x1="80" y1="350" x2="100" y2="350" strokeWidth="1.5" />
                {/* Arrow heads */}
                <path d="M87 105 L90 95 L93 105" fill="none" strokeWidth="1.5" />
                <path d="M87 340 L90 350 L93 340" fill="none" strokeWidth="1.5" />
                {/* Dimension Text */}
                <text
                  x="72"
                  y="225"
                  fill="currentColor"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  transform="rotate(-90 72 225)"
                  letterSpacing="0.05em"
                >
                  {heightDisplay}
                </text>
              </g>

              {/* Length / Width Dimension (Bottom frontal axis) */}
              <g strokeWidth="1.2">
                {/* Horizontal frontal line */}
                <line x1="160" y1="390" x2="420" y2="390" strokeDasharray="3 3" />
                {/* Left & right end ticks */}
                <line x1="160" y1="380" x2="160" y2="400" strokeWidth="1.5" />
                <line x1="420" y1="380" x2="420" y2="400" strokeWidth="1.5" />
                {/* Arrow heads */}
                <path d="M170 387 L160 390 L170 393" fill="none" strokeWidth="1.5" />
                <path d="M410 387 L420 390 L410 393" fill="none" strokeWidth="1.5" />
                {/* Dimension Text */}
                <text
                  x="290"
                  y="415"
                  fill="currentColor"
                  fontSize="13"
                  fontWeight="bold"
                  textAnchor="middle"
                  letterSpacing="0.05em"
                >
                  {toDisplay(lengthMm)}
                </text>
              </g>

              {/* Depth Dimension (Receding angled axis on right) */}
              <g strokeWidth="1.2">
                {/* Angled depth line */}
                <line x1="435" y1="380" x2="520" y2="325" strokeDasharray="3 3" />
                {/* End ticks */}
                <line x1="430" y1="375" x2="440" y2="385" strokeWidth="1.5" />
                <line x1="515" y1="320" x2="525" y2="330" strokeWidth="1.5" />
                {/* Arrow heads */}
                <path d="M445 378 L435 380 L441 371" fill="none" strokeWidth="1.5" />
                <path d="M510 334 L520 325 L514 337" fill="none" strokeWidth="1.5" />
                {/* Dimension Text */}
                <text
                  x="495"
                  y="368"
                  fill="currentColor"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="start"
                  letterSpacing="0.05em"
                >
                  {toDisplay(depthMm)}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
