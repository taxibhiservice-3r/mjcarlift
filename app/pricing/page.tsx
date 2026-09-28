import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { whatsappUrl, DEFAULT_WA_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dubai to Abu Dhabi Ride Price in AED",
  description:
    "Transparent AED pricing for Dubai to Abu Dhabi shared seats, private car hire, and airport transfers. Fixed fare confirmed on WhatsApp before you travel — no hidden charges.",
  path: "/pricing",
  keywords: [
    "Dubai Abu Dhabi price",
    "Dubai to Abu Dhabi taxi price",
    "car lift Dubai Abu Dhabi AED",
    "Dubai Abu Dhabi ride cost",
  ],
});

export default function PricingPage() {
  const schema = buildGraph([
    buildBreadcrumb([
      { name: "Home", href: "/" },
      { name: "Pricing" },
    ]),
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
              <li aria-current="page" className="text-white">Pricing</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Dubai to Abu Dhabi — Pricing in AED</h1>
          <AnswerBlock lastUpdated="September 2026">
            All prices are quoted in UAE Dirhams (AED) and confirmed on WhatsApp
            before your trip. There are no hidden charges — what we quote is what
            you pay. Prices below will be updated once confirmed by the owner.
          </AnswerBlock>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

          {/* Main pricing table */}
          <h2 className="text-xl font-bold text-brand-900 mb-5">Fare Table</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-3">
            <table className="w-full text-sm">
              <caption className="sr-only">MJ Car Lift Service pricing in AED</caption>
              <thead className="bg-brand-800 text-white">
                <tr>
                  <th scope="col" className="px-5 py-3 text-start font-semibold">Service</th>
                  <th scope="col" className="px-5 py-3 text-start font-semibold">Route</th>
                  <th scope="col" className="px-5 py-3 text-end font-semibold">Price (AED)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["Shared seat", "Dubai → Abu Dhabi", "TODO_REAL_DATA"],
                  ["Shared seat", "Abu Dhabi → Dubai", "TODO_REAL_DATA"],
                  ["Private full car", "Dubai ↔ Abu Dhabi", "TODO_REAL_DATA"],
                  ["Airport transfer", "DXB ↔ Abu Dhabi", "TODO_REAL_DATA"],
                  ["Airport transfer", "AUH ↔ Dubai", "TODO_REAL_DATA"],
                ].map(([service, route, price]) => (
                  <tr key={`${service}-${route}`}>
                    <td className="px-5 py-3 font-medium text-neutral-800">{service}</td>
                    <td className="px-5 py-3 text-neutral-600">{route}</td>
                    <td className="px-5 py-3 text-end font-bold text-brand-700">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-neutral-500 mb-10">
            Prices in AED. Last updated: September 2026. Subject to change — confirm on WhatsApp before booking.
          </p>

          {/* Surcharges */}
          <h2 className="text-xl font-bold text-brand-900 mb-5">Additional Charges</h2>
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden mb-10">
            <table className="w-full text-sm">
              <caption className="sr-only">Additional charges and surcharges</caption>
              <tbody className="divide-y divide-neutral-100">
                {[
                  ["Salik road tolls", "TODO_REAL_DATA: Included / +AED X"],
                  ["Night surcharge (after 10 pm)", "TODO_REAL_DATA"],
                  ["Extra luggage", "TODO_REAL_DATA"],
                  ["Child seat", "TODO_REAL_DATA"],
                ].map(([item, value]) => (
                  <tr key={item}>
                    <th scope="row" className="px-5 py-3 text-start font-semibold text-neutral-700 w-1/2 bg-neutral-50">{item}</th>
                    <td className="px-5 py-3 text-neutral-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* What is included */}
          <h2 className="text-xl font-bold text-brand-900 mb-5">What Is Included in the Price</h2>
          <ul className="space-y-2 mb-10">
            {[
              "Fixed AED fare — agreed on WhatsApp before you confirm",
              "Direct door-to-destination ride (no unnecessary stops)",
              "Air-conditioned vehicle",
              "TODO_REAL_DATA: Salik — confirm with owner",
              "TODO_REAL_DATA: Luggage allowance — confirm with owner",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-neutral-700 text-sm">
                <span className="text-brand-600 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>

          {/* Payment methods */}
          <h2 className="text-xl font-bold text-brand-900 mb-5">Payment Methods</h2>
          <p className="text-neutral-600 text-sm mb-2">
            TODO_REAL_DATA: Confirm accepted payment methods with the owner
            (e.g. cash in AED, bank transfer, etc.).
          </p>

          {/* Cancellation */}
          <h2 className="text-xl font-bold text-brand-900 mb-5 mt-8">Cancellation & Refund Policy</h2>
          <p className="text-neutral-600 text-sm mb-10">
            TODO_REAL_DATA: Cancellation and refund policy to be confirmed by the owner.
            See <Link href="/legal/cancellation-refund" className="text-brand-600 hover:underline">Cancellation & Refund page</Link> once updated.
          </p>

          {/* CTA */}
          <div className="bg-brand-50 rounded-2xl p-7 text-center">
            <p className="text-lg font-semibold text-brand-900 mb-2">Ready to get your fixed price?</p>
            <p className="text-neutral-600 text-sm mb-5">
              Send us a WhatsApp message with your route and date. We&apos;ll confirm your AED fare within minutes.
            </p>
            <a
              href={whatsappUrl(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors"
            >
              <span aria-hidden="true">💬</span>
              Get price on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
