'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import products from '@/data/products.json';

/* ==========================================================================
   CONCEPT 6 · ARCHIVE
   High-fidelity recreation of Beyond Medals (https://www.beyondmedals.com/en-AU)
   Structure:
     0. Top USP Announcement Bar (sparkles + marquee message)
     1. 3-Zone Sticky Navigation with interactive dropdown panels (Shop, Explore, Archive, Search, Saved, Bag)
     2. StartTemplate Hero (2-Up Split: Left Video Loop + Right Editorial Still)
     3. ModuleVideoList (Full-width cinematic loop + sticky HUD playlist & thumbnail selector)
     4. ModuleCollectionHighlightGrid (Sticky numbered left index + 16-col asymmetric cutout showcase)
     5. ModuleHighlightCollage (16-col reverse editorial collage with interactive hotspot product pin)
     6. ModuleGalleryList (Interactive studio albums with hover-expanding thumbnail strips & dotted hairlines)
     7. Stacked 4-Column Footer (Since 2021, Newsletter, Customer Service, Information, Social, India/INR)
   ========================================================================== */

const MONO = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
const GROTESK = '"Space Grotesk", ui-sans-serif, system-ui, sans-serif';
const INK = '#141313';
const BASE = '#FFFDFA';
const ACCENT = '#2A4EEF'; // Signature Beyond Medals electric blue

type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  category?: string;
  subcategory?: string;
  tagline?: string;
};

const allProducts = products as unknown as Product[];
const pimg = (p: Product) => (p.image.startsWith('/') ? p.image : `/${p.image}`);
const money = (n?: number) => (n ? `₹${n.toLocaleString('en-IN')}` : '');

// 10 Featured pieces for ModuleCollectionHighlightGrid ("Latest")
const FEATURED_SLUGS = [
  'beso-crown-executive-chair',
  'beso-prestige-executive-chair',
  'beso-flexrise-height-adjustable-table',
  'beso-milano-executive-chair',
  'beso-ergomax-executive-chair',
  'beso-horizon-executive-table',
  'beso-mega-executive-table',
  'beso-premium-manager-chair',
  'beso-ergo-manager-chair',
  'beso-executive-z-desk',
];

const featuredProducts = FEATURED_SLUGS.map((slug) =>
  allProducts.find((p) => p.slug === slug)
).filter(Boolean) as Product[];

// Playlist for ModuleVideoList
const VIDEO_STORIES = [
  {
    id: 'studio-desk',
    title: 'The Work Series',
    meta: 'Office · Film 01',
    base: '/assets/videos/bm/studio-desk',
    poster: '/assets/videos/bm/studio-desk-poster.jpg',
  },
  {
    id: 'light-crown',
    title: 'Crown Ergonomic',
    meta: 'High-back mesh · Film 02',
    base: '/assets/videos/bm/light-crown',
    poster: '/assets/videos/bm/light-crown-poster.jpg',
  },
  {
    id: 'dark-prestige',
    title: 'Prestige Executive',
    meta: 'Full-grain leather · Film 03',
    base: '/assets/videos/bm/dark-prestige',
    poster: '/assets/videos/bm/dark-prestige-poster.jpg',
  },
  {
    id: 'walnut-flexrise',
    title: 'FlexRise Sit–Stand',
    meta: 'Dual-motor desk · Film 04',
    base: '/assets/videos/bm/walnut-flexrise',
    poster: '/assets/videos/bm/walnut-flexrise-poster.jpg',
  },
  {
    id: 'mesh-crown',
    title: 'The Home Series',
    meta: 'Architectural chair · Film 05',
    base: '/assets/videos/bm/mesh-crown',
    poster: '/assets/videos/bm/mesh-crown-poster.jpg',
  },
];

// Gallery albums for ModuleGalleryList
const GALLERY_ALBUMS = [
  {
    title: 'THE HYDERABAD STUDY',
    count: '24 images',
    year: '2026',
    slug: 'hyderabad-study',
    thumbs: [
      '/assets/images/products/executive-chair-07.jpg',
      '/assets/images/products/executive-chair-04.jpg',
      '/assets/images/products/height-table-01.jpg',
      '/assets/images/products/executive-chair-01.jpg',
      '/assets/images/products/executive-chair-06.jpg',
      '/assets/images/products/executive-table-01.jpg',
      '/assets/images/products/executive-table-10.jpg',
      '/assets/images/products/manager-chair-06.jpg',
    ],
  },
  {
    title: 'EXECUTIVE SUITE 01',
    count: '18 images',
    year: '2026',
    slug: 'executive-suite',
    thumbs: [
      '/assets/images/products/executive-chair-04.jpg',
      '/assets/images/products/executive-chair-03.jpg',
      '/assets/images/products/executive-table-04.jpg',
      '/assets/images/products/executive-table-06.jpg',
      '/assets/images/products/executive-chair-07.jpg',
      '/assets/images/products/executive-table-02.jpg',
    ],
  },
  {
    title: 'SIT–STAND SYSTEMS',
    count: '15 images',
    year: '2025',
    slug: 'sit-stand-systems',
    thumbs: [
      '/assets/images/products/height-table-01.jpg',
      '/assets/images/products/staff-table-05.jpg',
      '/assets/images/products/manager-table-02.jpg',
      '/assets/images/products/executive-chair-07.jpg',
      '/assets/images/products/manager-chair-04.jpg',
    ],
  },
  {
    title: 'CRAFT & ALUMINUM',
    count: '12 images',
    year: '2025',
    slug: 'craft-aluminum',
    thumbs: [
      '/assets/images/products/visitor-chair-04.jpg',
      '/assets/images/products/executive-chair-06.jpg',
      '/assets/images/products/visitor-chair-01.jpg',
      '/assets/images/products/manager-chair-01.jpg',
      '/assets/images/products/executive-chair-02.jpg',
    ],
  },
  {
    title: 'MATERIALS ARCHIVE',
    count: '30 images',
    year: '2024',
    slug: 'materials-archive',
    thumbs: [
      '/assets/images/editorial-workspace.jpg',
      '/assets/images/editorial-hero.jpg',
      '/assets/images/d01-hero.jpg',
      '/assets/images/d02-hero.jpg',
      '/assets/images/products/executive-chair-07.jpg',
      '/assets/images/products/height-table-01.jpg',
    ],
  },
];

export default function ConceptArchivePage() {
  // Navigation states
  const [activeNavPanel, setActiveNavPanel] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Video playlist state
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  // Collection highlight grid state (Left <ol> hover links to Right card)
  const [hoveredProductIdx, setHoveredProductIdx] = useState<number | null>(null);

  // Hotspot state on collage
  const [hotspotActive, setHotspotActive] = useState(false);

  // Newsletter form state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterTerms, setNewsletterTerms] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Switch video in ModuleVideoList
  const selectVideo = (idx: number) => {
    setActiveVideoIdx(idx);
    if (videoPlayerRef.current) {
      videoPlayerRef.current.load();
      videoPlayerRef.current.play().catch(() => {});
    }
  };

  // Native requestAnimationFrame scroll parallax for [data-plx]
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId: number | null = null;
    const plxElements = Array.from(document.querySelectorAll<HTMLElement>('[data-plx]'));

    const handleScroll = () => {
      rafId = null;
      const vh = window.innerHeight;
      for (const el of plxElements) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -150 || rect.top > vh + 150) continue;
        const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
        const speed = parseFloat(el.dataset.plx || '0.1');
        const offset = -progress * speed * 100;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.08)`;
      }
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(handleScroll);
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Filtered products for search
  const searchResults = searchQuery.trim()
    ? allProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  return (
    <div
      className="concept-bm-root min-h-screen text-[#141313]"
      style={{
        backgroundColor: BASE,
        color: INK,
        fontFamily: MONO,
      }}
    >
      <style jsx global>{`
        /* Beyond Medals signature layout tokens */
        :root {
          --bm-bg: #FFFDFA;
          --bm-ink: #141313;
          --bm-accent: #2A4EEF;
          --bm-border: rgba(20, 19, 19, 0.15);
          --bm-muted: rgba(20, 19, 19, 0.48);
          --bm-gap: 9rem;
          --header-usp-height: 104px;
        }

        @media (min-width: 1025px) {
          :root {
            --bm-gap: 14.4rem;
          }
        }

        /* Beyond Medals button style */
        .bm-btn {
          background-color: #FFFDFA;
          color: #141313;
          text-align: center;
          justify-content: center;
          align-items: center;
          width: fit-content;
          min-height: 28px;
          padding: 0 1rem;
          text-decoration: none;
          display: inline-flex;
          position: relative;
          font-family: ${MONO};
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          transition: background-color 0.2s ease, color 0.2s ease;
          border: 1px solid rgba(20, 19, 19, 0.25);
        }

        .bm-btn:hover {
          background-color: #141313;
          color: #FFFDFA;
          border-color: #141313;
        }

        .bm-btn-dark {
          background-color: #141313;
          color: #FFFDFA;
          border: 1px solid rgba(255, 253, 250, 0.3);
        }

        .bm-btn-dark:hover {
          background-color: #FFFDFA;
          color: #141313;
          border-color: #FFFDFA;
        }

        /* Dotted borders */
        .bm-dotted-b {
          border-bottom: 1px dotted rgba(20, 19, 19, 0.25);
        }

        .bm-dotted-t {
          border-top: 1px dotted rgba(20, 19, 19, 0.25);
        }

        /* Asymmetric collection grid placement on 16 columns (Desktop) */
        @media (min-width: 1025px) {
          .bm-grid-16 {
            display: grid;
            grid-template-columns: repeat(16, minmax(0, 1fr));
            column-gap: 1.5rem;
            row-gap: 3.5rem;
          }
          .bm-item-0 { grid-column: 1 / span 3; }
          .bm-item-1 { grid-column: 5 / span 4; }
          .bm-item-2 { grid-column: 10 / span 5; }
          .bm-item-3 { grid-column: 1 / span 3; }
          .bm-item-4 { grid-column: 5 / span 3; }
          .bm-item-5 { grid-column: 9 / span 4; }
          .bm-item-6 { grid-column: 14 / span 3; }
          .bm-item-7 { grid-column: 2 / span 4; }
          .bm-item-8 { grid-column: 7 / span 4; }
          .bm-item-9 { grid-column: 12 / span 4; }
        }

        /* 16-col Reverse Editorial Collage */
        @media (min-width: 1025px) {
          .bm-collage-grid {
            display: grid;
            grid-template-columns: repeat(16, minmax(0, 1fr));
            column-gap: 2rem;
            row-gap: 6rem;
          }
          .bm-collage-story-1 {
            grid-column: 9 / span 8;
            order: 1;
          }
          .bm-collage-story-2 {
            grid-column: 1 / span 6;
            order: 0;
            padding-top: 5rem;
          }
        }
      `}</style>

      {/* ── 0. Top USP Announcement Bar ───────────────────────────────── */}
      <div className="bm-usp-bar bg-[#141313] text-[#FFFDFA] py-2 px-4 text-center text-[11px] tracking-[0.14em] uppercase flex items-center justify-center gap-3">
        <svg
          aria-hidden="true"
          viewBox="0 0 10 11"
          width="10"
          height="10"
          fill="none"
          className="text-[#FFFDFA]/70 animate-[spin_12s_linear_infinite]"
        >
          <path
            stroke="currentColor"
            strokeWidth="0.8"
            d="M2.3 9.6L4.9 5.8M4.9 5.8L4.4 10.3M4.9 5.8L7.4 9.7M4.9 5.8L9.7 5M4.9 5.8L9.4 2.5M4.9 5.8L6.9 1.4M4.9 5.8L4.8 0M4.9 5.8L1.8 0.5M4.9 5.8L0.2 3.2M4.9 5.8L0 5.8M4.9 5.8L0.2 8.1M4.9 5.8L9 7.1"
          />
        </svg>
        <span>Free shipping across India · 48-hour dispatch · GST invoicing</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 10 11"
          width="10"
          height="10"
          fill="none"
          className="text-[#FFFDFA]/70 animate-[spin_12s_linear_infinite]"
        >
          <path
            stroke="currentColor"
            strokeWidth="0.8"
            d="M2.3 9.6L4.9 5.8M4.9 5.8L4.4 10.3M4.9 5.8L7.4 9.7M4.9 5.8L9.7 5M4.9 5.8L9.4 2.5M4.9 5.8L6.9 1.4M4.9 5.8L4.8 0M4.9 5.8L1.8 0.5M4.9 5.8L0.2 3.2M4.9 5.8L0 5.8M4.9 5.8L0.2 8.1M4.9 5.8L9 7.1"
          />
        </svg>
      </div>

      {/* ── 1. 3-Zone Sticky Navigation ───────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-[#141313]/12 bg-[#FFFDFA]/95 backdrop-blur-md transition-all">
        <div className="grid grid-cols-3 items-center px-4 py-3.5 lg:px-8">
          {/* Left Zone: Shop, Explore, Archive, Search */}
          <nav className="flex items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-[#141313]/85">
            <div className="relative">
              <button
                onClick={() =>
                  setActiveNavPanel(activeNavPanel === 'shop' ? null : 'shop')
                }
                className="flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
              >
                <span>Shop</span>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 8 8"
                  fill="none"
                  className={`transition-transform ${
                    activeNavPanel === 'shop' ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M0 7.4L3.8 0.8L7.5 7.4H0Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setActiveNavPanel(activeNavPanel === 'explore' ? null : 'explore')
                }
                className="hidden sm:flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
              >
                <span>Explore</span>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 8 8"
                  fill="none"
                  className={`transition-transform ${
                    activeNavPanel === 'explore' ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M0 7.4L3.8 0.8L7.5 7.4H0Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() =>
                  setActiveNavPanel(activeNavPanel === 'archive' ? null : 'archive')
                }
                className="hidden md:flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
              >
                <span>Archive</span>
                <svg
                  width="7"
                  height="7"
                  viewBox="0 0 8 8"
                  fill="none"
                  className={`transition-transform ${
                    activeNavPanel === 'archive' ? 'rotate-180' : ''
                  }`}
                >
                  <path d="M0 7.4L3.8 0.8L7.5 7.4H0Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
            >
              <span>Search</span>
            </button>
          </nav>

          {/* Center Zone: BESO Logo */}
          <div className="justify-self-center">
            <Link href="/" className="block">
              <img
                src="/assets/images/beso-logo-transparent.png"
                alt="BESO"
                className="h-5 w-auto object-contain"
                style={{ filter: 'brightness(0)' }}
              />
            </Link>
          </div>

          {/* Right Zone: Studio, Enquire, Saved, Bag */}
          <nav className="flex items-center justify-end gap-5 text-[12px] uppercase tracking-[0.14em] text-[#141313]/85">
            <a
              href="https://wa.me/918099952624"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline transition-colors hover:text-[#2A4EEF]"
            >
              Hyderabad Studio
            </a>

            <a
              href="https://wa.me/918099952624?text=Hello%20BESO%20Store"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-[#2A4EEF]"
            >
              Enquire
            </a>

            <button
              onClick={() => {
                setSavedCount((c) => c + 1);
                showToast('Item saved to your favourites');
              }}
              className="flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
              aria-label="Saved items"
            >
              <span className="hidden sm:inline">Saved</span>
              <svg
                viewBox="0 0 17 15"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M8.5 2.5C7 -0.5 2.5 -0.5 1 2.5C-0.5 5.5 2 9 8.5 13.5C15 9 17.5 5.5 16 2.5C14.5 -0.5 10 -0.5 8.5 2.5Z" />
              </svg>
              <span className="text-[10px] text-[#141313]/55">[{savedCount}]</span>
            </button>

            <button
              onClick={() => {
                setCartCount((c) => c + 1);
                showToast('Added to bag');
              }}
              className="flex items-center gap-1.5 transition-colors hover:text-[#2A4EEF]"
              aria-label="Bag items"
            >
              <span className="hidden sm:inline">Bag</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                <path d="M1 4H15V14H1V4ZM4 4V2C4 1 5 0 6.5 0H9.5C11 0 12 1 12 2V4" />
              </svg>
              <span className="text-[10px] text-[#141313]/55">[{cartCount}]</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-[#141313]"
              aria-label="Toggle menu"
            >
              <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                <rect width="18" height="1.5" />
                <rect y="5" width="18" height="1.5" />
                <rect y="10" width="18" height="1.5" />
              </svg>
            </button>
          </nav>
        </div>

        {/* ── Slide-Down Popover Panels ─────────────────────────────── */}
        {activeNavPanel === 'shop' && (
          <div className="border-t border-[#141313]/12 bg-[#FFFDFA] px-6 py-6 lg:px-12 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-[12px] uppercase tracking-[0.12em]">
              <Link
                href="/products"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Shop All</span>
                <span className="text-[10px] text-[#141313]/50">[79] pieces</span>
              </Link>
              <Link
                href="/products?cat=executive-chair"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Executive Chairs</span>
                <span className="text-[10px] text-[#141313]/50">[24] pieces</span>
              </Link>
              <Link
                href="/products?cat=manager-chair"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Ergonomic Mesh</span>
                <span className="text-[10px] text-[#141313]/50">[18] pieces</span>
              </Link>
              <Link
                href="/products?cat=height-adjustable-table"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Sit–Stand Desks</span>
                <span className="text-[10px] text-[#141313]/50">[15] pieces</span>
              </Link>
              <Link
                href="/products?cat=executive-table"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Executive Tables</span>
                <span className="text-[10px] text-[#141313]/50">[13] pieces</span>
              </Link>
              <Link
                href="/products?cat=visitor-chair"
                onClick={() => setActiveNavPanel(null)}
                className="group p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Visitor & Lounge</span>
                <span className="text-[10px] text-[#141313]/50">[9] pieces</span>
              </Link>
            </div>
          </div>
        )}

        {activeNavPanel === 'explore' && (
          <div className="border-t border-[#141313]/12 bg-[#FFFDFA] px-6 py-6 lg:px-12 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[12px] uppercase tracking-[0.12em]">
              <Link
                href="/products"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Furniture Films</span>
                <span className="text-[10px] text-[#141313]/50">5 4K loops</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Ergonomics Lab</span>
                <span className="text-[10px] text-[#141313]/50">Lumbar & Synchro</span>
              </Link>
              <Link
                href="/compare"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Chair Fit Guide</span>
                <span className="text-[10px] text-[#141313]/50">Height & Weight chart</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Hyderabad Flagship</span>
                <span className="text-[10px] text-[#141313]/50">Studio visits</span>
              </Link>
            </div>
          </div>
        )}

        {activeNavPanel === 'archive' && (
          <div className="border-t border-[#141313]/12 bg-[#FFFDFA] px-6 py-6 lg:px-12 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-3 gap-4 text-[12px] uppercase tracking-[0.12em]">
              <Link
                href="/products"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Limited Releases</span>
                <span className="text-[10px] text-[#141313]/50">Solid walnut & chrome</span>
              </Link>
              <Link
                href="/contact"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Commercial Fitouts</span>
                <span className="text-[10px] text-[#141313]/50">Custom B2B projects</span>
              </Link>
              <Link
                href="/products"
                onClick={() => setActiveNavPanel(null)}
                className="p-2 block hover:bg-[#141313]/5 transition-colors"
              >
                <span className="font-semibold block">Full Catalogue</span>
                <span className="text-[10px] text-[#141313]/50">All 79 archive pieces</span>
              </Link>
            </div>
          </div>
        )}

        {/* ── Slide-Down Search Overlay ─────────────────────────────── */}
        {searchOpen && (
          <div className="border-t border-[#141313]/12 bg-[#FFFDFA] px-6 py-4 lg:px-8">
            <div className="flex items-center gap-4">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search pieces by name, material, or category..."
                className="w-full bg-transparent text-[14px] uppercase tracking-[0.1em] text-[#141313] placeholder:text-[#141313]/35 focus:outline-none"
              />
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSearchOpen(false);
                }}
                className="text-[11px] uppercase tracking-[0.14em] text-[#141313]/60 hover:text-[#141313]"
              >
                Close
              </button>
            </div>
            {searchQuery.trim() && (
              <div className="mt-4 pt-3 border-t border-[#141313]/10 max-h-60 overflow-y-auto">
                <div className="text-[10px] uppercase text-[#141313]/40 tracking-wider mb-2">
                  {searchResults.length} Results
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {searchResults.slice(0, 8).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="p-2 hover:bg-black/5 rounded block"
                    >
                      <div className="text-[11px] uppercase font-medium truncate">{p.name}</div>
                      <div className="text-[10px] text-[#141313]/50">{money(p.price)}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Mobile Slide-Out Drawer ───────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#141313]/12 bg-[#FFFDFA] px-6 py-8">
            <nav className="space-y-6 text-[14px] uppercase tracking-[0.14em]">
              <div>
                <p className="text-[10px] text-[#141313]/40 tracking-widest mb-2">COLLECTIONS</p>
                <div className="space-y-2.5">
                  <Link
                    href="/products"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-medium"
                  >
                    Shop All Pieces [79]
                  </Link>
                  <Link
                    href="/products?cat=executive-chair"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-[#141313]/70"
                  >
                    Executive Chairs [24]
                  </Link>
                  <Link
                    href="/products?cat=height-adjustable-table"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-[#141313]/70"
                  >
                    Sit–Stand Desks [15]
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#141313]/40 tracking-widest mb-2">STUDIO & INFO</p>
                <div className="space-y-2.5">
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-[#141313]/70"
                  >
                    Ergonomics Lab
                  </Link>
                  <a
                    href="https://wa.me/918099952624"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#141313]/70"
                  >
                    WhatsApp Enquiries
                  </a>
                  <a href="tel:+918919317980" className="block text-[#141313]/70">
                    Call 089193 17980
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Floating notification toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#141313] text-[#FFFDFA] px-4 py-2.5 text-[11px] uppercase tracking-[0.14em] shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* ── Main StartTemplate Container ──────────────────────────────── */}
      <main className="flex flex-col gap-[9rem] lg:gap-[14.4rem] pb-[9rem] lg:pb-[14.4rem]">
        {/* ── 2. StartTemplate Hero (2-Up Split Screen) ───────────────── */}
        <section className="StartTemplate__hero relative grid grid-cols-1 md:grid-cols-2 h-[120svh] md:h-[100vh] -mt-[1px]">
          {/* Left Hero Panel (Video Loop) */}
          <div className="relative h-[60svh] md:h-full overflow-hidden bg-[#111] group">
            <video
              data-plx="0.1"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/videos/bm/light-crown-poster.jpg"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
            >
              <source src="/assets/videos/bm/light-crown.webm" type="video/webm" />
              <source src="/assets/videos/bm/light-crown.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/15" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center z-10">
              <h1
                className="text-[clamp(32px,4.6vw,56px)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                The Work Series
              </h1>
              <Link
                href="/products"
                className="bm-btn bg-[#FFFDFA] text-[#141313] hover:bg-[#141313] hover:text-[#FFFDFA]"
              >
                <span>Shop Now</span>
              </Link>
            </div>
          </div>

          {/* Right Hero Panel (Editorial Still) */}
          <div className="relative h-[60svh] md:h-full overflow-hidden bg-[#1a1a1a] group">
            <img
              data-plx="0.1"
              src="/assets/images/editorial-hero.jpg"
              alt="BESO Crown Suite"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/25 transition-opacity group-hover:bg-black/15" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center z-10">
              <h2
                className="text-[clamp(32px,4.6vw,56px)] font-bold uppercase leading-[0.94] tracking-[-0.03em] text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                Crown Ergonomic
              </h2>
              <Link
                href="/products/beso-crown-executive-chair"
                className="bm-btn bg-[#FFFDFA] text-[#141313] hover:bg-[#141313] hover:text-[#FFFDFA]"
              >
                <span>Explore</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── 3. ModuleVideoList ────────────────────────────────────────── */}
        <section className="ModuleVideoList relative w-full aspect-[5/6] sm:aspect-[16/10] lg:aspect-[16/9] overflow-hidden bg-[#0c0c0c] flex flex-col justify-center">
          {/* Main Background Video */}
          <video
            ref={videoPlayerRef}
            key={VIDEO_STORIES[activeVideoIdx].id}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={VIDEO_STORIES[activeVideoIdx].poster}
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source
              src={`${VIDEO_STORIES[activeVideoIdx].base}.webm`}
              type="video/webm"
            />
            <source
              src={`${VIDEO_STORIES[activeVideoIdx].base}.mp4`}
              type="video/mp4"
            />
          </video>

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/35 pointer-events-none" />

          {/* Top-Left Module Title */}
          <div className="absolute top-5 left-5 lg:top-8 lg:left-10 text-[13px] uppercase tracking-[0.1em] text-[#FFFDFA] font-mono z-10">
            Videos
          </div>

          {/* Sticky HUD Menu Bar */}
          <div className="sticky bottom-6 lg:bottom-10 z-20 w-full px-5 lg:px-10">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 lg:gap-12 bg-black/40 backdrop-blur-md p-3.5 border border-white/10 rounded-sm">
              {/* Left: Active Video Title */}
              <div className="text-left md:text-right text-[12px] uppercase tracking-[0.12em] text-[#FFFDFA] truncate">
                <span className="font-semibold block">
                  {VIDEO_STORIES[activeVideoIdx].title}
                </span>
                <span className="text-[10px] text-[#FFFDFA]/60 font-mono">
                  {VIDEO_STORIES[activeVideoIdx].meta}
                </span>
              </div>

              {/* Center: Row of 5 Thumbnail Selector Buttons */}
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1">
                {VIDEO_STORIES.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => selectVideo(i)}
                    className={`relative w-14 h-9 sm:w-16 sm:h-10 shrink-0 overflow-hidden rounded-sm transition-all duration-200 ${
                      activeVideoIdx === i
                        ? 'ring-2 ring-white scale-105 opacity-100'
                        : 'opacity-55 hover:opacity-90 ring-1 ring-white/20'
                    }`}
                    aria-label={`Select ${v.title}`}
                  >
                    <img
                      src={v.poster}
                      alt={v.title}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Right: View All Link */}
              <div className="text-right text-[12px] uppercase tracking-[0.14em]">
                <Link
                  href="/products"
                  className="text-[#FFFDFA] underline underline-offset-4 hover:text-[#2A4EEF] transition-colors"
                >
                  View all
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. ModuleCollectionHighlightGrid ("Latest") ───────────────── */}
        <section className="ModuleCollectionHighlightGrid px-4 lg:px-10 max-w-[1440px] mx-auto w-full">
          <div className="flex items-baseline justify-between mb-8 pb-3 bm-dotted-b">
            <h2
              className="text-[clamp(28px,3.2vw,36px)] font-bold uppercase tracking-[-0.03em]"
              style={{ fontFamily: GROTESK }}
            >
              Latest
            </h2>
            <Link
              href="/products"
              className="text-[12px] uppercase tracking-[0.14em] text-[#141313]/65 hover:text-[#2A4EEF] transition-colors underline underline-offset-4"
            >
              See all 79
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Column: Sticky Numbered List (<ol>) */}
            <div className="hidden lg:block w-[300px] shrink-0 sticky top-[96px] pt-2">
              <ol className="space-y-3.5 text-[12px] uppercase tracking-[0.08em]">
                {featuredProducts.map((p, idx) => (
                  <li
                    key={p.slug}
                    onMouseEnter={() => setHoveredProductIdx(idx)}
                    onMouseLeave={() => setHoveredProductIdx(null)}
                    className={`transition-all duration-150 py-1 border-b border-transparent ${
                      hoveredProductIdx === idx
                        ? 'text-[#2A4EEF] translate-x-1.5'
                        : 'text-[#141313]/70 hover:text-[#141313]'
                    }`}
                  >
                    <Link href={`/products/${p.slug}`} className="flex items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] text-[#141313]/40">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="truncate flex-1 font-medium">{p.name}</span>
                      <span className="font-mono text-[11px] text-[#141313]/60">
                        {money(p.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            {/* Right Column: 16-Column Asymmetric Product Cutout Grid */}
            <div className="flex-1 w-full bm-grid-16 grid grid-cols-2 sm:grid-cols-3 gap-6">
              {featuredProducts.map((p, idx) => {
                const isHovered = hoveredProductIdx === idx;
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    onMouseEnter={() => setHoveredProductIdx(idx)}
                    onMouseLeave={() => setHoveredProductIdx(null)}
                    className={`bm-item-${idx} group block relative transition-all duration-300 ${
                      isHovered ? 'scale-[1.02]' : ''
                    }`}
                  >
                    {/* Floating Product Image Cutout Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F4EE] flex items-center justify-center p-4">
                      <img
                        src={pimg(p)}
                        alt={p.name}
                        loading="lazy"
                        className="h-full w-full object-contain mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      />
                      {/* Subcategory Pill */}
                      {p.subcategory && (
                        <div className="absolute top-2.5 right-2.5 text-[9px] uppercase tracking-widest text-[#141313]/45 font-mono">
                          {p.subcategory.replace('-', ' ')}
                        </div>
                      )}
                    </div>

                    {/* Metadata Header */}
                    <div className="mt-2.5 flex items-baseline justify-between text-[10px] tracking-[0.14em] text-[#141313]/50 font-mono">
                      <span>{String(idx + 1).padStart(2, '0')}</span>
                      <span>{p.category === 'home' ? 'HOME' : 'STUDIO'}</span>
                    </div>

                    {/* Title & Price */}
                    <div className="mt-1">
                      <h3 className="truncate text-[12px] font-semibold uppercase tracking-[0.06em] text-[#141313] group-hover:text-[#2A4EEF] transition-colors">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] font-mono text-[#141313]/65">
                        {money(p.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 5. ModuleHighlightCollage (16-Column Reverse Stories) ──────── */}
        <section className="ModuleHighlightCollage px-4 lg:px-10 max-w-[1440px] mx-auto w-full">
          <div className="bm-collage-grid flex flex-col gap-14">
            {/* Story 1 (Right Side, Cols 9 to 16 in Desktop): The Atelier */}
            <div className="bm-collage-story-1 group">
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#111]">
                <img
                  data-plx="0.12"
                  src="/assets/images/editorial-workspace.jpg"
                  alt="The Atelier"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/15 pointer-events-none" />

                {/* Interactive Product Hotspot Pin */}
                <div className="absolute top-[38%] left-[52%] z-20">
                  <button
                    onClick={() => setHotspotActive(!hotspotActive)}
                    onMouseEnter={() => setHotspotActive(true)}
                    className="relative flex items-center justify-center w-7 h-7 rounded-full bg-[#FFFDFA] text-[#141313] shadow-md hover:scale-110 transition-transform"
                    aria-label="View tagged product"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2A4EEF] animate-ping absolute" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#141313] relative z-10" />
                  </button>

                  {/* Hotspot Floating Tooltip */}
                  {hotspotActive && (
                    <div
                      onMouseLeave={() => setHotspotActive(false)}
                      className="absolute top-8 left-1/2 -translate-x-1/2 w-48 bg-[#FFFDFA] p-3 shadow-xl border border-[#141313]/15 rounded-sm z-30 animate-in fade-in duration-150"
                    >
                      <div className="text-[10px] text-[#141313]/50 font-mono uppercase tracking-wider">
                        Featured Piece
                      </div>
                      <div className="text-[11px] font-bold uppercase truncate mt-0.5">
                        BESO Crown Executive
                      </div>
                      <div className="text-[11px] font-mono text-[#141313]/70 mt-0.5">
                        ₹49,990
                      </div>
                      <Link
                        href="/products/beso-crown-executive-chair"
                        className="mt-2 text-[10px] uppercase font-mono text-[#2A4EEF] underline block"
                      >
                        View Piece →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h2
                  className="text-[clamp(26px,3vw,34px)] font-bold uppercase tracking-[-0.03em]"
                  style={{ fontFamily: GROTESK }}
                >
                  The Atelier
                </h2>
                <Link href="/products" className="bm-btn">
                  <span>See all</span>
                </Link>
              </div>
              <p className="mt-1 text-[11px] text-[#141313]/55 leading-relaxed max-w-md">
                Hand-finished Italian top-grain upholstery, precision gas lifts, and 5-star
                polished alloy bases engineered for 12-hour sustained work sessions.
              </p>
            </div>

            {/* Story 2 (Left Side, Cols 1 to 6 in Desktop): Workday 2026 */}
            <div className="bm-collage-story-2 group">
              <div className="relative aspect-[3/2] w-full overflow-hidden bg-[#222]">
                <img
                  data-plx="0.1"
                  src="/assets/images/d01-hero.jpg"
                  alt="Workday 2026 Edition"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <h2
                  className="text-[clamp(24px,2.8vw,30px)] font-bold uppercase tracking-[-0.03em]"
                  style={{ fontFamily: GROTESK }}
                >
                  Edition 2026
                </h2>
                <Link href="/products" className="bm-btn">
                  <span>Explore</span>
                </Link>
              </div>
              <p className="mt-1 text-[11px] text-[#141313]/55 leading-relaxed max-w-sm">
                Clean silhouettes crafted for architectural living and modern commercial headquarters.
              </p>
            </div>
          </div>
        </section>

        {/* ── 6. ModuleGalleryList (Albums Showcase) ────────────────────── */}
        <section className="ModuleGalleryList px-4 lg:px-10 max-w-[1440px] mx-auto w-full">
          <div className="flex items-baseline justify-between mb-6 pb-3 bm-dotted-b">
            <h2
              className="text-[clamp(28px,3.2vw,36px)] font-bold uppercase tracking-[-0.03em]"
              style={{ fontFamily: GROTESK }}
            >
              Gallery
            </h2>
            <Link
              href="/products"
              className="text-[12px] uppercase tracking-[0.14em] text-[#141313]/65 hover:text-[#2A4EEF] transition-colors underline underline-offset-4"
            >
              Have a look
            </Link>
          </div>

          <ul className="divide-y divide-dotted divide-[#141313]/25">
            {GALLERY_ALBUMS.map((album) => (
              <li key={album.slug} className="group">
                <Link
                  href="/products"
                  className="py-4.5 px-2 flex flex-col md:grid md:grid-cols-[4fr_2fr_9fr_1fr] items-baseline md:items-center gap-3 transition-opacity duration-200 opacity-60 hover:opacity-100"
                >
                  {/* Column 1: Album Title */}
                  <h3
                    className="text-[14px] md:text-[15px] font-bold uppercase tracking-[0.06em] text-[#141313]"
                    style={{ fontFamily: GROTESK }}
                  >
                    {album.title}
                  </h3>

                  {/* Column 2: Image Count */}
                  <span className="text-[11px] font-mono uppercase tracking-[0.1em] text-[#141313]/50">
                    {album.count}
                  </span>

                  {/* Column 3: Horizontal Thumbnail Strip (expands on hover) */}
                  <div className="w-full overflow-hidden">
                    <div className="flex items-center gap-2 overflow-x-auto py-1">
                      {album.thumbs.map((thumb, tIdx) => (
                        <div
                          key={tIdx}
                          className="h-[48px] w-[34px] shrink-0 bg-[#f0eee9] overflow-hidden rounded-[1px] transition-transform duration-200 group-hover:scale-105"
                        >
                          <img
                            src={thumb}
                            alt=""
                            loading="lazy"
                            className="h-full w-full object-cover mix-blend-multiply opacity-85 group-hover:opacity-100"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 4: Year */}
                  <span className="text-right text-[11px] font-mono text-[#141313]/40 hidden md:block">
                    {album.year}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* ── 7. Stacked 4-Column Footer ───────────────────────────────── */}
        <footer className="Footer bg-[#141313] text-[#FFFDFA] border-t border-[#141313]/20 pt-16 pb-12 px-5 lg:px-12 mt-12">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 text-[12px]">
            {/* Col 1: About Brand Bio */}
            <div>
              <h2
                className="text-[16px] font-bold uppercase tracking-[0.08em] mb-4 text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                Since 2021
              </h2>
              <p className="text-[12px] leading-relaxed text-[#FFFDFA]/65 font-mono">
                Created and shaped by the demands of modern architects, engineers, and founders.
                From our flagship showroom in Abids, Hyderabad, we design and distribute commercial-grade
                ergonomic seating and sit-stand desks across India.
              </p>
              <div className="mt-6 pt-4 border-t border-[#FFFDFA]/15 text-[11px] text-[#FFFDFA]/50 font-mono space-y-1">
                <div>5-8-91/5, Mahesh Nagar Colony</div>
                <div>Abids, Hyderabad 500001, Telangana</div>
                <div className="pt-2 text-[#FFFDFA]/70">
                  <a href="tel:+918919317980" className="hover:underline">089193 17980</a> ·{' '}
                  <a href="https://wa.me/918099952624" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Col 2: Newsletter Sign-up */}
            <div>
              <h2
                className="text-[16px] font-bold uppercase tracking-[0.08em] mb-4 text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                Newsletter sign up
              </h2>
              <p className="text-[12px] leading-relaxed text-[#FFFDFA]/65 font-mono mb-4">
                Sign up to our journal to receive trade release notes, product updates, and architecture tours.
              </p>

              {newsletterSubscribed ? (
                <div className="p-3 bg-white/10 text-[11px] font-mono text-[#FFFDFA] uppercase tracking-wider">
                  ✓ You are on the BESO list.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim() && newsletterTerms) {
                      setNewsletterSubscribed(true);
                      showToast('Subscribed to the BESO letter');
                    }
                  }}
                  className="space-y-3"
                >
                  <div className="border-b border-[#FFFDFA]/40 focus-within:border-white">
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="ENTER EMAIL"
                      className="w-full bg-transparent py-2.5 text-[12px] uppercase font-mono tracking-[0.1em] text-[#FFFDFA] placeholder:text-[#FFFDFA]/30 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!newsletterTerms}
                    className="bm-btn w-full py-2 bg-[#FFFDFA] text-[#141313] hover:bg-white/90 disabled:opacity-40"
                  >
                    <span>Subscribe</span>
                  </button>
                  <label className="flex items-center gap-2 text-[10px] font-mono text-[#FFFDFA]/60 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={newsletterTerms}
                      onChange={(e) => setNewsletterTerms(e.target.checked)}
                      className="accent-[#2A4EEF]"
                    />
                    <span>I accept the privacy terms & commercial updates</span>
                  </label>
                </form>
              )}
            </div>

            {/* Col 3: Customer Service */}
            <div>
              <h2
                className="text-[16px] font-bold uppercase tracking-[0.08em] mb-4 text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                Customer Service
              </h2>
              <ul className="space-y-2.5 text-[12px] text-[#FFFDFA]/70 font-mono">
                <li>
                  <a
                    href="https://wa.me/918099952624?text=Order%20Enquiry"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    Order Support & Tracking
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                    GST Invoicing & Bulk Orders
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                    7-Year Mechanical Warranty
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                    Claims & Spare Casters
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                    Hyderabad Studio Appointments
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Information, Social & Payment */}
            <div>
              <h2
                className="text-[16px] font-bold uppercase tracking-[0.08em] mb-4 text-[#FFFDFA]"
                style={{ fontFamily: GROTESK }}
              >
                Information
              </h2>
              <ul className="space-y-2.5 text-[12px] text-[#FFFDFA]/70 font-mono">
                <li>
                  <Link href="/about" className="hover:text-white hover:underline transition-colors">
                    About BESO
                  </Link>
                </li>
                <li>
                  <Link href="/compare" className="hover:text-white hover:underline transition-colors">
                    Ergonomic Compare Tool
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                    Commercial Terms
                  </Link>
                </li>
                <li>
                  <a
                    href="https://wa.me/918099952624"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white hover:underline transition-colors"
                  >
                    Direct WhatsApp Chat
                  </a>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-[#FFFDFA]/15">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#FFFDFA]/45 block mb-2">
                  Payment
                </span>
                <p className="text-[11px] font-mono text-[#FFFDFA]/60">
                  UPI · Razorpay · Net Banking · GST Input Credit
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Currency Bar */}
          <div className="max-w-[1440px] mx-auto mt-12 pt-6 border-t border-[#FFFDFA]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#FFFDFA]/50 uppercase tracking-[0.14em]">
            <div className="flex items-center gap-3">
              <span className="text-[#FFFDFA]/80">India (INR ₹)</span>
              <span>·</span>
              <span>GSTIN: 36AABCU9603R1ZM</span>
            </div>
            <div>
              © 2026 BESO FURNITURE SPACE. ALL RIGHTS RESERVED.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
