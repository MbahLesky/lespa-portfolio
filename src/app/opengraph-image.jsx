import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const runtime = "edge";
export const alt =
  "Lespa — I design brands that feel like you, then build the websites and apps they live in.";
  "Mbah Lesky (Lespa) — Graphic Designer & Software Engineer in Bamenda, Cameroon";

/**
 * TODO: asset needed — assets doc §GLOBAL, "OG/social share preview image". The
 * doc marks this safe to defer; this generated card stands in until a designed
 * one is supplied.
 */
export default function Image() {
  return ogImage({
    eyebrow: "Lespa — Mbah Lesky",
    title: "I design brands that feel like you, then build the websites and apps they live in.",
    eyebrow: "Mbah Lesky // Lespa",
    title: "Graphic Designer & Software Engineer crafting brands, websites, and mobile apps.",
  });
}
