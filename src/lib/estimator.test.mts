// Run: npm run test:estimator
import { pricing } from "../config/pricing.ts";
import { estimateCarShade, estimateGutters, estimateTiles, formatPrice } from "./estimator.ts";
const eq = (name: string, got: unknown, want: unknown) => { const ok = JSON.stringify(got) === JSON.stringify(want); console.log(ok ? "PASS" : "FAIL", name, ok ? "" : `got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); if (!ok) process.exitCode = 1; };
// car shades — packages from the owner's price list
let c = estimateCarShade({ vehicles: 1, type: "cantilever" });
eq("1 car cantilever: single 3x5", [c.units, c.width, c.depth, c.area, c.layout], [[1], 3, 5, 15, "1 single shade"]);
eq("cantilever single $480", [c.price!.low, c.price!.high, c.price!.fixed, c.price!.sample], [480, 480, true, false]);
eq("cantilever double $550", estimateCarShade({ vehicles: 2, type: "cantilever" }).price!.low, 550);
eq("cantilever triple $650", estimateCarShade({ vehicles: 3, type: "cantilever" }).price!.low, 650);
c = estimateCarShade({ vehicles: 4, type: "cantilever" });
eq("4 cars cantilever: 2 doubles ($1,100) beat triple+single ($1,130)", [c.units, c.width, c.area, c.price!.low, c.layout], [[2, 2], 10, 50, 1100, "2 × double shades"]);
eq("6 cars cantilever: 2 triples", [estimateCarShade({ vehicles: 6, type: "cantilever" }).units, estimateCarShade({ vehicles: 6, type: "cantilever" }).price!.low], [[3, 3], 1300]);
c = estimateCarShade({ vehicles: 4, type: "chromadek" });
eq("4 cars chromadek: triple+single ($2,530) beat 2 doubles ($2,600)", [c.units, c.price!.low, c.layout], [[3, 1], 2530, "1 triple + 1 single shades"]);
eq("chromadek double $1,300", estimateCarShade({ vehicles: 2, type: "chromadek" }).price!.low, 1300);
eq("curved single/double/triple $550/$680/$760", [1, 2, 3].map((n) => estimateCarShade({ vehicles: n, type: "curved" }).price!.low), [550, 680, 760]);
eq("4 cars curved: triple+single ($1,310) beat 2 doubles ($1,360)", [estimateCarShade({ vehicles: 4, type: "curved" }).units, estimateCarShade({ vehicles: 4, type: "curved" }).price!.low], [[3, 1], 1310]);
const unpriced = structuredClone(pricing); unpriced.carShades.packages.curved = { 1: null, 2: null, 3: null };
c = estimateCarShade({ vehicles: 5, type: "curved" }, unpriced);
eq("unpriced type: fewest shades, no price", [c.units, c.price], [[3, 2], null]);
eq("unpriced 4: evenly split", estimateCarShade({ vehicles: 4, type: "curved" }, unpriced).units, [2, 2]);
eq("vehicles clamped low", estimateCarShade({ vehicles: 0, type: "cantilever" }).vehicles, 1);
eq("vehicles clamped high", estimateCarShade({ vehicles: 99, type: "cantilever" }).vehicles, 20);
eq("packages always cover every car", [1, 2, 3, 4, 5, 7, 11, 20].every((n) => (["cantilever", "curved", "chromadek"] as const).every((t) => estimateCarShade({ vehicles: n, type: t }).units.reduce((a, b) => a + b, 0) === n)), true);
// tiles
let t = estimateTiles({ length: 6, width: 4, edges: false });
eq("24 m2 floor", [t.area, t.tiles, t.ramps, t.corners], [24, 101, 0, 0]);
t = estimateTiles({ length: 5, width: 5, edges: true });
eq("25 m2 + ramps", [t.area, t.tiles, t.perimeter, t.ramps, t.corners], [25, 105, 20, 40, 4]);
eq("area clamped to 0.5 m min", estimateTiles({ length: 0, width: 0, edges: false }).area, 0.3);
// gutters
let g = estimateGutters({ length: 15, width: 10, roof: "gable", storeys: 1 });
eq("gable 15x10 single", [g.gutter, g.downpipes, g.eaveHeight, g.downpipeLength, g.roofArea, g.profile, g.endCaps, g.corners], [31.2, 4, 3, 12, 165.4, 150, 4, 0]);
g = estimateGutters({ length: 12, width: 8, roof: "hip", storeys: 2 });
eq("hip 12x8 double", [g.gutter, g.downpipes, g.eaveHeight, g.downpipeLength, g.roofArea, g.profile, g.corners], [42.4, 5, 6, 30, 108.4, 125, 4]);
g = estimateGutters({ length: 6, width: 5, roof: "gable", storeys: 1 });
eq("small gable -> min 2 downpipes", [g.gutter, g.downpipes], [13.2, 2]);

// prices
eq("list price formats as a single figure", formatPrice(estimateCarShade({ vehicles: 2, type: "chromadek" }).price!), "US$ 1,300");
eq("tiles 24m2 x $30 no edges", formatPrice(estimateTiles({ length: 6, width: 4, edges: false }).price!), "US$ 610 – 830");
eq("tiles 25m2 x $30 + 40 ramps + 4 corners", formatPrice(estimateTiles({ length: 5, width: 5, edges: true }).price!), "US$ 790 – 1,070");
eq("gable 31.2m x $15 + 12m dp x $9 + 4 caps", formatPrice(estimateGutters({ length: 15, width: 10, roof: "gable", storeys: 1 }).price!), "US$ 500 – 680");
// missing rate -> null; per-service status (price list passed in, no global mutation)
const noNet = structuredClone(pricing); noNet.carShades.packages.cantilever[2] = null;
eq("null rate hides price", estimateCarShade({ vehicles: 2, type: "cantilever" }, noNet).price, null);
eq("tiles still sample", estimateTiles({ length: 6, width: 4, edges: false }).price!.sample, true);
const sample = structuredClone(pricing); sample.carShades.status = "sample";
eq("sample status flags car shades", estimateCarShade({ vehicles: 2, type: "cantilever" }, sample).price!.sample, true);
const zar = structuredClone(pricing); zar.currency = "ZiG";
eq("currency from price list", formatPrice(estimateTiles({ length: 6, width: 4, edges: false }, zar).price!, zar), "ZiG 610 – 830");
