import { cn } from "@/lib/utils";

interface ThemedPhotoProps {
  /**
   * The CSS custom property holding the image, without the var() — the light
   * and dark files are declared against it in globals.css.
   */
  token: string;
  /** What the photograph shows. This is content, not decoration. */
  alt: string;
  className?: string;
}

/**
 * A photograph that differs between themes.
 *
 * Drawn as a background from a token rather than rendered as two <img> tags
 * toggled by CSS. Two tags would mean fetching both files and showing one, and
 * swapping a src from JavaScript would mean a flash of the wrong one on the
 * frame before the theme is known. A token resolves at style time: exactly one
 * file is ever requested, and it is right from the first paint.
 *
 * The trade is that a background image is invisible to assistive technology, so
 * the box carries an explicit image role and label — a portrait is content, and
 * a page that simply omits it for a screen reader is a page missing a paragraph.
 */
export function ThemedPhoto({ token, alt, className }: ThemedPhotoProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("themed-photo", className)}
      style={{ backgroundImage: `var(${token})` }}
    />
  );
}
