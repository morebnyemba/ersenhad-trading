import { site } from "@/lib/site";

export type Faq = { q: string; a: string };

// Answers only restate what the business already commits to on this site.
// Anything the site can't know (guarantee length, payment terms) points to the
// written quotation instead of inventing a figure.
// TODO(owner): confirm service area and add payment terms / guarantee period.

export const generalFaqs: Faq[] = [
  {
    q: "How much will my project cost?",
    a: "Every site is different, so we price once we know your site and requirements. As a guide, car shades are priced by size, roof type and structure style, rubber tiles per square metre and thickness, and seamless gutters per metre including downpipes and fittings. Send us rough sizes on WhatsApp for an indicative figure.",
  },
  {
    q: "Are your quotations free?",
    a: "Yes. Quotations are free, written and itemised, and there's no obligation to go ahead. Where we need to measure on site, we'll arrange a visit with you when we reply.",
  },
  {
    q: "Which areas do you cover?",
    a: `We're based in ${site.address.city} and work across ${site.address.city} and surrounding areas. For projects further afield, send us the location and we'll confirm.`,
  },
  {
    q: "How long does an installation take?",
    a: "It depends on the job. A typical residential carport is installed in one to two days once the frame is fabricated, and seamless gutters for an average house are usually done in a day. Rubber flooring depends on the area and the condition of the base. Your quotation includes a timeline.",
  },
  {
    q: "Is your work guaranteed?",
    a: "Yes. Every installation is backed by our written workmanship guarantee — the terms are set out on your quotation.",
  },
  {
    q: "Can you handle more than one service on the same property?",
    a: "Yes — for example a carport with seamless gutters, or rubber flooring under a shaded play area. One team and one combined quotation.",
  },
];

export const galleryFaqs: Faq[] = [
  {
    q: "Can I see examples similar to my project?",
    a: "Yes. Tell us what you're planning and we'll share photos of comparable jobs — the same product, size or type of property.",
  },
  {
    q: "Can I send photos of my site for advice?",
    a: "Please do. WhatsApp us a few photos and rough measurements; it helps us advise on options and quote accurately.",
  },
  {
    q: "Can you match colours to my property?",
    a: "Yes. Shade fabrics and PVC membranes, rubber tiles and pre-painted aluminium gutters all come in a range of colours — we can show you samples before you decide.",
  },
  {
    q: "Do you work on commercial and school projects?",
    a: "Yes. Alongside homes we work on offices, retail parking, schools, churches, gyms and other institutions.",
  },
];

export const aboutFaqs: Faq[] = [
  {
    q: "Do you use subcontractors?",
    a: "No. The team that measures your site is the team that installs it, so there's one point of accountability from quote to hand-over.",
  },
  {
    q: "Where are you based?",
    a: `We're based at ${site.address.street}, ${site.address.city}. Call ahead if you'd like to visit — most of our time is spent on site.`,
  },
  {
    q: "What kinds of clients do you work with?",
    a: "Homeowners, townhouse complexes, businesses, schools, churches and other institutions — anywhere that needs shade, safe flooring or reliable guttering.",
  },
  {
    q: "Can I buy materials without installation?",
    a: "Rubber tiles are available supply-only. For car shades and seamless gutters we normally supply and install — ask us about your specific needs.",
  },
];

export const contactFaqs: Faq[] = [
  {
    q: "How quickly will you get back to me?",
    a: "We usually reply within one business day. WhatsApp is the fastest way to reach us.",
  },
  {
    q: "What should I include in my enquiry?",
    a: "Your location, what you need, rough sizes (number of vehicles, floor area or roofline length) and, if possible, a few photos of the site.",
  },
  {
    q: "Can you come and measure my site?",
    a: `Yes — where accurate measurements are needed we'll arrange a site visit. Our hours are ${site.hours}; we'll agree a time when we reply.`,
  },
  {
    q: "Do I need to be there if you visit?",
    a: "It helps. We can walk through options, colours and access with you on the spot, and answer questions before we quote.",
  },
];

export const estimatorFaqs: Faq[] = [
  {
    q: "How accurate is the planner?",
    a: "It uses standard rules of thumb — bay sizes, tile counts with a cutting allowance, one downpipe per roughly 10 m of gutter — so it's a good starting point. We confirm every figure by measuring before we quote.",
  },
  {
    q: "Is the estimated price what I'll pay?",
    a: "No — it's an indicative range to help you plan. Your actual price depends on materials, site conditions and access, and is confirmed in a free, itemised quotation after we measure.",
  },
  {
    q: "What happens after I send my estimate?",
    a: "We usually reply within one business day. We may ask for a few photos or arrange to measure on site before sending your quotation.",
  },
  {
    q: "My project doesn't fit the options — what now?",
    a: "Send us the details on WhatsApp. Mixed vehicle sizes, odd-shaped floors and complex roofs are all common — the planner just covers the typical cases.",
  },
];
