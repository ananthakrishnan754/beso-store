import type { Metadata } from 'next';
import { AboutView } from '@/components/AboutView';

export const metadata: Metadata = {
  title: 'About BESO — Architectural Ergonomics & Scandinavian Craftsmanship',
  description:
    'Learn about BESO Furniture — over two decades of contract-grade ergonomic engineering, Scandinavian blonde oak joinery, and BIFMA certified executive furniture in Bengaluru, India.',
};

export default function AboutPage() {
  return <AboutView />;
}
