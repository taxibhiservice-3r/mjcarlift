import type { Metadata } from "next";
import Link from "next/link";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <p className="text-6xl font-bold text-brand-700 mb-4">404</p>
      <h1 className="text-2xl font-bold text-brand-900 mb-3">Page not found</h1>
      <p className="text-neutral-600 max-w-sm mb-8">
        Sorry, we couldn&apos;t find that page. Try one of the links below or
        contact us directly on WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-brand-700 hover:bg-brand-800 text-white font-semibold transition-colors"
        >
          Go to home
        </Link>
        <a
          href={whatsappUrl("Hi, I need help finding information on your site.")}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 rounded-full border-2 border-brand-700 text-brand-700 hover:bg-brand-50 font-semibold transition-colors"
        >
          Message us on WhatsApp
        </a>
      </div>
    </div>
  );
}
