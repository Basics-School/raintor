import { ArrowRight } from "lucide-react"
import { Button } from "@repo/ui/components/button"
import { cn } from "@/lib/utils"

interface ProcessCardProps {
  title: string
  description: string
  isStrategy?: boolean
  className?: string
}

export function ProcessCard({ title, description, isStrategy = false, className }: ProcessCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 ease-out cursor-pointer group",
        "bg-black border border-white/10 text-white",
        "hover:scale-[1.02] hover:rotate-1 hover:shadow-2xl",
        // Strategy card gets special lime hover effect
        isStrategy
          ? "hover:bg-lime-400 hover:text-black hover:border-lime-400/50 hover:shadow-lime-400/20"
          : "hover:bg-gray-900 hover:border-white/30 hover:shadow-cyan-400/10",
        className,
      )}
    >
      <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row gap-3 sm:gap-0">
        <div
          className={cn(
            "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group-hover:scale-105",
            "bg-cyan-400 text-black",
            // Strategy card badge changes on hover
            isStrategy
              ? "group-hover:bg-black group-hover:text-white"
              : "group-hover:bg-cyan-200 group-hover:text-black",
          )}
        >
          {title}
        </div>
        <Button
          variant="ghost"
          className={cn(
            "p-0 h-auto font-normal text-sm sm:text-base self-start sm:self-auto transition-all duration-300 group-hover:translate-x-1",
            "text-white hover:bg-white/10",
            // Strategy card button changes on hover
            isStrategy
              ? "group-hover:text-black group-hover:hover:bg-black/10"
              : "group-hover:text-white group-hover:hover:bg-white/10",
          )}
        >
          <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 transition-transform duration-300 group-hover:rotate-12" />
          Read More
        </Button>
      </div>
      <p
        className={cn(
          "text-base sm:text-lg leading-relaxed transition-all duration-300 group-hover:translate-y-[-2px]",
          "text-gray-300",
          // Strategy card text changes on hover
          isStrategy ? "group-hover:text-black/90" : "group-hover:text-white",
        )}
      >
        {description}
      </p>

      {/* Subtle glow effect on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none",
          isStrategy
            ? "bg-gradient-to-br from-lime-300/20 to-yellow-300/20 group-hover:opacity-100"
            : "bg-gradient-to-br from-cyan-400/10 to-blue-400/10 group-hover:opacity-100",
        )}
      />
    </div>
  )
}
