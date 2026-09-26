import { ogContentType, ogSize, renderOg } from "@/app/_og/render";

export const dynamic = "force-static";
export const alt = "Ersenhad Trading — car shades, rubber tiles and seamless gutters";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Supply & installation · Harare",
    title: "Protect, pave and drain — built to last.",
    subtitle: "Car shade ports, interlocking rubber tiles and seamless gutters for homes, businesses and schools.",
    photo: "shade-residential-carport",
  });
}
