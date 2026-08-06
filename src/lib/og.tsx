import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared Open Graph card: Brand Deep gradient, a maze motif echoing the brand
 * pattern, the wordmark, and the page title.
 *
 * Hex values are inline here by necessity — Satori rasterises this on the
 * server with no stylesheet and no CSS custom properties, so the tokens cannot
 * be referenced. They are duplicated from globals.css and must be kept in step
 * with it.
 */
const BRAND = "#0D6D2B";
const BRAND_DARK = "#075520";
const TEXT = "#FFFFFF";
const MUTED = "rgba(255,255,255,0.72)";

export function ogImage({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundImage: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DARK} 100%)`,
          fontFamily: "sans-serif",
        }}
      >
        {/* Pattern stand-in: a sparse grid at low opacity. The real pattern SVG
            cannot be fetched during rasterisation. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.05) 2px, transparent 2px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {eyebrow && (
            <div style={{ fontSize: 26, color: MUTED, letterSpacing: 2 }}>
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: 68,
              fontWeight: 600,
              color: TEXT,
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 700, color: TEXT, letterSpacing: 4 }}>
            LESPA
          </div>
          <div style={{ fontSize: 24, color: MUTED }}>Bamenda, Cameroon</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
