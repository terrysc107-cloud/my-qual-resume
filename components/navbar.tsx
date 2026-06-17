"use client"

export function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 h-16 flex items-center justify-between bg-ink/95 backdrop-blur-md border-b border-gold/10">
      <div className="font-serif text-base font-light text-white tracking-widest">
        Qualified <em className="text-gold2 italic">Resume</em> Co
      </div>
      <div className="flex items-center gap-6 md:gap-9">
        <button 
          onClick={() => scrollTo('how')}
          className="hidden md:block text-[9px] tracking-[0.16em] uppercase text-white/45 hover:text-gold2 transition-colors"
        >
          How It Works
        </button>
        <button 
          onClick={() => scrollTo('pricing')}
          className="hidden md:block text-[9px] tracking-[0.16em] uppercase text-white/45 hover:text-gold2 transition-colors"
        >
          Pricing
        </button>
        <button 
          onClick={() => scrollTo('testimonials')}
          className="hidden md:block text-[9px] tracking-[0.16em] uppercase text-white/45 hover:text-gold2 transition-colors"
        >
          Results
        </button>
        <button 
          onClick={() => scrollTo('intake')}
          className="bg-gold text-ink text-[9px] tracking-[0.16em] uppercase px-5 py-2.5 font-medium hover:bg-gold2 transition-colors"
        >
          Get Started
        </button>
      </div>
    </nav>
  )
}
