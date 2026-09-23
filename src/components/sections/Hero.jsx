"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/content/copy";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { urlForImage } from "@/sanity/image";

export function Hero({ onIntroComplete, content }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    onIntroComplete?.();
  }, [onIntroComplete]);

  const pill = content?.heroPill || "DESIGNER & DEVELOPER";
  const greeting = content?.heroGreeting || "Hi, I am";
  const name = content?.heroName || "Lespa";
  const subtext = content?.heroSubtext || hero.subtext;
  const primaryCta = content?.heroPrimaryCta || hero.ctas.primary;
  const secondaryCta = content?.heroSecondaryCta || hero.ctas.secondary;

  const heroImageSrc = content?.heroImage
    ? urlForImage(content.heroImage)?.width(840).height(1050).fit("crop").url() ||
      content.heroImage.asset?.url ||
      "/global_assets/lespa_pic1.webp"
    : "/global_assets/lespa_pic1.webp";

  const heroImageAlt =
    content?.heroImage?.alt || "Mbah Lesky — Designer & Developer";
  const badgeName = content?.heroBadgeName || "Mbah Lesky";
  const badgeRole = content?.heroBadgeRole || "Designer & Developer";
  const badgeLocation = content?.heroBadgeLocation || "Bamenda, CM";

  const designerRole =
    content?.heroDesignerRole || "A <Graphic Designer> who builds products.";
  const developerRole =
    content?.heroDeveloperRole || "And a <Software Developer> who designs interfaces.";

  const renderRoleLine = (text) => {
    const match = text.match(/^(.*?)<([^>]+)>(.*)$/);
    if (!match) return <span>{text}</span>;
    return (
      <>
        {match[1]}
        <span className="text-[#00ff88]">&lt;{match[2]}&gt;</span>
        {match[3]}
      </>
    );
  };

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section
      id="hero"
      className="snap-section relative flex min-h-screen items-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-20"
    >
      {/* Subtle radial glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00ff88]/5 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-40 h-[600px] w-[600px] rounded-full bg-[#00e575]/5 blur-[140px]"
      />

      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Left Column: Headline, Roles, Subtext & CTAs */}
          <motion.div {...fadeUp} className="flex flex-col items-start text-left">
            {/* Chip: Designer and Developer */}
            <div className="tech-pill mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff88] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff88]" />
              </span>
              <span>{pill}</span>
            </div>

            {/* Headline: Hi, I am Lespa */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
              {greeting} <span className="text-[#00ff88]">{name}</span>
              <span className="sr-only"> — Mbah Lesky, Graphic Designer &amp; Software Engineer in Bamenda, Cameroon</span>
            </h1>

            {/* Role Lines */}
            <div className="mt-4 flex flex-col gap-1 font-heading text-xl sm:text-2xl lg:text-[1.75rem] font-semibold text-content-secondary leading-snug">
              <p>{renderRoleLine(designerRole)}</p>
              <p>{renderRoleLine(developerRole)}</p>
            </div>

            {/* Subtext */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-content-secondary leading-relaxed">
              {subtext}
            </p>

            {/* CTAs: View Projects & About Me */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={primaryCta?.href || "#work"}
                className="glow-btn inline-flex items-center gap-2.5 rounded-lg px-6 py-3.5 font-mono text-xs uppercase tracking-wider transition-all duration-300"
              >
                <span>{primaryCta?.label || "View Projects"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              <a
                href={secondaryCta?.href || "#about"}
                className="inline-flex items-center gap-2.5 rounded-lg border border-[#00ff88]/30 bg-[#00ff88]/10 px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-[#00ff88] transition-all duration-300 hover:border-[#00ff88] hover:bg-[#00ff88]/20 hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]"
              >
                <span>{secondaryCta?.label || "About Me"}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Main Image (Mbah Lesky) & Founder Badge */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center lg:items-end"
          >
            <div className="tech-card relative w-full max-w-[420px] overflow-hidden p-3 shadow-2xl">
              {/* Creator Photo */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#070b09]">
                <Image
                  src={heroImageSrc}
                  alt={heroImageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>

              {/* Badge below photo */}
              <div className="mt-3 flex items-center justify-between rounded-lg border border-white/10 bg-[#080c0a]/90 p-3 backdrop-blur-md">
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-white">{badgeName}</span>
                  <span className="font-mono text-xs text-[#00ff88]">{badgeRole}</span>
                </div>
                <span className="font-mono text-xs text-content-secondary">{badgeLocation}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
