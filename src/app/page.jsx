import { defineQuery } from "next-sanity";

import { client } from "@/sanity/client";
import { HomeShell } from "@/components/HomeShell";

const PROJECTS_QUERY = defineQuery(
  `*[_type == "project"] | order(orderRank asc){
    _id,
    name,
    "slug": slug.current,
    tags,
    subtext,
    accentVar,
    liveUrl,
    image,
    imageAlt,
    hoverImage,
    hoverImageAlt,
    backdrop,
    orderRank
  }`
);

const options = { next: { revalidate: 30 } };

/**
 * Phase 1 — the whole site, on one page.
 *
 * This is a Server Component: it fetches project data from Sanity, then hands
 * everything to <HomeShell />, the client component that owns the interactive
 * state (intro animation, cursor follower, scroll-driven work carousel).
 */
export default async function Home() {
  const projects = await client.fetch(PROJECTS_QUERY, {}, options);

  return <HomeShell projects={projects} />;
}
