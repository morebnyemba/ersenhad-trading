import { getProduct, products, type ProductSlug } from "@/lib/products";
import { site } from "@/lib/site";

// Link-preview cards. Each is rendered at build time to a static JPEG at
// /og/<key>.jpg by src/app/og/[image]/route.ts. Real files with an extension
// matter: WhatsApp/Facebook don't follow redirects for og:image and ignore
// octet-stream, and WhatsApp drops images over ~600 KB (these are ~100 KB).
export type OgCard = {
  key: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  photo: string;
  chips?: string[];
};

const pages: OgCard[] = [
  {
    key: "home",
    alt: `${site.name} — car shades, rubber tiles and seamless gutters`,
    eyebrow: `Supply & installation · ${site.address.country}`,
    title: "Protect, pave and drain — built to last.",
    subtitle: "Cantilever, curved and Chromadek car shades, interlocking rubber tiles and seamless gutters.",
    photo: "shade-curved-suv",
  },
  {
    key: "about",
    alt: `About ${site.name}`,
    eyebrow: "About us",
    title: "One accountable team, three specialities.",
    subtitle: "We measure, supply and install — from first measurement to the final hand-over.",
    photo: "shade-chromadek-install",
  },
  {
    key: "gallery",
    alt: `${site.name} project gallery`,
    eyebrow: "Project gallery",
    title: "Our work, up close.",
    subtitle: "Car shade, rubber flooring and guttering installations.",
    photo: "shade-cantilever-entrance",
  },
  {
    key: "contact",
    alt: `Contact ${site.name}`,
    eyebrow: "Free quotation",
    title: "Let's talk about your project.",
    subtitle: "WhatsApp, call or email us for a free, itemised quotation.",
    photo: "gutter-white-downpipe",
  },
  {
    key: "estimate",
    alt: `${site.name} project planner`,
    eyebrow: "Project planner",
    title: "Estimate your project in a minute.",
    subtitle: "Car count, floor size or house size in — layout, quantities and an estimated price out.",
    photo: "shade-cantilever-courtyard",
  },
];

const productCards: OgCard[] = products.map((p) => ({
  key: p.slug,
  alt: `${p.name} by ${site.name}`,
  eyebrow: `Supply & installation · ${site.address.country}`,
  title: p.name,
  subtitle: p.short,
  photo: p.cover,
  chips: p.highlights.map((h) => `${h.value}${h.suffix} ${h.label}`),
}));

export const ogCards: OgCard[] = [...pages, ...productCards];
export type OgKey = "home" | "about" | "gallery" | "contact" | "estimate" | ProductSlug;

export const ogCard = (key: OgKey) => ogCards.find((c) => c.key === key)!;
export const ogImagePath = (key: OgKey) => `/og/${key}.jpg`;
export const OG_SIZE = { width: 1200, height: 630 };

// keep product lookups honest at build time
for (const p of products) if (!getProduct(p.slug)) throw new Error(`OG: unknown product ${p.slug}`);
