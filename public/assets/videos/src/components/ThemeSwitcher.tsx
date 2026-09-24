'use client';

import {useCallback, useEffect, useRef, useState} from 'react';
import {THEMES, type Theme, type ThemeId} from '@/lib/themes';
import {DEFAULT_THEME, THEME_STORAGE_KEY} from '@/lib/site-config';

function Swatch({theme, size = 22}: {theme: Theme; size?: number}) {
  const dot = Math.round(size / 2.2);
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden rounded-full border border-line/20"
      style={{width: size, height: size}}
      aria-hidden="true"
    >
      <span
        className="absolute left-0 top-0 h-full w-1/2"
        style={{backgroundColor: theme.swatch.app}}
      />
      <span
        className="absolute right-0 top-0 h-full w-1/2"
        style={{backgroundColor: theme.swatch.ink}}
      />
      <span
        className="absolute rounded-full"
        style={{
          left: size / 2 - dot / 2,
          top: size / 2 - dot / 2,
          width: dot,
          height: dot,
          backgroundColor: theme.swatch.accent,
        }}
      />
    </span>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<ThemeId>(DEFAULT_THEME);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = typeof document !== 'undefined' ? document.documentElement.dataset.theme : undefined;
    if (current && THEMES.some((t) => t.id === current)) {
      setActive(current as ThemeId);
    }
  }, []);

  const applyTheme = useCallback((id: ThemeId) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', id);
    root.style.colorScheme = THEMES.find((t) => t.id === id)?.mode ?? 'dark';
    try {
      localStorage.setItem(THEME_STORAGE_KEY, id);
    } catch {
      // private mode / storage unavailable — theme still applies for the session
    }
    const theme = THEMES.find((t) => t.id === id);
    if (theme) {
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', theme.swatch.app);
    }
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 380);
    setActive(id);
    setOpen(false);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (
        e.key === THEME_STORAGE_KEY &&
        e.newValue &&
        THEMES.some((t) => t.id === e.newValue)
      ) {
        applyTheme(e.newValue as ThemeId);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [applyTheme]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('touchstart', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('touchstart', onPointerDown);
    };
  }, [open]);

  return (
    <div
      className="fixed bottom-5 right-5 z-[60]"
      ref={panelRef}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Choose a theme"
          className="absolute bottom-full right-0 mb-3 w-[19rem] max-h-[min(70vh,560px)] overflow-y-auto rounded-2xl border border-line/10 bg-surface p-2 shadow-card-hover"
        >
          <div className="px-3 pb-2 pt-3">
            <p className="text-sm font-semibold text-ink">Look &amp; feel</p>
            <p className="mt-0.5 text-xs text-soft">
              Pick the theme for your space. You can change it any time.
            </p>
          </div>
          <div className="grid gap-1">
            {THEMES.map((theme) => {
              const isActive = active === theme.id;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => applyTheme(theme.id)}
                  className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                    isActive ? 'bg-accent/10' : 'hover:bg-ink/5'
                  }`}
                >
                  <Swatch theme={theme} />
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-medium ${
                        isActive ? 'text-accent' : 'text-ink'
                      }`}
                    >
                      {theme.name}
                    </span>
                    <span className="block truncate text-xs text-soft">
                      {theme.tagline}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide ${
                      theme.mode === 'dark' ? 'text-soft' : 'text-faint'
                    }`}
                  >
                    {theme.mode}
                  </span>
                  <span
                    className={`grid size-4 shrink-0 place-items-center rounded-full border ${
                      isActive
                        ? 'border-accent bg-accent text-onAccent'
                        : 'border-line/25'
                    }`}
                  >
                    {isActive && (
                      <svg viewBox="0 0 12 12" className="size-2.5" fill="none">
                        <path
                          d="M2.5 6.2 5 8.7l4.5-5"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-1 border-t border-line/10 px-3 py-2">
            <button
              type="button"
              onClick={() => applyTheme(DEFAULT_THEME)}
              className="text-xs font-medium text-soft underline-offset-2 transition hover:text-accent hover:underline"
            >
              Reset to store default
            </button>
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change theme"
        className="flex items-center gap-2 rounded-full border border-line/10 bg-surface py-2 pl-3 pr-4 shadow-card-hover transition hover:border-line/20 hover:-translate-y-0.5"
      >
        <span className="flex items-center -space-x-1.5">
          {THEMES.slice(0, 3).map((t) => (
            <span
              key={t.id}
              className="size-4 rounded-full border border-line/20"
              style={{backgroundColor: t.swatch.accent}}
            />
          ))}
        </span>
        <span className="text-sm font-medium text-ink">Theme</span>
        <svg
          viewBox="0 0 12 12"
          className={`size-3 text-soft transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}