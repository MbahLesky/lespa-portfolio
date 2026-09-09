import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { hero } from "@/content/phase1";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `Lespa — ${hero.subtext}`;

export default function Image() {
  return ogImage({
    eyebrow: "Lespa — Mbah Lesky",
    title: hero.subtext,
  });
}
