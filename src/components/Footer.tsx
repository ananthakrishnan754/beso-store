import Link from 'next/link';

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=Hi%20BESO!%20I%27m%20interested%20in%20your%20furniture.';

const WHATSAPP_SVG = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  const footerMarqueeText = '#WORKBETTER #LIVEBETTER #BESOFIT #WORKBETTER #LIVEBETTER #BESOFIT #WORKBETTER #LIVEBETTER #BESOFIT';

  return (
    <footer className="bg-beso-dark text-ink border-t border-line/6 select-none">
      {/* ─── Scrolling Footer Marquee ─── */}
      <div className="border-b border-line/6 bg-ink/10 py-4 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-xs font-bold uppercase tracking-[0.3em] text-ink/20">
          {footerMarqueeText} {footerMarqueeText}
        </div>
      </div>

      {/* ─── Main Footer Columns ─── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        
        {/* Column 1: Contact Us */}
        <div className="col-span-2 md:col-span-1 space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Contact Us</h4>
          <div className="space-y-2 text-xs md:text-sm text-ink/50">
            <p>
              WhatsApp:{' '}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">
                +91 98765 43210
              </a>
            </p>
            <p>
              Email:{' '}
              <a href="mailto:hello@thebesostore.com" className="hover:text-ink transition-colors">
                hello@thebesostore.com
              </a>
            </p>
          </div>
          <div className="pt-2 flex items-center gap-3">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            {/* WhatsApp Contact */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="p-2 bg-ink/5 hover:bg-ink/10 rounded-full transition-colors text-beso-lime" aria-label="WhatsApp">
              {WHATSAPP_SVG}
            </a>
          </div>
        </div>

        {/* Column 2: Company */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Company</h4>
          <nav className="flex flex-col gap-2 text-xs md:text-sm text-ink/50">
            <Link href="/about" className="hover:text-ink transition-colors">About Us</Link>
            <Link href="/products" className="hover:text-ink transition-colors">Store</Link>
            <span className="text-ink/30 cursor-not-allowed">Certificates</span>
            <Link href="/compare" className="hover:text-ink transition-colors">For Business</Link>
          </nav>
        </div>

        {/* Column 3: Support */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Support</h4>
          <nav className="flex flex-col gap-2 text-xs md:text-sm text-ink/50">
            <Link href="/contact" className="hover:text-ink transition-colors">Contact</Link>
            <span className="text-ink/30 cursor-not-allowed">Return Policy</span>
            <span className="text-ink/30 cursor-not-allowed">Warranty Policy</span>
            <span className="text-ink/30 cursor-not-allowed">FAQs</span>
          </nav>
        </div>

        {/* Column 4: Office Chairs */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Office Chairs</h4>
          <nav className="flex flex-col gap-2 text-xs md:text-sm text-ink/50">
            <Link href="/products/ezeebee-zig-zag-executive-chair" className="hover:text-ink transition-colors">Zig Zag Executive</Link>
            <Link href="/products/beso-crown-executive-chair" className="hover:text-ink transition-colors">BESO Crown</Link>
            <Link href="/products/beso-prestige-executive-chair" className="hover:text-ink transition-colors">BESO Prestige</Link>
            <Link href="/products/beso-ergomax-executive-chair" className="hover:text-ink transition-colors">ErgoMax</Link>
            <Link href="/compare" className="hover:text-ink transition-colors">Compare Chairs</Link>
          </nav>
        </div>

        {/* Column 5: Desks */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Desks</h4>
          <nav className="flex flex-col gap-2 text-xs md:text-sm text-ink/50">
            <Link href="/products/beso-flexrise-height-adjustable-table" className="hover:text-ink transition-colors">FlexRise Standing</Link>
            <Link href="/products/beso-horizon-executive-table" className="hover:text-ink transition-colors">Horizon Executive</Link>
            <Link href="/products/beso-l-shape-executive-table" className="hover:text-ink transition-colors">L-Shape Executive</Link>
            <Link href="/products/beso-milano-executive-table" className="hover:text-ink transition-colors">Milano Table</Link>
          </nav>
        </div>

        {/* Column 6: Accessories */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest text-beso-lime uppercase">Accessories</h4>
          <nav className="flex flex-col gap-2 text-xs md:text-sm text-ink/50">
            <span className="text-ink/30 cursor-not-allowed">Cable Organizer</span>
            <span className="text-ink/30 cursor-not-allowed">Ergonomic Footrest</span>
            <span className="text-ink/30 cursor-not-allowed">Standing Mat</span>
            <span className="text-ink/30 cursor-not-allowed">Monitor Arm</span>
          </nav>
        </div>

      </div>

      {/* ─── Office Addresses & Manufacturing ─── */}
      <div className="border-t border-line/6 bg-ink/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-ink/40 leading-relaxed">
          <div className="space-y-1">
            <span className="font-bold text-ink uppercase tracking-wider block">Registered Address</span>
            <p>BESO Furniture Private Limited</p>
            <p>Plot No. 42, Silicon Valley, Madhapur</p>
            <p>Hyderabad, Telangana - 500081</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-ink uppercase tracking-wider block">Operations Center</span>
            <p>Unit 402, 4th Floor, Ergo Towers</p>
            <p>Hitech City Main Road, Kondapur</p>
            <p>Hyderabad, Telangana - 500084</p>
          </div>
          <div className="space-y-1">
            <span className="font-bold text-ink uppercase tracking-wider block">Manufacturing Unit</span>
            <p>Sy No. 129, IDA Pashamylaram</p>
            <p>Patancheru Mandal, Sangareddy Dist</p>
            <p>Telangana - 502307</p>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar with Policies & Copyright ─── */}
      <div className="border-t border-line/6 bg-ink/15">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-ink/30">
          <p>
            &copy; {new Date().getFullYear()} BESO Furniture. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-ink transition-colors cursor-not-allowed">Terms & Conditions</span>
            <span className="hover:text-ink transition-colors cursor-not-allowed">Privacy Policy</span>
            <span className="hover:text-ink transition-colors cursor-not-allowed">Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
