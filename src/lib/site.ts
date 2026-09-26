// Single source of truth for business details.
// TODO(owner): replace every placeholder below with real details before launch.
export const site = {
  name: "Ersenhad Trading",
  tagline: "Car Shades · Rubber Tiles · Seamless Gutters",
  description:
    "Ersenhad Trading supplies and installs car shade ports, interlocking rubber floor tiles and seamless gutters for homes, businesses and schools.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ersenhadtrading.co.zw",
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

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
