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
  const whatsAppUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsAppMessage)}`;

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
              <a href="#view3d" className="hover:text-ink transition-colors">3D Rotate</a>
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
              poster={product.image}
            />
            <p className="text-[10px] text-ink/40 text-center uppercase tracking-widest">
              Drag to rotate · {getModelUrl(product.slug) ? 'Tap 3D to explore' : ''}
            </p>
          </div>

          {/* Right Column: Info & Setup */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              {product.badge && (
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${
                    product.badge === 'sale'
                      ? 'badge-sale'
                      : product.badge === 'hot'
                        ? 'badge-hot'
                        : 'bg-ink/10 text-ink'
                  }`}
                >
                  {product.badge}
                </span>
              )}

              <h1 className="text-3xl font-extrabold text-ink tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-ink/50 text-base leading-relaxed">{product.tagline}</p>
            </div>

            {/* Price section */}
            <div className="p-6 bg-ink/[0.02] border border-line/5 rounded-3xl space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-ink tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-base text-ink/30 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="px-2 py-0.5 bg-beso-red/10 border border-beso-red/20 text-beso-red text-xs font-bold rounded-full">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
              <div className="text-[11px] text-ink/40 tracking-wide">
                Inclusive of all taxes. Free shipping across India.
              </div>
            </div>

            {/* Ratings & reviews */}
            <div id="reviews" className="flex items-center gap-3">
              <span className="text-beso-gold text-sm">
                {'\u2605'.repeat(Math.floor(product.rating))}
              </span>
              <span className="text-xs font-bold text-ink">
                {product.rating}
              </span>
              <span className="text-xs text-ink/30 font-medium">
                ({product.reviews} verified reviews)
              </span>
            </div>

            {/* Highlights cards (SuperErgo styling) */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: '10-Day Returns', desc: 'No questions asked' },
                { title: '5-Year Warranty', desc: 'Full core coverage' },
                { title: 'Free Assembly', desc: 'Pan-India setup' }
              ].map((h, i) => (
                <div key={i} className="p-3 bg-ink/[0.01] border border-line/5 rounded-2xl text-center space-y-1">
                  <div className="text-[11px] font-bold text-ink">{h.title}</div>
                  <div className="text-[9px] text-ink/40 font-medium leading-none">{h.desc}</div>
                </div>
              ))}
            </div>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-beso px-8 py-4 text-xs uppercase tracking-wider font-extrabold flex-1 text-center"
              >
                Enquire on WhatsApp
              </a>
              <Link
                href="/compare"
                className="btn-pill-outline px-8 py-4 text-xs uppercase tracking-wider font-semibold flex-1 text-center"
              >
                Add to Compare
              </Link>
            </div>

            {/* AR: View in Your Room */}
            <ViewInYourRoom
              subcategory={product.subcategory}
              slug={product.slug}
              productName={product.name}
              poster={product.image}
              variant="solid"
              size="lg"
              align="center"
              label="View in Your Room"
            />

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
              <span className="text-xs font-bold text-beso-lime tracking-widest uppercase">Precision Engineering</span>
              <h2 className="text-2xl font-extrabold text-ink tracking-tight mt-1">Technical Specifications</h2>
            </div>
            <div className="bg-ink/5 rounded-3xl border border-line/5 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, val]) => (
                    <tr key={key} className="border-b border-line/5 last:border-0 hover:bg-ink/[0.01] transition-colors">
                      <td className="px-6 py-4 text-ink/40 capitalize font-medium">{key.replace(/_/g, ' ')}</td>
                      <td className="px-6 py-4 text-ink font-bold text-right sm:text-left">{String(val)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24 border-t border-line/5 pt-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-beso-lime tracking-widest uppercase mb-1 block">Similar Fits</span>
                <h2 className="text-2xl font-extrabold text-ink tracking-tight">Related Ergonomics</h2>
              </div>
              <Link href="/products" className="text-xs font-semibold uppercase tracking-wider text-beso-lime hover:text-ink transition-colors">
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
