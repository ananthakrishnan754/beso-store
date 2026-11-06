'use client';

import {useState} from 'react';

const WHATSAPP_NUMBER = '918099952624';
const STORE_MAP = 'https://maps.app.goo.gl/qZTmBgWAgiyv4Hwi6';
const WAREHOUSE_MAP =
  'https://maps.google.com/?q=Kattedan+Rd,+Telangana+NGOs+Colony,+Rajendranagar+Mandal,+Hyderabad,+Telangana+500077';

const INTENTS = [
  'General enquiry',
  'Book a consultation',
  'Product enquiry',
  'Bulk / corporate order',
  'Showroom visit',
];

export function ContactForm({defaultIntent}: {defaultIntent?: string}) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    intent: defaultIntent === 'consultation' ? 'Book a consultation' : 'General enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [whatsAppHref, setWhatsAppHref] = useState('');

  const update = (
    key: keyof typeof form,
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({...prev, [key]: e.target.value}));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = encodeURIComponent(
      `Hi BESO! ${form.intent}.\n\n` +
        `Name: ${form.name}\nPhone: ${form.phone}\n` +
        `Email: ${form.email || '—'}\nCompany: ${form.company || '—'}\n\n` +
        `${form.message}`,
    );

    const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    setWhatsAppHref(href);
    setSubmitted(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const submitLabel =
    form.intent === 'Book a consultation' ? 'Book Consultation' : 'Send Message';

  return (
    <div
      id="contact-form"
      className="scroll-mt-28 grid lg:grid-cols-12 gap-8 md:gap-10 rounded-3xl border border-line/10 bg-surface p-6 md:p-10"
    >
      <div className="lg:col-span-5 space-y-5">
        <div>
          <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
            Contact &amp; Consultations
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink">
            Tell us what you need
          </h2>
          <p className="text-sm text-ink/55 mt-2 leading-relaxed">
            Share a few details and our team will get back to you. For faster
            replies, the form opens a pre-filled WhatsApp message.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <div className="p-4 rounded-2xl bg-beso-card border border-line/8">
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">
              Store
            </div>
            <p className="text-ink/70 leading-relaxed">
              5-8-91/5, Mahesh Nagar Colony, Abids, Hyderabad, Telangana 500001
            </p>
            <a
              href={STORE_MAP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-bold text-accent hover:underline"
            >
              Open Store Map →
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-beso-card border border-line/8">
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">
              Warehouse
            </div>
            <p className="text-ink/70 leading-relaxed">
              Kattedan Rd, Telangana NGOs Colony, Rajendranagar Mandal, Hyderabad,
              Telangana 500077
            </p>
            <a
              href={WAREHOUSE_MAP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs font-bold text-accent hover:underline"
            >
              Open Warehouse Map →
            </a>
          </div>

          <div className="text-xs text-ink/50 space-y-1">
            <p>
              Phone:{' '}
              <a href="tel:+918919317980" className="hover:text-ink font-semibold">
                089193 17980
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:hello@thebesostore.com"
                className="hover:text-ink font-semibold"
              >
                hello@thebesostore.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        {submitted ? (
          <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center gap-4 p-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center text-2xl font-black">
              ✓
            </div>
            <h3 className="text-xl font-bold text-ink">Message ready to send</h3>
            <p className="text-sm text-ink/55 max-w-sm">
              We&apos;ve opened WhatsApp with your details. Send the message to
              reach our team.
            </p>
            <a
              href={whatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-widest transition-all"
            >
              Re-open WhatsApp
            </a>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-xs font-semibold text-ink/50 hover:text-ink"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={update('email')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-ink/70 block mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">
                How can we help? *
              </label>
              <select
                value={form.intent}
                onChange={update('intent')}
                className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent"
              >
                {INTENTS.map((intent) => (
                  <option key={intent} value={intent}>
                    {intent}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-ink/70 block mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={update('message')}
                placeholder="Tell us about your workspace, product interest, or preferred consultation time…"
                className="w-full px-4 py-2.5 rounded-xl border border-line/15 bg-app text-ink text-sm focus:outline-none focus:border-accent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-accent hover:bg-accent-2 text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-accent/25 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              {submitLabel} →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
