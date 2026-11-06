'use client';

import Link from 'next/link';
import {useMemo, useState} from 'react';
import {useCart} from '@/context/CartContext';

const WHATSAPP_NUMBER = '918099952624';

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

export default function CheckoutPage() {
  const {cart} = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({...prev, [key]: e.target.value}));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const itemLines = cart
      .map((item) => `- ${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`)
      .join('\n');

    const message = encodeURIComponent(
      `Hi BESO! I'd like to place an order.\n\n` +
        `ORDER\n${itemLines}\nSubtotal: ${formatPrice(subtotal)}\n\n` +
        `DELIVERY DETAILS\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email || '—'}\n` +
        `Address: ${form.address}\nCity: ${form.city}\nPincode: ${form.pincode}\n` +
        `Notes: ${form.notes || '—'}`,
    );

    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    setWhatsAppHref(href);
    setSubmitted(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  if (cart.length === 0) {
    return (
      <section className="max-w-3xl mx-auto px-6 md:px-12 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-3xl border border-white/80 dark:border-white/15 bg-white/70 dark:bg-[#1A120B]/80 backdrop-blur-xl flex items-center justify-center text-3xl shadow-sm mb-6">
          🛍️
        </div>
        <h1 className="text-3xl font-bold text-ink mb-3">Your bag is empty</h1>
        <p className="text-ink/50 mb-8">
          Add a chair or desk to your bag before heading to checkout.
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3.5 rounded-full bg-accent hover:bg-accent-2 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-accent/25 transition-all hover:scale-105 active:scale-95"
        >
          Browse Products →
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      <div className="mb-10">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
          Secure Order Request
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-ink">Checkout</h1>
        <p className="text-ink/50 mt-2">
          Review your order and share delivery details. Our team confirms stock,
          payment, and dispatch before your order is processed.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Order summary */}
        <div className="lg:col-span-5 rounded-3xl border border-line/10 bg-surface p-6 md:p-8 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink">Order Summary</h2>
            <span className="text-xs font-bold text-accent">{cart.length} items</span>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#F5EFE6] dark:bg-[#140D08] shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-ink truncate">{item.name}</div>
                  <div className="text-xs text-ink/50">Qty {item.quantity}</div>
                </div>
                <div className="text-sm font-bold text-ink whitespace-nowrap">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-line/10 pt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between text-ink/60">
              <span>Shipping</span>
              <span className="font-semibold text-accent">Pan-India Delivery</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink">Subtotal</span>
              <span className="text-xl font-black text-accent">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <p className="text-[11px] text-ink/45 leading-relaxed">
            Payment and delivery are confirmed by our team after your order request.
            Need help? Call or WhatsApp 089193 17980.
          </p>

          <Link
            href="/products"
            className="inline-flex text-xs font-bold text-ink/60 hover:text-accent transition-colors"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Delivery details */}
        <div className="lg:col-span-7 rounded-3xl border border-line/10 bg-surface p-6 md:p-8">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-2xl font-black">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-ink">Order request ready</h2>
              <p className="text-sm text-ink/60 max-w-md mx-auto">
                We&apos;ve opened WhatsApp with your order details. Send the message
                to confirm it with our team.
              </p>
              <a
                href={whatsAppHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-widest transition-all"
              >
                Re-open WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-ink">Delivery Details</h2>
                <p className="text-xs text-ink/50 mt-0.5">
                  All fields marked * are required.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink/70 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={update('name')}
                    className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink/70 block mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.address}
                  onChange={update('address')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-ink/70 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.city}
                    onChange={update('city')}
                    className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-ink/70 block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.pincode}
                    onChange={update('pincode')}
                    className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Order Notes
                </label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={update('notes')}
                  placeholder="Delivery preferences, GST details, installation notes…"
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent resize-none"
                />
              </div>

              {/* TODO: Swap this handler for the Shopify checkout redirect once
                  the Storefront API is connected. */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-accent hover:bg-accent-2 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-accent/25 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                Place Order →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
