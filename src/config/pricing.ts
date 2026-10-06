// ─────────────────────────────────────────────────────────────────────────────
// PROJECT PLANNER PRICE LIST — the only file to edit when prices change.
//
// ⚠️ status: "sample" → these are DUMMY prices for demonstration. Every price the
// planner shows (and every WhatsApp/email message it composes) is tagged
// "Sample prices" while this is set. Replace the numbers with real rates and set
// status to "live" to remove the tag.
//
// All rates are per unit in `currency`, supply & install unless noted.
// Set any rate to null to hide prices for that item (planner falls back to
// "Free quotation").
// ─────────────────────────────────────────────────────────────────────────────

export type PricingStatus = "sample" | "live";
type Rate = number | null;

export type Pricing = {
  status: PricingStatus;
  currency: string;
  spread: number;
  carShades: { perM2: Record<"standard" | "cantilever", Record<"chromadek" | "net" | "pvc", Rate>> };
  rubberTiles: { perM2: Rate; perRamp: Rate; perCorner: Rate };
  gutters: { perMetre: Record<125 | 150, Rate>; downpipePerMetre: Rate; perCorner: Rate; perEndCap: Rate };
};

export const pricing: Pricing = {
  status: "sample",
  currency: "US$",
  /** ± band shown around the point estimate (0.15 = ±15%) */
  spread: 0.15,

  carShades: {
    /** per m² of covered area by structure style × roof type, incl. frame, posts and footings.
     *  Cantilever frames use heavier steel, so they're priced separately. */
    perM2: {
      standard: { chromadek: 48, net: 35, pvc: 55 },
      cantilever: { chromadek: 56, net: 42, pvc: 64 },
    },
  },

  rubberTiles: {
    /** per m² of 500 × 500 mm coin-top tiles, supplied and laid */
    perM2: 30,
    /** each edge ramp / corner piece */
    perRamp: 4,
    perCorner: 5,
  },

  gutters: {
    /** per metre of seamless gutter by profile, incl. brackets */
    perMetre: { 125: 12, 150: 15 },
    /** per metre of downpipe, incl. shoes and brackets */
    downpipePerMetre: 9,
    /** per corner / end cap */
    perCorner: 6,
    perEndCap: 3,
  },
};
