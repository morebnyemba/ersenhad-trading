"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

// Magic UI — NumberTicker: springs from 0 to `value` once scrolled into view.
export function NumberTicker({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const inView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(
    () =>
      spring.on("change", (v) => {
        if (ref.current) ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(v));
      }),
    [spring],
  );

  // Server-render the final value so no-JS visitors and crawlers see real numbers.
  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {value}
    </span>
  );
}
