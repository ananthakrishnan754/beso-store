'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * Dynamic scroll effects — one rAF loop drives every element marked with
 * `data-fx`:
 *   data-fx="parallax" data-px="0.12"   translateY as the page scrolls
 *   data-fx="drift"    data-px="0.25"    translateX (horizontal counter-drift)
 *   data-fx="tilt"     data-rot="4"      subtle rotate through the viewport
 *   data-fx="zoom"     data-zoom="0.06"  scale up as it crosses centre
 *
 * All effects are distance-relative (not time), reduced-motion aware, and
 * share a single scroll listener + rAF batch.
 */
export function ScrollFX() {
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let els: Element[] = [];

    const collect = () => {
      els = [...document.querySelectorAll('[data-fx]')];
    };
    collect();

    const tick = () => {
      raf.current = null;
      const vh = window.innerHeight;
      for (const el of els) {
        const r = (el as HTMLElement).getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        // progress: -1 (below fold) → 0 (centred) → 1 (above fold)
        const centre = r.top + r.height / 2;
        const p = (vh / 2 - centre) / vh;
        const kind = el.getAttribute('data-fx');
        if (kind === 'parallax') {
          const s = parseFloat(el.getAttribute('data-px') || '0.12');
          (el as HTMLElement).style.transform = `translate3d(0, ${(-p * s * 100).toFixed(2)}px, 0)`;
        } else if (kind === 'drift') {
          const s = parseFloat(el.getAttribute('data-px') || '0.25');
          (el as HTMLElement).style.transform = `translate3d(${(-p * s * 100).toFixed(2)}px, 0, 0)`;
        } else if (kind === 'tilt') {
          const m = parseFloat(el.getAttribute('data-rot') || '4');
          (el as HTMLElement).style.transform = `perspective(1200px) rotateX(${(p * m).toFixed(2)}deg)`;
        } else if (kind === 'zoom') {
          const z = parseFloat(el.getAttribute('data-zoom') || '0.06');
          const k = 1 + (0.5 - Math.abs(p)) * z;
          (el as HTMLElement).style.transform = `scale(${k.toFixed(4)})`;
        }
      }
    };

    const onScroll = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return null;
}

/**
 * Count-up number: animates from 0 to `to` when it first enters the viewport.
 * Handles plain numbers and returns JSX-ready content.
 */
export function CountUp({
  to,
  duration = 1400,
  className = '',
  prefix = '',
  suffix = '',
}: {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        const t0 = performance.now();
        const step = (now: number) => {
          const k = Math.min(1, (now - t0) / duration);
          // expo-out easing for a premium decelerating count
          const eased = 1 - Math.pow(1 - k, 4);
          setVal(Math.round(to * eased));
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      {threshold: 0.5},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val}
      {suffix}
    </span>
  );
}