"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TbArrowsMaximize } from "react-icons/tb";
import { Lightbox } from "@/components/gallery/lightbox";
import { ProductIcon } from "@/components/site/product-icon";
import { gallery, imageSrc } from "@/lib/gallery";
import { getProduct, products, type ProductSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

export type GalleryFilter = "all" | ProductSlug;

export function GalleryGrid({
  initial = "all",
  filter: controlled,
  onFilterChange,
  sticky = false,
}: {
  initial?: GalleryFilter;
  /** controlled filter (e.g. synced to the URL); falls back to internal state */
  filter?: GalleryFilter;
  onFilterChange?: (f: GalleryFilter) => void;
  /** pin the filter bar under the site header while scrolling */
  sticky?: boolean;
}) {
  const [internal, setInternal] = useState<GalleryFilter>(initial);
  const filter = controlled ?? internal;
  const setFilter = (f: GalleryFilter) => (onFilterChange ? onFilterChange(f) : setInternal(f));
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  const filters: { value: GalleryFilter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: gallery.length },
    ...products.map((p) => ({ value: p.slug, label: p.name, count: gallery.filter((g) => g.category === p.slug).length })),
  ];

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-between gap-4",
          sticky && "sticky top-16 z-30 -mx-4 border-b bg-background/95 px-4 py-3 backdrop-blur-lg sm:-mx-6 sm:px-6 lg:top-[72px]",
        )}
      >
        <div role="tablist" aria-label="Filter projects" className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f.value}
              role="tab"
              aria-selected={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f.value ? "border-transparent text-primary-foreground" : "border-border text-muted-foreground hover:border-brand/40 hover:text-foreground",
              )}
            >
              {filter === f.value && (
                <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-gradient-to-r from-brand to-brand-dark" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
              <span className="relative flex items-center gap-2">
                {f.value !== "all" && <ProductIcon icon={getProduct(f.value)!.icon} className="size-4" />}
                {f.label}
                <span className={cn("rounded-full px-1.5 text-xs tabular-nums", filter === f.value ? "bg-white/20" : "bg-muted")}>{f.count}</span>
              </span>
            </button>
          ))}
        </div>
        <p className="hidden shrink-0 text-sm text-muted-foreground md:block" aria-live="polite">
          Showing <span className="font-semibold text-ink tabular-nums">{items.length}</span> {items.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, delay: Math.min(i, 8) * 0.03 }}
              className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-muted text-left focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              style={{ aspectRatio: g.ratio }}
              aria-label={`Open ${g.title}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc(g.id, "sm")}
                alt={g.caption}
                loading="lazy"
                decoding="async"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white">
                <div>
                  <p className="flex items-center gap-1.5 text-xs font-medium tracking-wider text-highlight uppercase">
                    <ProductIcon icon={getProduct(g.category)!.icon} className="size-3.5" />
                    {getProduct(g.category)!.name}
                  </p>
                  <p className="mt-1 font-semibold">{g.title}</p>
                  <p className="mt-0.5 max-h-0 overflow-hidden text-sm text-white/70 transition-all duration-300 group-hover:max-h-10">{g.caption}</p>
                </div>
                <span className="grid size-9 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <TbArrowsMaximize className="size-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <Lightbox key={`${filter}-${open}`} images={items} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
