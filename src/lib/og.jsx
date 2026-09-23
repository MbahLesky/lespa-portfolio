import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Shared Open Graph card matching the portfolio's tech-noir cyber-aesthetic:
 * Deep obsidian background (#050806), emerald matrix accents (#00ff88),
 * monospace metadata, and crisp typography.
 */
const BG_DARK = "#050806";
const ACCENT = "#00ff88";
const TEXT = "#FFFFFF";
const MUTED = "rgba(255, 255, 255, 0.65)";

export function ogImage({ title, eyebrow }) {
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
          backgroundColor: BG_DARK,
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(0, 255, 136, 0.12) 0%, transparent 60%)",
          fontFamily: "sans-serif",
          border: "2px solid rgba(0, 255, 136, 0.2)",
        }}
      >
        {/* Tech grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 22,
                color: ACCENT,
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: TEXT,
              lineHeight: 1.15,
              maxWidth: 960,
              letterSpacing: -1,
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
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                backgroundColor: ACCENT,
                boxShadow: "0 0 16px #00ff88",
              }}
            />
            <div
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: TEXT,
                letterSpacing: 4,
              }}
            >
              LESPA
            </div>
          </div>
          <div
            style={{
              fontSize: 20,
              color: MUTED,
              letterSpacing: 1,
            }}
          >
            Bamenda, Cameroon // Designer & Developer
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
