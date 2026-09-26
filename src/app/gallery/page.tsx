import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Project gallery",
  description: `Car shades, rubber tiles and seamless gutters installed by ${site.name}.`,
  alternates: { canonical: "/gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-muted/40">
        <DotPattern className="text-ink/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <Reveal className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">Gallery</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Our work, up close</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Browse car shade, rubber flooring and guttering projects. Tap any photo to view it full-screen.
          </p>
        </Reveal>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <GalleryGrid />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div>
            <p className="font-heading text-2xl font-bold">Like what you see?</p>
            <p className="mt-2 text-white/70">Get a free site visit and quotation for your project.</p>
          </div>
          <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base text-ink hover:bg-highlight/90">
            <a href="/contact/">Request a quote</a>
          </Button>
        </div>
      </section>
    </>
  );
}
