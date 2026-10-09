// Project planner maths — indicative ESTIMATES from rules of thumb. Every figure
// is confirmed by measurement in the free, itemised quotation.
// Prices come from src/config/pricing.ts (the owner's price list).
import { pricing as defaultPricing, type Pricing, type PricingStatus, type ShadePackage, type ShadeType } from "@/config/pricing";

export type { ShadePackage, ShadeType };

const round1 = (n: number) => Math.round(n * 10) / 10;

/** `fixed`: a list price (low === high); otherwise an indicative ± range. */
export type PriceEstimate = { low: number; high: number; sample: boolean; fixed: boolean };

/** Round a point estimate into a ± band; null when any required rate is missing. */
export function priceRange(point: number | null, pricing: Pricing, status: PricingStatus): PriceEstimate | null {
  if (point == null || !Number.isFinite(point)) return null;
  const r = (n: number) => Math.round(n / 10) * 10;
  return { low: r(point * (1 - pricing.spread)), high: r(point * (1 + pricing.spread)), sample: status === "sample", fixed: false };
}

/** A price straight from the price list; null when it isn't set. */
export function listPrice(point: number | null, status: PricingStatus): PriceEstimate | null {
  if (point == null || !Number.isFinite(point)) return null;
  return { low: point, high: point, sample: status === "sample", fixed: true };
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

export const formatPrice = (p: PriceEstimate, pricing: Pricing = defaultPricing) =>
  p.low === p.high ? `${pricing.currency} ${p.low.toLocaleString("en-US")}` : `${pricing.currency} ${p.low.toLocaleString("en-US")} – ${p.high.toLocaleString("en-US")}`;

/* ───────────────────────── Car shades ───────────────────────── */

export const shadeTypes: Record<ShadeType, { label: string; hint: string; detail: string }> = {
  cantilever: { label: "Cantilever", hint: "Shade net on a steel post frame — best value", detail: "Cantilever — shade net on a steel post frame" },
  curved: { label: "Curved", hint: "Curved steel arms with shade net — a modern look", detail: "Curved — curved steel arms with shade net" },
  chromadek: { label: "Chromadek", hint: "Flat steel-sheet roof — waterproof & hail-proof", detail: "Chromadek — flat steel-sheet roof, waterproof" },
};

export const packageNames: Record<ShadePackage, string> = { 1: "single", 2: "double", 3: "triple" };

export const MAX_VEHICLES = 20;
const PACKAGES: ShadePackage[] = [3, 2, 1];

/**
 * Split `n` cars into single/double/triple shades. With prices: the cheapest mix
 * (ties → fewer shades). Without: the fewest shades, cars spread as evenly as possible.
 */
export function packageMix(n: number, prices: Record<ShadePackage, number | null>): ShadePackage[] {
  if (PACKAGES.every((p) => prices[p] != null)) {
    const best: { cost: number; units: ShadePackage[] }[] = [{ cost: 0, units: [] }];
    for (let k = 1; k <= n; k++) {
      let pick: { cost: number; units: ShadePackage[] } | null = null;
      for (const p of PACKAGES) {
        if (p > k) continue;
        const prev = best[k - p];
        const c = prev.cost + prices[p]!;
        if (!pick || c < pick.cost || (c === pick.cost && prev.units.length + 1 < pick.units.length)) pick = { cost: c, units: [...prev.units, p] };
      }
      best[k] = pick!;
    }
    return [...best[n].units].sort((a, b) => b - a);
  }
  const count = Math.ceil(n / 3);
  return Array.from({ length: count }, (_, i) => (Math.floor(n / count) + (i < n % count ? 1 : 0)) as ShadePackage);
}

export function describeMix(units: ShadePackage[]) {
  const counts = PACKAGES.map((p) => [p, units.filter((u) => u === p).length] as const).filter(([, c]) => c > 0);
  return counts.map(([p, c]) => (c === 1 ? `1 ${packageNames[p]}` : `${c} × ${packageNames[p]}`)).join(" + ");
}

export function estimateCarShade(i: { vehicles: number; type: ShadeType }, pricing: Pricing = defaultPricing) {
  const vehicles = Math.max(1, Math.min(MAX_VEHICLES, Math.round(i.vehicles)));
  const cs = pricing.carShades;
  const prices = cs.packages[i.type];
  const units = packageMix(vehicles, prices);
  const sizes = units.map((u) => cs.sizes[u]);
  const width = round1(sizes.reduce((s, [w]) => s + w, 0));
  const depth = Math.max(...sizes.map(([, d]) => d));
  const area = round1(sizes.reduce((s, [w, d]) => s + w * d, 0));
  const total = units.reduce<number | null>((s, u) => (s == null || prices[u] == null ? null : s + prices[u]!), 0);
  const price = listPrice(total, cs.status);
  const layout = `${describeMix(units)} shade${units.length > 1 ? "s" : ""}`;
  return { vehicles, units, sizes, width, depth, area, layout, price };
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
  const price = priceRange(cost([t.perM2, area], [t.perRamp, ramps], [t.perCorner, corners]), pricing, t.status);
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
  const price = priceRange(cost([g.perMetre[profile], gutter], [g.downpipePerMetre, downpipeLength], [g.perCorner, corners], [g.perEndCap, endCaps]), pricing, g.status);
  return { length, width, storeys, gutter, downpipes, eaveHeight, downpipeLength, roofArea, profile, corners, endCaps, price };
}
