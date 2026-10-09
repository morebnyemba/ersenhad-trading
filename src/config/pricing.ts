// ─────────────────────────────────────────────────────────────────────────────
// PROJECT PLANNER PRICE LIST — the only file to edit when prices change.
//
// Each service has its own `status`. ⚠️ "sample" → DUMMY prices for demonstration:
// every price the planner shows for that service (and every WhatsApp/email message
// it composes) is tagged "Sample prices". Replace the numbers with real rates and
// set that service's status to "live" to remove the tag.
//
// All rates are per unit in `currency`, supply & install unless noted.
// Set any rate to null to hide prices for that item (planner falls back to
// "Free quotation").
// ─────────────────────────────────────────────────────────────────────────────

export type PricingStatus = "sample" | "live";
type Rate = number | null;

export type ShadeType = "cantilever" | "curved" | "chromadek";
/** a single, double or triple car shade */
export type ShadePackage = 1 | 2 | 3;

export type Pricing = {
  currency: string;
  /** ± band shown around per-unit estimates (tiles, gutters) */
  spread: number;
  carShades: { status: PricingStatus; packages: Record<ShadeType, Record<ShadePackage, Rate>>; sizes: Record<ShadePackage, [width: number, depth: number]> };
  rubberTiles: { status: PricingStatus; perM2: Rate; perRamp: Rate; perCorner: Rate };
  gutters: { status: PricingStatus; perMetre: Record<125 | 150, Rate>; downpipePerMetre: Rate; perCorner: Rate; perEndCap: Rate };
};

export const pricing: Pricing = {
  currency: "US$",
  /** ± band shown around tile and gutter estimates (0.15 = ±15%) */
  spread: 0.15,

  carShades: {
    status: "live",
    /** price per shade, supplied and installed, by type and number of cars.
     *  Four or more cars are quoted as the cheapest mix of these packages. */
    packages: {
      cantilever: { 1: 480, 2: 550, 3: 650 },
      curved: { 1: 550, 2: 680, 3: 760 },
      chromadek: { 1: 680, 2: 1300, 3: 1850 },
    },
    /** typical footprint of each package (m) — from the cantilever price list */
    sizes: { 1: [3, 5], 2: [5, 5], 3: [7.5, 5] },
  },

  rubberTiles: {
    status: "sample",
    /** per m² of 500 × 500 mm coin-top tiles, supplied and laid */
    perM2: 30,
    /** each edge ramp / corner piece */
    perRamp: 4,
    perCorner: 5,
  },

  gutters: {
    status: "sample",
    /** per metre of seamless gutter by profile, incl. brackets */
    perMetre: { 125: 12, 150: 15 },
    /** per metre of downpipe, incl. shoes and brackets */
    downpipePerMetre: 9,
    /** per corner / end cap */
    perCorner: 6,
    perEndCap: 3,
  },
};
