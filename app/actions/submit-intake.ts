'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

type SubmitResult = 
  | { success: true; orderRef: string; error?: never }
  | { success: false; error: string; orderRef?: never }

export async function submitIntakeForm(formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  currentTitle: string
  yearsExp: string
  package: string
  targetTitle: string
  industry: string
  jobDescription: string
  workHistory: string
  certifications: string
  notes: string
  template: string
  resumeUrl: string
}): Promise<SubmitResult> {
  // Generate unique order ref with timestamp + random to prevent duplicates
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  const orderRef = `QRC-${timestamp}-${random}`

  const payload = {
    orderRef,
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    currentTitle: formData.currentTitle,
    yearsExp: formData.yearsExp,
    package: formData.package,
    targetTitle: formData.targetTitle,
    industry: formData.industry,
    jobDescription: formData.jobDescription,
    workHistory: formData.workHistory,
    certifications: formData.certifications,
    notes: formData.notes,
    template: formData.template,
    submittedAt: new Date().toISOString()
  }

  // Check env vars
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { success: false, error: 'Missing SUPABASE_URL env var' }
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, error: 'Missing SUPABASE_SERVICE_ROLE_KEY env var' }
  }

  // Post to n8n webhook
  let webhookOk = true
  try {
    const webhookRes = await fetch('https://aigenx.app.n8n.cloud/webhook/qualified-resume-intake', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!webhookRes.ok) webhookOk = false
  } catch {
    webhookOk = false
  }

  // If webhook failed, send a fallback alert email via Resend (non-blocking)
  if (!webhookOk) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'alerts@myqualifiedresume.com',
          to: 'Terry@scottadvisory.net',
          subject: `[ALERT] N8N webhook failed — Order ${orderRef}`,
          html: `<p>The N8N webhook failed for order <strong>${orderRef}</strong>. Manual follow-up required.</p><pre>${JSON.stringify(payload, null, 2)}</pre>`
        })
      })
    } catch {
      // Best effort
    }
  }

  // Write to Supabase
  try {
    const supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )

    const { error } = await supabase
      .from('resume_orders')
      .upsert(
        {
          order_ref: orderRef,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          current_title: formData.currentTitle,
          years_exp: formData.yearsExp,
          package: formData.package,
          target_title: formData.targetTitle,
          industry: formData.industry,
          job_description: formData.jobDescription,
          work_history: formData.workHistory,
          certifications: formData.certifications,
          notes: formData.notes,
          template: formData.template
        },
        { onConflict: 'order_ref' }
      )

    if (error) {
      return { success: false, error: `Supabase: ${error.message}` }
    }

    // Send confirmation email to customer
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'orders@myqualifiedresume.com',
            to: formData.email,
            subject: `Your resume order is confirmed — ${orderRef}`,
            html: `
              <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
                <div style="border-top: 3px solid #c9a84c; padding-top: 32px; margin-bottom: 32px;">
                  <h1 style="font-size: 22px; font-weight: 300; margin: 0 0 8px;">Order received.</h1>
                  <p style="font-size: 12px; color: #666; margin: 0;">Qualified Resume Co.</p>
                </div>
                <p style="font-size: 13px; line-height: 1.8; color: #333;">
                  Hi ${formData.firstName},
                </p>
                <p style="font-size: 13px; line-height: 1.8; color: #333;">
                  Your resume order has been received and our team is on it. Here's what happens next:
                </p>
                <ol style="font-size: 13px; line-height: 1.8; color: #333; padding-left: 20px;">
                  <li>Our AI research engine analyzes your target role and industry</li>
                  <li>Our resume specialists craft your tailored resume variations</li>
                  <li>An expert reviews everything for quality and accuracy</li>
                  <li>Your completed resume is delivered to this inbox</li>
                </ol>
                <div style="background: #f5f5f0; border: 1px solid #e0ddd0; padding: 16px 20px; margin: 24px 0;">
                  <p style="font-size: 11px; color: #888; margin: 0 0 4px; letter-spacing: 0.1em; text-transform: uppercase;">Order Reference</p>
                  <p style="font-size: 16px; color: #c9a84c; font-weight: 600; margin: 0; font-family: monospace;">${orderRef}</p>
                </div>
                <p style="font-size: 12px; color: #666; line-height: 1.8;">
                  <strong>Package:</strong> ${formData.package.charAt(0).toUpperCase() + formData.package.slice(1)}<br/>
                  <strong>Target role:</strong> ${formData.targetTitle}<br/>
                  <strong>Delivery:</strong> ${formData.package === 'premium' ? '24 hours' : '48 hours'}
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee;">
                  Questions? Reply to this email or contact <a href="mailto:Terry@scottadvisory.net" style="color: #c9a84c;">Terry@scottadvisory.net</a>
                </p>
              </div>
            `
          })
        })
      } catch {
        // Non-blocking — don't fail the order if email fails
      }
    }

    // Send internal order notification
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'orders@myqualifiedresume.com',
            to: 'Terry@scottadvisory.net',
            subject: `New order — ${orderRef} (${formData.package}, ${formData.targetTitle})`,
            html: `
              <div style="font-family: monospace; font-size: 13px; max-width: 600px; margin: 0 auto;">
                <h2 style="font-family: Georgia, serif; font-weight: 300;">New Resume Order</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 6px 0; color: #666; width: 140px;">Order Ref</td><td style="color: #c9a84c; font-weight: bold;">${orderRef}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Name</td><td>${formData.firstName} ${formData.lastName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Email</td><td>${formData.email}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Phone</td><td>${formData.phone || '—'}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Package</td><td>${formData.package}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Current Title</td><td>${formData.currentTitle}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Target Title</td><td>${formData.targetTitle}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Industry</td><td>${formData.industry}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">Template</td><td>${formData.template}</td></tr>
                  <tr><td style="padding: 6px 0; color: #666;">N8N webhook</td><td>${webhookOk ? '✓ Sent' : '⚠ FAILED — check manually'}</td></tr>
                </table>
                <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;"/>
                <p style="color: #666;">Work History:</p>
                <pre style="white-space: pre-wrap; font-size: 12px; background: #f5f5f5; padding: 12px;">${formData.workHistory}</pre>
                <p style="color: #666;">Job Description:</p>
                <pre style="white-space: pre-wrap; font-size: 12px; background: #f5f5f5; padding: 12px;">${formData.jobDescription}</pre>
              </div>
            `
          })
        })
      } catch {
        // Non-blocking
      }
    }

    return { success: true, orderRef }
  } catch (err) {
    return { success: false, error: `Server error: ${err instanceof Error ? err.message : String(err)}` }
  }
}
