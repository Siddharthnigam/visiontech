'use client'

// Lead capture form — react-hook-form validated against the shared Zod
// schema (lib/validations.js), delivered to your inbox via EmailJS.
//
// - Reads ?intent=audit (Hero CTA) to frame the intro copy around the free
//   audit, and ?service= (Services CTAs) to pre-select a service.
// - Inline per-field errors wired up with aria-describedby + role="alert".
// - Honeypot "website" field stays hidden and empty; the API silently
//   ignores submissions that fill it.
import { Suspense, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSearchParams } from 'next/navigation'
import { CheckCircle2, ChevronDown, Loader2, RotateCcw } from 'lucide-react'
import {
  BUDGET_RANGES,
  BUDGET_RANGE_LABELS,
  SERVICE_OPTIONS,
  SERVICE_LABELS,
  leadCaptureSchema,
} from '@/lib/validations'
import { cn } from '@/lib/utils'
import ScrollReveal from '@/components/shared/ScrollReveal'
import Button from '@/components/ui/Button'
import { WHATSAPP_DISPLAY, WHATSAPP_LINK } from '@/lib/constants'
import { WhatsAppIcon } from '@/components/layout/WhatsAppButton'

const inputBase =
  'w-full rounded-md border bg-white px-4 py-3 text-base text-navy transition-colors placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60'
const inputState = (hasError) =>
  hasError ? 'border-danger/60' : 'border-navy/20'

// Defaults pulled from URL params. useSearchParams must render inside a
// Suspense boundary to keep the contact page statically prerenderable.
function useUrlDefaults() {
  const params = useSearchParams()
  const service = params.get('service')

  return useMemo(
    () => ({
      intent: params.get('intent'),
      serviceRequired: SERVICE_OPTIONS.includes(service) ? service : '',
    }),
    [params, service]
  )
}

export default function LeadCaptureForm() {
  return (
    <Suspense
      fallback={
        <div
          aria-hidden="true"
          className="rounded-lg border border-navy/10 bg-white p-8 shadow-soft"
        />
      }
    >
      <LeadCaptureFormInner />
    </Suspense>
  )
}

function LeadCaptureFormInner() {
  const { intent, serviceRequired } = useUrlDefaults()
  const isAudit = intent === 'audit'
  const [status, setStatus] = useState('idle')
  const [serverError, setServerError] = useState(null)
  const [submittedName, setSubmittedName] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadCaptureSchema),
    defaultValues: {
      name: '',
      email: '',
      budgetRange: '',
      serviceRequired,
      websiteUrl: '',
      message: '',
      website: '',
    },
  })

  async function onSubmit(values) {
    setStatus('submitting')
    setServerError(null)

    try {
      const response = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }

      setSubmittedName(values.name)
      setStatus('success')
    } catch (error) {
      console.error('Lead capture error:', error)
      setServerError(
        error?.message || 'Something went wrong. Please try again.'
      )
      setStatus('error')
    }
  }

  function handleReset() {
    reset()
    setStatus('idle')
    setServerError(null)
  }

  const submitting = status === 'submitting'

  return (
    <ScrollReveal>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
        {/* Intro column */}
        <div>
          <span className="text-caption text-brand">
            {isAudit ? 'Free audit' : 'Start a project'}
          </span>
          <h2 className="mt-4">
            {isAudit
              ? 'Let’s find the quick wins.'
              : 'Tell us what you’re building.'}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-navy/70">
            {isAudit
              ? 'You asked for a free audit — great. Share a few details and we’ll come back with a clear read on where the growth is hiding.'
              : 'Share a few details and we’ll get back to you within one business day with next steps.'}
          </p>
          <ul className="mt-8 space-y-4">
            {[
              'No obligation, no long sales call',
              'Reply within one business day',
              'Same team answers — no account managers',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-navy/80">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-md border border-navy/15 bg-white px-5 py-3.5 font-semibold text-navy shadow-soft transition-colors hover:border-[#25D366] hover:text-[#1eb85a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            <WhatsAppIcon
              className="h-5 w-5 text-[#25D366]"
              aria-hidden="true"
            />
            <span>
              Prefer WhatsApp?{' '}
              <span className="block text-small font-normal text-navy/60">
                Chat with us at {WHATSAPP_DISPLAY}
              </span>
            </span>
          </a>
        </div>

        {/* Form column */}
        {status === 'success' ? (
          <SuccessPanel name={submittedName} onReset={handleReset} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative rounded-lg border border-navy/10 bg-white p-8 shadow-soft lg:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                id="name"
                label="Name"
                error={errors.name}
                className="sm:col-span-1"
              >
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  disabled={submitting}
                  aria-invalid={errors.name ? 'true' : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className={cn(inputBase, inputState(errors.name))}
                  {...register('name')}
                />
              </Field>

              <Field
                id="email"
                label="Work email"
                error={errors.email}
                className="sm:col-span-1"
              >
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  disabled={submitting}
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={cn(inputBase, inputState(errors.email))}
                  {...register('email')}
                />
              </Field>

              <Field
                id="serviceRequired"
                label="Service needed"
                error={errors.serviceRequired}
                className="sm:col-span-1"
              >
                <SelectWrap disabled={submitting}>
                  <select
                    id="serviceRequired"
                    disabled={submitting}
                    aria-invalid={errors.serviceRequired ? 'true' : undefined}
                    aria-describedby={
                      errors.serviceRequired
                        ? 'serviceRequired-error'
                        : undefined
                    }
                    className={cn(
                      'w-full appearance-none border bg-white px-4 py-3 pr-10 text-base text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60',
                      inputState(errors.serviceRequired)
                    )}
                    {...register('serviceRequired')}
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((id) => (
                      <option key={id} value={id}>
                        {SERVICE_LABELS[id]}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
              </Field>

              <Field
                id="budgetRange"
                label="Budget range"
                error={errors.budgetRange}
                className="sm:col-span-1"
              >
                <SelectWrap disabled={submitting}>
                  <select
                    id="budgetRange"
                    disabled={submitting}
                    aria-invalid={errors.budgetRange ? 'true' : undefined}
                    aria-describedby={
                      errors.budgetRange ? 'budgetRange-error' : undefined
                    }
                    className={cn(
                      'w-full appearance-none border bg-white px-4 py-3 pr-10 text-base text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-60',
                      inputState(errors.budgetRange)
                    )}
                    {...register('budgetRange')}
                  >
                    <option value="">Select a range</option>
                    {BUDGET_RANGES.map((id) => (
                      <option key={id} value={id}>
                        {BUDGET_RANGE_LABELS[id]}
                      </option>
                    ))}
                  </select>
                </SelectWrap>
              </Field>

              <Field
                id="websiteUrl"
                label="Website (optional)"
                error={errors.websiteUrl}
                className="sm:col-span-2"
              >
                <input
                  id="websiteUrl"
                  type="url"
                  autoComplete="url"
                  placeholder="https://yourwebsite.com"
                  disabled={submitting}
                  aria-invalid={errors.websiteUrl ? 'true' : undefined}
                  aria-describedby={
                    errors.websiteUrl ? 'websiteUrl-error' : undefined
                  }
                  className={cn(inputBase, inputState(errors.websiteUrl))}
                  {...register('websiteUrl')}
                />
              </Field>

              <Field
                id="message"
                label="Anything else? (optional)"
                error={errors.message}
                className="sm:col-span-2"
              >
                <textarea
                  id="message"
                  rows="4"
                  disabled={submitting}
                  aria-invalid={errors.message ? 'true' : undefined}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={cn(
                    inputBase,
                    'resize-y',
                    inputState(errors.message)
                  )}
                  {...register('message')}
                />
              </Field>

              {/* Honeypot — visually hidden, must stay empty. */}
              <div
                className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('website')}
                />
              </div>
            </div>

            <div className="mt-8">
              <Button
                as="button"
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Sending…
                  </>
                ) : isAudit ? (
                  'Request my free audit'
                ) : (
                  'Send message'
                )}
              </Button>

              <p className="mt-4 text-small text-navy/60">
                We’ll only use your details to reply to this enquiry.
              </p>
            </div>

            {serverError && (
              <p
                role="alert"
                className="mt-5 rounded-md border border-danger/40 bg-danger/5 p-3 text-small font-semibold text-danger"
              >
                {serverError}
              </p>
            )}
          </form>
        )}
      </div>
    </ScrollReveal>
  )
}

// Field — labelled control + accessible inline error message.
function Field({ id, label, error, className, children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-small font-semibold text-navy">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-small font-semibold text-danger"
        >
          {error.message}
        </p>
      )}
    </div>
  )
}

// SelectWrap — positions a chevron over a native select.
function SelectWrap({ disabled, children }) {
  return (
    <div className="relative">
      {children}
      <ChevronDown
        className={cn(
          'pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy/50',
          disabled && 'opacity-60'
        )}
        aria-hidden="true"
      />
    </div>
  )
}

// SuccessPanel — post-submit confirmation with a reset action.
function SuccessPanel({ name, onReset }) {
  return (
    <div
      role="status"
      className="flex flex-col items-start rounded-lg border border-brand/30 bg-white p-8 shadow-soft lg:p-10"
    >
      <CheckCircle2 className="h-10 w-10 text-brand" aria-hidden="true" />
      <h3 className="mt-5">Thanks{name ? `, ${name.split(' ')[0]}` : ''}.</h3>
      <p className="mt-3 text-lg leading-relaxed text-navy/70">
        Your enquiry is on its way. We’ll get back to you within one business
        day with next steps.
      </p>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-[#1eb85a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
        Need a faster reply? Chat with us
      </a>
      <Button
        as="button"
        type="button"
        variant="outline"
        onClick={onReset}
        className="mt-8"
      >
        <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
        Send another message
      </Button>
    </div>
  )
}
