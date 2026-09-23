/* eslint-disable @next/next/no-img-element */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Mbah Lesky (Lespa) — Graphic Designer & Software Engineer in Bamenda, Cameroon";

/**
 * Dynamic OpenGraph social card generated via Next.js metadata rules.
 *
 * Blends Mbah Lesky's hero portrait with the portfolio's tech-noir aesthetic:
 * deep obsidian field (#050806), glowing emerald matrix accents (#00ff88),
 * and clean typography.
 */
export default function OpenGraphImage() {
  let heroImageBase64 = "";

  try {
    const imagePath = join(process.cwd(), "public/global_assets/lespa_hero_og.jpg");
    const buffer = readFileSync(imagePath);
    heroImageBase64 = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch (err) {
    console.error("Failed to load hero image for OG card", err);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#050806",
          padding: 56,
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
          border: "2px solid rgba(0, 255, 136, 0.25)",
        }}
      >
        {/* Radial ambient glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0, 255, 136, 0.16) 0%, transparent 70%)",
          }}
        />

        {/* Matrix grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(0, 255, 136, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 136, 0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content container */}
        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 40,
          }}
        >
          {/* Left Column: Branding & Copy */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              flex: 1,
              maxWidth: 620,
            }}
          >
            {/* Top: Status Pill */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 14px",
                  borderRadius: 9999,
                  backgroundColor: "rgba(0, 255, 136, 0.08)",
                  border: "1px solid rgba(0, 255, 136, 0.3)",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#00ff88",
                    boxShadow: "0 0 10px #00ff88",
                  }}
                />
                <span
                  style={{
                    color: "#00ff88",
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  DESIGNER &amp; DEVELOPER
                </span>
              </div>
            </div>

            {/* Middle: Title & Role */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div
                style={{
                  fontSize: 54,
                  fontWeight: 800,
                  color: "#FFFFFF",
                  lineHeight: 1.05,
                  letterSpacing: -1,
                }}
              >
                Mbah Lesky
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 600,
                  color: "#00ff88",
                  letterSpacing: 1,
                }}
              >
                {"// LESPA"}
              </div>
              <p
                style={{
                  fontSize: 20,
                  color: "rgba(255, 255, 255, 0.72)",
                  lineHeight: 1.45,
                  margin: 0,
                  marginTop: 6,
                }}
              >
                Brand identity, custom web applications, and mobile products engineered from scratch.
              </p>
            </div>

            {/* Bottom: Location & Tech Badges */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: 18,
              }}
            >
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  fontSize: 15,
                  letterSpacing: 1,
                }}
              >
                Bamenda, Cameroon
              </span>
              <span
                style={{
                  color: "#00ff88",
                  fontSize: 14,
                  fontFamily: "monospace",
                  letterSpacing: 1,
                }}
              >
                NEXT.JS • FLUTTER • FIGMA
              </span>
            </div>
          </div>

          {/* Right Column: Hero Portrait Card */}
          {heroImageBase64 ? (
            <div
              style={{
                display: "flex",
                width: 380,
                height: 480,
                padding: 10,
                borderRadius: 16,
                backgroundColor: "rgba(7, 11, 9, 0.9)",
                border: "1px solid rgba(0, 255, 136, 0.35)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
                overflow: "hidden",
              }}
            >
              <img
                src={heroImageBase64}
                alt="Mbah Lesky"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    ),
    { ...size }
  );
}
