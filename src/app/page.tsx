import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, ClipboardList, Hammer, MessageCircle, Ruler, ShieldCheck, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/aceternity/spotlight";
import { FeaturedCarousel } from "@/components/gallery/featured-carousel";
import { BorderBeam } from "@/components/magicui/border-beam";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Marquee } from "@/components/magicui/marquee";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductIcon } from "@/components/site/product-icon";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { TypedText } from "@/components/site/typed-text";
import { gallery, imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

const typed = ["car shade ports.", "rubber floor tiles.", "seamless gutters."];

const sectors = ["Homes", "Townhouse complexes", "Schools", "Gyms & studios", "Churches", "Offices", "Car dealerships", "Hospitals", "Playgrounds", "Warehouses", "Hotels & lodges", "Retail centres"];

const steps = [
  { icon: MessageCircle, title: "Tell us about the job", body: "Send a WhatsApp or fill in the quote form — photos of the site help." },
  { icon: Ruler, title: "Free site visit", body: "We measure on site and advise on materials, colours and layout." },
  { icon: ClipboardList, title: "Itemised quotation", body: "A clear, written quote with no hidden extras and a firm timeline." },
  { icon: Hammer, title: "Install & hand-over", body: "Our own team installs, cleans up and walks you through the finished job." },
];

const reasons = [
  { icon: Hammer, title: "Supply & install", body: "Measuring, fabrication and installation by one accountable team." },
  { icon: ShieldCheck, title: "Workmanship guarantee", body: "Every installation is backed by our written workmanship guarantee." },
  { icon: Sparkles, title: "Quality materials", body: "Galvanised steel, UV-stabilised fabrics, recycled rubber, pre-painted aluminium." },
  { icon: CheckCircle2, title: "Clean, on-time finish", body: "Agreed dates, tidy sites and a proper hand-over when we're done." },
];

const featured = ["shade-residential-carport", "tiles-home-gym", "gutter-white-downpipe", "shade-sails-blue", "tiles-playground-red", "gutter-metal-roof"].map(
  (id) => gallery.find((g) => g.id === id)!,
);

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc("shade-residential-carport")} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/90 to-violet/40" />
        <DotPattern className="-z-10 text-white/[0.07] [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)]" />
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="var(--color-violet)" />

        <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-20 pb-24 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:pt-28 lg:pb-32">
          <Reveal>
            <Badge variant="outline" className="h-7 gap-2 rounded-full border-white/20 bg-white/5 px-3 text-white/80 backdrop-blur">
              <span className="size-1.5 rounded-full bg-magenta" /> Supply &amp; installation · {site.address.city}
            </Badge>
            <h1 className="mt-6 font-heading text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-6xl">
              We design &amp; install premium
              <TypedText strings={typed} className="block bg-gradient-to-r from-highlight via-violet to-magenta bg-clip-text text-transparent [&_.typed-cursor]:text-highlight" />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70 text-pretty">{site.description}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base text-ink hover:bg-highlight/90">
                <a href="#quote">
                  Get a free quote <ArrowRight />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/25 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
                <a href={whatsappLink(`Hi ${site.name}, I have a question.`)} target="_blank" rel="noopener">
                  <MessageCircle /> WhatsApp us
                </a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur-md">
            <BorderBeam size={220} duration={9} />
            <ul className="grid gap-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}/`} className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-white/[0.06]">
                    <span className="relative size-20 shrink-0 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageSrc(p.cover, "sm")} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2 font-semibold">
                        <ProductIcon icon={p.icon} className="size-4 text-highlight" /> {p.name}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm text-white/60">{p.short}</span>
                    </span>
                    <ArrowUpRight className="size-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-highlight" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SECTORS MARQUEE */}
      <section aria-label="Sectors we serve" className="border-b bg-muted/40 py-5">
        <Marquee pauseOnHover className="[--duration:45s] [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {sectors.map((s) => (
            <span key={s} className="flex items-center gap-3 px-4 text-sm font-medium whitespace-nowrap text-muted-foreground">
              <span className="size-1.5 rounded-full bg-magenta/80" /> {s}
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
                    Explore {p.name.toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NUMBERS */}
      <section className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand to-violet text-primary-foreground">
        <DotPattern className="text-white/10" />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {products.map((p) => (
            <Reveal key={p.slug} className="border-white/20 sm:border-l sm:pl-8 first:sm:border-l-0 first:sm:pl-0">
              <p className="text-sm font-medium text-white/70">{p.name}</p>
              <div className="mt-3 flex gap-8">
                {p.highlights.map((h) => (
                  <div key={h.label}>
                    <p className="font-heading text-4xl font-extrabold">
                      <NumberTicker value={h.value} />
                      {h.suffix}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{h.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Our work" title="Recent installations" description="A look at the kind of projects we deliver across homes, schools and businesses." />
          <Button asChild variant="outline" className="h-11 shrink-0 self-start rounded-full px-5 md:self-auto">
            <Link href="/gallery/">
              View full gallery <ArrowRight />
            </Link>
          </Button>
        </div>
        <Reveal className="mt-12">
          <FeaturedCarousel images={featured} />
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <DotPattern className="text-white/[0.05]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading inverted align="center" eyebrow="How it works" title="From enquiry to installed in four steps" />
          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="relative h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7">
                  <span className="font-heading text-6xl font-extrabold text-white/[0.06]">0{i + 1}</span>
                  <span className="absolute top-7 right-7 grid size-11 place-items-center rounded-xl bg-violet/25 text-highlight ring-1 ring-violet/50">
                    <s.icon className="size-5" />
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

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
    </>
  );
}
