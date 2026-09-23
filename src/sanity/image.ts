import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./client";

const imageBuilder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: Parameters<NonNullable<typeof imageBuilder>["image"]>[0]) {
  if (!imageBuilder || !source) return null;
  return imageBuilder.image(source);
}
