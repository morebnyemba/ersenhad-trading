import Link from "next/link";
import { TbArrowRight } from "react-icons/tb";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { products } from "@/lib/products";

// "Specs at a glance": two key figures per service, on light cards for contrast.
export function Specs() {
  return (
    <section className="bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <SectionHeading eyebrow="Specs at a glance" title="The numbers behind every installation" description="Real specifications, not slogans — the figures that matter when you compare quotes." />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="group relative flex flex-col overflow-hidden rounded-3xl border bg-background p-7 shadow-sm transition-shadow hover:shadow-xl hover:shadow-ink/5">
              <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-logo-cyan via-logo-blue to-magenta" />
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-brand/10 text-brand">
                  <ProductIcon icon={p.icon} className="size-5" />
                </span>
                <h3 className="font-semibold text-ink">{p.name}</h3>
              </div>
              <dl className="mt-7 grid flex-1 grid-cols-2 gap-6">
                {p.highlights.map((h) => (
                  // dt must precede dd; flex-col-reverse shows the figure first
                  <div key={h.label} className="flex flex-col-reverse">
                    <dt className="mt-1 text-sm text-muted-foreground">{h.label}</dt>
                    <dd className="font-heading text-4xl font-extrabold tracking-tight text-ink">
                      <NumberTicker value={h.value} />
                      <span className="text-2xl text-brand">{h.suffix}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <Link href={`/products/${p.slug}/`} className="mt-7 inline-flex items-center gap-1.5 border-t pt-5 text-sm font-semibold text-brand">
                {p.name} details <TbArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
