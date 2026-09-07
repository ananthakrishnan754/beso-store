import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with BESO Furniture — WhatsApp, email, or visit us. Bulk orders welcome.',
};

const WHATSAPP_URL =
  'https://wa.me/919876543210?text=Hi%20BESO!%20I%27m%20interested%20in%20your%20furniture.';

const CONTACT_OPTIONS = [
  {
    icon: '\u{1F4AC}',
    title: 'WhatsApp',
    desc: 'Chat with our furniture experts instantly.',
    action: WHATSAPP_URL,
    label: 'Open WhatsApp',
    external: true,
  },
  {
    icon: '\u{1F4E7}',
    title: 'Email',
    desc: 'Write to us for detailed queries or support.',
    action: 'mailto:hello@thebesostore.com',
    label: 'Send Email',
    external: false,
  },
  {
    icon: '\u{1F4CD}',
    title: 'Visit Us',
    desc: 'BESO Furniture, Hyderabad, Telangana, India',
    action: 'https://maps.google.com/?q=Hyderabad+Telangana+India',
    label: 'View on Map',
    external: true,
  },
];

const FAQ = [
  {
    q: 'Do you offer bulk/corporate orders?',
    a: 'Yes! We offer special pricing for bulk orders of 5+ units. Contact us on WhatsApp with your requirements for a custom quote.',
  },
  {
    q: 'What is the warranty policy?',
    a: 'All BESO products come with a 5-year warranty covering manufacturing defects. Structural components are covered for the full duration.',
  },
  {
    q: 'Do you ship across India?',
    a: 'Yes, we ship pan-India. Free delivery on orders above \u20B910,000. Delivery typically takes 5-10 business days depending on your location.',
  },
  {
    q: 'Can I return a product?',
    a: 'We offer a 7-day return policy for unused products in original packaging. Contact us on WhatsApp to initiate a return.',
  },
  {
    q: 'Do you offer installation?',
    a: 'Yes, free installation is included with all office furniture orders. Home furniture includes easy-to-follow assembly instructions.',
  },
];

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
      {/* Hero */}
      <div className="max-w-3xl mb-16">
        <p className="text-beso-lime text-sm font-semibold tracking-widest uppercase mb-3">
          Get in Touch
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-ink mb-6">
          We'd Love to <span className="text-gradient">Hear From You</span>
        </h1>
        <p className="text-ink/50 text-lg">
          Whether you have a question about products, bulk orders, or just want to
          say hello — reach out anytime.
        </p>
      </div>

      {/* Contact options */}
      <div className="grid sm:grid-cols-3 gap-4 mb-16">
        {CONTACT_OPTIONS.map((opt) => (
          <a
            key={opt.title}
            href={opt.action}
            target={opt.external ? '_blank' : undefined}
            rel={opt.external ? 'noopener noreferrer' : undefined}
            className="bg-beso-card rounded-2xl border border-line/6 p-6 hover:border-line/10 transition-colors block"
          >
            <span className="text-3xl mb-3 block">{opt.icon}</span>
            <h3 className="font-semibold text-ink mb-1">{opt.title}</h3>
            <p className="text-sm text-ink/40 mb-4">{opt.desc}</p>
            <span className="text-sm text-beso-lime font-medium">{opt.label} \u2192</span>
          </a>
        ))}
      </div>

      {/* Bulk orders CTA */}
      <div className="bg-gradient-to-br from-beso-lime/10 to-app rounded-3xl border border-beso-lime/20 p-8 md:p-12 text-center mb-16">
        <h2 className="text-2xl font-bold text-ink mb-3">
          Bulk & Corporate Orders
        </h2>
        <p className="text-ink/50 max-w-md mx-auto mb-6">
          Furnishing an office, co-working space, or commercial project? We
          offer volume discounts starting at 5 units.
        </p>
        <a
          href="https://wa.me/919876543210?text=Hi!%20I%27m%20interested%20in%20a%20bulk%20order%20for%20BESO%20furniture."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-beso px-8 py-3 text-sm inline-block"
        >
          Get Bulk Quote on WhatsApp
        </a>
      </div>

      {/* FAQ */}
      <div>
        <h2 className="text-2xl font-bold text-ink mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="bg-beso-card rounded-2xl border border-line/6 group"
            >
              <summary className="px-6 py-4 cursor-pointer text-ink font-medium list-none flex items-center justify-between">
                {item.q}
                <span className="text-ink/30 group-open:rotate-45 transition-transform text-xl">
                  +
                </span>
              </summary>
              <div className="px-6 pb-4 text-sm text-ink/50 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
