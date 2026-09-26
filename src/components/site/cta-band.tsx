import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { TbArrowRight } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { site, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "Ready to start your project?",
  body = "Book a free site visit and get a clear, itemised quotation.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-8 py-12 text-white sm:px-12 sm:py-14">
        <div aria-hidden className="absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-logo-blue/40 blur-[90px]" />
        <div aria-hidden className="absolute -bottom-28 left-1/3 -z-10 size-72 rounded-full bg-magenta/25 blur-[90px]" />
        <DotPattern className="-z-10 text-white/[0.06]" />
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
            <p className="mt-3 max-w-xl text-lg text-white/70">{body}</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild className="h-12 rounded-full bg-highlight px-7 text-base font-semibold text-ink hover:bg-highlight/90">
              <Link href="/contact/#quote">Get a free quote <TbArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
              <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener">
                <FaWhatsapp className="text-[#25D366]" /> WhatsApp us
              </a>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
