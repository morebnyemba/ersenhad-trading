export type Product = {
  slug: string;
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
    name: "Car Shades",
    short: "UV-stabilised shade ports that protect vehicles from sun, hail and heat.",
    intro:
      "Our car shade ports combine a galvanised steel frame with high-density shade net or PVC membrane to keep vehicles cool and protected all year round. We design, fabricate and install single-bay carports through to multi-bay commercial parking structures.",
    icon: "shade",
    features: [
      { title: "UV protection", body: "UV-stabilised fabric blocks up to 95% of harmful rays, preventing faded paint and cracked dashboards." },
      { title: "Hail & weather resistant", body: "Tensioned membranes and engineered steel frames stand up to hail, wind and heavy rain." },
      { title: "Custom designs", body: "Cantilever, double-cantilever, pyramid, hip and sail styles sized to your space." },
      { title: "Corrosion-proof frames", body: "Hot-dip galvanised and powder-coated steel for a long, maintenance-free life." },
    ],
    options: ["Shade net (80–95% block-out)", "PVC membrane (100% waterproof)", "Single, double & multi-bay", "Colours to match your property"],
    uses: ["Homes & townhouse complexes", "Offices & retail parking", "Schools & churches", "Hospitals & car dealerships"],
    faqs: [
      { q: "How long does installation take?", a: "Most residential carports are installed in 1–2 days once the frame is fabricated." },
      { q: "Shade net or PVC?", a: "Shade net is cooler and lets rain through; PVC is fully waterproof. We'll advise based on your site." },
      { q: "Do you need to dig foundations?", a: "Yes — columns are set in concrete footings sized for the wind load of each design." },
    ],
    quoteFields: [
      { label: "Number of vehicles", placeholder: "e.g. 2" },
      { label: "Preferred style / material", placeholder: "e.g. double cantilever, PVC" },
    ],
  },
  {
    slug: "rubber-tiles",
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
    ],
    quoteFields: [
      { label: "Area (m²)", placeholder: "e.g. 60" },
      { label: "Thickness / colour", placeholder: "e.g. 25mm, green" },
    ],
  },
  {
    slug: "seamless-gutters",
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
    ],
    quoteFields: [
      { label: "Approx. gutter length (m)", placeholder: "e.g. 45" },
      { label: "Colour / profile", placeholder: "e.g. charcoal, 150mm" },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
