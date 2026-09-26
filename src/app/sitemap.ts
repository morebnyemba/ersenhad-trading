import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/gallery/", "/contact/", ...products.map((p) => `/products/${p.slug}/`)].map((path) => ({ url: `${site.url}${path}` }));
}
