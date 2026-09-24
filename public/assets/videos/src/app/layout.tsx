import type {Metadata} from 'next';
import './globals.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {ThemeSwitcher} from '@/components/ThemeSwitcher';
import {THEMES, type ThemeId} from '@/lib/themes';
import {DEFAULT_THEME, THEME_STORAGE_KEY} from '@/lib/site-config';

const themeIdList = THEMES.map((t) => t.id).join(',');
const themeMetaColors: Record<ThemeId, string> = THEMES.reduce(
  (acc, t) => {
    acc[t.id] = t.swatch.app;
    return acc;
  },
  {} as Record<ThemeId, string>,
);
const defaultMode = THEMES.find((t) => t.id === DEFAULT_THEME)?.mode ?? 'dark';
const themeModes: Record<ThemeId, string> = THEMES.reduce(
  (acc, t) => {
    acc[t.id] = t.mode;
    return acc;
  },
  {} as Record<ThemeId, string>,
);

export const metadata: Metadata = {
  title: {
    default: 'BESO Furniture — Premium Office & Home Furniture',
    template: '%s | BESO Furniture',
  },
  description:
    'Premium furniture for modern offices and homes. Ergonomic chairs, desks, gaming setups and more. Crafted for comfort, designed for style.',
  keywords: [
    'office furniture',
    'ergonomic chair',
    'executive chair',
    'gaming chair',
    'standing desk',
    'BESO',
    'India',
  ],
  openGraph: {
    title: 'BESO Furniture',
    description:
      'Premium furniture for modern offices and homes. Crafted for comfort, designed for style.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'BESO Furniture',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="theme-color"
          content={themeMetaColors[DEFAULT_THEME]}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=DM+Serif+Display&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@300;400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var k=${JSON.stringify(
              THEME_STORAGE_KEY,
            )};var ids=${JSON.stringify(themeIdList)}.split(',');var metaColors=${JSON.stringify(
              themeMetaColors,
            )};var modes=${JSON.stringify(themeModes)};var stored=localStorage.getItem(k);var theme=stored&&ids.indexOf(stored)>-1?stored:${JSON.stringify(
              DEFAULT_THEME,
            )};var root=document.documentElement;root.setAttribute('data-theme',theme);root.style.colorScheme=modes[theme]||${JSON.stringify(
              defaultMode,
            )};var meta=document.querySelector('meta[name="theme-color"]');if(meta&&metaColors[theme]){meta.setAttribute('content',metaColors[theme]);}}catch(e){document.documentElement.setAttribute('data-theme',${JSON.stringify(
              DEFAULT_THEME,
            )});}})();`,
          }}
        />
      </head>
      <body className="bg-app text-ink antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ThemeSwitcher />
      </body>
    </html>
  );
}
