import type { ProductSlug } from "@/lib/products";

export type GalleryImage = {
  id: string;
  category: ProductSlug;
  title: string;
  caption: string;
  /** intrinsic aspect ratio (w / h) — reserves layout space so nothing jumps while loading */
  ratio: number;
};

// Car shade and rubber tile photos are real Ersenhad installations.
// Car shade types: cantilever (hip net on posts), curved (curved arms), chromadek (flat steel sheets).
// TODO(owner): the gutter photos are still royalty-free Unsplash placeholders
// (Unsplash License) — replace them with real jobs before launch.
// To add a photo: drop `<id>.webp` (≤1400px) and `<id>-sm.webp` (720px wide) into /public/gallery.
export const gallery: GalleryImage[] = [
  { id: "shade-curved-suv", category: "car-shades", title: "Curved car shade", caption: "Blue shade net on curved steel arms, protecting an SUV", ratio: 1.33 },
  { id: "shade-cantilever-garage", category: "car-shades", title: "Cantilever car shade", caption: "Blue cantilever shade over a double-garage driveway", ratio: 1.33 },
  { id: "shade-chromadek-veranda", category: "car-shades", title: "Chromadek shade", caption: "Flat Chromadek roof running the length of a house", ratio: 1.33 },
  { id: "shade-curved-twin", category: "car-shades", title: "Curved shade, white frame", caption: "White curved arms with blue shade net over a driveway", ratio: 1.33 },
  { id: "shade-cantilever-red", category: "car-shades", title: "Cantilever shade, red net", caption: "Red cantilever shade over a paved parking area", ratio: 0.75 },
  { id: "shade-chromadek-carport", category: "car-shades", title: "Chromadek carport", caption: "Flat Chromadek roof on steel uprights at a new build", ratio: 1.33 },
  { id: "shade-cantilever-entrance", category: "car-shades", title: "Commercial cantilever", caption: "Double cantilever shade over a business entrance and walkway", ratio: 1.33 },
  { id: "shade-curved-charcoal", category: "car-shades", title: "Curved shade, charcoal net", caption: "Charcoal curved shade over a paved courtyard", ratio: 0.75 },
  { id: "shade-cantilever-courtyard", category: "car-shades", title: "Multi-bay cantilever", caption: "Blue cantilever shade over a paved courtyard", ratio: 0.76 },
  { id: "shade-curved-white", category: "car-shades", title: "Curved shade frame", caption: "Freshly installed white curved frame with shade net", ratio: 1.33 },
  { id: "shade-curved-frame", category: "car-shades", title: "Curved shade install", caption: "Our team fitting the net to a white curved frame", ratio: 0.75 },
  { id: "shade-chromadek-install", category: "car-shades", title: "Chromadek install", caption: "Our team fixing roof sheets onto a steel frame", ratio: 1.33 },
  { id: "shade-curved-install", category: "car-shades", title: "Curved shade install", caption: "Setting a dark-frame curved shade on site", ratio: 1.33 },
  { id: "tiles-plant-room", category: "rubber-tiles", title: "Plant-room flooring", caption: "Coin-top tiles laid in front of electrical switchgear", ratio: 0.75 },
  { id: "tiles-stair-treads", category: "rubber-tiles", title: "Stair covering", caption: "Coin-top tiles with aluminium nosing on a staircase", ratio: 0.75 },
  { id: "tiles-colours", category: "rubber-tiles", title: "Colour range", caption: "Interlocking coin-top tiles in yellow, blue, red and green", ratio: 0.81 },
  { id: "gutter-white-downpipe", category: "seamless-gutters", title: "Gutter & downpipe", caption: "Clean fascia line with matching downpipe", ratio: 1.5 },
  { id: "gutter-metal-roof", category: "seamless-gutters", title: "Metal-roof guttering", caption: "Continuous runs on a standing-seam roof", ratio: 1.5 },
  { id: "gutter-tiled-roof", category: "seamless-gutters", title: "Tiled-roof guttering", caption: "Half-round profile on a tiled roof", ratio: 1.33 },
  { id: "gutter-corner", category: "seamless-gutters", title: "Mitred corner", caption: "Neat corner and outlet detailing", ratio: 1.35 },
  { id: "gutter-facade", category: "seamless-gutters", title: "Multi-storey drainage", caption: "Downpipes routed cleanly down the facade", ratio: 1.5 },
  { id: "gutter-downpipe-detail", category: "seamless-gutters", title: "Downpipe shoe", caption: "Discharge detail at ground level", ratio: 1.5 },
  { id: "tiles-stock", category: "rubber-tiles", title: "Ready to lay", caption: "Interlocking tiles stacked and ready for installation", ratio: 0.56 },
];

export const imageSrc = (id: string, size: "sm" | "lg" = "lg") => `/gallery/${id}${size === "sm" ? "-sm" : ""}.webp`;
