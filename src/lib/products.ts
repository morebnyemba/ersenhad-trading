import { pricing, type ShadePackage, type ShadeType } from "@/config/pricing";

/** list price of a car shade package, formatted (e.g. "1,300") */
const from = (type: ShadeType, size: ShadePackage = 1) => (pricing.carShades.packages[type][size] ?? 0).toLocaleString("en-US");

export type ProductSlug = "car-shades" | "rubber-tiles" | "seamless-gutters";

export type Product = {
  slug: ProductSlug;
  cover: string;
  highlights: { value: number; suffix: string; label: string }[];
  /** short key/value lines for the "Specs at a glance" cards */
  specs: { label: string; value: string }[];
  name: string;
  short: string;
  intro: string;
  icon: "shade" | "tiles" | "gutter";
  features: { title: string; body: string }[];
  options: string[];
  uses: string[];
  faqs: { q: string; a: string }[];
  quoteFields: { label: string; placeholder: string }[];
};

export const products: Product[] = [
  {
    slug: "car-shades",
    cover: "shade-curved-suv",
    highlights: [{ value: 3, suffix: "", label: "shade types" }, { value: 2, suffix: " days", label: "typical install" }],
    specs: [
      { label: "Types", value: "Cantilever · curved · Chromadek" },
      { label: "Sizes", value: "Single, double, triple" },
      { label: "Single from", value: `${pricing.currency} ${from("cantilever")}` },
    ],
    name: "Car Shades",
    short: "Cantilever, curved and Chromadek car shades that protect vehicles from sun, hail and heat.",
    intro:
      "Choose from three types of car shade: cantilever shades with shade net on a steel post frame, curved shades with sweeping steel arms, and Chromadek shades with a flat, waterproof steel-sheet roof. Each comes as a single, double or triple shade, and we combine them for bigger parking areas — designed, fabricated and installed by our team.",
    icon: "shade",
    features: [
      { title: "Three shade types", body: "Cantilever for the best value, curved for a modern look, or Chromadek for a solid, waterproof roof." },
      { title: "Single, double or triple", body: "Standard sizes for one, two or three cars, placed side by side for bigger car parks." },
      { title: "Hail & weather resistant", body: "Chromadek roofs and tensioned shade net on steel frames stand up to hail, wind and heavy rain." },
      { title: "Corrosion-proof frames", body: "Hot-dip galvanised and powder-coated steel for a long, maintenance-free life." },
    ],
    options: ["Cantilever shades — shade net on steel posts", "Curved shades — curved steel arms with shade net", "Chromadek shades — flat, waterproof steel roof", "Single, double & triple sizes", "Multi-bay layouts for car parks", "Net and frame colours to match your property"],
    uses: ["Homes & townhouse complexes", "Offices & retail parking", "Schools & churches", "Hospitals & car dealerships"],
    faqs: [
      {
        q: "How much does a car shade cost?",
        a: `Cantilever shades are ${pricing.currency} ${from("cantilever")} for a single, ${pricing.currency} ${from("cantilever", 2)} for a double and ${pricing.currency} ${from("cantilever", 3)} for a triple. Curved shades are ${pricing.currency} ${from("curved")}, ${pricing.currency} ${from("curved", 2)} and ${pricing.currency} ${from("curved", 3)}, and Chromadek shades ${pricing.currency} ${from("chromadek")}, ${pricing.currency} ${from("chromadek", 2)} and ${pricing.currency} ${from("chromadek", 3)}. Use the project planner for a quick estimate — we confirm the price in a free quotation.`,
      },
      { q: "Which type should I choose?", a: "Cantilever shades are the most affordable and give cool, breathable shade. Curved shades have a modern, sweeping look. Chromadek gives a solid roof that keeps out rain and hail. We'll advise based on your site and budget." },
      { q: "What's the difference between cantilever and curved shades?", a: "A cantilever shade has shade net stretched over a frame of straight steel posts. A curved shade uses curved steel arms that sweep over the parking bay. Both use shade net; Chromadek shades use a flat steel-sheet roof instead." },
      { q: "How long does installation take?", a: "Most residential car shades are installed in 1–2 days once the frame is fabricated." },
      { q: "Do you need to dig foundations?", a: "Yes — posts are set in concrete footings sized for the wind load of each design." },
      { q: "Can you build shade for commercial car parks?", a: "Yes. We combine single, double and triple shades into multi-bay layouts for offices, retail, schools and dealerships." },
      { q: "What colours are available?", a: "Shade net and Chromadek sheeting come in a range of colours, and frames are powder-coated — we'll match your property and can show you samples before you decide." },
    ],
    quoteFields: [
      { label: "Number of vehicles", placeholder: "e.g. 2" },
      { label: "Preferred type", placeholder: "e.g. cantilever" },
    ],
  },
  {
    slug: "rubber-tiles",
    cover: "tiles-plant-room",
    highlights: [{ value: 500, suffix: "mm", label: "square tiles" }, { value: 6, suffix: "", label: "colours" }],
    specs: [
      { label: "Surface", value: "Raised coin top" },
      { label: "Joints", value: "Dovetail, no glue" },
      { label: "Stairs", value: "Aluminium nosing" },
    ],
    name: "Interlocking Rubber Tiles",
    short: "Coin-top interlocking floor tiles for plant rooms, workshops, offices and stairs.",
    intro:
      "Heavy-duty coin-top tiles with dovetail edges that lock together without glue. The raised coins give grip underfoot, the floor is comfortable to stand on all day, and most rooms are laid in a day — with no adhesive to cure before you use the space.",
    icon: "tiles",
    features: [
      { title: "Coin-top grip", body: "Raised coins give a sure footing and channel away dust and spills, so the surface stays grippy." },
      { title: "Glue-free dovetail joints", body: "Tiles lock together over concrete or screed. Any damaged tile can be unclipped and replaced on its own." },
      { title: "Built for hard use", body: "Stands up to foot traffic, trolleys and equipment in plant rooms, workshops and warehouses." },
      { title: "Floors and stairs", body: "We cut tiles to each stair tread and finish the edge with aluminium nosing for a neat, non-slip staircase." },
    ],
    options: ["500 × 500 mm interlocking tiles", "Black, grey, yellow, red, blue & green", "Mix colours to mark walkways and zones", "Stair covering with aluminium nosing", "Edge ramps for exposed edges", "Supply only or supply & install"],
    uses: ["Plant rooms & switch rooms", "Workshops, garages & warehouses", "Offices, shops & corridors", "Stairs, gyms & play areas"],
    faqs: [
      { q: "What floor do the tiles go on?", a: "A level, dry concrete or screed floor. We check the base when we measure and tell you if it needs any preparation first." },
      { q: "Are the tiles glued down?", a: "No. The dovetail edges lock the tiles together, so the floor stays in place without adhesive and single tiles can be lifted and replaced." },
      { q: "Can you cover stairs?", a: "Yes. We cut tiles to fit each tread and fix aluminium nosing along the front edge for a neat, non-slip finish." },
      { q: "Which colours are available?", a: "Black, grey, yellow, red, blue and green. Colours can be mixed — for example to mark walkways, loading zones or play areas." },
      { q: "Can I buy the tiles without installation?", a: "Yes. Tiles and edge ramps are available supply-only, or as a full supply-and-install job." },
      { q: "How do I clean them?", a: "Sweep or vacuum regularly and mop with a mild detergent. The coins lift dirt off the walking surface, so the floor is easy to keep looking clean." },
    ],
    quoteFields: [
      { label: "Area (m²)", placeholder: "e.g. 30" },
      { label: "Room / colour", placeholder: "e.g. plant room, black" },
    ],
  },
  {
    slug: "seamless-gutters",
    cover: "gutter-white-downpipe",
    highlights: [{ value: 150, suffix: "mm", label: "max. profile" }, { value: 1, suffix: " day", label: "typical house" }],
    specs: [
      { label: "Material", value: "Pre-painted aluminium" },
      { label: "Profiles", value: "125 & 150 mm" },
      { label: "Downpipes", value: "Round or square" },
    ],
    name: "Seamless Gutters",
    short: "Leak-free aluminium gutters roll-formed on site to the exact length of your roof.",
    intro:
      "Seamless gutters are formed on site from a continuous coil of pre-painted aluminium, so there are no joints along the run to leak, rust or sag. The result is a cleaner look and far less maintenance than sectional gutters.",
    icon: "gutter",
    features: [
      { title: "No joints, no leaks", body: "One continuous length per run — seams only at corners and outlets." },
      { title: "Made on site", body: "Our roll-forming machine cuts each gutter to the exact length of your roofline." },
      { title: "Rust-free aluminium", body: "Pre-painted aluminium won't rust and keeps its colour for years." },
      { title: "Complete system", body: "Downpipes, brackets, end caps and optional leaf guards installed as one system." },
    ],
    options: ["125mm & 150mm profiles", "Wide range of colours", "Round or square downpipes", "Leaf guards & rainwater tank connections"],
    uses: ["New builds & re-roofing", "Replacing leaking PVC or steel gutters", "Commercial & industrial buildings", "Rainwater harvesting systems"],
    faqs: [
      { q: "How are seamless gutters priced?", a: "Per metre, including downpipes and fittings. Send us your roofline length or plans for a quote." },
      { q: "Can you replace my existing gutters?", a: "Yes — we remove old gutters and fascia fixings before installing the new system." },
      { q: "How long does installation take?", a: "A typical house is completed in a single day." },
      { q: "Do you fit leaf guards?", a: "Yes. Leaf guards can be added to keep gutters clear, which is especially useful near trees." },
      { q: "Can the gutters feed a rainwater tank?", a: "Yes. We can route downpipes to rainwater tanks as part of the installation." },
    ],
    quoteFields: [
      { label: "Approx. gutter length (m)", placeholder: "e.g. 45" },
      { label: "Colour / profile", placeholder: "e.g. charcoal, 150mm" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productName = (slug: ProductSlug) => getProduct(slug)!.name;
