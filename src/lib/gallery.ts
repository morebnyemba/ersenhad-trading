import type { ProductSlug } from "@/lib/products";

export type GalleryImage = {
  id: string;
  category: ProductSlug;
  title: string;
  caption: string;
  /** intrinsic aspect ratio (w / h) — reserves layout space so nothing jumps while loading */
  ratio: number;
};

// TODO(owner): these are royalty-free Unsplash placeholders (Unsplash License).
// Replace with photos of real Ersenhad installations before launch — drop
// `<id>.webp` (≤1400px) and `<id>-sm.webp` (≤720px) into /public/gallery.
export const gallery: GalleryImage[] = [
  { id: "shade-residential-carport", category: "car-shades", title: "Residential carport", caption: "Single-bay carport protecting a family vehicle", ratio: 1.5 },
  { id: "shade-sails-blue", category: "car-shades", title: "Shade sails", caption: "Tensioned sails in UV-stabilised fabric", ratio: 1.49 },
  { id: "shade-4x4-bay", category: "car-shades", title: "Double-bay shelter", caption: "Covered bays for utility vehicles", ratio: 1.52 },
  { id: "shade-canopy-park", category: "car-shades", title: "Canopy structure", caption: "Multi-span canopy over a public space", ratio: 0.67 },
  { id: "shade-timber-carport", category: "car-shades", title: "Open-sided carport", caption: "Wide-span shelter for multiple vehicles", ratio: 1.5 },
  { id: "tiles-home-gym", category: "rubber-tiles", title: "Home gym floor", caption: "Heavy-duty tiles under a power rack", ratio: 0.84 },
  { id: "tiles-playground-red", category: "rubber-tiles", title: "Playground surfacing", caption: "Impact-absorbing surface around play equipment", ratio: 1.78 },
  { id: "tiles-gym-dumbbells", category: "rubber-tiles", title: "Free-weights area", caption: "Protecting the slab from dropped weights", ratio: 1.5 },
  { id: "tiles-play-surface", category: "rubber-tiles", title: "Two-tone play area", caption: "Custom colours and shapes for children's areas", ratio: 1.33 },
  { id: "tiles-playground-frame", category: "rubber-tiles", title: "School play frame", caption: "Fall-zone protection under climbing frames", ratio: 0.67 },
  { id: "tiles-gym-medball", category: "rubber-tiles", title: "Functional training zone", caption: "Slip-resistant, easy-clean studio floor", ratio: 0.75 },
  { id: "tiles-granule-texture", category: "rubber-tiles", title: "Granule finish", caption: "Recycled rubber granules, bonded for durability", ratio: 0.67 },
  { id: "gutter-white-downpipe", category: "seamless-gutters", title: "Gutter & downpipe", caption: "Clean fascia line with matching downpipe", ratio: 1.5 },
  { id: "gutter-metal-roof", category: "seamless-gutters", title: "Metal-roof guttering", caption: "Continuous runs on a standing-seam roof", ratio: 1.5 },
  { id: "gutter-tiled-roof", category: "seamless-gutters", title: "Tiled-roof guttering", caption: "Half-round profile on a tiled roof", ratio: 1.33 },
  { id: "gutter-corner", category: "seamless-gutters", title: "Mitred corner", caption: "Neat corner and outlet detailing", ratio: 1.35 },
  { id: "gutter-facade", category: "seamless-gutters", title: "Multi-storey drainage", caption: "Downpipes routed cleanly down the facade", ratio: 1.5 },
  { id: "gutter-downpipe-detail", category: "seamless-gutters", title: "Downpipe shoe", caption: "Discharge detail at ground level", ratio: 1.5 },
];

export const imageSrc = (id: string, size: "sm" | "lg" = "lg") => `/gallery/${id}${size === "sm" ? "-sm" : ""}.webp`;
