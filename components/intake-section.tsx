import { Suspense } from "react"
import { IntakeForm } from "./intake-form"

export function IntakeSection() {
  return (
    <section id="intake" className="py-10 md:py-16 px-6 md:px-12 bg-fog">
      <div className="max-w-3xl mx-auto">
        <div className="text-[9px] tracking-[0.22em] uppercase text-gold mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-gold" />
          Get Started
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-ink leading-tight mb-2">
          Build your <em className="text-gold italic">qualified</em> resume
        </h2>
        <p className="text-[11px] text-ink4 leading-[1.9] max-w-xl tracking-wide mb-8">
          Complete the form below. We handle the research, writing, and formatting.
        </p>

        <div className="bg-white border border-fog3 overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.08)]">
          <Suspense fallback={<div className="p-12 text-center text-[10px] text-ink4 tracking-widest uppercase">Loading...</div>}>
            <IntakeForm />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
