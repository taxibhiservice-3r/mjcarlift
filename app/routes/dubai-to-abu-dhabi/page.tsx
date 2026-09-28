import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildService, buildBreadcrumb, buildFAQPage, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { ROUTES, GLOBAL_FAQS, site, whatsappUrl, bookingWaMessage } from "@/lib/site";

const ROUTE = ROUTES[0]; // dubai-to-abu-dhabi

export const metadata: Metadata = buildMetadata({
  title: "Dubai to Abu Dhabi Ride Service",
  description: ROUTE.metaDescription,
  path: `/routes/${ROUTE.slug}`,
  keywords: [
    "Dubai to Abu Dhabi ride",
    "Dubai Abu Dhabi car lift",
    "Dubai to Abu Dhabi shared ride",
    "Dubai to Abu Dhabi taxi",
    "car lift Dubai Abu Dhabi",
    "Dubai Abu Dhabi transfer",
  ],
});

const ROUTE_FAQS = [
  {
    q: "How do I book a seat from Dubai to Abu Dhabi?",
    a: "Message us on WhatsApp at +971 56 228 6455 with your preferred date, pickup area in Dubai, and number of passengers. We confirm your fixed AED price before the trip.",
  },
  {
    q: "What is the fare from Dubai to Abu Dhabi?",
    a: "TODO_REAL_DATA: Fares are quoted in AED and confirmed on WhatsApp. Contact us for the current per-seat price.",
  },
  {
    q: "Which areas in Dubai do you pick up from for the Abu Dhabi route?",
    a: "TODO_REAL_DATA: We pick up from multiple Dubai areas. Send us your area on WhatsApp and we will confirm availability.",
  },
  {
    q: "How long does it take to get from Dubai to Abu Dhabi?",
    a: "TODO_REAL_DATA: Typical journey time on the E11/Sheikh Zayed Road is around 60–120 minutes depending on traffic. We will give you a realistic estimate when you book.",
  },
  {
    q: "Are Salik tolls included in the Dubai to Abu Dhabi price?",
    a: "TODO_REAL_DATA: Confirm with the owner whether Salik is included in the quoted fare.",
  },
] as const;

export default function DubaiToAbuDhabiPage() {
  const schema = buildGraph([
    buildService({
      name: ROUTE.h1,
      description: ROUTE.metaDescription,
      path: `/routes/${ROUTE.slug}`,
      fromCity: ROUTE.from,
      toCity: ROUTE.to,
      priceAed: ROUTE.pricePerSeatAed,
    }),
    buildBreadcrumb([
      { name: "Home", href: "/" },
      { name: "Routes", href: "/routes" },
      { name: ROUTE.label },
    ]),
    buildFAQPage(ROUTE_FAQS),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 text-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-300 mb-4">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/routes" className="hover:text-white">Routes</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-white">{ROUTE.label}</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{ROUTE.h1}</h1>
          <AnswerBlock lastUpdated="September 2026">
            MJ Car Lift Service runs daily rides from Dubai to Abu Dhabi.
            Book your seat on WhatsApp — we confirm your fixed AED price and exact
            pickup time before you travel. No waiting at a bus stop, no meter
            uncertainty.
          </AnswerBlock>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={whatsappUrl(bookingWaMessage("Dubai to Abu Dhabi", "today", "my area"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold transition-colors"
            >
              <span aria-hidden="true">💬</span>
              Book on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center justify-center gap-2 h-13 px-7 rounded-full border-2 border-white/30 hover:bg-white/10 text-white font-semibold transition-colors"
            >
              <span aria-hidden="true">📞</span>
              {site.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>

      {/* ── Key Facts Table ───────────────────────────────────── */}
      <section className="py-10 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Route at a Glance</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Key facts for the Dubai to Abu Dhabi route</caption>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["Route", "Dubai → Abu Dhabi"],
                  ["Typical duration", "TODO_REAL_DATA: e.g. 60–90 min (traffic dependent)"],
                  ["Price per seat (AED)", "TODO_REAL_DATA: Contact us on WhatsApp"],
                  ["Private car (AED)", "TODO_REAL_DATA: Contact us on WhatsApp"],
                  ["Salik / tolls", "TODO_REAL_DATA: Included or not — confirm with owner"],
                  ["Luggage allowance", "TODO_REAL_DATA: Confirm with owner"],
                  ["Payment methods", "TODO_REAL_DATA: e.g. Cash, bank transfer"],
                  ["Booking notice", "TODO_REAL_DATA: e.g. Minimum 2 hours in advance"],
                  ["Operating hours", "TODO_REAL_DATA: Confirm actual hours"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-3 text-start font-semibold text-neutral-700 w-1/3 bg-neutral-50">
                      {label}
                    </th>
                    <td className="px-5 py-3 text-neutral-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mt-3">
            Prices in AED. Last updated: September 2026. Confirm current fare on WhatsApp before booking.
          </p>
        </div>
      </section>

      {/* ── How to Book ───────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">How to Book Dubai → Abu Dhabi</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-7">
            {[
              { step: "1", title: "Message on WhatsApp", desc: "Send your date, pickup area in Dubai, and number of passengers to +971 56 228 6455." },
              { step: "2", title: "Confirm price & time", desc: "We reply with your fixed AED fare and exact pickup time. No hidden charges." },
              { step: "3", title: "Travel comfortably", desc: "Meet your driver at the agreed point and travel direct to your Abu Dhabi destination." },
            ].map((item) => (
              <li key={item.step} className="flex flex-col">
                <span className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-700 text-white font-bold mb-4">
                  {item.step}
                </span>
                <h3 className="font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-7">
            Dubai to Abu Dhabi — Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {ROUTE_FAQS.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-brand-900 list-none">
                  {faq.q}
                  <span className="ms-3 text-brand-600 transition-transform group-open:rotate-180 shrink-0" aria-hidden="true">▾</span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-neutral-700 text-sm leading-relaxed border-t border-neutral-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related routes ────────────────────────────────────── */}
      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/routes/abu-dhabi-to-dubai" className="px-5 py-3 rounded-full border border-brand-300 text-brand-700 hover:bg-brand-50 font-medium transition-colors text-sm">
              Abu Dhabi → Dubai ride →
            </Link>
            <Link href="/pricing" className="px-5 py-3 rounded-full border border-brand-300 text-brand-700 hover:bg-brand-50 font-medium transition-colors text-sm">
              Full price list →
            </Link>
            <Link href="/how-it-works" className="px-5 py-3 rounded-full border border-brand-300 text-brand-700 hover:bg-brand-50 font-medium transition-colors text-sm">
              How it works →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
