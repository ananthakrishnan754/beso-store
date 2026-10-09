export type ThemeId =
  | 'night-luxe'
  | 'ivory-minimal'
  | 'nordic-white'
  | 'industrial-loft'
  | 'walnut-midcentury'
  | 'oak-clean-modern'
  | 'forest-calm'
  | 'coastal-breeze'
  | 'bordeaux-velvet'
  | 'graphite-mono';

export interface Theme {
  id: ThemeId;
  name: string;
  tagline: string;
  mode: 'light' | 'dark';
  sans: string;
  display: string;
  /** Preview swatches shown in the theme switcher (app / accent / ink). */
  swatch: {app: string; accent: string; ink: string};
  /**
   * Hero background video for this theme (webm primary, mp4 fallback — same
   * basename, different extension). Themes without a clip fall back to the
   * default (night-luxe) video.
   */
  heroVideo?: string;
}

export const THEMES: Theme[] = [
  {
    id: 'night-luxe',
    name: 'Night Luxe',
    tagline: 'Black & lime · signature BESO',
    mode: 'dark',
    sans: 'Inter',
    display: 'Inter',
    swatch: {app: '#101010', accent: '#a3e635', ink: '#ffffff'},
    heroVideo: '/assets/videos/hero-bg.webm',
  },
  {
    id: 'ivory-minimal',
    name: 'Ivory Minute',
    tagline: 'Warm paper, ink & graphite',
    mode: 'light',
    sans: 'Manrope',
    display: 'DM Serif Display',
    swatch: {app: '#f7f4ef', accent: '#101418', ink: '#1b1c1e'},
    heroVideo: '/assets/videos/hero-bg-ivory.webm',
  },
  {
    id: 'nordic-white',
    name: 'Nordic White',
    tagline: 'Scandinavian air & muted brass',
    mode: 'light',
    sans: 'Inter',
    display: 'Fraunces',
    swatch: {app: '#f2f0eb', accent: '#b98a44', ink: '#262a28'},
  },
  {
    id: 'industrial-loft',
    name: 'Industrial Loft',
    tagline: 'Charcoal & utility amber',
    mode: 'dark',
    sans: 'Space Grotesk',
    display: 'Space Grotesk',
    swatch: {app: '#17181b', accent: '#f59e0b', ink: '#edeeF0'},
    heroVideo: '/assets/videos/hero-bg-loft.webm',
  },
  {
    id: 'walnut-midcentury',
    name: 'Walnut Mid-Century',
    tagline: 'Cream, espresso & burnt orange',
    mode: 'light',
    sans: 'Manrope',
    display: 'Playfair Display',
    swatch: {app: '#f6eedf', accent: '#c2552a', ink: '#3a2e22'},
    heroVideo: '/assets/videos/hero-bg-walnut.webm',
  },
  {
    id: 'oak-clean-modern',
    name: 'Oak Clean',
    tagline: 'Bright oak & deep forest green',
    mode: 'light',
    sans: 'Inter',
    display: 'Fraunces',
    swatch: {app: '#fbfbf9', accent: '#1f5c4a', ink: '#17130e'},
  },
  {
    id: 'forest-calm',
    name: 'Forest Calm',
    tagline: 'Deep green & polished brass',
    mode: 'dark',
    sans: 'Manrope',
    display: 'Cormorant Garamond',
    swatch: {app: '#131e18', accent: '#c9a227', ink: '#f2f1e8'},
  },
  {
    id: 'coastal-breeze',
    name: 'Coastal Breeze',
    tagline: 'Sand dunes & teal water',
    mode: 'light',
    sans: 'Inter',
    display: 'DM Serif Display',
    swatch: {app: '#f3f1ec', accent: '#2e8b8b', ink: '#26434b'},
  },
  {
    id: 'bordeaux-velvet',
    name: 'Bordeaux Velvet',
    tagline: 'Midnight wine & champagne gold',
    mode: 'dark',
    sans: 'Manrope',
    display: 'Cormorant Garamond',
    swatch: {app: '#1a1115', accent: '#d2a24b', ink: '#f5edec'},
  },
  {
    id: 'graphite-mono',
    name: 'Graphite Mono',
    tagline: 'Monochrome & signal red',
    mode: 'dark',
    sans: 'Space Grotesk',
    display: 'Space Grotesk',
    swatch: {app: '#0f0f10', accent: '#e11d35', ink: '#f5f5f4'},
  },
];

export const THEME_IDS = THEMES.map((t) => t.id) as ThemeId[];

export function isThemeId(value: string): value is ThemeId {
  return (THEME_IDS as string[]).includes(value);
}

export function getTheme(id: string): Theme {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}