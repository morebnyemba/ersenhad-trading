import { ogContentType, ogSize, renderOg } from "@/app/_og/render";
import { getProduct, products } from "@/lib/products";

export const dynamic = "force-static";
export const dynamicParams = false;
export const alt = "Ersenhad Trading service";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug)!;
  return renderOg({
    eyebrow: "Supply & installation",
    title: p.name,
    subtitle: p.short,
    photo: p.cover,
    chips: p.highlights.map((h) => `${h.value}${h.suffix} ${h.label}`),
  });
}
