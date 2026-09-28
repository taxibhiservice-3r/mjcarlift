import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { buildBreadcrumb, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import AnswerBlock from "@/components/ui/AnswerBlock";
import { whatsappUrl, DEFAULT_WA_MESSAGE } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "How to Book a Dubai Abu Dhabi Ride",
  description:
    "Three simple steps to book your Dubai to Abu Dhabi ride with MJ Car Lift Service: message on WhatsApp, confirm your fixed AED price, then travel.",
  path: "/how-it-works",
  keywords: ["how to book Dubai Abu Dhabi ride", "car lift booking process Dubai"],
});

const STEPS = [
  {
    step: "1",
    title: "Message us on WhatsApp",
    detail:
      "Send a WhatsApp message to +971 56 228 6455. Include your route (Dubai → Abu Dhabi or Abu Dhabi → Dubai), your preferred date, your pickup area, and how many passengers.",
  },
  {
    step: "2",
    title: "Confirm your price and pickup",
    detail:
      "We reply with your fixed AED price, the exact pickup time, and the meeting point. No surprises. If you are happy, confirm and your seat is reserved. TODO_REAL_DATA: Confirm deposit policy.",
  },
  {
    step: "3",
    title: "Travel comfortably",
    detail:
      "Meet your driver at the agreed time and place. Sit back and travel directly to your destination in a clean, air-conditioned vehicle.",
  },
];

export default function HowItWorksPage() {
  const schema = buildGraph([
    buildBreadcrumb([{ name: "Home", href: "/" }, { name: "How It Works" }]),
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
              <li aria-current="page" className="text-white">How It Works</li>
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h1>
          <AnswerBlock>
            Booking with MJ Car Lift Service takes three steps: send a WhatsApp
            message, receive your fixed AED price, then travel. No app required,
            no meter uncertainty, no hidden charges.
          </AnswerBlock>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ol className="relative border-s border-brand-200 ms-6 space-y-10">
            {STEPS.map((item) => (
              <li key={item.step} className="ms-8">
                <span className="absolute -start-4 flex items-center justify-center w-8 h-8 rounded-full bg-brand-700 text-white font-bold text-sm ring-4 ring-white">
                  {item.step}
                </span>
                <h2 className="text-xl font-bold text-brand-900 mb-2">{item.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{item.detail}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 bg-brand-50 rounded-2xl p-8 text-center">
            <p className="text-xl font-bold text-brand-900 mb-3">Ready to book your ride?</p>
            <a
              href={whatsappUrl(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-bold transition-colors"
            >
              <span aria-hidden="true">💬</span>
              Start on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
