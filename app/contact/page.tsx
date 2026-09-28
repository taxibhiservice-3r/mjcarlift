import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import { site, whatsappUrl, DEFAULT_WA_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact MJ Car Lift Service — WhatsApp & Phone",
  description:
    "Contact MJ Car Lift Service on WhatsApp or by phone to book a seat between Dubai and Abu Dhabi. Fixed AED price confirmed before you travel.",
  path: "/contact",
  keywords: ["MJ Car Lift Service contact", "Dubai Abu Dhabi ride booking", "WhatsApp car lift Dubai"],
});

export default function ContactPage() {
  const schema = buildGraph([
    buildBreadcrumb([{ name: "Home", href: "/" }, { name: "Contact" }]),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-brand-800 text-white py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-300 mb-4">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-white">Contact</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-brand-200 max-w-xl">
            The fastest way to book is WhatsApp. Send your route, date and pickup
            area — we respond with a fixed AED price and pickup time.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* WhatsApp */}
            <a
              href={whatsappUrl(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-5 bg-brand-700 hover:bg-brand-800 text-white rounded-2xl p-7 transition-colors group"
            >
              <span className="text-4xl shrink-0" aria-hidden="true">💬</span>
              <div>
                <p className="font-bold text-lg mb-1">WhatsApp (fastest)</p>
                <p className="text-brand-200 text-sm leading-relaxed">
                  Message us with your route, date, and pickup area. We confirm
                  price and time immediately.
                </p>
                <p className="mt-3 font-semibold text-accent-400 group-hover:underline">
                  {site.contact.phoneFormatted} →
                </p>
              </div>
            </a>

            {/* Call */}
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-start gap-5 bg-white hover:bg-neutral-50 border border-neutral-200 rounded-2xl p-7 transition-colors group"
            >
              <span className="text-4xl shrink-0" aria-hidden="true">📞</span>
              <div>
                <p className="font-bold text-lg text-brand-900 mb-1">Call Us</p>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Prefer to speak directly? Call us during operating hours to
                  check availability.
                </p>
                <p className="mt-3 font-semibold text-brand-700 group-hover:underline">
                  {site.contact.phoneFormatted} →
                </p>
              </div>
            </a>
          </div>

          {/* NAP block — matches Google Business Profile exactly */}
          <div className="mt-10 bg-neutral-50 rounded-2xl p-7">
            <h2 className="font-bold text-brand-900 mb-4 text-lg">Business Details</h2>
            <address className="not-italic text-neutral-700 text-sm space-y-2">
              <p><strong className="text-brand-900">{site.name}</strong></p>
              <p>Service area: Dubai &amp; Abu Dhabi, UAE</p>
              <p>
                Phone / WhatsApp:{" "}
                <a href={`tel:${site.contact.phone}`} className="text-brand-700 hover:underline">
                  {site.contact.phoneFormatted}
                </a>
              </p>
              <p className="text-neutral-500 text-xs mt-3">
                Operating hours: TODO_REAL_DATA — confirm with owner.
              </p>
              <p className="text-neutral-500 text-xs">
                Licence: TODO_VERIFY_LEGAL — details to be published once verified.
              </p>
            </address>
          </div>

          <div className="mt-8 text-sm text-neutral-600">
            <p>
              Also find us on{" "}
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline font-medium"
              >
                Facebook
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
