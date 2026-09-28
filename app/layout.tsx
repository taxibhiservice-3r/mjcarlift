import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { baseMetadata } from "@/lib/seo";
import { buildLocalBusiness, buildWebSite, buildGraph } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import StickyActionBar from "@/components/layout/StickyActionBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSchema = buildGraph([buildLocalBusiness(), buildWebSite()]);

  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        {/* Site-wide JSON-LD: LocalBusiness + WebSite (always present) */}
        <JsonLd data={siteSchema} />
      </head>
      <body className="min-h-full flex flex-col has-action-bar">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyActionBar />
      </body>
    </html>
  );
}
