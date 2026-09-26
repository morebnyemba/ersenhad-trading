import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5 font-heading font-bold tracking-tight", className)} aria-label="Ersenhad Trading — home">
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md shadow-brand/30">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden>
          <path d="M4 9 12 4l8 5" />
          <path d="M7 13h10M7 17h7" />
        </svg>
      </span>
      <span className={cn("leading-none", inverted ? "text-white" : "text-ink")}>
        Ersenhad
        <span className={cn("mt-0.5 block text-[0.7rem] font-medium tracking-[0.2em] uppercase", inverted ? "text-white/60" : "text-muted-foreground")}>
          Trading
        </span>
      </span>
    </Link>
  );
}
