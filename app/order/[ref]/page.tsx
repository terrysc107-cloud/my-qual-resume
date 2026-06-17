import { createClient } from '@supabase/supabase-js'
import { Navbar } from '@/components/navbar'
import { FooterNew } from '@/components/footer-new'
import Link from 'next/link'

const STATUS_STEPS = [
  { key: 'received', label: 'Order Received', desc: 'We have your details and are getting started.' },
  { key: 'researching', label: 'Research & Analysis', desc: 'AI is analyzing your target role and industry.' },
  { key: 'drafting', label: 'Resume Drafting', desc: 'Our specialists are crafting your resume variations.' },
  { key: 'review', label: 'Expert Review', desc: 'A human expert is reviewing for quality.' },
  { key: 'delivered', label: 'Delivered', desc: 'Your resume has been sent to your email.' },
]

async function getOrder(ref: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  const supabase = createClient(url, key)
  const { data } = await supabase
    .from('resume_orders')
    .select('order_ref, first_name, package, target_title, status, created_at')
    .eq('order_ref', ref.toUpperCase())
    .single()
  return data
}

export default async function OrderStatusPage({ params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params
  const order = await getOrder(ref)

  const currentStatus = (order?.status as string) ?? 'received'
  const currentIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus)
  const activeIndex = currentIndex === -1 ? 0 : currentIndex

  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          {!order ? (
            <div className="text-center py-20">
              <p className="text-[10px] text-ink4 tracking-widest uppercase mb-4">Order not found</p>
              <p className="text-sm text-ink4 mb-8">We couldn&apos;t find an order with reference <strong>{ref.toUpperCase()}</strong>.</p>
              <Link href="/intake" className="text-[9px] tracking-[0.16em] uppercase text-gold border border-gold px-6 py-2.5 hover:bg-gold hover:text-ink transition-colors">
                Start a New Order
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="text-[9px] tracking-[0.22em] uppercase text-gold mb-3">Order Status</div>
                <h1 className="font-serif text-3xl font-light text-ink mb-1">
                  Hi {order.first_name},
                </h1>
                <p className="text-[10px] text-ink4 tracking-wide">
                  Order <span className="font-mono text-gold">{order.order_ref}</span> · {order.package?.charAt(0).toUpperCase()}{order.package?.slice(1)} package · {order.target_title}
                </p>
              </div>

              <div className="bg-white border border-fog3 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                {STATUS_STEPS.map((step, i) => {
                  const isDone = i < activeIndex
                  const isActive = i === activeIndex
                  const isPending = i > activeIndex
                  return (
                    <div
                      key={step.key}
                      className={`flex items-start gap-4 px-6 py-5 border-b border-fog3 last:border-b-0 ${isPending ? 'opacity-35' : ''}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] ${
                        isDone ? 'bg-gold text-white' :
                        isActive ? 'bg-gold/20 border-2 border-gold text-gold' :
                        'bg-fog3 text-ink4'
                      }`}>
                        {isDone ? '✓' : i + 1}
                      </div>
                      <div>
                        <p className={`text-[11px] font-medium tracking-wide mb-0.5 ${isActive ? 'text-gold' : isDone ? 'text-ink' : 'text-ink4'}`}>
                          {step.label}
                          {isActive && <span className="ml-2 text-[9px] bg-gold/10 text-gold px-2 py-0.5 rounded">In Progress</span>}
                        </p>
                        <p className="text-[10px] text-ink4 tracking-wide leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <p className="text-[9px] text-ink4 tracking-wide text-center mt-8">
                Questions? Email <a href="mailto:Terry@scottadvisory.net" className="text-gold">Terry@scottadvisory.net</a> with your order reference.
              </p>
            </>
          )}
        </div>
      </section>
      <FooterNew />
    </main>
  )
}
