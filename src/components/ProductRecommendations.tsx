'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import products from '@/data/products.json';

interface ProductRecommendationsProps {
  currentProductId: number;
  category: string;
  subcategory: string;
}

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

export function ProductRecommendations({
  currentProductId,
  category,
  subcategory,
}: ProductRecommendationsProps) {
  const { addToCart } = useCart();
  const all = products as any[];

  // 1. Similar Products (same subcategory or category) - Myntra style
  const similarProducts = React.useMemo(() => {
    const inSub = all.filter(
      (p) => p.subcategory === subcategory && p.id !== currentProductId
    );
    if (inSub.length >= 4) return inSub.slice(0, 6);

    const inCat = all.filter(
      (p) => p.category === category && p.id !== currentProductId && !inSub.includes(p)
    );
    return [...inSub, ...inCat].slice(0, 6);
  }, [all, subcategory, category, currentProductId]);

  // 2. Customers Also Liked (Complementary cross-category pairing)
  const customersAlsoLiked = React.useMemo(() => {
    const isChair = subcategory.includes('chair') || subcategory === 'sofa' || subcategory.includes('stool');
    const complementary = all.filter(
      (p) =>
        p.id !== currentProductId &&
        (isChair ? p.subcategory.includes('table') : p.subcategory.includes('chair'))
    );

    // Sort by rating desc
    return complementary
      .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
      .slice(0, 4);
  }, [all, subcategory, currentProductId]);

  return (
    <div className="space-y-20 mt-20 border-t border-line/10 pt-16">
      {/* ─── Rail 1: Similar Products (Like Myntra) ─── */}
      {similarProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                Comparative Fits
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
                Similar Products Like This
              </h3>
              <p className="text-xs sm:text-sm text-ink/50 mt-1">
                Compare materials, warranty, and pricing within this ergonomic profile.
              </p>
            </div>
            <Link
              href={`/products?subcategory=${subcategory}`}
              className="text-xs font-bold text-accent hover:underline uppercase tracking-wider hidden sm:block"
            >
              View All {subcategory.replace(/-/g, ' ')} →
            </Link>
          </div>

          {/* Horizontal scroll container with snap */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {similarProducts.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="group relative rounded-2xl bg-surface border border-line/8 overflow-hidden hover:border-line/20 hover:shadow-card-hover transition-all flex flex-col"
              >
                {/* Image */}
                <div className="relative aspect-square bg-[#F4EFE6] overflow-hidden flex items-center justify-center">
                  <Link href={`/products/${p.slug}`} className="absolute inset-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetUrl(p.image)}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {p.badge && (
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-ink/10 text-ink backdrop-blur-sm">
                      {p.badge}
                    </span>
                  )}

                  {/* Instant Add to Cart button */}
                  <button
                    type="button"
                    onClick={() => addToCart(p, 1)}
                    className="absolute bottom-2.5 inset-x-2.5 py-2 rounded-full bg-ink text-app text-[11px] font-bold uppercase tracking-wider shadow-md opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 hover:bg-accent hover:text-white"
                  >
                    <span>+ Add to Cart</span>
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-ink/40 uppercase tracking-wider block">
                      {p.subcategory.replace(/-/g, ' ')}
                    </span>
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-bold text-sm text-ink hover:text-accent transition-colors line-clamp-1 mt-0.5"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-ink/50 line-clamp-1 mt-0.5">{p.tagline}</p>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-line/6">
                    <div>
                      <span className="font-extrabold text-sm text-ink block">
                        {formatPrice(p.price)}
                      </span>
                      {p.originalPrice && (
                        <span className="text-[10px] text-ink/35 line-through">
                          {formatPrice(p.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                      ★ {p.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── Rail 2: Customers Also Liked (Cross-Pairing Based on Reviews) ─── */}
      {customersAlsoLiked.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                Frequently Bought Together
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-ink tracking-tight">
                Customers Also Liked
              </h3>
              <p className="text-xs sm:text-sm text-ink/50 mt-1">
                Complementary ergonomic furnishings highly rated by customers.
              </p>
            </div>
            <span className="text-xs font-bold text-accent hidden sm:block">
              ✓ Verified Workspace Pairings
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {customersAlsoLiked.map((item) => (
              <div
                key={item.id}
                className="group rounded-2xl bg-gradient-to-b from-surface to-surfaceSubtle border border-line/8 hover:border-accent/30 transition-all p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl bg-[#F4EFE6] overflow-hidden mb-3">
                    <Link href={`/products/${item.slug}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={assetUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-amber-400 text-[10px] font-bold flex items-center gap-1">
                      ★ {item.rating}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    {item.subcategory.replace(/-/g, ' ')}
                  </span>
                  <Link
                    href={`/products/${item.slug}`}
                    className="font-bold text-sm text-ink hover:text-accent transition-colors line-clamp-1 mt-0.5 block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-ink/50 line-clamp-1 mt-0.5">{item.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-line/6 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-sm font-extrabold text-ink block">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(item, 1)}
                    className="px-3.5 py-1.5 rounded-full bg-ink text-app text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    + Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
