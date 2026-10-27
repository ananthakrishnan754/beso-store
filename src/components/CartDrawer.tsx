'use client';

import React, { useMemo } from 'react';
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

function assetUrl(p?: string): string {
  if (!p) return '/assets/images/products/executive-chair-01.jpg';
  return p.startsWith('/') ? p : `/${p}`;
}

// ─── Module 1: Cart Item Card ────────────────────────────────────────────────
interface CartItemCardProps {
  item: {
    id: number;
    name: string;
    slug: string;
    price: number;
    quantity: number;
    image?: string;
  };
  onUpdateQuantity: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}

export function CartItemCard({ item, onUpdateQuantity, onRemove, onClose }: CartItemCardProps) {
  return (
    <div className="group relative flex gap-3.5 p-3.5 rounded-2xl border border-white/80 dark:border-white/10 bg-white/80 dark:bg-[#1D140D]/85 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.04),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-accent/40 transition-all duration-200">
      <div className="w-20 h-20 rounded-xl bg-[#F5EFE6] dark:bg-[#140D08] overflow-hidden shrink-0 flex items-center justify-center border border-white/60 dark:border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assetUrl(item.image)}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/products/${item.slug}`}
              onClick={onClose}
              className="font-bold text-xs sm:text-sm text-ink truncate hover:text-accent transition-colors leading-snug"
            >
              {item.name}
            </Link>
            <button
              onClick={() => onRemove(item.id)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-ink/40 hover:text-rose-500 hover:bg-rose-500/10 text-xs transition-colors shrink-0"
              title="Remove item"
              aria-label="Remove item"
            >
              ✕
            </button>
          </div>
          <div className="text-xs font-extrabold text-accent mt-0.5">
            {formatPrice(item.price)}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center rounded-xl overflow-hidden border border-white/80 dark:border-white/10 bg-white/90 dark:bg-[#120B07] shadow-sm">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-ink/65 hover:text-ink hover:bg-ink/5 active:scale-95 transition-all"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="w-7 text-center text-xs font-bold text-ink select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-xs font-bold text-ink/65 hover:text-ink hover:bg-ink/5 active:scale-95 transition-all"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <span className="text-xs font-bold text-ink">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Module 2: Recommendations Card Module ──────────────────────────────────
interface CartRecommendationsProps {
  recommendations: any[];
  onAddToCart: (product: any, qty: number) => void;
  onClose: () => void;
}

export function CartRecommendations({ recommendations, onAddToCart, onClose }: CartRecommendationsProps) {
  if (recommendations.length === 0) return null;

  return (
    <div className="pt-2 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-ink/75">
            Customers Also Liked
          </h3>
        </div>
        <span className="text-[10px] text-accent font-semibold">4.8★ Rated</span>
      </div>

      <div className="space-y-2">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-center justify-between gap-3 p-2.5 rounded-2xl border border-white/70 dark:border-white/10 bg-white/60 dark:bg-[#1A120B]/60 backdrop-blur-md hover:border-accent/40 transition-all group"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] dark:bg-[#140D08] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={assetUrl(rec.image)}
                  alt={rec.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="min-w-0">
                <Link
                  href={`/products/${rec.slug}`}
                  onClick={onClose}
                  className="font-bold text-xs text-ink truncate block hover:text-accent transition-colors"
                >
                  {rec.name}
                </Link>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[11px] font-bold text-accent">
                    {formatPrice(rec.price)}
                  </span>
                  <span className="text-[10px] text-amber-500 font-semibold">
                    ★ {rec.rating}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(rec, 1)}
              className="px-3 py-1.5 rounded-full bg-ink/5 dark:bg-white/10 hover:bg-accent hover:text-white text-ink text-[11px] font-bold tracking-wider uppercase transition-all shrink-0 border border-white/60 dark:border-white/10 shadow-sm"
            >
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Module 3: Summary & Checkout Module ────────────────────────────────────
interface CartSummaryModuleProps {
  subtotal: number;
  checkoutHref: string;
  onClose: () => void;
}

export function CartSummaryModule({ subtotal, checkoutHref, onClose }: CartSummaryModuleProps) {
  return (
    <div className="p-4 sm:p-5 border-t border-white/70 dark:border-white/10 bg-white/75 dark:bg-[#160E09]/90 backdrop-blur-2xl space-y-3.5">
      <div className="space-y-2 p-3.5 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10">
        <div className="flex items-center justify-between text-xs text-ink/75">
          <span>Shipping</span>
          <span className="font-bold text-accent flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Pan-India Delivery
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold text-ink">Subtotal</span>
          <span className="font-black text-ink text-lg text-accent">
            {formatPrice(subtotal)}
          </span>
        </div>
        <p className="text-[10px] text-ink/50 leading-tight">
          Contract-grade packaging. On-site white-glove assembly scheduled upon delivery.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={onClose}
          className="py-3 px-4 rounded-full border border-white/80 dark:border-white/15 bg-white/70 dark:bg-white/5 text-xs font-bold text-ink hover:bg-white/90 dark:hover:bg-white/10 transition-all text-center shadow-sm"
        >
          Keep Shopping
        </button>
        <a
          href={checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          className="py-3 px-4 rounded-full bg-accent hover:bg-accent-2 text-white text-xs font-extrabold uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5 shadow-lg shadow-accent/25 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Order via WhatsApp</span>
          <span>→</span>
        </a>
      </div>
    </div>
  );
}

// ─── Module 4: Empty State Card Module ──────────────────────────────────────
export function EmptyCartState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-14 px-6 space-y-4 my-auto">
      <div className="w-20 h-20 mx-auto rounded-3xl border border-white/80 dark:border-white/15 bg-white/70 dark:bg-[#1A120B]/80 backdrop-blur-xl flex items-center justify-center text-3xl shadow-sm">
        🛍️
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-ink tracking-tight">Your bag is empty</h3>
        <p className="text-xs text-ink/60 max-w-xs mx-auto leading-relaxed">
          Explore our BIFMA-certified ergonomic seating and dual-motor desking systems tailored for contract endurance.
        </p>
      </div>
      <Link
        href="/products"
        onClick={onClose}
        className="inline-block mt-2 px-7 py-3 rounded-full bg-ink text-app text-xs font-extrabold uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        Browse Flagship Collection →
      </Link>
    </div>
  );
}

// ─── Main CartDrawer Component (Modular Card Architecture) ──────────────────
export function CartDrawer() {
  const {
    cart,
    cartCount,
    drawerOpen,
    drawerMode,
    closeDrawer,
    removeFromCart,
    updateQuantity,
    addToCart,
    lastAddedItem,
  } = useCart();

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  // Find complementary recommendations
  const recommendations = useMemo(() => {
    const all = products as any[];
    const excludeIds = new Set([
      ...cart.map((c) => c.id),
      lastAddedItem?.id,
    ].filter(Boolean));

    const sorted = [...all]
      .filter((p) => !excludeIds.has(p.id))
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);

    if (lastAddedItem) {
      const isChair = lastAddedItem.subcategory?.includes('chair');
      const complementary = sorted.filter((p) =>
        isChair ? p.subcategory?.includes('table') : p.subcategory?.includes('chair')
      );
      if (complementary.length >= 3) {
        return complementary.slice(0, 3);
      }
    }

    return sorted.slice(0, 3);
  }, [cart, lastAddedItem]);

  if (!drawerOpen) return null;

  const checkoutMessage = encodeURIComponent(
    `Hi BESO! I want to order from my cart:\n` +
      cart.map((item) => `- ${item.name} (Qty: ${item.quantity}) - ${formatPrice(item.price * item.quantity)}`).join('\n') +
      `\nTotal: ${formatPrice(subtotal)}\nPlease arrange delivery to my address.`
  );
  const checkoutHref = `https://wa.me/918099952624?text=${checkoutMessage}`;

  return (
    <div className="fixed inset-0 z-50 p-2 sm:p-5 flex justify-end items-stretch pointer-events-none">
      {/* Dimmed backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity pointer-events-auto"
        onClick={closeDrawer}
      />

      {/* ─── Floating Modular Card Container ─── */}
      <div className="relative pointer-events-auto w-full max-w-md h-full rounded-[2rem] sm:rounded-[2.5rem] border border-white/85 dark:border-white/15 bg-white/90 dark:bg-[#140D08]/95 backdrop-blur-3xl shadow-[0_28px_80px_rgba(79,49,20,0.18),_inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_32px_90px_rgba(0,0,0,0.85),_inset_0_1px_0_rgba(255,255,255,0.14)] flex flex-col z-10 overflow-hidden animate-fade-in">
        {/* Module Header Card */}
        <div className="p-4 sm:p-5 border-b border-white/70 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-[#18100B]/80 backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            {drawerMode === 'added-confirmation' ? (
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-xs font-black shadow-sm">
                ✓
              </span>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent-rgb)/0.5)]" />
            )}
            <h2 className="font-serif font-bold text-base text-ink tracking-tight">
              {drawerMode === 'added-confirmation' ? 'Added to Bag' : 'Your Shopping Bag'}
            </h2>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-accent/15 text-accent font-bold border border-accent/20">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/60 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 text-ink/70 hover:text-ink border border-white/80 dark:border-white/15 backdrop-blur-md shadow-sm transition-all"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Items & Modules */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <EmptyCartState onClose={closeDrawer} />
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                  onClose={closeDrawer}
                />
              ))}
            </div>
          )}

          {/* Module: Complementary Recommendations */}
          {cart.length > 0 && recommendations.length > 0 && (
            <CartRecommendations
              recommendations={recommendations}
              onAddToCart={addToCart}
              onClose={closeDrawer}
            />
          )}
        </div>

        {/* Module: Summary & WhatsApp Checkout Footer Card */}
        {cart.length > 0 && (
          <CartSummaryModule
            subtotal={subtotal}
            checkoutHref={checkoutHref}
            onClose={closeDrawer}
          />
        )}
      </div>
    </div>
  );
}
