# STRATEGY.md — MJ Car Lift Service

**Domain:** mjcarliftservices.com
**Route:** Dubai ↔ Abu Dhabi
**Phase 0 draft** — to be refined once owner confirms compliance documents and business facts.

Last updated: 2026-09-28

---

## 1. Audience

| Segment | Description | Primary need | Device |
|---|---|---|---|
| Daily commuters | Workers living in Dubai, employed in Abu Dhabi (or vice versa) | Cheap, reliable, same-day seat | Mobile |
| Expats (South Asian) | UAE residents from India, Pakistan, Bangladesh, Philippines | Affordable route, WhatsApp booking, Urdu/Hindi/Tagalog comfort | Mobile |
| Business travelers | Professionals making one-off or regular trips | Private car option, reliable timing | Mobile / Desktop |
| Tourists | Visitors wanting a flexible, affordable intercity transfer | Clear pricing, English, how-to guidance | Mobile |
| Airport passengers | People arriving/departing AUH or DXB | Airport pickup/dropoff, luggage space | Mobile |

---

## 2. Search Intent Map (one page per primary intent; no duplicate targeting)

| Intent type | Example queries | Target page | Status |
|---|---|---|---|
| Transactional | "Dubai to Abu Dhabi ride", "book seat Dubai Abu Dhabi", "Dubai Abu Dhabi car lift" | `/routes/dubai-to-abu-dhabi` | Pending real data |
| Transactional reverse | "Abu Dhabi to Dubai ride", "car lift Abu Dhabi Dubai" | `/routes/abu-dhabi-to-dubai` | Pending real data |
| Price | "Dubai Abu Dhabi taxi price AED", "shared ride cost" | `/pricing` | Pending real data |
| Comparison/informational | "how long Dubai to Abu Dhabi", "bus vs car lift Dubai Abu Dhabi" | `/guides/dubai-to-abu-dhabi-travel-guide` | Pending |
| Legal/trust | "is car lift legal UAE", "licensed ride service Dubai" | `/guides/is-car-lift-legal-in-uae` + `/safety-and-compliance` | Pending |
| Local | "car lift from Deira to Abu Dhabi", "ride from Al Barsha to Abu Dhabi" | `/pickup-points/dubai/[area]` (quality-gated) | Pending area confirmation |
| Airport | "Dubai airport to Abu Dhabi transfer", "AUH to Dubai" | `/routes/dubai-to-abu-dhabi` + FAQ + guide | Pending |
| Brand | "MJ Car Lift Service WhatsApp", "MJ carlift reviews" | `/` + `/reviews` + `/contact` | Pending |

---

## 3. Page Inventory

| Page | URL | Template | Priority | Status |
|---|---|---|---|---|
| Home | `/` | Home (Section 5.1) | P0 | Pending |
| Route: Dubai → Abu Dhabi | `/routes/dubai-to-abu-dhabi` | Route (5.2) | P0 | Pending |
| Route: Abu Dhabi → Dubai | `/routes/abu-dhabi-to-dubai` | Route (5.2) | P0 | Pending |
| Pricing | `/pricing` | Pricing (5.4) | P0 | Pending |
| How It Works | `/how-it-works` | How-it-works | P1 | Pending |
| Safety & Compliance | `/safety-and-compliance` | Safety (5.5) | P0 | Blocked (licences) |
| Fleet | `/fleet` | Fleet | P1 | Pending real fleet data |
| Reviews | `/reviews` | Reviews | P1 | Pending real reviews |
| FAQ | `/faq` | FAQ | P1 | Pending |
| Contact | `/contact` | Contact | P0 | Pending |
| Booking | `/book` | Booking widget | P0 | Pending |
| Route hub | `/routes` | Route hub | P1 | Pending |
| Pickup hub | `/pickup-points` | Hub | P2 | Pending area data |
| Pickup area (Dubai) | `/pickup-points/dubai/[area]` | Area (5.3) | P2 | Quality-gated |
| Pickup area (Abu Dhabi) | `/pickup-points/abu-dhabi/[area]` | Area (5.3) | P2 | Quality-gated |
| Guides hub | `/guides` | Hub | P2 | Pending |
| Guide: travel options | `/guides/dubai-to-abu-dhabi-travel-guide` | Guide | P2 | Pending |
| Guide: is car lift legal | `/guides/is-car-lift-legal-in-uae` | Guide | P1 | Pending |
| Guide: how long to travel | `/guides/how-long-dubai-to-abu-dhabi` | Guide | P2 | Pending |
| Guide: price comparison | `/guides/dubai-abu-dhabi-taxi-vs-shared-ride-cost` | Guide | P2 | Pending |
| Guide: airport transfer | `/guides/dubai-abu-dhabi-airport-transfer` | Guide | P2 | Pending |
| Guide: day-trip ideas | `/guides/dubai-abu-dhabi-day-trip` | Guide | P3 | Pending |
| Privacy policy | `/legal/privacy` | Legal | P0 | Pending UAE-aligned wording |
| Terms of service | `/legal/terms` | Legal | P0 | Pending |
| Cancellation & refund | `/legal/cancellation-refund` | Legal | P0 | Pending policy |
| 404 | `/404` | Error | P0 | Built Phase 1 |
| Styleguide (noindex) | `/styleguide` | Dev | — | Phase 2 |

---

## 4. URL Map & Redirects

Existing site at `mjcarliftservices.com` is not yet inspected (owner to share content or grant access). All old URLs must be mapped to the new structure with 301 redirects. Document in `docs/REDIRECT_MAP.md` once the existing site is audited.

Canonical hostname: `https://www.mjcarliftservices.com` (confirm with owner; set ONE trailing-slash policy).

---

## 5. Schema Map

| Page / Component | Schema types | Notes |
|---|---|---|
| `app/layout.tsx` | `Organization` or `LocalBusiness` + `WebSite` | Use most specific subtype; areaServed Dubai + Abu Dhabi; telephone; sameAs GBP, Facebook |
| Home, Contact | `LocalBusiness` with `hasOfferCatalog`, `openingHoursSpecification` | Real address only if a physical location exists |
| Route pages | `Service` (`serviceType`, `areaServed`, `offers` with `priceCurrency: "AED"`) + `BreadcrumbList` | Do NOT use `TaxiService` until licensed activity is verified |
| Guides | `Article` with `author`, `datePublished`, `dateModified` | Author = real person or business entity |
| FAQ sections | `FAQPage` — visible content only | Matches visible `<details>` text exactly |
| Reviews page | NO `AggregateRating` from Facebook. Display as text: "X people recommend on Facebook (as of date)" with link | Only add `Review` markup for on-site reviews per Google guidelines |
| Pricing | `Offer` inside `Service` | Include `priceCurrency: "AED"`, `priceSpecification` |
| Safety page | `LocalBusiness` attribute block | Reference licence numbers (verified only) |
| Sitemap | All indexable pages with real `lastModified` | Never `new Date()` at build time |

---

## 6. AEO / AI Visibility Plan

### Guiding principle
AI systems (Google AI Overviews, ChatGPT Search, Perplexity, Gemini, Copilot) cite pages that are specific, trustworthy, current, well-structured and first-hand. No single markup trick guarantees citation.

### Execution checklist (applied to every page)
- [ ] Answer-first block (40–60 words) directly under H1
- [ ] Question-style H2/H3 matching natural traveller phrasing
- [ ] Short paragraphs, tables (price, timetable, comparison), numbered steps
- [ ] Specific dated facts ("prices as of Month Year")
- [ ] First-hand signals: real photos, driver notes, route observations
- [ ] Visible `Last updated` + `dateModified` in schema (real edit date only)
- [ ] Authoritative citations for regulatory claims (RTA, ITC/DMT, UAE government)
- [ ] Entity consistency: same brand name, NAP and `sameAs` across all pages
- [ ] Honest comparison content (includes alternative transport options)

### Target AI query clusters
1. "Dubai to Abu Dhabi ride/transfer/car lift" → Route page
2. "Cost of Dubai to Abu Dhabi" → Pricing page + Guide
3. "Is car lift legal in UAE" → Legal guide + Safety page
4. "How long does it take Dubai to Abu Dhabi" → Guide
5. "MJ Car Lift Service" brand queries → Home + Reviews

---

## 7. Off-site Plan (outside codebase — owner action required)

| Task | Priority | Owner action |
|---|---|---|
| Google Business Profile — create/claim, correct category, real name | P0 | Owner |
| GBP — add all real info (hours, services, areas, photos) | P0 | Owner |
| Move Facebook recommenders to Google reviews | P1 | Owner |
| Bing Places, Apple Business Connect | P2 | Owner |
| UAE business directories (Yellow Pages UAE, Dubizzle, etc.) | P2 | Owner |
| WhatsApp Business profile with correct category | P1 | Owner |
| Instagram: consistent NAP, link in bio | P2 | Owner |
| IndexNow key submission | P0 | Codebase (Phase 8) |
| Search Console + Bing Webmaster Tools verification | P0 | Codebase (Phase 8) |

---

## 8. Multilingual Strategy (deferred to Phase 5+)

Default: English. If confirmed by owner:
- Urdu (`ur`, RTL) — large South Asian commuter base
- Hindi (`hi`, LTR) — large Indian expat base
- Arabic (`ar`, RTL) — UAE national and Arab expat base
- Filipino/Tagalog (`fil`, LTR) — large Filipino expat base

Requires real human translation, RTL CSS, hreflang, and separate URL paths (`/ur/...`). Do not use machine translation for published pages.

---

*This document is a working draft. All items marked TODO require owner confirmation before implementation.*
