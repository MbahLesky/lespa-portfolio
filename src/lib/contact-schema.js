import { z } from "zod";

/**
 * Phase 1 contact form: Name, Email, Message. Nothing else.
 *
 * Shared by the form and the route handler, so the browser and the server agree
 * on what a valid submission is. Client validation is a convenience; the route
 * validates again because it is reachable directly.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(20, "Tell me a little more — at least 20 characters."),
});
