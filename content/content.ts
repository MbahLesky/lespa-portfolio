export const siteContent = {
  nav: {
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Work", href: "#work" },
      { label: "Contact", href: "#contact" },
    ],
  },
  hero: {
    eyebrow: "Design / Development / Systems",
    headline:
      "I design and build structured digital systems that connect with real users.",
    body:
      "Focused on clarity, consistency, and systems that align with how users think, feel, and interact - making products easier to use, understand, and scale.",
    primaryCta: "View My Work",
    secondaryCta: "Let's Work Together",
  },
  about: {
    label: "Mission",
    heading: "Design as a system, not decoration.",
    paragraphs: [
      "Every project starts with structure - defining how things work before deciding how they look. The goal is to create interfaces that are clear, consistent, and easy to use.",
      "I focus on building systems that connect with users through context, behavior, and real-world relevance.",
      "By combining design and development, I build brands and products that are refined, practical, relatable, and scalable.",
    ],
  },
  services: {
    label: "Services",
    heading: "Focused support for structured digital products.",
    items: [
      {
        title: "Design",
        description:
          "UI/UX design focused on clarity, structure, and usability. Interfaces that are easy to navigate, consistent across screens, and aligned with real user behavior.",
      },
      {
        title: "Development",
        description:
          "Modern frontend development using scalable systems and clean architecture. Built for performance, maintainability, and real-world use.",
      },
      {
        title: "Branding",
        description:
          "Brand and product systems that create consistency across touchpoints - designed to feel relevant, relatable, and grounded in user context.",
      },
    ],
  },
  work: {
    label: "Selected Work",
    heading: "Systems shaped around clarity and use.",
    items: [
      {
        title: "Clarity System",
        tag: "UI/UX / Development",
        description:
          "A structured redesign focused on improving usability, clarity, and alignment with user needs.",
        cta: "View Project",
      },
      {
        title: "Brand Framework",
        tag: "Brand System",
        description:
          "A modular identity system built to keep digital touchpoints consistent, practical, and easier to scale.",
        cta: "View Project",
      },
      {
        title: "Behavior Flow",
        tag: "Product Design",
        description:
          "A product flow refined around user context, reducing interface complexity across key moments.",
        cta: "View Project",
      },
    ],
  },
  process: {
    label: "Process",
    heading: "A simple path from context to delivery.",
    steps: [
      {
        title: "Discover",
        description:
          "Understand the problem, user context, and constraints before making decisions.",
      },
      {
        title: "Design",
        description:
          "Create structured systems that define how the product works and how users interact with it.",
      },
      {
        title: "Build",
        description:
          "Develop clean, scalable interfaces with attention to performance, detail, and usability.",
      },
      {
        title: "Deliver",
        description:
          "Refine, test, and ensure the product works consistently and feels intuitive in real use.",
      },
    ],
  },
  proof: {
    label: "Proof",
    quote:
      "Clear thinking, strong execution, and attention to detail. The final product was both functional and genuinely aligned with user needs.",
    metric:
      "Improved usability and reduced interface complexity across key user flows.",
  },
  cta: {
    heading:
      "Let's build something clear, effective, and grounded in real users.",
    button: "Start a Project",
  },
  contact: {
    label: "Contact",
    heading: "Send a message.",
    intro:
      "Have a project in mind or want to build something meaningful? Send a message.",
    fields: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    submit: "Send Message",
  },
  footer: {
    copyright: "© 2026 LSA. All rights reserved.",
  },
} as const
