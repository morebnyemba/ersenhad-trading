# Ersenhad Trading — website

Marketing site for Ersenhad Trading: **car shades**, **interlocking rubber tiles** and **seamless gutters**.

Next.js (App Router) + Tailwind v4, statically exported — production is plain HTML served by Nginx or any CDN. No server runtime, no database.

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
| Brand colours | `src/app/globals.css` (`@theme`) |

Adding a product = one entry in `products.ts`; its page, nav link, sitemap entry and quote-form fields are generated from it.

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
- [ ] Add real project photos (the biggest conversion lever for this kind of business)
- [ ] Add a logo and favicon to `public/` / `src/app/`
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] Register a Google Business Profile with the same name, address and phone
