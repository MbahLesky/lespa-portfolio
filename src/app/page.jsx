"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const navLinks = [
  { label: "Hero", href: "#hero" },
  { label: "Intro", href: "#intro" },
  { label: "Selected Work", href: "#work" },
  { label: "What I Do", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    name: "Monilog",
    tags: ["Brand", "Product Design", "Flutter", "React"],
    description:
      "A personal finance app for people without reliable internet or a bank account. Works offline, no sign-up required. I designed and built it myself, brand to code.",
    color: "var(--project-monilog)",
    href: "https://monilog.vercel.app",
  },
  {
    name: "Diwa",
    tags: ["Brand Identity", "Logo Design", "Guidelines"],
    description:
      "Brand identity for a solar-powered cooling company in Cameroon. Logo, colors, and a full guidelines system, built to work in one color on any surface.",
    color: "var(--project-diwa)",
    href: "https://diwa-air.com",
  },
  {
    name: "Ronixe",
    tags: ["Brand Identity"],
    description:
      "Brand identity for a software development company. A wordmark and icon built around momentum, live on their site today.",
    color: "var(--project-ronixe)",
    href: "https://ronixe.com",
  },
  {
    name: "Qiroke",
    tags: ["Brand Identity", "Web UX"],
    description:
      "Brand and web design for a tech collective I co-founded, offering five services under one identity.",
    color: "var(--project-qiroke)",
  },
  {
    name: "PikamGo",
    tags: ["Brand Identity", "Logistics"],
    description:
      "A delivery app for tracking packages from pickup to drop-off, built under Qiroke.",
    color: "var(--project-pikamgo)",
  },
  {
    name: "Yisi",
    tags: ["Brand Identity"],
    description:
      "Brand identity for Ndzi Ernestine's catering service. A wordmark built entirely from cutlery.",
    color: "var(--project-yisi)",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Reach Out",
    copy:
      "Tell me the idea — what you're building, or what you want designed. I read every message myself, and I reply within a day.",
  },
  {
    number: "02",
    title: "Research",
    copy:
      "Before I touch anything visual, I look into what actually fits you — who you're speaking to, what's already out there, what's been tried and didn't work. Not just moodboards. Real digging.",
  },
  {
    number: "03",
    title: "Define",
    copy:
      "Then I sketch. Concepts, flow, structure — for the brand, the site, or the app. This is where the idea starts taking real shape, before a single pixel is final.",
  },
  {
    number: "04",
    title: "Design/Build",
    copy:
      "Once we agree on direction, I build it — design and code, myself. Nothing gets lost between the sketch and the real thing, because there's no handoff.",
  },
  {
    number: "05",
    title: "Present and Deploy",
    copy:
      "I show you how it actually feels, not just how it looks in a mockup. Then we ship it — live, working, yours.",
  },
];

const whatIDo = [
  {
    title: "Graphic Design",
    copy:
      "I design logos, visuals, and full brand systems — colors, typography, the whole identity — for individuals and businesses. Not just a logo on its own, but everything that has to work together around it.",
  },
  {
    title: "Web Development",
    copy:
      "I code websites for individuals and businesses, from simple one-page sites to full platform web apps — all by hand. No templates, no page builders.",
  },
  {
    title: "Mobile Development",
    copy:
      "I build custom Android and iOS applications for productivity or business use.",
  },
];

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(20, "Tell me a little more — at least 20 characters."),
});

function Typewriter({ text, delay = 0, onComplete, className = "" }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let currentIndex = 0;
      const interval = window.setInterval(() => {
        currentIndex += 1;
        setValue(text.slice(0, currentIndex));

        if (currentIndex >= text.length) {
          window.clearInterval(interval);
          onComplete?.();
        }
      }, 90);

      return () => window.clearInterval(interval);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [delay, onComplete, text]);

  return (
    <span className={className}>
      {value}
      <span className="inline-block w-px animate-pulse text-[var(--color-dark-muted)] align-middle">
        |
      </span>
    </span>
  );
}

function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-50 hidden md:block"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        opacity: visible ? 1 : 0,
      }}
    >
      <span className="block h-8 w-8 rounded-full border border-white/20 bg-white/5 shadow-[0_0_30px_rgba(47,168,106,0.35)] backdrop-blur-sm" />
    </div>
  );
}

export default function Home() {
  const [headlineComplete, setHeadlineComplete] = useState(false);
  const [roleComplete, setRoleComplete] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (roleComplete) {
      const timer = window.setTimeout(() => {
        setShowSubtext(true);
      }, 200);
      return () => window.clearTimeout(timer);
    }
  }, [roleComplete]);

  useEffect(() => {
    if (showSubtext) {
      const timer = window.setTimeout(() => {
        setShowActions(true);
      }, 300);
      return () => window.clearTimeout(timer);
    }
  }, [showSubtext]);

  const form = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  return (
    <main id="main" className="relative bg-[var(--color-dark-background)] pb-32 text-[var(--color-dark-text)]">
      <CursorFollower />

      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[var(--color-dark-background)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-8 px-6 py-4 md:px-8">
          <a href="#hero" className="flex items-center gap-3 text-sm font-medium tracking-[0.24em] text-[var(--color-dark-text)]">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[var(--color-dark-surface)] text-xs">L</span>
            <span>
              LESPA
            </span>
          </a>

          <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.16em] text-[var(--color-dark-muted)] md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[var(--color-dark-text)]">
                {link.label}
              </a>
            ))}
          </nav>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: showActions ? 1 : 0, y: showActions ? 0 : -8 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="hidden rounded-full border border-white/15 bg-[var(--color-dark-surface)] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-dark-text)] md:inline-flex"
          >
            Let&apos;s talk
          </motion.a>
        </div>
      </header>

      <section id="hero" className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-dark-background)_0%,var(--color-dark-surface)_100%)]">
        <div className="absolute inset-0 bg-[var(--pattern-url)] opacity-50" aria-hidden="true" />
        <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col items-center justify-center px-6 pb-20 pt-28 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-6 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]"
          >
            Brand & Product Designer · Software Engineer
          </motion.div>

          <h1 className="mb-4 text-5xl font-medium tracking-[-0.08em] text-[var(--color-dark-text)] md:text-7xl">
            <div className="flex flex-col items-center leading-[0.9]">
              <Typewriter text="Hi, I am Lespa" onComplete={() => setHeadlineComplete(true)} className="block" />
              {headlineComplete && (
                <>
                  <Typewriter text="A Graphic Designer who builds products." delay={250} onComplete={() => setRoleComplete(true)} className="block" />
                  <Typewriter text="A Developer who designs interfaces." delay={650} className="block" />
                </>
              )}
            </div>
          </h1>

          {roleComplete && (
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-2xl text-base text-[var(--color-dark-muted)] md:text-lg"
            >
              I design brands that feel like you, then build the websites and apps they live in.
            </motion.p>
          )}

          {showActions && (
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <a href="#work" className="inline-flex items-center gap-3 rounded-full bg-[var(--color-dark-text)] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-dark-background)] transition hover:translate-y-[-1px]">
                See my work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#about" className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-dark-text)] transition hover:translate-y-[-1px]">
                About me
              </a>
            </motion.div>
          )}
        </div>
      </section>

      <section id="intro" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-[32px] border border-white/10 bg-[var(--color-dark-surface)] p-8 md:p-12"
        >
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[var(--color-dark-text)] md:text-2xl">
            I taught myself design because I didn't like how the interfaces I was coding looked. Then I kept both — so a brand I design doesn't fall apart the moment someone else has to build it. Let me help carry your vision across — from idea to product.
          </p>
        </motion.div>
      </section>

      <section id="work" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">Selected Work</p>
          <h2 className="text-4xl tracking-[-0.06em] text-[var(--color-dark-text)] md:text-5xl">Selected Work</h2>
        </motion.div>

        <div className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto pb-2">
          {projects.map((project) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group rounded-[28px] bg-transparent p-0 transition duration-300 hover:-translate-y-1"
            >
              <div className="grid gap-6 rounded-[28px] bg-[var(--color-dark-surface)] p-4 md:p-6 lg:grid-cols-2 lg:items-center">
                <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[var(--color-dark-background)] p-3">
                  <img
                    src={project.images?.final || project.images?.hero || "/placeholder-project.webp"}
                    alt={`${project.name} project preview`}
                    className="h-72 w-full rounded-[16px] object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.18em]" style={{ borderColor: `${project.color}66`, color: project.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl tracking-[-0.06em] text-[var(--color-dark-text)]" style={{ color: project.color }}>
                    {project.name}
                  </h3>

                  <p className="max-w-xl text-base leading-relaxed text-[var(--color-dark-muted)]">
                    {project.description}
                  </p>

                  {project.href && (
                    <a href={project.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em]" style={{ color: project.color }}>
                      View live site
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="services" className="bg-[var(--pattern-url)] bg-repeat opacity-100">
        <div className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="mb-8"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">What I Do</p>
            <h2 className="text-4xl tracking-[-0.06em] text-[var(--color-dark-text)] md:text-5xl">What I Do</h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {whatIDo.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="group relative h-[320px] overflow-hidden rounded-[28px] border border-white/10 bg-[var(--color-dark-surface)] p-6 [transform-style:preserve-3d]"
              >
                <div className="absolute inset-0 bg-[var(--pattern-url)] opacity-50" aria-hidden="true" />
                <div className="relative flex h-full flex-col justify-between transition duration-500 group-hover:rotate-y-180">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">{item.title}</span>
                    <Sparkles className="h-4 w-4 text-[var(--color-dark-muted)]" />
                  </div>
                  <div>
                    <h3 className="text-3xl tracking-[-0.06em] text-[var(--color-dark-text)]">{item.title}</h3>
                    <p className="mt-4 max-w-sm text-base text-[var(--color-dark-muted)]">{item.copy}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">Process</p>
          <h2 className="text-4xl tracking-[-0.06em] text-[var(--color-dark-text)] md:text-5xl">Process</h2>
        </motion.div>

        <div className="grid gap-4">
          {processSteps.map((step) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="group rounded-[24px] border border-white/10 bg-[var(--color-dark-surface)] p-5 transition hover:border-white/20 md:p-6"
            >
              <div className="grid gap-6 md:grid-cols-[180px_1fr] md:items-start">
                <div className="flex items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">{step.number}</span>
                  <h3 className="text-xl tracking-[-0.04em] text-[var(--color-dark-text)]">{step.title}</h3>
                </div>

                <div className="overflow-hidden">
                  <div className="grid gap-6 opacity-0 max-h-0 transition-all duration-300 group-hover:max-h-[340px] group-hover:opacity-100 md:grid-cols-[1.2fr_0.8fr]">
                    <p className="text-base leading-relaxed text-[var(--color-dark-muted)]">{step.copy}</p>
                    <div className="flex h-40 items-center justify-center rounded-[20px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] text-center text-[10px] uppercase tracking-[0.28em] text-[var(--color-dark-muted)]">
                      Visual<br />
                      Brief
                    </div>
                    {/* TODO: asset needed — Process step image for the hover reveal panel. */}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base leading-relaxed text-[var(--color-dark-muted)] md:text-lg">
          At every step, we talk it through — together. The goal was never something generic, something that feels like a template you've scrolled past before. It's something that feels like you. Intentional. From your roots.
        </p>
      </section>

      <section id="about" className="relative overflow-hidden bg-[var(--color-dark-background)]">
        <div className="absolute inset-0 opacity-60" aria-hidden="true">
          <div className="absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0),rgba(255,255,255,0.02))]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="grid gap-10 lg:grid-cols-[320px_1fr]"
          >
            <div className="space-y-6">
              <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--color-dark-surface)] p-3">
                <div className="flex h-[420px] items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] text-center text-[10px] uppercase tracking-[0.28em] text-[var(--color-dark-muted)]">
                  Portrait
                </div>
                {/* TODO: asset needed — About section photo. */}
              </div>

              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">Design Tools</p>
                <div className="flex flex-wrap gap-2">
                  {"Adobe Photoshop · Adobe Illustrator · Adobe InDesign · Affinity · Canva · Figma".split(" · ").map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-dark-text)]">{tool}</span>
                  ))}
                </div>

                <p className="text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">Development Tools</p>
                <div className="flex flex-wrap gap-2">
                  {"HTML / CSS / JavaScript · React / Next.js · Tailwind CSS · Flutter · XAMPP · Firebase / Supabase".split(" · ").map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--color-dark-text)]">{tool}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">About</p>
                <h2 className="text-4xl tracking-[-0.06em] text-[var(--color-dark-text)] md:text-5xl">About</h2>
              </div>

              <div className="space-y-4 text-base leading-relaxed text-[var(--color-dark-muted)]">
                <p>I'm Mbah Lesky. Call me Lespa. I'm a graphic designer and software engineer based in Bamenda, Cameroon.</p>
                <p>I started building simple websites in 2019. They worked, but I didn't like how they looked, mine or most other people's. So in 2021 I got into graphic design, chasing better colors, fonts, and structure. But even with that, something didn't click. The feel was missing. A nice interface still isn't the same as an easy one. So in 2022 I moved into UI/UX to fix that. By late 2022, I'd picked up Flutter and mobile development too.</p>
                <p>I taught myself all of it. No mentor, no bootcamp, just building things, breaking them, and building again. Across client work, business projects, and a long list of personal ones, some of which made it online and some didn't. Somewhere in that process, graphic design and software development stopped feeling like two jobs with UI/UX standing between them. They became one job to me.</p>
                <p>While studying software engineering at university, I had a part-time job teaching web development and graphic design. Mostly, I was figuring out alongside my students what I actually wanted to be good at. What I landed on is simple: brands and products that feel intentional, not generic. That's still the standard I hold every project to, whether I'm building the brand, the visuals, or acting as creative director on someone else's.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[24px] border border-white/10 bg-[var(--color-dark-surface)] p-5">
                  <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">By Day, I am a Part Designer</h3>
                  <ul className="space-y-2 text-base text-[var(--color-dark-text)]">
                    <li>• Brand identity & logo design</li>
                    <li>• Visual systems & style guides</li>
                    <li>• UI/UX design</li>
                    <li>• Making it feel like you, not a template</li>
                  </ul>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-[var(--color-dark-surface)] p-5">
                  <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">By Night, I am a Part Coder</h3>
                  <ul className="space-y-2 text-base text-[var(--color-dark-text)]">
                    <li>• React & Next.js</li>
                    <li>• Flutter, for Android and iOS</li>
                    <li>• Clean, maintainable code</li>
                    <li>• No page builders, ever</li>
                  </ul>
                </div>
              </div>

              <p className="text-base leading-relaxed text-[var(--color-dark-muted)]">When I'm not working, I'm watching a movie or halfway through whatever series or anime has my attention that week. I read too, when I remember to put the screen down.</p>

              <div className="rounded-[24px] border border-white/10 bg-[var(--color-dark-surface)] p-5">
                <h3 className="mb-4 text-xs uppercase tracking-[0.24em] text-[var(--color-dark-muted)]">What I don't do</h3>
                <div className="space-y-4 text-base leading-relaxed text-[var(--color-dark-muted)]">
                  <p>I use AI, mostly in research, to get ideas moving faster. I don't let it think for me, design for me, or build something I don't understand myself. I don't use AI-generated visuals, and I don't hand a project to AI without knowing exactly what's happening underneath it.</p>
                  <p>I don't use page builders or templates either. Every project gets designed and built from scratch, because a template can look nice, but it can't feel like you.</p>
                  <p>And I don't rush. I have a process for a reason. Each of the outlined steps above needs its own time to come out right.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-[1200px] px-6 py-20 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-8"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[var(--color-dark-muted)]">Contact</p>
          <h2 className="text-4xl tracking-[-0.06em] text-[var(--color-dark-text)] md:text-5xl">Have something to design/build? Tell me about it.</h2>
        </motion.div>

        <div className="grid gap-8 rounded-[32px] border border-white/10 bg-[var(--color-dark-surface)] p-6 md:p-8 lg:grid-cols-[1.4fr_0.6fr]">
          <form
            onSubmit={form.handleSubmit((values) => {
              window.alert(JSON.stringify(values, null, 2));
            })}
            noValidate
            className="space-y-6"
          >
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm uppercase tracking-[0.16em] text-[var(--color-dark-muted)]">Name</label>
              <input id="name" {...form.register("name")} className="w-full rounded-xl border border-white/10 bg-[var(--color-dark-background)] px-4 py-3 text-[var(--color-dark-text)] outline-none transition focus:border-[var(--color-dark-text)]" />
              {form.formState.errors.name && <p className="text-sm text-[var(--color-dark-muted)]">{form.formState.errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm uppercase tracking-[0.16em] text-[var(--color-dark-muted)]">Email</label>
              <input id="email" type="email" {...form.register("email")} className="w-full rounded-xl border border-white/10 bg-[var(--color-dark-background)] px-4 py-3 text-[var(--color-dark-text)] outline-none transition focus:border-[var(--color-dark-text)]" />
              {form.formState.errors.email && <p className="text-sm text-[var(--color-dark-muted)]">{form.formState.errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm uppercase tracking-[0.16em] text-[var(--color-dark-muted)]">Message</label>
              <textarea id="message" rows={5} {...form.register("message")} className="w-full rounded-xl border border-white/10 bg-[var(--color-dark-background)] px-4 py-3 text-[var(--color-dark-text)] outline-none transition focus:border-[var(--color-dark-text)]" />
              {form.formState.errors.message && <p className="text-sm text-[var(--color-dark-muted)]">{form.formState.errors.message.message}</p>}
            </div>

            <button type="submit" className="inline-flex items-center gap-3 rounded-full bg-[var(--color-dark-text)] px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--color-dark-background)]">
              Send message
              <Mail className="h-4 w-4" />
            </button>
          </form>

          <div className="flex flex-col justify-between gap-6 rounded-[24px] border border-white/10 bg-[var(--color-dark-background)] p-5">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--color-dark-muted)]">Availability</p>
              <p className="text-base leading-relaxed text-[var(--color-dark-text)]">Open for select design and product work.</p>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--color-dark-muted)]">Email</p>
              <a href="mailto:hello@lespa.dev" className="text-base text-[var(--color-dark-text)]">hello@lespa.dev</a>
            </div>

            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[var(--color-dark-muted)]">Based in</p>
              <p className="text-base text-[var(--color-dark-text)]">Bamenda, Cameroon</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
