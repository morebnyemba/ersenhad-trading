import type { Metadata } from "next";
import { site } from "@/lib/site";

// Per-page metadata with complete Open Graph / Twitter tags. Next shallow-merges
// `openGraph`, so each page must restate the shared fields or they're dropped.
// The OG image itself comes from the colocated opengraph-image.tsx file.
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const fullTitle = path === "/" ? `${site.name} — ${site.tagline}` : `${title} | ${site.name}`;
  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, locale: "en_ZW", type: "website" },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
