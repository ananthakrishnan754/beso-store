'use client';

import Link from 'next/link';
import {Reveal} from '@/components/Reveal';
import {ViewInYourRoom} from '@/components/ViewInYourRoom';
import {MEETING_ROOM} from '@/lib/arModels';

/**
 * Shared content blocks used by all ten design concepts.
 * Each block takes a `tone` so a dark concept can invert the surfaces, while
 * every design keeps: Shop CTA, WhatsApp CTA, flagship trio, B2B trust,
 * reviews and the AR section.
 */

type Tone = 'light' | 'dark';

const F = {
  light: {
    label: 'text-[#8A6A3E]',
    card: 'bg-surface border-line/8',
    muted: 'text-ink/45',
    rule: 'border-line/10',
    section: 'text-ink',
    body: 'text-ink/65',
  },
  dark: {
    label: 'text-[#E7C99B]',
    card: 'bg-white/5 border-white/10',
    muted: 'text-white/45',
    rule: 'border-white/10',
    section: 'text-white',
    body: 'text-white/65',
  },
} as const;

/* ─── Flagship trio (Crown / FlexRise / Prestige) ───────────────────────── */
const TRIO = [
  {
    slug: 'beso-crown-executive-chair',
    name: 'BESO Crown Executive Chair',
    price: 49990,
    img: '/assets/images/products/executive-chair-07.jpg',
    eyebrow: 'Signature flagship',
    copy: 'Double-layer high-elasticity mesh, active pelvic lumbar support, 3D adjustable armrests, memory-foam seat.',
    specs: [['Lumbar', 'Synchro-tracking'], ['Base load', '150 kg']],
  },
  {
    slug: 'beso-flexrise-height-adjustable-table',
    name: 'BESO FlexRise Standing Desk',
    price: 42990,
    img: '/assets/images/products/height-table-01.jpg',
    eyebrow: 'Smart standing desk',
    copy: 'Quiet dual motors, anti-collision sensors, solid walnut desktop, 4-preset memory controller.',
    specs: [['Height', '70–120 cm'], ['Drive', 'Dual motors']],
  },
  {
    slug: 'beso-prestige-executive-chair',
    name: 'BESO Prestige Executive Chair',
    price: 64990,
    img: '/assets/images/products/executive-chair-04.jpg',
    eyebrow: 'Premium luxury',
    copy: 'Full-grain leather, padded armrests, walnut inserts on a polished steel base.',
    specs: [['Trim', 'Full-grain'], ['Details', 'Walnut + steel']],
  },
];

export function FlagshipTrio({tone = 'light'}: {tone?: Tone}) {
  const t = F[tone];
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-16 py-24 lg:py-32">
      <Reveal className="mb-14">
        <span className={`${t.label} text-[11px] font-bold uppercase tracking-[0.22em] flex items-center gap-3`}>
          <span className="w-8 h-px bg-current opacity-50" aria-hidden="true" />
          The flagship line
        </span>
        <h2 className={`${t.section} text-3xl md:text-5xl font-display font-bold tracking-tight mt-4`}>
          Engineered for ultimate comfort
        </h2>
      </Reveal>

      <div className="space-y-20">
        {TRIO.map((item, i) => (
          <Reveal key={item.slug} delay={0.05}>
            <div className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${i % 2 ? 'lg:[direction:rtl]' : ''}`}>
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:[direction:ltr]' : ''}`}>
                <div className={`${t.card} border rounded-[1.5rem] p-4 sm:p-6 shadow-[0_20px_50px_-20px_rgba(44,35,25,0.18)]`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.img} alt={item.name} className="w-full aspect-[4/5] object-cover rounded-xl" loading="lazy" />
                </div>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:[direction:ltr]' : ''}`}>
                <span className={`${t.label} text-[11px] font-bold uppercase tracking-[0.2em]`}>{item.eyebrow}</span>
                <h3 className={`${t.section} text-2xl md:text-4xl font-display font-bold tracking-tight mt-4 leading-[1.05]`}>{item.name}</h3>
                <p className={`${t.body} text-[15px] leading-[1.65] mt-5 max-w-[460px]`}>{item.copy}</p>
                <div className={`flex items-center gap-8 mt-7 pt-6 border-t ${t.rule}`}>
                  {item.specs.map(([k, v]) => (
                    <div key={k}>
                      <div className={`${t.muted} text-[10px] uppercase tracking-[0.16em]`}>{k}</div>
                      <div className={`${t.section} text-sm font-semibold mt-1`}>{v}</div>
                    </div>
                  ))}
                  <div className="hidden sm:block">
                    <div className={`${t.muted} text-[10px] uppercase tracking-[0.16em]`}>From</div>
                    <div className={`${t.section} font-display text-lg font-bold mt-1`}>₹{item.price.toLocaleString('en-IN')}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 mt-7">
                  <Link href={`/products/${item.slug}`} className="bg-ink text-[#F6F1E7] px-6 py-3 rounded-full text-[12px] uppercase tracking-[0.1em] font-bold hover:-translate-y-0.5 transition-transform">
                    Explore
                  </Link>
                  <ViewInYourRoom slug={item.slug} productName={item.name} poster={item.img} size="md" label="View in Your Room" />
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── B2B trust block ────────────────────────────────────────────────────── */
const TRUST: [string, string][] = [
  ['12,000', 'sq ft warehouse'],
  ['48h', 'dispatch window'],
  ['2', 'Hyderabad showrooms'],
  ['79+', 'curated pieces'],
  ['5 yr', 'structural warranty'],
  ['4.9', 'average rating'],
];

export function TrustBlock({tone = 'light'}: {tone?: Tone}) {
  const t = F[tone];
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-16 py-20">
      <Reveal>
        <div className={`border-y ${t.rule} py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8`}>
          {TRUST.map(([n, l]) => (
            <div key={l} className="text-center">
              <div className={`${t.section} font-display text-3xl md:text-4xl font-bold leading-none`}>{n}</div>
              <div className={`${t.muted} text-[10px] uppercase tracking-[0.16em] mt-2.5 leading-tight`}>{l}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Reviews ────────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: 'Rohit Sharma', role: 'Facilities · IT Company', quote: 'Ordered 40 chairs for our Bengaluru office. White-glove install in two days, invoicing seamless — clearly a B2B-first partner.' },
  { name: 'Shreya Iyer', role: 'Studio Owner · Design Firm', quote: 'The FlexRise desks transformed our workstations. Quiet motors, solid walnut, and the team handled fit-out details we never expected.' },
  { name: 'Arjun Mehta', role: 'Procurement · Consulting', quote: '48-hour turnaround was real. A dedicated point of contact, priority support, and bulk pricing that genuinely beat the market.' },
];

export function ReviewsBlock({tone = 'light'}: {tone?: Tone}) {
  const t = F[tone];
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-16 py-24 lg:py-32">
      <Reveal className="mb-12">
        <span className={`${t.label} text-[11px] font-bold uppercase tracking-[0.22em] flex items-center gap-3`}>
          <span className="w-8 h-px bg-current opacity-50" aria-hidden="true" />
          Client reviews
        </span>
        <h2 className={`${t.section} text-3xl md:text-5xl font-display font-bold tracking-tight mt-4`}>
          Trusted by <span className="italic">workspaces</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-5">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.name} delay={i * 0.06}>
            <figure className={`${t.card} border rounded-2xl p-7 h-full flex flex-col`}>
              <div className="text-[#B38A4C] text-sm tracking-[0.3em] mb-4">{'★★★★★'}</div>
              <blockquote className={`${t.body} text-[15px] leading-[1.65] flex-1`}>&ldquo;{r.quote}&rdquo;</blockquote>
              <figcaption className={`mt-6 pt-4 border-t ${t.rule} flex items-center gap-3`}>
                <span className={`w-9 h-9 rounded-full ${tone === 'dark' ? 'bg-white/10' : 'bg-ink/8'} flex items-center justify-center text-xs font-bold ${t.section}`}>
                  {r.name.split(' ').map((x) => x[0]).join('')}
                </span>
                <span>
                  <span className={`${t.section} block text-sm font-semibold`}>{r.name}</span>
                  <span className={`${t.muted} block text-[10px] uppercase tracking-wider`}>{r.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── AR section ─────────────────────────────────────────────────────────── */
export function ArSection({tone = 'light'}: {tone?: Tone}) {
  const t = F[tone];
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-16 py-20">
      <Reveal>
        <div className={`grid lg:grid-cols-12 gap-8 items-center ${t.card} border rounded-[1.5rem] p-8 md:p-12`}>
          <div className="lg:col-span-7">
            <span className={`${t.label} text-[11px] font-bold uppercase tracking-[0.2em]`}>New · AR experience</span>
            <h2 className={`${t.section} text-2xl md:text-4xl font-display font-bold tracking-tight mt-4 leading-tight`}>
              Preview a BESO Meeting Room in Your Own Space
            </h2>
            <p className={`${t.body} text-[15px] leading-[1.65] mt-4 max-w-xl`}>
              A full conference setup — chairs around a flagship table — placed at real scale in your
              boardroom. Point your camera at the floor and walk around it.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-7">
              <ViewInYourRoom model={MEETING_ROOM} productName="BESO Meeting Room Setup" variant="solid" size="lg" label="View Meeting Setup in AR" />
              <span className={`${t.muted} text-[10px] uppercase tracking-[0.14em]`}>Works on phone · no app needed</span>
            </div>
          </div>
          <div className="lg:col-span-5 grid gap-3">
            {[
              ['Real-scale placement', 'True-to-size, not guesswork'],
              ['Rotate and inspect', 'Drag to spin, zoom into materials'],
              ['Try before you buy', 'Fit the whole setup in your room first'],
            ].map(([ti, de]) => (
              <div key={ti} className={`flex items-start gap-3 p-4 rounded-xl border ${tone === 'dark' ? 'bg-white/5 border-white/10' : 'bg-ink/[0.03] border-line/8'}`}>
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#8A6A3E] shrink-0" />
                <span>
                  <span className={`${t.section} block text-sm font-semibold`}>{ti}</span>
                  <span className={`${t.muted} block text-xs mt-0.5`}>{de}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ─── Shop + WhatsApp CTAs ──────────────────────────────────────────────── */
export function ExpertCta({tone = 'light'}: {tone?: Tone}) {
  const t = F[tone];
  return (
    <section className="px-5 sm:px-6 md:px-10 lg:px-16 pt-8 pb-32">
      <Reveal>
        <div className={`rounded-[1.5rem] border p-8 sm:p-14 text-center ${
          tone === 'dark'
            ? 'border-[#E7C99B]/25 bg-[#E7C99B]/[0.06]'
            : 'border-[#8A6A3E]/25 bg-[#8A6A3E]/[0.06]'
        }`}>
          <h2 className={`${t.section} text-3xl md:text-5xl font-display font-bold tracking-tight`}>
            Furnishing a Workspace?
          </h2>
          <p className={`${t.body} text-[15px] max-w-xl mx-auto mt-5 leading-relaxed`}>
            Personal consultations, bespoke configurations, and bulk discounts up to 25% from 5+ units.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <Link href="/products" className="bg-ink text-[#F6F1E7] px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold hover:-translate-y-0.5 transition-transform">
              Shop Now
            </Link>
            <a
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27m%20interested%20in%20a%20workspace%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className={`border px-8 py-4 rounded-full text-[13px] uppercase tracking-[0.1em] font-bold hover:bg-opacity-100 transition-colors ${
                tone === 'dark'
                  ? 'border-[#E7C99B]/50 text-[#E7C99B] hover:bg-[#E7C99B]/10'
                  : 'border-[#8A6A3E]/50 text-[#8A6A3E] hover:bg-[#8A6A3E]/10'
              }`}
            >
              WhatsApp an Ergo Expert
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}