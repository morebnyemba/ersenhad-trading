import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Handshake, HardHat, Leaf, ShieldCheck, Target, Users } from "lucide-react";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a ${site.address.city}-based supplier and installer of car shades, interlocking rubber tiles and seamless gutters.`,
  alternates: { canonical: "/about/" },
};

// TODO(owner): add verifiable facts only — year founded, number of projects, team size,
// certifications, notable clients. Keep claims here true; customers do check.
const values = [
  { icon: Target, title: "Specialists, not generalists", body: "We focus on three product lines and know them inside out — from materials and fixings to the details that make an installation last." },
  { icon: Users, title: "One accountable team", body: "The people who measure your site are the people who install it. No subcontractor hand-offs, no finger-pointing." },
  { icon: Handshake, title: "Straight-talking quotes", body: "Itemised, written quotations with clear timelines. If a cheaper option will do the job, we'll tell you." },
  { icon: ShieldCheck, title: "Workmanship guarantee", body: "We stand behind every installation with a written workmanship guarantee." },
  { icon: HardHat, title: "Safe, tidy sites", body: "Proper equipment, careful work around your property and a clean site at hand-over." },
  { icon: Leaf, title: "Built to last", body: "Durable, weather-appropriate materials — including rubber tiles made from recycled tyres." },
];

export default function About() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc("shade-4x4-bay")} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/90 to-brand/35" />
        <DotPattern className="-z-10 text-white/[0.06]" />
        <Reveal className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <p className="text-sm font-semibold tracking-[0.18em] text-highlight uppercase">About us</p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Practical solutions that protect, pave and drain.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/75 text-pretty">
            {site.name} supplies and installs car shade ports, interlocking rubber floor tiles and seamless gutters for homes,
            businesses, schools and institutions in {site.address.city} and beyond.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Who we are" title="A focused team that does three things properly" />
          <Reveal className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              Every property needs shelter from the sun, safe surfaces underfoot and a roof that sheds water without damaging walls and
              foundations. Those are the problems we solve.
            </p>
            <p>
              We handle the whole job ourselves — site assessment, advice on materials, fabrication and installation — so there is one
              team responsible from the first measurement to the final hand-over.
            </p>
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}/`} className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-brand/40 hover:text-brand">
                <ProductIcon icon={p.icon} className="size-4 text-brand" /> {p.name}
              </Link>
            ))}
          </Reveal>
        </div>
        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          {["tiles-home-gym", "gutter-white-downpipe", "shade-sails-blue", "tiles-playground-red"].map((id, i) => (
            <div key={id} className={i % 2 ? "translate-y-8" : ""}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageSrc(id, "sm")} alt="" loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-lg shadow-ink/10" />
            </div>
          ))}
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-muted/50 py-24">
        <DotPattern className="text-ink/[0.04]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading align="center" eyebrow="How we work" title="What you can expect from us" />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.05} className="rounded-3xl border bg-background p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-muted-foreground">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-dark via-brand to-sky p-10 text-white sm:p-14">
          <DotPattern className="text-white/10" />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">Have a project in mind?</h2>
              <p className="mt-3 max-w-xl text-lg text-white/80">Book a free site visit and we&apos;ll send you a clear, itemised quotation.</p>
            </div>
            <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base text-ink hover:bg-highlight/90">
              <Link href="/contact/#quote">Get a free quote <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
