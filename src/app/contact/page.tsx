import type { Metadata } from "next";
import { TbClock, TbMail, TbMapPin, TbPhone } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { QuoteForm } from "@/components/site/quote-form";
import { Reveal } from "@/components/site/reveal";
import { pageMeta } from "@/lib/seo";
import { site, telHref, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `Contact ${site.name} for a free site visit and quote.`,
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
      <section className="relative overflow-hidden border-b bg-muted/40">
        <DotPattern className="text-ink/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <Reveal className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-sm font-semibold tracking-[0.18em] text-brand uppercase">Contact</p>
          <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">Let&apos;s talk about your project</h1>
          <p className="mt-4 flex items-center gap-2 text-muted-foreground"><TbClock className="size-4" /> {site.hours}</p>
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <ul className="grid content-start gap-4">
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
        <Reveal id="quote" delay={0.1} className="scroll-mt-28">
          <QuoteForm />
        </Reveal>
      </section>
    </>
  );
}
