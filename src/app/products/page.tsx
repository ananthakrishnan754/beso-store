import products from '@/data/products.json';
import {ProductCard} from '@/components/ProductCard';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse our full collection of premium office and home furniture.',
};

function getUniqueSubcategories() {
  const subs = [...new Set((products as any[]).map((p) => p.subcategory))];
  return subs.sort();
}

const SUB_LABELS: Record<string, string> = {
  'executive-chair': 'Executive',
  'manager-chair': 'Manager',
  'staff-chair': 'Staff',
  'visitor-chair': 'Visitor',
  'gaming-chair': 'Gaming',
  'dining-chair': 'Dining',
  'bar-stool': 'Stools',
  'executive-table': 'Exec. Tables',
  'manager-table': 'Manager Desks',
  'staff-table': 'Staff Desks',
  'center-table': 'Center Tables',
  'height-adjustable-table': 'Standing Desks',
  sofa: 'Sofas',
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: {category?: string; subcategory?: string};
}) {
  const filtered = (products as any[]).filter((p) => {
    if (searchParams.category && p.category !== searchParams.category) return false;
    if (searchParams.subcategory && p.subcategory !== searchParams.subcategory) return false;
    return true;
  });

  const subcategories = getUniqueSubcategories();
  const catLabel = searchParams.category
    ? searchParams.category === 'office'
      ? 'Office'
      : 'Home'
    : 'All';

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-beso-lime text-sm font-semibold tracking-widest uppercase mb-2">
          {catLabel} Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink">
          {searchParams.subcategory
            ? searchParams.subcategory.replace(/-/g, ' ')
            : searchParams.category
              ? `${catLabel} Furniture`
              : 'All Products'}
        </h1>
        <p className="text-ink/40 mt-2">
          {filtered.length} {filtered.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Filter tags — horizontal scrollable rail with edge bleed + snap */}
      <div className="flex gap-2 mb-8 overflow-x-auto px-1 pb-2 -mx-1 no-scrollbar snap-x snap-mandatory scroll-pl-2 scroll-pr-6 [-webkit-overflow-scrolling:touch]">
        <a
          href="/products"
          className={`snap-start h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center transition-colors ${
            !searchParams.category && !searchParams.subcategory
              ? 'bg-beso-lime text-onAccent'
              : 'bg-beso-card border border-line/6 text-ink/60 hover:text-ink'
          }`}
        >
          All
        </a>
        <a
          href="/products?category=office"
          className={`snap-start h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center transition-colors ${
            searchParams.category === 'office' && !searchParams.subcategory
              ? 'bg-beso-lime text-onAccent'
              : 'bg-beso-card border border-line/6 text-ink/60 hover:text-ink'
          }`}
        >
          Office
        </a>
        <a
          href="/products?category=home"
          className={`snap-start h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center transition-colors ${
            searchParams.category === 'home' && !searchParams.subcategory
              ? 'bg-beso-lime text-onAccent'
              : 'bg-beso-card border border-line/6 text-ink/60 hover:text-ink'
          }`}
        >
          Home
        </a>
        {subcategories.map((sub) => (
          <a
            key={sub}
            href={`/products?subcategory=${sub}`}
            className={`snap-start h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap inline-flex items-center transition-colors ${
              searchParams.subcategory === sub
                ? 'bg-beso-lime text-onAccent'
                : 'bg-beso-card border border-line/6 text-ink/60 hover:text-ink'
            }`}
          >
            {SUB_LABELS[sub] ?? sub.replace(/-/g, ' ')}
          </a>
        ))}
      </div>

      {/* Product grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-ink/40 text-lg">No products found.</p>
          <a href="/products" className="btn-beso mt-4 inline-block px-6 py-2 text-sm">
            View All Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
