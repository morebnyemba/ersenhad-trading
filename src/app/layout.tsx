import type { Metadata, Viewport } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { IntroLoader, introScript } from "@/components/site/intro-loader";
import { Providers } from "@/components/site/providers";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { TopBar } from "@/components/site/top-bar";
import { WhatsAppFab } from "@/components/site/whatsapp-fab";
import { products } from "@/lib/products";
import { homeTitle, ogImages } from "@/lib/seo";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const heading = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: homeTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: "website", locale: "en_ZW", title: homeTitle, description: site.description, url: "/", ...ogImages("home").openGraph },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description, ...ogImages("home").twitter },
  formatDetection: { telephone: false }, // keep our own tel: links styled; stop iOS auto-linking
};

export const viewport: Viewport = { themeColor: "#0f1d45" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/mark.png`,
  image: `${site.url}/og/home.jpg`,
  telephone: site.phone,
  email: site.email,
  description: site.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: site.address.countryCode,
  },
  makesOffer: products.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.name, description: p.short } })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: introScript sets data-intro on <html> before hydration
    <html lang="en" className={cn("font-sans antialiased", sans.variable, heading.variable)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body id="top" className="flex min-h-screen flex-col">
        <IntroLoader />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Providers>
          <TopBar />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <WhatsAppFab />
        </Providers>
      </body>
    </html>
  );
}
