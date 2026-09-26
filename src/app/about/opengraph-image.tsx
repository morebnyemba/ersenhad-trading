import { ogContentType, ogSize, renderOg } from "@/app/_og/render";

export const dynamic = "force-static";
export const alt = "About Ersenhad Trading";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "About us",
    title: "One accountable team, three specialities.",
    subtitle: "We measure, supply and install — from the first site visit to the final hand-over.",
    photo: "shade-4x4-bay",
  });
}
