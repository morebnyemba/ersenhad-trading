import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TbArrowRight, TbArrowUpRight, TbCircleCheck } from "react-icons/tb";
import { Spotlight } from "@/components/aceternity/spotlight";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductIcon } from "@/components/site/product-icon";
import { Reveal } from "@/components/site/reveal";
import { TypedText } from "@/components/site/typed-text";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

const typed = ["car shade ports.", "rubber floor tiles.", "seamless gutters."];
const trust = ["Free, no-obligation quotes", "One accountable team", "Workmanship guarantee"];

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* Background: brand-colour glows (logo cyan → blue → magenta), dot grid, spotlight */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-logo-blue/35 blur-[120px]" />
        <div className="absolute top-1/3 -left-40 size-[26rem] rounded-full bg-logo-cyan/15 blur-[110px]" />
        <div className="absolute right-[18%] -bottom-48 size-[22rem] rounded-full bg-magenta/20 blur-[120px]" />
        <DotPattern className="text-white/[0.06] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
      <Spotlight className="-top-40 left-0 md:-top-24 md:left-40" fill="var(--color-sky)" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 pt-10 pb-10 sm:px-6 sm:pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pt-20 lg:pb-16">
        {/* ── Copy ── */}
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1 pr-3 pl-1 text-xs font-medium text-white/80 backdrop-blur">
            <span className="rounded-full bg-magenta px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase">Free</span>
            Quotations in {site.address.city} &amp; surrounds
          </span>

          <h1 className="mt-6 font-heading text-[2.4rem] leading-[1.05] font-extrabold tracking-tight text-balance min-[400px]:text-[2.6rem] sm:text-6xl lg:text-[3.4rem] xl:text-[4.25rem]">
            We design &amp; install premium
            <TypedText
              strings={typed}
              className="block pb-1 whitespace-nowrap"
              textClassName="bg-gradient-to-r from-logo-cyan via-sky to-magenta bg-clip-text text-transparent after:bg-magenta"
            />
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70 text-pretty">
            Shade that protects your vehicles, flooring that protects people, and gutters that protect your walls — supplied and
            installed by one accountable team.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild className="group h-12 rounded-full bg-highlight px-7 text-base font-semibold text-ink shadow-lg shadow-highlight/20 hover:bg-highlight/90">
              <Link href="/contact/#quote">
                Get a free quote <TbArrowRight className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white backdrop-blur hover:bg-white/10 hover:text-white"
            >
              <a href={whatsappLink(`Hi ${site.name}, I have a question.`)} target="_blank" rel="noopener">
                <FaWhatsapp className="text-[#25D366]" /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <TbCircleCheck className="size-5 text-highlight" /> {t}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ── Desktop only: photo carousel. Hidden (and never downloaded) on mobile. ── */}
        <div className="hidden lg:block lg:pl-6">
          <HeroCarousel />
        </div>
      </div>

      {/* ── Service strip ── */}
      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:pb-16">
        <ul className="grid gap-3 md:grid-cols-3">
          {products.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={0.2 + i * 0.08}>
              <Link
                href={`/products/${p.slug}/`}
                className="group flex h-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 backdrop-blur sm:p-4 transition-all hover:-translate-y-0.5 hover:border-magenta/40 hover:bg-white/[0.07]"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white/10 sm:size-12 text-highlight ring-1 ring-white/15 transition-colors group-hover:bg-gradient-to-br group-hover:from-logo-blue group-hover:to-magenta group-hover:text-white">
                  <ProductIcon icon={p.icon} className="size-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{p.name}</span>
                  <span className="mt-0.5 line-clamp-1 hidden text-sm text-white/55 sm:block">{p.short}</span>
                </span>
                <TbArrowUpRight className="size-5 shrink-0 text-white/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-magenta" />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
