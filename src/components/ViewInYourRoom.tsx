'use client';

import { useCallback, useEffect, useState } from 'react';
import { createElement } from 'react';
import { getProductModel, type ARModel } from '@/lib/arModels';

type ViewInYourRoomProps = {
  /** Product subcategory — resolved to an AR model via lib/arModels. */
  subcategory?: string;
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
  model,
  productName = 'this product',
  poster,
  variant = 'outline',
  align = 'left',
  size = 'md',
  label = 'View in Your Room',
}: ViewInYourRoomProps) {
  const resolved: ARModel | null = model ?? (subcategory ? getProductModel(subcategory) : null);
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');

  // Lazy-load @google/model-viewer only when the modal opens.
  useEffect(() => {
    if (!open || viewer !== 'idle') return;
    let cancelled = false;
    import('@google/model-viewer')
      .then(() => {
        if (!cancelled) setViewer('ready');
      })
      .catch(() => {
        if (!cancelled) setViewer('error');
      });
    return () => {
      cancelled = true;
    };
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
  const pad = size === 'lg' ? 'px-7 py-3.5' : 'px-5 py-2.5';

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${btnClasses} ${pad} text-xs uppercase tracking-wider font-bold inline-flex items-center justify-center gap-2 ${align === 'center' ? 'w-full' : ''}`}
        style={{ background: variant === 'solid' ? 'var(--accent)' : undefined }}
      >
        {arIcon()}
        <span>{label}</span>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} — View in Your Room`}
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-6"
          onClick={close}
        >
          <div
            className="w-full h-[100dvh] sm:h-auto sm:max-h-[85vh] sm:max-w-5xl bg-beso-card sm:rounded-3xl border border-line/10 overflow-hidden flex flex-col relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-line/6 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-beso-lime shrink-0">{arIcon()}</span>
                <div className="min-w-0">
                  <div className="text-sm font-bold text-ink truncate">{productName}</div>
                  <div className="text-[10px] text-ink/40 uppercase tracking-wide">
                    3D Preview · AR on mobile
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
            <div className="relative flex-1 min-h-0 bg-gradient-to-b from-black/40 to-black/60">
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
                    } as Record<string, unknown>,
                  createElement(
                    'button',
                    { slot: 'ar-button', className: 'ar-cta' },
                    arIcon(),
                    'View in your space'
                  )
                )
              ) : viewer === 'error' ? (
                <div className="flex items-center justify-center h-full text-sm text-ink/50">
                  Couldn&apos;t load the 3D viewer.
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="w-10 h-10 border-2 border-beso-lime/30 border-t-beso-lime rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Footer instructions */}
            <div className="px-5 py-3.5 border-t border-line/6 text-center shrink-0 bg-beso-card">
              <p className="text-[11px] text-ink/40 leading-relaxed max-w-lg mx-auto">
                On your phone, tap <span className="text-beso-lime font-semibold">View in your space</span> to place{' '}
                {productName} in real size. Point your camera at the floor and move around to preview it in your room.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}