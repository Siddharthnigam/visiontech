// app/api/chat/route.js
//
// POST /api/chat — streams a Gemini answer (SSE) for the Vision Tech AI
// assistant. Grounded in site content via lib/chat/knowledge.js.
//
// Safety:
// - In-memory rate limit per session (10 msgs / 10 min) to protect the free
//   tier and stop runaway API bills.
// - Max 2000 input chars, conversation truncated to last 12 turns.
// - Server-side only: the API key never leaves this route.

import { NextResponse } from 'next/server'
import { buildSystemInstruction } from '@/lib/chat/knowledge'
import {
  GEMINI_API_KEY,
  GEMINI_ENDPOINT,
  GEMINI_MODEL,
} from '@/lib/chat/provider'

// ── rate limiting (per-process; fine for a low-traffic site) ────────────────
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 10
const hits = new Map() // sessionId -> number[]

function rateLimited(sessionId) {
  const now = Date.now()
  const recent = (hits.get(sessionId) || []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(sessionId, recent)
    return true
  }
  recent.push(now)
  hits.set(sessionId, recent)
  return false
}

// Build Gemini "contents" from the client message history.
function toContents(messages) {
  const trimmed = messages.slice(-12)
  return trimmed.map((m) => ({
    role: m.role === 'model' ? 'model' : 'user',
    parts: [{ text: String(m.content).slice(0, 2000) }],
  }))
}

export async function POST(request) {
  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'Gemini is not configured yet. Add GEMINI_API_KEY.' },
      { status: 500 }
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  const { messages, sessionId = 'anonymous' } = body
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
  }

  if (rateLimited(sessionId)) {
    return NextResponse.json(
      {
        error:
          'You’ve sent a lot of messages — take a breather, then try again.',
      },
      { status: 429 }
    )
  }

  const url = `${GEMINI_ENDPOINT}/${GEMINI_MODEL}:streamGenerateContent?alt=sse`

  const upstream = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': GEMINI_API_KEY,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: buildSystemInstruction() }] },
      contents: toContents(messages),
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 512,
        topP: 0.95,
      },
    }),
  })

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => '')
    const status = upstream.status === 429 ? 429 : 502
    const message =
      status === 429
        ? 'The AI is busy right now (rate limit). Try again in a minute or chat on WhatsApp.'
        : 'The AI service had an error. Please try again.'
    return NextResponse.json({ error: message, detail: text }, { status })
  }

  // Stream Gemini's SSE back to the client as newline-delimited text chunks.
  const reader = upstream.body.getReader()
  const decoder = new TextDecoder()

  const stream = new ReadableStream({
    async pull(controller) {
      try {
        const { done, value } = await reader.read()
        if (done) {
          controller.close()
          return
        }
        const text = decoder.decode(value, { stream: true })
        for (const line of text.split('\n')) {
          const trimmed = line.trim()
          if (!trimmed.startsWith('data:')) continue
          const json = trimmed.slice(5).trim()
          if (json === '[DONE]') continue
          try {
            const chunk = JSON.parse(json)
            const parts = chunk?.candidates?.[0]?.content?.parts || []
            for (const p of parts) {
              if (p?.text) controller.enqueue(new TextEncoder().encode(p.text))
            }
          } catch {
            // skip malformed keep-alive lines
          }
        }
      } catch (error) {
        controller.error(error)
      }
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}
