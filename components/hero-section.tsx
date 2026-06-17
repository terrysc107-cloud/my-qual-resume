"use client"

import Image from "next/image"

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen bg-ink relative overflow-hidden flex flex-col pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_75%_50%,#1c1500_0%,transparent_60%),radial-gradient(ellipse_50%_40%_at_10%_80%,#0f0e00_0%,transparent_50%)] z-0" />
      <div 
        className="absolute inset-0 z-[1]" 
        style={{
          backgroundImage: 'linear-gradient(rgba(196,154,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(196,154,42,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }}
      />
      <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(196,154,42,0.08)_0%,transparent_70%)] right-[-100px] top-1/2 -translate-y-1/2 z-[1] pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex items-center px-6 md:px-12 py-12 md:py-20">
        <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left side */}
          <div className="flex-1 max-w-xl lg:max-w-[600px]">
            <div className="animate-fade-up inline-flex items-center gap-2 bg-gold/10 border border-gold/20 px-3.5 py-1.5 text-[8px] tracking-[0.2em] uppercase text-gold2 mb-8">
              <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse-dot" />
              AI-Powered · Human-Reviewed · Delivered in 48hrs
            </div>
            
            <h1 className="animate-fade-up-delay-1 font-serif text-4xl md:text-5xl lg:text-[5.2rem] font-light leading-[1.05] text-white mb-6">
              Your next role starts with a <em className="text-gold2 italic block">qualified</em> resume.
            </h1>
            
            <p className="animate-fade-up-delay-2 text-[11px] text-white/40 leading-8 tracking-wide max-w-md mb-10">
              We combine AI research and real human expertise to build resumes that get interviews. Three tailored variations, a custom cover letter, and a LinkedIn summary — delivered to your inbox.
            </p>
            
            <div className="animate-fade-up-delay-3 flex flex-wrap gap-3">
              <button 
                onClick={() => scrollTo('pricing')}
                className="bg-gold text-ink text-[10px] tracking-[0.16em] uppercase px-10 py-4 font-medium hover:bg-gold2 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,154,42,0.25)] transition-all"
              >
                Start My Resume
              </button>
              <button 
                onClick={() => scrollTo('how')}
                className="bg-transparent border border-white/15 text-white/55 text-[10px] tracking-[0.16em] uppercase px-8 py-4 hover:border-gold2 hover:text-gold2 transition-all"
              >
                See How It Works
              </button>
            </div>
          </div>

          {/* Center - Hero Image */}
          <div className="animate-fade-up-delay-3 hidden xl:block flex-shrink-0">
            <div className="relative w-[280px] h-[350px]">
              <div className="absolute inset-0 bg-gradient-to-b from-gold/20 to-transparent opacity-50 z-10" />
              <Image 
                src="/images/hero-professional.jpg"
                alt="Professional who landed their dream job with a qualified resume"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink via-ink/80 to-transparent h-24 z-10" />
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-[9px] text-gold tracking-widest uppercase mb-1">Success Story</p>
                <p className="text-[11px] text-white/70 leading-relaxed">Landed a senior role within 3 weeks of using Qualified Resume Co.</p>
              </div>
            </div>
          </div>

          {/* Right side - Process card */}
          <div className="animate-fade-up-delay-4 flex-shrink-0 w-full lg:w-[340px]">
            <div className="bg-white/[0.03] border border-gold/15 p-7">
              <div className="text-[9px] tracking-[0.16em] uppercase text-gold2 mb-5 flex items-center gap-2">
                Your order flow
                <span className="flex-1 h-px bg-gold/20" />
              </div>
              
              {[
                { num: 1, title: "Submit your info", desc: "Paste your job description and work history. Takes 5 minutes." },
                { num: 2, title: "AI researches the role", desc: "We analyze the role, company, and keywords to position you perfectly." },
                { num: 3, title: "3 resumes generated", desc: "ATS-optimized, chronological, and achievement-focused variations." },
                { num: 4, title: "Expert review + delivery", desc: "Our team reviews, formats, and emails your final documents." },
              ].map((step, i) => (
                <div key={i} className={`flex gap-3 items-start py-3 ${i < 3 ? 'border-b border-white/5' : ''}`}>
                  <div className="w-[22px] h-[22px] flex-shrink-0 bg-gold/10 border border-gold/25 flex items-center justify-center text-[9px] text-gold">
                    {step.num}
                  </div>
                  <div className="text-[10px] text-white/50 leading-relaxed tracking-wide">
                    <strong className="text-white/85 block mb-0.5 font-normal">{step.title}</strong>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="animate-fade-up-delay-5 relative z-10 border-t border-white/[0.06] flex flex-wrap">
        {[
          { value: "2,400+", label: "Resumes Delivered" },
          { value: "87%", label: "Interview Rate" },
          { value: "48hr", label: "Turnaround" },
          { value: "4.9★", label: "Client Rating" },
        ].map((stat, i) => (
          <div key={i} className={`flex-1 min-w-[50%] md:min-w-0 px-6 md:px-12 py-6 md:py-7 flex items-center gap-4 ${i < 3 ? 'border-r border-white/[0.06]' : ''} ${i < 2 ? 'border-b md:border-b-0 border-white/[0.06]' : ''}`}>
            <div>
              <div className="font-serif text-3xl md:text-4xl font-light text-gold2 leading-none">{stat.value}</div>
              <div className="text-[9px] text-white/25 tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
