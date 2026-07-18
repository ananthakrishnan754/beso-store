import Link from 'next/link';

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=Hi%20BESO!%20I%27m%20interested%20in%20your%20furniture.';

const TRUST_BADGES = [
  {icon: '\u{1F69A}', title: 'Free Shipping', sub: 'On orders over \u20B910,000'},
  {icon: '\u{1F6E1}\uFE0F', title: '5-Year Warranty', sub: 'Extended product warranty'},
  {icon: '\u{1F504}', title: 'Easy Returns', sub: '7-day return policy'},
  {icon: '\u{1F4AC}', title: '24/7 Support', sub: 'WhatsApp us anytime'},
];

const WHATSAPP_SVG = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-beso-dark text-white border-t border-white/[0.06]">
      {/* Trust badges */}
      <div className="border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {TRUST_BADGES.map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm font-medium text-white">{item.title}</span>
                <span className="text-xs text-white/50">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">BESO</h3>
          <p className="text-sm text-white/50 mb-4 max-w-xs">
            Premium furniture for modern offices and homes. Crafted for comfort,
            designed for style.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-beso inline-flex items-center gap-2 text-sm px-5 py-2"
          >
            {WHATSAPP_SVG}
            WhatsApp Us
          </a>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Shop</h3>
          <nav className="grid gap-2">
            <Link href="/products?category=office" className="text-sm text-white/50 hover:text-white transition-colors">Office Furniture</Link>
            <Link href="/products?category=home" className="text-sm text-white/50 hover:text-white transition-colors">Home Furniture</Link>
            <Link href="/products" className="text-sm text-white/50 hover:text-white transition-colors">All Products</Link>
          </nav>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Company</h3>
          <nav className="grid gap-2">
            <Link href="/about" className="text-sm text-white/50 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link>
            <Link href="/compare" className="text-sm text-white/50 hover:text-white transition-colors">Compare</Link>
          </nav>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
          <div className="grid gap-2 text-sm text-white/50">
            <p>BESO Furniture</p>
            <p>Hyderabad, Telangana, India</p>
            <p>Phone: +91 98765 43210</p>
            <p>Email: hello@thebesostore.com</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} BESO Furniture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
