// Project planner maths — indicative ESTIMATES from rules of thumb. Every figure
// is confirmed by measurement in the free, itemised quotation.
// Prices come from src/config/pricing.ts (the owner's price list).
import { pricing as defaultPricing, type Pricing } from "@/config/pricing";

const round1 = (n: number) => Math.round(n * 10) / 10;

export type PriceEstimate = { low: number; high: number; sample: boolean };

/** Round a point estimate into a ± band; null when any required rate is missing. */
export function priceRange(point: number | null, pricing: Pricing = defaultPricing): PriceEstimate | null {
  if (point == null || !Number.isFinite(point)) return null;
  const r = (n: number) => Math.round(n / 10) * 10;
  return { low: r(point * (1 - pricing.spread)), high: r(point * (1 + pricing.spread)), sample: pricing.status === "sample" };
}

/** Sum rate × quantity pairs; null if any rate is null. */
function cost(...items: [rate: number | null, qty: number][]): number | null {
  let total = 0;
  for (const [rate, qty] of items) {
    if (qty === 0) continue;
    if (rate == null) return null;
    total += rate * qty;
  }
  return total;
}

export const formatPrice = (p: PriceEstimate, pricing: Pricing = defaultPricing) => `${pricing.currency} ${p.low.toLocaleString("en-US")} – ${p.high.toLocaleString("en-US")}`;

/* ───────────────────────── Car shades ───────────────────────── */

export type VehicleType = "sedan" | "suv" | "large";
export type ShadeStyle = "standard" | "cantilever";
export type ShadeCover = "chromadek" | "net" | "pvc";

export const shadeCovers: Record<ShadeCover, { label: string; hint: string; detail: string }> = {
  chromadek: { label: "Chromadek", hint: "Steel roof sheeting — waterproof & hail-proof", detail: "Chromadek steel sheeting (waterproof)" },
  net: { label: "Shade net", hint: "Cooler, lets rain through", detail: "Shade net (80–95% UV block)" },
  pvc: { label: "PVC membrane", hint: "Waterproof, smooth fabric finish", detail: "PVC membrane (waterproof)" },
};

export const vehicleBays: Record<VehicleType, { label: string; hint: string; width: number; depth: number }> = {
  sedan: { label: "Sedan / hatchback", hint: "Most family cars", width: 2.7, depth: 5.0 },
  suv: { label: "SUV / double cab", hint: "Bakkies, 4×4s, 7-seaters", width: 3.0, depth: 5.5 },
  large: { label: "Minibus / truck", hint: "Kombis, light trucks", width: 3.5, depth: 7.0 },
};

export const MAX_BAYS_PER_ROW = 6;

export function estimateCarShade(i: { vehicles: number; type: VehicleType; style: ShadeStyle; cover: ShadeCover }, pricing: Pricing = defaultPricing) {
  const vehicles = Math.max(1, Math.min(40, Math.round(i.vehicles)));
  const bay = vehicleBays[i.type];
  const rows = vehicles <= MAX_BAYS_PER_ROW ? 1 : 2; // beyond 6 bays, two facing rows
  const baysPerRow = Math.ceil(vehicles / rows);
  const width = round1(baysPerRow * bay.width);
  const depth = round1(rows * bay.depth);
  const area = round1(width * depth);
  // posts roughly every two bays; standard = both sides of each row, cantilever = one line
  // (two facing cantilever rows share one central line = double cantilever)
  const postsPerLine = Math.ceil(baysPerRow / 2) + 1;
  const posts = i.style === "standard" ? postsPerLine * 2 * rows : postsPerLine; // cantilever: one line, shared by facing rows
  const layout =
    rows === 1
      ? `Single row of ${baysPerRow} bay${baysPerRow > 1 ? "s" : ""}`
      : `Two facing rows of ${baysPerRow} bays${i.style === "cantilever" ? " (double cantilever)" : ""}`;
  const price = priceRange(cost([pricing.carShades.perM2[i.style][i.cover], area]), pricing);
  return { vehicles, rows, baysPerRow, width, depth, area, posts, layout, bay, price };
}

/* ───────────────────────── Rubber tiles ───────────────────────── */

export type TileUse = "plant" | "workshop" | "office" | "gym";
export type TileColour = "black" | "grey" | "mixed";

export const TILE_SIZE = 0.5; // 500 × 500 mm coin-top interlocking tiles
export const TILE_WASTE = 0.05; // cutting allowance

export const tileUses: Record<TileUse, { label: string; hint: string }> = {
  plant: { label: "Plant / switch room", hint: "Generators, switchgear, pumps" },
  workshop: { label: "Workshop / garage", hint: "Warehouses, stores, garages" },
  office: { label: "Office / shop", hint: "Corridors, reception, retail" },
  gym: { label: "Gym / play area", hint: "Studios, schools, kids' rooms" },
};

export const tileColours: Record<TileColour, { label: string }> = {
  black: { label: "Black" },
  grey: { label: "Grey" },
  mixed: { label: "Colours / mixed" },
};

export function estimateTiles(i: { length: number; width: number; edges: boolean }, pricing: Pricing = defaultPricing) {
  const length = Math.max(0.5, Math.min(200, i.length));
  const width = Math.max(0.5, Math.min(200, i.width));
  const area = round1(length * width);
  const tilesPerM2 = 1 / (TILE_SIZE * TILE_SIZE);
  const tiles = Math.ceil(area * tilesPerM2 * (1 + TILE_WASTE));
  const perimeter = round1(2 * (length + width));
  const ramps = i.edges ? Math.ceil(perimeter / TILE_SIZE) : 0;
  const corners = i.edges ? 4 : 0;
  const t = pricing.rubberTiles;
  const price = priceRange(cost([t.perM2, area], [t.perRamp, ramps], [t.perCorner, corners]), pricing);
  return { length, width, area, tiles, perimeter, ramps, corners, price };
}

/* ───────────────────────── Seamless gutters ───────────────────────── */

export type RoofType = "gable" | "hip";
export type GutterProfile = 125 | 150;

export const EAVE_OVERHANG = 0.3; // m past the wall at each end
export const STOREY_HEIGHT = 3; // m wall height per storey (ground to eave)
export const RUN_PER_DOWNPIPE = 10; // m of gutter served by one downpipe
export const LARGE_ROOF_M2 = 150; // above this, recommend the 150 mm profile

export const roofTypes: Record<RoofType, { label: string; hint: string }> = {
  gable: { label: "Gable (pitched)", hint: "Two slopes — gutters on the two long sides" },
  hip: { label: "Hip", hint: "Slopes on all four sides — gutters all the way round" },
};

export function estimateGutters(i: { length: number; width: number; roof: RoofType; storeys: number }, pricing: Pricing = defaultPricing) {
  const length = Math.max(3, Math.min(200, i.length));
  const width = Math.max(3, Math.min(200, i.width));
  const storeys = Math.max(1, Math.min(4, Math.round(i.storeys)));
  const long = length + 2 * EAVE_OVERHANG;
  const short = width + 2 * EAVE_OVERHANG;
  const gutter = round1(i.roof === "gable" ? 2 * long : 2 * (long + short));
  const minDownpipes = i.roof === "gable" ? 2 : 4;
  const downpipes = Math.max(minDownpipes, Math.ceil(gutter / RUN_PER_DOWNPIPE));
  const eaveHeight = storeys * STOREY_HEIGHT;
  const downpipeLength = round1(downpipes * eaveHeight);
  const roofArea = round1(long * short);
  const profile: GutterProfile = roofArea > LARGE_ROOF_M2 ? 150 : 125;
  const corners = i.roof === "hip" ? 4 : 0;
  const endCaps = i.roof === "gable" ? 4 : 0;
  const g = pricing.gutters;
  const price = priceRange(cost([g.perMetre[profile], gutter], [g.downpipePerMetre, downpipeLength], [g.perCorner, corners], [g.perEndCap, endCaps]), pricing);
  return { length, width, storeys, gutter, downpipes, eaveHeight, downpipeLength, roofArea, profile, corners, endCaps, price };
}
