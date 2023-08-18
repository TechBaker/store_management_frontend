import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

export function NavBar({ className } : React.HTMLAttributes<HTMLDivElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6 rounded-none border-b border-none px-2 lg:px-4 h-12 justify-between", className)}
    >
      <div className="text-lg font-bold tracking-tight pl-4">
        Point of Sale
      </div>
      <ModeToggle />
    </nav>
  )
}
