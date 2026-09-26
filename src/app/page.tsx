import Link from "next/link";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { ProductIcon } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";

const reasons = [
  { title: "Supply & install", body: "One team handles measuring, fabrication and installation — no subcontractor hand-offs." },
  { title: "Free site visits", body: "We measure on site and give you a clear, itemised quotation." },
  { title: "Quality materials", body: "Galvanised steel, UV-stabilised fabrics, recycled rubber and pre-painted aluminium." },
  { title: "Workmanship guarantee", body: "Every installation is backed by our workmanship guarantee." },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand to-emerald-500 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-100">{site.tagline}</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Protect, pave and drain — built to last.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-emerald-50">{site.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="rounded-full bg-accent px-6 py-3 font-semibold text-slate-900 hover:brightness-95">Request a free quote</a>
              <a href={whatsappLink(`Hi ${site.name}, I have a question.`)} target="_blank" rel="noopener" className="rounded-full border border-white/60 px-6 py-3 font-semibold hover:bg-white/10">Chat on WhatsApp</a>
            </div>
          </div>
          <div className="grid gap-4 self-center">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}/`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20">
                <ProductIcon icon={p.icon} className="h-10 w-10 shrink-0" />
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-emerald-50">{p.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900">What we do</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.map((p) => (
            <article key={p.slug} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <span className="grid h-14 w-14 place-items-center rounded-xl bg-brand/10 text-brand"><ProductIcon icon={p.icon} /></span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{p.name}</h3>
              <p className="mt-2 flex-1 text-slate-600">{p.short}</p>
              <ul className="mt-4 space-y-1 text-sm text-slate-600">
                {p.uses.slice(0, 3).map((u) => <li key={u}>✓ {u}</li>)}
              </ul>
              <Link href={`/products/${p.slug}/`} className="mt-6 font-semibold text-brand hover:underline">Learn more →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-slate-900">Why {site.name}?</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-slate-200 p-6">
                <p className="font-semibold text-slate-900">{r.title}</p>
                <p className="mt-2 text-sm text-slate-600">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900">Get a free quote</h2>
        <p className="mt-2 text-slate-600">Tell us about your project and we&apos;ll get back to you within one business day.</p>
        <div className="mt-8"><QuoteForm /></div>
      </section>
    </>
  );
}
