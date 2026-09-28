import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { ROUTES, whatsappUrl, DEFAULT_WA_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dubai Abu Dhabi Ride Service Routes",
  description:
    "MJ Car Lift Service operates between Dubai and Abu Dhabi. View all available routes, departure areas, pricing in AED, and book your seat on WhatsApp.",
  path: "/routes",
  keywords: ["Dubai Abu Dhabi route", "car lift Dubai", "Abu Dhabi ride service"],
});

export default function RoutesPage() {
  const schema = buildGraph([
    buildBreadcrumb([
      { name: "Home", href: "/" },
      { name: "Routes" },
    ]),
  ]);

  return (
    <>
      <JsonLd data={schema} />

      <section className="bg-brand-800 text-white py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-300 mb-4">
            <ol className="flex items-center gap-2">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="text-white">Routes</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Our Routes</h1>
          <AnswerBlock lastUpdated="September 2026">
            MJ Car Lift Service runs between Dubai and Abu Dhabi in both directions.
            Choose your route below, check pickup areas and pricing, and book a
            seat directly on WhatsApp with a fixed AED price.
          </AnswerBlock>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {ROUTES.map((route) => (
              <Link
                key={route.id}
                href={`/routes/${route.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-200 p-7 hover:border-brand-500 hover:shadow-lg transition-all"
              >
                <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold mb-2">
                  Route
                </p>
                <h2 className="text-2xl font-bold text-brand-900 mb-1">{route.from}</h2>
                <p className="text-brand-600 font-semibold text-base mb-5">→ {route.to}</p>

                <dl className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <dt className="text-xs text-neutral-500 mb-0.5">Per seat (AED)</dt>
                    <dd className="font-bold text-brand-700">
                      {route.pricePerSeatAed ?? "Contact us"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-neutral-500 mb-0.5">Duration</dt>
                    <dd className="font-semibold text-neutral-800">
                      {route.durationMin && route.durationMax
                        ? `${route.durationMin}–${route.durationMax} min`
                        : "Traffic dependent"}
                    </dd>
                  </div>
                </dl>

                <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-600 group-hover:underline">
                  View details & book →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-brand-50 rounded-2xl p-7 text-center">
            <p className="text-lg font-semibold text-brand-900 mb-3">
              Not sure which route you need?
            </p>
            <a
              href={whatsappUrl(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors"
            >
              <span aria-hidden="true">💬</span>
              Ask us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
