import OpenGraphImage, {
  alt as ogAlt,
  contentType as ogContentType,
  size as ogSize,
} from "./opengraph-image";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = ogAlt;

export default function TwitterImage() {
  return OpenGraphImage();
}
