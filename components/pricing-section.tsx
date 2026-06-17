import { PricingCard } from "./pricing-card"

const pricingTiers = [
  {
    name: "Starter",
    price: 29,
    priceLabel: "one-time · 48-hr delivery",
    features: [
      "1 ATS-optimized resume",
      "Tailored to your target role",
      "Professional summary written for you",
      "Up to 2 revisions"
    ],
    href: "https://square.link/u/j7Ky4isi",
    intakeHref: "/intake?package=starter",
    variant: "outline" as const
  },
  {
    name: "Standard",
    price: 49,
    priceLabel: "one-time · 48-hr delivery",
    features: [
      "2 resume versions",
      "Custom cover letter included",
      "ATS + modern branded format",
      "Up to 3 revisions"
    ],
    href: "https://square.link/u/Jbn6uVYr",
    intakeHref: "/intake?package=standard",
    featured: true,
    badge: "Most Popular",
    variant: "gold" as const
  },
  {
    name: "Premium",
    price: 79,
    priceLabel: "one-time · 24-hr priority delivery",
    features: [
      "3 resume versions",
      "Cover letter + LinkedIn summary",
      "Role-specific version (paste job posting)",
      "Up to 3 revisions · Priority 24-hr"
    ],
    href: "https://square.link/u/UtQ7nKp3",
    intakeHref: "/intake?package=premium",
    variant: "primary" as const
  }
]

export function PricingSection() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <p className="text-center text-[11px] tracking-[0.2em] uppercase text-gold mb-2">
        Pricing
      </p>
      <h2 className="text-center font-serif text-3xl md:text-4xl text-foreground mb-2">
        Choose your package
      </h2>
      <p className="text-center text-sm text-muted-foreground font-light mb-10">
        One-time payment. No subscriptions. Delivered to your inbox.
      </p>
      
      <div className="grid md:grid-cols-3 gap-5">
        {pricingTiers.map((tier) => (
          <PricingCard key={tier.name} {...tier} />
        ))}
      </div>
    </section>
  )
}
