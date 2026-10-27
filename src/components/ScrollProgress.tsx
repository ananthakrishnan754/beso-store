'use client';

import { useEffect, useRef } from 'react';

/**
 * High-performance scroll-progress bar pinned to the top of the viewport.
 * Uses direct DOM manipulation with hardware-accelerated scaleX inside rAF
 * to eliminate React re-renders and avoid expensive DOM layout reflows.
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = barRef.current;
      if (!el) return;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const progress = max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0;
      el.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div ref={barRef} className="scroll-progress" aria-hidden="true" />;
}