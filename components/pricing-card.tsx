import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  name: string
  price: number
  priceLabel: string
  features: string[]
  href: string
  intakeHref: string
  featured?: boolean
  badge?: string
  variant?: 'outline' | 'gold' | 'primary'
}

export function PricingCard({
  name,
  price,
  priceLabel,
  features,
  href,
  intakeHref,
  featured = false,
  badge,
  variant = 'outline'
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative bg-card border rounded-2xl p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg",
        featured ? "border-2 border-gold bg-[#fffdf7]" : "border-border"
      )}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-white text-[10px] tracking-[0.12em] uppercase px-4 py-1 rounded-full font-medium whitespace-nowrap">
          {badge}
        </span>
      )}
      
      <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground font-medium mb-3">
        {name}
      </p>
      
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-xl text-muted-foreground">$</span>
        <span className="font-serif text-5xl font-bold text-foreground leading-none">
          {price}
        </span>
      </div>
      
      <p className="text-xs text-muted-foreground font-light mb-6">
        {priceLabel}
      </p>
      
      <div className="h-px bg-border mb-5" />
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground font-light">
            <span className={cn(
              "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
              featured ? "bg-[#fdf6e3]" : "bg-[#eaf3ee]"
            )}>
              <Check 
                className={cn(
                  "w-3 h-3",
                  featured ? "text-gold" : "text-sage"
                )} 
                strokeWidth={2}
              />
            </span>
            {feature}
          </li>
        ))}
      </ul>
      
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "block w-full py-3.5 px-4 rounded-xl text-sm font-medium tracking-wide text-center transition-all duration-200 mb-3",
          variant === 'outline' && "bg-transparent text-foreground border-2 border-border hover:border-foreground hover:bg-warm",
          variant === 'gold' && "bg-gold text-white hover:bg-gold-light",
          variant === 'primary' && "bg-foreground text-background hover:bg-ink-light"
        )}
      >
        Buy Now — ${price}
      </a>
      <a
        href={intakeHref}
        className="block w-full py-2.5 px-4 text-sm font-medium text-muted-foreground hover:text-foreground text-center transition-colors"
      >
        Already paid? Start intake
      </a>
    </div>
  )
}
