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

interface FeatureSpec {
  icon: string;
  highlight: string;
  sub: string;
  category: string;
}

interface FlagshipSlide {
  id: number;
  index: number;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  image: string;
  fallbackImage: string;
  badge: string;
  rating: number;
  reviews: number;
  slug: string;
  desc: string;
  specs: { label: string; value: string }[];
  featureSpecs: FeatureSpec[];
}

const FLAGSHIP_SLIDES: FlagshipSlide[] = [
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
    featureSpecs: [
      { icon: '◬', highlight: 'Multi-Lock 135°', sub: 'Synchro Recline', category: 'TILT CHASSIS' },
      { icon: '◎', highlight: 'Dynamic Spring', sub: 'Active Compression', category: 'LUMBAR' },
      { icon: '▱', highlight: '4D Metallic', sub: 'Omni Pivot Core', category: 'ARMRESTS' },
      { icon: '♢', highlight: 'Class-4 Core', sub: 'BIFMA Certified', category: 'HYDRAULICS' },
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
    featureSpecs: [
      { icon: '⚡', highlight: 'Dual Silent', sub: '<45 dB Whispers', category: 'MOTOR' },
      { icon: '↕', highlight: '650–1300 mm', sub: 'Millimeter Stroke', category: 'STROKE' },
      { icon: '△', highlight: '140 kg Heavy', sub: 'Zero-Wobble Core', category: 'PAYLOAD' },
      { icon: '◫', highlight: 'OLED Memory', sub: '4 Touch Presets', category: 'CONTROLLER' },
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
    featureSpecs: [
      { icon: '♧', highlight: 'Top-Grain', sub: 'Italian Nappa', category: 'LEATHER' },
      { icon: '▱', highlight: '65 kg/m³', sub: 'Cold-Cure Foam', category: 'FOAM DENSITY' },
      { icon: '△', highlight: 'Die-Cast Alloy', sub: 'Polished Cantilever', category: 'CHASSIS' },
      { icon: '♢', highlight: '7 Years', sub: 'Comprehensive', category: 'WARRANTY' },
    ],
  },
];

export function FeaturedSlideOverShowcase() {
  const { addToCart, isInWishlist, toggleWishlist, isInCompare, toggleCompare } = useCart();
  const all = products as any[];
  const sectionRef = useRef<HTMLElement | null>(null);

  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const lastActiveIdx = useRef(0);

  const slides = FLAGSHIP_SLIDES;

  // High-performance physics-interpolated (lerp) scroll handler
  // Transforms discrete mouse-wheel notches into a buttery-smooth 60/120fps glide
  useEffect(() => {
    let targetProgress = 0;
    let smoothProgress = 0;
    let animId: number | null = null;
    let isRunning = false;

    const smoothStep = (t: number) => t * t * (3 - 2 * t);

    const render = (progress: number) => {
      // Active slide indicator pill (only triggers state when changed)
      const newIdx = progress < 0.38 ? 0 : progress < 0.72 ? 1 : 2;
      if (newIdx !== lastActiveIdx.current) {
        lastActiveIdx.current = newIdx;
        setActiveSlideIdx(newIdx);
      }

      // Smooth progress bar (hardware-accelerated scaleX)
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }

      // Card 0: scale down slightly & fade
      if (card0Ref.current) {
        const s0Scale = progress > 0.05 ? Math.max(0.92, 1 - progress * 0.12) : 1;
        const s0Opacity = progress > 0.35 ? Math.max(0.12, 1 - (progress - 0.35) * 1.6) : 1;
        card0Ref.current.style.transform = `translate3d(0, 0, 0) scale3d(${s0Scale.toFixed(4)}, ${s0Scale.toFixed(4)}, 1)`;
        card0Ref.current.style.opacity = `${s0Opacity.toFixed(4)}`;
      }

      // Card 1: slides UP into view with buttery smooth smoothstep translation
      if (card1Ref.current) {
        const p1 = Math.max(0, Math.min(1, (progress - 0.08) / 0.42));
        const ease1 = smoothStep(p1);
        const s1Y = (1 - ease1) * 102;
        const s1Scale = progress > 0.48 ? Math.max(0.93, 1 - (progress - 0.48) * 0.1) : 1;
        const s1Opacity = progress > 0.75 ? Math.max(0.12, 1 - (progress - 0.75) * 1.6) : 1;
        card1Ref.current.style.transform = `translate3d(0, ${s1Y.toFixed(2)}%, 0) scale3d(${s1Scale.toFixed(4)}, ${s1Scale.toFixed(4)}, 1)`;
        card1Ref.current.style.opacity = `${s1Opacity.toFixed(4)}`;
      }

      // Card 2: slides UP into view with buttery smooth smoothstep translation
      if (card2Ref.current) {
        const p2 = Math.max(0, Math.min(1, (progress - 0.50) / 0.45));
        const ease2 = smoothStep(p2);
        const s2Y = (1 - ease2) * 102;
        card2Ref.current.style.transform = `translate3d(0, ${s2Y.toFixed(2)}%, 0)`;
      }
    };

    const loop = () => {
      const diff = targetProgress - smoothProgress;
      if (Math.abs(diff) > 0.0002) {
        // Snappy, silky exponential lerp damping (0.18) for zero-lag organic glide
        smoothProgress += diff * 0.18;
        render(smoothProgress);
        animId = requestAnimationFrame(loop);
      } else {
        smoothProgress = targetProgress;
        render(smoothProgress);
        isRunning = false;
        animId = null;
      }
    };

    const onScrollOrResize = (immediate = false) => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < -100 || rect.top > vh + 100) return;

      const totalScrollable = el.offsetHeight - vh;
      if (totalScrollable <= 0) return;
      const currentScroll = -rect.top;
      targetProgress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      if (immediate) {
        smoothProgress = targetProgress;
        render(smoothProgress);
        return;
      }

      if (!isRunning) {
        isRunning = true;
        animId = requestAnimationFrame(loop);
      }
    };

    onScrollOrResize(true);
    const scrollHandler = () => onScrollOrResize(false);
    window.addEventListener('scroll', scrollHandler, { passive: true });
    window.addEventListener('resize', scrollHandler, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', scrollHandler);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  const scrollToSlide = (idx: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const targetOffset = el.offsetTop + (idx * 0.45) * (el.offsetHeight - window.innerHeight);
    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[320vh] border-t border-line/10 bg-app select-none"
    >
      {/* ─── Sticky Viewport (Pinned below fixed navbar so header never overlaps) ─── */}
      <div className="sticky top-[72px] sm:top-[84px] h-[calc(100vh-72px)] sm:h-[calc(100vh-84px)] w-full flex flex-col justify-between pt-1 pb-3 sm:pb-4 px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden">
        {/* Top Header with Glass Indicator & Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-40">
          <div>
            <span className="text-xs font-bold text-accent uppercase tracking-widest inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Featured Showcase · Mouse Scroll-Driven Deck
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-ink tracking-tight mt-0.5">
              The Flagship Engineering Line
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Numbered Pills (01 / 02 / 03) in warm oak tone */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F2EADC]/90 dark:bg-[#251E16]/90 backdrop-blur-md border border-[#E2D5C3] dark:border-[#3E3022] shadow-sm">
              {slides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSlide(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all ${
                    activeSlideIdx === idx
                      ? 'bg-ink text-app shadow-md scale-105'
                      : 'text-ink/55 hover:text-ink hover:bg-surface'
                  }`}
                  aria-label={`Jump to slide 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>

            {/* Continuous Progress Indicator Bar in warm golden oak */}
            <div className="hidden sm:flex items-center gap-2 w-28 h-2 bg-[#F2EADC]/90 dark:bg-[#251E16]/90 backdrop-blur-md rounded-full overflow-hidden border border-[#E2D5C3] dark:border-[#3E3022] p-0.5">
              <div
                ref={progressBarRef}
                className="h-full w-full bg-accent rounded-full origin-left will-change-transform"
                style={{ transform: 'scaleX(0)' }}
              />
            </div>
          </div>
        </div>

        {/* ─── Card Deck Viewport: Glassmorphic Scandinavian Oak Cards ─── */}
        <div className="relative flex-1 my-1.5 flex items-center justify-center min-h-0">
          {/* ═══ SLIDE 0: BESO Crown ═══ */}
          <div
            ref={card0Ref}
            className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center justify-between lg:justify-center rounded-[2.2rem] p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/45 dark:from-[#241A12]/85 dark:via-[#1B130E]/80 dark:to-[#140D08]/85 backdrop-blur-2xl -webkit-backdrop-blur-2xl border border-white/85 dark:border-white/15 shadow-[0_28px_80px_rgba(79,49,20,0.13),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-white/80 dark:ring-white/10 will-change-transform"
            style={{
              zIndex: 10,
              transform: 'scale3d(1, 1, 1)',
              opacity: 1,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              isolation: 'isolate',
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

          {/* ═══ SLIDE 1: BESO FlexRise ═══ */}
          <div
            ref={card1Ref}
            className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center justify-between lg:justify-center rounded-[2.2rem] p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/45 dark:from-[#241A12]/85 dark:via-[#1B130E]/80 dark:to-[#140D08]/85 backdrop-blur-2xl -webkit-backdrop-blur-2xl border border-white/85 dark:border-white/15 shadow-[0_28px_80px_rgba(79,49,20,0.13),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-white/80 dark:ring-white/10 will-change-transform"
            style={{
              zIndex: 20,
              transform: 'translate3d(0, 105%, 0) scale3d(1, 1, 1)',
              opacity: 1,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              isolation: 'isolate',
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

          {/* ═══ SLIDE 2: BESO Prestige ═══ */}
          <div
            ref={card2Ref}
            className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center justify-between lg:justify-center rounded-[2.2rem] p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto lg:overflow-hidden bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/45 dark:from-[#241A12]/85 dark:via-[#1B130E]/80 dark:to-[#140D08]/85 backdrop-blur-2xl -webkit-backdrop-blur-2xl border border-white/85 dark:border-white/15 shadow-[0_28px_80px_rgba(79,49,20,0.13),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] ring-1 ring-inset ring-white/80 dark:ring-white/10 will-change-transform"
            style={{
              zIndex: 30,
              transform: 'translate3d(0, 105%, 0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              isolation: 'isolate',
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

const SlideContent = React.memo(function SlideContent({
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

  const discountPercent = slide.originalPrice
    ? Math.round(((slide.originalPrice - slide.price) / slide.originalPrice) * 100)
    : null;

  return (
    <>
      {/* Specular glass sheen highlight & ambient corner illumination */}
      <div
        className="absolute inset-0 pointer-events-none rounded-[2.2rem]"
        style={{
          background:
            'radial-gradient(ellipse at 6% 6%, rgba(255,255,255,0.72), transparent 48%), radial-gradient(ellipse at 92% 92%, rgb(var(--accent-rgb) / 0.09), transparent 45%)',
        }}
      />

      {/* Left Column on Desktop / Bottom on Mobile: Information & Spec Architecture */}
      <div className="lg:col-span-7 space-y-2.5 sm:space-y-3.5 z-10 order-2 lg:order-1 w-full">
        {/* Topline: Frosted badge with glowing dot + Rating */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/80 dark:border-white/20 bg-white/55 dark:bg-white/10 text-accent text-[11px] font-bold tracking-widest uppercase shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#E99A15] shadow-[0_0_0_3px_#F8E5C5] dark:shadow-[0_0_0_3px_#4A3215]" />
            <span>{slide.badge}</span>
          </div>

          <div className="text-xs text-ink/70 dark:text-ink/60 font-medium flex items-center gap-1.5 whitespace-nowrap bg-white/45 dark:bg-white/5 px-3 py-1 rounded-full border border-white/70 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <span className="text-[#E69B19] text-base leading-none">★</span>
            <strong className="text-ink font-bold">{slide.rating}</strong>
            <span className="opacity-40">|</span>
            <span>{slide.reviews} reviews</span>
          </div>
        </div>

        {/* Eyebrow, Title & Editorial Description */}
        <div>
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-[#88796B] dark:text-[#A8988A] uppercase mb-1 sm:mb-1.5">
            THE FLAGSHIP ENGINEERING LINE
          </p>
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-serif font-bold text-ink tracking-tight leading-[1.06]">
            {slide.name}
          </h3>
          <p className="text-xs sm:text-sm text-ink/75 font-normal mt-1 leading-relaxed max-w-xl">
            {slide.desc}
          </p>
        </div>

        {/* 4 Frosted Glass Feature Tiles (Inspired by beso-product-card.html) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 my-1 sm:my-2">
          {slide.featureSpecs.map((f: any) => (
            <div
              key={f.category}
              className="min-h-[105px] sm:min-h-[120px] p-2.5 sm:p-3 text-center rounded-2xl border border-white/70 dark:border-white/15 bg-white/45 dark:bg-white/5 backdrop-blur-md shadow-[0_8px_20px_rgba(77,48,21,0.04)] flex flex-col items-center justify-between transition-all hover:bg-white/60 dark:hover:bg-white/10 hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-full border border-white/90 dark:border-white/20 bg-white/70 dark:bg-white/10 text-accent flex items-center justify-center text-xs font-bold shadow-sm">
                {f.icon}
              </div>
              <div className="my-0.5">
                <b className="block text-xs font-bold text-ink leading-tight">
                  {f.highlight}
                </b>
                <span className="block text-[10px] text-ink/65 leading-tight mt-0.5">
                  {f.sub}
                </span>
              </div>
              <small className="block text-[8.5px] font-bold tracking-widest text-[#A19588] uppercase">
                {f.category}
              </small>
            </div>
          ))}
        </div>

        {/* Price, Shipping & Interactive Action Buttons */}
        <div className="space-y-2 pt-2 border-t border-white/60 dark:border-white/10">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
              {formatPrice(slide.price)}
            </span>
            {slide.originalPrice && (
              <span className="text-sm text-ink/40 line-through font-medium">
                {formatPrice(slide.originalPrice)}
              </span>
            )}
            {discountPercent && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#F9DFAD] dark:bg-[#4D3517] text-[#9A5B0B] dark:text-[#EBB874] text-[11px] font-extrabold shadow-sm">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <div className="text-xs text-ink/65 flex items-center gap-1.5 font-medium">
            <span className="text-accent font-bold">♧</span>
            <span>PAN-India White-Glove Setup · 5–7 Yr Warranty</span>
          </div>

          <div className="flex items-center gap-2.5 pt-1.5 flex-wrap">
            {/* Primary Add to Cart button */}
            <button
              type="button"
              onClick={() => onAddToCart(activeProduct, 1)}
              className="px-6 sm:px-8 py-3 rounded-full bg-[#2D1B10] text-[#FFFAF3] text-xs font-extrabold uppercase tracking-wider shadow-[0_10px_22px_rgba(61,37,29,0.25)] hover:translate-y-[-2px] hover:shadow-[0_14px_28px_rgba(61,37,29,0.3)] active:translate-y-0 transition-all flex items-center gap-2"
            >
              <span>♧</span>
              <span>Add to Cart</span>
            </button>

            {/* Secondary Full Specs glass button */}
            <Link
              href={`/products/${slide.slug}`}
              className="px-5 py-3 rounded-full bg-white/55 dark:bg-white/10 backdrop-blur-md border border-white/80 dark:border-white/20 text-xs font-bold text-ink hover:bg-white/75 transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Full Specs</span>
              <span>→</span>
            </Link>

            {/* Wishlist round glass button */}
            {toggleWishlist && (
              <button
                type="button"
                onClick={() => toggleWishlist(slide.id)}
                className={`w-11 h-11 rounded-full border backdrop-blur-md transition-all flex items-center justify-center shadow-sm ${
                  wishlisted
                    ? 'bg-rose-50 border-rose-300 text-rose-500'
                    : 'bg-white/55 dark:bg-white/10 border-white/80 dark:border-white/20 text-ink/60 hover:text-rose-500 hover:bg-white/75'
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

            {/* Compare round glass button */}
            {toggleCompare && (
              <button
                type="button"
                onClick={() => toggleCompare(slide.id)}
                className={`w-11 h-11 rounded-full border backdrop-blur-md transition-all flex items-center justify-center shadow-sm ${
                  comparing
                    ? 'bg-accent/25 border-accent text-accent font-bold'
                    : 'bg-white/55 dark:bg-white/10 border-white/80 dark:border-white/20 text-ink/60 hover:text-ink hover:bg-white/75'
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

      {/* Right Column on Desktop / Top-Center on Mobile: Architectural Pedestal Showcase */}
      <div className="lg:col-span-5 flex justify-center items-center relative z-10 w-full py-1 lg:py-0 order-1 lg:order-2">
        <div className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[450px] aspect-[4/5] rounded-[1.8rem] sm:rounded-[2.2rem] border border-white/80 dark:border-white/15 bg-gradient-to-b from-[#1C1510] to-[#0E0B08] relative shadow-[0_24px_60px_rgba(44,28,15,0.25)] overflow-hidden group flex items-center justify-center">
          {/* Ambient Backlight inside frame */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgb(var(--accent-rgb) / 0.22), transparent 70%)',
            }}
          />
          {/* Glass rim reflection */}
          <div className="absolute inset-0 rounded-[1.8rem] sm:rounded-[2.2rem] ring-1 ring-inset ring-white/30 pointer-events-none z-10" />

          {/* Floating Frosted Image Tag */}
          <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md border border-white/30 text-white text-[10px] tracking-widest font-bold uppercase shadow-sm">
            {slide.badge}
          </div>

          {/* Floating Expand / Details Link Button */}
          <Link
            href={`/products/${slide.slug}`}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-stone-900 flex items-center justify-center text-xs hover:scale-110 transition-transform shadow-md"
            title="View Product Specs"
          >
            ↗
          </Link>

          {/* Product Image Link with smooth hover scale */}
          <Link
            href={`/products/${slide.slug}`}
            className="w-full h-full flex items-center justify-center relative z-0 cursor-pointer"
            aria-label={`View ${slide.name} specifications`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = slide.fallbackImage;
              }}
              alt={slide.name}
              className="w-full h-full object-contain p-3 sm:p-5 group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)]"
            />
          </Link>

          {/* Bottom Glass Footer Tag */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-medium tracking-wider whitespace-nowrap flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>Direct Factory Engineering</span>
          </div>
        </div>
      </div>
    </>
  );
});

