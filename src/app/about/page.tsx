import type { Metadata } from 'next';
import { AboutView } from '@/components/AboutView';

export const metadata: Metadata = {
  title: 'About BESO — Architectural Ergonomics & Scandinavian Craftsmanship',
  description:
    'Learn about BESO Furniture — since 2019, delivering contract-grade ergonomic engineering, Scandinavian blonde oak joinery, and BIFMA certified executive furniture from Hyderabad, India.',
};

export default function AboutPage() {
  return <AboutView />;
}
