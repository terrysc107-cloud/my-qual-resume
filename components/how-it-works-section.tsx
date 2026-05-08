export function HowItWorksSection() {
  const steps = [
    { icon: "1", title: "Submit Your Info", desc: "Fill out our intake form with your work history, target job description, and goals. Takes about 5 minutes." },
    { icon: "2", title: "AI Researches the Role", desc: "Our AI analyzes the job description, extracts ATS keywords, identifies company culture signals, and maps your strongest positioning angle." },
    { icon: "3", title: "3 Resumes Generated", desc: "Three variations built from scratch: ATS-optimized, experience-forward chronological, and achievement-focused executive style." },
    { icon: "4", title: "Expert Review + Delivery", desc: "Our team reviews, formats into your chosen template, and emails you polished Word documents ready to send." },
  ]

  return (
    <section id="how" className="py-24 md:py-32 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-[9px] tracking-[0.22em] uppercase text-gold mb-4 flex items-center gap-3">
          <span className="w-6 h-px bg-gold" />
          Process
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-ink leading-tight mb-4">
          From submission to <em className="text-gold italic">interview-ready</em> in 48 hours
        </h2>
        <p className="text-[11px] text-ink4 leading-[1.9] max-w-xl tracking-wide mb-16">
          Our AI-powered workflow researches your target role, analyzes your experience, and builds three tailored resume variations — then our team reviews every word before it reaches your inbox.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-7 left-[7%] right-[7%] h-px bg-gradient-to-r from-transparent via-fog3 to-transparent z-0" />
          
          {steps.map((step, i) => (
            <div key={i} className="pr-6 relative z-[1] mb-8 lg:mb-0">
              <div className="w-14 h-14 border border-fog3 bg-white flex items-center justify-center mb-6 hover:border-gold hover:bg-[#fdf8ee] transition-all">
                <span className="text-xl">{step.icon}</span>
              </div>
              <h3 className="font-serif text-xl font-normal text-ink mb-2.5">{step.title}</h3>
              <p className="text-[10px] text-ink4 leading-[1.85] tracking-wide">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
