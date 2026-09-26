import { Reveal } from "@/components/site/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverted,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "flex items-center gap-3 text-sm font-semibold tracking-[0.18em] uppercase",
          align === "center" && "justify-center",
          inverted ? "text-highlight" : "text-brand",
        )}
      >
        <span aria-hidden className="h-0.5 w-6 rounded-full bg-magenta" />
        {eyebrow}
      </p>
      <h2 className={cn("mt-3 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl", inverted ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {description && <p className={cn("mt-4 text-lg text-pretty", inverted ? "text-white/70" : "text-muted-foreground")}>{description}</p>}
    </Reveal>
  );
}
