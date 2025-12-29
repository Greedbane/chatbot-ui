"use client"

import { ReactNode } from "react"

interface LearnLayoutProps {
  children: ReactNode
}

export default function LearnLayout({ children }: LearnLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {children}
    </div>
  )
}
