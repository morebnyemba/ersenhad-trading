import type { ProductSlug } from "@/lib/products";

/** Every "Get a free quote" action starts in the project planner. */
export const quoteHref = (service?: ProductSlug) => (service ? `/estimate/?service=${service}` : "/estimate/");
