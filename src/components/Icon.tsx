import type { Product } from "@/lib/products";

const paths: Record<Product["icon"], React.ReactNode> = {
  shade: (
    <>
      <path d="M3 9 L12 4 L21 9" />
      <path d="M6 7.4V20M18 7.4V20" />
      <rect x="8" y="14" width="8" height="4" rx="1.5" />
      <circle cx="10" cy="18.5" r="1" /><circle cx="14" cy="18.5" r="1" />
    </>
  ),
  tiles: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" />
      <path d="M11 6.5h2M11 17.5h2M6.5 11v2M17.5 11v2" />
    </>
  ),
  gutter: (
    <>
      <path d="M2 8h20" /><path d="M4 8v3a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8" />
      <path d="M17 14v7" /><path d="M9 18l.01 0M12 20l.01 0" />
    </>
  ),
};

export function ProductIcon({ icon, className = "h-8 w-8" }: { icon: Product["icon"]; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[icon]}
    </svg>
  );
}
