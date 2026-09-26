import type { Metadata } from "next";
import { Estimator } from "@/components/estimator/estimator";
import { CtaBand } from "@/components/site/cta-band";
import { FaqSection } from "@/components/site/faq-section";
import { PageHero } from "@/components/site/page-hero";
import { estimatorFaqs } from "@/lib/faqs";
import { imageSrc } from "@/lib/gallery";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Project planner",
  description: "Estimate your car shade, rubber flooring or gutter project in a minute — layout, quantities and a price range — then send it for a free quotation.",
  path: "/estimate/",
  image: "estimate",
});

export default function EstimatePage() {
  return (
    <>
      <PageHero
        eyebrow="Project planner"
        title="Estimate your project in a minute"
        description="Tell us how many cars, how big the floor, or the size and height of your house — see the layout, quantities and an estimated price range instantly, then send it to us for a free quotation."
        image={imageSrc("shade-sails-blue")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Project planner" }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
        <Estimator />
      </section>
      <FaqSection faqs={estimatorFaqs} title="About the planner" className="border-t" />
      <CtaBand title="Prefer to talk it through?" body="Message us with photos and rough sizes — we'll send a free, itemised quotation." primary={{ href: "/contact/", label: "Contact us" }} />
    </>
  );
}
