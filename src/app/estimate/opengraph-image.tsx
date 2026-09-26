import { ogContentType, ogSize, renderOg } from "@/app/_og/render";

export const dynamic = "force-static";
export const alt = "Ersenhad Trading project planner";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Project planner",
    title: "Estimate your project in a minute.",
    subtitle: "Car count, floor size or house height in — layout and quantities out. Then get a free quotation.",
    photo: "shade-4x4-bay",
  });
}
