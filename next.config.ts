import type { NextConfig } from "next";

// ── Security & performance headers ──────────────────────────────────────────
const SECURITY_HEADERS = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow framing by other origins
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Enforce HTTPS for 2 years (Vercel handles TLS; this ensures HSTS preload)
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Limit referrer data sent to third parties
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict powerful browser APIs
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self), payment=()" },
  // CSP in report-only mode; tighten to enforcing after reviewing console reports
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "worker-src 'none'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
  // Opt into cross-origin isolation for performance APIs
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // ── Canonical www redirect ───────────────────────────────────────────────
  // Non-www → www. Vercel can also handle this in project settings;
  // keeping it here ensures it works in any host environment.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mjcarliftservice.com" }],
        destination: "https://www.mjcarliftservice.com/:path*",
        permanent: true, // 308 → 301 in browser cache
      },
    ];
  },

  // ── Security headers on all routes ───────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
      // Cache static assets aggressively
      {
        source: "/(.*)\\.(svg|png|jpg|jpeg|ico|webp|avif|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },

  // ── Images ───────────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 64, 96, 128, 256],
  },

  // ── Trailing slash policy ─────────────────────────────────────────────────
  // No trailing slash — all canonicals are without trailing slash.
  trailingSlash: false,

  // ── Turbopack ─────────────────────────────────────────────────────────────
  // Suppress the warning about package-lock.json home-dir inclusion on Windows
  turbopack: {
    root: __dirname,
  },

  // ── Compression ───────────────────────────────────────────────────────────
  compress: true,

  // ── Power headers: X-Powered-By hidden ────────────────────────────────────
  poweredByHeader: false,
};

export default nextConfig;
