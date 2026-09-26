import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TbArrowRight, TbCalculator, TbCircleCheck, TbPhone } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { quoteHref } from "@/lib/links";
import { getProduct, products, type ProductSlug } from "@/lib/products";
import { site, telHref, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const prompts: Record<ProductSlug, string> = {
  "car-shades": "How many cars?",
  "rubber-tiles": "How big is the floor?",
  "seamless-gutters": "How big & how tall is the house?",
};

const points = ["Free, no-obligation quotation", "Estimated price in about a minute", "Written, itemised quote after we measure", "Workmanship guarantee on installation"];

// Replaces the old quote form: quotes start in the project planner (/estimate),
// which sends a structured enquiry. `service` highlights the current service.
export function QuoteCta({ service, className }: { service?: ProductSlug; className?: string }) {
  const current = service ? getProduct(service)! : null;
  const ordered = current ? [current, ...products.filter((p) => p.slug !== service)] : products;

  return (
    <section id="quote" className={cn("mx-auto grid max-w-7xl scroll-mt-20 items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.15fr]", className)}>
      <div>
        <SectionHeading
          eyebrow="Free quotation"
          title={current ? `Get a free ${current.name.toLowerCase()} quote` : "Get a free, no-obligation quote"}
          description="Start with our one-minute project planner — see your layout and an estimated price — then send it to us for a free, itemised quotation."
        />
        <ul className="mt-8 grid gap-3">
          {points.map((t, i) => (
            <Reveal as="li" key={t} delay={i * 0.05} className="flex items-center gap-3">
              <TbCircleCheck className="size-5 shrink-0 text-brand" />
              <span className="text-ink">{t}</span>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-6 text-sm">
          <span className="text-muted-foreground">Prefer to talk?</span>
          <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand">
            <FaWhatsapp className="size-4 text-[#25D366]" /> WhatsApp us
          </a>
          <a href={telHref} className="inline-flex items-center gap-2 font-semibold text-ink hover:text-brand">
            <TbPhone className="size-4 text-brand" /> {site.phone}
          </a>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-xl shadow-ink/20 sm:p-8">
        <div aria-hidden className="absolute -top-24 -right-16 -z-10 size-72 rounded-full bg-logo-blue/40 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-28 left-10 -z-10 size-64 rounded-full bg-magenta/20 blur-[90px]" />
        <DotPattern className="-z-10 text-white/[0.06]" />
        <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-highlight uppercase">
          <TbCalculator className="size-4" /> Step 1 · Estimate your project
        </p>
        <ul className="mt-6 grid gap-3">
          {ordered.map((p) => {
            const primary = current?.slug === p.slug;
            return (
              <li key={p.slug}>
                <Link
                  href={quoteHref(p.slug)}
                  className={cn(
                    "group flex items-center gap-4 rounded-2xl border p-4 transition-all hover:-translate-y-0.5",
                    primary ? "border-magenta/40 bg-white/[0.09]" : "border-white/10 bg-white/[0.04] hover:border-magenta/40 hover:bg-white/[0.08]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-xl transition-colors",
                      primary ? "bg-gradient-to-br from-logo-blue to-magenta text-white" : "bg-white/10 text-highlight group-hover:bg-gradient-to-br group-hover:from-logo-blue group-hover:to-magenta group-hover:text-white",
                    )}
                  >
                    <ProductIcon icon={p.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-sm text-white/60">{prompts[p.slug]}</span>
                  </span>
                  <TbArrowRight className="size-5 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-magenta" />
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 flex items-start gap-3 text-sm text-white/65">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold text-white">2</span>
          Send your estimate on WhatsApp or email — we reply with a free, itemised quotation, usually within one business day.
        </p>
      </Reveal>
    </section>
  );
}
