import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-heading text-7xl font-extrabold text-brand/20">404</p>
      <h1 className="mt-4 font-heading text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Button asChild className="mt-8 h-11 rounded-full px-6">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
