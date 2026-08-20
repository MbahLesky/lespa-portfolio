import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * A readable label from an image path — "d-form-breakdown.webp" becomes
 * "D form breakdown".
 *
 * None of the project imagery exists yet, so every slot on the site is
 * currently a reserved frame. Naming each one after the file it is waiting for
 * turns those frames into a shot list: the page itself says what is missing,
 * rather than repeating the project's name thirty times.
 */
export function fileLabel(path: string) {
  const name = path.split("/").pop()?.replace(/\.[a-z0-9]+$/i, "") ?? "";
  const words = name.replace(/[-_]+/g, " ").trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : "";
}
