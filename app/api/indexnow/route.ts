import { NextResponse } from "next/server";
import { SITE_URL, INDEXNOW_KEY } from "@/lib/site";

// ── IndexNow submission API ───────────────────────────────────────────────────
// POST /api/indexnow   — submits a list of URLs to Bing + IndexNow network.
// Trigger this route via Vercel deploy hook or cron after each content update.
// Bing submits to its own index and notifies other IndexNow-enabled engines.
// Google has its own indexing pipeline; IndexNow accelerates Bing+Yandex.
// ─────────────────────────────────────────────────────────────────────────────

// All indexable pages — keep in sync with app/sitemap.ts
const INDEXABLE_URLS = [
  "/",
  "/routes/dubai-to-abu-dhabi",
  "/routes/abu-dhabi-to-dubai",
  "/pricing",
  "/book",
  "/safety-and-compliance",
  "/how-it-works",
  "/faq",
  "/reviews",
  "/routes",
  "/contact",
  "/guides",
  "/guides/dubai-to-abu-dhabi-travel-guide",
  "/guides/is-car-lift-legal-in-uae",
  "/guides/how-long-dubai-to-abu-dhabi",
  "/guides/dubai-abu-dhabi-taxi-vs-shared-ride-cost",
  "/guides/dubai-abu-dhabi-airport-transfer",
].map((p) => `${SITE_URL}${p}`);

// Simple shared secret to protect the endpoint
const SUBMIT_SECRET = process.env.INDEXNOW_SUBMIT_SECRET;

export async function POST(request: Request) {
  // Protect against unauthorized submissions
  const authHeader = request.headers.get("x-submit-secret");
  if (SUBMIT_SECRET && authHeader !== SUBMIT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = {
    host: "www.mjcarliftservice.com",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: INDEXABLE_URLS,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
  ];

  const results: { endpoint: string; status: number; ok: boolean }[] = [];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(body),
      });
      results.push({ endpoint, status: res.status, ok: res.ok });
    } catch (err) {
      results.push({ endpoint, status: 0, ok: false });
    }
  }

  return NextResponse.json({
    submitted: INDEXABLE_URLS.length,
    results,
    timestamp: new Date().toISOString(),
  });
}
