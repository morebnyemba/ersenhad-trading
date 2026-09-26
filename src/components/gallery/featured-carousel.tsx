"use client";

import { useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Lightbox } from "@/components/gallery/lightbox";
import { imageSrc, type GalleryImage } from "@/lib/gallery";
import { productName } from "@/lib/products";

export function FeaturedCarousel({ images }: { images: GalleryImage[] }) {
  const autoplay = useRef(Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true }));
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Carousel opts={{ loop: true, align: "start" }} plugins={[autoplay.current]} className="w-full">
        <CarouselContent className="-ml-4">
          {images.map((g, i) => (
            <CarouselItem key={g.id} className="basis-[85%] pl-4 sm:basis-1/2 lg:basis-1/3">
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted text-left"
                aria-label={`Open ${g.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc(g.id, "sm")} alt={g.caption} loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <p className="text-xs font-medium tracking-wider text-highlight uppercase">{productName(g.category)}</p>
                  <p className="mt-1 text-lg font-semibold">{g.title}</p>
                </div>
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-6 flex justify-end gap-2">
          <CarouselPrevious className="static size-11 translate-y-0" />
          <CarouselNext className="static size-11 translate-y-0" />
        </div>
      </Carousel>
      <Lightbox key={open} images={images} index={open} onClose={() => setOpen(null)} />
    </>
  );
}
