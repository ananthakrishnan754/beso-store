'use client';

import Link from 'next/link';
import {useState} from 'react';

const NAV_ITEMS = [
  {label: 'Office', href: '/products?category=office'},
  {label: 'Home', href: '/products?category=home'},
  {label: 'All Products', href: '/products'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
  {label: 'Compare', href: '/compare'},
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(0);

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl h-14 rounded-full border border-white/10 bg-black/60 backdrop-blur-md px-6 flex items-center justify-between shadow-2xl transition-all duration-300">
        <div className="w-full flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8 mr-2"
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path
                  d="M5 5L15 15M5 15L15 5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M2 5H18M2 10H18M2 15H18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="font-extrabold text-xl tracking-tighter text-white flex items-center gap-1.5 group">
            <span className="w-6.5 h-6.5 rounded-lg bg-beso-lime text-beso-dark flex items-center justify-center font-black text-sm tracking-normal shadow-[0_0_12px_rgba(163,230,53,0.4)] group-hover:scale-105 transition-transform duration-300">B</span>
            <span className="group-hover:text-beso-lime transition-colors duration-300">BESO</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-beso-lime after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left after:duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Search icon */}
            <Link
              href="/products"
              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors duration-300"
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            {/* Cart */}
            <button className="relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors duration-300" aria-label="Cart">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 text-[0.6rem] font-bold bg-white text-beso-dark rounded-full min-w-[1rem] h-4 flex items-center justify-center">
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
          <nav className="absolute top-16 left-0 right-0 bg-beso-dark border-b border-white/[0.06] p-6 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-lg text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
