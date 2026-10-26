import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about BESO Furniture — our mission, values, and commitment to crafting premium furniture.',
};

const VALUES = [
  {
    icon: '\u2B50',
    title: 'Quality First',
    desc: 'Every piece is built from premium materials with rigorous quality checks.',
  },
  {
    icon: '\u{1F331}',
    title: 'Sustainability',
    desc: 'We use responsibly sourced wood and eco-friendly finishes.',
  },
  {
    icon: '\u{1F91D}',
    title: 'Customer Trust',
    desc: 'Transparent pricing, honest descriptions, and a 5-year warranty.',
  },
  {
    icon: '\u2728',
    title: 'Modern Design',
    desc: 'Inspired by global trends, tailored for Indian spaces.',
  },
];

const STATS = [
  {val: '10,000+', label: 'Happy Customers'},
  {val: '500+', label: 'Products'},
  {val: '50+', label: 'Cities Served'},
  {val: '5\u2605', label: 'Average Rating'},
];

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="text-beso-lime text-sm font-semibold tracking-widest uppercase mb-3">
          About BESO
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-ink mb-6">
          Furniture That <span className="text-gradient">Defines Your Space</span>
        </h1>
        <p className="text-ink/50 text-lg leading-relaxed">
          BESO was founded with a simple mission: to make premium, ergonomic
          furniture accessible to every Indian home and office. We believe great
          furniture should not only look beautiful but also support your body and
          boost your productivity.
        </p>
      </div>

      {/* ─── Store Video Section (Client Requirement) ─── */}
      <div className="bg-beso-card rounded-3xl border border-line/10 p-6 sm:p-10 md:p-12 mb-16 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-beso-lime uppercase tracking-widest block mb-1">
              Store &amp; Workshop Walkthrough
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Inside the BESO Showroom &amp; Craft Studio
            </h2>
            <p className="text-sm text-ink/60 mt-1 max-w-xl">
              Take a virtual tour of our 100 Feet Road Indiranagar flagship experience centre and precision engineering facility.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=42+100+Feet+Road+Indiranagar+Bangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-ink text-app text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity self-start md:self-auto shrink-0"
          >
            Visit in Person ↗
          </a>
        </div>

        {/* Responsive YouTube Embed */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-line/10 bg-black">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0"
            title="Inside BESO Flagship Store and Ergonomic Workshop"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-line/8 text-xs text-ink/70">
          <div>
            <span className="font-bold text-ink block mb-0.5">Showroom Testing Bay</span>
            <span>Test 40+ configured ergonomic chairs, dual-motor desks, and material swatches.</span>
          </div>
          <div>
            <span className="font-bold text-ink block mb-0.5">Ergonomic Specialists</span>
            <span>Personalized posture consults and workspace planning with certified consultants.</span>
          </div>
          <div>
            <span className="font-bold text-ink block mb-0.5">Pan-India Dispatches</span>
            <span>Direct dispatches supported by our 12,000 sq ft centralized warehousing hub.</span>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="bg-beso-card rounded-3xl border border-line/6 p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-bold text-ink mb-4">Our Mission</h2>
        <p className="text-ink/50 leading-relaxed max-w-3xl">
          We are on a mission to transform how India works and lives. From
          executive offices to gaming setups, from dining rooms to home offices
          — we design and deliver furniture that inspires. Every BESO product is
          tested for durability, comfort, and style before it reaches you.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="bg-beso-card rounded-2xl border border-line/6 p-6 text-center"
          >
            <div className="text-2xl font-bold text-beso-lime mb-1">{s.val}</div>
            <div className="text-sm text-ink/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-ink mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-beso-card rounded-2xl border border-line/6 p-6"
            >
              <span className="text-3xl mb-3 block">{v.icon}</span>
              <h3 className="font-semibold text-ink mb-2">{v.title}</h3>
              <p className="text-sm text-ink/40">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-beso-card rounded-3xl border border-line/6 p-8 md:p-12">
        <h2 className="text-2xl font-bold text-ink mb-6">Certifications & Compliance</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            {icon: '\u{1F6E1}\uFE0F', title: 'BIFMA Certified', desc: 'Meets international furniture standards for safety and durability.'},
            {icon: '\u{1F331}', title: 'ISO 9001:2015', desc: 'Quality management system certified manufacturing.'},
            {icon: '\u26A0\uFE0F', title: 'Fire Retardant', desc: 'Compliant with BS 5852 fire safety standards.'},
            {icon: '\u{1F4CA}', title: 'IGBC Certified', desc: 'Indian Green Building Council compliant products.'},
          ].map((c) => (
            <div key={c.title} className="flex gap-4 items-start">
              <span className="text-2xl mt-1">{c.icon}</span>
              <div>
                <h3 className="font-semibold text-ink">{c.title}</h3>
                <p className="text-sm text-ink/40">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
