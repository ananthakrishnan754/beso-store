'use client';

import {useEffect} from 'react';

/**
 * Client-review preview: applies the new dark/orange palette to the product
 * page only. The attribute is removed on unmount so every other page keeps the
 * current theme until the palette is approved.
 */
export function ProductPageTheme() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-product-theme', 'f36718');
    return () => root.removeAttribute('data-product-theme');
  }, []);

  return null;
}
