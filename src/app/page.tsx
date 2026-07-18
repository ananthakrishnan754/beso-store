import Link from 'next/link';
import products from '@/data/products.json';
import {ProductCard} from '@/components/ProductCard';

const OFFICE_CATEGORIES = [
  {name: 'Executive Chairs', slug: 'executive-chair', icon: '\u{1FA91}'},
  {name: 'Gaming Chairs', slug: 'gaming-chair', icon: '\u{1F3AE}'},
  {name: 'Office Tables', slug: 'executive-table', icon: '\u{1F4BB}'},
  {name: 'Height Adjustable', slug: 'height-adjustable-table', icon: '\u2728'},
];

const HOME_CATEGORIES = [
  {name: 'Sofas', slug: 'sofa', icon: '\u{1F6CB}\uFE0F'},
  {name: 'Dining Chairs', slug: 'dining-chair', icon: '\u{1F37D}\uFE0F'},
  {name: 'Center Tables', slug: 'center-table', icon: '\u2615'},
  {name: 'Bar Stools', slug: 'bar-stool', icon: '\u{1F37F}'},
];

const MARQUEE_TEXT = '\u2726  PREMIUM QUALITY  \u2726  FREE SHIPPING ON \u20B910,000+  \u2726  5-YEAR WARRANTY  \u2726  CRAFTED WITH CARE  \u2726  FREE SHIPPING ON \u20B910,000+  \u2726  5-YEAR WARRANTY  \u2726  CRAFTED WITH CARE  \u2726';

function getFeatured() {
  return (products as any[])
    .filter((p) => p.badge === 'hot' || p.badge === 'new')
    .slice(0, 4);
}

function getTopRated() {
  return (products as any[])
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
}

export default function HomePage() {
  const featured = getFeatured();
  const topRated = getTopRated();

  return (
    <>
      {/* ─── Hero ───────────────────────────────────────────────────────── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-beso-dark via-beso-dark to-beso-card" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-beso-lime/5 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <p className="text-beso-lime font-semibold text-sm tracking-widest uppercase mb-4">
              Premium Furniture
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              <span className="text-gradient">Furniture That</span>
              <br />
              <span className="text-white">Defines Your Space</span>
            </h1>
            <p className="text-white/50 text-lg max-w-md mb-8">
              From executive offices to cozy homes. Ergonomic, stylish, and built
              to last.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products?category=office"
                className="btn-beso px-8 py-3 text-sm"
              >
                Shop Office
              </Link>
              <Link
                href="/products?category=home"
                className="btn-pill-outline px-8 py-3 text-sm"
              >
                Shop Home
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-10 mt-12">
              {[
                {val: '10K+', label: 'Customers'},
                {val: '500+', label: 'Products'},
                {val: '5\u2605', label: 'Rated'},
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white">{s.val}</div>
                  <div className="text-xs text-white/40">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual */}
          <div className="hidden md:flex items-center justify-center animate-float">
            <div className="w-72 h-72 rounded-3xl bg-beso-card border border-white/[0.06] flex items-center justify-center">
              <span className="text-8xl">
                {'\u{1FA91}'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Marquee ─────────────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-beso-card/30 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-sm text-white/30 tracking-widest">
          {MARQUEE_TEXT}
        </div>
      </div>

      {/* ─── Office Categories ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          Office <span className="text-beso-lime">Collection</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {OFFICE_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?subcategory=${cat.slug}`}
              className="product-card p-6 text-center hover:scale-[1.02] transition-transform"
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Featured Products ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">
            Featured <span className="text-beso-lime">Picks</span>
          </h2>
          <Link
            href="/products"
            className="text-sm text-beso-lime hover:underline"
          >
            View all \u2192
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ─── Home Categories ─────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          Home <span className="text-beso-lime">Collection</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {HOME_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?subcategory=${cat.slug}`}
              className="product-card p-6 text-center hover:scale-[1.02] transition-transform"
            >
              <span className="text-4xl mb-3 block">{cat.icon}</span>
              <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── Trust Section ──────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-beso-card rounded-3xl border border-white/[0.06] p-8 md:p-12 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <span className="text-3xl mb-2 block">{'\u{1F69A}'}</span>
            <h3 className="font-semibold text-white mb-1">Free Delivery</h3>
            <p className="text-sm text-white/40">On orders above \u20B910,000 across India</p>
          </div>
          <div className="text-center">
            <span className="text-3xl mb-2 block">{'\u{1F6E1}\uFE0F'}</span>
            <h3 className="font-semibold text-white mb-1">5-Year Warranty</h3>
            <p className="text-sm text-white/40">Extended coverage on all products</p>
          </div>
          <div className="text-center">
            <span className="text-3xl mb-2 block">{'\u{1F504}'}</span>
            <h3 className="font-semibold text-white mb-1">7-Day Returns</h3>
            <p className="text-sm text-white/40">Hassle-free return policy</p>
          </div>
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="bg-gradient-to-br from-beso-lime/10 to-beso-dark rounded-3xl border border-beso-lime/20 p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Need Help Choosing?
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-6">
            Our furniture experts are here to help you find the perfect fit for
            your space.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20BESO!%20I%27m%20interested%20in%20your%20furniture."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-beso px-8 py-3 text-sm inline-block"
          >
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
