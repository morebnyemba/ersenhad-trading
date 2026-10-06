export type ProductSlug = "car-shades" | "rubber-tiles" | "seamless-gutters";

export type Product = {
  slug: ProductSlug;
  cover: string;
  highlights: { value: number; suffix: string; label: string }[];
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
    cover: "shade-cantilever-suv",
    highlights: [{ value: 3, suffix: "", label: "roof types" }, { value: 2, suffix: " days", label: "typical install" }],
    name: "Car Shades",
    short: "Chromadek, shade net and PVC carports that protect vehicles from sun, hail and heat.",
    intro:
      "Choose from three roof types — Chromadek steel sheeting, high-density shade net or PVC membrane — on a galvanised steel frame, built as a standard or cantilever structure. We design, fabricate and install single-bay carports through to multi-bay commercial parking structures.",
    icon: "shade",
    features: [
      { title: "Three roof types", body: "Chromadek steel sheeting for a solid, waterproof roof; shade net for cool, breathable shade with up to 95% UV block; or a smooth, waterproof PVC membrane." },
      { title: "Hail & weather resistant", body: "Chromadek roofs, tensioned membranes and engineered steel frames stand up to hail, wind and heavy rain." },
      { title: "Standard or cantilever", body: "Posts on both sides, or cantilever with posts on one side for easier parking — available with any roof type, including double cantilever." },
      { title: "Corrosion-proof frames", body: "Hot-dip galvanised and powder-coated steel for a long, maintenance-free life." },
    ],
    options: ["Chromadek steel roof sheeting (waterproof)", "Shade net (80–95% UV block-out)", "PVC membrane (100% waterproof)", "Standard, cantilever or double cantilever", "Single, double & multi-bay", "Colours to match your property"],
    uses: ["Homes & townhouse complexes", "Offices & retail parking", "Schools & churches", "Hospitals & car dealerships"],
    faqs: [
      { q: "How long does installation take?", a: "Most residential carports are installed in 1–2 days once the frame is fabricated." },
      { q: "Which roof type should I choose?", a: "Chromadek steel sheeting gives a solid, fully waterproof and hail-proof roof. Shade net is the coolest option and lets rain through. PVC membrane is waterproof with a smooth fabric finish. We'll advise based on your site and budget." },
      { q: "What is a cantilever carport?", a: "A cantilever carport has posts on one side only, with the roof overhanging the parking bays, so there are no posts to drive around. It can be built with any of our three roof types." },
      { q: "Do you need to dig foundations?", a: "Yes — columns are set in concrete footings sized for the wind load of each design." },
      { q: "Can you build shade for commercial car parks?", a: "Yes. We build everything from single-bay carports to multi-bay commercial parking structures for offices, retail, schools and dealerships." },
      { q: "What colours are available?", a: "Chromadek sheeting, shade net and PVC membranes all come in a range of colours, and frames are powder-coated — we'll match your property and can show you samples before you decide." },
    ],
    quoteFields: [
      { label: "Number of vehicles", placeholder: "e.g. 2" },
      { label: "Preferred roof & style", placeholder: "e.g. Chromadek, cantilever" },
    ],
  },
  {
    slug: "rubber-tiles",
    cover: "tiles-plant-room",
    highlights: [{ value: 40, suffix: "mm", label: "max. thickness" }, { value: 5, suffix: "", label: "colour options" }],
    name: "Interlocking Rubber Tiles",
    short: "Durable, shock-absorbing rubber flooring for gyms, playgrounds and walkways.",
    intro:
      "Made from recycled rubber granules, our interlocking tiles clip together without glue to create a slip-resistant, cushioned surface. They are ideal where safety, drainage and durability matter.",
    icon: "tiles",
    features: [
      { title: "Impact absorbing", body: "Cushions falls on playgrounds and protects gym floors from dropped weights." },
      { title: "Slip resistant", body: "Textured surface grips even when wet — perfect for pool surrounds and walkways." },
      { title: "Glue-free install", body: "Puzzle-edge tiles lock together, so damaged tiles can be swapped individually." },
      { title: "Eco-friendly", body: "Manufactured from recycled tyres and fully weatherproof for indoor or outdoor use." },
    ],
    options: ["15mm, 20mm, 25mm, 30mm & 40mm thickness", "Black, red, green, blue & grey", "Edge ramps & corner pieces", "Supply only or supply & install"],
    uses: ["Gyms & fitness studios", "Children's playgrounds & schools", "Pool surrounds & patios", "Stables, kennels & workshops"],
    faqs: [
      { q: "What base do the tiles need?", a: "A level concrete, paving or compacted gravel base. We can prepare the base as part of the job." },
      { q: "Which thickness should I choose?", a: "20–25mm suits gyms and walkways; 30–40mm is recommended under play equipment for fall protection." },
      { q: "Are they suitable outdoors?", a: "Yes — they are UV and weather resistant and allow water to drain through the joints." },
      { q: "Can I buy the tiles without installation?", a: "Yes. Rubber tiles are available supply-only, with edge ramps and corner pieces, or as a full supply-and-install job." },
      { q: "How do I clean and maintain them?", a: "Sweep regularly and hose down when needed; a mild detergent handles stubborn marks. Damaged tiles can be unclipped and replaced individually." },
    ],
    quoteFields: [
      { label: "Area (m²)", placeholder: "e.g. 60" },
      { label: "Thickness / colour", placeholder: "e.g. 25mm, green" },
    ],
  },
  {
    slug: "seamless-gutters",
    cover: "gutter-white-downpipe",
    highlights: [{ value: 150, suffix: "mm", label: "max. profile" }, { value: 1, suffix: " day", label: "typical house" }],
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
