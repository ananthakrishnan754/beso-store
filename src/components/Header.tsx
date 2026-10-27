'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const NAV_ITEMS = [
  {label: 'Office', href: '/products?category=office'},
  {label: 'All Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
  {label: 'Compare', href: '/compare'},
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const {cartCount, openDrawer} = useCart();
  const [isDark, setIsDark] = useState(true);

  // Sync state with DOM on mount
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark-obsidian-oak';
    const isDarkTheme = currentTheme === 'dark-obsidian-oak' || document.documentElement.classList.contains('dark');
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);

    const root = document.documentElement;
    const themeName = nextDark ? 'dark-obsidian-oak' : 'oak-clean-modern';
    const themeColor = nextDark ? '#060504' : '#f5eee3';
    const colorScheme = nextDark ? 'dark' : 'light';

    root.setAttribute('data-theme', themeName);
    if (nextDark) {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    root.style.colorScheme = colorScheme;

    try {
      localStorage.setItem('beso-theme', themeName);
    } catch {}

    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', themeColor);
    }
  };

  return (
    <>
      {/* ─── Top Location Announcement Bar ─── */}
      <aside aria-label="Flagship Showroom location" className="fixed top-0 inset-x-0 z-50 bg-[#140D08] dark:bg-[#080503] text-white/95 h-7 flex items-center justify-center px-4 text-[11px] font-medium tracking-wide shadow-sm border-b border-white/10 backdrop-blur-md">
        <div className="max-w-7xl w-full flex items-center justify-between text-white/95">
          <div className="flex items-center gap-2 truncate text-white/95">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0 ring-2 ring-accent/30 shadow-[0_0_8px_rgb(var(--accent-rgb))]" />
            <span className="truncate text-white/90">
              <strong className="font-semibold text-white">Flagship Showroom:</strong> 42, 100 Feet Road, Indiranagar, Bengaluru
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0 text-white/70 text-[10px]">
            <span>Mon–Sat: 10:00 AM – 8:00 PM</span>
            <span className="text-white/30">|</span>
            <a
              href="https://maps.google.com/?q=Indiranagar+Bangalore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-2 hover:underline font-bold"
            >
              Get Directions ↗
            </a>
          </div>
        </div>
      </aside>

      <header className="glass-header fixed top-9 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl h-14 rounded-full px-6 flex items-center justify-between">
        <div className="w-full flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 mr-2 rounded-full bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 backdrop-blur-md"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {mobileOpen ? (
                <path
                  d="M5 5L15 15M5 15L15 5"
                />
              ) : (
                <path
                  d="M2 5H18M2 10H18M2 15H18"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group" aria-label="BESO home">
            <span className="site-logo" role="img" aria-label="BESO" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="header-link text-xs font-semibold uppercase tracking-wider text-ink/75 hover:text-accent transition-colors duration-200 py-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/15 text-ink/80 hover:text-ink border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm transition-all duration-200"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {isDark ? (
                /* Sun Icon (warm amber) */
                <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                /* Moon Icon */
                <svg className="w-4 h-4 text-ink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Search icon */}
            <Link
              href="/products"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/15 text-ink/80 hover:text-ink border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm transition-all duration-200"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={() => openDrawer('cart')}
              className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/15 text-ink/80 hover:text-ink border border-white/60 dark:border-white/10 backdrop-blur-md shadow-sm transition-all duration-200"
              aria-label="Cart"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[0.6rem] font-bold bg-accent text-white rounded-full min-w-[1.1rem] h-4 px-1 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-[4.75rem] left-4 right-4 rounded-3xl border border-white/80 dark:border-white/15 bg-white/90 dark:bg-[#160E09]/95 backdrop-blur-2xl shadow-2xl p-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-ink/80 hover:text-accent font-semibold transition-colors"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-3 border-t border-line/10 flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Theme Mode</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/80 dark:border-white/15 bg-white/70 dark:bg-white/10 backdrop-blur-md text-xs font-bold text-ink shadow-sm"
              >
                <span>{isDark ? '☀️ Switch to Light' : '🌙 Switch to Dark'}</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="site-header-spacer h-24 pointer-events-none" />
    </>
  );
}
