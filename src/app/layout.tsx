import type {Metadata} from 'next';
import './globals.css';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';

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
        <meta name="theme-color" content="#101010" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-beso-dark text-white antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
