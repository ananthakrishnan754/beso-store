import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import products from '@/data/products.json';
import { notFound } from 'next/navigation';
import { CheckoutButton } from '@/components/CheckoutButton';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';
import { ProductGalleryZoom } from '@/components/ProductGalleryZoom';
import { ProductMeasurements } from '@/components/ProductMeasurements';
import { ProductReviewsSection } from '@/components/ProductReviewsSection';
import { ProductRecommendations } from '@/components/ProductRecommendations';
import { productModelUrl } from '@/lib/arModels';
import type { Metadata } from 'next';

function getProduct(slug: string) {
  return (products as any[]).find((p) => p.slug === slug);
}

function getModelUrl(slug: string, subcategory?: string): string | undefined {
  const url = productModelUrl(slug);
  const file = path.join(process.cwd(), 'public', url);
  try {
    if (fs.existsSync(file)) return url;
  } catch {}
  const subMap: Record<string, string> = {
    'executive-chair': '/assets/models/office-chair.glb',
    'manager-chair': '/assets/models/office-chair.glb',
    'staff-chair': '/assets/models/office-chair.glb',
    'visitor-chair': '/assets/models/office-chair.glb',
    'gaming-chair': '/assets/models/office-chair.glb',
    'dining-chair': '/assets/models/dining-chair.glb',
    'executive-table': '/assets/models/office-table.glb',
    'manager-table': '/assets/models/office-table.glb',
    'staff-table': '/assets/models/office-table.glb',
    'height-adjustable-table': '/assets/models/office-table.glb',
    'center-table': '/assets/models/coffee-table.glb',
  };
  return subcategory ? subMap[subcategory] : undefined;
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Normalize a store-relative asset path to a root-relative URL. */
function assetUrl(p?: string): string {
  if (!p) return '/assets/images/products/executive-chair-01.jpg';
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

  const specs = product.specs
    ? Object.entries(product.specs as Record<string, string>)
    : [];

  const modelUrl = getModelUrl(product.slug, product.subcategory);

  const whatsAppMessage = `Hi BESO! I'm interested in ordering the ${product.name} (${product.sku}). Please share delivery options and availability.`;
  const whatsAppUrl = `https://wa.me/918099952624?text=${encodeURIComponent(whatsAppMessage)}`;

  return (
    <div className="bg-transparent text-ink min-h-screen">
      {/* ─── Secondary Sticky Header ─── */}
      <div className="sticky top-20 z-40 bg-app/90 border-y border-line/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-extrabold text-sm tracking-tight text-ink line-clamp-1">{product.name}</span>
            <span className="hidden sm:inline-block px-2.5 py-0.5 bg-accent/10 border border-accent/20 rounded-full text-[9px] font-bold text-accent uppercase tracking-widest">
              {product.subcategory.replace(/-/g, ' ')}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-ink/50">
              <a href="#gallery" className="hover:text-ink transition-colors">Showcase</a>
              <a href="#measurements" className="hover:text-ink transition-colors">Dimensions</a>
              <a href="#specs" className="hover:text-ink transition-colors">Specifications</a>
              <a href="#reviews" className="hover:text-ink transition-colors">Reviews</a>
            </nav>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-ink hidden xs:inline">
                {formatPrice(product.price)}
              </span>
              <CheckoutButton
                sku={product.sku}
                fallbackHref={whatsAppUrl}
                label="Add to Cart"
                product={product}
                className="btn-beso px-5 py-2 text-xs uppercase tracking-wider font-extrabold"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-ink/40 mb-8 font-medium">
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
          <span className="text-ink/70 truncate max-w-[180px]">{product.name}</span>
        </div>

        {/* Product presentation */}
        <div className="grid lg:grid-cols-12 gap-12 items-start" id="gallery">
          {/* Left Column: Product image with BossesCabin-style cursor zoom, office scene, and blueprint */}
          <div className="lg:col-span-7 space-y-4">
            <ProductGalleryZoom
              productName={product.name}
              mainImage={assetUrl(product.image)}
              images={product.images}
              subcategory={product.subcategory}
              modelUrl={modelUrl}
            />
          </div>

          {/* Right Column: Info & Setup */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-2">
                {product.subcategory.replace(/-/g, ' ')}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-2">
                {product.name}
              </h1>
              <p className="text-ink/60 text-base leading-relaxed">{product.tagline}</p>
            </div>

            {/* Ratings & reviews jump link */}
            <div className="flex items-center gap-3">
              <span className="text-amber-500 text-base leading-none tracking-tight">
                {'★'.repeat(Math.floor(product.rating))}
                <span className="text-ink/15">{'★'.repeat(5 - Math.floor(product.rating))}</span>
              </span>
              <span className="text-sm font-bold text-ink">{product.rating}</span>
              <a href="#reviews" className="text-xs text-ink/50 hover:text-ink font-medium underline underline-offset-2">
                {product.reviews} verified reviews
              </a>
              <span className="mx-1 h-3 w-px bg-line/10" aria-hidden="true" />
              <span className="text-xs text-accent font-bold">BIFMA Certified</span>
            </div>

            {/* Price */}
            <div className="space-y-1 pt-2">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-black text-ink tracking-tight">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-ink/35 line-through font-medium">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-ink/50 tracking-wide">
                Inclusive of GST · PAN-India white-glove shipping
              </p>
            </div>

            {/* Trust highlights */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-line/10 text-center">
              <div className="p-2.5 rounded-xl bg-surfaceSubtle">
                <div className="text-xs font-bold text-ink">5–7 Years</div>
                <div className="text-[10px] text-ink/45">Warranty</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surfaceSubtle">
                <div className="text-xs font-bold text-ink">48 Hours</div>
                <div className="text-[10px] text-ink/45">Dispatch</div>
              </div>
              <div className="p-2.5 rounded-xl bg-surfaceSubtle">
                <div className="text-xs font-bold text-ink">10-Day</div>
                <div className="text-[10px] text-ink/45">Trial Return</div>
              </div>
            </div>

            {/* Primary Action — Add to Cart (Triggers recommendation drawer) */}
            <div className="pt-2 space-y-3">
              <CheckoutButton
                sku={product.sku}
                fallbackHref={whatsAppUrl}
                label="Add to Cart"
                product={product}
              />
            </div>

            {/* Actions / Utility row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <ViewInYourRoom
                subcategory={product.subcategory}
                slug={product.slug}
                productName={product.name}
                poster={assetUrl(product.image)}
                variant="outline"
                size="md"
                label="View in Room (AR)"
              />
              <Link
                href={`/compare?add=${product.id}`}
                className="btn-pill-outline px-4 py-2 text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
                <span>Add to Compare</span>
              </Link>
            </div>

            <div className="text-center pt-1">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-ink/50 hover:text-accent transition-colors inline-flex items-center gap-1.5"
              >
                <span>Need ergonomic cabin planning?</span>
                <span className="underline underline-offset-2">Ask Specialist on WhatsApp →</span>
              </a>
            </div>

            {/* Product SKU */}
            <div className="text-[10px] text-ink/30 uppercase tracking-widest font-mono text-center">
              SKU: {product.sku} · Direct Factory Dispatch
            </div>
          </div>
        </div>

        {/* ─── Dimensions & Measurements Section (Client requirement) ─── */}
        <div id="measurements" className="mt-20">
          <ProductMeasurements
            productName={product.name}
            subcategory={product.subcategory}
            specs={product.specs}
            productImage={assetUrl(product.image)}
          />
        </div>

        {/* ─── Specifications Table ─── */}
        {specs.length > 0 && (
          <div id="specs" className="mt-20 max-w-4xl">
            <div className="mb-6">
              <span className="text-xs font-bold text-accent tracking-widest uppercase">
                Materials &amp; Engineering
              </span>
              <h2 className="text-2xl font-extrabold text-ink tracking-tight mt-1">
                Technical Specifications
              </h2>
            </div>
            <div className="border border-line/10 rounded-2xl overflow-hidden bg-surface">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map(([key, val], i) => (
                    <tr
                      key={key}
                      className={`border-b border-line/8 last:border-0 ${
                        i % 2 === 0 ? 'bg-surface' : 'bg-surfaceSubtle/50'
                      }`}
                    >
                      <td className="px-5 py-4 text-ink/50 capitalize font-medium w-1/3">
                        {key.replace(/_/g, ' ')}
                      </td>
                      <td className="px-5 py-4 text-ink font-bold">
                        {String(val)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── Interactive Customer Reviews Section with Form ─── */}
        <ProductReviewsSection
          productId={product.id}
          productName={product.name}
          rating={product.rating}
          totalReviews={product.reviews}
        />

        {/* ─── Recommendation Rails: Similar Products (like Myntra) + Customers Also Liked ─── */}
        <ProductRecommendations
          currentProductId={product.id}
          category={product.category}
          subcategory={product.subcategory}
        />
      </div>
    </div>
  );
}
