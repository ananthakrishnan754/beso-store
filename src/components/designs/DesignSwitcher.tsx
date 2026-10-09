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
 * Bottom-centre floating "Design" switcher. One flag: delete this component
 * (and its mount in DesignShell) to remove the whole experiment.
 */
export function DesignSwitcher({current, total, name, go}: Props) {
  const [open, setOpen] = useState(false);

  // keyboard: [ and ] to step through designs while reviewing
  useEffect(() => {
    if (total === 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target && ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      if (e.key === ']') go(Math.min(total, (current || total) + 1));
      if (e.key === '[') go(current <= 1 ? 0 : current - 1);
      if (/^[0-9]$/.test(e.key)) go(Number(e.key));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, total, go]);

  // No concepts registered yet — keep the live site identical to the production
  // home. The switcher reappears automatically once a design passes the gate.
  if (total === 0) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[80] print:hidden">
      <div className="flex items-center gap-1 rounded-full bg-ink/90 backdrop-blur-md border border-white/10 text-[#F6F1E7] shadow-[0_12px_40px_rgba(0,0,0,0.35)] pl-2 pr-1.5 py-1.5">
        <button
          onClick={() => go(0)}
          aria-current={current === 0}
          className={`px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
            current === 0 ? 'bg-[#F6F1E7] text-ink' : 'text-[#F6F1E7]/60 hover:text-[#F6F1E7]'
          }`}
        >
          Current
        </button>

        <span className="w-px h-5 bg-white/15 mx-1" aria-hidden="true" />

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Design concepts"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E7C99B] hover:text-white transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
          </svg>
          {current === 0 ? `Concepts ${total}` : `0${current} · ${name}`}
        </button>

        {open && (
          <div className="absolute bottom-full left-0 mb-3 w-[300px] rounded-2xl bg-ink/95 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] p-2">
            <button
              onClick={() => { go(0); setOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-xl transition-colors ${current === 0 ? 'bg-white/10' : 'hover:bg-white/5'}`}
            >
              <div className="text-[13px] font-semibold">Current</div>
              <div className="text-[10px] text-white/45 uppercase tracking-wider">The live site</div>
            </button>

            <div className="my-1.5 h-px bg-white/10" />

            {DESIGNS.map((d) => (
              <button
                key={d.n}
                onClick={() => { go(d.n); setOpen(false); }}
                className={`w-full flex items-center gap-3 text-left px-3 py-2 rounded-xl transition-colors ${
                  current === d.n ? 'bg-white/10' : 'hover:bg-white/5'
                }`}
              >
                <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  current === d.n ? 'bg-[#E7C99B] text-ink' : 'bg-white/10 text-[#F6F1E7]/70'
                }`}>{d.n}</span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-semibold truncate">{d.name}</span>
                  <span className="block text-[10px] text-white/45 uppercase tracking-wider truncate">{d.tag}</span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}