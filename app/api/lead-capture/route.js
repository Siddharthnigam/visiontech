import { NextResponse } from 'next/server'
import { leadCaptureSchema } from '@/lib/validations'
import {
  SERVICE_LABELS,
  BUDGET_RANGE_LABELS,
} from '@/lib/validations'
import emailjs from '@emailjs/nodejs'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY

export async function POST(request) {
  let body

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
  }

  // Honeypot: if the hidden field is filled, it is a bot. Respond with a
  // success-shaped no-op so scrapers cannot tell they were blocked.
  if (typeof body?.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ success: true, ignored: true }, { status: 200 })
  }

  // Validate server-side against the same schema the form uses client-side.
  const result = leadCaptureSchema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Validation failed',
        issues: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const { name, email, serviceRequired, budgetRange, websiteUrl, message } =
    result.data

  try {
    // Inbox notification to your Gmail (template_53yyfjj).
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        service_needed: SERVICE_LABELS[serviceRequired] || serviceRequired,
        budget_range: BUDGET_RANGE_LABELS[budgetRange] || budgetRange,
        website_url: websiteUrl,
        message: message || '',
      },
      { publicKey: PUBLIC_KEY, privateKey: PRIVATE_KEY }
    )
  } catch (error) {
    console.error('Failed to capture lead:', error)
    return NextResponse.json(
      {
        error: 'Something went wrong on our end',
        detail: error?.text || error?.message || String(error),
      },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Lead captured' },
    { status: 200 }
  )
}