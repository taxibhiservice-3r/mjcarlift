import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${site.name} — Dubai to Abu Dhabi Ride Service`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1d4ed8 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Route badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#f59e0b",
            color: "#0f172a",
            borderRadius: "999px",
            padding: "8px 20px",
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 24,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Dubai ↔ Abu Dhabi
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 58,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: 20,
            maxWidth: 800,
          }}
        >
          Ride Service with Fixed AED Prices
        </div>

        {/* Sub */}
        <div
          style={{
            fontSize: 26,
            color: "#93c5fd",
            fontWeight: 400,
            marginBottom: 40,
          }}
        >
          Book on WhatsApp · Confirmed price before you travel
        </div>

        {/* Brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: "#2563eb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 800,
              color: "#fff",
            }}
          >
            MJ
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#e2e8f0",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              marginLeft: 16,
              fontSize: 20,
              color: "#64748b",
            }}
          >
            {site.domain}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
