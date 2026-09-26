import { ogContentType, ogSize, renderOg } from "@/app/_og/render";

export const dynamic = "force-static";
export const alt = "Contact Ersenhad Trading";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Free quotation",
    title: "Let's talk about your project.",
    subtitle: "WhatsApp, call or email us for a free, itemised quotation.",
    photo: "gutter-white-downpipe",
  });
}
