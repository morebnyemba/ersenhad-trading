"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { TbArrowRight } from "react-icons/tb";
import { ProductIcon } from "@/components/site/product-icon";
import { gallery, imageSrc } from "@/lib/gallery";
import { getProduct, type ProductSlug } from "@/lib/products";
import { cn } from "@/lib/utils";

// One slide per photo; each is tied to a service so the caption and link follow it.
const SLIDES: { id: string; product: ProductSlug }[] = [
  { id: "shade-cantilever-suv", product: "car-shades" },
  { id: "tiles-plant-room", product: "rubber-tiles" },
  { id: "gutter-white-downpipe", product: "seamless-gutters" },
  { id: "shade-commercial-entrance", product: "car-shades" },
  { id: "tiles-stair-treads", product: "rubber-tiles" },
];

const DELAY = 5000;
// 1×1 transparent GIF: phones render this instead of the photo, so the hero
// photos are never downloaded below the lg breakpoint (the carousel is hidden there).
const BLANK = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

export function HeroCarousel() {
  const autoplay = useRef(Autoplay({ delay: DELAY, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [emblaRef, api] = useEmblaCarousel({ loop: true, duration: 30 }, [Fade(), autoplay.current]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => void api.off("select", onSelect);
  }, [api]);

  const go = useCallback((i: number) => api?.scrollTo(i), [api]);
  const product = getProduct(SLIDES[index].product)!;
  const caption = gallery.find((g) => g.id === SLIDES[index].id)!;

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label="Recent work">
      {/* main frame */}
      <div ref={emblaRef} className="overflow-hidden rounded-[2rem] shadow-2xl shadow-black/50 ring-1 ring-white/10">
        <div className="flex touch-pan-y">
          {SLIDES.map((s, i) => {
            const g = gallery.find((x) => x.id === s.id)!;
            return (
              <div key={s.id} className="relative aspect-[4/3.4] min-w-0 flex-[0_0_100%]" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${SLIDES.length}`}>
                <picture>
                  <source media="(min-width: 1024px)" srcSet={imageSrc(s.id, i === 0 ? "lg" : "sm")} />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={BLANK}
                    alt={g.caption}
                    fetchPriority={i === 0 ? "high" : "low"}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="size-full object-cover"
                  />
                </picture>
              </div>
            );
          })}
        </div>
      </div>

      {/* caption + controls over the bottom of the frame */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 rounded-b-[2rem] bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-6 pt-20 pb-6">
        <div className="flex items-end justify-between gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={caption.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-highlight uppercase">
                <ProductIcon icon={product.icon} className="size-4" /> {product.name}
              </p>
              <p className="mt-1 text-lg font-semibold">{caption.title}</p>
            </motion.div>
          </AnimatePresence>
          <Link
            href={`/products/${product.slug}/`}
            className="pointer-events-auto flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition-colors hover:bg-white/20"
          >
            Explore <TbArrowRight className="size-4" />
          </Link>
        </div>
        {/* progress dots */}
        <div className="pointer-events-auto mt-5 flex gap-2" role="tablist" aria-label="Choose slide">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => go(i)}
              className={cn("relative h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-300", i === index ? "w-10" : "w-4 hover:bg-white/40")}
            >
              {i === index && (
                <motion.span
                  key={`p-${index}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-logo-cyan to-magenta"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: DELAY / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
