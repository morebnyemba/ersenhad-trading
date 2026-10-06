import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";

// "Specs at a glance": per service, a photo of a real job, two headline figures
// and a short spec list — so visitors can compare at a glance.
export function Specs() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Specs at a glance" title="The numbers behind every installation" description="Real specifications, not slogans — the figures that matter when you compare quotes." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="group relative flex flex-col overflow-hidden rounded-3xl border bg-background shadow-sm transition-shadow hover:shadow-xl hover:shadow-ink/5">
              <div className="relative h-36 overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imageSrc(p.cover, "sm")} alt="" loading="lazy" decoding="async" className="size-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-logo-cyan via-logo-blue to-magenta" />
                <div className="absolute inset-x-5 bottom-4 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
                    <ProductIcon icon={p.icon} className="size-5" />
                  </span>
                  <h3 className="font-semibold text-white">{p.name}</h3>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <dl className="grid grid-cols-2 gap-4">
                  {p.highlights.map((h) => (
                    // dt must precede dd; flex-col-reverse shows the figure first
                    <div key={h.label} className="flex flex-col-reverse rounded-2xl bg-brand/5 px-4 py-3">
                      <dt className="mt-0.5 text-sm text-muted-foreground">{h.label}</dt>
                      <dd className="font-heading text-3xl font-extrabold tracking-tight text-ink">
                        <NumberTicker value={h.value} />
                        <span className="text-xl text-brand">{h.suffix}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
                <dl className="mt-5 flex-1 divide-y text-sm">
                  {p.specs.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-right font-medium text-ink">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={`/products/${p.slug}/`} className="mt-5 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-semibold text-brand">
                  {p.name} details <TbArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
