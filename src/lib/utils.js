import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Class-name merge helper. shadcn/ui components expect this at @/lib/utils. */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
