"use client";

import { motion, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; as?: "div" | "li" };

// Fade/slide-in on first scroll into view. Respects prefers-reduced-motion via <MotionConfig reducedMotion="user">.
export function Reveal({ delay = 0, y = 24, as = "div", ...props }: RevealProps) {
  const Comp = as === "li" ? motion.li : motion.div;
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      {...(props as HTMLMotionProps<"div"> & HTMLMotionProps<"li">)}
    />
  );
}
