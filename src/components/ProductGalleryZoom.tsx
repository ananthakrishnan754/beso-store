'use client';

import React, { useState, useRef, useCallback, useEffect, createElement } from 'react';

interface ProductGalleryZoomProps {
  productName: string;
  mainImage: string;
  images?: string[];
  subcategory: string;
  modelUrl?: string;
}

export function ProductGalleryZoom({
  productName,
  mainImage,
  images = [],
  subcategory,
  modelUrl,
}: ProductGalleryZoomProps) {
  // Office space lifestyle scene images based on subcategory
  const officeSceneImage = subcategory.includes('table')
    ? '/assets/images/beso-industrial-loft.png'
    : '/assets/images/beso-walnut-midcentury.png';

  // Combine available images
  const allImages = React.useMemo(() => {
    const list = [mainImage, ...images.filter((img) => img !== mainImage)];
    return list.map((src) => (src.startsWith('/') ? src : `/${src}`));
  }, [mainImage, images]);

  const [activeTab, setActiveTab] = useState<'studio' | 'office' | '3d'>('studio');
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [modelReady, setModelReady] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Lazy-load model-viewer script when 3D tab is selected
  useEffect(() => {
    if (activeTab !== '3d') return;
    if (typeof window !== 'undefined' && customElements.get('model-viewer')) {
      setModelReady(true);
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    script.onload = () => setModelReady(true);
    document.head.appendChild(script);
  }, [activeTab]);

  const activeSrc =
    activeTab === 'office'
      ? officeSceneImage
      : allImages[selectedImgIndex] || mainImage;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setZoomPos({ x, y });
  }, []);

  return (
    <div className="space-y-4 select-none">
      {/* ─── Mode Switcher (Studio vs In Office Space vs 3D Interactive) ─── */}
      <div className="flex items-center justify-between gap-2 border-b border-line/10 pb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setActiveTab('studio')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'studio'
                ? 'bg-ink text-app shadow-sm'
                : 'bg-surface hover:bg-surfaceSubtle text-ink/60 hover:text-ink border border-line/10'
            }`}
          >
            Studio View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('office')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
              activeTab === 'office'
                ? 'bg-ink text-app shadow-sm'
                : 'bg-surface hover:bg-surfaceSubtle text-ink/60 hover:text-ink border border-line/10'
            }`}
          >
            <span>🏢</span>
            <span>In Office Space</span>
          </button>

          {modelUrl && (
            <button
              type="button"
              onClick={() => setActiveTab('3d')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeTab === '3d'
                  ? 'bg-ink text-app shadow-sm'
                  : 'bg-surface hover:bg-surfaceSubtle text-ink/60 hover:text-ink border border-line/10'
              }`}
            >
              <span>📦</span>
              <span>3D View (360°)</span>
            </button>
          )}

          <a
            href="#measurements"
            className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-surface hover:bg-surfaceSubtle text-ink/60 hover:text-ink border border-line/10 flex items-center gap-1.5 transition-all"
          >
            <span>📐</span>
            <span>Dimensions</span>
          </a>
        </div>

        <span className="hidden sm:inline-flex text-[11px] text-ink/40 font-medium">
          {activeTab === 'studio'
            ? 'Hover image to zoom 2.2x'
            : activeTab === 'office'
            ? 'Corporate room styling'
            : 'Drag to orbit 360°'}
        </span>
      </div>

      {/* ─── Main Viewer ─── */}
      {activeTab === '3d' && modelUrl ? (
        // ── 3D Interactive Model Viewer ──
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-[#121519] border border-line/10 shadow-lg flex items-center justify-center">
          {modelReady ? (
            <div className="w-full h-full relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(120% 90% at 50% 35%, #2a2e35 0%, #171a1e 50%, #0d0f12 85%)',
                }}
              />
              {createElement('model-viewer', {
                src: modelUrl,
                alt: `${productName} — 3D Model`,
                'auto-rotate': true,
                'rotation-per-second': '15deg',
                'camera-controls': true,
                'camera-orbit': '20deg 76deg 85%',
                'shadow-intensity': '1.2',
                'shadow-softness': '0.8',
                exposure: '0.9',
                'touch-action': 'pan-y',
                style: {
                  position: 'relative',
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                  display: 'block',
                },
              } as Record<string, unknown>)}
              <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/70 bg-black/50 backdrop-blur-md px-3.5 py-1 rounded-full pointer-events-none z-10 border border-white/10">
                Drag to Rotate 360° · Scroll to Zoom
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-white/60">
              <div className="w-8 h-8 border-2 border-brandLime border-t-transparent rounded-full animate-spin" />
              <span className="text-xs">Loading 3D CAD mesh…</span>
            </div>
          )}
        </div>
      ) : (
        // ── Image Viewer with Boss's Cabin Hover Zoom ──
        <div
          ref={containerRef}
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-white dark:bg-[#121519] border border-line/10 shadow-lg cursor-crosshair group"
        >
          {/* Subtle Ambient Studio Floor Shadow */}
          <div className="absolute inset-x-12 bottom-6 h-10 bg-black/10 dark:bg-black/40 rounded-full blur-xl pointer-events-none" />

          {/* Normal Product Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeSrc}
            alt={productName}
            className={`w-full h-full object-contain p-6 sm:p-10 transition-opacity duration-200 ${
              isZooming && activeTab === 'studio' ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {/* High-Definition 2.2x Zoomed Pan Window on Hover */}
          {activeTab === 'studio' && (
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-150 ${
                isZooming ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url(${activeSrc})`,
                backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                backgroundSize: '240%',
                backgroundRepeat: 'no-repeat',
              }}
            />
          )}

          {/* Zoom Cursor Lens Indicator */}
          {isZooming && activeTab === 'studio' && (
            <div
              className="absolute w-28 h-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-brandLime/70 shadow-[0_0_20px_rgb(var(--brand-lime)/0.3)] pointer-events-none"
              style={{ left: `${zoomPos.x}%`, top: `${zoomPos.y}%` }}
            />
          )}
        </div>
      )}

      {/* ─── Gallery Thumbnails ─── */}
      {allImages.length > 1 && activeTab === 'studio' && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          {allImages.map((src, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImgIndex(idx)}
              className={`w-16 h-16 rounded-2xl overflow-hidden border p-1 bg-white dark:bg-[#121519] shrink-0 transition-all ${
                selectedImgIndex === idx
                  ? 'border-brandLime ring-2 ring-brandLime/30 scale-105'
                  : 'border-line/10 hover:border-line/30 opacity-70 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
