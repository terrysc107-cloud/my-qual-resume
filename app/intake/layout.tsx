import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Qualified Resume Co. — Get Started",
  description: "Complete your intake form to get your professional resume.",
}

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
