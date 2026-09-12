"use client";

import { motion } from "framer-motion";
import { CheckCheck } from "lucide-react";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The Reach Out sample exchange, drawn as a messaging thread.
 *
 * Follows the conventions of the reference screenshot rather than inventing a
 * chat idiom: a day divider above the thread, the phone owner's messages green
 * and right with delivery ticks, the other side dark and left, and each time
 * sitting inside its own bubble at the end of the text rather than beside it.
 *
 * Runs of messages from the same person sit closer together and only the last of
 * a run keeps its tail, which is what makes a thread read as turns in a
 * conversation instead of a list of lines.
 *
 * Colours come from the same tokens as the rest of the page, so the thread reads
 * as part of this site rather than as a screenshot of another app.
 *
 * Marked as a figure and captioned for assistive tech: it illustrates the step,
 * and each bubble is prefixed with who is speaking so the thread is followable
 * without seeing which side it is on.
 */
export function ChatExchange({ exchange, label, className = "" }) {
  const reducedMotion = useReducedMotion();
  const { day, messages } = exchange;

  return (
    <figure
      className={`glass flex flex-col gap-2 overflow-hidden rounded-xl border border-border p-4 ${className}`}
    >
      <figcaption className="sr-only">{label}</figcaption>

      {/* The day divider — a centred chip, as in the reference. */}
      <div className="flex justify-center pb-2">
        <span className="glass-strong rounded-sm px-4 py-1 text-caption text-content-secondary">
          {day}
        </span>
      </div>

      <ol className="flex flex-col gap-1">
        {messages.map((message, index) => {
          const mine = message.from === "lespa";
          const previous = messages[index - 1];
          const next = messages[index + 1];

          // A run is consecutive messages from one person. Only its last bubble
          // keeps the squared tail corner; the rest stay fully rounded.
          const startsRun = !previous || previous.from !== message.from;
          const endsRun = !next || next.from !== message.from;

          return (
            <li
              key={`${message.time}-${index}`}
              className={`flex ${mine ? "justify-end" : "justify-start"} ${
                startsRun && index > 0 ? "mt-2" : ""
              }`}
            >
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  duration: 0.35,
                  delay: reducedMotion ? 0 : index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`max-w-bubble rounded-lg px-4 py-2 ${
                  mine
                    ? `bg-action text-action-fg ${endsRun ? "rounded-br-sm" : ""}`
                    : `glass-strong border border-border text-content ${
                        endsRun ? "rounded-bl-sm" : ""
                      }`
                }`}
              >
                <span className="sr-only">{mine ? "Lespa: " : "Client: "}</span>

                {/* The time trails the text inside the bubble, and the float
                    keeps it on the last line where there is room for it —
                    exactly how a real thread sets it. */}
                <span className="block text-body-sm">
                  {message.text}
                  <span
                    className={`float-right ml-4 inline-flex translate-y-1 items-center gap-1 text-caption ${
                      mine ? "text-brand-soft" : "text-content-secondary"
                    }`}
                  >
                    {message.time}
                    {mine ? <CheckCheck className="h-3 w-3" aria-hidden="true" /> : null}
                  </span>
                </span>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
