import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { products } from "@/lib/products";
import { site, telHref } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-highlight via-violet to-magenta" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{site.description}</p>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}/`} className="transition-colors hover:text-white">{p.name}</Link>
              </li>
            ))}
            <li><Link href="/gallery/" className="transition-colors hover:text-white">Project gallery</Link></li>
            <li><Link href="/about/" className="transition-colors hover:text-white">About us</Link></li>
            <li><Link href="/contact/" className="transition-colors hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Get in touch</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-highlight" /><a href={telHref} className="hover:text-white">{site.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-highlight" /><a href={`mailto:${site.email}`} className="break-all hover:text-white">{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-0.5 size-4 shrink-0 text-highlight" />{site.address.street}, {site.address.city}</li>
            <li className="flex gap-3"><Clock className="mt-0.5 size-4 shrink-0 text-highlight" />{site.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-4 py-6 text-xs text-white/50 sm:px-6">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
