'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SkillCard from './skill-card'
import { MolarIcon } from '@workspace/ui/components/icons/molar-icon'


// Atom icon component (similar to the React-style icon in the design)


const skills = [
    {
        id: 1,
        icon: <MolarIcon className='size-20' />,
        title: "HTML & CSS",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 2,
        icon: <MolarIcon className='size-20' />,
        title: "Javascript",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 3,
        icon: <MolarIcon className='size-20' />,
        title: "Webflow",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 4,
        icon: <MolarIcon className='size-20' />,
        title: "React",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    },
    {
        id: 5,
        icon: <MolarIcon className='size-20' />,
        title: "Node.js",
        description: "Duis aute irure dolor in reprehenderit in voluptate. Ut enim ad minim veniam, quis"
    }
]

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(0)

    const slideVariants = {
        hiddenRight: {
            x: "100%",
            opacity: 0,
        },
        hiddenLeft: {
            x: "-100%",
            opacity: 0,
        },
        visible: {
            x: "0",
            opacity: 1,
            transition: {
                duration: 0.5,
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: {
                duration: 0.3
            }
        }
    }

    const handleNext = () => {
        setDirection(1)
        setCurrentIndex((prevIndex) =>
            prevIndex + 1 >= skills.length ? 0 : prevIndex + 1
        )
    }

    const handlePrevious = () => {
        setDirection(-1)
        setCurrentIndex((prevIndex) =>
            prevIndex - 1 < 0 ? skills.length - 1 : prevIndex - 1
        )
    }

    const getVisibleCards = () => {
        const cards = []
        for (let i = 0; i < 3; i++) {
            const index = (currentIndex + i) % skills.length
            cards.push(skills[index])
        }
        return cards
    }

    return (
        <div className="relative w-full  ">
            {/* Navigation buttons */}
            <div className="flex justify-end gap-4 mb-8">
                <button
                    onClick={handlePrevious}
                    className="w-12 h-12 rounded-full border border-background/30 hover:border-background/60 transition-colors duration-200 flex items-center justify-center group"
                >
                    <ArrowLeft className="w-6 h-6 text-background group-hover:text-background/80 transition-colors duration-200" />
                </button>
                <button
                    onClick={handleNext}
                    className="w-12 h-12 rounded-full border border-background/30 hover:border-background/60 transition-colors duration-200 flex items-center justify-center group"
                >
                    <ArrowRight className="w-6 h-6 text-background group-hover:text-background/80 transition-colors duration-200" />
                </button>
            </div>

            {/* Cards container */}
            <div className="relative h-[320px] overflow-x-hidden">
                <motion.div
                    className="flex gap-6 absolute inset-0"
                    key={currentIndex}
                    initial={direction > 0 ? "hiddenRight" : "hiddenLeft"}
                    animate="visible"
                    exit="exit"
                    variants={slideVariants}
                >
                    {getVisibleCards().map((skill, index) => {
                        if (!skill) return null
                        return (
                            <div
                                key={`${skill.id}-${currentIndex}-${index}`}
                                className="flex-shrink-0"
                                style={{
                                    transform: index === 1 ? 'scale(1.05)' : 'scale(0.95)',
                                    zIndex: index === 1 ? 10 : 1,
                                    opacity: index === 1 ? 1 : 0.7
                                }}
                            >
                                <SkillCard
                                    icon={skill.icon}
                                    title={skill.title}
                                    description={skill.description}
                                />
                            </div>
                        )
                    })}
                </motion.div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
                {skills.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setDirection(index > currentIndex ? 1 : -1)
                            setCurrentIndex(index)
                        }}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentIndex
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
