import Link from "next/link";
import { site, whatsappUrl, DEFAULT_WA_MESSAGE } from "@/lib/site";

const QUICK_LINKS = [
  { href: "/routes/dubai-to-abu-dhabi", label: "Dubai → Abu Dhabi" },
  { href: "/routes/abu-dhabi-to-dubai", label: "Abu Dhabi → Dubai" },
  { href: "/pricing", label: "Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL_LINKS = [
  { href: "/safety-and-compliance", label: "Safety & Compliance" },
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/cancellation-refund", label: "Cancellation & Refund" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-900 text-neutral-300 mt-auto">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold text-lg mb-3"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-600 text-white font-bold text-base">
                MJ
              </span>
              MJ Car Lift
            </Link>
            <p className="text-sm leading-relaxed text-neutral-400 mb-4">
              {site.tagline}
            </p>
            <p className="text-xs text-neutral-500">
              {/* TODO_VERIFY_LEGAL: Display licence number once verified */}
              Licence details: <span className="text-neutral-400">[TODO_REAL_DATA]</span>
            </p>
          </div>

          {/* Routes */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Our Routes
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <span aria-hidden="true">📞</span>
                  {site.contact.phoneFormatted}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl(DEFAULT_WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <span aria-hidden="true">💬</span>
                  WhatsApp us
                </a>
              </li>
              <li>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  <span aria-hidden="true">📘</span>
                  Facebook page
                </a>
              </li>
            </ul>

            {/* NAP — must match Google Business Profile exactly */}
            <address className="not-italic mt-4 text-xs text-neutral-500 leading-relaxed">
              {site.name}<br />
              Service area: Dubai &amp; Abu Dhabi, UAE<br />
              {site.contact.phoneFormatted}
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>
            {/* TODO_VERIFY_LEGAL: Replace placeholder with real licence/permit numbers once verified */}
            Transport licence: <span className="text-neutral-400">[TODO_VERIFY_LEGAL]</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
