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

  // Find recommendations based on reviews & category
  const recommendations = useMemo(() => {
    const all = products as any[];
    const excludeIds = new Set([
      ...cart.map((c) => c.id),
      lastAddedItem?.id,
    ].filter(Boolean));

    // Sort by rating desc & reviews desc
    const sorted = [...all]
      .filter((p) => !excludeIds.has(p.id))
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);

    // If we have a last added item, prioritize complementary category (chairs <-> tables)
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-md bg-app text-ink h-full shadow-2xl flex flex-col z-10 border-l border-line/10 animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-line/10 flex items-center justify-between bg-surfaceSubtle">
          <div className="flex items-center gap-2">
            {drawerMode === 'added-confirmation' ? (
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                ✓
              </span>
            ) : null}
            <h2 className="font-bold text-base text-ink">
              {drawerMode === 'added-confirmation' ? 'Added to Bag' : 'Your Shopping Bag'}
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-ink/5 text-ink/60 font-semibold">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeDrawer}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-ink/5 text-ink/60 hover:text-ink transition-colors"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Cart Items */}
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-ink/5 flex items-center justify-center text-2xl text-ink/40">
                🛍️
              </div>
              <p className="text-base font-semibold text-ink">Your bag is empty</p>
              <p className="text-xs text-ink/50 max-w-xs mx-auto">
                Discover our ergonomic chairs and height-adjustable desks tailored for serious work.
              </p>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="inline-block mt-2 px-6 py-2.5 rounded-full bg-ink text-app text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Browse Collection
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-surface border border-line/8 hover:border-line/15 transition-all"
                >
                  <div className="w-20 h-20 rounded-xl bg-surfaceSubtle overflow-hidden shrink-0 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetUrl(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/products/${item.slug}`}
                          onClick={closeDrawer}
                          className="font-semibold text-sm text-ink truncate hover:text-beso-lime transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-ink/40 hover:text-rose-500 text-xs transition-colors p-0.5"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="text-xs font-bold text-ink mt-0.5">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-line/15 rounded-lg overflow-hidden bg-app">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-ink/60 hover:text-ink hover:bg-ink/5"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-ink">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-ink/60 hover:text-ink hover:bg-ink/5"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-ink/70">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recommendations based on reviews / customers also liked */}
          {recommendations.length > 0 && (
            <div className="pt-4 border-t border-line/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-beso-lime block">
                    Frequently Paired
                  </span>
                  <h3 className="text-sm font-bold text-ink">Customers Also Liked</h3>
                </div>
                <span className="text-[10px] text-ink/45">Based on 4.8★ reviews</span>
              </div>

              <div className="space-y-2.5">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-surface border border-line/8 hover:border-brandLime/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-surfaceSubtle overflow-hidden shrink-0">
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
                          onClick={closeDrawer}
                          className="font-medium text-xs text-ink truncate block hover:text-beso-lime transition-colors"
                        >
                          {rec.name}
                        </Link>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[11px] font-bold text-ink">
                            {formatPrice(rec.price)}
                          </span>
                          <span className="text-[10px] text-amber-500 font-semibold flex items-center">
                            ★ {rec.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(rec, 1)}
                      className="px-3 py-1.5 rounded-full bg-ink/5 hover:bg-ink text-ink hover:text-app text-[11px] font-bold tracking-wider uppercase transition-all shrink-0"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-line/10 bg-surfaceSubtle space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-ink/60">
                <span>Shipping</span>
                <span className="font-bold text-accent">FREE Pan-India</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-ink">Subtotal</span>
                <span className="font-extrabold text-ink text-base">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-[10px] text-ink/40">
                Taxes included. White-glove assembly scheduled upon dispatch.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={closeDrawer}
                className="py-3 px-4 rounded-full border border-line/15 text-xs font-bold text-ink/80 hover:text-ink hover:bg-ink/5 transition-all text-center"
              >
                Continue Shopping
              </button>
              <a
                href={checkoutHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-full bg-ink text-app text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-opacity text-center flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Checkout</span>
                <span>→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
