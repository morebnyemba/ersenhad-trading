import Link from "next/link";
import { TbArrowRight, TbAward, TbCalendarCheck, TbShieldCheck, TbTruckDelivery } from "react-icons/tb";
import { Hero } from "@/components/home/hero";
import { FeaturedCarousel } from "@/components/gallery/featured-carousel";
import { Marquee } from "@/components/magicui/marquee";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/site/product-icon";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { FaqSection } from "@/components/site/faq-section";
import { Process } from "@/components/site/process";
import { Specs } from "@/components/site/specs";
import { generalFaqs } from "@/lib/faqs";
import { gallery, imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

const sectors = ["Homes", "Townhouse complexes", "Schools", "Gyms & studios", "Churches", "Offices", "Car dealerships", "Hospitals", "Playgrounds", "Warehouses", "Hotels & lodges", "Retail centres"];

const reasons = [
  { icon: TbTruckDelivery, title: "Supply & install", body: "Measuring, fabrication and installation by one accountable team." },
  { icon: TbShieldCheck, title: "Workmanship guarantee", body: "Every installation is backed by our written workmanship guarantee." },
  { icon: TbAward, title: "Quality materials", body: "Galvanised steel, UV-stabilised fabrics, recycled rubber, pre-painted aluminium." },
  { icon: TbCalendarCheck, title: "Clean, on-time finish", body: "Agreed dates, tidy sites and a proper hand-over when we're done." },
];

const featured = ["shade-residential-carport", "tiles-home-gym", "gutter-white-downpipe", "shade-sails-blue", "tiles-playground-red", "gutter-metal-roof"].map(
  (id) => gallery.find((g) => g.id === id)!,
);

export default function Home() {
  return (
    <>
      <Hero />

      {/* SECTORS MARQUEE */}
      <section aria-label="Sectors we serve" className="border-b bg-muted/40 py-5">
        <Marquee pauseOnHover className="[--duration:45s] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {sectors.map((s) => (
            <span key={s} className="flex items-center gap-3 px-4 text-sm font-medium whitespace-nowrap text-muted-foreground">
              <span className="size-1.5 rounded-full bg-magenta" /> {s}
            </span>
          ))}
        </Marquee>
      </section>

      {/* PRODUCTS — bento */}
      <section id="services" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="What we do" title="Three specialities. One accountable team." description="From the frame in the ground to the last downpipe bracket, every job is measured, supplied and installed by us." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className={i === 0 ? "lg:row-span-2" : "lg:col-span-2"}>
              <Link
                href={`/products/${p.slug}/`}
                className="group relative flex h-full min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-ink p-7 text-white shadow-lg shadow-ink/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc(p.cover, "sm")} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
                <div className="relative">
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/10 text-highlight ring-1 ring-white/20 backdrop-blur">
                    <ProductIcon icon={p.icon} className="size-6" />
                  </span>
                  <h3 className="mt-5 font-heading text-2xl font-bold">{p.name}</h3>
                  <p className="mt-2 max-w-md text-white/70">{p.short}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.uses.slice(0, 3).map((u) => (
                      <span key={u} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">{u}</span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-highlight">
                    Explore {p.name.toLowerCase()} <TbArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <Specs />

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our work" title="Recent installations" description="A look at the kind of projects we deliver across homes, schools and businesses." />
          <Button asChild variant="outline" className="h-11 shrink-0 self-start rounded-full px-5 md:self-auto">
            <Link href="/gallery/">
              View full gallery <TbArrowRight />
            </Link>
          </Button>
        </div>
        <Reveal className="mt-12">
          <FeaturedCarousel images={featured} />
        </Reveal>
      </section>

      <Process />

      {/* WHY US + QUOTE */}
      <section id="quote" className="mx-auto grid max-w-7xl scroll-mt-20 gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading eyebrow={`Why ${site.name}`} title="Get a free, no-obligation quote" description="Tell us what you need and where. We'll arrange a site visit and send you a clear, itemised quotation." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {reasons.map((r, i) => (
              <Reveal as="li" key={r.title} delay={i * 0.06} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand">
                    <r.icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{r.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                  </div>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal delay={0.1}>
          <QuoteForm />
        </Reveal>
      </section>

      <FaqSection faqs={generalFaqs} title="Questions we're often asked" />
    </>
  );
}
