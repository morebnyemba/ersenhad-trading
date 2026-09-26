"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { TbX } from "react-icons/tb";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { imageSrc, type GalleryImage } from "@/lib/gallery";
import { productName } from "@/lib/products";

export function Lightbox({
  images,
  index,
  onClose,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(index ?? 0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => void api.off("select", onSelect);
  }, [api]);

  const img = images[current];

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        showCloseButton={false}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") api?.scrollNext();
          else if (e.key === "ArrowLeft") api?.scrollPrev();
        }}
        className="w-[calc(100%-2rem)] max-w-5xl gap-0 overflow-hidden border-none bg-ink p-0 text-white sm:max-w-5xl">
        <DialogClose
          aria-label="Close"
          className="absolute top-3 right-3 z-10 grid size-10 place-items-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75 focus-visible:ring-3 focus-visible:ring-white/50 focus-visible:outline-none"
        >
          <TbX className="size-5" />
        </DialogClose>
        {index !== null && (
          <Carousel setApi={setApi} opts={{ startIndex: index, loop: true }} className="w-full">
            <CarouselContent className="ml-0">
              {images.map((g) => (
                <CarouselItem key={g.id} className="pl-0">
                  <div className="grid h-[70vh] place-items-center bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc(g.id)} alt={g.caption} className="max-h-full max-w-full object-contain" loading="lazy" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-3 size-10 border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white" />
            <CarouselNext className="right-3 size-10 border-white/20 bg-black/50 text-white hover:bg-black/70 hover:text-white" />
          </Carousel>
        )}
        {img && (
          <div className="flex items-start justify-between gap-4 p-4 sm:p-5">
            <div>
              <DialogTitle className="text-base font-semibold text-white">{img.title}</DialogTitle>
              <DialogDescription className="text-sm text-white/60">
                {productName(img.category)} · {img.caption}
              </DialogDescription>
            </div>
            <span className="shrink-0 text-sm tabular-nums text-white/50">
              {current + 1} / {images.length}
            </span>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
