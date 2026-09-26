import type { Metadata } from "next";
import { OG_SIZE, ogCard, ogImagePath, type OgKey } from "@/lib/og";
import { site } from "@/lib/site";

export const homeTitle = `${site.name} — Car Shades, Rubber Tiles & Seamless Gutters in ${site.address.country}`;

/** Open Graph + Twitter image fields for a preview card (static /og/<key>.jpg). */
export function ogImages(key: OgKey) {
  const card = ogCard(key);
  const img = { url: ogImagePath(key), ...OG_SIZE, alt: card.alt, type: "image/jpeg" };
  return { openGraph: { images: [img] }, twitter: { images: [img] } };
}

// Per-page metadata with complete Open Graph / Twitter tags. Next shallow-merges
// `openGraph`/`twitter`, so every page restates the shared fields and its image.
export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image: OgKey }): Metadata {
  const fullTitle = path === "/" ? homeTitle : `${title} | ${site.name}`;
  const imgs = ogImages(image);
  return {
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: fullTitle, description, url: path, siteName: site.name, locale: "en_ZW", type: "website", ...imgs.openGraph },
    twitter: { card: "summary_large_image", title: fullTitle, description, ...imgs.twitter },
  };
}
