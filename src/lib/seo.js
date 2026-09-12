import { siteUrl } from "@/lib/site";
import { about, hero, socials, whatIDo } from "@/content/copy";
import { projects } from "@/content/projects";

/**
 * Everything the site says about itself to a crawler or a link preview.
 *
 * Built from the same content modules the page renders, so the description a
 * search result shows and the sentence on the page cannot drift apart. Editing
 * the copy doc updates both.
 */

export const siteName = "Lespa";
export const personName = "Mbah Lesky";
export const jobTitle = "Graphic Designer & Software Engineer";
export const locality = "Bamenda";
export const country = "Cameroon";

/** The hero's own sentence, which is already the sharpest summary of the work. */
export const siteDescription = `${hero.subtext} ${personName} — ${jobTitle.toLowerCase()} based in ${locality}, ${country}.`;

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
 */
export function buildJsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: personName,
    alternateName: siteName,
    jobTitle,
    description: about.bio[0].body,
    url: siteUrl,
    image: `${siteUrl}/global_assets/lespa_social_share.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: locality,
      addressCountry: country,
    },
    sameAs: socials.map((social) => social.href),
    knowsAbout: [
      "Brand identity",
      "Logo design",
      "UI/UX design",
      "Web development",
      "Mobile development",
      "React",
      "Next.js",
      "Flutter",
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

  const website = {
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: `${siteName} — ${personName}`,
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
  };
}
