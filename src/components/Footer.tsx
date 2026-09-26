import Link from "next/link";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-bold text-white">{site.name}</p>
          <p className="mt-2 text-sm">{site.description}</p>
        </div>
        <div>
          <p className="font-semibold text-white">Products</p>
          <ul className="mt-2 space-y-1 text-sm">
            {products.map((p) => (
              <li key={p.slug}><Link href={`/products/${p.slug}/`} className="hover:text-white">{p.name}</Link></li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold text-white">Contact</p>
          <p className="mt-2"><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-white">{site.phone}</a></p>
          <p><a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a></p>
          <p className="mt-2">{site.address.street}, {site.address.city}, {site.address.country}</p>
          <p className="mt-2">{site.hours}</p>
        </div>
      </div>
      <p className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
