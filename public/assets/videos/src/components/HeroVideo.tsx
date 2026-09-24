'use client';

import { useEffect, useState, useRef } from 'react';
import { THEMES } from '@/lib/themes';

const DEFAULT_HERO_VIDEO = '/assets/videos/hero-bg.webm';
const DEFAULT_BASE = DEFAULT_HERO_VIDEO.replace(/\.(webm|mp4)$/i, '');

const HERO_VIDEO_BY_ID = THEMES.reduce<Record<string, string>>((acc, theme) => {
  if (theme.heroVideo) acc[theme.id] = theme.heroVideo;
  return acc;
}, {});

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [base, setBase] = useState(DEFAULT_BASE);

  useEffect(() => {
    const sync = () => {
      const theme = document.documentElement.dataset.theme;
      const src = (theme && HERO_VIDEO_BY_ID[theme]) || DEFAULT_HERO_VIDEO;
      const nextBase = src.replace(/\.(webm|mp4)$/i, '');
      setBase((prev) => (prev === nextBase ? prev : nextBase));
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
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
      className="w-full h-full object-cover opacity-90"
      onError={handleError}
    >
      <source key={`${base}.webm`} src={`${base}.webm`} type="video/webm" />
      <source key={`${base}.mp4`} src={`${base}.mp4`} type="video/mp4" />
    </video>
  );
}