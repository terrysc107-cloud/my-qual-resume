"use client"

import { PACKAGES } from '@/lib/pricing'

export function PricingSectionNew() {

  return (
    <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 bg-ink">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-end mb-14 gap-6">
          <div>
            <div className="text-[9px] tracking-[0.22em] uppercase text-gold2 mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-gold2" />
              Pricing
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
              Invest in your <em className="text-gold2 italic">next opportunity</em>
            </h2>
          </div>
          <p className="text-[10px] text-white/25 tracking-wide max-w-[280px] leading-[1.7] text-right">
            All packages include AI research, expert human review, and delivery to your inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {PACKAGES.map((pkg, i) => (
            <div 
              key={i} 
              className={`p-9 md:p-11 transition-colors ${
                pkg.featured 
                  ? 'bg-[#0f0e00] border-t-2 border-gold -mt-0.5' 
                  : 'bg-ink2 hover:bg-[#111108]'
              }`}
            >
              <div className="text-[8px] tracking-[0.18em] uppercase text-gold h-3.5 mb-5">
                {pkg.tag}
              </div>
              <div className="font-serif text-2xl font-light text-white mb-2">{pkg.name}</div>
              <div className="font-serif text-5xl font-light text-gold2 leading-none mb-1.5">
                <sub className="text-lg text-white/30 font-sans align-super mr-1">$</sub>
                {pkg.price}
              </div>
              <p className="text-[10px] text-white/30 leading-[1.75] tracking-wide mb-8 min-h-12">
                {pkg.desc}
              </p>
              <div className="h-px bg-white/[0.06] mb-7" />
              <ul className="mb-9 space-y-0">
                {pkg.features.map((feature, j) => (
                  <li 
                    key={j} 
                    className="flex items-start gap-2.5 py-2.5 border-b border-white/[0.04] text-[10px] text-white/50 tracking-wide leading-relaxed last:border-b-0"
                  >
                    <span className="text-gold flex-shrink-0 text-[11px]">—</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={pkg.squareLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-3.5 text-[9px] tracking-[0.18em] uppercase transition-colors text-center ${
                  pkg.featured 
                    ? 'bg-gold border border-gold text-ink font-medium hover:bg-gold2' 
                    : 'bg-transparent border border-white/10 text-white/50 hover:border-gold2 hover:text-gold2'
                }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
