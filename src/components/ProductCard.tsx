"use client";

import Link from 'next/link';

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
  // Extract short product name for mobile CTA, e.g. "BESO Crown Executive Chair" → "Crown"
  const keywords = name.replace(/^(BESO|EZEEBEE)\s+/i, '').split(' ');
  return keywords[0] || name;
}

export function ProductCard({product}: {product: Product}) {
  const imageSrc = product.image
    ? product.image.startsWith('/')
      ? product.image
      : '/' + product.image
    : null;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block"
    >
      {/* Image area */}
      <div className="product-image aspect-square bg-beso-card flex items-center justify-center relative overflow-hidden">
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 product-img-element"
            onError={(e) => {
              // Fallback to emoji on image load error
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                const fallback = parent.querySelector('.fallback-icon') as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'block';
                }
              }
            }}
          />
        ) : null}

        <div
          className="fallback-icon text-6xl group-hover:scale-110 transition-transform duration-300"
          style={imageSrc ? { display: 'none' } : undefined}
        >
          <SubcategoryIcon subcategory={product.subcategory} />
        </div>

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              product.badge === 'sale'
                ? 'badge-sale'
                : product.badge === 'hot'
                  ? 'badge-hot'
                  : 'bg-white/10 text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Quick add overlay */}
        <div className="overlay absolute inset-0 bg-black/40 flex items-center justify-center">
          <span className="btn-beso px-6 py-2 text-sm">View Details</span>
        </div>
      </div>

      {/* Info - Desktop: full details, Mobile: compact */}
      <div className="p-4">
        {/* Subcategory label - hidden on mobile */}
        <p className="hidden sm:block text-[10px] text-beso-muted uppercase tracking-wider mb-1">
          {product.subcategory.replace(/-/g, ' ')}
        </p>

        {/* Product name */}
        <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1 group-hover:text-beso-lime transition-colors">
          {product.name}
        </h3>

        {/* Tagline - always visible */}
        <p className="text-xs text-white/40 mb-3 line-clamp-1">
          {product.tagline}
        </p>

        {/* Price + stars - hidden on mobile */}
        <div className="hidden sm:flex items-center gap-2">
          <span className="text-base font-bold text-white">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-white/30 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="hidden sm:flex items-center gap-1 mt-2">
          <span className="text-beso-gold text-xs">
            {'\u2605'.repeat(Math.floor(product.rating))}
          </span>
          <span className="text-xs text-white/30">({product.reviews})</span>
        </div>

        {/* Mobile CTA */}
        <div className="sm:hidden flex items-center justify-between mt-1">
          <span className="text-sm font-bold text-white">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] font-bold text-beso-lime uppercase tracking-wider">
            Explore {getShortName(product.name)} →
          </span>
        </div>
      </div>
    </Link>
  );
}
