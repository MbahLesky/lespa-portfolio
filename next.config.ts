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

  allowedDevOrigins: [
    "ais-dev-b5jyngw2ykzm5stbbly344-337647498459.europe-west1.run.app",
    "*.europe-west1.run.app",
    "*.run.app",
  ],

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
