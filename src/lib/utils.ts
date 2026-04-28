import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to merge tailwind classes with clsx and tailwind-merge.
 * This ensures no styling conflicts when overriding default classes in components.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
