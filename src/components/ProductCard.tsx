"use client";

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  tagline: string;
  rating: number;
  reviews: number;
  sku: string;
  image?: string;
  images?: string[];
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

function SubcategoryIcon({subcategory}: {subcategory: string}) {
  const icons: Record<string, string> = {
    'executive-chair': '\u{1FA91}',
    'manager-chair': '\u{1FA91}',
    'staff-chair': '\u{1FA91}',
    'visitor-chair': '\u{1FA91}',
    'gaming-chair': '\u{1F3AE}',
    'executive-table': '\u{1F4BB}',
    'manager-table': '\u{1F4BB}',
    'staff-table': '\u{1F4BB}',
    'height-adjustable-table': '\u2728',
    'bar-stool': '\u{1F37F}',
    'center-table': '\u2615',
    'dining-chair': '\u{1F37D}\uFE0F',
    sofa: '\u{1F6CB}\uFE0F',
  };
  return <span>{icons[subcategory] || '\u{1F4E6}'}</span>;
}

function getShortName(name: string) {
  const keywords = name.replace(/^(BESO|EZEEBEE)\s+/i, '').split(' ');
  return keywords[0] || name;
}

export function ProductCard({product}: {product: Product}) {
  const { addToCart, toggleWishlist, isInWishlist, toggleCompare, isInCompare } = useCart();
  const wishlisted = isInWishlist(product.id);
  const compared = isInCompare(product.id);

  const imageSrc = product.image
    ? product.image.startsWith('/')
      ? product.image
      : '/' + product.image
    : null;

  return (
    <div className="product-card group relative block">
      {/* Image area */}
      <div className="product-image aspect-square bg-[#F4EFE6] flex items-center justify-center relative overflow-hidden rounded-2xl">
        <Link href={`/products/${product.slug}`} className="absolute inset-0 z-0">
          {imageSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageSrc}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 product-img-element"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.fallback-icon') as HTMLElement;
                  if (fallback) fallback.style.display = 'block';
                }
              }}
            />
          ) : null}

          <div
            className="fallback-icon text-6xl group-hover:scale-105 transition-transform duration-300"
            style={imageSrc ? { display: 'none' } : undefined}
          >
            <SubcategoryIcon subcategory={product.subcategory} />
          </div>
        </Link>

        {/* Badge or Compare Pin */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {product.badge && (
            <span
              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                product.badge === 'sale'
                  ? 'badge-sale'
                  : product.badge === 'hot'
                    ? 'badge-hot'
                    : 'bg-ink/10 text-ink backdrop-blur-sm'
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Compare Button (Top Left) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              compared
                ? 'bg-accent text-white shadow-md font-bold'
                : 'bg-white/80 hover:bg-white text-ink/70 hover:text-ink shadow-sm'
            }`}
            title={compared ? 'In compare list (Click to remove)' : 'Add to compare'}
            aria-label="Compare product"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>
        </div>

        {/* Wishlist Heart Button (Top Right) */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            wishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-ink/60 hover:text-rose-500 shadow-sm'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 fill-current"
            stroke="currentColor"
            strokeWidth={wishlisted ? '0' : '2'}
            fill={wishlisted ? 'currentColor' : 'none'}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>

        {/* ─── Hover Overlay Action Bar: Add to Cart, Compare, Wishlist ─── */}
        <div className="absolute inset-x-2.5 bottom-2.5 z-10 hidden sm:flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
          {/* Add to Cart button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-ink text-app text-[11px] font-bold uppercase tracking-wider shadow-lg hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-1.5"
            title="Add to Cart"
          >
            <span>+ Add to Cart</span>
          </button>

          {/* Quick Compare button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`p-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center justify-center ${
              compared
                ? 'bg-accent text-white font-bold'
                : 'bg-white/95 text-ink hover:bg-white'
            }`}
            title={compared ? 'Remove from compare' : 'Compare product'}
            aria-label="Compare"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>

          {/* Quick Wishlist button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-xl text-xs font-semibold shadow-lg transition-all flex items-center justify-center ${
              wishlisted
                ? 'bg-rose-500 text-white'
                : 'bg-white/95 text-ink hover:bg-white hover:text-rose-500'
            }`}
            title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-label="Wishlist"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" stroke="currentColor" strokeWidth={wishlisted ? '0' : '2'} fill={wishlisted ? 'currentColor' : 'none'}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info - Desktop: full details, Mobile: compact */}
      <div className="p-4">
        {/* Subcategory label - hidden on mobile */}
        <p className="hidden sm:block text-[10px] text-ink/60 uppercase tracking-wider mb-1">
          {product.subcategory.replace(/-/g, ' ')}
        </p>

        {/* Product name — serif display voice for character */}
        <h3 className="card-title font-display text-base font-semibold text-ink mb-1 line-clamp-1 group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Tagline - always visible */}
        <p className="text-xs text-ink/55 mb-3 line-clamp-1">
          {product.tagline}
        </p>

        {/* Price + stars - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2 mt-2">
          <span className="product-price text-base font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-ink/30 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-2 mt-2">
          <span className="text-[#D97706] text-sm">
            {'\u2605'.repeat(Math.floor(product.rating))}
          </span>
          <span className="text-xs font-medium text-ink/60">({product.reviews})</span>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden flex items-center justify-between mt-2 pt-2 border-t border-line/6">
          <span className="text-sm font-bold text-ink">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCompare(product);
              }}
              className={`p-1.5 rounded-lg text-xs transition-colors ${compared ? 'bg-accent text-white font-bold' : 'bg-surface border border-line/10 text-ink/60'}`}
              title="Compare"
              aria-label="Compare"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current stroke-2">
                <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="px-3 py-1.5 rounded-full bg-ink text-app text-[10px] font-bold uppercase tracking-wider hover:bg-accent hover:text-white transition-colors"
            >
              + Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
