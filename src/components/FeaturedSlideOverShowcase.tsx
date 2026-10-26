'use client';

import React, { useState, useEffect, useRef } from 'react';
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

export function FeaturedSlideOverShowcase() {
  const { addToCart, isInWishlist, toggleWishlist, isInCompare, toggleCompare } = useCart();
  const all = products as any[];
  const sectionRef = useRef<HTMLElement | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  const slides = [
    {
      id: 7,
      index: 0,
      name: 'BESO Crown Executive Chair',
      tagline: '3D Ergonomic Mesh · Active Lumbar Architecture',
      price: 24990,
      originalPrice: 29990,
      image: '/assets/images/flagship-crown.png',
      fallbackImage: '/assets/images/products/executive-chair-07.jpg',
      badge: 'Flagship Ergonomic',
      rating: 4.9,
      reviews: 32,
      slug: 'beso-crown-executive-chair',
      desc: 'Engineered with aerospace-grade synchro-tilt, calibrated lumbar compression, and breathable elastomeric mesh for 14+ hours of uninterrupted executive focus.',
      specs: [
        { label: 'Tilt Mechanism', value: 'Multi-Lock Synchro 135°' },
        { label: 'Lumbar System', value: 'Dynamic Adaptive Spring' },
        { label: 'Armrests', value: '4D Metallic Core Pivot' },
        { label: 'Base & Cylinder', value: 'Class-4 BIFMA Certified' },
      ],
    },
    {
      id: 21,
      index: 1,
      name: 'BESO FlexRise Smart Desk',
      tagline: 'Dual-Motor Standing Desk · Anti-Collision Gyro',
      price: 38990,
      originalPrice: 45990,
      image: '/assets/images/flagship-flexrise.png',
      fallbackImage: '/assets/images/products/executive-table-01.jpg',
      badge: 'Ergo Innovation',
      rating: 4.8,
      reviews: 19,
      slug: 'beso-flexrise-height-adjustable-table',
      desc: 'Whisper-quiet dual electric columns capable of lifting 140kg with millimeter precision. 4 programmable memory presets and automated sedentary reminders.',
      specs: [
        { label: 'Motor System', value: 'Dual Silent (<45 dB)' },
        { label: 'Height Stroke', value: '650 mm – 1300 mm' },
        { label: 'Payload Capacity', value: '140 kg Heavy Duty' },
        { label: 'Control Panel', value: 'OLED Touch + USB-C' },
      ],
    },
    {
      id: 4,
      index: 2,
      name: 'BESO Prestige Executive Chair',
      tagline: 'Full-Grain Italian Nappa Leather · Polished Chrome Core',
      price: 34990,
      originalPrice: 42990,
      image: '/assets/images/flagship-prestige.png',
      fallbackImage: '/assets/images/products/executive-chair-04.jpg',
      badge: 'Director Suite',
      rating: 4.9,
      reviews: 24,
      slug: 'beso-prestige-executive-chair',
      desc: 'Hand-upholstered in genuine top-grain Nappa leather with high-resilience moulded cold-cure foam and solid die-cast aluminum cantilever detailing.',
      specs: [
        { label: 'Leather Grade', value: 'Top-Grain Italian Nappa' },
        { label: 'Foam Density', value: '65 kg/m³ Cold-Cure' },
        { label: 'Chassis', value: 'Die-Cast Polished Alloy' },
        { label: 'Warranty', value: '7 Years Comprehensive' },
      ],
    },
  ];

  // Scroll tracking across 280vh track
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalScrollable = el.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeSlideIdx = scrollProgress < 0.38 ? 0 : scrollProgress < 0.72 ? 1 : 2;

  const scrollToSlide = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const targetOffset = el.offsetTop + (idx * 0.45) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
  };

  // Card physics for slide-over deck
  const slide0Scale = scrollProgress > 0.05 ? Math.max(0.92, 1 - scrollProgress * 0.12) : 1;
  const slide0Opacity = scrollProgress > 0.35 ? Math.max(0.3, 1 - (scrollProgress - 0.35) * 1.5) : 1;

  const p1 = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.42));
  const slide1Y = (1 - p1) * 105;
  const slide1Scale = scrollProgress > 0.48 ? Math.max(0.93, 1 - (scrollProgress - 0.48) * 0.1) : 1;
  const slide1Opacity = scrollProgress > 0.75 ? Math.max(0.3, 1 - (scrollProgress - 0.75) * 1.5) : 1;

  const p2 = Math.max(0, Math.min(1, (scrollProgress - 0.52) / 0.44));
  const slide2Y = (1 - p2) * 105;

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[280vh] border-t border-line/10 bg-app select-none"
    >
      {/* ─── Sticky Viewport (Pinned below fixed navbar so header never overlaps) ─── */}
      <div className="sticky top-[72px] sm:top-[84px] h-[calc(100vh-72px)] sm:h-[calc(100vh-84px)] w-full flex flex-col justify-between pt-1 pb-3 sm:pb-4 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Top Header with Glass Indicator & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-40">
          <div>
            <span className="text-xs font-bold text-brandLime uppercase tracking-widest inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brandLime animate-pulse" />
              Featured Showcase · Mouse Scroll-Driven Deck
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-ink tracking-tight mt-0.5">
              The Flagship Engineering Line
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Numbered Pills (01 / 02 / 03) */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-surface/80 backdrop-blur-xl border border-line/15 shadow-md">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    activeSlideIdx === idx
                      ? 'bg-ink text-app shadow-md scale-105'
                      : 'text-ink/50 hover:text-ink hover:bg-surfaceSubtle'
                  }`}
                  aria-label={`Jump to slide 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Continuous Progress Indicator Bar */}
            <div className="hidden sm:flex items-center gap-2 w-28 h-2 bg-surface/80 backdrop-blur-md rounded-full overflow-hidden border border-line/15 p-0.5">
              <div
                className="h-full bg-brandLime rounded-full transition-all duration-75"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* ─── Card Deck Viewport: Premium Glassmorphic Cards with Depth ─── */}
        <div className="relative flex-1 my-1.5 flex items-center justify-center min-h-0">
          {/* ═══ SLIDE 0: BESO Crown (Glassmorphism & Depth) ═══ */}
          <div
            className="absolute inset-0 grid lg:grid-cols-12 gap-5 lg:gap-7 items-center rounded-[2rem] p-5 sm:p-7 md:p-8 overflow-hidden bg-white/70 dark:bg-black/50 backdrop-blur-3xl border border-white/60 dark:border-white/20 shadow-[0_30px_80px_rgba(36,29,20,0.12)] ring-1 ring-inset ring-white/50 dark:ring-white/10"
            style={{
              zIndex: 10,
              transform: `scale(${slide0Scale})`,
              opacity: slide0Opacity,
              transition: 'transform 0.1s linear, opacity 0.1s linear',
            }}
          >
            <SlideContent
              slide={slides[0]}
              allProducts={all}
              onAddToCart={addToCart}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
              isInCompare={isInCompare}
              toggleCompare={toggleCompare}
            />
          </div>

          {/* ═══ SLIDE 1: BESO FlexRise (Slides UP with glass depth) ═══ */}
          <div
            className="absolute inset-0 grid lg:grid-cols-12 gap-5 lg:gap-7 items-center rounded-[2rem] p-5 sm:p-7 md:p-8 overflow-hidden bg-white/80 dark:bg-black/60 backdrop-blur-3xl border border-white/70 dark:border-white/25 shadow-[0_35px_95px_rgba(36,29,20,0.18)] ring-1 ring-inset ring-white/60 dark:ring-white/15"
            style={{
              zIndex: 20,
              transform: `translateY(${slide1Y}%) scale(${slide1Scale})`,
              opacity: slide1Opacity,
              transition: 'transform 0.1s linear, opacity 0.1s linear',
            }}
          >
            <SlideContent
              slide={slides[1]}
              allProducts={all}
              onAddToCart={addToCart}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
              isInCompare={isInCompare}
              toggleCompare={toggleCompare}
            />
          </div>

          {/* ═══ SLIDE 2: BESO Prestige (Slides UP with highest depth & shadow) ═══ */}
          <div
            className="absolute inset-0 grid lg:grid-cols-12 gap-5 lg:gap-7 items-center rounded-[2rem] p-5 sm:p-7 md:p-8 overflow-hidden bg-white/88 dark:bg-black/70 backdrop-blur-3xl border border-white/85 dark:border-white/30 shadow-[0_40px_110px_rgba(36,29,20,0.24)] ring-1 ring-inset ring-white/70 dark:ring-white/20"
            style={{
              zIndex: 30,
              transform: `translateY(${slide2Y}%)`,
              transition: 'transform 0.1s linear',
            }}
          >
            <SlideContent
              slide={slides[2]}
              allProducts={all}
              onAddToCart={addToCart}
              isInWishlist={isInWishlist}
              toggleWishlist={toggleWishlist}
              isInCompare={isInCompare}
              toggleCompare={toggleCompare}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function SlideContent({
  slide,
  allProducts,
  onAddToCart,
  isInWishlist,
  toggleWishlist,
  isInCompare,
  toggleCompare,
}: {
  slide: any;
  allProducts: any[];
  onAddToCart: (p: any, qty: number) => void;
  isInWishlist?: (id: number) => boolean;
  toggleWishlist?: (id: number) => void;
  isInCompare?: (id: number) => boolean;
  toggleCompare?: (id: number) => void;
}) {
  const activeProduct = allProducts.find((p) => p.id === slide.id) || slide;
  const wishlisted = isInWishlist ? isInWishlist(slide.id) : false;
  const comparing = isInCompare ? isInCompare(slide.id) : false;

  return (
    <>
      {/* Dynamic 3D depth backdrop glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brandLime/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brandLime/10 rounded-full blur-[110px] pointer-events-none" />

      {/* Left: Product Technical Specs & Architecture */}
      <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-brandLime/20 text-brandLime text-[10px] font-black uppercase tracking-widest border border-brandLime/30 shadow-sm">
            {slide.badge}
          </span>
          <span className="text-amber-500 text-xs font-bold flex items-center gap-1">
            ★ {slide.rating} ({slide.reviews} verified reviews)
          </span>
        </div>

        <div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black text-ink tracking-tight leading-tight">
            {slide.name}
          </h3>
          <p className="text-xs sm:text-sm text-ink/65 font-medium mt-1 leading-relaxed">
            {slide.tagline}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-ink/75 leading-relaxed max-w-xl hidden sm:block">
          {slide.desc}
        </p>

        {/* Technical Specs Glass Cards */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          {slide.specs.map((sp: any) => (
            <div
              key={sp.label}
              className="p-2.5 sm:p-3 rounded-2xl bg-white/60 dark:bg-white/10 backdrop-blur-md border border-white/60 dark:border-white/20 hover:border-brandLime/40 hover:bg-white/80 transition-all shadow-sm"
            >
              <span className="text-[9px] font-bold text-ink/40 uppercase tracking-widest block">
                {sp.label}
              </span>
              <span className="text-xs font-black text-ink mt-0.5 block">
                {sp.value}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing and Action Buttons Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-2.5 border-t border-line/10">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-ink">
                {formatPrice(slide.price)}
              </span>
              {slide.originalPrice && (
                <span className="text-xs text-ink/40 line-through">
                  {formatPrice(slide.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-bold block">
              Free PAN-India White-Glove Setup · 5-7 Yr Warranty
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAddToCart(activeProduct, 1)}
              className="px-6 py-2.5 sm:py-3 rounded-full bg-ink text-app text-xs uppercase tracking-wider font-extrabold shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <span>+ Add to Cart</span>
            </button>

            <Link
              href={`/products/${slide.slug}`}
              className="px-4 py-2.5 sm:py-3 rounded-full border border-white/60 bg-white/60 backdrop-blur-md text-xs font-bold text-ink hover:bg-white/85 transition-all shadow-sm"
            >
              Full Specs →
            </Link>

            {/* Wishlist quick toggle */}
            {toggleWishlist && (
              <button
                type="button"
                onClick={() => toggleWishlist(slide.id)}
                className={`p-2.5 sm:p-3 rounded-full border transition-all ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-500'
                    : 'border-white/50 bg-white/60 backdrop-blur-md text-ink/40 hover:text-rose-500'
                }`}
                title={wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                aria-label="Wishlist"
              >
                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                  fill={wishlisted ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </button>
            )}

            {/* Compare quick toggle */}
            {toggleCompare && (
              <button
                type="button"
                onClick={() => toggleCompare(slide.id)}
                className={`p-2.5 sm:p-3 rounded-full border transition-all ${
                  comparing
                    ? 'bg-brandLime/20 border-brandLime text-ink font-bold'
                    : 'border-white/50 bg-white/60 backdrop-blur-md text-ink/40 hover:text-ink'
                }`}
                title={comparing ? 'Comparing' : 'Compare'}
                aria-label="Compare"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10M12 20V4M6 20v-6" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right: Architectural 3D Glass Pedestal Showcase */}
      <div className="lg:col-span-5 flex justify-center relative z-10">
        <div className="w-full max-w-[250px] sm:max-w-[275px] md:max-w-[290px] aspect-[4/5] rounded-[1.6rem] border border-line/15 bg-[#0e1114] relative shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden group">
          {/* Subtle Ambient Glow & Glass Rim */}
          <div className="absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/25 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none z-10" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.image}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = slide.fallbackImage;
            }}
            alt={slide.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-all duration-700 relative z-0"
          />
        </div>
      </div>
    </>
  );
}
