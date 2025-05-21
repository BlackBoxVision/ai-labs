import type React from "react"
import { cn } from "@/lib/utils"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100 p-6", className)}>{children}</div>
}
