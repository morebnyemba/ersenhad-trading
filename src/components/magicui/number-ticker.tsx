"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// Magic UI — NumberTicker (tuned): a short ease-out count (≈1.2s) that starts when
// scrolled into view. Values under 10 are shown as-is — counting "0 → 2 days" reads
// as a wrong number, not an animation. The final value is server-rendered, so
// crawlers, no-JS and reduced-motion visitors always see the real figure.
export function NumberTicker({ value, className, duration = 1.2 }: { value: number; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const animateIt = value >= 10 && !reduce;

  useEffect(() => {
    if (!inView || !animateIt || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = Math.round(v).toLocaleString("en-US")),
    });
    return () => controls.stop();
  }, [inView, animateIt, value, duration]);

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {value.toLocaleString("en-US")}
    </span>
  );
}
