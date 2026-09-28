import { z } from "zod";

// ---------------------------------------------------------------------------
// Single source of truth — all business data lives here.
// TODO_REAL_DATA = owner must supply before publishing.
// TODO_VERIFY_LEGAL = requires licence/permit confirmation.
// ---------------------------------------------------------------------------

export const SITE_URL = "https://www.mjcarliftservice.com";
export const SITE_DOMAIN = "mjcarliftservice.com";

// GSC verification token — get from Google Search Console → HTML tag method
export const GSC_VERIFICATION = "0LW83nar3M5Ss6TYaUG2F5v4dsii4BqosTjpcMrR1e8";

// IndexNow key — must also exist at /[key].txt (see public/ folder)
export const INDEXNOW_KEY = "6f8a2e4c1b5d3f9e7a2c4b6d8e0f2a4c";

// ---------------------------------------------------------------------------
// Zod schema
// ---------------------------------------------------------------------------
const SiteSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string().url(),
  domain: z.string(),
  locale: z.string(),
  contact: z.object({
    phone: z.string(),
    whatsapp: z.string(),
    email: z.string(),
    phoneFormatted: z.string(),
  }),
  address: z.object({
    streetAddress: z.string().nullable(),
    addressLocality: z.string(),
    addressRegion: z.string(),
    addressCountry: z.string(),
    postalCode: z.string().nullable(),
  }),
  openingHours: z.array(z.string()),
  social: z.object({
    facebook: z.string().url(),
    instagram: z.string().nullable(),
    whatsapp: z.string().url(),
  }),
  currency: z.literal("AED"),
});

export const site = SiteSchema.parse({
  name: "MJ Car Lift Service",
  legalName: "MJ Car Lift Service", // TODO_REAL_DATA: exact registered trade name
  tagline: "Dubai to Abu Dhabi ride service with fixed prices and WhatsApp booking",
  description:
    "MJ Car Lift Service offers shared and private rides between Dubai and Abu Dhabi. " +
    "Book your seat on WhatsApp with a fixed AED price — confirmed before you travel.",
  url: SITE_URL,
  domain: SITE_DOMAIN,
  locale: "en_AE",
  contact: {
    phone: "+971562286455",
    whatsapp: "+971562286455",
    email: "TODO_REAL_DATA@mjcarliftservice.com", // TODO_REAL_DATA
    phoneFormatted: "+971 56 228 6455",
  },
  address: {
    streetAddress: null, // TODO_REAL_DATA: office address or null for service-area only
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
    postalCode: null,
  },
  openingHours: ["Mo-Su 00:00-00:00"], // TODO_REAL_DATA: confirm actual hours
  social: {
    facebook:
      "https://www.facebook.com/people/MJ-carlift-service-Dubai-to-Abu-dhabi-to-Dubai-0562286455/61560187134404/",
    instagram: null, // TODO_REAL_DATA
    whatsapp: "https://wa.me/971562286455",
  },
  currency: "AED",
});

// ---------------------------------------------------------------------------
// Routes data
// ---------------------------------------------------------------------------
export const ROUTES = [
  {
    id: "dubai-to-abu-dhabi",
    slug: "dubai-to-abu-dhabi",
    from: "Dubai",
    to: "Abu Dhabi",
    label: "Dubai to Abu Dhabi",
    shortLabel: "Dubai → Abu Dhabi",
    pricePerSeatAed: null as number | null, // TODO_REAL_DATA
    pricePrivateCarAed: null as number | null, // TODO_REAL_DATA
    durationMin: null as number | null, // TODO_REAL_DATA (minutes)
    durationMax: null as number | null, // TODO_REAL_DATA
    departureTimes: [] as string[], // TODO_REAL_DATA e.g. ["07:00","09:00","17:00"]
    h1: "Dubai to Abu Dhabi Ride Service",
    metaTitle: "Dubai to Abu Dhabi Ride Service | MJ Car Lift Service",
    metaDescription:
      "Book a shared seat or private car from Dubai to Abu Dhabi. Fixed AED price confirmed on WhatsApp before you travel. Daily departures from multiple Dubai areas.",
  },
  {
    id: "abu-dhabi-to-dubai",
    slug: "abu-dhabi-to-dubai",
    from: "Abu Dhabi",
    to: "Dubai",
    label: "Abu Dhabi to Dubai",
    shortLabel: "Abu Dhabi → Dubai",
    pricePerSeatAed: null as number | null,
    pricePrivateCarAed: null as number | null,
    durationMin: null as number | null,
    durationMax: null as number | null,
    departureTimes: [] as string[],
    h1: "Abu Dhabi to Dubai Ride Service",
    metaTitle: "Abu Dhabi to Dubai Ride Service | MJ Car Lift Service",
    metaDescription:
      "Book a shared seat or private car from Abu Dhabi to Dubai. Fixed AED price confirmed on WhatsApp. Daily departures from multiple Abu Dhabi areas.",
  },
] as const;

// ---------------------------------------------------------------------------
// FAQs — shared across pages
// ---------------------------------------------------------------------------
export const GLOBAL_FAQS = [
  {
    q: "How do I book a seat with MJ Car Lift Service?",
    a: "Send a WhatsApp message to +971 56 228 6455 with your route, preferred date, pickup area, and number of passengers. We will confirm availability and your fixed AED price before the trip.",
  },
  {
    q: "What is the price for a seat from Dubai to Abu Dhabi?",
    a: "TODO_REAL_DATA: Prices are quoted in AED and confirmed on WhatsApp before travel. Message us for the current fare.",
  },
  {
    q: "Do you offer private full-car hire?",
    a: "TODO_REAL_DATA: Contact us on WhatsApp to ask about private full-car hire options and pricing.",
  },
  {
    q: "Are Salik (road tolls) included in the price?",
    a: "TODO_REAL_DATA: Whether Salik is included will be confirmed when we quote your fare. Ask us when you book.",
  },
  {
    q: "Which areas in Dubai do you pick up from?",
    a: "TODO_REAL_DATA: We serve multiple areas across Dubai. Send us your pickup area on WhatsApp and we will confirm availability.",
  },
  {
    q: "How long does the Dubai to Abu Dhabi journey take?",
    a: "TODO_REAL_DATA: Journey time varies with traffic. Typical E11/Sheikh Zayed Road journeys range from around 60 to 120 minutes depending on time of day. We will give you a realistic estimate when you book.",
  },
  {
    q: "Can I book a same-day ride?",
    a: "TODO_REAL_DATA: Confirm same-day booking availability with the owner.",
  },
  {
    q: "Is MJ Car Lift Service licensed to operate in the UAE?",
    a: "TODO_VERIFY_LEGAL: Licence and permit details are being verified. This answer will be updated once the owner has supplied the relevant documents.",
  },
] as const;

// ---------------------------------------------------------------------------
// WhatsApp helpers
// ---------------------------------------------------------------------------
export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.contact.phone.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hi MJ Car Lift Service, I'd like to book a seat. Please send me the details and price.";

export function bookingWaMessage(route: string, date: string, area: string) {
  return `Hi MJ Car Lift Service, I'd like to book a seat on the ${route} route on ${date} from ${area}. Please confirm availability and price in AED.`;
}

// ---------------------------------------------------------------------------
// Canonical URL builder
// ---------------------------------------------------------------------------
export function canonicalUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
