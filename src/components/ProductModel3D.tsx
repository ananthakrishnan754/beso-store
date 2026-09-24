'use client';

import {useEffect, useRef, useState} from 'react';
import {createElement} from 'react';

type ProductModel3DProps = {
  src: string;
  alt?: string;
  className?: string;
  aspect?: string;
  autoRotate?: boolean;
  environment?: string;
  /** Show a subtle 3D badge (e.g. "Drag · 360°") for affordance */
  showHint?: boolean;
};

/**
 * Interactive 3D render of a procedural CAD product GLB using @google/model-viewer.
 * Lazy-loads the viewer only when the element mounts; falls back to a loading
 * shimmer so the flagship cards render instantly.
 */
export function ProductModel3D({
  src,
  alt = '3D product model',
  className = '',
  aspect = 'aspect-[4/5]',
  autoRotate = true,
  environment = 'neutral',
  showHint = true,
}: ProductModel3DProps) {
  const [ready, setReady] = useState<'loading' | 'ready' | 'error'>('loading');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
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
  }, []);

  if (ready === 'error') {
    return (
      <div className={`w-full ${aspect} rounded-2xl bg-surface-2/50 flex items-center justify-center text-xs text-ink/40`}>
        3D model unavailable
      </div>
    );
  }

  if (ready === 'loading') {
    return (
      <div className={`w-full ${aspect} rounded-2xl bg-surface-2/40 flex items-center justify-center`}>
        <div className="w-8 h-8 border-2 border-brandLime/25 border-t-brandLime rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`w-full ${aspect} relative rounded-2xl overflow-hidden`}>
      {/* Dark studio backdrop so procedural (material-less) meshes read clearly */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(120% 90% at 50% 35%, #3a3f46 0%, #1c2025 45%, #0d0f12 80%)',
        }}
      />
      {/* Floor shadow plane */}
      <div
        className="absolute inset-x-6 bottom-5 h-10 rounded-[50%] pointer-events-none"
        style={{background: 'radial-gradient(60% 100% at 50% 50%, rgba(0,0,0,0.45), transparent 70%)'}}
      />
      {createElement(
        'model-viewer',
        {
          src,
          alt,
          'auto-rotate': autoRotate,
          'rotation-per-second': '18deg',
          'camera-controls': true,
          'camera-orbit': '18deg 76deg 80%',
          'min-camera-orbit': 'auto 35deg auto',
          'max-camera-orbit': 'auto 88deg auto',
          'shadow-intensity': '1.6',
          'shadow-softness': '0.8',
          'environment-image': environment,
          'environment-intensity': '0.55',
          exposure: '0.85',
          'tone-mapping': 'aces',
          'touch-action': 'pan-y',
          style: {position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'block'},
          'interaction-prompt': autoRotate ? 'none' : 'auto',
        } as Record<string, unknown>,
      )}
      {showHint && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] uppercase tracking-[0.2em] text-white/70 bg-black/35 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none z-10">
          Drag · 360°
        </span>
      )}
    </div>
  );
}