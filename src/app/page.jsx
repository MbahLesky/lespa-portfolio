import { client } from "@/sanity/client";
import { PROJECTS_QUERY, SITE_CONTENT_QUERY } from "@/sanity/queries";
import { HomeShell } from "@/components/HomeShell";

const options = { next: { revalidate: 30 } };

/**
 * Phase 1 — the whole site, on one page.
 *
 * This is a Server Component: it fetches project data and site copy from Sanity,
 * then hands everything to <HomeShell />, the client component that owns the
 * interactive state.
 */
export default async function Home() {
  let projects = [];
  let siteContent = null;

  try {
    if (client) {
      const [fetchedProjects, fetchedContent] = await Promise.all([
        client.fetch(PROJECTS_QUERY, {}, options),
        client.fetch(SITE_CONTENT_QUERY, {}, options),
      ]);
      projects = fetchedProjects || [];
      siteContent = fetchedContent || null;
    }
  } catch (err) {
    console.warn("Failed to fetch data from Sanity, using fallback content:", err);
  }

  return <HomeShell projects={projects} siteContent={siteContent} />;
}
