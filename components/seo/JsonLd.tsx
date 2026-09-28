interface JsonLdProps {
  data: Record<string, unknown>;
}

// Renders a JSON-LD script tag. Must be used inside a Server Component.
// Multiple JsonLd components on one page produce multiple <script> tags —
// that is valid. Use buildGraph() from lib/schema/index.ts to bundle
// site-wide schemas into a single @graph.
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0),
      }}
    />
  );
}
