import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildFAQPage, buildService, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { site, ROUTES, GLOBAL_FAQS, whatsappUrl, bookingWaMessage, DEFAULT_WA_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dubai to Abu Dhabi Ride Service",
  description:
    "MJ Car Lift Service — shared seats and private car hire between Dubai and Abu Dhabi. Fixed AED prices confirmed on WhatsApp. Daily departures, direct routes.",
  path: "/",
  keywords: [
    "Dubai to Abu Dhabi ride",
    "Dubai Abu Dhabi car lift",
    "Abu Dhabi to Dubai shared ride",
    "car lift Dubai",
    "Dubai Abu Dhabi taxi",
  ],
});

const TRUST_ITEMS = [
  {
    icon: "📋",
    title: "Licensed & Compliant",
    desc: "TODO_VERIFY_LEGAL: Licence details will be published once confirmed with the relevant UAE authorities.",
  },
  {
    icon: "💰",
    title: "Fixed AED Price",
    desc: "Your fare is agreed on WhatsApp before you travel. No hidden charges, no meter surprises.",
  },
  {
    icon: "🚗",
    title: "Clean, Air-Conditioned Vehicles",
    desc: "TODO_REAL_DATA: Cleaning routine and fleet details to be confirmed by the owner.",
  },
  {
    icon: "👍",
    title: "Recommended on Facebook",
    desc: 'Recommended by 24 people on Facebook (as of when the page was last checked). Visit our Facebook page to read reviews.',
  },
];

const HOME_FAQS = GLOBAL_FAQS.slice(0, 6);

export default function HomePage() {
  const schema = buildGraph([
    ...ROUTES.map((route) =>
      buildService({
        name: route.h1,
        description: route.metaDescription,
        path: `/routes/${route.slug}`,
        fromCity: route.from,
        toCity: route.to,
        priceAed: route.pricePerSeatAed,
      })
    ),
    buildFAQPage(HOME_FAQS),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-brand-300 text-sm font-semibold uppercase tracking-widest mb-3">
              Dubai ↔ Abu Dhabi
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5">
              Dubai to Abu Dhabi{" "}
              <span className="text-accent-400">Ride Service</span>
            </h1>
            <AnswerBlock lastUpdated="September 2026">
              MJ Car Lift Service offers shared seats and private car hire
              between Dubai and Abu Dhabi. Book on WhatsApp — we confirm your
              fixed AED price and pickup time before you travel. No waiting at a
              bus stop, no meter uncertainty, no hidden charges.
            </AnswerBlock>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a
                href={whatsappUrl(bookingWaMessage("Dubai to Abu Dhabi", "today", "my area"))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold text-base transition-colors"
              >
                <span aria-hidden="true">💬</span>
                Book on WhatsApp
              </a>
              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-center justify-center gap-2 h-14 px-8 rounded-full border-2 border-white/30 hover:bg-white/10 text-white font-semibold text-base transition-colors"
              >
                <span aria-hidden="true">📞</span>
                {site.contact.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Route Cards ──────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">Available Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ROUTES.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.slug}`}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:border-brand-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold mb-1">Route</p>
                    <p className="text-xl font-bold text-brand-900">{route.from}</p>
                    <p className="text-brand-600 font-medium text-sm mt-0.5">→ {route.to}</p>
                  </div>
                  <span className="text-3xl" aria-hidden="true">🚗</span>
                </div>
                <dl className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <dt className="text-xs text-neutral-500">From (per seat)</dt>
                    <dd className="text-base font-bold text-brand-700">
                      {route.pricePerSeatAed ? `AED ${route.pricePerSeatAed}` : "Contact for price"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500">Duration</dt>
                    <dd className="text-base font-semibold text-neutral-800">
                      {route.durationMin && route.durationMax
                        ? `${route.durationMin}–${route.durationMax} min`
                        : "Traffic dependent"}
                    </dd>
                  </div>
                </dl>
                <p className="mt-5 text-sm font-semibold text-brand-600 group-hover:underline">
                  View details & book →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────── */}
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-10">How It Works</h2>
          <ol className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Message us on WhatsApp", desc: "Send your route, date, pickup area, and number of passengers to +971 56 228 6455." },
              { step: "2", title: "Confirm price & pickup", desc: "We reply with your fixed AED fare and exact pickup time. No hidden charges." },
              { step: "3", title: "Travel comfortably", desc: "Meet at the agreed point and ride direct to your destination." },
            ].map((item) => (
              <li key={item.step} className="flex flex-col items-start">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-700 text-white font-bold text-lg mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-neutral-600 leading-relaxed text-sm">{item.desc}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8">
            <Link href="/how-it-works" className="text-sm font-semibold text-brand-600 hover:underline">
              Full booking guide →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Trust Block ──────────────────────────────────────────── */}
      <section className="bg-brand-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">Why Travellers Choose MJ Car Lift</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-neutral-200">
                <span className="text-3xl mb-3 block" aria-hidden="true">{item.icon}</span>
                <h3 className="font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-6">
            <Link href="/safety-and-compliance" className="text-sm font-semibold text-brand-600 hover:underline">
              Safety & compliance details →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Pricing Snapshot ─────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-900">Pricing</h2>
            <Link href="/pricing" className="text-sm font-semibold text-brand-600 hover:underline">Full price list →</Link>
          </div>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm">
              <caption className="sr-only">MJ Car Lift Service pricing in AED</caption>
              <thead className="bg-brand-800 text-white">
                <tr>
                  <th scope="col" className="text-start px-5 py-3 font-semibold">Service</th>
                  <th scope="col" className="text-end px-5 py-3 font-semibold">Price (AED)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["Shared seat — Dubai ↔ Abu Dhabi", "TODO_REAL_DATA"],
                  ["Private full-car — Dubai ↔ Abu Dhabi", "TODO_REAL_DATA"],
                  ["Airport transfer", "TODO_REAL_DATA"],
                ].map(([service, price]) => (
                  <tr key={service}>
                    <td className="px-5 py-3">{service}</td>
                    <td className="px-5 py-3 text-end font-semibold text-brand-700">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="px-5 py-3 text-xs text-neutral-500 bg-neutral-50">
              Prices in AED. Confirmed on WhatsApp before travel. Salik tolls: TODO_REAL_DATA.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {HOME_FAQS.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-xl border border-neutral-200">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-brand-900 list-none">
                  {faq.q}
                  <span className="ms-3 text-brand-600 transition-transform group-open:rotate-180 shrink-0" aria-hidden="true">▾</span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-neutral-700 leading-relaxed text-sm border-t border-neutral-100">{faq.a}</div>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            <Link href="/faq" className="text-brand-600 font-semibold hover:underline">See all FAQs →</Link>
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="bg-brand-800 text-white py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to book your ride?</h2>
          <p className="text-brand-200 mb-8 leading-relaxed">
            Send us a WhatsApp message with your route and date. We&apos;ll confirm
            your fixed price in AED and pickup details within minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappUrl(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-14 px-8 rounded-full bg-accent-500 hover:bg-accent-600 text-brand-900 font-bold text-base transition-colors"
            >
              <span aria-hidden="true">💬</span>Book on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center justify-center gap-2 h-14 px-8 rounded-full border-2 border-white/30 hover:bg-white/10 text-white font-semibold text-base transition-colors"
            >
              <span aria-hidden="true">📞</span>{site.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
