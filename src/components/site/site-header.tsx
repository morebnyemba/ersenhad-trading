"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { products } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  ...products.map((p) => ({ href: `/products/${p.slug}/`, label: p.name.replace("Interlocking ", "") })),
  { href: "/gallery/", label: "Gallery" },
  { href: "/contact/", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "border-b border-border/60 bg-background/80 shadow-sm backdrop-blur-xl" : "bg-background",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={pathname === n.href ? "page" : undefined}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                pathname === n.href && "bg-muted text-foreground",
              )}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden h-10 rounded-full px-5 sm:inline-flex">
            <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener">
              <MessageCircle /> Get a quote
            </a>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                {nav.map((n) => (
                  <SheetClose asChild key={n.href}>
                    <Link href={n.href} className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">
                      {n.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto p-4">
                <Button asChild className="h-11 w-full rounded-full">
                  <a href={whatsappLink(`Hi ${site.name}, I'd like a quote.`)} target="_blank" rel="noopener">
                    <MessageCircle /> Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
