'use client';

import {useCart} from '@/context/CartContext';

export function WishlistButton({product}: {product: any}) {
  const {toggleWishlist, isInWishlist} = useCart();
  const active = isInWishlist(product.id);

  return (
    <button
      type="button"
      onClick={() => toggleWishlist(product)}
      aria-pressed={active}
      className={`btn-pill-outline px-4 py-2 text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all ${
        active
          ? 'border-rose-500/50 bg-rose-500/10 text-rose-500'
          : 'text-ink'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <span>{active ? 'In Wishlist' : 'Add to Wishlist'}</span>
    </button>
  );
}
