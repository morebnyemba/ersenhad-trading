# Ersenhad Trading — website

Marketing site for Ersenhad Trading: **car shades**, **interlocking rubber tiles** and **seamless gutters**.

Next.js 16 (App Router, TypeScript) + Tailwind v4 + shadcn/ui, statically exported — production is plain HTML served by Nginx or any CDN. No server runtime, no database.

| Layer | Used for |
|---|---|
| shadcn/ui (Radix) | Button, Sheet (mobile nav), Dialog (lightbox), Carousel, Accordion (FAQ), Select/Input form controls — `src/components/ui` |
| Embla (via shadcn Carousel) + autoplay | Featured-work carousel and lightbox slider |
| Motion (Framer Motion) | Scroll reveals, gallery filter transitions — honours `prefers-reduced-motion` |
| Magic UI | Marquee, NumberTicker, BorderBeam, DotPattern — `src/components/magicui` |
| Aceternity UI | Hero Spotlight — `src/components/aceternity` |
| typed.js | Rotating hero headline (first phrase is server-rendered for SEO/no-JS) |
| react-icons | All icons. **Tabler (`react-icons/tb`) only**, for one consistent stroke style; brand logos (WhatsApp) from `react-icons/fa`. Service icons live in `src/components/site/product-icon.tsx` |

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Edit content

| What | Where |
|---|---|
| Phone, WhatsApp, email, address, hours | `src/lib/site.ts` |
| Products, features, options, FAQs, quote fields | `src/lib/products.ts` |
| Gallery photos | `src/lib/gallery.ts` + `public/gallery/` |
| **Planner prices** | `src/config/pricing.ts` (rates per m² / metre / piece, currency, ± spread, `status`) |
| Planner rules of thumb | `src/lib/estimator.ts` (bay sizes, tile size, downpipe spacing…) — tests: `npm run test:estimator` |
| Brand colours | `src/app/globals.css` (`--primary`, `--color-highlight`, `--color-ink`) |

Adding a product = one entry in `products.ts`; its page, nav link, sitemap entry and quote-form fields are generated from it.

> **Adding shadcn components:** the CLI generates icon imports for its configured library. After `npx shadcn add …`, swap any generated icon imports to their `react-icons/tb` equivalents, and remove the `cn` package if the CLI re-adds it (`cn` lives in `src/lib/utils.ts`).

## Brand assets

Generated from the supplied logo (transparent source; never recoloured):

| File | Use |
|---|---|
| `public/brand/logo.{webp,png}` | Full lockup, navy wordmark — light backgrounds (header, mobile menu) |
| `public/brand/logo-light.{webp,png}` | Same lockup with a white wordmark — dark backgrounds (footer) |
| `public/brand/mark.{webp,png}` | Symbol only, 512² — structured data, manifest |
| `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | Browser tab, Android, iOS home-screen icons |
| `/og/<page>.jpg` (`src/app/og/[image]/route.ts`, cards in `src/lib/og.ts`) | Link-preview cards (WhatsApp, Facebook, LinkedIn, X) rendered at build time to ~100 KB JPEGs from `src/app/_og/` |

Static export writes OG images without a file extension, so `nginx.conf` and `vercel.json` force `Content-Type: image/png` for them — keep those rules if you change hosting.

## Project planner (`/estimate`)

Customers enter car count, floor size or house size/storeys/roof type and get a live drawing, quantities and an **indicative price range** (point estimate ± `spread`). Everything is labelled as an estimate, not a quotation, and the result can be sent on WhatsApp/email as a structured enquiry.

Prices come only from `src/config/pricing.ts`. While `status: "sample"` every price is tagged **"Sample prices"** (on screen and in the composed message). Enter real rates and set `status: "live"` to remove the tag; set any rate to `null` to hide prices for that item.

## Quotes

The quote form has no backend: it composes the enquiry and opens WhatsApp (or the visitor's email client) pre-filled. Nothing to spam, nothing storing PII. If you later need lead tracking, swap `QuoteForm` to POST to a form endpoint or CRM.

## Deploy

```bash
docker build --build-arg NEXT_PUBLIC_SITE_URL=https://ersenhadtrading.co.zw -t ersenhad-web .
docker run -p 8080:80 ersenhad-web
```

Put it behind Nginx Proxy Manager for TLS. Any static host (Cloudflare Pages, Vercel, Netlify) also works — publish `out/`.

## Before launch

- [ ] Replace placeholder contact details in `src/lib/site.ts` (search for `TODO`)
- [ ] **Replace the placeholder gallery photos** (royalty-free Unsplash images) with real Ersenhad installations: add `<id>.webp` (≤1400px) and `<id>-sm.webp` (≤720px) to `public/gallery/` and list them in `src/lib/gallery.ts`
- [ ] **Replace the sample planner prices** in `src/config/pricing.ts` and set `status: "live"`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Register a Google Business Profile with the same name, address and phone
