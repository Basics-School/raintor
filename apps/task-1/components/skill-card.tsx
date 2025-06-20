import React from 'react'

interface SkillCardProps {
    icon: React.ReactNode
    title: string
    description: string
}

const SkillCard = ({ icon, title, description }: SkillCardProps) => {
    return (
        <div className="bg-gray-800/80 max-w-md backdrop-blur-sm rounded-3xl p-8 min-w-[320px] md:min-w-[400px] h-[300px] flex flex-col justify-between">
            <div className="flex justify-start mb-6">
                <div className="w-16 h-16 flex items-center justify-center">
                    {icon}
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {title}
                </h3>
                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default SkillCard
