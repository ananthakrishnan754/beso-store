'use client';

import {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {DESIGNS, getDesign} from './registry';
import {DesignSwitcher} from './DesignSwitcher';

const STORAGE = 'beso-design';

/**
 * Renders the landing page: the untouched Current home, or one of the ten
 * switchable design concepts. Driven by ?design=N (shareable) with a
 * sessionStorage fallback so the choice sticks across navigation.
 */
export function DesignShell({current}: {current: React.ReactNode}) {
  const [n, setN] = useState(0);

  // hydrate: URL wins, then session
  useEffect(() => {
    const q = Number(new URLSearchParams(window.location.search).get('design'));
    const s = Number(sessionStorage.getItem(STORAGE) || '0');
    const next = Number.isFinite(q) && q >= 1 && q <= DESIGNS.length ? q : (Number.isFinite(s) ? s : 0);
    setN(next >= 1 && next <= DESIGNS.length ? next : 0);
  }, []);

  const go = useCallback((next: number) => {
    setN(next);
    try { sessionStorage.setItem(STORAGE, String(next)); } catch { /* */ }
    const url = next === 0
      ? window.location.pathname
      : `${window.location.pathname}?design=${next}`;
    window.history.replaceState(null, '', url);
  }, []);

  const meta = getDesign(n);
  const Design = n >= 1 ? lazy(() => import(`./${meta.folder}/index.tsx`)) : null;

  return (
    <>
      {Design ? (
        <Suspense fallback={<DesignFallback />}>
          <Design />
        </Suspense>
      ) : (
        current
      )}
      <DesignSwitcher current={n} total={DESIGNS.length} name={meta.name} go={go} />
    </>
  );
}

function DesignFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-app">
      <div className="w-9 h-9 border-2 border-ink/15 border-t-ink rounded-full animate-spin" />
    </div>
  );
}