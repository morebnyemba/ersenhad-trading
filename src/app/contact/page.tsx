import type { Metadata } from "next";
import { site, whatsappLink } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";

export const metadata: Metadata = { title: "Contact", description: `Contact ${site.name} for a free quote.` };

export default function Contact() {
  const cards = [
    { label: "Call us", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { label: "WhatsApp", value: "Chat now", href: whatsappLink(`Hi ${site.name}`) },
    { label: "Email", value: site.email, href: `mailto:${site.email}` },
    { label: "Visit", value: `${site.address.street}, ${site.address.city}`, href: `https://maps.google.com/?q=${encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.country}`)}` },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-4xl font-extrabold text-slate-900">Contact us</h1>
      <p className="mt-2 text-slate-600">{site.hours}</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener" className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 hover:ring-brand">
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-1 break-words font-semibold text-slate-900">{c.value}</p>
          </a>
        ))}
      </div>
      <div className="mt-12 max-w-3xl"><QuoteForm /></div>
    </section>
  );
}
