'use client';

import { useEffect, useState, useRef } from 'react';
import { THEMES } from '@/lib/themes';

const DEFAULT_HERO_VIDEO = '/assets/videos/hero-bg-ivory.webm';
const DEFAULT_BASE = DEFAULT_HERO_VIDEO.replace(/\.(webm|mp4)$/i, '');

const HERO_VIDEO_BY_ID = THEMES.reduce<Record<string, string>>((acc, theme) => {
  if (theme.heroVideo) acc[theme.id] = theme.heroVideo;
  return acc;
}, {});

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Initialize directly from the current `data-theme` (set by the FOUC guard in
  // the <head> BEFORE React hydrates), so the very first paint already shows the
  // correct theme video — never a flash of the old default (hero-bg) first.
  const resolveBase = () => {
    if (typeof document === 'undefined') return DEFAULT_BASE;
    const theme = document.documentElement.getAttribute('data-theme');
    const src = (theme && HERO_VIDEO_BY_ID[theme]) || DEFAULT_HERO_VIDEO;
    return src.replace(/\.(webm|mp4)$/i, '');
  };
  const [base, setBase] = useState<string>(() => resolveBase());

  useEffect(() => {
    const sync = () => setBase(resolveBase());
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    videoRef.current?.load();
  }, [base]);

  const handleError = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    if (base === DEFAULT_BASE) return;
    setBase(DEFAULT_BASE);
  };

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-90 [filter:contrast(1.12)_saturate(1.05)]"
      onError={handleError}
    >
      <source key={`${base}.webm`} src={`${base}.webm`} type="video/webm" />
      <source key={`${base}.mp4`} src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}