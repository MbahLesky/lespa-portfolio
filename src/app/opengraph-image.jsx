import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";
export const alt =
  "Mbah Lesky (Lespa) — Graphic Designer & Software Engineer in Bamenda, Cameroon";

export default function Image() {
  return ogImage({
    eyebrow: "Mbah Lesky // Lespa",
    title: "Graphic Designer & Software Engineer crafting brands, websites, and mobile apps.",
  });
}
