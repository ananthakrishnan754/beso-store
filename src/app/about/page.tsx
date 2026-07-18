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
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Furniture That <span className="text-gradient">Defines Your Space</span>
        </h1>
        <p className="text-white/50 text-lg leading-relaxed">
          BESO was founded with a simple mission: to make premium, ergonomic
          furniture accessible to every Indian home and office. We believe great
          furniture should not only look beautiful but also support your body and
          boost your productivity.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-beso-card rounded-3xl border border-white/[0.06] p-8 md:p-12 mb-16">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-white/50 leading-relaxed max-w-3xl">
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
            className="bg-beso-card rounded-2xl border border-white/[0.06] p-6 text-center"
          >
            <div className="text-2xl font-bold text-beso-lime mb-1">{s.val}</div>
            <div className="text-sm text-white/40">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-white mb-8">Our Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="bg-beso-card rounded-2xl border border-white/[0.06] p-6"
            >
              <span className="text-3xl mb-3 block">{v.icon}</span>
              <h3 className="font-semibold text-white mb-2">{v.title}</h3>
              <p className="text-sm text-white/40">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-beso-card rounded-3xl border border-white/[0.06] p-8 md:p-12">
        <h2 className="text-2xl font-bold text-white mb-6">Certifications & Compliance</h2>
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
                <h3 className="font-semibold text-white">{c.title}</h3>
                <p className="text-sm text-white/40">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
