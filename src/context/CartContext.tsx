'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CartItem {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  image?: string;
  subcategory?: string;
  category?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: number[]; // product IDs
  compareList: number[]; // product IDs
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  addToCart: (product: any, qty?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: any) => void;
  isInWishlist: (productId: number) => boolean;
  toggleCompare: (productOrId: any) => void;
  isInCompare: (productId: number) => boolean;
  drawerOpen: boolean;
  drawerMode: 'cart' | 'added-confirmation';
  openDrawer: (mode?: 'cart' | 'added-confirmation') => void;
  closeDrawer: () => void;
  lastAddedItem: CartItem | null;
  notification: string | null;
  clearNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE = 'beso_cart_v1';
const WISHLIST_STORAGE = 'beso_wishlist_v1';
const COMPARE_STORAGE = 'beso-compare';
const MAX_COMPARE = 4;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [compareList, setCompareList] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'cart' | 'added-confirmation'>('cart');
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE);
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE);
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));

      const savedCompare = localStorage.getItem(COMPARE_STORAGE);
      if (savedCompare) setCompareList(JSON.parse(savedCompare));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CART_STORAGE, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE, JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(COMPARE_STORAGE, JSON.stringify(compareList));
    } catch {
      // ignore
    }
  }, [compareList, hydrated]);

  const showToast = useCallback((msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  }, []);

  const clearNotification = useCallback(() => setNotification(null), []);

  const addToCart = useCallback((product: any, qty = 1) => {
    const itemToAdd: CartItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      subcategory: product.subcategory,
      category: product.category,
      quantity: qty,
    };

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, itemToAdd];
    });

    setLastAddedItem(itemToAdd);
    setDrawerMode('added-confirmation');
    setDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: qty } : item))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const toggleWishlist = useCallback((product: any) => {
    const id = typeof product === 'number' ? product : product.id;
    const name = product.name || 'Product';

    setWishlist((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed from Wishlist`);
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Added to Wishlist: ${name}`);
        return [...prev, id];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist]
  );

  const toggleCompare = useCallback((productOrId: any) => {
    const id = typeof productOrId === 'number' ? productOrId : productOrId.id;
    const name = productOrId.name || 'Product';

    setCompareList((prev) => {
      if (prev.includes(id)) {
        showToast(`Removed from Compare list`);
        return prev.filter((item) => item !== id);
      } else {
        if (prev.length >= MAX_COMPARE) {
          showToast(`Maximum ${MAX_COMPARE} products can be compared at once`);
          return prev;
        }
        showToast(`Added to Compare: ${name}`);
        return [...prev, id];
      }
    });
  }, [showToast]);

  const isInCompare = useCallback(
    (productId: number) => compareList.includes(productId),
    [compareList]
  );

  const openDrawer = useCallback((mode: 'cart' | 'added-confirmation' = 'cart') => {
    setDrawerMode(mode);
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const compareCount = compareList.length;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        compareList,
        cartCount,
        wishlistCount,
        compareCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        isInCompare,
        drawerOpen,
        drawerMode,
        openDrawer,
        closeDrawer,
        lastAddedItem,
        notification,
        clearNotification,
      }}
    >
      {children}
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink text-app px-5 py-3 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-3 border border-app/10 animate-fade-in">
          <span>{notification}</span>
          <button
            onClick={clearNotification}
            className="text-app/50 hover:text-app text-sm"
          >
            ✕
          </button>
        </div>
      )}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
