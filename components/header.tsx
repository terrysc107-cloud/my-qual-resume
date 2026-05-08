import Image from "next/image"

export function Header() {
  return (
    <header className="w-full py-4 px-6 md:px-12 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Qualified Resume Co. logo" 
            width={48} 
            height={48}
            className="w-10 h-10 md:w-12 md:h-12"
          />
          <span className="font-serif text-lg md:text-xl font-bold text-ink">
            Qualified Resume Co.
          </span>
        </div>
      </div>
    </header>
  )
}
