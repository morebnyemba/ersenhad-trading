import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
import { TbFileInvoice, TbHammer, TbRulerMeasure, TbShieldCheck } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

type Step = { icon: IconType; title: string; body: string };

// Only commitments the site already makes elsewhere — no invented timelines.
export const processSteps: Step[] = [
  { icon: FaWhatsapp, title: "Enquire", body: "WhatsApp, call or use the quote form. Photos of your site help us advise faster." },
  { icon: TbRulerMeasure, title: "Free site visit", body: "We measure, check access and ground conditions, and advise on materials and layout." },
  { icon: TbFileInvoice, title: "Itemised quotation", body: "A written quote listing materials, costs and timeline — no hidden extras." },
  { icon: TbHammer, title: "Supply & install", body: "Our own team supplies and installs, keeping your property safe and tidy." },
  { icon: TbShieldCheck, title: "Hand-over & guarantee", body: "We walk you through the finished job, backed by our written workmanship guarantee." },
];

export function Process({
  eyebrow = "Our process",
  title = "From first message to finished installation",
  description = "Five clear steps, one accountable team — you always know what happens next.",
  tone = "dark",
  steps = processSteps,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  tone?: "dark" | "light";
  steps?: Step[];
}) {
  const dark = tone === "dark";
  return (
    <section className={cn("relative overflow-hidden py-24", dark ? "bg-ink text-white" : "bg-background")}>
      {dark && (
        <>
          <DotPattern className="text-white/[0.05]" />
          <div aria-hidden className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-logo-blue/20 blur-[120px]" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading inverted={dark} align="center" eyebrow={eyebrow} title={title} description={description} />

        <ol className="relative mt-16 grid gap-8 lg:grid-cols-5 lg:gap-6">
          {/* connector: vertical on mobile, horizontal on desktop — logo gradient */}
          <div aria-hidden className="absolute top-2 bottom-2 left-7 w-px bg-gradient-to-b from-logo-cyan via-logo-blue to-magenta opacity-50 lg:top-7 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-gradient-to-r" />
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
              <span
                className={cn(
                  "relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl ring-1 shadow-lg",
                  dark ? "bg-ink text-highlight ring-white/15 shadow-black/30" : "bg-background text-brand ring-border shadow-ink/5",
                )}
              >
                <s.icon className="size-6" />
                <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-gradient-to-br from-logo-blue to-magenta text-[0.7rem] font-bold text-white">
                  {i + 1}
                </span>
              </span>
              <div className="lg:mt-6">
                <h3 className={cn("text-lg font-semibold", !dark && "text-ink")}>{s.title}</h3>
                <p className={cn("mt-2 text-sm leading-relaxed", dark ? "text-white/60" : "text-muted-foreground")}>{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
