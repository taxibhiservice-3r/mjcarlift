import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";

export const metadata: Metadata = buildMetadata({
  title: "Safety, Compliance & Licensing — MJ Car Lift Service",
  description:
    "MJ Car Lift Service safety standards, UAE transport compliance information, vehicle standards, insurance, and driver vetting. Licence details to be published once verified.",
  path: "/safety-and-compliance",
  keywords: ["MJ Car Lift Service licensed", "UAE car lift compliance", "Dubai Abu Dhabi ride safety"],
});

export default function SafetyPage() {
  const schema = buildGraph([
    buildBreadcrumb([{ name: "Home", href: "/" }, { name: "Safety & Compliance" }]),
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
              <li aria-current="page" className="text-white">Safety & Compliance</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Safety &amp; Compliance</h1>
          <AnswerBlock>
            Transport regulations in the UAE require valid licences for paid
            passenger services. MJ Car Lift Service is in the process of
            publishing its full compliance details. This page will be updated
            once the owner has supplied verified documents.
          </AnswerBlock>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">

          {/* Licence block — gated until real data is provided */}
          <div className="bg-accent-50 border border-accent-200 rounded-2xl p-7">
            <h2 className="text-xl font-bold text-brand-900 mb-4">Licensing &amp; Permits</h2>
            <dl className="space-y-3 text-sm">
              {[
                ["Trade Licence", "TODO_VERIFY_LEGAL — owner supplying documents"],
                ["Transport Operator Permit (RTA Dubai / ITC Abu Dhabi)", "TODO_VERIFY_LEGAL — owner supplying documents"],
                ["Vehicle Registration", "TODO_REAL_DATA"],
                ["Commercial Passenger Insurance", "TODO_REAL_DATA"],
                ["Driver Permit / Professional Licence", "TODO_REAL_DATA"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-start gap-1">
                  <dt className="font-semibold text-neutral-700 sm:w-72 shrink-0">{label}:</dt>
                  <dd className="text-neutral-600">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-neutral-500 mt-4">
              UAE transport regulations require licensed operators for paid
              passenger services. Relevant regulations are published by{" "}
              <a
                href="https://www.rta.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                RTA Dubai
              </a>{" "}
              and the{" "}
              <a
                href="https://www.itc.gov.ae"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 hover:underline"
              >
                Integrated Transport Centre (ITC) Abu Dhabi
              </a>
              .
            </p>
          </div>

          {/* Vehicle standards */}
          <div>
            <h2 className="text-xl font-bold text-brand-900 mb-4">Vehicle Standards</h2>
            <ul className="space-y-2 text-sm text-neutral-700">
              {[
                "Air-conditioned vehicles on all trips",
                "Seat belts available for all passengers",
                "TODO_REAL_DATA: Cleaning routine — frequency and method to be confirmed",
                "TODO_REAL_DATA: Vehicle make, model, year to be confirmed",
                "TODO_REAL_DATA: Child seat availability to be confirmed",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-600 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Driver standards */}
          <div>
            <h2 className="text-xl font-bold text-brand-900 mb-4">Driver Standards</h2>
            <ul className="space-y-2 text-sm text-neutral-700">
              {[
                "TODO_REAL_DATA: Professional/commercial driving licence details",
                "TODO_REAL_DATA: Background check / vetting process",
                "TODO_REAL_DATA: Languages spoken",
                "TODO_REAL_DATA: Experience on Dubai–Abu Dhabi route",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-brand-600 mt-0.5 shrink-0" aria-hidden="true">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Incident & complaints */}
          <div>
            <h2 className="text-xl font-bold text-brand-900 mb-4">Complaints &amp; Incidents</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              TODO_REAL_DATA: If you have a concern about a trip, please
              contact us directly on WhatsApp or by phone. A formal incident and
              complaint process will be published once confirmed by the owner.
            </p>
          </div>

          {/* Data / privacy */}
          <div>
            <h2 className="text-xl font-bold text-brand-900 mb-4">Your Personal Data</h2>
            <p className="text-neutral-600 text-sm leading-relaxed">
              We collect only the information needed to complete your booking
              (name, WhatsApp number, travel date). See our{" "}
              <Link href="/legal/privacy" className="text-brand-600 hover:underline">
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
