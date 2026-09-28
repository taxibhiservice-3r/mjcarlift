import type { Metadata } from "next";
import { site, canonicalUrl, GSC_VERIFICATION } from "@/lib/site";

// ---------------------------------------------------------------------------
// Centralized metadata factory — guarantees every page has:
//   • unique title (50–60 chars target)
//   • unique description (140–155 chars target)
//   • absolute canonical
//   • Open Graph + Twitter card
//   • robots directive
// ---------------------------------------------------------------------------

export interface PageSeoConfig {
  title: string;         // raw title, template " | MJ Car Lift Service" appended automatically
  description: string;
  path: string;          // e.g. "/routes/dubai-to-abu-dhabi"
  noindex?: boolean;
  ogImage?: string;      // absolute URL; falls back to /opengraph-image
  ogType?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
}

export function buildMetadata(config: PageSeoConfig): Metadata {
  const canonical = canonicalUrl(config.path);
  const ogImg = config.ogImage ?? `${site.url}/opengraph-image`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title: `${config.title} | ${site.name}`,
      description: config.description,
      url: canonical,
      siteName: site.name,
      type: config.ogType ?? "website",
      locale: "en_AE",
      images: [
        {
          url: ogImg,
          width: 1200,
          height: 630,
          alt: `${config.title} | ${site.name}`,
        },
      ],
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${config.title} | ${site.name}`,
      description: config.description,
      images: [ogImg],
    },
    robots: config.noindex
      ? { index: false, follow: true }
      : { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    verification: {
      google: GSC_VERIFICATION,
    },
    other: {
      // IndexNow discovery
      "indexnow-url": `${site.url}/6f8a2e4c1b5d3f9e7a2c4b6d8e0f2a4c.txt`,
    },
  };
}

// ---------------------------------------------------------------------------
// Site-wide base metadata (used in layout.tsx)
// ---------------------------------------------------------------------------
export const baseMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `Dubai to Abu Dhabi Ride Service | ${site.name}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_AE",
  },
  twitter: { card: "summary_large_image" },
  verification: {
    google: GSC_VERIFICATION,
  },
  alternates: {
    canonical: site.url,
  },
};
