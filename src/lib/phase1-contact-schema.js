import { z } from "zod";

/**
 * Three fields, per the copy doc. Messages are written to be read by the person
 * who tripped them, not to name the rule that was broken.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "Tell me what to call you."),
  email: z.string().trim().email("That email doesn't look right."),
  message: z
    .string()
    .trim()
    .min(10, "A sentence or two is enough to start.")
    .max(4000, "That's longer than this form can take — email me instead."),
});
