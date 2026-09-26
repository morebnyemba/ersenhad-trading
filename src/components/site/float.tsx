"use client";

import { motion, type HTMLMotionProps } from "motion/react";

// Gentle idle bob for floating hero cards. Disabled automatically for
// prefers-reduced-motion via the global <MotionConfig reducedMotion="user">.
export function Float({ delay = 0, distance = 8, duration = 6, ...props }: HTMLMotionProps<"div"> & { delay?: number; distance?: number; duration?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: [0, -distance, 0], scale: 1 }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale: { duration: 0.6, delay },
        y: { duration, delay: delay + 0.6, repeat: Infinity, ease: "easeInOut" },
      }}
      {...props}
    />
  );
}
