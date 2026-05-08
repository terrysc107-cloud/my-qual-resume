export function Ticker() {
  const items = [
    { icon: "●", text: "Marcus T.", detail: "Landed SPD Director role in 3 weeks" },
    { icon: "✓", text: "ATS Optimized", detail: "Passes 95% of applicant tracking systems" },
    { icon: "⚡", text: "Keisha R.", detail: "Got 4 callbacks in 10 days" },
    { icon: "☰", text: "3 Resume Variations", detail: "Tailored to your exact target role" },
    { icon: "●", text: "David M.", detail: "$18K salary increase with new position" },
    { icon: "✓", text: "48-Hour Delivery", detail: "Premium in 24 hours" },
  ]

  const allItems = [...items, ...items]

  return (
    <div className="bg-ink py-5 overflow-hidden border-y border-gold/10">
      <div className="flex gap-0 animate-scroll-ticker w-max">
        {allItems.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-12 border-r border-white/[0.06] whitespace-nowrap">
            <span className="text-gold2 text-xs">{item.icon}</span>
            <span className="text-[9px] tracking-[0.12em] uppercase text-white/40">
              <strong className="text-gold2 font-normal">{item.text}</strong> — {item.detail}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
