import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const VALID_STATUSES = ['received', 'researching', 'drafting', 'review', 'delivered'] as const
type OrderStatus = typeof VALID_STATUSES[number]

export async function POST(req: NextRequest) {
  // Auth: accept either Authorization header or ?token= query param (for N8N compatibility)
  const adminToken = process.env.ADMIN_TOKEN
  if (adminToken) {
    const headerToken = req.headers.get('authorization')?.replace('Bearer ', '')
    const queryToken = new URL(req.url).searchParams.get('token')
    if (headerToken !== adminToken && queryToken !== adminToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  let body: { orderRef?: string; status?: string; n8nJobId?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { orderRef, status, n8nJobId } = body

  if (!orderRef || typeof orderRef !== 'string') {
    return NextResponse.json({ error: 'orderRef is required' }, { status: 400 })
  }
  if (!status || !VALID_STATUSES.includes(status as OrderStatus)) {
    return NextResponse.json(
      { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
      { status: 400 }
    )
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  const supabase = createClient(supabaseUrl, serviceKey)

  const updateData: Record<string, string> = { status }
  if (n8nJobId) updateData.n8n_job_id = n8nJobId

  const { data, error } = await supabase
    .from('resume_orders')
    .update(updateData)
    .eq('order_ref', orderRef.toUpperCase())
    .select('order_ref, status, email, first_name')
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  if (!data) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 })
  }

  // If status is 'delivered', send delivery notification email to customer
  if (status === 'delivered' && process.env.RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'orders@myqualifiedresume.com',
          to: data.email,
          subject: `Your resume is ready — ${orderRef.toUpperCase()}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
              <div style="border-top: 3px solid #c9a84c; padding-top: 32px; margin-bottom: 32px;">
                <h1 style="font-size: 22px; font-weight: 300; margin: 0 0 8px;">Your resume is ready.</h1>
                <p style="font-size: 12px; color: #666; margin: 0;">Qualified Resume Co.</p>
              </div>
              <p style="font-size: 13px; line-height: 1.8; color: #333;">Hi ${data.first_name},</p>
              <p style="font-size: 13px; line-height: 1.8; color: #333;">
                Your resume has been completed, reviewed by our team, and is on its way to your inbox right now.
              </p>
              <p style="font-size: 13px; line-height: 1.8; color: #333;">
                Check your email (including spam/promotions) for the delivery from Terry@scottadvisory.net.
              </p>
              <div style="background: #f5f5f0; border: 1px solid #e0ddd0; padding: 16px 20px; margin: 24px 0;">
                <p style="font-size: 11px; color: #888; margin: 0 0 4px; letter-spacing: 0.1em; text-transform: uppercase;">Order Reference</p>
                <p style="font-size: 16px; color: #c9a84c; font-weight: 600; margin: 0; font-family: monospace;">${orderRef.toUpperCase()}</p>
              </div>
              <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                Questions? Reply here or email <a href="mailto:Terry@scottadvisory.net" style="color: #c9a84c;">Terry@scottadvisory.net</a>
              </p>
            </div>
          `
        })
      })
    } catch {
      // Non-blocking
    }
  }

  return NextResponse.json({
    ok: true,
    orderRef: data.order_ref,
    status: data.status,
  })
}
