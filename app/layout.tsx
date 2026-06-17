import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  variable: '--font-serif-var',
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
});

const dmMono = DM_Mono({ 
  subsets: ["latin"],
  variable: '--font-mono-var',
  weight: ['300', '400', '500'],
});

export const metadata: Metadata = {
  title: 'Qualified Resume Co — Land Your Next Role',
  description: 'AI-powered resumes, human-reviewed and delivered to your inbox in 48 hours. Three tailored variations, custom cover letter, and LinkedIn summary.',
  keywords: ['resume writing', 'professional resume', 'cover letter', 'ATS optimization', 'career services'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
