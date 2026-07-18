import Link from 'next/link';
import products from '@/data/products.json';
import {notFound} from 'next/navigation';
import {ProductCard} from '@/components/ProductCard';
import type {Metadata} from 'next';

function getProduct(slug: string) {
  return (products as any[]).find((p) => p.slug === slug);
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
  params: {slug: string};
}): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return {title: 'Not Found'};
  return {
    title: product.name,
    description: `${product.tagline}. ${formatPrice(product.price)} from BESO Furniture.`,
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: {slug: string};
}) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = (products as any[])
    .filter(
      (p) => p.subcategory === product.subcategory && p.id !== product.id
    )
    .slice(0, 4);

  const specs = product.description
    ? Object.entries(product.description as Record<string, string>)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/30 mb-8">
        <Link href="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white">Products</Link>
        <span>/</span>
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-white"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-white/60">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="bg-beso-card rounded-3xl border border-white/[0.06] aspect-square flex items-center justify-center">
          <div className="text-9xl">{'\u{1FA91}'}</div>
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-4 ${
                product.badge === 'sale'
                  ? 'badge-sale'
                  : product.badge === 'hot'
                    ? 'badge-hot'
                    : 'bg-white/10 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}

          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {product.name}
          </h1>
          <p className="text-white/40 mb-6">{product.tagline}</p>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-white">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-white/30 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm text-beso-red font-semibold">
                  {Math.round(
                    ((product.originalPrice - product.price) /
                      product.originalPrice) *
                      100
                  )}
                  % off
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-beso-gold">
              {'\u2605'.repeat(Math.floor(product.rating))}
            </span>
            <span className="text-sm text-white/40">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Specs table */}
          {specs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-white mb-3">
                Specifications
              </h3>
              <div className="bg-beso-card rounded-2xl border border-white/[0.06] divide-y divide-white/[0.06]">
                {specs.map(([key, val]) => (
                  <div
                    key={key}
                    className="flex justify-between px-4 py-3 text-sm"
                  >
                    <span className="text-white/40 capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <span className="text-white font-medium">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKU */}
          <p className="text-xs text-white/30 mb-6">SKU: {product.sku}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20${encodeURIComponent(product.name)}%20(${product.sku}).%20Can%20you%20share%20more%20details?`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-beso px-8 py-3 text-sm flex-1 text-center"
            >
              Enquire on WhatsApp
            </a>
            <Link
              href="/compare"
              className="btn-pill-outline px-8 py-3 text-sm flex-1 text-center"
            >
              Add to Compare
            </Link>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">
            Related <span className="text-beso-lime">Products</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
