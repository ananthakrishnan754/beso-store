'use client';

import {useEffect, useRef, useState} from 'react';

/**
 * Scroll-video techniques for the design concepts.
 *
 *  A — frame sequence scrub  (studioFrames / webp sequence)
 *  B — <video> currentTime scrub (all-intra mp4)
 *  C — ambient autoplay loop (IntersectionObserver play/pause)
 *  D — play-once on enter
 *
 * All reduced-motion aware: static poster + normal flow.
 */

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─── Technique A: frame-sequence scrub ─────────────────────────────────── */
export function ScrubFrames({
  src,           // e.g. "/assets/videos/designs/03" (folder with f_0001.webp …)
  count,         // total frames
  start = 'f_0001.webp',
  poster,        // shown instantly / under reduced motion
  children,      // copy beats (optional)
  className = '',
}: {
  src: string;
  count: number;
  start?: string;
  poster?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = wrap.current, cv = canvasRef.current;
    if (!w || !cv || reduced()) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const imgs: HTMLImageElement[] = new Array(count);
    framesRef.current = imgs;
    let loaded = 0, target = 0, cur = 0, raf = 0, dead = false;

    const load = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.onload = () => { imgs[i] = im; loaded++; res(); };
        im.onerror = () => res();
        im.src = `${src}/f_${String(i + 1).padStart(4, '0')}.webp`;
      });

    const draw = (idx: number) => {
      const im = imgs[idx];
      if (!im) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = w.getBoundingClientRect();
      const cw = r.width, ch = r.height;
      if (cv.width !== cw * dpr) { cv.width = cw * dpr; cv.height = ch * dpr; }
      // object-fit: cover
      const s = Math.max(cw / im.width, ch / im.height) * dpr;
      const dw = im.width * s, dh = im.height * s;
      ctx.drawImage(im, (cw * dpr - dw) / 2, (ch * dpr - dh) / 2, dw, dh);
    };

    const tick = () => {
      if (dead) return;
      const r = w.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      target = p * (count - 1);
      cur += (target - cur) * 0.1; // lerp
      const idx = Math.round(cur);
      draw(idx);
      raf = requestAnimationFrame(tick);
    };

    // progressive: first frame fast, then stride-4, then fill
    (async () => {
      await load(0);
      setReady(true);
      draw(0);
      raf = requestAnimationFrame(tick);
      for (let i = 1; i < count; i += 4) await load(i);
      for (let i = 0; i < count; i++) if (!imgs[i]) await load(i);
      void loaded;
    })();

    const onResize = () => draw(Math.round(cur));
    window.addEventListener('resize', onResize);
    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [src, count]);

  return (
    <div ref={wrap} className={`relative ${className}`}>
      {/* sticky stage */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0d0d0f]">
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        {!ready && poster ? null : null}
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}

/* ─── Technique B: <video> currentTime scrub ─────────────────────────────── */
export function ScrubVideo({
  src, poster, children, className = '', railVh = 400,
}: { src: string; poster?: string; children?: React.ReactNode; className?: string; railVh?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const w = wrap.current, v = vid.current;
    if (!w || !v) return;
    if (reduced() || /iPad|iPhone|iPod/.test(navigator.userAgent)) { setSupported(false); return; }
    let raf = 0, cur = 0, dead = false;

    const tick = () => {
      if (dead) return;
      const r = w.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const t = p * (v.duration || 1);
      cur += (t - cur) * 0.1;
      if (Math.abs(v.currentTime - cur) > 0.02) {
        try { v.currentTime = cur; } catch { /* metadata not ready */ }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { dead = true; cancelAnimationFrame(raf); };
  }, [src]);

  if (!supported) {
    return (
      <div className={`relative ${className}`} style={{minHeight: '60vh'}}>
        {poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" className="w-full h-full object-cover rounded-2xl" />
        )}
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrap} className={`relative ${className}`} style={{height: `${railVh}vh`}}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0d0d0f]">
        <video
          ref={vid}
          src={src}
          poster={poster}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0">{children}</div>
      </div>
    </div>
  );
}

/* ─── Technique C: ambient loop + reveals ────────────────────────────────── */
export function AmbientLoop({
  src, poster, className = '', overlay, children,
}: { src: string; poster?: string; className?: string; overlay?: React.ReactNode; children?: React.ReactNode }) {
  const vid = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = vid.current, b = box.current;
    if (!v || !b || reduced()) return;
    const io = new IntersectionObserver(
      ([e]) => { e.isIntersecting ? v.play().catch(() => {}) : v.pause(); },
      {threshold: 0.25},
    );
    io.observe(b);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`relative overflow-hidden ${className}`}>
      <video
        ref={vid}
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {overlay}
    </div>
  );
}

/* ─── Technique D: play once on enter ────────────────────────────────────── */
export function PlayOnEnter({
  src, poster, className = '', children,
}: { src: string; poster?: string; className?: string; children?: React.ReactNode }) {
  const vid = useRef<HTMLVideoElement>(null);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = vid.current, b = box.current;
    if (!v || !b || reduced()) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { v.play().catch(() => {}); } },
      {threshold: 0.5},
    );
    io.observe(b);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className={`relative overflow-hidden ${className}`}>
      <video
        ref={vid}
        src={src}
        poster={poster}
        muted
        playsInline
        loop={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {children}
    </div>
  );
}