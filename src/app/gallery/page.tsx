import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { CtaBand } from "@/components/site/cta-band";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { ProductIcon } from "@/components/site/product-icon";
import { galleryFaqs } from "@/lib/faqs";
import { gallery, imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Project gallery",
  description: `Car shades, rubber tiles and seamless gutters installed by ${site.name}.`,
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our work, up close"
        description="Browse car shade, rubber flooring and guttering projects. Filter by service and tap any photo to view it full-screen."
        image={imageSrc("tiles-playground-red")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Gallery" }]}
      >
        <ul className="flex flex-wrap gap-3">
          {products.map((p) => (
            <li key={p.slug} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pr-4 pl-1.5 text-sm backdrop-blur">
              <span className="grid size-7 place-items-center rounded-full bg-white/10 text-highlight">
                <ProductIcon icon={p.icon} className="size-4" />
              </span>
              {p.name}
              <span className="text-white/50">{gallery.filter((g) => g.category === p.slug).length}</span>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <GalleryGrid />
      </section>

      <FaqSection faqs={galleryFaqs} title="Planning something similar?" className="border-t" />

      <CtaBand title="Like what you see?" body="Get a free, itemised quotation for your own project." />
    </>
  );
}
