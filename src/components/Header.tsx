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
      <header className="glass-header fixed top-0 left-0 right-0 z-50 h-16 flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-8 h-8"
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
          <Link href="/" className="font-bold text-lg tracking-tight text-white">
            BESO
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Search icon */}
            <Link
              href="/products"
              className="flex items-center justify-center w-8 h-8"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </Link>

            {/* Cart */}
            <button className="relative flex items-center justify-center w-8 h-8" aria-label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -bottom-0.5 -right-0.5 text-[0.6rem] font-bold bg-white text-beso-dark rounded-full min-w-[1rem] h-4 flex items-center justify-center">
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
      <div className="h-16" />
    </>
  );
}
