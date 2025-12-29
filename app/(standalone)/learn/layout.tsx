import { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import "../../[locale]/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Operations & Lean Learning Center",
  description: "Learn operations management and lean process principles"
}

export default function LearnLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100`}>
        {children}
      </body>
    </html>
  )
}
