import Link from "next/link";
import { cn } from "@/lib/utils";

// Official Ersenhad Trading lockup. `inverted` swaps to the white-wordmark
// variant for dark backgrounds (the mark itself is never recoloured).
// Intrinsic size 765×240 → aspect ≈ 3.19; set the height, width follows.
export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <Link href="/" aria-label="Ersenhad Trading — home" className={cn("inline-flex shrink-0 items-center", className)}>
      <picture>
        <source srcSet={inverted ? "/brand/logo-light.webp" : "/brand/logo.webp"} type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={inverted ? "/brand/logo-light.png" : "/brand/logo.png"}
          alt="Ersenhad Trading"
          width={765}
          height={240}
          className="h-9 w-auto lg:h-11"
          decoding="async"
        />
      </picture>
    </Link>
  );
}
