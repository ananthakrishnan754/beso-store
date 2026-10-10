/**
 * Registry of switchable landing-page design concepts.
 * `folder` must match the folder name inside src/components/designs/.
 *
 * Reset 2026-10-09: the first-pass concepts were archived to the branch
 * `archive/first-pass-concepts` and removed from main. Only the "Current"
 * production home is live until a new concept passes the quality gate.
 * Register a passing concept here (n = 1..N, matching DESIGNS order) to surface
 * it in the switcher and wire it to ?design=N.
 */
export type DesignMeta = {
  n: number;
  folder: string;
  name: string;
  tag: string;
};

export const DESIGNS: DesignMeta[] = [
  { n: 1, folder: 'd01-atelier', name: 'Atelier', tag: 'Warm editorial' },
  { n: 2, folder: 'd02-monolith', name: 'Monolith', tag: 'Dark sculptural' },
  { n: 3, folder: 'd03-anatomy', name: 'Anatomy', tag: 'Engineering spec' },
  { n: 4, folder: 'd04-twomodes', name: 'Two Modes', tag: 'Office / Home switch' },
  { n: 5, folder: 'd05-atelier-pro', name: 'Atelier Pro', tag: 'Architectural B2B' },
  { n: 6, folder: 'd06-archive', name: 'Archive', tag: 'Editorial wall' },
  { n: 7, folder: 'd07-kinetic', name: 'Kinetic', tag: 'Motion-led' },
];

export function getDesign(n: number): DesignMeta {
  if (n >= 1 && n <= DESIGNS.length) return DESIGNS[n - 1];
  return { n: 0, folder: '', name: 'Current', tag: 'Live site' };
}