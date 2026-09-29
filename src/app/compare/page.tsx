'use client';

import {Fragment, useEffect, useMemo, useRef, useState} from 'react';
import Link from 'next/link';
import products from '@/data/products.json';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';

const ALL = products as any[];
const MAX = 4;

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

const SUB_LABELS: Record<string, string> = {
  'executive-chair': 'Executive Chair',
  'manager-chair': 'Manager Chair',
  'staff-chair': 'Staff Chair',
  'visitor-chair': 'Visitor Chair',
  'gaming-chair': 'Gaming Chair',
  'dining-chair': 'Dining Chair',
  'bar-stool': 'Bar Stool',
  'executive-table': 'Executive Table',
  'manager-table': 'Manager Desk',
  'staff-table': 'Staff Desk',
  'center-table': 'Center Table',
  'height-adjustable-table': 'Standing Desk',
  sofa: 'Sofa',
};

/* Specs are richer than flat fields: group into sections for scannability. */
const SECTIONS = [
  {
    key: 'overview',
    label: 'Overview',
    rows: [
      {key: 'category', label: 'Category'},
      {key: 'subcategory', label: 'Type'},
    ],
  },
  {
    key: 'pricing',
    label: 'Pricing',
    rows: [
      {key: 'price', label: 'Price'},
      {key: 'originalPrice', label: 'MRP'},
      {key: 'save', label: 'You Save'},
    ],
  },
  {
    key: 'reviews',
    label: 'Ratings',
    rows: [
      {key: 'rating', label: 'Rating'},
      {key: 'reviews', label: 'Reviews'},
    ],
  },
  {
    key: 'specs',
    label: 'Specifications',
    rows: [
      {key: 'warranty', label: 'Warranty'},
      {key: 'material', label: 'Material'},
      {key: 'color', label: 'Color'},
      {key: 'weightCapacity', label: 'Weight Capacity'},
      {key: 'assembly', label: 'Assembly'},
      {key: 'dimensions', label: 'Dimensions'},
    ],
  },
];

function specValue(p: any, key: string) {
  switch (key) {
    case 'save':
      return p.originalPrice ? p.originalPrice - p.price : null;
    case 'warranty':
    case 'material':
    case 'color':
    case 'weightCapacity':
    case 'assembly':
    case 'dimensions':
      return p.specs?.[key] ?? null;
    default:
      return p[key] ?? null;
  }
}

/** Number of stars, tolerantly (handles 4.5). */
function starRow(rating: number, size = 'text-sm') {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[#B38A4C] ${size}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({length: 5}).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-4 h-4 fill-current" aria-hidden="true">
          {i < full ? (
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.3l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z" />
          ) : i === full && half ? (
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.3l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z" fillOpacity="0.35" />
          ) : (
            <path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.3l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z" fill="none" stroke="currentColor" strokeWidth="1" />
          )}
        </svg>
      ))}
    </span>
  );
}

export default function ComparePage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState('');
  const [group, setGroup] = useState('all');
  const [showDiff, setShowDiff] = useState(false);
  const [pinned, setPinned] = useState<number | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Load persisted compare list + ?compare=ids + ?add=id URL support.
  useEffect(() => {
    let ids: number[] = [];
    try { ids = JSON.parse(localStorage.getItem('beso-compare') || '[]').map(Number); } catch { /* */ }
    const params = new URLSearchParams(window.location.search);
    const q = params.get('compare');
    if (q) { try { ids = q.split(',').map(Number); } catch { /* */ } }
    const add = params.get('add');
    if (add) {
      const n = Number(add);
      if (Number.isFinite(n) && !ids.includes(n)) ids = [...ids, n].slice(-MAX);
      // Clean the ?add= param from the URL after consuming it.
      const u = new URL(window.location.href);
      u.searchParams.delete('add');
      window.history.replaceState(null, '', u.toString());
    }
    if (ids.length) setSelected(ids.slice(0, MAX));
  }, []);

  useEffect(() => {
    try { localStorage.setItem('beso-compare', JSON.stringify(selected)); } catch { /* */ }
    // Keep the URL shareable.
    if (selected.length) {
      const u = new URL(window.location.href);
      u.searchParams.set('compare', selected.join(','));
      window.history.replaceState(null, '', u.toString());
    }
  }, [selected]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL.filter(
      (p) =>
        (group === 'all' || p.subcategory === group) &&
        (!q || p.name.toLowerCase().includes(q) || p.subcategory.toLowerCase().includes(q)),
    );
  }, [search, group]);

  const selectedProducts = ALL.filter((p) => selected.includes(p.id));
  const sortedSelected = [...selectedProducts].sort((a, b) =>
    a.id === pinned ? -1 : b.id === pinned ? 1 : 0,
  );

  const toggle = (id: number) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id].slice(-MAX)));
  };

  const goToTable = () => tableRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
  const recommended = selectedProducts.length > 1
    ? [...selectedProducts].sort((a, b) => (b.rating - a.rating) || (b.reviews - a.reviews))[0]
    : null;

  // Whether a row has differing values across selected products.
  const rowDiffers = (key: string, p: any[]) => {
    const vals = p.map((x) => String(specValue(x, key) ?? '')).filter(Boolean);
    return new Set(vals).size > 1;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 pb-32">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#B38A4C] text-xs font-bold tracking-[0.18em] uppercase mb-2 inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B38A4C] animate-pulse" />
          Compare
        </p>
        <h1 className="text-3xl md:text-5xl font-display font-bold text-ink tracking-tight">
          Side-by-side, <span className="text-gradient">simplified.</span>
        </h1>
        <p className="text-ink/50 text-sm mt-3 max-w-lg leading-relaxed">
          Pick up to {MAX} models and see every spec, price and rating at a glance.
        </p>
      </div>

      {/* Picker — grouped, searchable, premium cards */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
          <div className="relative flex-1 max-w-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search chairs, desks, sofas…"
              className="w-full bg-surface border border-line/8 rounded-full pl-10 pr-4 py-3 text-sm text-ink placeholder:ink/30 focus:outline-none focus:border-[#B38A4C]/40 focus:ring-1 focus:ring-[#B38A4C]/20"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
            <button onClick={() => setGroup('all')}
              className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${group === 'all' ? 'bg-ink text-app' : 'bg-surface border border-line/8 text-ink/60 hover:text-ink'}`}>
              All
            </button>
            {[...new Set(ALL.map((p) => p.subcategory))].sort().map((s) => (
              <button key={s} onClick={() => setGroup(s)}
                className={`h-9 px-4 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${group === s ? 'bg-ink text-app' : 'bg-surface border border-line/8 text-ink/60 hover:text-ink'}`}>
                {SUB_LABELS[s] ?? s.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-h-[430px] overflow-y-auto pr-1 -mx-1 px-1">
          {filtered.map((p) => {
            const isSelected = selected.includes(p.id);
            const isDisabled = !isSelected && selected.length >= MAX;
            return (
              <button
                key={p.id}
                onClick={() => !isDisabled && toggle(p.id)}
                disabled={isDisabled}
                className={`group relative p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#B38A4C]/[0.06] border-[#B38A4C]/40 ring-1 ring-[#B38A4C]/20 shadow-card-hover'
                    : isDisabled
                      ? 'bg-surface/40 border-line/[0.04] opacity-35 cursor-not-allowed'
                      : 'bg-surface border-line/8 hover:border-line/20 hover:-translate-y-0.5 hover:shadow-card-hover'
                }`}
              >
                <div className="absolute top-2.5 right-2.5 flex items-center justify-center w-5 h-5 rounded-full border transition-colors ${
                  isSelected ? 'bg-[#B38A4C] border-[#B38A4C] text-white' : 'border-line/20 bg-surface'
                }">
                  {isSelected && <svg viewBox="0 0 20 20" className="w-3 h-3 fill-none " stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 10l3 3 6-6" /></svg>}
                </div>
                <div className="h-16 rounded-xl bg-[#F5F5DB]/60 flex items-center justify-center mb-2.5 overflow-hidden">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`/${p.image}`} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                  ) : (
                    <span className="text-2xl opacity-40">{'🪑'}</span>
                  )}
                </div>
                <p className="font-medium text-ink text-xs leading-snug line-clamp-2 group-hover:text-[#B38A4C] transition-colors">{p.name}</p>
                <p className="text-[10px] text-ink/40 capitalize mt-0.5">{SUB_LABELS[p.subcategory] ?? p.subcategory.replace(/-/g, ' ')}</p>
                <p className="text-xs font-bold text-ink mt-1.5">{formatPrice(p.price)}</p>
                <p className="text-[10px] text-ink/35 flex items-center gap-1"><span className="text-[#B38A4C]">{'★'} {p.rating}</span>·{p.reviews} reviews</p>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-ink/30 py-10">No products match “{search}”.</p>
        )}
      </div>

      {/* Sticky compare tray */}
      {selected.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
          <div className="bg-surface/95 backdrop-blur-xl border border-line/10 rounded-3xl shadow-2xl px-4 py-3 flex items-center gap-3">
            <div className="flex -space-x-2 overflow-hidden mr-1">
              {sortedSelected.map((p) => (
                <div key={p.id} className="relative w-11 h-11 rounded-full border-2 border-surface bg-[#F5F5DB] overflow-hidden">
                  {p.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={`/${p.image}`} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    : <span className="flex items-center justify-center w-full h-full text-lg">{'🪑'}</span>}
                  <button
                    aria-label={`Remove ${p.name}`}
                    onClick={() => toggle(p.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ink text-app text-[9px] flex items-center justify-center hover:bg-[#B38A4C] transition-colors"
                  >×</button>
                </div>
              ))}
            </div>
            <div className="text-xs text-ink/60 font-medium whitespace-nowrap mr-auto">
              {selected.length}/{MAX} selected
            </div>
            <button
              onClick={() => setSelected([])}
              className="hidden sm:inline text-[11px] text-ink/40 hover:text-ink transition-colors px-2"
            >Clear</button>
            <button
              onClick={goToTable}
              className="btn-beso px-5 py-2.5 text-[11px] uppercase tracking-[0.14em] font-bold"
            >Compare</button>
          </div>
        </div>
      )}

      {/* Comparison table */}
      {sortedSelected.length >= 2 ? (
        <div ref={tableRef} id="comparison" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <h2 className="text-xl md:text-2xl font-display font-bold text-ink">Full comparison</h2>
            <label className="inline-flex items-center gap-2 text-xs text-ink/60 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showDiff}
                onChange={(e) => setShowDiff(e.target.checked)}
                className="accent-[#B38A4C] w-4 h-4 rounded"
              />
              Only show differences
            </label>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-line/8 bg-surface">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-line/8">
                  <th className="text-left text-[11px] uppercase tracking-wider text-ink/40 font-semibold px-4 py-4 w-44 sticky left-0 bg-surface z-10">
                    Feature
                  </th>
                  {sortedSelected.map((p) => (
                    <th key={p.id} className="text-left px-4 pt-4 pb-3 min-w-[200px] align-top relative">
                      {recommended?.id === p.id && (
                        <span className="inline-block mb-1.5 px-2 py-0.5 rounded-full bg-[#B38A4C]/10 text-[#B38A4C] text-[9px] font-bold uppercase tracking-wider">
                          ★ Best Rated
                        </span>
                      )}
                      <Link href={`/products/${p.slug}`} className="block group">
                        <div className="h-24 rounded-xl bg-[#F5F5DB]/60 flex items-center justify-center overflow-hidden mb-2 transition-transform duration-300 group-hover:scale-[1.02]">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/${p.image}`} alt={p.name} className="max-h-full max-w-full object-contain" loading="lazy" />
                          ) : (
                            <span className="text-3xl opacity-40">{'🪑'}</span>
                          )}
                        </div>
                        <p className="font-semibold text-ink text-sm leading-tight mb-1 group-hover:text-[#B38A4C] transition-colors line-clamp-2">{p.name}</p>
                      </Link>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        {starRow(p.rating)}
                        <span className="text-[11px] text-ink/50">({p.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2.5">
                        <span className="text-base font-bold text-ink">{formatPrice(p.price)}</span>
                        {p.originalPrice && <span className="text-[11px] text-ink/30 line-through">{formatPrice(p.originalPrice)}</span>}
                      </div>
                      <ViewInYourRoom
                        subcategory={p.subcategory}
                        productName={p.name}
                        poster={`/${p.image}`}
                        size="md"
                        label="See in Your Room"
                      />
                      <button
                        aria-label={`Remove ${p.name}`}
                        onClick={() => toggle(p.id)}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-ink text-app text-xs flex items-center justify-center hover:bg-[#B38A4C] transition-colors"
                      >×</button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((section) => (
                  <Fragment key={section.key}>
                    <tr key={`${section.key}-head`} className="border-b border-line/8">
                      <td colSpan={sortedSelected.length + 1}
                        className={`px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] font-bold text-[#B38A4C] bg-ink/[0.02] ${section.key === 'overview' ? '' : ''}`}>
                        {section.label}
                      </td>
                    </tr>
                    {section.rows.map((row) => {
                      const differs = rowDiffers(row.key, sortedSelected);
                      if (showDiff && !differs) return null;
                      return (
                        <tr key={`${section.key}-${row.key}`} className={`border-b border-line/5 ${differs ? 'bg-[#B38A4C]/[0.02]' : ''}`}>
                          <td className="px-4 py-3.5 text-xs text-ink/50 font-medium sticky left-0 bg-surface">
                            <span className="inline-flex items-center gap-1.5">
                              {row.label}
                              {differs && <span className="w-1.5 h-1.5 rounded-full bg-[#B38A4C]" title="Differs across products" />}
                            </span>
                          </td>
                          {sortedSelected.map((p) => {
                            const val = specValue(p, row.key);
                            const display = row.key === 'rating'
                              ? starRow(p.rating, 'text-xs')
                              : row.key === 'price' || row.key === 'originalPrice' || row.key === 'save'
                                ? (val != null ? formatPrice(val as number) : '—')
                                : String(val ?? '—');
                            return (
                              <td key={p.id} className="px-4 py-3.5 text-xs text-ink">
                                {row.key === 'rating' ? display :
                                  <span className={differs ? 'font-semibold text-ink' : 'text-ink/75'}>{display}</span>}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
                {/* CTA row */}
                <tr className="border-t border-line/8">
                  <td className="px-4 py-4 sticky left-0 bg-surface text-xs text-ink/40">Order</td>
                  {sortedSelected.map((p) => (
                    <td key={p.id} className="px-4 py-4">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-1.5 bg-ink text-app px-5 py-2.5 rounded-full text-[11px] uppercase tracking-[0.12em] font-bold hover:scale-[1.02] transition-transform"
                      >
                        View Product
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none " stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 border border-dashed border-line/15 rounded-3xl">
          <div className="text-4xl mb-3 opacity-50">{'⚖️'}</div>
          <p className="text-ink/50 font-medium">
            {sortedSelected.length === 0 ? 'Choose 2–4 products to compare.' : 'Pick one more product to build the comparison.'}
          </p>
          <p className="text-ink/30 text-xs mt-1.5">
            {sortedSelected.length === 0 ? `The tray below fills as you select.` : `${selected.length}/4 selected — keep going, or hit “Compare”.`}
          </p>
        </div>
      )}
    </section>
  );
}