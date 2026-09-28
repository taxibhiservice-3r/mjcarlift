import type { Metadata } from "next";
import Link from "next/link";
import { site, whatsappUrl, BOOKING_WA_MESSAGE, ROUTES, DEFAULT_WA_MESSAGE } from "@/lib/site";
import AnswerBlock from "@/components/ui/AnswerBlock";

export const metadata: Metadata = {
  title: "Dubai to Abu Dhabi Ride Service | MJ Car Lift Service",
  description:
    "Book a seat or private car between Dubai and Abu Dhabi. Fixed AED prices, WhatsApp booking, comfortable vehicles. MJ Car Lift Service.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    q: "How do I book a seat with MJ Car Lift Service?",
    a: "Message us on WhatsApp with your route, date, pickup area and number of passengers. We'll confirm availability and your fixed AED price before you travel.",
  },
  {
    q: "What is the price for a seat from Dubai to Abu Dhabi?",
    a: "TODO_REAL_DATA: Prices are quoted in AED and confirmed before you travel. Contact us on WhatsApp for the current fare.",
  },
  {
    q: "Do you offer private full-car hire?",
    a: "TODO_REAL_DATA: Confirm with the owner whether private full-car hire is available and at what price.",
  },
  {
    q: "Are tolls (Salik) included in the price?",
    a: "TODO_REAL_DATA: Confirm with the owner whether Salik tolls are included in the quoted fare.",
  },
  {
    q: "What areas in Dubai do you pick up from?",
    a: "TODO_REAL_DATA: Confirm pickup areas with the owner (e.g. Deira, Bur Dubai, Al Barsha, JLT, Karama, Al Qusais).",
  },
  {
    q: "Is MJ Car Lift Service licensed to operate in the UAE?",
    a: "TODO_VERIFY_LEGAL: The owner is in the process of providing their trade licence and transport permit details. This page will be updated once verified.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "1",
    title: "Message us on WhatsApp",
    desc: "Send your route, date, pickup area and number of passengers to +971 56 228 6455.",
  },
  {
    step: "2",
    title: "Confirm price and pickup",
    desc: "We'll reply with your fixed AED price and exact pickup time. No hidden charges.",
  },
  {
    step: "3",
    title: "Travel comfortably",
    desc: "Meet at the agreed point. Your driver will take you directly to your destination.",
  },
];

export default function HomePage() {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <p className="text-brand-300 text-sm font-semibold uppercase tracking-widest mb-3">
              Dubai ↔ Abu Dhabi
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
              Dubai to Abu Dhabi<br />
              <span className="text-accent-400">Ride Service</span>
            </h1>
            <AnswerBlock lastUpdated={today}>
              MJ Car Lift Service offers shared and private rides between Dubai
              and Abu Dhabi. Book your seat on WhatsApp, get a fixed AED price
              before you confirm, and travel directly to your destination without
              waiting at a bus stop or paying airport-taxi rates.
            </AnswerBlock>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <a
                href={whatsappUrl(
                  BOOKING_WA_MESSAGE("Dubai to Abu Dhabi", "today", "my area")
                )}
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
                Call {site.contact.phoneFormatted}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Route Cards ──────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">Our Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {ROUTES.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.slug}`}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 hover:border-brand-500 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold mb-1">
                      Route
                    </p>
                    <p className="text-xl font-bold text-brand-900">
                      {route.from}
                    </p>
                    <p className="text-brand-600 font-medium text-sm mt-0.5">
                      → {route.to}
                    </p>
                  </div>
                  <span className="text-3xl" aria-hidden="true">🚗</span>
                </div>

                <dl className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <dt className="text-xs text-neutral-500">From (per seat)</dt>
                    <dd className="text-base font-bold text-brand-700">
                      {route.pricePerSeatAed
                        ? `AED ${route.pricePerSeatAed}`
                        : "Contact for price"}
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
                  View route details →
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
            {HOW_IT_WORKS.map((item) => (
              <li key={item.step} className="flex flex-col items-start">
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-700 text-white font-bold text-lg mb-4">
                  {item.step}
                </span>
                <h3 className="text-lg font-semibold text-brand-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Trust Block ──────────────────────────────────────────── */}
      <section className="bg-brand-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">
            Why Travellers Choose MJ Car Lift
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📋",
                title: "Licensed & Compliant",
                desc: "TODO_VERIFY_LEGAL: Licence details will be published once confirmed.",
              },
              {
                icon: "💰",
                title: "Fixed AED Price",
                desc: "Your price is agreed on WhatsApp before you travel. No surprises.",
              },
              {
                icon: "🚗",
                title: "Clean Vehicles",
                desc: "TODO_REAL_DATA: Cleaning routine to be confirmed by the owner.",
              },
              {
                icon: "👍",
                title: "Recommended on Facebook",
                desc: "Recommended by 24 people on Facebook (as of the date the page was checked). See our Facebook page for details.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-5 border border-neutral-200">
                <span className="text-3xl mb-3 block" aria-hidden="true">
                  {item.icon}
                </span>
                <h3 className="font-semibold text-brand-900 mb-2">{item.title}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing Snapshot ─────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brand-900">Pricing</h2>
            <Link
              href="/pricing"
              className="text-sm font-semibold text-brand-600 hover:underline"
            >
              Full price list →
            </Link>
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
                <tr>
                  <td className="px-5 py-3">Shared seat — Dubai ↔ Abu Dhabi</td>
                  <td className="px-5 py-3 text-end font-semibold text-brand-700">TODO_REAL_DATA</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">Private full-car — Dubai ↔ Abu Dhabi</td>
                  <td className="px-5 py-3 text-end font-semibold text-brand-700">TODO_REAL_DATA</td>
                </tr>
                <tr>
                  <td className="px-5 py-3">Airport transfer</td>
                  <td className="px-5 py-3 text-end font-semibold text-brand-700">TODO_REAL_DATA</td>
                </tr>
              </tbody>
            </table>
            <p className="px-5 py-3 text-xs text-neutral-500 bg-neutral-50">
              Prices quoted in AED. Confirm your fare on WhatsApp before travel. Salik tolls: TODO_REAL_DATA (included / not included — confirm with owner).
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section className="bg-neutral-50 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-neutral-200 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-brand-900 list-none">
                  {faq.q}
                  <span
                    className="ms-3 text-brand-600 transition-transform group-open:rotate-180 shrink-0"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="px-5 pb-4 pt-1 text-neutral-700 leading-relaxed text-sm border-t border-neutral-100">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            More questions?{" "}
            <Link href="/faq" className="text-brand-600 font-semibold hover:underline">
              See all FAQs
            </Link>{" "}
            or{" "}
            <a
              href={whatsappUrl("Hi, I have a question about MJ Car Lift Service.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 font-semibold hover:underline"
            >
              message us on WhatsApp
            </a>
            .
          </p>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="bg-brand-800 text-white py-14">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to book your ride?
          </h2>
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
              <span aria-hidden="true">💬</span>
              Book on WhatsApp
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="flex items-center justify-center gap-2 h-14 px-8 rounded-full border-2 border-white/30 hover:bg-white/10 text-white font-semibold text-base transition-colors"
            >
              <span aria-hidden="true">📞</span>
              Call {site.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

