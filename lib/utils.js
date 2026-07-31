import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Shared easing curve — custom cubic-bezier (easeOutQuint-style), used by
 * every animation in the design system instead of the default ease-in-out.
 */
export const EASE = [0.22, 1, 0.36, 1]

/**
 * Default viewport options for scroll-triggered reveals — animate once,
 * fire when ~20% of the target is visible.
 */
export const VIEWPORT = { once: true, amount: 0.2 }

/**
 * Maps a case-study category to its display label. "Marketing" is shown
 * as "Performance" in the UI.
 *
 * @param {string} category
 * @returns {string}
 */
export function categoryLabel(category) {
  return category === 'Marketing' ? 'Performance' : category
}

/**
 * Combines conditional class names with clsx and deduplicates Tailwind
 * conflicts with tailwind-merge.
 *
 * @param {...(string | number | object | null | undefined | boolean)} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
