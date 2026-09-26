import Link from "next/link";
import type { IconType } from "react-icons";
import { FaWhatsapp } from "react-icons/fa";
import { TbArrowRight, TbArrowUp, TbCalculator, TbClock, TbExternalLink, TbMail, TbMapPin, TbPhone } from "react-icons/tb";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { Logo } from "@/components/site/logo";
import { ProductIcon } from "@/components/site/product-icon";
import { quoteHref } from "@/lib/links";
import { products } from "@/lib/products";
import { credit, site, telHref, whatsappLink } from "@/lib/site";

const company = [
  { href: "/", label: "Home" },
  { href: "/gallery/", label: "Project gallery" },
  { href: "/about/", label: "About us" },
  { href: "/contact/", label: "Contact" },
];

const heading = "text-xs font-semibold tracking-[0.18em] text-white uppercase";
const link = "text-sm text-white/65 transition-colors hover:text-white";

export function SiteFooter() {
  const mapQuery = encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.country}`);
  const contact: { icon: IconType; label: string; value: string; href: string; external?: boolean }[] = [
    { icon: TbPhone, label: "Call", value: site.phone, href: telHref },
    { icon: FaWhatsapp, label: "WhatsApp", value: "Chat with us", href: whatsappLink(`Hi ${site.name}`), external: true },
    { icon: TbMail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: TbMapPin, label: "Visit", value: `${site.address.street}, ${site.address.city}`, href: `https://maps.google.com/?q=${mapQuery}`, external: true },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white/70">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-logo-cyan via-logo-blue to-magenta" />
      <div aria-hidden className="absolute -top-40 -left-24 -z-10 size-96 rounded-full bg-logo-blue/20 blur-[110px]" />
      <div aria-hidden className="absolute -right-24 -bottom-40 -z-10 size-80 rounded-full bg-magenta/10 blur-[110px]" />
      <DotPattern className="-z-10 text-white/[0.035]" />

      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-16 pb-12 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-20">
        {/* Brand + primary actions */}
        <div className="lg:col-span-4">
          <Logo inverted />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={quoteHref()}
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-highlight px-5 text-sm font-semibold text-ink transition-colors hover:bg-highlight/90"
            >
              Get a free quote <TbArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)}
              target="_blank"
              rel="noopener"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              <FaWhatsapp className="size-4 text-[#25D366]" /> WhatsApp
            </a>
          </div>
          <p className="mt-4 text-xs text-white/45">Free, no-obligation quotations.</p>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <p className={heading}>Services</p>
            <ul className="mt-5 space-y-3">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}/`} className={`${link} inline-flex items-center gap-2`}>
                    <ProductIcon icon={p.icon} className="size-4 text-highlight" /> {p.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href={quoteHref()} className={`${link} inline-flex items-center gap-2`}>
                  <TbCalculator aria-hidden className="size-4 text-highlight" /> Project planner
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className={heading}>Company</p>
            <ul className="mt-5 space-y-3">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={link}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Contact */}
        <div className="lg:col-span-4">
          <p className={heading}>Get in touch</p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {contact.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener" : undefined}
                  className="group flex items-center gap-3 rounded-xl p-2 -m-2 transition-colors hover:bg-white/5"
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10 text-highlight transition-colors group-hover:bg-gradient-to-br group-hover:from-logo-blue group-hover:to-magenta group-hover:text-white">
                    <c.icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-white/45">{c.label}</span>
                    <span className="block truncate text-sm font-medium text-white/85 group-hover:text-white">{c.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
            <p className="flex items-start gap-2.5">
              <TbClock className="mt-0.5 size-4 shrink-0 text-highlight" /> {site.hours}
            </p>
            <p className="flex items-start gap-2.5">
              <TbMapPin className="mt-0.5 size-4 shrink-0 text-highlight" /> Serving {site.address.city} and surrounds
            </p>
          </div>
        </div>
      </div>

      {/* Copyright strip */}
      <div className="border-t border-white/10 bg-black/20">
        {/* extra bottom padding on phones clears the floating WhatsApp button / planner bar */}
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 pt-5 pb-24 text-xs text-white/50 sm:px-6 sm:pb-5 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Website by
            <a
              href={credit.url}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-semibold text-white/80 transition-colors hover:text-highlight"
            >
              {credit.name} <TbExternalLink aria-hidden className="size-3.5" />
            </a>
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 font-medium text-white/60 transition-colors hover:text-white">
            Back to top <TbArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
