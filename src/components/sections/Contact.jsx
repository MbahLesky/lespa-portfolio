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
  Send,
} from "lucide-react";

import { contact, socials } from "@/content/copy";
import { contactSchema } from "@/lib/contact-schema";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Contact() {
  const [status, setStatus] = useState("idle");
  const [showForm, setShowForm] = useState(false);
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
            // 06. INITIATE CONTACT
          </span>

          {/* Heading */}
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Let&apos;s Build Something Built To Last
          </h2>

          {/* Subtext */}
          <p className="mt-4 max-w-2xl text-base text-content-secondary leading-relaxed">
            Direct, transparent collaboration. Contact Mbah Lesky to discuss brand identity
            design, web engineering, or mobile apps.
          </p>
        </motion.div>

        {/* 2-Column Grid: Contact Information on Left, Code Box on Right */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Left Column: Direct Route Cards & Social Icons */}
          <motion.div {...fadeUp} className="flex flex-col gap-6">
            {/* 1. Location Card */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  LOCATION
                </span>
                <span className="text-base font-semibold text-white">
                  Mile III Nkwen, Bamenda, North West, CM
                </span>
              </div>
            </div>

            {/* 2. Email Card */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  EMAIL DIRECT
                </span>
                <a
                  href="mailto:mbahlesky2@gmail.com"
                  className="text-base font-semibold text-white transition-colors duration-200 hover:text-[#00ff88]"
                >
                  mbahlesky2@gmail.com
                </a>
              </div>
            </div>

            {/* 3. Phone Card */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#00ff88]/30 bg-[#00ff88]/10 text-[#00ff88]">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs uppercase tracking-wider text-content-secondary">
                  PHONE / WHATSAPP
                </span>
                <a
                  href="tel:+237679682626"
                  className="text-base font-semibold text-white transition-colors duration-200 hover:text-[#00ff88]"
                >
                  +237 679 682 626
                </a>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="mt-4 flex flex-wrap items-center gap-3">
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

            {/* Quick Send Message Button toggle */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowForm((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#00ff88]/40 bg-[#00ff88]/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-[#00ff88] transition-all hover:bg-[#00ff88]/20 hover:border-[#00ff88]"
              >
                <Send className="h-3.5 w-3.5" />
                <span>{showForm ? "Hide Message Form" : "Send A Message Here"}</span>
              </button>
            </div>

            {/* Contact Form */}
            {showForm && (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="tech-card mt-4 flex flex-col gap-4 p-6 sm:p-7"
              >
                <div>
                  <label htmlFor="name" className="font-mono text-xs uppercase text-content-secondary">
                    {contact.fields.name}
                  </label>
                  <input
                    id="name"
                    type="text"
                    {...register("name")}
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white outline-none focus:border-[#00ff88]"
                  />
                  {errors.name && (
                    <p className="mt-1 font-mono text-xs text-red-400">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="font-mono text-xs uppercase text-content-secondary">
                    {contact.fields.email}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white outline-none focus:border-[#00ff88]"
                  />
                  {errors.email && (
                    <p className="mt-1 font-mono text-xs text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="font-mono text-xs uppercase text-content-secondary">
                    {contact.fields.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    className="mt-1.5 w-full rounded-md border border-white/10 bg-[#070b09] px-4 py-3 text-sm text-white outline-none focus:border-[#00ff88]"
                  />
                  {errors.message && (
                    <p className="mt-1 font-mono text-xs text-red-400">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="glow-btn mt-2 inline-flex items-center justify-center gap-2 rounded-lg py-3 font-mono text-xs uppercase tracking-wider disabled:opacity-50"
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
              </form>
            )}
          </motion.div>

          {/* Right Column: The Code Manifest Box */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="tech-card overflow-hidden p-6 sm:p-8 font-mono text-sm leading-relaxed border-[#00ff88]/20 shadow-2xl"
          >
            {/* Terminal Topbar */}
            <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-xs text-[#8b9990] italic">// Lespa System Manifest</span>
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
      </div>
    </section>
  );
}
