import type { MetadataRoute } from "next";
import { site, ROUTES } from "@/lib/site";

// Use a fixed build date — never new Date() which changes every build
const SITE_UPDATED = "2026-09-28";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: SITE_UPDATED, priority: 1.0, changeFrequency: "weekly" },
    { url: `${base}/pricing`, lastModified: SITE_UPDATED, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/routes`, lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "weekly" },
    { url: `${base}/how-it-works`, lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/safety-and-compliance`, lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/fleet`, lastModified: SITE_UPDATED, priority: 0.6, changeFrequency: "monthly" },
    { url: `${base}/reviews`, lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "weekly" },
    { url: `${base}/faq`, lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "monthly" },
    { url: `${base}/contact`, lastModified: SITE_UPDATED, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}/book`, lastModified: SITE_UPDATED, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}/guides`, lastModified: SITE_UPDATED, priority: 0.7, changeFrequency: "weekly" },
  ];

  const routePages: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${base}/routes/${route.slug}`,
    lastModified: SITE_UPDATED,
    priority: 0.95,
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...routePages];
}
