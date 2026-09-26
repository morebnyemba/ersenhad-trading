import type { IconType } from "react-icons";
import { TbCarGarage, TbCloudRain, TbLayoutGrid } from "react-icons/tb";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

// One icon per service line (Tabler set, matching the rest of the site):
//   car shades       → car under a roof
//   rubber tiles     → interlocking tile grid
//   seamless gutters → rainwater
const icons: Record<Product["icon"], IconType> = {
  shade: TbCarGarage,
  tiles: TbLayoutGrid,
  gutter: TbCloudRain,
};

export function ProductIcon({ icon, className }: { icon: Product["icon"]; className?: string }) {
  const Icon = icons[icon];
  return <Icon aria-hidden className={cn("size-8", className)} />;
}
