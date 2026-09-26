"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";

// typed.js rotating text. The first string is server-rendered so the headline
// is complete for crawlers, no-JS visitors and reduced-motion users.
export function TypedText({ strings, className }: { strings: string[]; className?: string }) {
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
    });
    return () => typed.destroy();
  }, [strings]);

  return (
    <span className={className}>
      <span ref={el}>{strings[0]}</span>
    </span>
  );
}
