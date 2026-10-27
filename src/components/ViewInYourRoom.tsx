'use client';

import { useCallback, useEffect, useState } from 'react';
import { createElement } from 'react';
import { resolveProductModel, type ARModel } from '@/lib/arModels';

type ViewInYourRoomProps = {
  /** Product subcategory — resolved to an AR model via lib/arModels. */
  subcategory?: string;
  /** Product slug — resolved to the detailed per-product GLB when available. */
  slug?: string;
  /** Explicit model override (e.g. the composed meeting-room scene). */
  model?: ARModel;
  productName?: string;
  poster?: string;
  variant?: 'outline' | 'solid';
  align?: 'left' | 'center';
  size?: 'md' | 'lg';
  label?: string;
};

function arIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
      <path d="M21 8.6c0-.4-.2-.7-.5-.9L12.6 3.1c-.4-.2-.9-.2-1.3 0L3.5 7.7c-.3.2-.5.5-.5.9v6.8c0 .4.2.7.5.9l7.8 4.6c.2.1.4.2.7.2s.5-.1.7-.2l7.8-4.6c.3-.2.5-.5.5-.9V8.6zM12 4.8l5.5 3.2L12 11.2 6.5 8 12 4.8zM5.2 9.5l5.9 3.5v5.6L5.2 15v-5.5zm12.6 9.1l-5.9 3.5v-5.6l5.9-3.5v5.6z" />
    </svg>
  );
}

export function ViewInYourRoom({
  subcategory,
  slug,
  model,
  productName = 'this product',
  poster,
  variant = 'outline',
  align = 'left',
  size = 'md',
  label = 'View in Your Room',
}: ViewInYourRoomProps) {
  const resolved: ARModel | null = model ?? resolveProductModel(slug, subcategory);
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  // Lazy-load @google/model-viewer only when the modal opens.
  useEffect(() => {
    if (!open || viewer !== 'idle') return;
    if (typeof window !== 'undefined' && customElements.get('model-viewer')) {
      setViewer('ready');
      return;
    }
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
    script.onload = () => setViewer('ready');
    script.onerror = () => setViewer('error');
    document.head.appendChild(script);
  }, [open, viewer]);

  // Lock page scroll + Esc to close.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (!resolved) return null;

  const btnClasses =
    variant === 'solid'
      ? 'btn-beso'
      : 'btn-pill-outline';
  const pad = size === 'lg' ? 'px-6 py-3' : 'px-4 py-2';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${btnClasses} ${pad} text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0`}
      >
        {arIcon()}
        <span>{label}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} — View in Your Room`}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={close}
        >
          <div
            className="w-full h-[90vh] sm:h-[82vh] max-h-[820px] max-w-5xl bg-beso-card rounded-3xl border border-line/10 overflow-hidden flex flex-col relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-line/10 shrink-0 bg-surface">
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-8 h-8 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0">{arIcon()}</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink truncate">{productName}</div>
                  <div className="text-[10px] text-ink/50 uppercase tracking-wider font-medium">
                    Interactive 3D Preview · Mobile AR Scale
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 border border-line/10 flex items-center justify-center text-ink/70 hover:text-ink transition-colors shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M18.3 5.7a1 1 0 0 1 0 1.4L13.4 12l4.9 4.9a1 1 0 1 1-1.4 1.4L12 13.4l-4.9 4.9a1 1 0 0 1-1.4-1.4l4.9-4.9-4.9-4.9a1 1 0 0 1 1.4-1.4l4.9 4.9 4.9-4.9a1 1 0 0 1 1.4 0z" /></svg>
              </button>
            </div>

            {/* Viewer stage */}
            <div className="relative flex-1 min-h-[380px] w-full bg-gradient-to-b from-black/40 via-black/55 to-black/70 flex items-center justify-center overflow-hidden">
              {viewer === 'ready' ? (
                createElement(
                  'model-viewer',
                  {
                    src: resolved.src,
                    alt: `${productName} shown at real scale`,
                    ar: true,
                    'ar-modes': 'webxr scene-viewer quick-look',
                    'ar-placement': 'floor',
                    'ar-scale': 'auto',
                    scale: `1 1 1`,
                    'camera-controls': true,
                    'camera-orbit': '0deg 78deg auto',
                    'auto-rotate': true,
                    'rotation-per-second': '10deg',
                    'interaction-prompt': 'auto',
                    'shadow-intensity': '1.1',
                    exposure: '1',
                    'environment-image': 'neutral',
                    'touch-action': 'pan-y',
                    poster: poster ? `/${poster.replace(/^\//, '')}` : undefined,
                    style: { width: '100%', height: '100%' },
                  } as Record<string, unknown>,
                  createElement(
                    'button',
                    { slot: 'ar-button', className: 'ar-cta' },
                    arIcon(),
                    'View in your space'
                  )
                )
              ) : viewer === 'error' ? (
                <div className="flex items-center justify-center h-full text-sm text-white/60">
                  Couldn&apos;t load the 3D viewer.
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
                  <span className="text-xs text-white/70 tracking-wider">Loading 3D CAD mesh…</span>
                </div>
              )}

              {/* Interaction Hint Overlay */}
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest text-white/80 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full pointer-events-none z-10 border border-white/10 shadow-lg">
                Drag to Rotate 360° · Scroll to Zoom
              </span>
            </div>

            {/* Footer instructions */}
            <div className="px-6 py-4 border-t border-line/10 text-center shrink-0 bg-surface">
              <p className="text-xs text-ink/60 leading-relaxed max-w-lg mx-auto">
                On mobile browsers (iOS QuickLook / Android WebXR), tap <span className="text-accent font-bold">View in your space</span> to project this model at 1:1 true physical scale in your room.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}