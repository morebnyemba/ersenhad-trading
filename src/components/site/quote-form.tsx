"use client";

import { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BorderBeam } from "@/components/magicui/border-beam";
import { getProduct, products, type ProductSlug } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

// Client-only: composes the enquiry and hands it to WhatsApp (primary) or email.
// No backend, no stored PII, no endpoint to spam.
export function QuoteForm({ defaultProduct = "car-shades" }: { defaultProduct?: ProductSlug }) {
  const [slug, setSlug] = useState<ProductSlug>(defaultProduct);
  const product = getProduct(slug)!;

  function compose(form: HTMLFormElement) {
    const d = new FormData(form);
    return [
      `Quote request — ${product.name}`,
      `Name: ${d.get("name")}`,
      `Phone: ${d.get("phone")}`,
      `Location: ${d.get("location")}`,
      ...product.quoteFields.map((f, i) => `${f.label}: ${d.get(`f${i}`) || "-"}`),
      d.get("notes") ? `Notes: ${d.get("notes")}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    window.open(whatsappLink(compose(e.currentTarget)), "_blank", "noopener");
  }

  function onEmail(e: React.MouseEvent<HTMLButtonElement>) {
    const form = e.currentTarget.form!;
    if (!form.reportValidity()) return;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Quote request — ${product.name}`)}&body=${encodeURIComponent(compose(form))}`;
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-5 rounded-3xl border bg-card p-6 shadow-xl shadow-ink/5 sm:grid-cols-2 sm:p-8">
      <BorderBeam duration={10} size={260} />
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="q-product">What do you need?</Label>
        <Select value={slug} onValueChange={(v) => setSlug(v as ProductSlug)}>
          <SelectTrigger id="q-product" className="h-11 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {products.map((p) => (
              <SelectItem key={p.slug} value={p.slug}>{p.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="q-name">Full name</Label>
        <Input id="q-name" name="name" required autoComplete="name" className="h-11" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="q-phone">Phone</Label>
        <Input id="q-phone" name="phone" type="tel" required autoComplete="tel" className="h-11" />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="q-location">Site location</Label>
        <Input id="q-location" name="location" required placeholder="Suburb, city" className="h-11" />
      </div>
      {product.quoteFields.map((f, i) => (
        <div key={`${slug}-${i}`} className="grid gap-2">
          <Label htmlFor={`q-f${i}`}>{f.label}</Label>
          <Input id={`q-f${i}`} name={`f${i}`} placeholder={f.placeholder} className="h-11" />
        </div>
      ))}
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="q-notes">Anything else?</Label>
        <Textarea id="q-notes" name="notes" rows={3} placeholder="Access, timelines, colours…" />
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
        <Button type="submit" className="h-12 flex-1 rounded-full bg-[#25D366] text-base text-white hover:bg-[#1fb957]">
          <MessageCircle className="size-5" /> Send via WhatsApp
        </Button>
        <Button type="button" variant="outline" onClick={onEmail} className="h-12 flex-1 rounded-full text-base">
          <Mail className="size-5" /> Send via email
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground sm:col-span-2">
        Free site visit and itemised quotation. We usually reply within one business day.
      </p>
    </form>
  );
}
