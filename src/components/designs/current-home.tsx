import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import products from '@/data/products.json';
import { ProductCard } from '@/components/ProductCard';
import { ViewInYourRoom } from '@/components/ViewInYourRoom';
import { Reveal } from '@/components/Reveal';
import { MEETING_ROOM } from '@/lib/arModels';
import { FeaturedSlideOverShowcase } from '@/components/FeaturedSlideOverShowcase';
import { ShoppableRoomHotspots } from '@/components/ShoppableRoomHotspots';
import { RelatedWorksSection } from '@/components/RelatedWorksSection';
import { HomeTestimonials } from '@/components/HomeTestimonials';
import { ShowroomHighlight } from '@/components/ShowroomHighlight';



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
    <div className="text-ink min-h-screen flex flex-col overflow-x-clip">

      {/* ─── Hero Section with Video Loop ─── */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden -mt-20">
        {/* Background Video */}
        <div className="absolute inset-0 z-[1] select-none pointer-events-none">
          <HeroVideo />
          {/* Subtle Warm Scrim — allows natural oak wood and sunlight to shine brightly */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/10 to-black/35" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgb(var(--app-rgb))] to-transparent" />
        </div>

        {/* Ambient background glows via smooth radial gradients (zero GPU blur overhead) */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(circle at 40% 40%, rgb(var(--accent-rgb) / 0.12), transparent 50%), radial-gradient(circle at 70% 65%, rgb(var(--gold-rgb) / 0.10), transparent 50%)',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)] animate-fade-up" style={{animationDelay: '0.05s'}}>
            Pain-Free Working.<br />
            <span className="bg-gradient-to-r from-[#F5D096] via-[#E2A762] to-[#C98238] bg-clip-text text-transparent drop-shadow-[0_2px_16px_rgba(184,115,51,0.45)]">Max Productivity.</span><br />
            Healthier Living.
          </h1>
          
          <p className="text-white/90 text-sm md:text-lg max-w-2xl font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] animate-fade-up" style={{animationDelay: '0.2s'}}>
            We design state-of-the-art office chairs and height-adjustable desks tailored to support your posture, improve focus, and elevate your space.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4 justify-center items-center animate-fade-up" style={{animationDelay: '0.35s'}}>
            <Link href="/products" className="bg-white text-stone-900 hover:bg-[#F2EADC] px-8 py-4 rounded-full text-xs uppercase tracking-widest font-extrabold min-w-[200px] flex items-center justify-center transition-all hover:scale-[1.03] active:scale-[0.98] shadow-2xl">
              Explore Shop
            </Link>
            <a
              href="https://wa.me/918099952624?text=Hi%20BESO!%20I%27m%20interested%20in%20a%20workspace%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/35 text-white hover:text-white px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold min-w-[200px] inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/60"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Contact Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 3-Slide Vertical Slide-Up Showcase (Client Requirement) ─── */}
      <FeaturedSlideOverShowcase />

      {/* ─── Shoppable Room with Interactive Product Hotspots (Client Requirement) ─── */}
      <ShoppableRoomHotspots />

      {/* ─── AR Meeting Room Demo ─── */}
      <section className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-24 border-t border-line/5">
        <Reveal>
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-[#F8F3EB] to-[#EFE7D9] dark:from-[#17100B] dark:to-[#0D0805] border border-line/10 dark:border-white/10 overflow-hidden p-8 sm:p-12 md:p-16 grid lg:grid-cols-12 gap-8 items-center">
          <div
            className="absolute top-0 right-0 w-[380px] h-[380px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 100% 0%, rgb(var(--accent-rgb) / 0.12), transparent 70%)',
            }}
          />
          <div className="lg:col-span-7 space-y-5 z-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-[0.25em]">
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
              <div key={title} className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 dark:bg-[#1A120B]/85 border border-white/80 dark:border-white/15 backdrop-blur-xl shadow-[0_8px_20px_rgba(0,0,0,0.04),_inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4),_inset_0_1px_0_rgba(255,255,255,0.1)] hover:border-accent/40 transition-all">
                <span className="mt-1 w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_8px_rgb(var(--accent-rgb)/0.5)] shrink-0" />
                <div>
                  <div className="font-bold text-ink text-sm leading-snug">{title}</div>
                  <div className="text-xs text-ink/65 mt-0.5">{desc}</div>
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
            <span className="text-xs font-bold text-accent tracking-widest uppercase mb-1 block">Selected Ergonomics</span>
            <h2 className="text-3xl font-extrabold text-ink tracking-tight">
              Featured <span className="text-gradient">Collections</span>
            </h2>
          </div>
          <Link href="/products" className="text-sm font-bold text-accent hover:text-ink transition-colors flex items-center gap-1">
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

      {/* ─── Commercial Fit-Outs & Related Works (Client Requirement) ─── */}
      <RelatedWorksSection />


      {/* ─── Client Testimonials (Client Requirement) ─── */}
      <HomeTestimonials />

      {/* ─── Flagship Showroom Feature (Location Highlighted - Client Requirement) ─── */}
      <ShowroomHighlight />


    </div>
  );
}
