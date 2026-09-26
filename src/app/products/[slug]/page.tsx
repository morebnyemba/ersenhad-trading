import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TbArrowRight, TbCheck } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { Process } from "@/components/site/process";
import { QuoteCta } from "@/components/site/quote-cta";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { imageSrc } from "@/lib/gallery";
import { quoteHref } from "@/lib/links";
import { getProduct, products } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} in ${site.address.city}`, description: `${p.short} Supplied and installed in ${site.address.city} — free, no-obligation quotes.`, path: `/products/${p.slug}/`, image: p.slug });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const others = products.filter((o) => o.slug !== p.slug);


  return (
    <>

      <PageHero
        eyebrow="Supply & installation"
        title={p.name}
        description={p.intro}
        image={imageSrc(p.cover)}
        crumbs={[{ href: "/", label: "Home" }, { href: "/#services", label: "Services" }, { label: p.name }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base font-semibold text-ink hover:bg-highlight/90">
            <Link href={quoteHref(p.slug)}>Get a free quote <TbArrowRight /></Link>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
            <a href={whatsappLink(`Hi ${site.name}, I'm interested in ${p.name.toLowerCase()}.`)} target="_blank" rel="noopener">
              <FaWhatsapp className="text-[#25D366]" /> WhatsApp us
            </a>
          </Button>
        </div>
        <dl className="mt-10 flex gap-10 border-t border-white/10 pt-8">
          {p.highlights.map((h) => (
            <div key={h.label} className="flex flex-col-reverse">
              <dt className="mt-1 text-sm text-white/60">{h.label}</dt>
              <dd className="font-heading text-3xl font-extrabold">
                <NumberTicker value={h.value} />
                {h.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Why choose it" title={`Built for ${site.address.country}'s conditions`} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {p.features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06} className="group relative overflow-hidden rounded-3xl border bg-card p-7 transition-shadow hover:shadow-xl hover:shadow-ink/5">
              <div className="absolute -top-16 -right-16 size-40 rounded-full bg-brand/5 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative grid size-11 place-items-center rounded-xl bg-brand text-primary-foreground font-heading font-bold">{i + 1}</span>
              <h3 className="relative mt-5 text-lg font-semibold text-ink">{f.title}</h3>
              <p className="relative mt-2 text-muted-foreground">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OPTIONS / USES */}
      <section className="relative overflow-hidden bg-muted/50">
        <DotPattern className="text-ink/[0.04]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-2">
          {[
            { title: "Options & specifications", items: p.options },
            { title: "Ideal for", items: p.uses },
          ].map((col) => (
            <Reveal key={col.title}>
              <h2 className="font-heading text-2xl font-bold text-ink">{col.title}</h2>
              <ul className="mt-6 grid gap-3">
                {col.items.map((o) => (
                  <li key={o} className="flex items-start gap-3 rounded-2xl border bg-background px-5 py-4">
                    <TbCheck className="mt-0.5 size-5 shrink-0 text-brand" /> <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Process
        tone="light"
        eyebrow="How it works"
        title={`How your ${p.name.toLowerCase()} project runs`}
        description="The same five steps on every job — so you know exactly what happens, and when."
      />

      {/* GALLERY */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
          <SectionHeading eyebrow="Gallery" title={`${p.name} projects`} />
          <div className="mt-10">
            <GalleryGrid initial={p.slug} />
          </div>
          <div className="mt-6 text-center">
            <Button asChild variant="outline" className="h-11 rounded-full px-6">
              <Link href={`/gallery/?service=${p.slug}#projects`}>
                Open in full gallery <TbArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <QuoteCta service={p.slug} className="border-t" />

      <FaqSection faqs={p.faqs} title={`${p.name}: your questions answered`} className="border-t" />

      {/* CROSS-SELL */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <h2 className="font-heading text-2xl font-bold text-ink">We also install</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {others.map((o) => (
            <Link key={o.slug} href={`/products/${o.slug}/`} className="group relative flex min-h-48 items-end overflow-hidden rounded-3xl bg-ink p-6 text-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc(o.cover, "sm")} alt="" loading="lazy" className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
              <div className="relative flex w-full items-end justify-between gap-4">
                <div>
                  <p className="font-heading text-xl font-bold">{o.name}</p>
                  <p className="mt-1 text-sm text-white/70">{o.short}</p>
                </div>
                <TbArrowRight className="size-5 shrink-0 text-highlight transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
