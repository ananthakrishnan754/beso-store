'use client';

import {useEffect} from 'react';

export type ProductPalette = 'orange' | 'white';

/**
 * Client-review preview: applies a dark product-page palette only on
 * /products/[slug]. The attribute is removed on unmount so every other page
 * keeps the current theme until the palette is approved.
 *
 * Pass ?palette=white on a product URL to preview the white-accent variant.
 */
export function ProductPageTheme({variant = 'orange'}: {variant?: ProductPalette}) {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-product-theme', variant === 'white' ? 'white' : 'f36718');
    return () => root.removeAttribute('data-product-theme');
  }, [variant]);

  return null;
}
