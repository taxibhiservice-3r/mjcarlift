import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildFAQPage, buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { GLOBAL_FAQS, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Dubai Abu Dhabi Ride Service — FAQ",
  description:
    "Frequently asked questions about MJ Car Lift Service. Booking process, AED pricing, pickup areas, journey time, safety, and cancellation policy.",
  path: "/faq",
  keywords: ["Dubai Abu Dhabi car lift FAQ", "MJ Car Lift Service questions"],
});

export default function FAQPage() {
  const schema = buildGraph([
    buildFAQPage(GLOBAL_FAQS),
    buildBreadcrumb([{ name: "Home", href: "/" }, { name: "FAQ" }]),
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
              <li aria-current="page" className="text-white">FAQ</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <AnswerBlock>
            Answers to the most common questions about booking a Dubai to Abu
            Dhabi ride with MJ Car Lift Service — pricing, pickup areas,
            journey time, and how WhatsApp booking works.
          </AnswerBlock>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {GLOBAL_FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-xl border border-neutral-200"
              >
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

          <div className="mt-10 bg-brand-50 rounded-2xl p-7 text-center">
            <p className="font-semibold text-brand-900 mb-3">
              Still have a question?
            </p>
            <a
              href={whatsappUrl("Hi, I have a question about MJ Car Lift Service.")}
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
