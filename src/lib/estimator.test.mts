// Run: npm run test:estimator
import { pricing } from "../config/pricing.ts";
import { estimateCarShade, estimateGutters, estimateTiles, formatPrice } from "./estimator.ts";
const eq = (name: string, got: unknown, want: unknown) => { const ok = JSON.stringify(got) === JSON.stringify(want); console.log(ok ? "PASS" : "FAIL", name, ok ? "" : `got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); if (!ok) process.exitCode = 1; };
// car shades
let c = estimateCarShade({ vehicles: 2, type: "sedan", style: "standard", cover: "net" });
eq("2 sedans: 1 row x2", [c.rows, c.baysPerRow, c.width, c.depth, c.area], [1, 2, 5.4, 5, 27]);
eq("2 sedans standard posts", c.posts, 4);
c = estimateCarShade({ vehicles: 2, type: "sedan", style: "cantilever", cover: "net" });
eq("2 sedans cantilever posts", c.posts, 2);
c = estimateCarShade({ vehicles: 10, type: "suv", style: "cantilever", cover: "pvc" });
eq("10 SUVs: 2 rows x5, double cantilever", [c.rows, c.baysPerRow, c.width, c.depth, c.area, c.posts], [2, 5, 15, 11, 165, 4]);
c = estimateCarShade({ vehicles: 7, type: "sedan", style: "standard", cover: "net" });
eq("7 sedans: 2 rows x4, standard posts", [c.rows, c.baysPerRow, c.posts], [2, 4, 12]);
eq("7 sedans net 108m2 x $35", c.price && [c.price.low, c.price.high, c.price.sample], [3210, 4350, true]);
eq("vehicles clamped", estimateCarShade({ vehicles: 0, type: "sedan", style: "standard", cover: "net" }).vehicles, 1);
// tiles
let t = estimateTiles({ length: 6, width: 4, use: "gym", fall: "low", edges: false });
eq("24 m2 gym", [t.area, t.tiles, t.thickness, t.ramps], [24, 101, 25, 0]);
t = estimateTiles({ length: 5, width: 5, use: "playground", fall: "mid", edges: true });
eq("playground mid 40mm + ramps", [t.area, t.tiles, t.thickness, t.perimeter, t.ramps, t.corners], [25, 105, 40, 20, 40, 4]);
eq("playground >1.3m -> null", estimateTiles({ length: 5, width: 5, use: "playground", fall: "high", edges: false }).thickness, null);
eq("walkway 20mm", estimateTiles({ length: 10, width: 1.2, use: "walkway", fall: "low", edges: false }).thickness, 20);
// gutters
let g = estimateGutters({ length: 15, width: 10, roof: "gable", storeys: 1 });
eq("gable 15x10 single", [g.gutter, g.downpipes, g.eaveHeight, g.downpipeLength, g.roofArea, g.profile, g.endCaps, g.corners], [31.2, 4, 3, 12, 165.4, 150, 4, 0]);
g = estimateGutters({ length: 12, width: 8, roof: "hip", storeys: 2 });
eq("hip 12x8 double", [g.gutter, g.downpipes, g.eaveHeight, g.downpipeLength, g.roofArea, g.profile, g.corners], [42.4, 5, 6, 30, 108.4, 125, 4]);
g = estimateGutters({ length: 6, width: 5, roof: "gable", storeys: 1 });
eq("small gable -> min 2 downpipes", [g.gutter, g.downpipes], [13.2, 2]);

// prices (sample rates from src/config/pricing.ts)
eq("2 sedans net 27m2 x $35", formatPrice(estimateCarShade({ vehicles: 2, type: "sedan", style: "standard", cover: "net" }).price!), "US$ 800 – 1,090");
eq("10 SUVs pvc 165m2 x $55", formatPrice(estimateCarShade({ vehicles: 10, type: "suv", style: "cantilever", cover: "pvc" }).price!), "US$ 7,710 – 10,440");
eq("gym 24m2 x $30 no edges", formatPrice(estimateTiles({ length: 6, width: 4, use: "gym", fall: "low", edges: false }).price!), "US$ 610 – 830");
eq("playground 25m2 x $45 + 40 ramps + 4 corners", formatPrice(estimateTiles({ length: 5, width: 5, use: "playground", fall: "mid", edges: true }).price!), "US$ 1,110 – 1,500");
eq("playground >1.3m -> no price", estimateTiles({ length: 5, width: 5, use: "playground", fall: "high", edges: false }).price, null);
eq("gable 31.2m x $15 + 12m dp x $9 + 4 caps", formatPrice(estimateGutters({ length: 15, width: 10, roof: "gable", storeys: 1 }).price!), "US$ 500 – 680");
// missing rate -> null; live status -> not sample (price list passed in, no global mutation)
const noNet = structuredClone(pricing); noNet.carShades.perM2.net = null;
eq("null rate hides price", estimateCarShade({ vehicles: 2, type: "sedan", style: "standard", cover: "net" }, noNet).price, null);
const live = structuredClone(pricing); live.status = "live";
eq("live status not sample", estimateCarShade({ vehicles: 2, type: "sedan", style: "standard", cover: "pvc" }, live).price!.sample, false);
const zar = structuredClone(pricing); zar.currency = "ZiG";
eq("currency from price list", formatPrice(estimateTiles({ length: 6, width: 4, use: "gym", fall: "low", edges: false }, zar).price!, zar), "ZiG 610 – 830");
