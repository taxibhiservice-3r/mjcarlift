import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// ── robots.ts ────────────────────────────────────────────────────────────────
// Allows all legitimate crawlers — search engines AND AI citation bots —
// so pages can appear in both traditional SERPs and AI-generated answers.
// Decision recorded in docs/STRATEGY.md (AI crawler policy).
// ─────────────────────────────────────────────────────────────────────────────

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // ── Google ───────────────────────────────────────────────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/styleguide", "/_not-found"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
      },
      // ── Bing / Microsoft ─────────────────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/styleguide"],
        crawlDelay: 1,
      },
      // ── Apple ────────────────────────────────────────────────────────────
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // ── AI citation / AI search crawlers ────────────────────────────────
      // GPTBot (OpenAI / ChatGPT search)
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/styleguide"],
      },
      // ChatGPT-User (ChatGPT browsing)
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      // Claude (Anthropic)
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      // Perplexity
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Google AI Overview / Gemini (uses Googlebot + additional)
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      // Meta AI
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Common / catch-all
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/styleguide"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
