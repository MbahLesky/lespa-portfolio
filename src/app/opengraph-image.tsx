import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt =
  "Lespa — I design brands, build the products they live in, and teach you to run them.";

export default function Image() {
  return ogImage({
    eyebrow: "Lespa — Mbah Lesky",
    title: "I design brands, build the products they live in, and teach you to run them.",
  });
}
