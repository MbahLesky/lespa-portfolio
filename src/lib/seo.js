import { siteUrl } from "@/lib/site";
import { about, hero, socials, whatIDo } from "@/content/copy";
import { about, nav, socials, whatIDo } from "@/content/copy";
import { projects } from "@/content/projects";

/**
 * Everything the site says about itself to a crawler or a link preview.
 *
 * Built from the same content modules the page renders, so the description a
 * search result shows and the sentence on the page cannot drift apart. Editing
 * the copy doc updates both.
 * Metadata & Structured Data configuration for search engine indexing and ranking.
 */

export const siteName = "Lespa";
export const personName = "Mbah Lesky";
export const jobTitle = "Graphic Designer & Software Engineer";
export const locality = "Bamenda";
export const region = "North West Region";
export const country = "Cameroon";
export const countryCode = "CM";

/** The hero's own sentence, which is already the sharpest summary of the work. */
export const siteDescription = `${hero.subtext} ${personName} — ${jobTitle.toLowerCase()} based in ${locality}, ${country}.`;
/**
 * SERP Snippet targets:
 * Title length: 55-60 characters (avoids truncation on mobile and desktop).
 * Description length: ~155 characters (matches Google SERP snippet display limit).
 */
export const siteTitle = `${personName} (${siteName}) | Designer & Software Engineer, ${country}`;

export const siteDescription = `${personName} (${siteName}) is a graphic designer & software engineer in ${locality}, ${country}, crafting distinctive brand identities, custom websites, and mobile apps.`;

/**
 * Structured data: who this is, what the site is, and what is on it.
 *
 * A ProfilePage about a Person, because that is what a portfolio is — it gives a
 * search engine something to attach the name, the location and the accounts to.
 * The six projects go in as an ItemList so they can be understood as a body of
 * work rather than as loose text, and the three services as offers.
 *
 * `sameAs` is what ties the social accounts to the person; they come from the
 * same list the footer renders.
 * Structured data (JSON-LD) for Google Knowledge Graph and Rich Snippets:
 * 1. Person (Mbah Lesky)
 * 2. ProfessionalService / LocalBusiness (Lespa studio)
 * 3. WebSite
 * 4. ProfilePage
 * 5. ItemList (Selected Work)
 * 6. BreadcrumbList
 */
export function buildJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personName,
    alternateName: siteName,
    jobTitle,
    description: about.bio[0].body,
    alternateName: [siteName, "iamlespa", "Lesky Mbah"],
    jobTitle: [
      "Graphic Designer",
      "Software Engineer",
      "Brand Identity Designer",
      "Full-Stack Web Developer",
      "Mobile App Developer",
    ],
    description: about.bio[0]?.body ?? siteDescription,
    url: siteUrl,
    image: `${siteUrl}/global_assets/social_share.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressCountry: country,
      addressRegion: region,
      addressCountry: countryCode,
    },
    knowsLanguage: ["en", "fr"],
    sameAs: socials.map((social) => social.href),
    worksFor: { "@id": `${siteUrl}/#organization` },
    knowsAbout: [
      "Brand identity",
      "Logo design",
      "UI/UX design",
      "Web development",
      "Mobile development",
      "Brand Identity Design",
      "Logo Design",
      "Typography & Visual Systems",
      "UI/UX Design",
      "Software Engineering",
      "Full-Stack Web Development",
      "Mobile App Development",
      "Next.js",
      "React",
      "Next.js",
      "Flutter",
      "Tailwind CSS",
      "Node.js",
    ],
    makesOffer: whatIDo.cards.map((card) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: card.label,
        description: card.body,
      },
    })),
  };

  const organization = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: siteName,
    alternateName: ["Lespa Studio", "Lespa Digital"],
    legalName: personName,
    url: siteUrl,
    logo: `${siteUrl}/global_assets/lespa_icon_green_dark.svg`,
    image: `${siteUrl}/global_assets/social_share.webp`,
    description:
      "A digital creative studio operated by designer & developer Mbah Lesky in Bamenda, Cameroon. Creating bespoke visual identities, web applications, and mobile products.",
    priceRange: "$$",
    founder: { "@id": `${siteUrl}/#person` },
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressRegion: region,
      addressCountry: countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 5.9631,
      longitude: 10.1591,
    },
    sameAs: socials.map((social) => social.href),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative & Engineering Services",
      itemListElement: whatIDo.cards.map((card) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: card.label,
          description: card.body,
        },
      })),
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${siteName} — ${personName}`,
    alternateName: "Lespa Portfolio",
    description: siteDescription,
    inLanguage: "en",
    publisher: { "@id": `${siteUrl}/#person` },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${siteUrl}/#profile`,
    url: siteUrl,
    name: `${personName} (${siteName}) — ${jobTitle}`,
    isPartOf: { "@id": `${siteUrl}/#website` },
    about: { "@id": `${siteUrl}/#person` },
    mainEntity: { "@id": `${siteUrl}/#person` },
    breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
  };

  const breadcrumbs = {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      ...nav.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 2,
        name: item.label,
        item: `${siteUrl}/${item.href}`,
      })),
    ],
  };

  const work = {
    "@type": "ItemList",
    "@id": `${siteUrl}/#work`,
    name: "Selected Work",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: project.name,
        description: project.subtext,
        keywords: project.tags.join(", "),
        creator: { "@id": `${siteUrl}/#person` },
        image: `${siteUrl}${project.image}`,
        // Only where one exists — the same rule the card follows.
        ...(project.liveUrl ? { url: project.liveUrl } : {}),
      },
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage, work],
    "@graph": [person, organization, website, profilePage, breadcrumbs, work],
  };
}
