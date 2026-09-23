import { defineQuery } from "next-sanity";

export const SITE_CONTENT_QUERY = defineQuery(
  `*[_type == "siteContent"][0]{
    _id,
    heroPill,
    heroGreeting,
    heroName,
    heroDesignerRole,
    heroDeveloperRole,
    heroSubtext,
    heroPrimaryCta,
    heroSecondaryCta,
    heroImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    heroBadgeName,
    heroBadgeRole,
    heroBadgeLocation,
    introBody,
    introEmphasis,
    whatIDoLabel,
    whatIDoCards,
    processLabel,
    processSteps,
    reachOutExchange,
    processClosingBody,
    processClosingEmphasis,
    aboutLabel,
    aboutBio,
    aboutRoleSplit,
    aboutOffHoursBody,
    aboutOffHoursEmphasis,
    aboutBoundariesHeading,
    aboutBoundariesParagraphs,
    aboutTools,
    contactLabel,
    contactIntroLine,
    contactDirectHeading,
    contactEmail,
    contactPhone,
    contactSubmitLabel,
    contactSuccessMessage,
    contactFailureMessage,
    footerHandle,
    footerBuiltWith,
    socials
  }`
);

export const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(orderRank asc){
    _id,
    name,
    "slug": slug.current,
    tags,
    subtext,
    accentVar,
    liveUrl,
    coverImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    hoverImageAsset {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      alt,
      hotspot,
      crop
    },
    backdropAsset {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions { width, height }
        }
      },
      hotspot,
      crop
    },
    image,
    imageAlt,
    hoverImage,
    hoverImageAlt,
    backdrop,
    orderRank
  }`
);

