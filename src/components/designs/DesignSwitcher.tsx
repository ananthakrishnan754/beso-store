'use client';

import {useEffect, useState} from 'react';
import {DESIGNS} from './registry';

type Props = {
  current: number;
  total: number;
  name: string;
  go: (n: number) => void;
};

/**
 * Minimal design-review rail. Deliberately understated (bottom-left, mono,
 * translucent) so it reads as a utility layer and never pollutes the design.
 * Keyboard: [ / ] step, 0–9 jump. Hidden on the production home (total === 0).
 */
export function DesignSwitcher({current, total, name, go}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (total === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === ']') go(Math.min(total, current + 1));
      if (e.key === '[') go(current <= 1 ? 0 : current - 1);
      if (/^[0-9]$/.test(e.key)) go(Number(e.key));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, total, go]);

  if (total === 0) return null;

  const pad = (n: number) => String(n).padStart(2, '0');
  const btn = 'px-2 py-1 transition-colors hover:text-white disabled:opacity-30 disabled:hover:text-[#F6F1E7]/70';

  return (
    <div className="fixed bottom-4 left-4 z-[80] print:hidden" style={{fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace'}}>
      <div className="relative flex items-center gap-1 rounded-sm border border-white/10 bg-black/75 px-2 py-1 text-[11px] uppercase tracking-[0.14em] text-[#F6F1E7]/70">
        <button onClick={() => go(0)} aria-current={current === 0} className={`${btn} ${current === 0 ? 'text-white' : ''}`}>
          Current
        </button>
        <span className="mx-1 h-4 w-px bg-white/15" aria-hidden="true" />
        <button onClick={() => go(current <= 1 ? 0 : current - 1)} disabled={current <= 0} aria-label="Previous design" className={btn}>‹</button>
        <button onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Design concepts" className="px-1 text-[#E7C99B] transition-colors hover:text-white">
          {current === 0 ? `${total} concepts` : `${pad(current)} · ${name}`}
        </button>
        <button onClick={() => go(Math.min(total, current + 1))} disabled={current >= total} aria-label="Next design" className={btn}>›</button>

        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-[260px] rounded-md border border-white/10 bg-black/90 p-1.5">
            <button
              onClick={() => { go(0); setOpen(false); }}
              className={`flex w-full items-center justify-between rounded px-3 py-2 text-left transition-colors ${current === 0 ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <span className="text-[12px] normal-case tracking-normal text-[#F6F1E7]">Current</span>
              <span className="text-[10px] uppercase tracking-[0.14em] text-white/40">Live site</span>
            </button>
            {DESIGNS.map((d) => (
              <button
                key={d.n}
                onClick={() => { go(d.n); setOpen(false); }}
                className={`flex w-full items-center gap-3 rounded px-3 py-2 text-left transition-colors ${current === d.n ? 'bg-white/10' : 'hover:bg-white/5'}`}
              >
                <span className="text-[10px] text-[#E7C99B]">{pad(d.n)}</span>
                <span className="min-w-0 flex-1 truncate text-[12px] normal-case tracking-normal text-[#F6F1E7]">{d.name}</span>
                <span className="truncate text-[10px] uppercase tracking-[0.12em] text-white/40">{d.tag}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
