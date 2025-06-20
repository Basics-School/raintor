import React from 'react'
import { ChevronDown } from 'lucide-react'

interface NavigationButtonsProps {
    showScrollButton?: boolean
    showAboutButton?: boolean
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    showScrollButton = true,
    showAboutButton = true
}) => {
    if (!showScrollButton && !showAboutButton) return null

    return (
        <div className="flex justify-end items-center space-x-4 mb-16 lg:mb-20">
            {showScrollButton && (
                <button className="p-3 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                    <ChevronDown size={20} />
                </button>
            )}
            {showAboutButton && (
                <button className="px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-medium text-sm sm:text-base">
                    About
                </button>
            )}
        </div>
    )
}

export default NavigationButtons
