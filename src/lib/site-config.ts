import type {ThemeId} from './themes';

/**
 * Central storefront configuration.
 * `defaultTheme` is the site-wide look visitors get on their first visit
 * (before they pick their own theme in the header/footer switcher).
 */
export const SITE_CONFIG = {
  storeName: 'BESO',
  defaultTheme: 'ivory-minimal' as ThemeId,
  themeStorageKey: 'beso-theme',
};

export const DEFAULT_THEME: ThemeId = SITE_CONFIG.defaultTheme;
export const THEME_STORAGE_KEY = SITE_CONFIG.themeStorageKey;