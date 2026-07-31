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
 * Discount applied when a monthly plan is billed annually (≈ 2 months free).
 */
export const ANNUAL_DISCOUNT = 0.2

/**
 * Computes the discounted per-month price when billed annually, derived
 * from the monthly price — never hardcoded separately.
 *
 * @param {number} monthly - monthly price in USD
 * @param {number} [discount] - decimal discount (default ANNUAL_DISCOUNT)
 * @returns {number} rounded annual per-month price
 */
export function annualPrice(monthly, discount = ANNUAL_DISCOUNT) {
  return Math.round(monthly * (1 - discount))
}

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
