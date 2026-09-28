import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// ── sitemap.ts ────────────────────────────────────────────────────────────────
// Rules:
//   • lastModified = real date of last meaningful content change (NOT new Date())
//   • priority = 1.0 for home, 0.95 for money pages, descending from there
//   • noindex pages (legal, thank-you, styleguide) are excluded
// ─────────────────────────────────────────────────────────────────────────────

// Update this date whenever significant content changes are deployed
const LAST_UPDATED = "2026-09-28";

type SitemapEntry = MetadataRoute.Sitemap[number];

function url(
  path: string,
  opts: {
    priority: number;
    changeFreq?: SitemapEntry["changeFrequency"];
    lastMod?: string;
  }
): SitemapEntry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: opts.lastMod ?? LAST_UPDATED,
    priority: opts.priority,
    changeFrequency: opts.changeFreq ?? "monthly",
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Tier 1: Money pages ───────────────────────────────────────────────
    url("/", { priority: 1.0, changeFreq: "weekly" }),
    url("/routes/dubai-to-abu-dhabi", { priority: 0.98, changeFreq: "weekly" }),
    url("/routes/abu-dhabi-to-dubai", { priority: 0.98, changeFreq: "weekly" }),
    url("/pricing", { priority: 0.95, changeFreq: "weekly" }),
    url("/book", { priority: 0.95, changeFreq: "weekly" }),

    // ── Tier 2: Trust & informational ────────────────────────────────────
    url("/safety-and-compliance", { priority: 0.85, changeFreq: "monthly" }),
    url("/how-it-works", { priority: 0.80, changeFreq: "monthly" }),
    url("/fleet", { priority: 0.75, changeFreq: "monthly" }),
    url("/faq", { priority: 0.80, changeFreq: "monthly" }),
    url("/reviews", { priority: 0.75, changeFreq: "weekly" }),

    // ── Tier 3: Navigation hubs ───────────────────────────────────────────
    url("/routes", { priority: 0.80, changeFreq: "monthly" }),
    url("/contact", { priority: 0.75, changeFreq: "monthly" }),

    // ── Tier 4: Guides (AEO / AI citation magnets) ───────────────────────
    url("/guides", { priority: 0.70, changeFreq: "monthly" }),
    url("/guides/dubai-to-abu-dhabi-travel-guide", { priority: 0.70, changeFreq: "monthly" }),
    url("/guides/is-car-lift-legal-in-uae", { priority: 0.70, changeFreq: "monthly" }),
    url("/guides/how-long-dubai-to-abu-dhabi", { priority: 0.68, changeFreq: "monthly" }),
    url("/guides/dubai-abu-dhabi-taxi-vs-shared-ride-cost", { priority: 0.68, changeFreq: "monthly" }),
    url("/guides/dubai-abu-dhabi-airport-transfer", { priority: 0.68, changeFreq: "monthly" }),
  ];
}
