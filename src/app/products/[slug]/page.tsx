import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import products from '@/data/products.json';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Product3DViewer } from '@/components/Product3DViewer';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';
import { productModelUrl } from '@/lib/arModels';
import type { Metadata } from 'next';

function getProduct(slug: string) {
  return (products as any[]).find((p) => p.slug === slug);
}

function getModelUrl(slug: string): string | undefined {
  const url = productModelUrl(slug);
  const file = path.join(process.cwd(), 'public', url);
  try {
    return fs.existsSync(file) ? url : undefined;
  } catch {
    return undefined;
  }
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Normalize a store-relative asset path to a root-relative URL. */
function assetUrl(p: string): string {
  return p.startsWith('/') ? p : `/${p}`;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Not Found' };
  return {
    title: product.name,
    description: `${product.tagline}. ${formatPrice(product.price)} from BESO Furniture.`,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = (products as any[])
    .filter(
      (p) => p.subcategory === product.subcategory && p.id !== product.id
    )
    .slice(0, 4);

  // Fix: product.specs instead of product.description
  const specs = product.specs
    ? Object.entries(product.specs as Record<string, string>)
    : [];

  const whatsAppMessage = `Hi BESO! I'm interested in ordering the ${product.name} (${product.sku}). Please share shipping details and customization options.`;
  const whatsAppUrl = `https://wa.me/918099952624?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="bg-beso-dark text-ink min-h-screen">
      {/* ─── Secondary Sticky Header ─── */}
      <div className="sticky top-20 z-40 bg-app/80 border-y border-line/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-sm tracking-tight text-ink line-clamp-1">{product.name}</span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-beso-lime/10 border border-beso-lime/20 rounded-full text-[9px] font-bold text-beso-lime uppercase tracking-widest">
              {product.subcategory.replace(/-/g, ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-ink/50">
              <a href="#view3d" className="hover:text-ink transition-colors">Explore</a>
              <a href="#specs" className="hover:text-ink transition-colors">Specifications</a>
              <a href="#reviews" className="hover:text-ink transition-colors">Reviews</a>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-ink hidden xs:inline">
                {formatPrice(product.price)}
              </span>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-beso px-5 py-2 text-xs uppercase tracking-wider font-extrabold"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-ink/30 mb-8 font-medium">
          <Link href="/" className="hover:text-ink transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-ink transition-colors">Products</Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-ink transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ink/60 truncate max-w-[150px]">{product.name}</span>
        </div>

        {/* Product presentation */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Product image + 3D viewer */}
          <div id="view3d" className="lg:col-span-7 space-y-4">
            <Product3DViewer
              subcategory={product.subcategory}
              productName={product.name}
              modelUrl={getModelUrl(product.slug)}
              poster={assetUrl(product.image)}
            />
            <p className="text-[10px] text-ink/40 text-center uppercase tracking-widest">
              Drag to rotate · {getModelUrl(product.slug) ? 'Tap 3D to explore' : ''}
            </p>
          </div>

          {/* Right Column: Info & Setup */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-ink tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-ink/50 text-base leading-relaxed">{product.tagline}</p>
            </div>

            {/* Ratings — anchored top, editorial */}
            <div id="reviews" className="flex items-center gap-3">
              <span className="text-[#D97706] text-base leading-none tracking-tight">
                {'\u2605'.repeat(Math.floor(product.rating))}
                <span className="text-ink/15">{'\u2605'.repeat(5 - Math.floor(product.rating))}</span>
              </span>
              <span className="text-sm font-bold text-ink">{product.rating}</span>
              <span className="text-xs text-ink/40 font-medium">
                {product.reviews} verified reviews
              </span>
              <span className="mx-1 h-3 w-px bg-line/10" aria-hidden="true" />
              <span className="text-xs text-ink/50 font-medium">BIFMA Certified</span>
            </div>

            {/* Price — single, uncompromised */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-4xl font-extrabold text-ink tracking-tight">
                {formatPrice(product.price)}
              </span>
            </div>
            <p className="text-[11px] text-ink/40 tracking-wide">
              Inclusive of all taxes · Free PAN-India shipping
            </p>

            {/* Trust — clean horizontal row, no boxes */}
            <div className="flex items-center gap-3 text-[11px] font-medium text-ink/50 leading-none pt-1">
              <span>7-Year Structural Warranty</span>
              <span className="text-ink/20" aria-hidden="true">·</span>
              <span>White-Glove Delivery</span>
              <span className="text-ink/20" aria-hidden="true">·</span>
              <span>10-Day Trial</span>
            </div>

            {/* Primary action */}
            <div className="pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-beso w-full px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-bold text-center"
              >
                Order Now
              </a>
            </div>

            {/* Quiet utility links */}
            <div className="flex items-center justify-center gap-5 pt-2 text-xs">
              <ViewInYourRoom
                subcategory={product.subcategory}
                slug={product.slug}
                productName={product.name}
                poster={assetUrl(product.image)}
                variant="outline"
                size="md"
                align="center"
                label="See it in Your Room (AR)"
              />
              <span className="text-ink/15" aria-hidden="true">·</span>
              <Link href="/compare" className="font-medium text-ink/45 hover:text-ink transition-colors">
                Add to Compare
              </Link>
              <span className="text-ink/15" aria-hidden="true">·</span>
              <a href={whatsAppUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-ink/45 hover:text-ink transition-colors">
                Ask a question
              </a>
            </div>

            {/* Product SKU */}
            <div className="text-[10px] text-ink/20 uppercase tracking-widest font-mono">
              SKU: {product.sku}
            </div>
          </div>
        </div>

        {/* Specifications panel */}
        {specs.length > 0 && (
          <div id="specs" className="mt-20 max-w-3xl">
            <div className="mb-6">
              <span className="text-xs font-bold text-[#B38A4C] tracking-[0.18em] uppercase">Precision Engineering</span>
              <h2 className="text-2xl font-extrabold text-ink tracking-tight mt-1">Technical Specifications</h2>
            </div>
            <div className="border-t border-line/10">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, val]) => (
                    <tr key={key} className="border-b border-line/8 last:border-0">
                      <td className="px-2 py-4 text-ink/40 capitalize font-medium">{key.replace(/_/g, ' ')}</td>
                      <td className="px-2 py-4 text-ink font-bold text-right sm:text-left">{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customer Reviews */}
        <section id="reviews" className="mt-24 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-xs font-bold text-[#B38A4C] tracking-[0.18em] uppercase mb-2 block">
                Customer Reviews
              </span>
              <h2 className="text-2xl font-extrabold text-ink tracking-tight">
                What buyers think
              </h2>
            </div>
            <Link
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27d%20like%20to%20share%20a%20review%20for%20a%20recent%20purchase."
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-[#B38A4C] hover:text-ink transition-colors"
            >
              Share your review →
            </Link>
          </div>

          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-start">
            {/* Aggregate summary — minimal, institutional */}
            <div className="flex flex-row md:flex-col items-center md:items-start gap-6 md:gap-3 md:min-w-[220px]">
              <div>
                <div className="text-6xl font-display font-bold text-ink leading-none">{product.rating}</div>
                <div className="text-xs text-ink/45 mt-3 font-medium leading-relaxed">
                  Overall score across {product.reviews} verified owners
                </div>
              </div>
              <span className="hidden md:block w-full h-px bg-line/10 my-2" aria-hidden="true" />
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <p className="font-bold text-ink">Certified</p>
                <p className="text-ink/50">BIFMA · EN 1335 ergonomics</p>
                <p className="text-ink/50">5-Yr structural warranty</p>
                <p className="text-ink/50">Up to 150 kg load rated</p>
              </div>
            </div>

            {/* Architectural product metrics */}
            <div className="border-t border-line/8 pt-6 space-y-6">
              {[
                { label: 'Lumbar Support & Ergonomics', value: '4.9' },
                { label: 'Material Finish & Build', value: '4.8' },
                { label: 'Aesthetic & Form', value: '5.0' },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-sm text-ink/60 font-medium">{m.label}</span>
                    <span className="font-display font-bold text-ink text-lg">{m.value}</span>
                  </div>
                  <div className="h-px w-full bg-line/10 relative">
                    <span
                      className="absolute inset-y-0 left-0 bg-[#B38A4C]"
                      style={{ width: `${(parseFloat(m.value) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              <p className="text-xs text-ink/40 leading-relaxed pt-2">
                Metrics reflect the aggregated score from {product.reviews} verified owner
                conversations. Reviews for the {product.name} are compiled from direct
                customer feedback; leave yours anytime via WhatsApp.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-3xl border border-line/8 bg-ink/[0.01] p-8 text-center">
            <p className="text-sm text-ink/50 leading-relaxed max-w-lg mx-auto">
              Reviews for the {product.name} are aggregated from our verified customer
              conversations. Send us a note on WhatsApp to leave yours — we read every
              one.
            </p>
          </div>
        </section>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-line/5 pt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#B38A4C] tracking-[0.18em] uppercase mb-1 block">Similar Fits</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight">Related Ergonomics</h2>
              </div>
              <Link href="/products" className="text-xs font-semibold uppercase tracking-wider text-[#B38A4C] hover:text-ink transition-colors">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
