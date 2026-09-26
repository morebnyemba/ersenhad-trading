"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TbArrowRight, TbChevronDown, TbChevronRight, TbMail, TbMenu2, TbPhone } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { NavigationMenu as NavPrimitive } from "radix-ui";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/site/logo";
import { ProductIcon } from "@/components/site/product-icon";
import { imageSrc } from "@/lib/gallery";
import { products } from "@/lib/products";
import { site, telHref, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const QUOTE_HREF = "/contact/#quote";
const links = [
  { href: "/gallery/", label: "Gallery" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

const navItem =
  "relative inline-flex h-10 items-center rounded-full px-4 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50";

/** Brand underline that slides between nav items; sits on the header's bottom edge. */
function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active"
      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
      className="absolute inset-x-3 -bottom-4 h-[3px] rounded-t-full bg-gradient-to-r from-brand to-magenta"
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const inServices = pathname.startsWith("/products/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background transition-[box-shadow,border-color] duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_rgb(15_29_69/0.25)]" : "border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-[72px]">
        <Logo className="mr-auto lg:mr-0" />

        {/* ── Desktop navigation ── */}
        <NavigationMenu viewport={false} className="mx-auto hidden lg:flex">
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavPrimitive.Link asChild active={pathname === "/"}>
                <Link href="/" className={cn(navItem, pathname === "/" && "text-foreground")}>
                  Home
                  {pathname === "/" && <ActiveBar />}
                </Link>
              </NavPrimitive.Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  navItem,
                  "bg-transparent data-[state=open]:bg-muted/70 data-[state=open]:text-foreground",
                  inServices && "text-foreground",
                )}
              >
                Services
                {inServices && <ActiveBar />}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="!mt-3 !rounded-2xl !border-0 !p-0 !shadow-2xl !shadow-ink/15 !ring-1 !ring-border">
                <div className="grid w-[680px] grid-cols-[1fr_220px]">
                  <ul className="grid gap-1 p-3">
                    {products.map((p) => (
                      <li key={p.slug}>
                        <NavPrimitive.Link asChild active={pathname === `/products/${p.slug}/`}>
                          <Link href={`/products/${p.slug}/`} className="group/item flex items-center gap-4 rounded-xl p-2.5 transition-colors outline-none hover:bg-muted focus-visible:bg-muted data-[active]:bg-muted">
                            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand/10 text-brand transition-colors group-hover/item:bg-brand group-hover/item:text-white">
                              <ProductIcon icon={p.icon} className="size-5" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-semibold text-ink">{p.name}</span>
                              <span className="mt-0.5 line-clamp-2 block text-[0.8rem] leading-snug text-muted-foreground">{p.short}</span>
                            </span>
                          </Link>
                        </NavPrimitive.Link>
                      </li>
                    ))}
                  </ul>
                  <div className="relative m-2 flex flex-col justify-end overflow-hidden rounded-xl bg-ink p-5 text-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imageSrc("shade-residential-carport", "sm")} alt="" className="absolute inset-0 size-full object-cover opacity-40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
                    <div className="relative">
                      <p className="font-heading text-lg leading-tight font-bold">Not sure what you need?</p>
                      <p className="mt-1.5 text-sm text-white/70">We&apos;ll assess your site and advise — free of charge.</p>
                      <NavPrimitive.Link asChild>
                        <Link href={QUOTE_HREF} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-highlight hover:underline">
                          Book a site visit <TbArrowRight className="size-4" />
                        </Link>
                      </NavPrimitive.Link>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {links.map((l) => (
              <NavigationMenuItem key={l.href}>
                <NavPrimitive.Link asChild active={pathname === l.href}>
                  <Link href={l.href} className={cn(navItem, pathname === l.href && "text-foreground")}>
                    {l.label}
                    {pathname === l.href && <ActiveBar />}
                  </Link>
                </NavPrimitive.Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* ── Primary CTA (all sizes) ── */}
        <Button
          asChild
          className="group/cta h-10 rounded-full bg-gradient-to-r from-brand to-brand-dark pr-1.5 pl-4 text-sm font-semibold shadow-md shadow-brand/25 transition-[box-shadow,filter] hover:shadow-lg hover:shadow-brand/35 hover:brightness-110 lg:h-11 lg:pl-5"
        >
          <Link href={QUOTE_HREF}>
            <span className="sm:hidden">Quote</span>
            <span className="hidden sm:inline">Get a free quote</span>
            <span className="ml-1 grid size-7 place-items-center rounded-full bg-white/20 transition-transform group-hover/cta:translate-x-0.5 lg:size-8">
              <TbArrowRight className="size-4" />
            </span>
          </Link>
        </Button>

        {/* ── Mobile menu ── */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon-lg" className="-mr-1.5 size-10 rounded-full lg:hidden" aria-label="Open menu">
              <TbMenu2 className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full gap-0 p-0 sm:max-w-sm">
            <SheetHeader className="h-16 flex-row items-center border-b px-4">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>
              <Logo />
            </SheetHeader>

            <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto p-3" aria-label="Mobile">
              <MobileLink href="/" active={pathname === "/"}>Home</MobileLink>
              <Collapsible defaultOpen>
                <CollapsibleTrigger
                  className={cn(
                    "group/c flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-muted",
                    inServices && "text-brand",
                  )}
                >
                  Services
                  <TbChevronDown className="size-5 text-muted-foreground transition-transform duration-200 group-data-[state=open]/c:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                  <ul className="mt-1 mb-2 ml-4 grid gap-0.5 border-l pl-3">
                    {products.map((p) => {
                      const active = pathname === `/products/${p.slug}/`;
                      return (
                        <li key={p.slug}>
                          <SheetClose asChild>
                            <Link
                              href={`/products/${p.slug}/`}
                              aria-current={active ? "page" : undefined}
                              className={cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-[0.95rem] transition-colors hover:bg-muted", active && "bg-brand/10 font-medium text-brand")}
                            >
                              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
                                <ProductIcon icon={p.icon} className="size-4" />
                              </span>
                              {p.name}
                            </Link>
                          </SheetClose>
                        </li>
                      );
                    })}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
              {links.map((l) => (
                <MobileLink key={l.href} href={l.href} active={pathname === l.href}>{l.label}</MobileLink>
              ))}
            </nav>

            <div className="grid gap-3 border-t bg-muted/40 p-4">
              <SheetClose asChild>
                <Button asChild className="h-12 rounded-full bg-gradient-to-r from-brand to-brand-dark text-base font-semibold">
                  <Link href={QUOTE_HREF}>Get a free quote <TbArrowRight /></Link>
                </Button>
              </SheetClose>
              <div className="grid grid-cols-2 gap-2">
                <Button asChild variant="outline" className="h-11 rounded-full bg-background">
                  <a href={telHref}><TbPhone /> Call</a>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-full bg-background">
                  <a href={whatsappLink(`Hi ${site.name}`)} target="_blank" rel="noopener"><FaWhatsapp /> WhatsApp</a>
                </Button>
              </div>
              <a href={`mailto:${site.email}`} className="flex items-center justify-center gap-2 pt-1 text-sm text-muted-foreground hover:text-foreground">
                <TbMail className="size-4" /> {site.email}
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors hover:bg-muted",
          active && "bg-brand/10 text-brand",
        )}
      >
        {children}
        <TbChevronRight className={cn("size-4", active ? "text-brand" : "text-muted-foreground/60")} />
      </Link>
    </SheetClose>
  );
}
