import { useId } from "react";
import { cn } from "@/lib/utils";

// Magic UI — DotPattern background
export function DotPattern({ className, gap = 22, r = 1 }: { className?: string; gap?: number; r?: number }) {
  const id = useId();
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full fill-current", className)}>
      <defs>
        <pattern id={id} width={gap} height={gap} patternUnits="userSpaceOnUse">
          <circle cx={gap / 2} cy={gap / 2} r={r} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
