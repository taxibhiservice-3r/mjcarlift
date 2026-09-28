import { site, SITE_URL, canonicalUrl } from "@/lib/site";

// ---------------------------------------------------------------------------
// JSON-LD @graph schema builders
// All IDs use fragment identifiers (#) for stable, de-duplicatable entities.
// Never add AggregateRating from 3rd-party platforms (per Google guidelines).
// ---------------------------------------------------------------------------

// ── 1. LocalBusiness ────────────────────────────────────────────────────────
export function buildLocalBusiness() {
  const sameAs: string[] = [site.social.facebook];
  if (site.social.instagram) sameAs.push(site.social.instagram);

  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/logo.png`, // TODO_REAL_DATA: real logo file
      width: 200,
      height: 60,
      caption: site.name,
    },
    image: `${SITE_URL}/logo.png`,
    telephone: site.contact.phone,
    areaServed: [
      { "@type": "City", name: "Dubai" },
      { "@type": "City", name: "Abu Dhabi" },
    ],
    ...(site.address.streetAddress
      ? {
          address: {
            "@type": "PostalAddress",
            streetAddress: site.address.streetAddress,
            addressLocality: site.address.addressLocality,
            addressRegion: site.address.addressRegion,
            addressCountry: site.address.addressCountry,
          },
        }
      : {}),
    openingHoursSpecification: site.openingHours.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: parseDays(spec),
      opens: parseHours(spec).opens,
      closes: parseHours(spec).closes,
    })),
    sameAs,
  };
}

// ── 2. WebSite ───────────────────────────────────────────────────────────────
export function buildWebSite() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: site.name,
    url: SITE_URL,
    description: site.description,
    publisher: { "@id": `${SITE_URL}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
  };
}

// ── 3. Service ───────────────────────────────────────────────────────────────
export function buildService(opts: {
  name: string;
  description: string;
  path: string;
  fromCity: string;
  toCity: string;
  priceAed?: number | null;
}) {
  return {
    "@type": "Service",
    "@id": `${canonicalUrl(opts.path)}#service`,
    name: opts.name,
    description: opts.description,
    provider: { "@id": `${SITE_URL}/#business` },
    serviceType: "Ride Service",
    areaServed: [
      { "@type": "City", name: opts.fromCity },
      { "@type": "City", name: opts.toCity },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "AED",
      ...(opts.priceAed != null
        ? { price: String(opts.priceAed) }
        : {}),
      availability: "https://schema.org/InStock",
      url: canonicalUrl(opts.path),
    },
  };
}

// ── 4. BreadcrumbList ────────────────────────────────────────────────────────
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function buildBreadcrumb(items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: canonicalUrl(item.href) } : {}),
    })),
  };
}

// ── 5. FAQPage ───────────────────────────────────────────────────────────────
export function buildFAQPage(faqs: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ── 6. Article ───────────────────────────────────────────────────────────────
export function buildArticle(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  imageUrl?: string;
}) {
  return {
    "@type": "Article",
    "@id": `${canonicalUrl(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: canonicalUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@id": `${SITE_URL}/#business` },
    publisher: { "@id": `${SITE_URL}/#business` },
    inLanguage: "en",
    ...(opts.imageUrl ? { image: opts.imageUrl } : {}),
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

// ── 7. @graph wrapper ────────────────────────────────────────────────────────
export function buildGraph(nodes: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function parseDays(spec: string): string[] {
  const dayMap: Record<string, string> = {
    Mo: "Monday", Tu: "Tuesday", We: "Wednesday",
    Th: "Thursday", Fr: "Friday", Sa: "Saturday", Su: "Sunday",
  };
  const [dayPart] = spec.split(" ");
  if (dayPart.includes("-")) {
    const [start, end] = dayPart.split("-");
    const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    const si = order.indexOf(start);
    const ei = order.indexOf(end);
    return order.slice(si, ei + 1).map((d) => dayMap[d]);
  }
  return [dayMap[dayPart] ?? dayPart];
}

function parseHours(spec: string) {
  const parts = spec.split(" ");
  const timePart = parts[1] ?? "00:00-00:00";
  const [opens, closes] = timePart.split("-");
  return { opens: opens ?? "00:00", closes: closes ?? "00:00" };
}
