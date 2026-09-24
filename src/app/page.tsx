import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import products from '@/data/products.json';
import { ProductCard } from '@/components/ProductCard';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';
import { Reveal } from '@/components/Reveal';
import { MEETING_ROOM } from '@/lib/arModels';

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
    <div className="bg-beso-dark text-ink min-h-screen flex flex-col overflow-x-clip">

      {/* ─── Hero Section with Video Loop ─── */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden -mt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-[1] select-none pointer-events-none">
          <HeroVideo />
          {/* Vignette & Gradients — light-touch only; keeps the video vivid */}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-app/70 via-app/10 to-transparent" />
          <div className="absolute inset-0 bg-ink/[0.03]" />
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-brandLime/8 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] bg-ink/5 rounded-full blur-[120px] pointer-events-none z-0" />

        {/* Mobile-only soft scrim so hero copy stays readable over the chair video */}
        <div className="md:hidden absolute inset-x-0 bottom-0 h-2/3 z-0 pointer-events-none bg-gradient-to-t from-app/60 via-app/15 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-ink animate-fade-up" style={{animationDelay: '0.05s'}}>
            Pain-Free Working.<br />
            <span className="text-gradient">Max Productivity.</span><br />
            Healthier Living.
          </h1>
          
          <p className="text-ink/70 text-sm md:text-lg max-w-2xl font-light leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
            We design state-of-the-art office chairs and height-adjustable desks tailored to support your posture, improve focus, and elevate your space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center items-center animate-fade-up" style={{animationDelay: '0.35s'}}>
            <Link href="/products" className="bg-ink text-app px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold min-w-[200px] flex items-center justify-center transition-all hover:scale-[1.03] active:scale-[0.98] shadow-card-hover">
              Explore Shop
            </Link>
            <a
              href="https://wa.me/919876543210?text=Hi%20BESO!%20I'm%20interested%20in%20a%20workspace%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-ink/20 text-ink/80 px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold min-w-[200px] inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-md transition-all hover:bg-white/80 hover:border-ink/35 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Contact Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Marquee Banner ─── */}
      <div className="border-y border-line/5 bg-ink/4 py-5 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em] text-ink/30">
          {MARQUEE_TEXT} {MARQUEE_TEXT}
        </div>
      </div>

      {/* ─── Flagship Spotlight Showcase Cards ─── */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 space-y-16">
        <Reveal className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold text-brandLime tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brandLime animate-pulse" />
            The Flagship Line
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-ink tracking-tight">
            Engineered for <span className="text-gradient">Ultimate Comfort</span>
          </h2>
          <p className="text-ink/40 max-w-xl mx-auto text-sm">
            Discover the three pillars of premium work ergonomics from BESO.
          </p>
        </Reveal>

        {/* Card 1: BESO Crown (Text Left, Image Right) */}
        <Reveal>
        <div className="bg-gradient-to-br from-[#F8F3EB] to-[#EFE7D9] border border-line/10 rounded-[2.5rem] overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-center relative group hover:shadow-card-hover transition-all duration-700">
          <div className="lg:col-span-6 space-y-6 z-10">
            <span className="text-xs font-bold text-brandLime tracking-widest uppercase">Signature Flagship Chair</span>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-ink tracking-tight">{crownChair.name}</h3>
            <p className="text-ink/60 text-sm md:text-base leading-relaxed hidden sm:block">
              Designed for peak performance. Features custom double-layer high-elasticity mesh backing, active pelvic lumbar support, 3D adjustable armrests, and an integrated memory-foam seating pad to cushion long work sessions.
            </p>
            <p className="text-ink/50 text-xs sm:hidden">{crownChair.tagline}</p>
            <div className="hidden sm:flex items-center gap-4 py-2">
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Lumbar support</div>
                <div className="text-xs md:text-sm font-semibold text-ink">Active Synchro-Tracking</div>
              </div>
              <span className="w-px h-8 bg-line/[0.06]" aria-hidden="true" />
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Base load</div>
                <div className="text-xs md:text-sm font-semibold text-ink">Up to 150 Kilograms</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${crownChair.slug}`} className="bg-ink text-app px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-extrabold inline-flex items-center justify-center transition-transform hover:scale-[1.03]">
                Explore Crown • ₹{crownChair.price.toLocaleString('en-IN')}
              </Link>
              <ViewInYourRoom
                subcategory={crownChair.subcategory}
                productName={crownChair.name}
                poster={crownChair.image}
                label="View in Your Room"
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-brandLime/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="w-full max-w-[430px] rounded-[2rem] bg-surfaceSubtle border border-line/8 p-4 sm:p-6 shadow-[inset_0_2px_10px_rgba(27,28,30,0.05),0_10px_30px_rgba(27,28,30,0.08)] transition-transform duration-700 group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/products/executive-chair-07.png" 
                alt={crownChair.name} 
                className="w-full aspect-[4/5] object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
        </Reveal>

        {/* Card 2: BESO FlexRise (Image Left, Text Right) */}
        <Reveal>
        <div className="bg-gradient-to-br from-[#F8F3EB] to-[#EFE7D9] border border-line/10 rounded-[2.5rem] overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-center relative group hover:shadow-card-hover transition-all duration-700">
          <div className="lg:col-span-6 lg:order-2 space-y-6 z-10">
            <span className="text-xs font-bold text-brandLime tracking-widest uppercase">Smart Standing Desks</span>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-ink tracking-tight">{flexRiseTable.name}</h3>
            <p className="text-ink/60 text-sm md:text-base leading-relaxed hidden sm:block">
              Transform your productivity by switching between sitting and standing seamlessly. Engineered with quiet dual-motors, anti-collision sensors, an elegant solid walnut desktop, and a 4-preset memory digital controller.
            </p>
            <p className="text-ink/50 text-xs sm:hidden">{flexRiseTable.tagline}</p>
            <div className="hidden sm:flex items-center gap-4 py-2">
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Height Range</div>
                <div className="text-xs md:text-sm font-semibold text-ink">70 cm to 120 cm</div>
              </div>
              <span className="w-px h-8 bg-line/[0.06]" aria-hidden="true" />
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Drive System</div>
                <div className="text-xs md:text-sm font-semibold text-ink">Dual Quiet Motors</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${flexRiseTable.slug}`} className="bg-ink text-app px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-extrabold inline-flex items-center justify-center transition-transform hover:scale-[1.03]">
                Configure Setup • ₹{flexRiseTable.price.toLocaleString('en-IN')}
              </Link>
              <ViewInYourRoom
                subcategory={flexRiseTable.subcategory}
                productName={flexRiseTable.name}
                poster={flexRiseTable.image}
                label="View in Your Room"
              />
            </div>
          </div>
          <div className="lg:col-span-6 lg:order-1 flex justify-center relative">
            <div className="absolute inset-0 bg-brandLime/5 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="w-full max-w-[430px] rounded-[2rem] bg-surfaceSubtle border border-line/8 p-4 sm:p-6 shadow-[inset_0_2px_10px_rgba(27,28,30,0.05),0_10px_30px_rgba(27,28,30,0.08)] transition-transform duration-700 group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/products/height-table-01.png" 
                alt={flexRiseTable.name} 
                className="w-full aspect-[4/5] object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
        </Reveal>

        {/* Card 3: BESO Prestige (Text Left, Image Right) */}
        <Reveal>
        <div className="bg-gradient-to-br from-[#F8F3EB] to-[#EFE7D9] border border-line/10 rounded-[2.5rem] overflow-hidden p-6 sm:p-8 md:p-12 lg:p-16 grid lg:grid-cols-12 gap-8 md:gap-12 items-center relative group hover:shadow-card-hover transition-all duration-700">
          <div className="lg:col-span-6 space-y-6 z-10">
            <span className="text-xs font-bold text-brandLime tracking-widest uppercase">Premium Luxury Support</span>
            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-ink tracking-tight">{prestigeChair.name}</h3>
            <p className="text-ink/60 text-sm md:text-base leading-relaxed hidden sm:block">
              Crafted for leaders. Upholstered in select full-grain Italian leather, featuring adjustable contoured structural segments, luxury padded armrests, and beautiful dark walnut wood spokes lining the polished steel base.
            </p>
            <p className="text-ink/50 text-xs sm:hidden">{prestigeChair.tagline}</p>
            <div className="hidden sm:flex items-center gap-4 py-2">
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Material Trim</div>
                <div className="text-xs md:text-sm font-semibold text-ink">Full-grain Leather</div>
              </div>
              <span className="w-px h-8 bg-line/[0.06]" aria-hidden="true" />
              <div className="shrink-0">
                <div className="text-[10px] text-ink/45 uppercase tracking-[0.05em] mb-0.5">Details</div>
                <div className="text-xs md:text-sm font-semibold text-ink">Teak & Walnut Accents</div>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <Link href={`/products/${prestigeChair.slug}`} className="bg-ink text-app px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-extrabold inline-flex items-center justify-center transition-transform hover:scale-[1.03]">
                Explore Prestige • ₹{prestigeChair.price.toLocaleString('en-IN')}
              </Link>
              <ViewInYourRoom
                subcategory={prestigeChair.subcategory}
                productName={prestigeChair.name}
                poster={prestigeChair.image}
                label="View in Your Room"
              />
            </div>
          </div>
          <div className="lg:col-span-6 flex justify-center relative">
            <div className="absolute inset-0 bg-brandLime/10 rounded-full blur-[80px] -z-10 group-hover:scale-110 transition-transform duration-700" />
            <div className="w-full max-w-[430px] rounded-[2rem] bg-surfaceSubtle border border-line/8 p-4 sm:p-6 shadow-[inset_0_2px_10px_rgba(27,28,30,0.05),0_10px_30px_rgba(27,28,30,0.08)] transition-transform duration-700 group-hover:scale-[1.02]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="/assets/images/products/executive-chair-04.png" 
                alt={prestigeChair.name} 
                className="w-full aspect-[4/5] object-cover rounded-2xl group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
          </div>
        </div>
        </Reveal>
      </section>

      {/* ─── AR Meeting Room Demo ─── */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/5">
        <Reveal>
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#F8F3EB] to-[#EFE7D9] border border-line/10 overflow-hidden p-8 sm:p-12 md:p-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-brandLime/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="lg:col-span-7 space-y-5 z-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-brandLime uppercase tracking-[0.25em]">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M21 8.6c0-.4-.2-.7-.5-.9L12.6 3.1c-.4-.2-.9-.2-1.3 0L3.5 7.7c-.3.2-.5.5-.5.9v6.8c0 .4.2.7.5.9l7.8 4.6c.2.1.4.2.7.2s.5-.1.7-.2l7.8-4.6c.3-.2.5-.5.5-.9V8.6zM12 4.8l5.5 3.2L12 11.2 6.5 8 12 4.8zM5.2 9.5l5.9 3.5v5.6L5.2 15v-5.5zm12.6 9.1l-5.9 3.5v-5.6l5.9-3.5v5.6z" /></svg>
              New · AR Experience
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-ink tracking-tight">
              Preview a BESO <span className="text-gradient">Meeting Room</span> in Your Own Space
            </h2>
            <p className="text-ink/60 text-sm md:text-base leading-relaxed max-w-xl">
              See a full conference setup — ergonomic chairs around a flagship table — placed at real scale in your
              boardroom, office, or home. Point your phone camera at the floor and walk around it.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <ViewInYourRoom
                model={MEETING_ROOM}
                productName="BESO Meeting Room Setup"
                variant="solid"
                size="lg"
                label="View Meeting Setup in AR"
              />
              <span className="text-[10px] text-ink/45 uppercase tracking-widest">
                Works on phone · No app needed
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 relative z-10 space-y-3 text-sm">
            {[
              ['Real-scale placement', 'True-to-size meters, not guesswork'],
              ['Rotate & inspect', 'Drag to spin — zoom into materials'],
              ['Try before you buy', 'Fit the whole setup in your room first'],
            ].map(([title, desc]) => (
              <div key={title} className="flex items-start gap-3 p-4 bg-surface-2/60 border border-line/8 rounded-2xl">
                <span className="mt-0.5 w-2 h-2 rounded-full bg-brandLime shrink-0" />
                <div>
                  <div className="font-semibold text-ink text-sm">{title}</div>
                  <div className="text-xs text-ink/50">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </section>

      {/* ─── Featured Picks Grid ─── */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/5">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-brandLime tracking-widest uppercase mb-1 block">Selected Ergonomics</span>
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">
              Featured <span className="text-gradient">Collections</span>
            </h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-brandLime hover:text-ink transition-colors flex items-center gap-1">
            Browse Entire Store <span>→</span>
          </Link>
        </Reveal>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Reveal key={product.id} delay={0.08 * featured.indexOf(product)}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Us Section ─── */}
      <Reveal>
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-20 border-t border-line/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brandLime tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brandLime animate-pulse" />
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tight mt-3">
            Built for serious <span className="text-gradient">procurement</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { title: 'Direct-Import Savings', desc: 'Eliminate middlemen, secure wholesale pricing on premium office and home furniture, boosting your procurement ROI.' },
            { title: 'B2B-Focused Procurement', desc: 'Streamlined corporate onboarding, flexible credit terms, and custom purchase orders tailored for large-scale fit-outs.' },
            { title: 'Ergonomic Performance', desc: 'Science-backed chairs and sit-stand desks enhance employee well-being, reduce fatigue, and drive sustained productivity.' },
            { title: '48-Hour Turnaround', desc: 'With two Hyderabad showrooms and a 12,000 sq ft warehouse, we dispatch and install most orders within two business days.' },
            { title: 'Dedicated Account Management', desc: 'A single point of contact for order tracking, priority support, and white-glove after-sales care, so your bulk procurements run flawlessly.' },
          ].map((item, i) => (
            <div key={i} className="why-card group relative bg-surface border border-line/8 rounded-3xl p-6 transition-all duration-300 hover:border-brandLime/40 hover:shadow-card-hover hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <span className="why-index mt-0.5 w-9 h-9 shrink-0 rounded-full bg-brandLime/10 text-brandLime flex items-center justify-center text-sm font-black transition-transform duration-300 group-hover:scale-110">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
                  <p className="text-xs text-ink/55 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* ─── Reviews / Testimonials ─── */}
      <Reveal>
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-20 border-t border-line/5">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brandLime tracking-widest uppercase inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brandLime animate-pulse" />
            Client Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-ink tracking-tight mt-3">
            Trusted by <span className="text-gradient">workspaces</span>
          </h2>
          <p className="text-ink/55 text-sm mt-3 max-w-xl mx-auto">
            Real feedback from offices, studios, and teams who furnished with BESO.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { name: 'Rohit Sharma', role: 'Facilities Head · IT Company', quote: 'Ordered 40 ergonomic chairs for our Bengaluru office. White-glove install in two days, invoicing was seamless — clearly a B2B-first partner.', rating: 5 },
            { name: 'Shreya Iyer', role: 'Studio Owner · Design Firm', quote: 'The FlexRise desks transformed our workstations. Quiet motors, solid walnut, and the team handled fit-out details we never expected.', rating: 5 },
            { name: 'Arjun Mehta', role: 'Procurement Lead · Consulting', quote: '48-hour turnaround was real. Dedicated point of contact, priority support, and the bulk pricing genuinely beat the market.', rating: 5 },
          ].map((r, i) => (
            <div key={i} className="group relative bg-surface border border-line/8 rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-brandLime/40 hover:shadow-card-hover hover:-translate-y-1">
              <div className="flex items-center gap-1 text-[#D97706]">
                {Array.from({length: r.rating}).map((_, s) => (
                  <svg key={s} viewBox="0 0 20 20" className="w-4 h-4 fill-current"><path d="M10 1.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L10 15.3l-5.3 2.8 1-5.8L1.5 7.7l5.9-.9z"/></svg>
                ))}
              </div>
              <p className="text-sm text-ink/70 leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-3 pt-2 border-t border-line/6">
                <span className="w-10 h-10 rounded-full bg-surface-2 text-ink/60 flex items-center justify-center font-bold text-sm">
                  {r.name.split(' ').map((n) => n[0]).join('')}
                </span>
                <div>
                  <div className="text-sm font-bold text-ink">{r.name}</div>
                  <div className="text-[10px] text-ink/45 uppercase tracking-wide">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* ─── Contact/WhatsApp Expert CTA ─── */}
      <Reveal>
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-24">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-brandLime/10 via-app to-app border border-brandLime/20 p-8 sm:p-12 md:p-16 overflow-hidden text-center space-y-6">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-brandLime/5 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
            Furnishing a Workspace?
          </h2>
          <p className="text-ink/50 max-w-md mx-auto text-sm leading-relaxed">
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
      </Reveal>
    </div>
  );
}
