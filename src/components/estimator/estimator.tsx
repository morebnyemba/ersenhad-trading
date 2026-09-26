"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FaWhatsapp } from "react-icons/fa";
import { TbAlertTriangle, TbArrowRight, TbInfoCircle, TbMail } from "react-icons/tb";
import { Choice, Field, Stepper } from "@/components/estimator/controls";
import { CarportVisual, GutterVisual, TilesVisual } from "@/components/estimator/visuals";
import { ProductIcon } from "@/components/site/product-icon";
import {
  estimateCarShade,
  estimateGutters,
  estimateTiles,
  fallHeights,
  formatPrice,
  roofTypes,
  shadeCovers,
  tileUses,
  vehicleBays,
  type FallHeight,
  type RoofType,
  type ShadeCover,
  type ShadeStyle,
  type TileUse,
  type VehicleType,
} from "@/lib/estimator";
import { pricing } from "@/config/pricing";
import { getProduct, products, type ProductSlug } from "@/lib/products";
import { site, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Row = { label: string; value: string; strong?: boolean };

const pricingSpread = pricing.spread;

const fmt = (n: number, unit = "") => `${n.toLocaleString("en-US")}${unit}`;

export function Estimator() {
  const [service, setService] = useState<ProductSlug>("car-shades");

  // deep link: /estimate/?service=seamless-gutters (read after hydration; static export)
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("service");
    if (q && products.some((p) => p.slug === q)) setService(q as ProductSlug);
  }, []);
  const pick = (s: ProductSlug) => {
    setService(s);
    window.history.replaceState(null, "", `?service=${s}`);
  };

  // car shades
  const [vehicles, setVehicles] = useState(2);
  const [vType, setVType] = useState<VehicleType>("sedan");
  const [style, setStyle] = useState<ShadeStyle>("standard");
  const [cover, setCover] = useState<ShadeCover>("chromadek");
  // tiles
  const [tLen, setTLen] = useState(6);
  const [tWid, setTWid] = useState(4);
  const [use, setUse] = useState<TileUse>("gym");
  const [fall, setFall] = useState<FallHeight>("low");
  const [edges, setEdges] = useState(true);
  // gutters
  const [gLen, setGLen] = useState(15);
  const [gWid, setGWid] = useState(10);
  const [roof, setRoof] = useState<RoofType>("gable");
  const [storeys, setStoreys] = useState(1);

  const product = getProduct(service)!;

  const result = useMemo(() => {
    if (service === "car-shades") {
      const r = estimateCarShade({ vehicles, type: vType, style, cover });
      const rows: Row[] = [
        { label: "Layout", value: r.layout },
        { label: "Overall size", value: `${r.width} m × ${r.depth} m` },
        { label: "Covered area", value: fmt(r.area, " m²"), strong: true },
        { label: "Support posts", value: `≈ ${r.posts}` },
        { label: "Roof", value: shadeCovers[cover].detail },
      ];
      const summary = [
        `Vehicles: ${r.vehicles} × ${vehicleBays[vType].label}`,
        `Style: ${style === "standard" ? "Standard (posts both sides)" : "Cantilever (posts one side)"}`,
        `Roof: ${shadeCovers[cover].label}`,
        `Est. size: ${r.width} m × ${r.depth} m (${r.area} m²), ${r.layout.toLowerCase()}, ≈${r.posts} posts`,
      ];
      return { rows, summary, key: { label: "Covered area", value: fmt(r.area, " m²") }, price: r.price, visual: <CarportVisual rows={r.rows} baysPerRow={r.baysPerRow} style={style} cover={cover} />, note: null as string | null };
    }
    if (service === "rubber-tiles") {
      const r = estimateTiles({ length: tLen, width: tWid, use, fall, edges });
      const rows: Row[] = [
        { label: "Floor area", value: fmt(r.area, " m²"), strong: true },
        { label: "Recommended thickness", value: r.thickness ? `${r.thickness} mm` : "Specialist system — talk to us", strong: true },
        { label: "Tiles (500 × 500 mm)", value: `≈ ${fmt(r.tiles)} incl. 5% cutting allowance` },
        ...(edges ? [{ label: "Edge ramps / corners", value: `≈ ${r.ramps} ramps · ${r.corners} corners` }] : []),
      ];
      const summary = [
        `Area: ${r.length} m × ${r.width} m (${r.area} m²)`,
        `Use: ${tileUses[use].label}${use === "playground" ? `, fall height ${fallHeights[fall].label}` : ""}`,
        `Est. ${r.thickness ? `${r.thickness} mm` : "specialist thickness"}, ≈${r.tiles} tiles${edges ? `, ≈${r.ramps} edge ramps + ${r.corners} corners` : ""}`,
      ];
      const note = r.thickness == null ? "Fall heights over 1.3 m need a thicker, specified safety surface — we'll advise on the right system." : null;
      return { rows, summary, key: { label: "Tiles needed", value: `≈ ${fmt(r.tiles)}` }, price: r.price, visual: <TilesVisual length={r.length} width={r.width} />, note };
    }
    const r = estimateGutters({ length: gLen, width: gWid, roof, storeys });
    const rows: Row[] = [
      { label: "Gutter length", value: fmt(r.gutter, " m"), strong: true },
      { label: "Downpipes", value: `${r.downpipes} × ≈${r.eaveHeight} m (${fmt(r.downpipeLength, " m")} total)`, strong: true },
      { label: "Suggested profile", value: `${r.profile} mm` },
      { label: roof === "hip" ? "Corners" : "End caps", value: `${roof === "hip" ? r.corners : r.endCaps}` },
      { label: "Approx. roof area", value: fmt(r.roofArea, " m²") },
    ];
    const summary = [
      `House: ${r.length} m × ${r.width} m, ${r.storeys} storey${r.storeys > 1 ? "s" : ""}, ${roofTypes[roof].label.toLowerCase()} roof`,
      `Est. ${r.gutter} m of ${r.profile} mm gutter, ${r.downpipes} downpipes (≈${r.downpipeLength} m)`,
    ];
    return { rows, summary, key: { label: "Gutter length", value: fmt(r.gutter, " m") }, price: r.price, visual: <GutterVisual storeys={r.storeys} roof={roof} downpipes={r.downpipes} />, note: null };
  }, [service, vehicles, vType, style, cover, tLen, tWid, use, fall, edges, gLen, gWid, roof, storeys]);

  const priceText = result.price ? formatPrice(result.price) : null;
  const message = [
    `Hi ${site.name}, I used the project planner on your website.`,
    "",
    `${product.name} estimate:`,
    ...result.summary.map((l) => `• ${l}`),
    ...(priceText ? [`• Estimated price: ${priceText} (estimate only${result.price!.sample ? ", sample prices" : ""})`] : []),
    "",
    "Please send me a free quotation.",
  ].join("\n");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
      {/* ── Inputs ── */}
      <div className="rounded-3xl border bg-card p-5 shadow-sm sm:p-7">
        <div role="tablist" aria-label="Choose a service" className="grid grid-cols-3 gap-1 rounded-2xl bg-muted p-1">
          {products.map((p) => (
            <button
              key={p.slug}
              role="tab"
              aria-selected={service === p.slug}
              onClick={() => pick(p.slug)}
              className={cn("relative flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors sm:flex-row sm:justify-center sm:gap-2 sm:text-sm", service === p.slug ? "text-white" : "text-muted-foreground hover:text-ink")}
            >
              {service === p.slug && <motion.span layoutId="est-tab" className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand to-brand-dark shadow" transition={{ type: "spring", bounce: 0.2, duration: 0.45 }} />}
              <ProductIcon icon={p.icon} className="relative size-5" />
              <span className="relative text-center leading-tight">{p.name.replace("Interlocking ", "")}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={service} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mt-7 grid gap-7">
            {service === "car-shades" && (
              <>
                <Field label="How many vehicles?" hint="Bays to cover">
                  <Stepper label="vehicles" value={vehicles} onChange={setVehicles} min={1} max={40} unit="cars" />
                </Field>
                <Field label="Vehicle type" hint="Sets the bay size">
                  <Choice name="vehicle-type" columns={3} value={vType} onChange={setVType} options={(Object.keys(vehicleBays) as VehicleType[]).map((k) => ({ value: k, label: vehicleBays[k].label, hint: vehicleBays[k].hint }))} />
                </Field>
                <Field label="Roof type" hint="Three options — any can be standard or cantilever">
                  <Choice name="shade-cover" columns={3} value={cover} onChange={setCover} options={(Object.keys(shadeCovers) as ShadeCover[]).map((k) => ({ value: k, label: shadeCovers[k].label, hint: shadeCovers[k].hint }))} />
                </Field>
                <Field label="Structure style" hint="Works with any roof type">
                  <Choice name="shade-style" value={style} onChange={setStyle} options={[{ value: "standard", label: "Standard", hint: "Posts on both sides" }, { value: "cantilever", label: "Cantilever", hint: "Posts on one side — easier parking" }]} />
                </Field>
              </>
            )}
            {service === "rubber-tiles" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Length">
                    <Stepper label="length" value={tLen} onChange={setTLen} min={0.5} max={200} step={0.5} unit="m" />
                  </Field>
                  <Field label="Width">
                    <Stepper label="width" value={tWid} onChange={setTWid} min={0.5} max={200} step={0.5} unit="m" />
                  </Field>
                </div>
                <Field label="What's the floor for?" hint="Sets the recommended thickness">
                  <Choice name="tile-use" columns={3} value={use} onChange={setUse} options={(Object.keys(tileUses) as TileUse[]).map((k) => ({ value: k, label: tileUses[k].label, hint: tileUses[k].hint }))} />
                </Field>
                {use === "playground" && (
                  <Field label="Highest fall point of the equipment" hint="Platform or swing seat height">
                    <Choice name="fall-height" columns={3} value={fall} onChange={setFall} options={(Object.keys(fallHeights) as FallHeight[]).map((k) => ({ value: k, label: fallHeights[k].label }))} />
                  </Field>
                )}
                <Field label="Exposed edges?" hint="Ramps give a trip-free edge where the floor meets open ground">
                  <Choice name="edges" value={edges ? "yes" : "no"} onChange={(v) => setEdges(v === "yes")} options={[{ value: "yes", label: "Yes, add edge ramps" }, { value: "no", label: "No, wall to wall" }]} />
                </Field>
              </>
            )}
            {service === "seamless-gutters" && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="House length" hint="Longest wall">
                    <Stepper label="house length" value={gLen} onChange={setGLen} min={3} max={200} step={0.5} unit="m" />
                  </Field>
                  <Field label="House width" hint="Shorter wall">
                    <Stepper label="house width" value={gWid} onChange={setGWid} min={3} max={200} step={0.5} unit="m" />
                  </Field>
                </div>
                <Field label="Number of storeys" hint="Sets downpipe length (≈3 m per storey)">
                  <Choice name="storeys" columns={3} value={String(storeys)} onChange={(v) => setStoreys(Number(v))} options={["1", "2", "3"].map((n) => ({ value: n, label: n === "1" ? "Single storey" : n === "2" ? "Double storey" : "Three storeys" }))} />
                </Field>
                <Field label="House roof shape" hint="Where the gutters run — not the carport roof">
                  <Choice name="house-roof-shape" value={roof} onChange={setRoof} options={(Object.keys(roofTypes) as RoofType[]).map((k) => ({ value: k, label: roofTypes[k].label, hint: roofTypes[k].hint }))} />
                </Field>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Result ── */}
      <div id="estimate-result" className="scroll-mt-20 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-xl shadow-ink/20">
          <div className="relative h-64 bg-white sm:h-72">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-logo-cyan via-logo-blue to-magenta" />
            <AnimatePresence mode="wait" initial={false}>
              {/* explicit box so the SVG (size-full, aspect "meet") always fits inside */}
              <motion.div key={service} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="absolute inset-x-5 top-6 bottom-4">
                {result.visual}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="p-6 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-highlight uppercase">
                <ProductIcon icon={product.icon} className="size-4" /> Your {product.name.toLowerCase()} estimate
              </p>
              <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-[0.65rem] font-semibold tracking-wide text-white/80 uppercase">Estimate only</span>
            </div>
            <dl className="mt-4 divide-y divide-white/10" aria-live="polite">
              {result.rows.map((r) => (
                <div key={r.label} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-sm text-white/60">{r.label}</dt>
                  <dd className={cn("text-right tabular-nums", r.strong ? "font-heading text-lg font-bold" : "text-sm font-medium")}>{r.value}</dd>
                </div>
              ))}
              <div className="flex items-start justify-between gap-4 pt-4 pb-1">
                <dt className="text-sm text-white/60">
                  Estimated price
                  <span className="block text-xs text-white/40">indicative range, ±{Math.round(pricingSpread * 100)}%</span>
                </dt>
                <dd className="text-right">
                  {result.price ? (
                    <>
                      <span className="block bg-gradient-to-r from-logo-cyan to-magenta bg-clip-text font-heading text-2xl font-extrabold text-transparent tabular-nums">{priceText}</span>
                      {result.price.sample && (
                        <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-400/15 px-2 py-0.5 text-[0.7rem] font-semibold text-amber-300">
                          <TbAlertTriangle className="size-3.5" /> Sample prices
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-sm font-medium">Free quotation</span>
                  )}
                </dd>
              </div>
            </dl>
            {result.note && <p className="mt-3 rounded-xl bg-magenta/15 px-3 py-2 text-sm text-white/90">{result.note}</p>}
            <div className="mt-6 grid gap-2 sm:grid-cols-2">
              <a
                href={whatsappLink(message)}
                target="_blank"
                rel="noopener"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 font-semibold text-white transition-colors hover:bg-[#1fb957]"
              >
                <FaWhatsapp className="size-5" /> Send on WhatsApp
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`${product.name} estimate`)}&body=${encodeURIComponent(message)}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/20 px-5 font-medium transition-colors hover:bg-white/10"
              >
                <TbMail className="size-5" /> Email it
              </a>
            </div>
            <p className="mt-5 flex gap-2 rounded-xl bg-white/5 p-3 text-xs leading-relaxed text-white/60">
              <TbInfoCircle className="mt-0.5 size-4 shrink-0 text-highlight" />
              <span>
                <strong className="font-semibold text-white/85">This is an estimate, not a quotation.</strong> Quantities use standard rules of thumb and prices
                are indicative. Your final price is confirmed in a free, itemised quotation after we measure.
              </span>
            </p>
          </div>
        </div>
        <Link href={`/products/${product.slug}/`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
          Learn more about {product.name.toLowerCase()} <TbArrowRight className="size-4" />
        </Link>
      </div>

      {/* Mobile: live key figure pinned to the bottom so input changes are visible without scrolling */}
      <div className="h-16 lg:hidden" aria-hidden />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3 text-white backdrop-blur-lg lg:hidden">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <a href="#estimate-result" className="min-w-0 flex-1">
            <span className="block text-xs text-white/60">{result.key.label}</span>
            <span className="block font-heading text-lg leading-tight font-bold tabular-nums" aria-live="polite">{result.key.value}</span>
            {priceText && (
              <span className="block truncate text-xs text-white/70 tabular-nums">
                Est. {priceText}
                {result.price!.sample && <span className="text-amber-300"> · sample</span>}
              </span>
            )}
          </a>
          <a href="#estimate-result" className="shrink-0 rounded-full border border-white/20 px-3.5 py-2 text-sm font-medium">
            See estimate
          </a>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener"
            aria-label="Send estimate on WhatsApp"
            className="grid size-11 shrink-0 place-items-center rounded-full bg-[#25D366] text-white"
          >
            <FaWhatsapp className="size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
