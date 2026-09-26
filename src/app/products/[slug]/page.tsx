import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Spotlight } from "@/components/aceternity/spotlight";
import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/site/product-icon";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { imageSrc } from "@/lib/gallery";
import { getProduct, products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.short,
    alternates: { canonical: `/products/${p.slug}/` },
    openGraph: { images: [imageSrc(p.cover)] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const others = products.filter((o) => o.slug !== p.slug);

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc(p.cover)} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-40" fill="oklch(0.8 0.16 75)" />
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28">
          <Reveal className="max-w-2xl">
            <nav aria-label="Breadcrumb" className="text-sm text-white/50">
              <Link href="/" className="hover:text-white">Home</Link> <span className="mx-1.5">/</span> <span className="text-white/80">{p.name}</span>
            </nav>
            <span className="mt-8 grid size-14 place-items-center rounded-2xl bg-white/10 text-highlight ring-1 ring-white/20 backdrop-blur">
              <ProductIcon icon={p.icon} className="size-7" />
            </span>
            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">{p.name}</h1>
            <p className="mt-6 text-lg text-white/75 text-pretty">{p.intro}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base text-ink hover:bg-highlight/90">
                <a href="#quote">Get a free quote <ArrowRight /></a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/25 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
                <a href={whatsappLink(`Hi ${site.name}, I'm interested in ${p.name.toLowerCase()}.`)} target="_blank" rel="noopener">
                  <MessageCircle /> WhatsApp us
                </a>
              </Button>
            </div>
            <dl className="mt-12 flex gap-10 border-t border-white/10 pt-8">
              {p.highlights.map((h) => (
                <div key={h.label}>
                  <dt className="text-sm text-white/60">{h.label}</dt>
                  <dd className="mt-1 font-heading text-3xl font-extrabold">
                    <NumberTicker value={h.value} />
                    {h.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

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
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" /> <span>{o}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Gallery" title={`${p.name} projects`} />
        <div className="mt-10">
          <GalleryGrid initial={p.slug} />
        </div>
      </section>

      {/* FAQ + QUOTE */}
      <section id="quote" className="scroll-mt-20 border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading eyebrow="FAQ" title="Questions we're often asked" />
            <Accordion type="single" collapsible className="mt-8">
              {p.faqs.map((f, i) => (
                <AccordionItem key={f.q} value={`faq-${i}`}>
                  <AccordionTrigger className="py-5 text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <Reveal delay={0.1}>
            <h2 className="mb-6 font-heading text-2xl font-bold text-ink">Request a {p.name.toLowerCase()} quote</h2>
            <QuoteForm defaultProduct={p.slug} />
          </Reveal>
        </div>
      </section>

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
                <ArrowRight className="size-5 shrink-0 text-highlight transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
