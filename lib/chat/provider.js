// lib/chat/provider.js
//
// Thin provider wrapper so the chat API route stays model-agnostic. Swap the
// model / endpoint via env vars — no code changes needed.

export const APP_NAME = 'VisionBot'

export const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY

export const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models'
