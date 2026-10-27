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
    <span className={`inline-flex items-center gap-0.5 text-amber-500 ${size}`} aria-label={`${rating} out of 5 stars`}>
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-10 sm:py-16 pb-36">
      {/* Header */}
      <div className="mb-10 max-w-2xl">
        <p className="text-accent text-xs font-bold tracking-[0.2em] uppercase mb-2.5 inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgb(var(--accent-rgb)/0.5)]" />
          Side-By-Side Comparison
        </p>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-ink tracking-tight leading-tight">
          Calibrated Specifications, <span className="bg-gradient-to-r from-[#D98E38] via-[#C27526] to-[#A35B16] dark:from-[#F2623F] dark:via-[#E24A2B] dark:to-[#B83218] bg-clip-text text-transparent">Simplified.</span>
        </h1>
        <p className="text-ink/65 text-sm md:text-base mt-3 leading-relaxed">
          Select up to {MAX} contract-grade models to cross-examine ergonomics, dimensions, warranties, and pricing.
        </p>
      </div>

      {/* Picker — grouped, searchable, premium cards */}
      <div className="mb-12 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <svg viewBox="0 0 24 24" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search executive chairs, smart desks, sofas…"
              className="w-full bg-white/80 dark:bg-[#150E09] border border-white/80 dark:border-white/10 rounded-full pl-11 pr-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 backdrop-blur-md shadow-sm transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => setGroup('all')}
              className={`h-10 px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                group === 'all'
                  ? 'bg-ink text-app shadow-md'
                  : 'bg-white/70 dark:bg-[#1A120B] border border-white/80 dark:border-white/10 text-ink/70 hover:text-ink hover:bg-white/90'
              }`}
            >
              All Categories
            </button>
            {[...new Set(ALL.map((p) => p.subcategory))].sort().map((s) => (
              <button
                key={s}
                onClick={() => setGroup(s)}
                className={`h-10 px-5 rounded-full text-xs font-bold whitespace-nowrap transition-all shadow-sm ${
                  group === s
                    ? 'bg-ink text-app shadow-md'
                    : 'bg-white/70 dark:bg-[#1A120B] border border-white/80 dark:border-white/10 text-ink/70 hover:text-ink hover:bg-white/90'
                }`}
              >
                {SUB_LABELS[s] ?? s.replace(/-/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Product Cards Grid (Well Proportioned & Luxury Sized) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((p) => {
            const isSelected = selected.includes(p.id);
            const isDisabled = !isSelected && selected.length >= MAX;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => !isDisabled && toggle(p.id)}
                disabled={isDisabled}
                className={`group relative p-4 sm:p-5 rounded-[2rem] border text-left transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isSelected
                    ? 'bg-accent/10 dark:bg-accent/15 border-accent ring-2 ring-accent/30 shadow-[0_16px_36px_rgb(var(--accent-rgb)/0.25)] -translate-y-1'
                    : isDisabled
                      ? 'bg-surface/30 border-white/20 dark:border-white/5 opacity-40 cursor-not-allowed'
                      : 'border-white/80 dark:border-white/10 bg-gradient-to-br from-white/80 via-white/60 to-[#FFF7EC]/40 dark:from-[#1D140D]/90 dark:via-[#160E08]/85 dark:to-[#0E0905]/90 backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.05),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-accent/50 dark:hover:border-accent/40 hover:-translate-y-1 hover:shadow-xl'
                }`}
              >
                {/* Selection Checkmark Button */}
                <div
                  className={`absolute top-3.5 right-3.5 z-10 flex items-center justify-center w-7 h-7 rounded-full border transition-all ${
                    isSelected
                      ? 'bg-accent border-accent text-white shadow-md'
                      : 'border-white/80 dark:border-white/20 bg-white/80 dark:bg-black/50 text-transparent'
                  }`}
                >
                  <svg viewBox="0 0 20 20" className="w-4 h-4 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M5 10l3 3 6-6" />
                  </svg>
                </div>

                <div>
                  {/* Generous Product Image Showcase Area */}
                  <div className="h-40 sm:h-44 w-full rounded-2xl bg-[#F5EFE6] dark:bg-[#120B07] flex items-center justify-center p-3 sm:p-4 mb-3.5 border border-white/70 dark:border-white/5 overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/${p.image}`}
                        alt={p.name}
                        className="max-h-full max-w-full object-contain drop-shadow-md"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-4xl opacity-40">🪑</span>
                    )}
                  </div>

                  <p className="text-[10px] font-bold text-accent uppercase tracking-widest">
                    {SUB_LABELS[p.subcategory] ?? p.subcategory.replace(/-/g, ' ')}
                  </p>
                  <h3 className="font-serif font-bold text-ink text-sm sm:text-base leading-snug line-clamp-2 mt-1 group-hover:text-accent transition-colors">
                    {p.name}
                  </h3>
                </div>

                <div className="pt-3 mt-3 border-t border-white/60 dark:border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-ink/40 line-through block">
                      {p.originalPrice ? formatPrice(p.originalPrice) : ''}
                    </span>
                    <span className="text-base sm:text-lg font-black text-ink">
                      {formatPrice(p.price)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-ink/75">
                    <span className="text-amber-500">★ {p.rating}</span>
                    <span className="text-ink/40 text-[11px]">({p.reviews})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 rounded-3xl border border-dashed border-white/20 text-ink/50 space-y-2">
            <p className="text-base font-semibold">No models match “{search}”</p>
            <p className="text-xs text-ink/40">Try searching for executive chairs, manager tables, or ergonomic seating.</p>
          </div>
        )}
      </div>

      {/* ─── Sticky Floating Compare Tray ─── */}
      {selected.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-3xl">
          <div className="rounded-full border border-white/80 dark:border-white/15 bg-white/90 dark:bg-[#140D08]/95 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.8),_inset_0_1px_0_rgba(255,255,255,0.15)] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex -space-x-2.5 overflow-hidden shrink-0">
                {sortedSelected.map((p) => (
                  <div key={p.id} className="relative w-11 h-11 rounded-full border-2 border-white dark:border-[#22170E] bg-[#F5EFE6] dark:bg-[#18110B] overflow-hidden shadow-sm">
                    {p.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/${p.image}`} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-base">🪑</span>
                    )}
                    <button
                      aria-label={`Remove ${p.name}`}
                      onClick={() => toggle(p.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ink text-app text-[9px] font-bold flex items-center justify-center hover:bg-accent transition-colors shadow-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-xs font-bold text-ink whitespace-nowrap truncate">
                <span className="text-accent">{selected.length}</span>/{MAX} selected
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setSelected([])}
                className="text-[11px] font-bold text-ink/50 hover:text-ink transition-colors px-3 py-1.5"
              >
                Clear
              </button>
              <button
                onClick={goToTable}
                className="px-6 py-2.5 rounded-full bg-accent hover:bg-accent-2 text-white text-xs uppercase tracking-widest font-extrabold shadow-lg shadow-accent/25 hover:scale-105 active:scale-95 transition-all"
              >
                Compare Specs →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Comparison Table ─── */}
      {sortedSelected.length >= 2 ? (
        <div ref={tableRef} id="comparison" className="scroll-mt-28 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-white/60 dark:border-white/10">
            <div>
              <span className="text-xs font-bold text-accent uppercase tracking-widest block mb-1">
                Detailed Matrix
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-ink tracking-tight">
                Full Technical Breakdown
              </h2>
            </div>
            <label className="inline-flex items-center gap-2 text-xs font-bold text-ink/75 cursor-pointer select-none px-3.5 py-2 rounded-full border border-white/80 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-md">
              <input
                type="checkbox"
                checked={showDiff}
                onChange={(e) => setShowDiff(e.target.checked)}
                className="accent-accent w-4 h-4 rounded"
              />
              Highlight Differences Only
            </label>
          </div>

          <div className="overflow-x-auto rounded-[2rem] border border-white/85 dark:border-white/12 bg-white/80 dark:bg-[#140D08]/90 backdrop-blur-2xl shadow-xl">
            <table className="w-full min-w-[760px] border-collapse">
              <thead>
                <tr className="border-b border-white/60 dark:border-white/10">
                  <th className="text-left text-xs uppercase tracking-widest text-ink/50 font-bold px-6 py-6 w-48 sticky left-0 bg-white/95 dark:bg-[#140D08]/95 backdrop-blur-md z-10">
                    Product Specification
                  </th>
                  {sortedSelected.map((p) => (
                    <th key={p.id} className="text-left px-5 pt-6 pb-5 min-w-[220px] align-top relative">
                      {recommended?.id === p.id && (
                        <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-black uppercase tracking-wider border border-accent/25 shadow-sm">
                          ★ Best Rated
                        </span>
                      )}
                      <Link href={`/products/${p.slug}`} className="block group">
                        <div className="h-40 sm:h-44 rounded-2xl bg-[#F5EFE6] dark:bg-[#160E08] border border-white/80 dark:border-white/10 flex items-center justify-center p-4 overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-[1.02] shadow-sm">
                          {p.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={`/${p.image}`} alt={p.name} className="max-h-full max-w-full object-contain drop-shadow-md" loading="lazy" />
                          ) : (
                            <span className="text-4xl opacity-40">🪑</span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-ink text-base leading-snug mb-1 group-hover:text-accent transition-colors line-clamp-2">
                          {p.name}
                        </h4>
                      </Link>
                      <div className="flex items-center gap-1.5 mb-2">
                        {starRow(p.rating)}
                        <span className="text-xs text-ink/50">({p.reviews})</span>
                      </div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-lg font-black text-ink">{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span className="text-xs text-ink/35 line-through">
                            {formatPrice(p.originalPrice)}
                          </span>
                        )}
                      </div>
                      <ViewInYourRoom
                        subcategory={p.subcategory}
                        productName={p.name}
                        poster={`/${p.image}`}
                        size="md"
                        label="See in AR"
                      />
                      <button
                        aria-label={`Remove ${p.name}`}
                        onClick={() => toggle(p.id)}
                        className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/80 dark:bg-white/10 hover:bg-rose-500 hover:text-white text-ink/60 border border-white/80 dark:border-white/10 text-xs font-bold flex items-center justify-center backdrop-blur-md transition-colors shadow-sm"
                      >
                        ✕
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SECTIONS.map((section) => (
                  <Fragment key={section.key}>
                    <tr key={`${section.key}-head`} className="border-b border-white/60 dark:border-white/10">
                      <td
                        colSpan={sortedSelected.length + 1}
                        className="px-6 py-3 text-[10px] uppercase tracking-[0.25em] font-black text-accent bg-accent/[0.04]"
                      >
                        {section.label}
                      </td>
                    </tr>
                    {section.rows.map((row) => {
                      const differs = rowDiffers(row.key, sortedSelected);
                      if (showDiff && !differs) return null;
                      return (
                        <tr
                          key={`${section.key}-${row.key}`}
                          className={`border-b border-white/40 dark:border-white/5 transition-colors ${
                            differs ? 'bg-accent/[0.03]' : ''
                          }`}
                        >
                          <td className="px-6 py-3.5 text-xs text-ink/60 font-semibold sticky left-0 bg-white/95 dark:bg-[#140D08]/95 backdrop-blur-md">
                            <span className="inline-flex items-center gap-1.5">
                              {row.label}
                              {differs && <span className="w-1.5 h-1.5 rounded-full bg-accent" title="Differs across models" />}
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
                              <td key={p.id} className="px-5 py-3.5 text-xs text-ink">
                                {row.key === 'rating' ? display : (
                                  <span className={differs ? 'font-bold text-ink' : 'text-ink/80'}>{display}</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </Fragment>
                ))}
                {/* Order CTA Row */}
                <tr className="border-t border-white/60 dark:border-white/10">
                  <td className="px-6 py-5 sticky left-0 bg-white/95 dark:bg-[#140D08]/95 text-xs text-ink/50 font-bold">
                    Order Model
                  </td>
                  {sortedSelected.map((p) => (
                    <td key={p.id} className="px-5 py-5">
                      <Link
                        href={`/products/${p.slug}`}
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-2 text-white px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-extrabold shadow-md hover:scale-105 active:scale-95 transition-all"
                      >
                        <span>View Specs</span>
                        <span>→</span>
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-white/30 dark:border-white/10 rounded-[2.5rem] bg-white/40 dark:bg-white/5 backdrop-blur-sm space-y-3">
          <div className="text-4xl mb-2">⚖️</div>
          <p className="text-ink font-serif font-bold text-lg">
            {sortedSelected.length === 0 ? 'Select 2 to 4 models to build your comparison.' : 'Pick at least one more model to cross-examine.'}
          </p>
          <p className="text-ink/50 text-xs max-w-sm mx-auto">
            {sortedSelected.length === 0
              ? 'Click any model card above. The tray at the bottom tracks your selection.'
              : `${selected.length}/4 selected — click another card above to view the matrix.`}
          </p>
        </div>
      )}
    </section>
  );
}