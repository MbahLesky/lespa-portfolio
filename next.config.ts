import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    return [
      // Contact used to be its own page and is now a section of the home page.
      // Anything already pointing at the old URL — a signature, a card, a
      // link someone saved — still lands on the form.
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default nextConfig;
