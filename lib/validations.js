import { z } from 'zod'

/** Budget range options for the lead capture form. */
export const BUDGET_RANGES = [
  'under-1000',
  '1000-2500',
  '2500-5000',
  '5000-10000',
  '10000-plus',
]

/** Service options for the lead capture form (matches SERVICES ids in constants.js). */
export const SERVICE_OPTIONS = ['web', 'social', 'marketing']

/**
 * Zod schema for the lead capture form payload. Shared by the client
 * (react-hook-form resolver) and the API route (server-side validation) —
 * never trust client-side validation alone.
 *
 * - websiteUrl  : optional, must be a valid URL when provided.
 * - message     : optional free text.
 * - website     : honeypot field — must stay empty; the API rejects
 *                 submissions that fill it. Registered by the form so it
 *                 travels through the same schema on both sides.
 */
export const leadCaptureSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Please provide a valid email address'),
  budgetRange: z.enum(BUDGET_RANGES, 'Please select a budget range'),
  serviceRequired: z.enum(SERVICE_OPTIONS, 'Please select a service'),
  websiteUrl: z.union([
    z.literal(''),
    z.string().trim().url('Please provide a valid URL'),
  ]),
  message: z.string().trim().max(2000, 'Message must be under 2000 characters'),
  website: z.string().optional(),
})

/** Types shared between the form and the API route. */
export const BUDGET_RANGE_LABELS = {
  'under-1000': 'Under $1,000',
  '1000-2500': '$1,000 – $2,500',
  '2500-5000': '$2,500 – $5,000',
  '5000-10000': '$5,000 – $10,000',
  '10000-plus': '$10,000+',
}

export const SERVICE_LABELS = {
  web: 'Custom Web Solutions',
  social: 'Social Media Management',
  marketing: 'Performance Marketing',
}
