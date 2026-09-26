"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { ProductIcon } from "@/components/site/product-icon";
import { imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { site, telHref, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];
const [home, ...rest] = links;

const linkClass = (active: boolean) =>
  cn(
    navigationMenuTriggerStyle(),
    "h-10 rounded-full bg-transparent px-4 text-muted-foreground hover:text-foreground",
    active && "bg-muted text-foreground",
  );

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const inServices = pathname.startsWith("/products/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-border/60 bg-background/80 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl" : "border-transparent bg-background",
      )}
    >
      <div className={cn("mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6", scrolled ? "h-16" : "h-20")}>
        <Logo />

        {/* Desktop nav */}
        <NavigationMenu viewport={false} className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild active={pathname === home.href} className={linkClass(pathname === home.href)}>
                <Link href={home.href}>{home.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={cn(linkClass(inServices), "data-[state=open]:bg-muted data-[state=open]:text-foreground")}>
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!mt-3 !rounded-2xl !p-0 !shadow-2xl !shadow-ink/10">
                <div className="w-[640px]">
                  <ul className="grid gap-1 p-3">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <NavigationMenuLink asChild active={pathname === `/products/${p.slug}/`}>
                          <Link href={`/products/${p.slug}/`} className="group/item flex items-center gap-4 rounded-xl p-3">
                            <span className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={imageSrc(p.cover, "sm")} alt="" className="size-full object-cover transition-transform duration-500 group-hover/item:scale-110" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center gap-2 font-semibold text-ink">
                                <ProductIcon icon={p.icon} className="size-4 text-brand" /> {p.name}
                              </span>
                              <span className="mt-1 line-clamp-2 block text-sm leading-snug text-muted-foreground">{p.short}</span>
                            </span>
                            <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover/item:translate-x-0.5 group-hover/item:text-brand group-hover/item:opacity-100" />
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between gap-4 border-t bg-muted/50 px-6 py-4">
                    <p className="text-sm text-muted-foreground">Not sure what you need? We&apos;ll advise on site — free.</p>
                    <NavigationMenuLink asChild className="shrink-0 p-0 hover:bg-transparent focus:bg-transparent">
                      <Link href="/contact/#quote" className="text-sm font-semibold text-brand hover:underline">
                        Book a site visit <ArrowRight className="size-3.5" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {rest.map((l) => (
              <NavigationMenuItem key={l.href}>
                <NavigationMenuLink asChild active={pathname === l.href} className={linkClass(pathname === l.href)}>
                  <Link href={l.href}>{l.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTAs */}
        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-3 rounded-full py-1.5 pr-4 pl-1.5 transition-colors hover:bg-muted xl:flex"
            aria-label={`Call ${site.phone}`}
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand/10 text-brand">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[0.7rem] font-medium tracking-wide text-muted-foreground uppercase">Call us</span>
              <span className="block text-sm font-semibold text-ink tabular-nums">{site.phone}</span>
            </span>
          </a>
          <Button asChild variant="outline" size="icon-lg" className="hidden size-10 rounded-full sm:inline-flex xl:hidden" aria-label={`Call ${site.phone}`}>
            <a href={telHref}><Phone /></a>
          </Button>
          <Button
            asChild
            className="group/cta hidden h-11 rounded-full bg-gradient-to-r from-brand to-brand-dark pr-2 pl-5 text-sm font-semibold shadow-lg shadow-brand/25 transition-shadow hover:shadow-xl hover:shadow-brand/35 sm:inline-flex"
          >
            <Link href="/contact/#quote">
              Free quote
              <span className="ml-1 grid size-7 place-items-center rounded-full bg-white/15 transition-transform group-hover/cta:translate-x-0.5">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="size-10 rounded-full lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full gap-0 sm:max-w-sm">
              <SheetHeader className="border-b">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
                <MobileLink href="/" active={pathname === "/"}>Home</MobileLink>
                <Collapsible defaultOpen={inServices}>
                  <CollapsibleTrigger className="group/c flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium hover:bg-muted">
                    Services <ChevronDown className="size-4 transition-transform group-data-[state=open]/c:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="grid gap-1 pt-1 pb-2 pl-3">
                    {products.map((p) => (
                      <SheetClose asChild key={p.slug}>
                        <Link
                          href={`/products/${p.slug}/`}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm hover:bg-muted",
                            pathname === `/products/${p.slug}/` && "bg-muted font-medium",
                          )}
                        >
                          <span className="grid size-9 place-items-center rounded-lg bg-brand/10 text-brand"><ProductIcon icon={p.icon} className="size-4" /></span>
                          {p.name}
                        </Link>
                      </SheetClose>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
                {rest.map((l) => (
                  <MobileLink key={l.href} href={l.href} active={pathname === l.href}>{l.label}</MobileLink>
                ))}
              </nav>
              <div className="grid gap-2 border-t p-4">
                <SheetClose asChild>
                  <Button asChild className="h-12 rounded-full text-base">
                    <Link href="/contact/#quote">Get a free quote <ArrowRight /></Link>
                  </Button>
                </SheetClose>
                <div className="grid grid-cols-2 gap-2">
                  <Button asChild variant="outline" className="h-11 rounded-full">
                    <a href={telHref}><Phone /> Call</a>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-full">
                    <a href={whatsappLink(`Hi ${site.name}`)} target="_blank" rel="noopener"><MessageCircle /> WhatsApp</a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MobileLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <Link href={href} aria-current={active ? "page" : undefined} className={cn("rounded-xl px-3 py-3 text-base font-medium hover:bg-muted", active && "bg-muted")}>
        {children}
      </Link>
    </SheetClose>
  );
}
