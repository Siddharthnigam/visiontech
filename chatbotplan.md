# AI Chatbot Plan — Vision Tech

Goal: add an AI assistant to the Vision Tech site (Next.js 16, React 19, hosted on Vercel) that answers visitor questions about services, pricing, process, and setup — and routes them to the existing lead-capture / WhatsApp flow when they're ready to buy.

This file compares the main build options so you can pick what fits your budget, latency, and trust needs. Everything below is achievable with the current codebase; nothing requires buying new infrastructure up front.

---

## 1. Decide what the bot does (scope first)

Before picking a "how", lock the **what**. Configuring the bot's job dictates every architectural choice.

Suggested scope (fits the site content you already have):

- **Answer FAQs** — pull from the FAQ, services, pricing, and process copy already in `lib/constants.js`.
- **Qualify leads** — ask name / email / service / budget, then hand off to the real `/api/lead-capture` endpoint.
- **Human handoff** — offer a WhatsApp link (`WHATSAPP_LINK`) when the user wants a person.
- **Stay on-brand** — guardrails so it only talks about Vision Tech, never invents pricing.

Two hidden risks to design around:
1. **Latency** — every turn hit to an external LLM costs time. Design for fast (first response < 1s).
2. **Cost + abuse** — an open, free chat can be spammed. Add rate limiting per session, and a cap on messages before it hands off to a human.

---

## 2. The five build approaches

### Option A — Rule-based / keyword chatbot (no AI, zero cost)

A state-machine bot: scripted questions and keyword matching. No external service.

- **How**: define an intent list (`service`, `pricing`, `support`, `contact`, ...) in a config file.
  Each intent maps to trigger keywords and a canned answer pulled from real site copy. A simple
  decision tree handles `yes/no` follow-ups, and a form-drop-off detector offers WhatsApp.
- **Tech**: pure client component in `components/chat/Chatbot.jsx` (+ a tiny `lib/chat-intents.js`). No API route, no dependencies.
- **Pros**: instant, free, private, no keys, works offline, nothing to monitor.
- **Cons**: brittle with free text, no understanding, needs keyword lists maintained.
- **Best for**: a quick v1 to validate that people actually use chat before paying for an LLM.

### B — Options-only / guided questionnaire (no AI, converts best)

**A tappable path-branching bot** — the visitor picks from buttons instead of typing.

- **How**: the same detector as A but the UI only shows option buttons ("I want a website",
  "What's pricing?", "Talk to a human"). Each choice leads to a canned answer + next buttons.
  Terminal nodes offer the lead form or WhatsApp.
- **Pros**: zero free-text to parse, tiny cost, near-0 latency, highest conversion focus, simplest mental model for the visitor.
- **Cons**: rigid, feels less "smart".
- **Best when**: you care about leads, not about demoing AI.

### C — LLM API grounded in your site content (the "real" AI option)

**A true conversational bot** that reads your own content as ground truth, so it never hallucinates your services or pricing.

- **How**: two QR entry paths (recommended):
  - **No vector DB (simplest)**: at build/deploy time, generate a transcript of all your site
    copy (FAQs, services, pricing, process) and inject it into the system prompt, or embed chunk
    in a local vector store file. With ~all your content being small (< a few thousand words), you
    can statically serve the prompt. No vector database, no `pgvector`, no calls to a vector
    service — the whole knowledge base ships within a prompt.
  2. **Vector retrieval (RAG)**: only genuinely needed when content grows large (blogs, docs).
- wire an **API route**: `app/api/chat/route.js` → calls the LLM provider → returns the answer
  as a token stream (SSE) for a typing effect.
- **Which LLM**: options below in §3.
- **Pros**: natural conversation, understands anything, on-brand if the prompt is tight.
- **Cons**: real cost per message, latency, needs rate limiting, must keep the prompt/knowledge updated each deploy.
- **This matches the site's brand**: an agency that sells AI can't have a rule-based chatbot.

### D — Third-party "no-code" chatbot (Whitney Smartوات / Intercom Fin / Crefactual, etc.)

Plug a ready-made widget (e.g., Crush, manylift, Freshchat, Zendesk, LiveChat, + AI add-ons).

- **How**: drop a `<script>` tag or a React package, paste a URL of page to train it conversation.
- **Pros**: fastest, hosted, human handoff built-in, analytics included.
- **Cons**: monthly fee, widget styling may clash with the site's very custom design, data leaves your control.
- **Best when**: you want to move in a day and don't need the source code.

---

## 3. Which AI provider (for Options 1 and C)

| Approach | Friction | Feature | Latency | Cost @ scale | Cold start |
|---|---|---|---|---|---|
| **LLM API (provider)** — OpenAI, Anthropic, Google gemma | Fast to build | Great | Low | Pay per token | No / no |
| **LLM API but self-hosted open model** | Model runner complexity | Meh | Higher | Higher | Possible |

**Recommended for this project:**

- **For Option 1A "prompt-in-the-payload"** — start with whatever you already use or the cheapest:
  - **Anthropic Claude** (good "agent" temperament, clear guardrails, generous free tier).
  - **OpenAI / a cheap** So, e.g. `gpt-4o-mini` or `o4-mini` — fast, cheap, well documented.
  - **DeepSeek** — very cheap / good reasoning, but quieter production support.
- **Streaming (SSE)** via `Route Handlers` is a must so the first token arrives ~instantly.

> The abstraction: put the provider config behind `lib/chat/provider.js` so you can hot-swap
> each provider with a single env var. No lock-in.

---

## 4. Architecture for the recommended path (A + AI)

```
Browser  <---SSE stream--  Next.js Route Handler  --->  LLM Provider API
   |         (server/edge)                                  (OpenAI / Anthropic)
   |
   +-- conversation state held Client-side (React useReducer)
   +-- optional "send to lead form" -> POST /api/lead-capture  (existing)
   +-- "chat on WhatsApp"         -> WHATSAPP_LINK               (existing)
```

Frontend:
- `components/chat/ChatLauncher.jsx` — floating button (bottom-left, matching the WhatsApp one).
- `components/chat/ChatWindow.jsx` — window, renders chat bubbles, typing indicator, quick-start buttons.
- `components/chat/useChat.js` — hook managing messages & streaming via `fetch('/api/chat', stream)`.

Backend:
- `app/api/chat/route.js` — `POST` with message + `sessionId`:
  1. Load the knowledge prompt (`lib/chat/knowledge.js`).
  2. Append conversation history (recent ~10 turns only).
  3. Call the provider (stream). 
  4. On a "lead detected" signal from the assistant, return a special JSON block the client
     switches to the existing lead/WhatsApp flows.
- `lib/chat/safety.js` — **rate limit** 5 msgs/hour/session; no PII echo; block HTML; fail–closed.

Knowledge grounding:
- `lib/chat/knowledge.js` reads `FAQS`, `SERVICES`, `PRICING_TIERS`, `WHATSAPP_*`, contact data
  and formats ("You are Vision Tech support. Facts you know: ... rules: ..."). Build/refresh on each deploy.
  No vector DB needed at your content volume.

---

## 5. Cost & security guardrails

- **Rate limit** per IP+session (e.g., 10/user/hour) to stop runaway API bills.
- **Max tokens** per reply; cap conversation history (don't allow it to grow forever).
- **Sanitize input**; never let the model take actions or read env vars; **no secret leak** (SSR only).
- **Opt-in**: show a small "AI assistant" disclaimer so users know it's not a human.
- **Limit** for an unlogged visitor: after ~N turns, prompt "want a human?" -> WhatsApp / form.

---

## 6. Recommended roadmap

1. **Ship Option A/B (rule/options bot)** this week — proves the institution, zero cost, wire into WhatsApp + form. ~half a day.
2. **Add Option C (LLM)** behind the same UI globally — swap the intent resolver for the provider, disable usage. ~1–2 days.
3. **Tune** the prompt/guardrails, add analytics/rate limits, A/B against the rule-based baseline.
4. **Escalate in-house**: persistent, custom knowledge when content exceeds the prompt-safe size.

---

## 7. What I need from you to build the 

✅ If you choose to build (Option A+B or A+C), confirm:

1. **Which provider** (OpenAI, Anthropic, DeepSeek) and do you have an API key / budget?
2. **Chatbot behavior** — open chat from every page (floating button) or only on the contact page?
3. **Lead capture** — should the bot itself submit to `/api/lead-capture`, or just hand off to the form / WhatsApp?
4. **Personality/constraints** — list the exact services + pricing so knowledge is accurate.
5. **Any existing chatbot account** you already use (so we match it instead of building new).

---

Pick a direction (I recommend **A/B → C: rule-based to start, then swap in an LLM**), give me the
provider + the 4 items above, and I'll scaffold the components, the API route, and the knowledge file.