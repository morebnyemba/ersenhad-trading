import Link from "next/link";
import { TbChevronRight } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Reveal } from "@/components/site/reveal";

// Shared navy page header (matches the home hero): logo-colour glows, optional
// decorative photo, breadcrumbs, eyebrow, title, description and actions.
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  crumbs: { href?: string; label: string }[];
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      {/* decorative backdrop as CSS background so route prefetches don't preload it */}
      {image && <div aria-hidden className="absolute inset-0 -z-20 bg-cover bg-center opacity-25" style={{ backgroundImage: `url(${image})` }} />}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40" />
        <div className="absolute -top-40 right-[-5%] size-[36rem] rounded-full bg-logo-blue/30 blur-[120px]" />
        <div className="absolute right-[25%] -bottom-48 size-[20rem] rounded-full bg-magenta/15 blur-[110px]" />
        <DotPattern className="text-white/[0.05] [mask-image:radial-gradient(ellipse_at_left,black_20%,transparent_70%)]" />
      </div>
      <Reveal className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:pt-16 lg:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/55">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                {i > 0 && <TbChevronRight aria-hidden className="size-3.5" />}
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-white">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white/85">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-8 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-highlight uppercase">
          <span aria-hidden className="h-0.5 w-6 rounded-full bg-magenta" />
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-5 max-w-2xl text-lg text-white/70 text-pretty">{description}</p>}
        {children && <div className="mt-8">{children}</div>}
      </Reveal>
    </section>
  );
}
