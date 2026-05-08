export function TestimonialsSection() {
  const testimonials = [
    {
      text: "I had been applying for 3 months with zero callbacks. Within two weeks of using my Qualified Resume, I had four interviews scheduled. The AI research on my target company was spot on.",
      name: "Marcus T.",
      role: "SPD Director · Healthcare",
      initials: "MT"
    },
    {
      text: "Three different resume styles gave me options I hadn't thought of. The achievement-focused version is what landed me the interview — my old resume never would have led with that angle.",
      name: "Keisha R.",
      role: "Operations Manager · Supply Chain",
      initials: "KR"
    },
    {
      text: "Worth every dollar. The cover letter alone got me a response from a company that had already passed on my application. The positioning was completely different — and it worked.",
      name: "David M.",
      role: "Sterile Processing Tech · Hospital",
      initials: "DM"
    }
  ]

  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 md:px-12 bg-fog">
      <div className="max-w-5xl mx-auto">
        <div className="text-[9px] tracking-[0.22em] uppercase text-gold mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-gold" />
          Client Results
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ink leading-tight mb-14">
          Real people, <em className="text-gold italic">real outcomes</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div 
              key={i} 
              className="bg-fog border border-fog3 p-7 md:p-8 relative hover:border-gold hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all"
            >
              <div className="absolute top-6 right-6 text-gold2 text-[10px] tracking-widest">★★★★★</div>
              <div className="font-serif text-5xl font-light text-gold3 leading-none mb-3">"</div>
              <p className="text-[11px] text-ink3 leading-[1.85] tracking-wide mb-6 italic">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-gold-dim flex items-center justify-center text-xs text-ink font-medium">
                  {t.initials}
                </div>
                <div>
                  <div className="text-[10px] text-ink tracking-wide">{t.name}</div>
                  <div className="text-[9px] text-ink4 tracking-wide mt-0.5">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
