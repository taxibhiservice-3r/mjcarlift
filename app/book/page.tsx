import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import { ROUTES, site, whatsappUrl, bookingWaMessage } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Book a Dubai Abu Dhabi Ride on WhatsApp",
  description:
    "Book your Dubai to Abu Dhabi or Abu Dhabi to Dubai ride with MJ Car Lift Service. Choose your route and date — we confirm your fixed AED price on WhatsApp instantly.",
  path: "/book",
  keywords: ["book Dubai Abu Dhabi ride", "car lift booking", "Dubai Abu Dhabi WhatsApp booking"],
});

export default function BookPage() {
  const schema = buildGraph([
    buildBreadcrumb([{ name: "Home", href: "/" }, { name: "Book a Ride" }]),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-brand-800 text-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-300 mb-4">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-white">Book a Ride</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">Book a Ride</h1>
          <p className="text-brand-200 leading-relaxed">
            Choose your route below and tap to open WhatsApp with a pre-filled
            booking message. We confirm your fixed AED price and pickup time
            before you travel.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

          <h2 className="text-xl font-bold text-brand-900 mb-6">Select Your Route</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {ROUTES.map((route) => (
              <a
                key={route.id}
                href={whatsappUrl(bookingWaMessage(route.label, "today", "my area"))}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start bg-white border border-neutral-200 rounded-2xl p-6 hover:border-brand-500 hover:shadow-md transition-all"
              >
                <span className="text-2xl mb-3" aria-hidden="true">🚗</span>
                <p className="font-bold text-brand-900 text-lg">{route.from}</p>
                <p className="text-brand-600 font-medium mb-4">→ {route.to}</p>
                <span className="mt-auto flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-700 group-hover:bg-brand-800 text-white font-semibold text-sm transition-colors">
                  <span aria-hidden="true">💬</span>
                  Book on WhatsApp
                </span>
              </a>
            ))}
          </div>

          {/* What happens next */}
          <div className="bg-brand-50 rounded-2xl p-7">
            <h2 className="font-bold text-brand-900 mb-4">What happens after you tap?</h2>
            <ol className="space-y-3 text-sm text-neutral-700">
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white font-bold text-xs shrink-0">1</span>
                WhatsApp opens with a pre-filled message including your route.
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white font-bold text-xs shrink-0">2</span>
                Add your preferred date, pickup area, and number of passengers, then send.
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-700 text-white font-bold text-xs shrink-0">3</span>
                We confirm your fixed AED price and exact pickup details.
              </li>
            </ol>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-600 text-sm mb-4">
              Prefer to call instead?
            </p>
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-brand-700 text-brand-700 hover:bg-brand-50 font-semibold transition-colors"
            >
              <span aria-hidden="true">📞</span>
              {site.contact.phoneFormatted}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
