import Link from "next/link";
import { TbArrowRight, TbCalculator } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { products } from "@/lib/products";

const prompts: Record<string, string> = {
  "car-shades": "How many cars?",
  "rubber-tiles": "How big is the floor?",
  "seamless-gutters": "How big & how tall is the house?",
};

export function PlannerTeaser() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-8 text-white sm:p-12">
        <div aria-hidden className="absolute -top-24 -right-10 -z-10 size-80 rounded-full bg-logo-blue/40 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-32 left-10 -z-10 size-72 rounded-full bg-magenta/20 blur-[90px]" />
        <DotPattern className="-z-10 text-white/[0.06]" />
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-highlight uppercase">
              <TbCalculator className="size-4" /> Project planner
            </span>
            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">Estimate your project in a minute</h2>
            <p className="mt-3 text-lg text-white/70">See the layout and quantities instantly, then send them to us for a free quotation.</p>
          </div>
          <ul className="grid gap-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/estimate/?service=${p.slug}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 transition-all hover:-translate-y-0.5 hover:border-magenta/40 hover:bg-white/[0.08]"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/10 text-highlight transition-colors group-hover:bg-gradient-to-br group-hover:from-logo-blue group-hover:to-magenta group-hover:text-white">
                    <ProductIcon icon={p.icon} className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{p.name}</span>
                    <span className="block text-sm text-white/60">{prompts[p.slug]}</span>
                  </span>
                  <TbArrowRight className="size-5 shrink-0 text-white/40 transition-all group-hover:translate-x-1 group-hover:text-magenta" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
