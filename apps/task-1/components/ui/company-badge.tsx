import React from 'react'

interface CompanyBadgeProps {
    name: string
    isHighlighted?: boolean
}

const CompanyBadge: React.FC<CompanyBadgeProps> = ({ name, isHighlighted = false }) => {
    return (
        <div
            className={`
        px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105
        ${isHighlighted
                    ? 'bg-foreground text-background shadow-lg'
                    : 'bg-background/90 backdrop-blur-sm text-foreground hover:bg-background shadow-md border border-border'
                }
      `}
        >
            {name}
        </div>
    )
}

export default CompanyBadge
