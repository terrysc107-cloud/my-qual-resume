import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { FooterNew } from "@/components/footer-new"
import { IntakeForm } from "@/components/intake-form"

export const metadata = {
  title: "Start Your Order | Qualified Resume Co.",
  description: "Complete your intake form and we'll deliver your resume within 48 hours.",
}

export default function IntakePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-fog3 overflow-hidden shadow-[0_16px_64px_rgba(0,0,0,0.08)]">
            <Suspense fallback={
              <div className="p-12 text-center text-[10px] text-ink4 tracking-widest uppercase">Loading...</div>
            }>
              <IntakeForm />
            </Suspense>
          </div>
        </div>
      </section>
      <FooterNew />
    </main>
  )
}
