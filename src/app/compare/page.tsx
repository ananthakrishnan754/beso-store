'use client';

import {useState} from 'react';
import products from '@/data/products.json';
import type {Metadata} from 'next';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';

const ALL = products as any[];

function formatPrice(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

const COMPARE_FIELDS = [
  {key: 'category', label: 'Category'},
  {key: 'subcategory', label: 'Type'},
  {key: 'price', label: 'Price', format: 'price'},
  {key: 'originalPrice', label: 'MRP', format: 'price'},
  {key: 'rating', label: 'Rating'},
  {key: 'reviews', label: 'Reviews'},
  {key: 'tagline', label: 'Description'},
  {key: 'sku', label: 'SKU'},
];

export default function ComparePage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState('');

  const filtered = ALL.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subcategory.toLowerCase().includes(search.toLowerCase())
  );

  const selectedProducts = ALL.filter((p) => selected.includes(p.id));

  const toggle = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const remove = (id: number) => {
    setSelected((prev) => prev.filter((i) => i !== id));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Header */}
      <div className="mb-8">
        <p className="text-beso-lime text-sm font-semibold tracking-widest uppercase mb-2">
          Product Comparison
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-ink">
          Compare Products
        </h1>
        <p className="text-ink/40 mt-2">
          Select up to 4 products to compare side by side.
        </p>
      </div>

      {/* Search + selected chips */}
      <div className="mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-beso-card border border-line/6 rounded-xl px-4 py-3 text-ink placeholder-ink/30 text-sm focus:outline-none focus:border-beso-lime/50 mb-4"
        />

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedProducts.map((p) => (
              <span
                key={p.id}
                className="inline-flex items-center gap-2 bg-beso-lime/10 border border-beso-lime/20 text-beso-lime px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {p.name}
                <button
                  onClick={() => remove(p.id)}
                  className="hover:text-ink transition-colors"
                >
                  \u00D7
                </button>
              </span>
            ))}
            {selected.length >= 2 && (
              <button
                onClick={() => setSelected([])}
                className="text-xs text-ink/40 hover:text-ink px-2"
              >
                Clear all
              </button>
            )}
          </div>
        )}
      </div>

      {/* Product picker grid */}
      <div className="mb-12">
        <h2 className="text-sm font-semibold text-ink/60 mb-4">
          Select products to compare ({selected.length}/4)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto pr-2">
          {filtered.map((p) => {
            const isSelected = selected.includes(p.id);
            const isDisabled = !isSelected && selected.length >= 4;
            return (
              <button
                key={p.id}
                onClick={() => !isDisabled && toggle(p.id)}
                disabled={isDisabled}
                className={`p-3 rounded-xl border text-left transition-all text-sm ${
                  isSelected
                    ? 'bg-beso-lime/10 border-beso-lime/40 ring-1 ring-beso-lime/30'
                    : isDisabled
                      ? 'bg-beso-card/30 border-line/[0.03] opacity-40 cursor-not-allowed'
                      : 'bg-beso-card border-line/6 hover:border-line/15'
                }`}
              >
                <div className="text-lg mb-1">{'\u{1FA91}'}</div>
                <p className="font-medium text-ink line-clamp-1">{p.name}</p>
                <p className="text-xs text-ink/40 capitalize">
                  {p.subcategory.replace(/-/g, ' ')}
                </p>
                <p className="text-xs text-beso-lime mt-1 font-medium">
                  {formatPrice(p.price)}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Comparison table */}
      {selectedProducts.length >= 2 && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-bold text-ink mb-6">
            Comparison <span className="text-beso-lime">Table</span>
          </h2>
          <table className="w-full min-w-[600px] border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm text-ink/40 font-medium px-4 py-3 border-b border-line/6 w-40">
                  Feature
                </th>
                {selectedProducts.map((p) => (
                  <th
                    key={p.id}
                    className="text-left text-sm text-ink font-semibold px-4 py-3 border-b border-line/6 min-w-[180px] align-top"
                  >
                    <span className="block mb-1">{p.name}</span>
                    <ViewInYourRoom
                      subcategory={p.subcategory}
                      productName={p.name}
                      poster={p.image}
                      size="md"
                      label="View in Your Room"
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_FIELDS.map((field) => (
                <tr
                  key={field.key}
                  className="hover:bg-ink/[0.02] transition-colors"
                >
                  <td className="text-sm text-ink/40 px-4 py-3 border-b border-line/4">
                    {field.label}
                  </td>
                  {selectedProducts.map((p) => {
                    let val = p[field.key];
                    if (field.format === 'price' && val) {
                      val = formatPrice(val);
                    } else if (field.key === 'subcategory') {
                      val = String(val).replace(/-/g, ' ');
                    }
                    return (
                      <td
                        key={p.id}
                        className="text-sm text-ink px-4 py-3 border-b border-line/4"
                      >
                        {val != null ? String(val) : '\u2014'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedProducts.length === 1 && (
        <div className="text-center py-12 text-ink/30 text-sm">
          Select at least 2 products to see the comparison table.
        </div>
      )}
    </section>
  );
}
