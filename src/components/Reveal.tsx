'use client';

import {useEffect, useRef, type ReactNode} from 'react';

type RevealProps = {
  children: ReactNode;
  /** Additional class names, e.g. "stagger" for staggered children. */
  className?: string;
  /** Amount of the element visible before revealing, 0–1. */
  threshold?: number;
  /** Delay in milliseconds before the reveal transition starts. */
  delay?: number;
  as?: 'div' | 'section' | 'figure' | 'li';
};

/**
 * Reveals its children with a fade-up when they enter the viewport.
 * Respects `prefers-reduced-motion` via the `.reveal` CSS fallback.
 */
export function Reveal({children, className = '', threshold = 0.12, delay = 0, as = 'div'}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const Tag = as as 'div';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            el.style.transitionDelay = `${delay}ms`;
            io.unobserve(el);
          }
        });
      },
      {threshold, rootMargin: '0px 0px -8% 0px'},
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, delay]);

  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
}