'use client';

import {useState} from 'react';

type CheckoutButtonProps = {
  sku: string;
  /** WhatsApp fallback link used when Shopify checkout isn't configured yet. */
  fallbackHref: string;
  quantity?: number;
  label?: string;
  variant?: 'primary' | 'quiet';
  className?: string;
};

export function CheckoutButton({
  sku,
  fallbackHref,
  quantity = 1,
  label = 'Order Now',
  variant = 'primary',
  className = '',
}: CheckoutButtonProps) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch('/api/shopify-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sku, quantity }),
      });
      const data = await res.json();
      if (data?.checkoutUrl) {
        window.open(data.checkoutUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      // Checkout not configured (dev/offline) → WhatsApp fallback.
      window.open(fallbackHref, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(fallbackHref, '_blank', 'noopener,noreferrer');
    } finally {
      setBusy(false);
    }
  };

  const cls =
    variant === 'primary'
      ? 'btn-beso w-full px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-center'
      : `font-medium text-ink/45 hover:text-ink transition-colors ${className}`;

  return (
    <button type="button" onClick={handleClick} disabled={busy} className={cls}>
      {busy ? 'Opening…' : label}
    </button>
  );
}