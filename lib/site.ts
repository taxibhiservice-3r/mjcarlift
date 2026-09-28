import { z } from "zod";

// ---------------------------------------------------------------------------
// Single source of truth for all business data.
// Fields marked TODO_REAL_DATA must be replaced by the owner before publishing.
// Fields marked TODO_VERIFY_LEGAL require licence/permit confirmation first.
// ---------------------------------------------------------------------------

const ContactSchema = z.object({
  phone: z.string(),
  whatsapp: z.string(),
  email: z.string(),
  phoneFormatted: z.string(),
});

const BusinessSchema = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  description: z.string(),
  url: z.string().url(),
  domain: z.string(),
  locale: z.string(),
  contact: ContactSchema,
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

const rawSiteData = {
  name: "MJ Car Lift Service",
  // TODO_REAL_DATA: Replace with exact registered trade name
  legalName: "MJ Car Lift Service",
  tagline: "Dubai to Abu Dhabi ride service with fixed prices and WhatsApp booking",
  description:
    "MJ Car Lift Service offers shared and private rides between Dubai and Abu Dhabi. " +
    "Book your seat on WhatsApp with a fixed AED price before you confirm.",
  url: "https://www.mjcarliftservices.com",
  domain: "mjcarliftservices.com",
  locale: "en",
  contact: {
    phone: "+971562286455",
    whatsapp: "+971562286455",
    email: "TODO_REAL_DATA@mjcarliftservices.com", // TODO_REAL_DATA
    phoneFormatted: "+971 56 228 6455",
  },
  address: {
    streetAddress: null, // TODO_REAL_DATA: office address or null if service-area only
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
    postalCode: null,
  },
  // TODO_REAL_DATA: Confirm actual operating hours
  openingHours: ["Mo-Su 00:00-00:00"],
  social: {
    facebook:
      "https://www.facebook.com/people/MJ-carlift-service-Dubai-to-Abu-dhabi-to-Dubai-0562286455/61560187134404/",
    instagram: null, // TODO_REAL_DATA
    whatsapp: "https://wa.me/971562286455",
  },
  currency: "AED" as const,
};

export const site = BusinessSchema.parse(rawSiteData);

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

export const ROUTES = [
  {
    id: "dubai-to-abu-dhabi",
    slug: "dubai-to-abu-dhabi",
    from: "Dubai",
    to: "Abu Dhabi",
    label: "Dubai → Abu Dhabi",
    // TODO_REAL_DATA: Confirm price, duration, and departure times
    pricePerSeatAed: null as number | null,
    pricePrivateCarAed: null as number | null,
    durationMin: null as number | null, // TODO_REAL_DATA
    durationMax: null as number | null, // TODO_REAL_DATA
    departureTimes: [] as string[], // TODO_REAL_DATA: e.g. ["07:00", "09:00", "17:00"]
  },
  {
    id: "abu-dhabi-to-dubai",
    slug: "abu-dhabi-to-dubai",
    from: "Abu Dhabi",
    to: "Dubai",
    label: "Abu Dhabi → Dubai",
    pricePerSeatAed: null as number | null,
    pricePrivateCarAed: null as number | null,
    durationMin: null as number | null,
    durationMax: null as number | null,
    departureTimes: [] as string[],
  },
] as const;

// ---------------------------------------------------------------------------
// WhatsApp pre-fill helper
// ---------------------------------------------------------------------------

export function whatsappUrl(message: string): string {
  return `https://wa.me/${site.contact.whatsapp.replace("+", "")}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WA_MESSAGE =
  "Hi MJ Car Lift Service, I'd like to book a seat. Please send me the details and price.";

export const BOOKING_WA_MESSAGE = (
  route: string,
  date: string,
  area: string
) =>
  `Hi MJ Car Lift Service, I'd like to book a seat on the ${route} route on ${date} from ${area}. Please confirm availability and price in AED.`;
