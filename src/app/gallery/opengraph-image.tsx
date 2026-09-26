import { ogContentType, ogSize, renderOg } from "@/app/_og/render";

export const dynamic = "force-static";
export const alt = "Ersenhad Trading project gallery";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Project gallery",
    title: "Our work, up close.",
    subtitle: "Car shade, rubber flooring and guttering installations.",
    photo: "tiles-playground-red",
  });
}
