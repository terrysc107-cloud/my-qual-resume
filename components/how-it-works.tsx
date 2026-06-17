const steps = [
  {
    number: 1,
    title: "Choose & pay",
    description: "Select your package and complete checkout through Square. Secure, instant confirmation."
  },
  {
    number: 2,
    title: "Complete your intake",
    description: "You'll receive a short form by email. Fill in your background, target role, and experience. Takes 10-15 minutes."
  },
  {
    number: 3,
    title: "We build your docs",
    description: "Our AI generates your resume, cover letter, and LinkedIn summary. A real person reviews before it's sent."
  },
  {
    number: 4,
    title: "Delivered to your inbox",
    description: "Your documents arrive by email within 24-48 hours. Reply to request revisions — up to 3 included."
  }
]

export function HowItWorks() {
  return (
    <section className="py-16 px-6 bg-warm border-y border-border">
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-gold mb-2">
        How it works
      </p>
      <h2 className="text-center font-serif text-3xl md:text-4xl text-foreground mb-10">
        Four steps to interview-ready
      </h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {steps.map((step) => (
          <div key={step.number} className="text-center p-4">
            <div className="w-12 h-12 rounded-full bg-foreground text-background font-serif text-xl flex items-center justify-center mx-auto mb-4">
              {step.number}
            </div>
            <h4 className="text-sm font-medium text-foreground mb-2 tracking-wide">
              {step.title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed font-light">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
