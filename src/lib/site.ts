// Single source of truth for business details.
// TODO(owner): replace every placeholder below with real details before launch.
export const site = {
  name: "Ersenhad Trading",
  tagline: "Car Shades · Rubber Tiles · Seamless Gutters",
  description:
    "Ersenhad Trading supplies and installs cantilever, curved and Chromadek car shades, interlocking rubber floor tiles and seamless gutters across Zimbabwe.",
  // Absolute base for canonical/OG URLs. Set NEXT_PUBLIC_SITE_URL in production;
  // on Vercel it falls back to the project's production domain so link previews
  // work before the custom domain is live.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://ersenhadtrading.co.zw"),
  phone: "+263 77 234 3581",
  whatsapp: "263772343581", // digits only, international format (same number as phone)
  email: "sales@ersenhadtrading.co.zw", // TODO
  address: {
    unit: "Shop 18, Avilla Mall",
    street: "Cnr 4th Street & Kwame Nkrumah Avenue",
    landmark: "opposite Runhare House",
    city: "Harare",
    country: "Zimbabwe",
    countryCode: "ZW",
  },
  hours: "Mon–Fri 08:00–17:00 · Sat 08:00–13:00",
} as const;

/** Web agency credit shown in the footer copyright strip. */
export const credit = { name: "Slyker Tech Web Services", url: "https://slykertech.net" };

/** Shop address on one line, e.g. for the footer and contact cards. */
export const addressLine = `${site.address.unit}, ${site.address.street}, ${site.address.city}`;
export const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Avilla Mall, ${site.address.street}, ${site.address.city}, ${site.address.country}`,
)}`;

export const telHref = `tel:${site.phone.replace(/\s/g, "")}`;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
