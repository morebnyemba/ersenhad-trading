import Link from "next/link";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-white">E</span>
          <span className="leading-tight">
            Ersenhad<span className="block text-xs font-medium text-slate-500">Trading</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}/`} className="hover:text-brand">{p.name}</Link>
          ))}
          <Link href="/contact/" className="hover:text-brand">Contact</Link>
        </nav>
        <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-dark">
          Get a quote
        </a>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-slate-100 px-4 py-2 text-sm text-slate-700 md:hidden">
        {products.map((p) => (
          <Link key={p.slug} href={`/products/${p.slug}/`} className="whitespace-nowrap">{p.name}</Link>
        ))}
        <Link href="/contact/">Contact</Link>
      </nav>
    </header>
  );
}
