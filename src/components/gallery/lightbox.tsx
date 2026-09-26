"use client";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TbArrowRight, TbX } from "react-icons/tb";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { imageSrc, type GalleryImage } from "@/lib/gallery";
import { productName } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

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
                  <div className="grid h-[52vh] place-items-center bg-black sm:h-[60vh]">
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
          <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div className="min-w-0">
              <DialogTitle className="flex items-center gap-3 text-base font-semibold text-white">
                {img.title}
                <span className="text-sm font-normal tabular-nums text-white/45">
                  {current + 1} / {images.length}
                </span>
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-sm text-white/60">
                {productName(img.category)} · {img.caption}
              </DialogDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <a
                href={whatsappLink(`Hi ${site.name}, I saw "${img.title}" (${productName(img.category)}) on your website and I'd like a quote for something similar.`)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1fb957]"
              >
                <FaWhatsapp className="size-4" /> Ask about this
              </a>
              <Link
                href={`/products/${img.category}/`}
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-white/20 px-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {productName(img.category)} <TbArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        )}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 [scrollbar-width:thin] sm:px-5" aria-label="Thumbnails">
            {images.map((g, i) => (
              <button
                key={g.id}
                ref={i === current ? (el) => el?.scrollIntoView({ block: "nearest", inline: "nearest" }) : undefined}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Show ${g.title}`}
                aria-current={i === current}
                className={cn(
                  "relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all",
                  i === current ? "ring-2 ring-highlight ring-offset-2 ring-offset-ink" : "opacity-50 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc(g.id, "sm")} alt="" loading="lazy" className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
