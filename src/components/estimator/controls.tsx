"use client";

import { motion } from "motion/react";
import { TbMinus, TbPlus } from "react-icons/tb";
import { cn } from "@/lib/utils";

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2.5">
      <div>
        <p className="text-sm font-semibold text-ink">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

export function Stepper({
  value,
  onChange,
  min,
  max,
  step = 1,
  unit,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  label: string;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v / step) * step));
  const btn =
    "grid size-11 shrink-0 place-items-center rounded-xl border bg-background text-ink transition-colors hover:border-brand/40 hover:text-brand disabled:pointer-events-none disabled:opacity-40";
  return (
    <div className="flex items-center gap-2">
      <button type="button" className={btn} onClick={() => onChange(clamp(value - step))} disabled={value <= min} aria-label={`Decrease ${label}`}>
        <TbMinus className="size-4" />
      </button>
      <label className="relative flex-1">
        <span className="sr-only">{label}</span>
        <input
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!Number.isNaN(v)) onChange(v);
          }}
          onBlur={(e) => onChange(clamp(parseFloat(e.target.value) || min))}
          className="h-11 w-full rounded-xl border bg-background px-3 pr-12 text-center text-base font-semibold text-ink tabular-nums outline-none [appearance:textfield] focus:border-brand focus:ring-3 focus:ring-ring/30 [&::-webkit-inner-spin-button]:appearance-none"
        />
        {unit && <span aria-hidden className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center text-sm text-muted-foreground">{unit}</span>}
      </label>
      <button type="button" className={btn} onClick={() => onChange(clamp(value + step))} disabled={value >= max} aria-label={`Increase ${label}`}>
        <TbPlus className="size-4" />
      </button>
    </div>
  );
}

export function Choice<T extends string | number>({
  value,
  onChange,
  options,
  name,
  columns = 2,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string; hint?: string }[];
  name: string;
  columns?: 2 | 3;
}) {
  return (
    <div role="radiogroup" aria-label={name} className={cn("grid gap-2", columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2")}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.value)}
            className={cn(
              "relative rounded-xl border p-3 text-left transition-colors",
              active ? "border-brand bg-brand/[0.06] ring-1 ring-brand" : "bg-background hover:border-brand/40",
            )}
          >
            <span className={cn("block text-sm font-semibold", active ? "text-brand" : "text-ink")}>{o.label}</span>
            {o.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{o.hint}</span>}
            {active && <motion.span layoutId={`${name}-dot`} className="absolute top-3 right-3 size-2 rounded-full bg-magenta" />}
          </button>
        );
      })}
    </div>
  );
}
