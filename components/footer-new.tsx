export function FooterNew() {
  return (
    <footer className="bg-ink2 px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between gap-12 pb-10 border-b border-white/[0.06] mb-7">
          <div>
            <div className="font-serif text-xl font-light text-white tracking-widest mb-3">
              Qualified <em className="text-gold2 italic">Resume</em> Co
            </div>
            <p className="text-[9px] text-white/25 tracking-widest leading-[1.7] max-w-[220px]">
              AI-powered resumes, human-reviewed and delivered to your inbox in 48 hours.
            </p>
          </div>

          <div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-gold mb-4">Service</div>
            <ul className="space-y-2.5">
              <li><a href="#how" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">How It Works</a></li>
              <li><a href="#pricing" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">Pricing</a></li>
              <li><a href="#pricing" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">Get Started</a></li>
              <li><a href="#testimonials" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">Client Results</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-gold mb-4">Company</div>
            <ul className="space-y-2.5">
              <li><a href="https://scottadvisory.net" target="_blank" rel="noopener noreferrer" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">Scott Advisory Group</a></li>
              <li><a href="mailto:Terry@scottadvisory.net" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <div className="text-[8px] tracking-[0.2em] uppercase text-gold mb-4">Contact</div>
            <ul className="space-y-2.5">
              <li>
                <a href="mailto:Terry@scottadvisory.net" className="text-[10px] text-white/35 tracking-wide hover:text-gold2 transition-colors">
                  Terry@scottadvisory.net
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-3">
          <div className="text-[9px] text-white/15 tracking-widest">
            © 2026 Qualified Resume Co · Scott Advisory Group · All rights reserved
          </div>
        </div>
      </div>
    </footer>
  )
}
