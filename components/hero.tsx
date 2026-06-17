export function Hero() {
  return (
    <section className="text-center px-6 pt-16 pb-10 border-b border-border bg-gradient-to-b from-warm to-background">
      <p className="font-serif text-xs tracking-[0.22em] text-gold uppercase mb-6">
        Qualified Resume Co.
      </p>
      <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 text-balance">
        Your resume, <em className="text-sage italic">professionally</em>
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>written in 48 hours.
      </h1>
      <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed font-light mb-8">
        AI-powered documents built from your experience — reviewed by a real person and delivered straight to your inbox.
      </p>
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <TrustBadge text="Students & early-career professionals" />
        <TrustBadge text="ATS-optimized every time" />
        <TrustBadge text="No templates. Built from scratch." />
      </div>
    </section>
  )
}

function TrustBadge({ text }: { text: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-ink-light tracking-wide">
      <span className="w-1.5 h-1.5 rounded-full bg-sage-light" />
      {text}
    </span>
  )
}
