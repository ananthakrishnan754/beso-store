import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Legacy `beso-*` classes now resolve through theme tokens:
        // beso.dark  → page background (app)
        // beso.card  → raised surface
        // beso.lime  → brand accent
        // beso.muted → secondary text
        // beso.subtle→ tertiary text
        beso: {
          dark: 'rgb(var(--app-rgb) / <alpha-value>)',
          card: 'rgb(var(--surface-rgb) / <alpha-value>)',
          lime: 'rgb(var(--accent-rgb) / <alpha-value>)',
          red: 'rgb(var(--danger-rgb) / <alpha-value>)',
          gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
          muted: 'rgb(var(--soft-rgb) / <alpha-value>)',
          subtle: 'rgb(var(--faint-rgb) / <alpha-value>)',
        },
        // Semantic tokens driven by `[data-theme="..."]` on <html>
        app: 'rgb(var(--app-rgb) / <alpha-value>)',
        surface: 'rgb(var(--surface-rgb) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        soft: 'rgb(var(--soft-rgb) / <alpha-value>)',
        faint: 'rgb(var(--faint-rgb) / <alpha-value>)',
        accent: 'rgb(var(--accent-rgb) / <alpha-value>)',
        'accent-2': 'rgb(var(--accent-2-rgb) / <alpha-value>)',
        onAccent: 'rgb(var(--on-accent-rgb) / <alpha-value>)',
        danger: 'rgb(var(--danger-rgb) / <alpha-value>)',
        gold: 'rgb(var(--gold-rgb) / <alpha-value>)',
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
        'line-strong': 'rgb(var(--line-strong-rgb) / <alpha-value>)',
        glass: 'rgb(var(--glass-rgb) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 2px 16px var(--shadow-color)',
        'card-hover': '0 8px 32px var(--shadow-color-strong)',
        glow: '0 0 40px var(--glow-color)',
        'glow-strong': '0 0 12px var(--glow-strong)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': {transform: 'translateX(0)'},
          '100%': {transform: 'translateX(-50%)'},
        },
        float: {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-10px)'},
        },
        fadeIn: {
          '0%': {opacity: '0', transform: 'translateY(20px)'},
          '100%': {opacity: '1', transform: 'translateY(0)'},
        },
      },
    },
  },
  plugins: [],
};

export default config;