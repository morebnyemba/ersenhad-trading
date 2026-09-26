"use client";

import { useState } from "react";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

// Client-only quote form: composes the enquiry and hands it to WhatsApp (primary)
// or email. No backend, no PII stored on our side, no spam endpoint to abuse.
export function QuoteForm({ defaultProduct }: { defaultProduct?: string }) {
  const [slug, setSlug] = useState(defaultProduct ?? products[0].slug);
  const product = products.find((p) => p.slug === slug)!;

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    const lines = [
      `Quote request — ${product.name}`,
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Location: ${d.get("location")}`,
      ...product.quoteFields.map((f, i) => `${f.label}: ${d.get(`f${i}`) || "-"}`),
      d.get("notes") ? `Notes: ${d.get("notes")}` : "",
    ];
    return lines.filter(Boolean).join("\n");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(whatsappLink(compose(e.currentTarget)), "_blank", "noopener");
  }

  function onEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form!;
    if (!form.reportValidity()) return;
    const body = compose(form);
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Quote request — ${product.name}`)}&body=${encodeURIComponent(body)}`;
  }

  const input = "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30";

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200 sm:grid-cols-2">
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">
        Product
        <select name="product" value={slug} onChange={(e) => setSlug(e.target.value)} className={input}>
          {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
        </select>
      </label>
      <label className="text-sm font-medium text-slate-700">Full name<input name="name" required autoComplete="name" className={input} /></label>
      <label className="text-sm font-medium text-slate-700">Phone<input name="phone" type="tel" required autoComplete="tel" className={input} /></label>
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">Site location<input name="location" required placeholder="Suburb, city" className={input} /></label>
      {product.quoteFields.map((f, i) => (
        <label key={`${slug}-${i}`} className="text-sm font-medium text-slate-700">
          {f.label}<input name={`f${i}`} placeholder={f.placeholder} className={input} />
        </label>
      ))}
      <label className="text-sm font-medium text-slate-700 sm:col-span-2">Anything else?<textarea name="notes" rows={3} className={input} /></label>
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button type="submit" className="rounded-full bg-[#25D366] px-6 py-3 font-semibold text-white hover:brightness-95">Send via WhatsApp</button>
        <button type="button" onClick={onEmail} className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">Send via email</button>
      </div>
    </form>
  );
}
