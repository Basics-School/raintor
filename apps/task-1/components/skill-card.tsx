import React from 'react'

interface SkillCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

const SkillCard = ({ icon, title, description }: SkillCardProps) => {
    return (
        <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 w-full h-[260px] sm:h-[280px] lg:h-[300px] flex flex-col justify-between">
            <div className="flex justify-start mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center">
                    {icon}
                </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
                <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white leading-tight">
                    {title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm lg:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default SkillCard
