'use client';

import {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {DESIGNS, getDesign} from './registry';
import {DesignSwitcher} from './DesignSwitcher';

const STORAGE = 'beso-design';

/**
 * Renders the landing page: the untouched Current home, or a registered design
 * concept. Driven by ?design=N (shareable) with a sessionStorage fallback so the
 * choice sticks across navigation. With no concepts registered the switcher is
 * hidden and the production home renders exactly as before the concept work.
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

  // Concept previews own their chrome: hide the shared header/footer while a
  // design is active so each one reads as an independent build.
  useEffect(() => {
    document.documentElement.dataset.designMode = n >= 1 ? '1' : '0';
    return () => { document.documentElement.dataset.designMode = '0'; };
  }, [n]);

  const meta = getDesign(n);
  const Design = n >= 1 && meta.folder ? lazy(() => import(`./${meta.folder}/index.tsx`)) : null;

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