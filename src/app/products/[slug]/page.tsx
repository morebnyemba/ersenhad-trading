import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { ProductIcon } from "@/components/Icon";
import { QuoteForm } from "@/components/QuoteForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return { title: p.name, description: p.short, alternates: { canonical: `/products/${p.slug}/` } };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: p.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="bg-gradient-to-br from-brand-dark to-brand text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-white/15"><ProductIcon icon={p.icon} className="h-12 w-12" /></span>
          <div>
            <h1 className="text-4xl font-extrabold">{p.name}</h1>
            <p className="mt-3 max-w-2xl text-lg text-emerald-50">{p.intro}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:grid-cols-2">
        {p.features.map((f) => (
          <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <p className="font-semibold text-slate-900">{f.title}</p>
            <p className="mt-2 text-slate-600">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Options</h2>
            <ul className="mt-4 space-y-2 text-slate-700">{p.options.map((o) => <li key={o}>• {o}</li>)}</ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Ideal for</h2>
            <ul className="mt-4 space-y-2 text-slate-700">{p.uses.map((u) => <li key={u}>✓ {u}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900">Frequently asked questions</h2>
        <div className="mt-6 space-y-3">
          {p.faqs.map((f) => (
            <details key={f.q} className="group rounded-xl bg-white p-5 ring-1 ring-slate-200">
              <summary className="cursor-pointer font-semibold text-slate-900">{f.q}</summary>
              <p className="mt-2 text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="quote" className="mx-auto max-w-3xl scroll-mt-24 px-4 pb-20">
        <h2 className="text-2xl font-bold text-slate-900">Request a {p.name.toLowerCase()} quote</h2>
        <div className="mt-6"><QuoteForm defaultProduct={p.slug} /></div>
      </section>
    </>
  );
}
