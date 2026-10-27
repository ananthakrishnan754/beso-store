'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import products from '@/data/products.json';

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

interface Hotspot {
  id: string;
  num: number;
  productId: number;
  x: number;
  y: number;
  label: string;
  cardAlign?: 'center' | 'left' | 'right';
  cardSide?: 'top' | 'bottom';
}

export function ShoppableRoomHotspots() {
  const { addToCart } = useCart();
  const all = products as any[];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const room = {
    id: 'beso-exec-suite',
    title: 'Horizon Executive Suite',
    subtitle: 'Director Cabin · Bespoke Workplace Setting',
    image: '/assets/images/beso-curated-executive-suite.jpg',
    hotspots: [
      {
        id: 'hs-chair',
        num: 1,
        productId: 2, // EZEEBEE Zig Zag High Executive Chair
        x: 44.5,
        y: 35,
        label: 'Zig Zag High Executive Chair',
        cardAlign: 'center',
        cardSide: 'bottom',
      },
      {
        id: 'hs-desk',
        num: 2,
        productId: 8, // BESO Horizon Executive Table
        x: 58,
        y: 54,
        label: 'Horizon Executive Table',
        cardAlign: 'center',
        cardSide: 'top',
      },
      {
        id: 'hs-visitor',
        num: 3,
        productId: 46, // EZEEBEE Zig Zag Visitor Chair
        x: 18,
        y: 64,
        label: 'Zig Zag Cantilever Chair',
        cardAlign: 'left',
        cardSide: 'top',
      },
      {
        id: 'hs-stool',
        num: 4,
        productId: 63, // BESO Upholstered Bar Stool
        x: 90.5,
        y: 62,
        label: 'BESO Accent Stool',
        cardAlign: 'right',
        cardSide: 'top',
      },
    ] as Hotspot[],
  };

  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeId = activeHotspotId || hoveredId;

  // Close card when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setActiveHotspotId(null);
        setHoveredId(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-20 border-t border-line/10 bg-app">
      {/* ─── 2-Column Split: Left Side (Legacy & PAN-India Logistics) + Right Side (Interactive Room) ─── */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: BESO Legacy, PAN-India Delivery & Craftsmanship */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
              Curated Spaces · Tagged Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-ink tracking-tight leading-tight">
              Horizon Executive Suite
            </h2>
            <p className="text-sm text-ink/60 mt-2 leading-relaxed">
              Explore architect-designed workspace settings. Hover or tap the numbered tags on any piece in the setting to reveal instant details, pricing, and 1-click cart addition.
            </p>
          </div>

          {/* Value Proposition Highlights */}
          <div className="space-y-4 pt-1">
            {/* Feature 1: BESO Legacy */}
            <div className="p-4 rounded-2xl bg-surfaceSubtle border border-line/10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-ink text-app flex items-center justify-center shrink-0 font-black text-xs">
                25+
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                  Legacy of BESO Furniture
                </h3>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Crafting contract-grade executive furniture for over two decades. Trusted by 10,000+ corporate offices, founder cabins, and enterprise headquarters across India.
                </p>
              </div>
            </div>

            {/* Feature 2: PAN-India Delivery */}
            <div className="p-4 rounded-2xl bg-surfaceSubtle border border-line/10 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-accent/20 text-ink flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
                  PAN-India White-Glove Delivery
                </h3>
                <p className="text-xs text-ink/60 mt-1 leading-relaxed">
                  Zero-transit damage guarantee to all 28 states. Includes doorstep delivery, professional unboxing, and on-site assembly by certified furniture technicians.
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2.5 rounded-xl bg-surface border border-line/8">
                <div className="text-xs font-extrabold text-ink">BIFMA X5.1</div>
                <div className="text-[10px] text-ink/45">Certified</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface border border-line/8">
                <div className="text-xs font-extrabold text-ink">5–7 Years</div>
                <div className="text-[10px] text-ink/45">Warranty</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surface border border-line/8">
                <div className="text-xs font-extrabold text-ink">48-Hr</div>
                <div className="text-[10px] text-ink/45">Dispatch</div>
              </div>
            </div>
          </div>

          {/* Showroom location tag */}
          <div className="pt-1 text-xs text-ink/50 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>Flagship Showroom: 42, 100 Feet Road, Indiranagar, Bengaluru</span>
          </div>
        </div>

        {/* Right Side: Interactive Room Visual with Animated Hotspot Cards */}
        <div className="lg:col-span-7" ref={containerRef}>
          <div className="relative rounded-[2rem] overflow-hidden border border-line/10 shadow-2xl bg-[#0e1114] aspect-[16/9] w-full group select-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={room.image}
              alt={room.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />

            {/* Subtle Ambient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />

            {/* Interactive Hotspot Pins with Animated Popovers */}
            {room.hotspots.map((hs) => {
              const product = all.find((p) => p.id === hs.productId);
              const isCurrent = activeId === hs.id;

              // Card alignment logic
              let alignCls = 'left-1/2 -translate-x-1/2';
              if (hs.cardAlign === 'left') alignCls = 'left-0 sm:-left-4';
              if (hs.cardAlign === 'right') alignCls = 'right-0 sm:-right-4';

              const sideCls = hs.cardSide === 'bottom' ? 'top-10 sm:top-12' : 'bottom-10 sm:bottom-12';

              return (
                <div
                  key={hs.id}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  onMouseEnter={() => setHoveredId(hs.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Pin Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveHotspotId(activeHotspotId === hs.id ? null : hs.id);
                    }}
                    className={`relative flex items-center justify-center transition-all duration-300 ${
                      isCurrent ? 'scale-125' : 'hover:scale-110'
                    }`}
                    aria-label={`View ${hs.label}`}
                  >
                    {/* Pulsing ring wave */}
                    <span
                      className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                        isCurrent
                          ? 'bg-accent opacity-95 animate-ping'
                          : 'bg-white opacity-40 group-hover:opacity-75'
                      }`}
                    />
                    {/* Pin number core */}
                    <span
                      className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shadow-xl border-2 transition-all duration-300 ${
                        isCurrent
                          ? 'bg-accent text-white border-app shadow-[0_0_20px_rgb(var(--accent-rgb)/0.4)]'
                          : 'bg-ink/90 text-white border-white/60 backdrop-blur-md'
                      }`}
                    >
                      {hs.num}
                    </span>
                  </button>

                  {/* Desktop Hover Label (shown when card is not open) */}
                  {!isCurrent && (
                    <span className="hidden sm:block absolute top-9 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold px-2.5 py-0.5 rounded-full border shadow-md bg-black/75 backdrop-blur-md text-white border-white/10 pointer-events-none transition-opacity">
                      {hs.label}
                    </span>
                  )}

                  {/* Animated Product Popover Card on Hover/Click */}
                  {isCurrent && product && (
                    <div
                      className={`absolute ${sideCls} ${alignCls} w-64 sm:w-72 bg-[#0c0e11]/95 backdrop-blur-2xl border border-white/20 rounded-2xl p-4 shadow-[0_25px_60px_rgba(0,0,0,0.8)] z-40 text-white transition-all duration-300 animate-in fade-in zoom-in-95`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Top Pill / Rating row */}
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[9px] font-extrabold text-accent uppercase tracking-wider bg-accent/15 px-2 py-0.5 rounded-full">
                          {product.subcategory.replace(/-/g, ' ')}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-1">
                          ★ {product.rating}
                        </span>
                      </div>

                      {/* Product Thumbnail & Details */}
                      <div className="flex gap-3 items-center">
                        <div className="w-16 h-16 rounded-xl bg-white/5 overflow-hidden shrink-0 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image?.startsWith('/') ? product.image : `/${product.image}`}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-xs text-white truncate hover:text-accent transition-colors">
                            <Link href={`/products/${product.slug}`}>{product.name}</Link>
                          </h4>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="font-black text-sm text-accent">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-white/40 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons: Add to Cart + View Product */}
                      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          className="py-2 px-3 rounded-xl bg-accent text-white text-[11px] font-extrabold tracking-wider hover:opacity-95 active:scale-95 transition-all text-center shadow-md shadow-accent/25"
                        >
                          + Add to Cart
                        </button>

                        <Link
                          href={`/products/${product.slug}`}
                          className="py-2 px-3 rounded-xl border border-white/20 text-white/90 hover:text-white hover:bg-white/10 text-[11px] font-bold transition-all text-center"
                        >
                          View Product →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
