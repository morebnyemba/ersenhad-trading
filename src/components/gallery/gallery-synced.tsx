"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { GalleryGrid, type GalleryFilter } from "@/components/gallery/gallery-grid";
import { products } from "@/lib/products";

const valid = new Set<string>(products.map((p) => p.slug));

// Gallery grid whose filter lives in the URL (?service=car-shades) so filtered
// views are linkable/shareable. Must render inside <Suspense> (useSearchParams).
export function GallerySynced() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = params.get("service");
  const filter: GalleryFilter = q && valid.has(q) ? (q as GalleryFilter) : "all";

  return (
    <GalleryGrid
      sticky
      filter={filter}
      onFilterChange={(f) => router.replace(f === "all" ? pathname : `${pathname}?service=${f}`, { scroll: false })}
    />
  );
}
