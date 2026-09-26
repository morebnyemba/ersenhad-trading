import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-4xl font-extrabold text-slate-900">Page not found</h1>
      <Link href="/" className="mt-6 inline-block font-semibold text-brand hover:underline">Back to home</Link>
    </section>
  );
}
