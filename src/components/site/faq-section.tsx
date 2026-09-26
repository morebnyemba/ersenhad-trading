import { FaWhatsapp } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import type { Faq } from "@/lib/faqs";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

// FAQ block + FAQPage structured data. Render at most one per page (one FAQPage schema).
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  eyebrow = "FAQ",
  className,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  className?: string;
}) {
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section className={cn("mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[1fr_1.6fr]", className)}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <Reveal className="mt-8 rounded-3xl bg-ink p-7 text-white">
          <p className="font-heading text-xl font-bold">Still have a question?</p>
          <p className="mt-2 text-sm text-white/70">Message us on WhatsApp — photos of your site are welcome.</p>
          <Button asChild className="mt-5 h-11 rounded-full bg-[#25D366] px-5 text-white hover:bg-[#1fb957]">
            <a href={whatsappLink(`Hi ${site.name}, I have a question.`)} target="_blank" rel="noopener">
              <FaWhatsapp className="size-5" /> Ask on WhatsApp
            </a>
          </Button>
        </Reveal>
      </div>
      <Reveal delay={0.05}>
        <Accordion type="single" collapsible defaultValue="faq-0" className="rounded-3xl border bg-card px-6 shadow-sm">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`faq-${i}`}>
              <AccordionTrigger className="py-5 text-base font-semibold text-ink hover:no-underline">{f.q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
