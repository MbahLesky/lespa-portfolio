"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { contact } from "@/content/copy";
import { contactSchema } from "@/lib/contact-schema";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Contact() {
  const [status, setStatus] = useState("idle");
  const reducedMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema), mode: "onBlur" });

  const onSubmit = async (values) => {
    setStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);

      setStatus("sent");
      reset();
    } catch (error) {
      console.error("Contact submission failed", error);
      setStatus("failed");
    }
  };

  const fadeUp = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <section id="contact" className="snap-section relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto w-full max-w-content px-6 md:px-8">
        <motion.div {...fadeUp} className="flex flex-col items-start">
          {/* Eyebrow */}
          <span className="font-mono text-xs uppercase tracking-widest text-[#00ff88]">
            {"// 06. CONTACT"}
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Let&apos;s Build Something Built To Last
          </h2>

          {/* Intro line from original copy */}
          <p className="mt-4 max-w-2xl text-base text-content-secondary leading-relaxed">
            {contact.introLine}
          </p>
        </motion.div>

        {/* Row 1: Contact Form on Left, Code Element on Right */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left Column: Form displayed directly */}
          <motion.div {...fadeUp} className="tech-card flex flex-col p-6 sm:p-8">
            <h3 className="font-heading text-xl font-bold text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  {contact.fields.name}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00ff88]"
                />
                {errors.name && (
                  <p className="mt-1.5 font-mono text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  {contact.fields.email}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  {...register("email")}
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00ff88]"
                />
                {errors.email && (
                  <p className="mt-1.5 font-mono text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  {contact.fields.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or vision..."
                  {...register("message")}
                  className="mt-2 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#00ff88]"
                />
                {errors.message && (
                  <p className="mt-1.5 font-mono text-xs text-red-400">{errors.message.message}</p>
                )}
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-btn inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Sending..." : contact.submit}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                {status === "sent" && (
                  <p className="font-mono text-xs text-[#00ff88]">{contact.success}</p>
                )}
                {status === "failed" && (
                  <p className="font-mono text-xs text-red-400">{contact.failure}</p>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right Column: Code Element Box */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="tech-card overflow-hidden p-6 sm:p-8 font-mono text-sm leading-relaxed border-[#00ff88]/20 shadow-2xl"
          >
            {/* Terminal Topbar */}
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-[#8b9990] italic">{"// Lespa System Manifest"}</span>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
              </div>
            </div>

            {/* Code Body with Syntax Colors */}
            <div className="flex flex-col gap-2 font-mono text-xs sm:text-sm">
              <p>
                <span className="text-[#f43f5e]">const</span>{" "}
                <span className="text-white">creator</span> ={" "}
                <span className="text-[#00ff88]">&quot;Mbah Lesky&quot;</span>;
              </p>
              <p>
                <span className="text-[#f43f5e]">const</span>{" "}
                <span className="text-white">location</span> ={" "}
                <span className="text-[#00ff88]">&quot;Bamenda, CM&quot;</span>;
              </p>
              <p className="mt-2">
                <span className="text-[#f43f5e]">const</span>{" "}
                <span className="text-white">services</span> = [
              </p>
              <p className="pl-6 text-[#00ff88]">&quot;Graphic Design&quot;,</p>
              <p className="pl-6 text-[#00ff88]">&quot;Web Development&quot;,</p>
              <p className="pl-6 text-[#00ff88]">&quot;Mobile Development&quot;</p>
              <p>];</p>

              <p className="mt-4">
                <span className="text-[#38bdf8]">function</span>{" "}
                <span className="text-[#38bdf8]">initiateProject</span>() &#123;
              </p>
              <p className="pl-6">
                <span className="text-[#f43f5e]">return</span> &#123;
              </p>
              <p className="pl-12">
                <span className="text-white">craftsmanship</span>:{" "}
                <span className="text-[#fb923c]">true</span>,
              </p>
              <p className="pl-12">
                <span className="text-white">authenticity</span>:{" "}
                <span className="text-[#fb923c]">true</span>,
              </p>
              <p className="pl-12">
                <span className="text-white">intentionality</span>:{" "}
                <span className="text-[#fb923c]">true</span>
              </p>
              <p className="pl-6">&#125;;</p>
              <p>&#125;</p>
            </div>
          </motion.div>
        </div>

        {/* Row 2: Add the other details below the form and the code element */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 border-t border-white/10 pt-10"
        >
          <div className="grid gap-8 md:grid-cols-3">
            {/* 1. Location */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  LOCATION
                </span>
                <span className="text-sm sm:text-base font-semibold text-white">
                  Mile III Nkwen, Bamenda, North West, CM
                </span>
              </div>
            </div>

            {/* 2. Email */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  EMAIL DIRECT
                </span>
                <a
                  href={`mailto:${contact.direct.email}`}
                  className="text-sm sm:text-base font-semibold text-white transition-colors duration-200 hover:text-[#00ff88]"
                >
                  {contact.direct.email}
                </a>
              </div>
            </div>

            {/* 3. Phone */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  PHONE / WHATSAPP
                </span>
                <a
                  href={`tel:${contact.direct.phone.replace(/\s+/g, "")}`}
                  className="text-sm sm:text-base font-semibold text-white transition-colors duration-200 hover:text-[#00ff88]"
                >
                  {contact.direct.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social Icons Row */}
          <div className="mt-8 flex flex-wrap items-center justify-start gap-3">
            <a
              href="https://www.facebook.com/iamlespa"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="tech-card flex h-11 w-11 items-center justify-center text-content-secondary hover:text-[#00ff88] hover:border-[#00ff88]"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href="https://www.instagram.com/iamlespa"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="tech-card flex h-11 w-11 items-center justify-center text-content-secondary hover:text-[#00ff88] hover:border-[#00ff88]"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/iamlespa"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="tech-card flex h-11 w-11 items-center justify-center text-content-secondary hover:text-[#00ff88] hover:border-[#00ff88]"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/MbahLesky"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="tech-card flex h-11 w-11 items-center justify-center text-content-secondary hover:text-[#00ff88] hover:border-[#00ff88]"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.tiktok.com/@iamlespa"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
              className="tech-card flex h-11 w-11 items-center justify-center font-mono text-xs text-content-secondary hover:text-[#00ff88] hover:border-[#00ff88]"
            >
              TT
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
