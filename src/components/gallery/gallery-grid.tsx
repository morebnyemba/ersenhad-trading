"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Expand } from "lucide-react";
import { Lightbox } from "@/components/gallery/lightbox";
import { gallery, imageSrc } from "@/lib/gallery";
import { products, type ProductSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

type Filter = "all" | ProductSlug;

export function GalleryGrid({ initial = "all" }: { initial?: Filter }) {
  const [filter, setFilter] = useState<Filter>(initial);
  const [open, setOpen] = useState<number | null>(null);
  const items = useMemo(() => (filter === "all" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  const filters: { value: Filter; label: string; count: number }[] = [
    { value: "all", label: "All projects", count: gallery.length },
    ...products.map((p) => ({ value: p.slug, label: p.name, count: gallery.filter((g) => g.category === p.slug).length })),
  ];

  return (
    <>
      <div role="tablist" aria-label="Filter projects" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              filter === f.value ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {filter === f.value && (
              <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-primary" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
            )}
            <span className="relative">
              {f.label} <span className="opacity-60">{f.count}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((g, i) => (
            <motion.button
              key={g.id}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35 }}
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
                  <p className="text-xs font-medium tracking-wider text-highlight uppercase">
                    {products.find((p) => p.slug === g.category)!.name}
                  </p>
                  <p className="mt-1 font-semibold">{g.title}</p>
                </div>
                <span className="grid size-9 shrink-0 translate-y-2 place-items-center rounded-full bg-white/15 opacity-0 backdrop-blur transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand className="size-4" />
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
