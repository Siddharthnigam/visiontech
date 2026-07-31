import { NextResponse } from 'next/server'
import { leadCaptureSchema } from '@/lib/validations'

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

  try {
    // TODO: connect to CRM/email service (e.g., Resend, HubSpot)
    // Store/send the lead here: result.data.name, .email, .budgetRange,
    // .serviceRequired, .websiteUrl, .message
  } catch (error) {
    console.error('Failed to capture lead:', error)
    return NextResponse.json(
      { error: 'Something went wrong on our end' },
      { status: 500 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Lead captured' },
    { status: 200 }
  )
}
