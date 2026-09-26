import { cn } from "@/lib/utils";

// Magic UI — Marquee
type MarqueeProps = React.ComponentProps<"div"> & {
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
};

export function Marquee({ className, reverse, pauseOnHover, repeat = 4, children, ...props }: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn("group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]", className)}
    >
      {Array.from({ length: repeat }, (_, i) => (
        <div
          key={i}
          aria-hidden={i > 0}
          className={cn(
            "flex shrink-0 animate-marquee flex-row justify-around [gap:var(--gap)]",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
