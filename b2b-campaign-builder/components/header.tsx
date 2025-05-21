import Link from "next/link"
import { HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-white">
      <div className="container mx-auto py-3 px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center">
          AdGenius
        </Link>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            How It Works
          </Button>
          <Button variant="ghost" size="sm">
            Examples
          </Button>
          <Button size="sm" variant="outline" className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" />
            Help
          </Button>
        </div>
      </div>
    </header>
  )
}
