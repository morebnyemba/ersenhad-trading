import type { Metadata } from "next";
import Link from "next/link";
import { TbContract, TbRecycle, TbShieldCheck, TbTarget, TbTrafficCone, TbUsersGroup } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CtaBand } from "@/components/site/cta-band";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { Process } from "@/components/site/process";
import { aboutFaqs } from "@/lib/faqs";
import { imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About us",
  description: `${site.name} is a ${site.address.country}-based supplier and installer of car shades, interlocking rubber tiles and seamless gutters.`,
  path: "/about/",
  image: "about",
});

// TODO(owner): add verifiable facts only — year founded, number of projects, team size,
// certifications, notable clients. Keep claims here true; customers do check.
const values = [
  { icon: TbTarget, title: "Specialists, not generalists", body: "We focus on three product lines and know them inside out — from materials and fixings to the details that make an installation last." },
  { icon: TbUsersGroup, title: "One accountable team", body: "The people who measure your site are the people who install it. No subcontractor hand-offs, no finger-pointing." },
  { icon: TbContract, title: "Straight-talking quotes", body: "Itemised, written quotations with clear timelines. If a cheaper option will do the job, we'll tell you." },
  { icon: TbShieldCheck, title: "Workmanship guarantee", body: "We stand behind every installation with a written workmanship guarantee." },
  { icon: TbTrafficCone, title: "Safe, tidy sites", body: "Proper equipment, careful work around your property and a clean site at hand-over." },
  { icon: TbRecycle, title: "Built to last", body: "Durable, weather-appropriate materials — including rubber tiles made from recycled tyres." },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Practical solutions that protect, pave and drain."
        description={`${site.name} supplies and installs car shade ports, interlocking rubber floor tiles and seamless gutters for homes, businesses, schools and institutions across ${site.address.country}.`}
        image={imageSrc("shade-chromadek-carport")}
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
      />

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
          {["shade-chromadek-install", "tiles-plant-room", "shade-cantilever-install", "tiles-stair-treads"].map((id, i) => (
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

      <Process />

      <FaqSection faqs={aboutFaqs} title="About working with us" />

      <CtaBand title="Have a project in mind?" body="Get a free, itemised quotation — with no obligation to go ahead." />
    </>
  );
}
