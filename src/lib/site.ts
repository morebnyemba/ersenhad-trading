// Single source of truth for business details.
// TODO(owner): replace every placeholder below with real details before launch.
export const site = {
  name: "Ersenhad Trading",
  tagline: "Car Shades · Rubber Tiles · Seamless Gutters",
  description:
    "Ersenhad Trading supplies and installs car shade ports, interlocking rubber floor tiles and seamless gutters for homes, businesses and schools.",
  // Absolute base for canonical/OG URLs. Set NEXT_PUBLIC_SITE_URL in production;
  // on Vercel it falls back to the project's production domain so link previews
  // work before the custom domain is live.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://ersenhadtrading.co.zw"),
  phone: "+263 77 000 0000", // TODO
  whatsapp: "263770000000", // TODO: digits only, international format
  email: "sales@ersenhadtrading.co.zw", // TODO
  address: {
    street: "123 Example Road", // TODO
    city: "Harare",
    country: "Zimbabwe",
    countryCode: "ZW",
  },
  hours: "Mon–Fri 08:00–17:00 · Sat 08:00–13:00",
} as const;

/** Web agency credit shown in the footer copyright strip. */
export const credit = { name: "Slyker Tech Web Services", url: "https://slykertech.net" };

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
