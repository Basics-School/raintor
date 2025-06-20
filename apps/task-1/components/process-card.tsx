import { ArrowRight } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

interface ProcessCardProps {
    title: string;
    description: string;
    className?: string;
}

export function ProcessCard({
    title,
    description,
    className,
}: ProcessCardProps) {
    return (
        <div
            className={cn(
                "relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-500 ease-out cursor-pointer group",
                "bg-black border border-white/10 text-white",
                "hover:scale-[1.02] hover:rotate-1 hover:shadow-2xl",
                "hover:bg-lime-400 hover:text-black hover:border-lime-400/50 hover:shadow-lime-400/20",
                className
            )}
        >
            <div className="flex items-start sm:items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row gap-3 sm:gap-0">
                <div
                    className={cn(
                        "px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 group-hover:scale-105",
                        "bg-cyan-400 text-black",
                        "group-hover:bg-black group-hover:text-white"
                    )}
                >
                    {title}
                </div>
                <Button
                    className={cn(
                        "p-0 h-auto font-normal text-sm sm:text-base self-start sm:self-auto transition-all duration-300 group-hover:translate-x-1",
                        "text-white hover:bg-white/10 bg-transparent border-none",
                        "group-hover:text-black group-hover:hover:bg-black/10"
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
                    "group-hover:text-black/90"
                )}
            >
                {description}
            </p>

            {/* Subtle glow effect on hover */}
            <div
                className={cn(
                    "absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none",
                    "bg-gradient-to-br from-lime-300/20 to-yellow-300/20 group-hover:opacity-100"
                )}
            />
        </div>
    );
}
