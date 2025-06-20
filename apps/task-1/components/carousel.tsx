'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SkillCard from './skill-card'
import { MolarIcon } from '@workspace/ui/components/icons/molar-icon'

const skills = [
    {
        id: 1,
        icon: <MolarIcon className='size-20' />,
        title: "React",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 2,
        icon: <MolarIcon className='size-20' />,
        title: "Node.js",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 3,
        icon: <MolarIcon className='size-20' />,
        title: "HTML & CSS",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 4,
        icon: <MolarIcon className='size-20' />,
        title: "Javascript",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 5,
        icon: <MolarIcon className='size-20' />,
        title: "Webflow",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 6,
        icon: <MolarIcon className='size-20' />,
        title: "TypeScript",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 7,
        icon: <MolarIcon className='size-20' />,
        title: "Next.js",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    }
]

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const getCardWidth = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 280
            if (window.innerWidth < 768) return 320
            if (window.innerWidth < 1024) return 360
            return 400
        }
        return 400
    }

    const [cardWidth, setCardWidth] = useState(getCardWidth)
    const gap = 24

    React.useEffect(() => {
        const handleResize = () => {
            setCardWidth(getCardWidth())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= skills.length ? prevIndex : prevIndex + 1
        )
    }

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? prevIndex : prevIndex - 1
        )
    }

    const translateX = -currentIndex * (cardWidth + gap)
    const isAtStart = currentIndex === 0
    const isAtEnd = currentIndex === skills.length - 1

    return (
        <div className="relative w-full">
            <div className="flex justify-end gap-3 sm:gap-4 mb-6 sm:mb-8">
                <button
                    onClick={handlePrevious}
                    disabled={isAtStart}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border transition-colors duration-200 flex items-center justify-center group ${isAtStart
                        ? 'border-background/10 cursor-not-allowed'
                        : 'border-background/30 hover:border-background/60'
                        }`}
                >
                    <ArrowLeft className={`w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-200 ${isAtStart
                        ? 'text-background/20'
                        : 'text-background group-hover:text-background/80'
                        }`} />
                </button>
                <button
                    onClick={handleNext}
                    disabled={isAtEnd}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border transition-colors duration-200 flex items-center justify-center group ${isAtEnd
                        ? 'border-background/10 cursor-not-allowed'
                        : 'border-background/30 hover:border-background/60'
                        }`}
                >
                    <ArrowRight className={`w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-200 ${isAtEnd
                        ? 'text-background/20'
                        : 'text-background group-hover:text-background/80'
                        }`} />
                </button>
            </div>

            <div className="relative">
                <div className="flex justify-center px-8 sm:px-12 lg:px-20">
                    <div className="w-full">
                        <motion.div
                            className="flex gap-4 sm:gap-6"
                            animate={{
                                x: translateX
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30
                            }}
                        >
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.id}
                                    className="flex-shrink-0"
                                    style={{
                                        width: `${cardWidth}px`,
                                        transform: index === currentIndex ? 'rotate(-2deg)' : 'scale(0.95)',
                                        zIndex: index === currentIndex ? 10 : 1,
                                        opacity: index === currentIndex ? 1 : 0.7
                                    }}
                                >
                                    <SkillCard
                                        icon={skill.icon}
                                        title={skill.title}
                                        description={skill.description}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
                {skills.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors duration-200 ${index === currentIndex
                            ? 'bg-background'
                            : 'bg-background/30 hover:bg-background/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel
