/**
 * Registry of the ten switchable landing-page design concepts.
 * `folder` must match the folder name inside src/components/designs/.
 */
export type DesignMeta = {
  n: number;
  folder: string;
  name: string;
  tag: string;
};

export const DESIGNS: DesignMeta[] = [
  { n: 1, folder: 'd01-atelier', name: 'Hyderabad Atelier', tag: 'Warm editorial' },
  { n: 2, folder: 'd02-humanics', name: 'Executive Humanics', tag: 'Split-screen' },
  { n: 3, folder: 'd03-manifesto', name: 'Ergonomic Manifesto', tag: 'Kinetic type' },
  { n: 4, folder: 'd04-horizon', name: 'Living Office Horizon', tag: 'Soft lifestyle' },
  { n: 5, folder: 'd05-obsidian', name: 'Obsidian Precision', tag: 'Dark luxe' },
  { n: 6, folder: 'd06-bento', name: 'The Spec Sheet Bento', tag: 'Bento grid' },
  { n: 7, folder: 'd07-monolith', name: 'Clinical Monolith', tag: 'Brutalist' },
  { n: 8, folder: 'd08-kinespine', name: 'Kinetic Spine', tag: 'Instrument' },
  { n: 9, folder: 'd09-runway', name: 'Showroom Runway', tag: 'Horizontal' },
  { n: 10, folder: 'd10-pop', name: 'The Pop Ergonomic', tag: 'Bold DTC' },
];

export function getDesign(n: number): DesignMeta {
  if (n >= 1 && n <= DESIGNS.length) return DESIGNS[n - 1];
  return { n: 0, folder: '', name: 'Current', tag: 'Live site' };
}