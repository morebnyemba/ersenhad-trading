import type { Metadata } from "next";
import { FaWhatsapp } from "react-icons/fa";
import { TbClock, TbMail, TbMapPin, TbPhone } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { Process } from "@/components/site/process";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import { contactFaqs } from "@/lib/faqs";
import { imageSrc } from "@/lib/gallery";
import { pageMeta } from "@/lib/seo";
import { site, telHref, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `Contact ${site.name} for a free, no-obligation quotation.`,
  path: "/contact/",
});

export default function Contact() {
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.country}`);
  const cards = [
    { icon: FaWhatsapp, label: "WhatsApp", value: "Fastest response", href: whatsappLink(`Hi ${site.name}`) },
    { icon: TbPhone, label: "Call us", value: site.phone, href: telHref },
    { icon: TbMail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: TbMapPin, label: "Visit", value: `${site.address.street}, ${site.address.city}`, href: `https://maps.google.com/?q=${mapQuery}` },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your project"
        description="Free, written, itemised quotations with no obligation. WhatsApp is the fastest way to reach us — we usually reply within one business day."
        image={imageSrc("gutter-white-downpipe")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="h-12 rounded-full bg-[#25D366] px-7 text-base font-semibold text-white hover:bg-[#1fb957]">
            <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener">
              <FaWhatsapp className="size-5" /> WhatsApp us
            </a>
          </Button>
          <Button asChild variant="outline" className="h-12 rounded-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
            <a href={telHref}>
              <TbPhone className="size-5" /> {site.phone}
            </a>
          </Button>
        </div>
      </PageHero>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="grid content-start gap-4">
          <ul className="grid gap-4">
            {cards.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 0.06}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener"
                  className="group flex items-center gap-4 rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-ink/5"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                    <c.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm text-muted-foreground">{c.label}</span>
                    <span className="block font-semibold break-words text-ink">{c.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ul>
          <Reveal className="rounded-2xl bg-ink p-6 text-white">
            <p className="flex items-center gap-2 font-semibold">
              <TbClock className="size-5 text-highlight" /> Office hours
            </p>
            <p className="mt-2 text-sm text-white/70">{site.hours}</p>
            <p className="mt-4 flex items-center gap-2 font-semibold">
              <TbMapPin className="size-5 text-highlight" /> Service area
            </p>
            <p className="mt-2 text-sm text-white/70">
              {site.address.city} and surrounding areas — ask us about projects further afield.
            </p>
          </Reveal>
        </div>
        <Reveal id="quote" delay={0.1} className="scroll-mt-28">
          <QuoteForm />
        </Reveal>
      </section>

      <Process
        tone="light"
        eyebrow="What happens next"
        title="After you get in touch"
        description="No pressure, no surprises — here's exactly how it works."
      />

      <FaqSection faqs={contactFaqs} title="Before you get in touch" className="border-t" />
    </>
  );
}
