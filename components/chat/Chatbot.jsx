'use client'

// Chatbot — floating AI assistant (bottom-left; the WhatsApp button is
// bottom-right). Streams answers from /api/chat (Gemini), shows quick-start
// chips before the first message, and offers a WhatsApp handoff.
// Visuals follow the site's design system: navy + noise header, brand accent,
// Space Grotesk headings, white cards with shadow-soft.
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Bot, Loader2, Send, Sparkles, X } from 'lucide-react'
import { QUICK_PROMPTS } from '@/lib/chat/knowledge'
import { WHATSAPP_LINK } from '@/lib/constants'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'
import { cn } from '@/lib/utils'

const sessionId =
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now())

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  return (
    <>
      {/* Launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? 'Close chat' : 'Chat with Vision Tech AI'}
        initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="group fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-elevated transition-colors hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:bottom-6 md:left-6"
      >
        {/* Pulse ring */}
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/40"
        />
        {open ? (
          <X className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Sparkles
            className="h-5 w-5 transition-transform group-hover:scale-110"
            aria-hidden="true"
          />
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-16 left-5 z-50 flex h-[70vh] max-h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-lg border border-navy/10 bg-offwhite shadow-elevated md:bottom-24 md:left-6"
            role="dialog"
            aria-label="Vision Tech AI assistant"
          >
            <ChatWindow onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }, [messages, streaming, reduce])

  async function send(text) {
    const content = text.trim()
    if (!content || streaming) return

    const userMessage = { role: 'user', content }
    const history = [...messages, userMessage]
    setMessages(history)
    setInput('')
    setError(null)
    setStreaming(true)

    const next = { role: 'model', content: '' }
    setMessages((prev) => [...prev, next])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history, sessionId }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please retry.')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          const copy = prev.slice(0, -1)
          copy.push({ role: 'model', content: (last.content || '') + chunk })
          return copy
        })
      }
    } catch (e) {
      setError(e.message)
      setMessages((prev) => prev.slice(0, -1))
    } finally {
      setStreaming(false)
    }
  }

  const started = messages.length > 0 || error

  return (
    <>
      {/* Header — navy band with noise, matching the site's hero/footer */}
      <header className="noise-overlay relative overflow-hidden bg-navy px-4 py-3 text-offwhite">
        {/* Brand accent rule on top */}
        <div className="accent-rule absolute left-4 top-0 h-[3px] w-16" />
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand shadow-soft">
            <Bot className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1 text-left">
            <p className="font-heading text-sm font-semibold tracking-tight">
              Vision<span className="text-brand">Bot</span>
            </p>
            <p className="flex items-center gap-1.5 text-[11px] text-ice/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" />
              Online — AI assistant
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-md text-ice/70 transition-colors hover:bg-ice/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto bg-offwhite px-4 py-4">
        {!started && (
          <div className="flex max-w-[90%] items-start gap-2.5">
            <BotAvatar />
            <div className="rounded-lg rounded-bl-sm border border-navy/10 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy/80 shadow-soft">
              Hi, I’m <span className="font-semibold text-navy">VisionBot</span>{' '}
              — the Vision Tech assistant. Ask me about our services, pricing,
              or process, or tap a shortcut below 👇
            </div>
          </div>
        )}

        {messages.map((m, i) =>
          m.role === 'model' ? (
            <div key={i} className="flex max-w-[90%] items-start gap-2.5">
              <BotAvatar />
              <div className="whitespace-pre-wrap rounded-lg rounded-bl-sm border border-navy/10 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-navy shadow-soft">
                {m.content || (
                  <span className="inline-flex items-center gap-1.5 text-navy/50">
                    <Loader2
                      className="h-3.5 w-3.5 animate-spin"
                      aria-hidden="true"
                    />
                    Thinking…
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="max-w-[85%] rounded-lg rounded-br-sm bg-brand px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-soft">
                {m.content}
              </div>
            </div>
          )
        )}

        {(error || !started) && <div ref={error ? undefined : bottomRef} />}
        {error && (
          <p className="rounded-md border border-danger/40 bg-danger/5 px-3 py-2 text-small text-danger">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {!started && (
        <div className="flex flex-wrap gap-2 border-t border-navy/10 bg-white px-4 py-3">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => send(p)}
              className="rounded-full border border-brand/30 bg-ice/40 px-3 py-1.5 text-small font-medium text-navy transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
        className="flex items-center gap-2 border-t border-navy/10 bg-white px-3 py-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about pricing, services…"
          disabled={streaming}
          aria-label="Ask VisionBot"
          className="flex-1 rounded-md border border-navy/20 bg-offwhite px-3 py-2.5 text-sm text-navy placeholder:text-navy/40 transition-colors focus:border-transparent focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          aria-label="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-brand text-white transition-colors hover:bg-navy disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>

      {/* Human handoff */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className={cn(
          'flex items-center justify-center gap-2 bg-[#25D366] px-3 py-2.5 text-small font-semibold text-white transition-colors hover:bg-[#1eb85a]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
        )}
      >
        <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
        Prefer a human? Chat on WhatsApp
      </a>
    </>
  )
}

// BotAvatar — small brand avatar used next to assistant bubbles.
function BotAvatar() {
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-white">
      <Bot className="h-3.5 w-3.5" aria-hidden="true" />
    </span>
  )
}
