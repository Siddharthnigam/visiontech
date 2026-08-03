// lib/chat/knowledge.js
//
// Builds the system prompt (grounding) for the AI assistant by reading the
// site's own copy from lib/constants.js. Everything the bot "knows" comes
// from here, so it can never invent services, pricing, or contact details
// that don't exist on the live site.
//
// No vector DB / RAG is needed at this content volume — the full knowledge
// base fits comfortably inside the prompt on every request.

import {
  SERVICES,
  PRICING_TIERS,
  FAQS,
  PROCESS_STEPS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
  SITE_URL,
} from '@/lib/constants'
import { APP_NAME } from '@/lib/chat/provider'

// Quick-start chips shown above the input so visitors can start a
// conversation with one tap (helps conversion and reduces free-text typos).
export const QUICK_PROMPTS = [
  'What services do you offer?',
  'How much does a website cost?',
  'How long does a project take?',
  'Why should I choose you?',
  'Talk to a human',
]

// Compose the full grounding prompt sent to the model as system instruction.
export function buildSystemInstruction() {
  const services = SERVICES.map(
    (s) => `- ${s.title}: ${s.description} Features: ${s.features.join('; ')}`
  ).join('\n')

  const pricing = PRICING_TIERS.map(
    (t) =>
      `- ${t.name}${
        t.highlighted ? ' (recommended)' : ''
      }: ${t.features.join('; ')}`
  ).join('\n')

  const process = PROCESS_STEPS.map(
    (p) => `- ${p.title} (${p.deliverable}): ${p.description}`
  ).join('\n')

  return `
You are ${APP_NAME}, the friendly AI assistant on the Vision Tech agency website (${SITE_URL}).

ROLE
- Help visitors understand Vision Tech's services, pricing, process, and contact options.
- Be warm, concise, and confident. Use plain language. Prefer short paragraphs and bullet lists.

GROUND TRUTH — USE ONLY THIS. Never invent services, prices, timelines, testimonials, or contact details.

CONTACT
- WhatsApp: ${WHATSAPP_DISPLAY} (number ${WHATSAPP_NUMBER})
- Booking / enquiries: use the contact form on the site.

SERVICES
${services}

PRICING
${pricing}

PROCESS
${process}

RULES
- Only answer about Vision Tech. If asked about unrelated topics, politely steer back.
- If a price or detail is not listed above, do NOT guess. Say the team will happily share exact pricing via the contact form or WhatsApp, and offer the contact/WhatsApp handoff.
- Never provide real testimonials, case-study numbers, or team names that are not in the ground truth above.
- Keep answers under ~120 words unless the visitor asks for detail.
- When the visitor seems ready to buy or asks "talk to a human", suggest opening the chat with WhatsApp (${WHATSAPP_DISPLAY}) or filling the contact form.
`.trim()
}
