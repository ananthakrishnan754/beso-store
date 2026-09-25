'use client';

import {useEffect, useState} from 'react';
import {createElement} from 'react';

type Product3DViewerProps = {
  subcategory: string;
  productName: string;
  modelUrl?: string;
  poster?: string;
};

/**
 * Product presentation — clean product image by default, with a "3D" button
 * that swaps to an interactive model-viewer (drag/orbit/auto-rotate). No
 * wireframe or video modes.
 */
export function Product3DViewer({
  productName,
  modelUrl,
  poster,
}: Product3DViewerProps) {
  const [show3d, setShow3d] = useState(false);
  const [ready, setReady] = useState<'idle' | 'loading' | 'ready' | 'error'>(
    'idle',
  );

  // Lazy-load model-viewer only when 3D is requested.
  useEffect(() => {
    if (!show3d) return;
    let cancelled = false;
    setReady('loading');
    import('@google/model-viewer')
      .then(() => {
        if (!cancelled) setReady('ready');
      })
      .catch(() => {
        if (!cancelled) setReady('error');
      });
    return () => {
      cancelled = true;
    };
  }, [show3d]);

  const hasModel = Boolean(modelUrl);

  return (
    <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden select-none" style={{backgroundColor: '#f5f5db'}}>
      {/* subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-beso-lime/5 rounded-full blur-[80px] pointer-events-none" />

      {!show3d ? (
        // ── Image view (default) — large silhouette, floor shadow ──
        <>
          <div
            className="absolute inset-x-8 bottom-6 h-12 rounded-[50%] pointer-events-none"
            style={{background: 'radial-gradient(55% 100% at 50% 50%, rgba(27,28,30,0.10), transparent 70%)'}}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster ?? ''}
            alt={productName}
            className="w-full h-full object-contain"
          />
          {hasModel && (
            <button
              type="button"
              onClick={() => setShow3d(true)}
              className="absolute bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-ink text-app pl-3 pr-4 py-2.5 text-[11px] font-bold uppercase tracking-wider shadow-card-hover transition-all hover:scale-[1.04] active:scale-[0.97]"
            >
              {/* cube icon */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M12 3 3 7.8v8.4L12 21l9-4.8V7.8L12 3zm0 2.1 7.2 3.9-3.1 1.7-3.5-1.9V11l1.4.7v3l-1.1.6-2.3-1.2v-3.4L10 9.9 5.8 9l6.2-3.9z" />
              </svg>
              Explore 3D
            </button>
          )}
        </>
      ) : ready === 'ready' ? (
        // ── Interactive 3D view ──
        <div className="w-full h-full relative rounded-3xl overflow-hidden">
          {/* studio backdrop for sculpted meshes */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 35%, #3a3f46 0%, #1c2025 45%, #0d0f12 82%)',
            }}
          />
          <div
            className="absolute inset-x-6 bottom-6 h-10 rounded-[50%] pointer-events-none"
            style={{
              background:
                'radial-gradient(60% 100% at 50% 50%, rgba(0,0,0,0.5), transparent 70%)',
            }}
          />
          {createElement(
            'model-viewer',
            {
              src: modelUrl,
              alt: `${productName} — interactive 3D model`,
              'auto-rotate': true,
              'rotation-per-second': '18deg',
              'camera-controls': true,
              'camera-orbit': '20deg 76deg 85%',
              'min-camera-orbit': 'auto 40deg auto',
              'max-camera-orbit': 'auto 88deg auto',
              'shadow-intensity': '1.3',
              'shadow-softness': '0.7',
              'environment-image': 'neutral',
              'environment-intensity': '0.6',
              exposure: '0.9',
              'tone-mapping': 'aces',
              'touch-action': 'pan-y',
              style: {
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100%',
                display: 'block',
              },
              'interaction-prompt': 'none',
            } as Record<string, unknown>,
          )}

          <button
            type="button"
            onClick={() => setShow3d(false)}
            className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 rounded-full bg-black/40 text-white/90 pl-3 pr-3.5 py-2 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm transition-all hover:bg-black/60"
            aria-label="Close 3D view"
          >
            Image
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.2em] text-white/70 bg-black/35 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none">
            Drag · 360°
          </span>
        </div>
      ) : (
        // ── Loading / error ──
        <div className="w-full h-full flex items-center justify-center">
          {ready === 'error' ? (
            <button
              type="button"
              onClick={() => setShow3d(false)}
              className="text-sm text-ink/50 underline"
            >
              Couldn&apos;t load 3D — back to image
            </button>
          ) : (
            <div className="w-9 h-9 border-2 border-brandLime/25 border-t-brandLime rounded-full animate-spin" />
          )}
        </div>
      )}
    </div>
  );
}