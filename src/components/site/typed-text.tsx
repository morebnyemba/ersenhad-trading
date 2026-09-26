"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { cn } from "@/lib/utils";

// typed.js rotating text. The first string is server-rendered so the headline
// is complete for crawlers, no-JS visitors and reduced-motion users.
// `className` styles the line wrapper; `textClassName` the text itself (e.g. a
// gradient clipped to the text, so it always spans exactly the typed phrase).
export function TypedText({ strings, className, textClassName }: { strings: string[]; className?: string; textClassName?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // typed.js backspaces the element's existing text first and folds it into
    // the loop, so pass only the remaining strings.
    const typed = new Typed(el.current, {
      strings: strings.slice(1),
      typeSpeed: 55,
      backSpeed: 30,
      backDelay: 2200,
      startDelay: 2200,
      loop: true,
      smartBackspace: true,
      // Cursor is drawn with CSS (::after) — typed.js's inline cursor node moves on every
      // keystroke and registers as layout shift (CLS).
      showCursor: false,
    });
    return () => typed.destroy();
  }, [strings]);

  return (
    <span className={className}>
      <span ref={el} className={cn("after:ml-1 after:inline-block after:w-[0.08em] after:animate-pulse after:bg-current after:align-[-0.1em] after:content-[''] after:[height:0.9em]", textClassName)}>{strings[0]}</span>
    </span>
  );
}
