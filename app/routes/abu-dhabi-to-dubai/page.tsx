import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildService, buildBreadcrumb, buildFAQPage, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { ROUTES, site, whatsappUrl, bookingWaMessage } from "@/lib/site";

const ROUTE = ROUTES[1]; // abu-dhabi-to-dubai

export const metadata: Metadata = buildMetadata({
  title: "Abu Dhabi to Dubai Ride Service",
  description: ROUTE.metaDescription,
  path: `/routes/${ROUTE.slug}`,
  keywords: [
    "Abu Dhabi to Dubai ride",
    "Abu Dhabi Dubai car lift",
    "Abu Dhabi to Dubai shared ride",
    "Abu Dhabi to Dubai transfer",
    "car lift Abu Dhabi Dubai",
  ],
});

const ROUTE_FAQS = [
  {
    q: "How do I book a seat from Abu Dhabi to Dubai?",
    a: "Message us on WhatsApp at +971 56 228 6455 with your preferred date, pickup area in Abu Dhabi, and number of passengers. We confirm your fixed AED price before the trip.",
  },
  {
    q: "What is the fare from Abu Dhabi to Dubai?",
    a: "TODO_REAL_DATA: Fares are quoted in AED and confirmed on WhatsApp. Contact us for the current per-seat price.",
  },
  {
    q: "Which areas in Abu Dhabi do you pick up from?",
    a: "TODO_REAL_DATA: We pick up from multiple Abu Dhabi areas. Send us your area on WhatsApp and we will confirm availability.",
  },
  {
    q: "How long is the Abu Dhabi to Dubai journey?",
    a: "TODO_REAL_DATA: Journey time is typically 60–120 minutes depending on traffic. We estimate your travel time when you book.",
  },
] as const;

export default function AbuDhabiToDubaiPage() {
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
            MJ Car Lift Service offers daily rides from Abu Dhabi to Dubai.
            Book your seat on WhatsApp — we confirm your fixed AED price and
            exact pickup time. No waiting, no meter uncertainty.
          </AnswerBlock>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href={whatsappUrl(bookingWaMessage("Abu Dhabi to Dubai", "today", "my area"))}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-13 px-7 rounded-full bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold transition-colors"
            >
              <span aria-hidden="true">💬</span>Book on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center justify-center gap-2 h-13 px-7 rounded-full border-2 border-white/30 hover:bg-white/10 text-white font-semibold transition-colors"
            >
              <span aria-hidden="true">📞</span>{site.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>

      <section className="py-10 bg-neutral-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Route at a Glance</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">Key facts for the Abu Dhabi to Dubai route</caption>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["Route", "Abu Dhabi → Dubai"],
                  ["Typical duration", "TODO_REAL_DATA"],
                  ["Price per seat (AED)", "TODO_REAL_DATA"],
                  ["Salik / tolls", "TODO_REAL_DATA"],
                  ["Payment methods", "TODO_REAL_DATA"],
                ].map(([label, value]) => (
                  <tr key={label}>
                    <th scope="row" className="px-5 py-3 text-start font-semibold text-neutral-700 w-1/3 bg-neutral-50">{label}</th>
                    <td className="px-5 py-3 text-neutral-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-7">Abu Dhabi to Dubai — FAQ</h2>
          <div className="space-y-3">
            {ROUTE_FAQS.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-brand-900 list-none">
                  {faq.q}
                  <span className="ms-3 text-brand-600 transition-transform group-open:rotate-180 shrink-0" aria-hidden="true">▾</span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-neutral-700 text-sm leading-relaxed border-t border-neutral-100">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-brand-900 mb-5">Related</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/routes/dubai-to-abu-dhabi" className="px-5 py-3 rounded-full border border-brand-300 text-brand-700 hover:bg-brand-50 font-medium transition-colors text-sm">Dubai → Abu Dhabi ride →</Link>
            <Link href="/pricing" className="px-5 py-3 rounded-full border border-brand-300 text-brand-700 hover:bg-brand-50 font-medium transition-colors text-sm">Full price list →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
