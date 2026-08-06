import { z } from "zod";

export const PROJECT_TYPES = [
  "Brand",
  "Website",
  "Mobile app",
  "Mentorship",
  "Something else",
] as const;

/** Optional, but it filters early and saves calls. */
export const BUDGET_RANGES = [
  "Under 500,000 XAF",
  "500,000 – 1,500,000 XAF",
  "1,500,000 – 3,000,000 XAF",
  "Over 3,000,000 XAF",
  "Not sure yet",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  projectType: z.enum(PROJECT_TYPES, {
    message: "Please choose a project type.",
  }),
  budget: z.union([z.enum(BUDGET_RANGES), z.literal("")]).optional(),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters."),
  /**
   * Honeypot. Hidden visually but not with display:none, which some bots skip.
   * A real person never sees this field, so anything in it is a submission to
   * silently discard.
   *
   * Deliberately unconstrained: rejecting it here would return a validation
   * error naming the field, which tells a bot exactly what tripped it. The
   * handler accepts the request and drops it instead.
   */
  company: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
