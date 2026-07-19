import Link from 'next/link';
import products from '@/data/products.json';
import { ProductCard } from '@/components/ProductCard';

const MARQUEE_TEXT = '✦  ERGO-TECH INNOVATION  ✦  FREE PAN-INDIA DELIVERY  ✦  5-YEAR COMPREHENSIVE WARRANTY  ✦  BIFMA CERTIFIED  ✦  10-DAY RETURN POLICY  ✦  CUSTOMISABLE SETUPS  ✦';

function getFeatured() {
  return (products as any[])
    .filter((p) => p.badge === 'hot' || p.badge === 'sale')
    .slice(0, 4);
}

function getFlagships() {
  // IDs: 7 (BESO Crown), 21 (BESO FlexRise), 4 (BESO Prestige)
  return (products as any[]).filter((p) => [7, 21, 4].includes(p.id));
}

export default function HomePage() {
  const featured = getFeatured();
  const flagships = getFlagships();

  // Find individual flagships for specific spotlights
  const crownChair = flagships.find(p => p.id === 7) || products[6];
  const flexRiseTable = flagships.find(p => p.id === 21) || products[20];
  const prestigeChair = flagships.find(p => p.id === 4) || products[3];

  return (
    <div className="bg-beso-dark text-white overflow-hidden min-h-screen flex flex-col">
      {/* ─── Announcement Bar ─── */}
      <div className="bg-beso-lime/10 border-b border-beso-lime/20 text-center py-2.5 text-[10px] sm:text-xs font-bold tracking-widest text-beso-lime uppercase relative z-30">
        MONSOON ACTIVE-WORK SALE • FLAT 10% OFF ON ALL PREPAID ORDERS
      </div>

      {/* ─── Hero Section with Video Loop ─── */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-35"
          >
            <source src="/assets/videos/hero-bg.mp4" type="video/mp4" />
          </video>
          {/* Vignette & Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-beso-dark via-beso-dark/50 to-beso-dark/80" />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-beso-lime/5 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-beso-lime backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-beso-lime animate-ping" />
            India's Only Hyper-Focused Work-Tech Brand
          </span>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white">
            Pain-Free Working.<br />
            <span className="text-gradient">Max Productivity.</span><br />
            Healthier Living.
          </h1>
          
          <p className="text-white/60 text-sm md:text-lg max-w-2xl font-light leading-relaxed">
            We design state-of-the-art office chairs and height-adjustable desks tailored to support your posture, improve focus, and elevate your space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center">
            <Link href="/products" className="btn-beso px-8 py-4 text-xs uppercase tracking-widest font-extrabold min-w-[200px]">
              Explore Shop
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20BESO!%20I'm%20interested%20in%20a%20workspace%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill-outline px-8 py-4 text-xs uppercase tracking-widest font-bold min-w-[200px] flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Contact Now
            </a>
          </div>

          {/* Quick stats badges */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5 max-w-lg w-full">
            {[
              { val: '10,000+', label: 'Active Setups' },
              { val: '79+', label: 'Ergo Designs' },
              { val: '5.0★', label: 'Customer Rating' }
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">{stat.val}</div>
                <div className="text-[10px] sm:text-xs text-white/40 font-medium tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Marquee Banner ─── */}
      <div className="border-y border-white/5 bg-black/40 py-5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em] text-white/30">
          {MARQUEE_TEXT} {MARQUEE_TEXT}
        </div>
      </div>

      {/* ─── Flagship Spotlight Showcase Cards ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 space-y-16">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-beso-lime tracking-widest uppercase">The Flagship Line</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Engineered for <span className="text-gradient">Ultimate Comfort</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-sm">
            Discover the three pillars of premium work ergonomics from BESO.
          </p>
        </div>

        {/* Card 1: BESO Crown (Text Left, Image Right) */}
        <div className="bg-gradient-to-br from-[#122A26] to-[#040C0B] border border-white/5 rounded-[2.5rem] overflow-hidden p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-12 items-center relative group hover:shadow-glow transition-all duration-700">
          <div className="lg:col-span-6 space-y-6 z-10">
            <span className="text-xs font-bold text-beso-lime tracking-widest uppercase">Signature Flagship Chair</span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">{crownChair.name}</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Designed for peak performance. Features custom double-layer high-elasticity mesh backing, active pelvic lumbar support, 3D adjustable armrests, and an integrated memory-foam seating pad to cushion long work sessions.
            </p>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Lumbar support</div>
                <div className="text-xs md:text-sm font-semibold text-white">Active Synchro-Tracking</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Base load</div>
                <div className="text-xs md:text-sm font-semibold text-white">Up to 150 Kilograms</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${crownChair.slug}`} className="btn-beso px-8 py-3.5 text-xs uppercase tracking-wider font-extrabold">
                Explore Crown • ₹{crownChair.price.toLocaleString('en-IN')}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-beso-lime/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/images/products/executive-chair-07.png" 
              alt={crownChair.name} 
              className="w-full max-w-[420px] object-contain group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Card 2: BESO FlexRise (Image Left, Text Right) */}
        <div className="bg-gradient-to-br from-[#2D1B10] to-[#120B06] border border-white/5 rounded-[2.5rem] overflow-hidden p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-12 items-center relative group hover:shadow-glow transition-all duration-700">
          <div className="lg:col-span-6 lg:order-2 space-y-6 z-10">
            <span className="text-xs font-bold text-beso-lime tracking-widest uppercase">Smart Standing Desks</span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">{flexRiseTable.name}</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Transform your productivity by switching between sitting and standing seamlessly. Engineered with quiet dual-motors, anti-collision sensors, an elegant solid walnut desktop, and a 4-preset memory digital controller.
            </p>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Height Range</div>
                <div className="text-xs md:text-sm font-semibold text-white">70 cm to 120 cm</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Drive System</div>
                <div className="text-xs md:text-sm font-semibold text-white">Dual Quiet Motors</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${flexRiseTable.slug}`} className="btn-beso px-8 py-3.5 text-xs uppercase tracking-wider font-extrabold">
                Configure Setup • ₹{flexRiseTable.price.toLocaleString('en-IN')}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center relative">
            <div className="absolute inset-0 bg-beso-lime/5 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/images/products/height-table-01.png" 
              alt={flexRiseTable.name} 
              className="w-full max-w-[420px] object-contain group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Card 3: BESO Prestige (Text Left, Image Right) */}
        <div className="bg-gradient-to-br from-[#241B15] to-[#0F0A08] border border-white/5 rounded-[2.5rem] overflow-hidden p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-12 items-center relative group hover:shadow-glow transition-all duration-700">
          <div className="lg:col-span-6 space-y-6 z-10">
            <span className="text-xs font-bold text-beso-lime tracking-widest uppercase">Premium Luxury Support</span>
            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">{prestigeChair.name}</h3>
            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Crafted for leaders. Upholstered in select full-grain Italian leather, featuring adjustable contoured structural segments, luxury padded armrests, and beautiful dark walnut wood spokes lining the polished steel base.
            </p>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Material Trim</div>
                <div className="text-xs md:text-sm font-semibold text-white">Full-grain Leather</div>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm">
                <div className="text-[10px] text-white/40 uppercase mb-1">Details</div>
                <div className="text-xs md:text-sm font-semibold text-white">Teak & Walnut Accents</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${prestigeChair.slug}`} className="btn-beso px-8 py-3.5 text-xs uppercase tracking-wider font-extrabold">
                Explore Prestige • ₹{prestigeChair.price.toLocaleString('en-IN')}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-beso-lime/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/assets/images/products/executive-chair-04.png" 
              alt={prestigeChair.name} 
              className="w-full max-w-[420px] object-contain group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </section>

      {/* ─── Featured Picks Grid ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 w-full border-t border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-beso-lime tracking-widest uppercase mb-1 block">Selected Ergonomics</span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight animate-fade-in">
              Featured <span className="text-gradient">Collections</span>
            </h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-beso-lime hover:text-white transition-colors flex items-center gap-1">
            Browse Entire Store <span>→</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ─── Real-time Trust Badges Section ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 w-full">
        <div className="bg-black/40 border border-white/10 rounded-[2.5rem] p-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 backdrop-blur-sm">
          {[
            { icon: '🚚', title: 'Free PAN-India Shipping', desc: 'Secure doorstep delivery for all orders' },
            { icon: '🛡️', title: '5-Year Brand Warranty', desc: 'Comprehensive coverage on materials' },
            { icon: '🔁', title: '10-Day Free Returns', desc: 'Zero hassle, standard policy applies' },
            { icon: '🛠️', title: 'Free Expert Setup', desc: 'Hassle-free professional assembly' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-3">
              <span className="text-4xl">{item.icon}</span>
              <h3 className="font-bold text-white text-base">{item.title}</h3>
              <p className="text-xs text-white/40 max-w-[200px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Contact/WhatsApp Expert CTA ─── */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 w-full">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-beso-lime/10 via-black to-black border border-beso-lime/20 p-12 md:p-16 overflow-hidden text-center space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-beso-lime/5 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Furnishing a Workspace?
          </h2>
          <p className="text-white/50 max-w-md mx-auto text-sm leading-relaxed">
            Get personalized consultations, bespoke design configurations, and bulk discounts of up to 25% starting from 5+ units.
          </p>
          <a
            href="https://wa.me/919876543210?text=Hi%20BESO!%20I'm%20interested%20in%20a%20workspace%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-beso px-8 py-4 text-xs uppercase tracking-wider font-bold inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Speak with Ergo Expert
          </a>
        </div>
      </section>
    </div>
  );
}
