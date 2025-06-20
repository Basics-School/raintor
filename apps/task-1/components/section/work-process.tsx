import React from 'react'
import { ArrowDown } from "lucide-react"
import { ProcessCard } from "../process-card"

const processData = [
    {
        title: "Discovery",
        description:
            "We start every new client interaction with an in-depth discovery call where we get to know each other, discuss your current and future objectives, and recommend the best course of action.",
        isStrategy: false,
    },
    {
        title: "Strategy",
        description:
            "Every end-to-end project of ours begins with a bespoke pre-build strategy. From brand ID consultation to in-depth code reviews we're here to set the stage for success.",
        isStrategy: true,
    },
    {
        title: "Design",
        description:
            "After we have a comprehensive understanding of your brand, we'll be ready to move onto design. Each page or will be designed, reviewed, and given your stamp of approval.",
        isStrategy: false,
    },
    {
        title: "Build",
        description:
            "Whether we've just finished designing your new site or you're handing off finished designs for us to develop in Webflow, we're here to apply our trusted development process to your project.",
        isStrategy: false,
    },
]

export default function WorkProcessSection() {
    return (
        <section className="bg-foreground/95 text-background mx-7 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 rounded-3xl overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center mb-8 sm:mb-10 md:mb-12">
                    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-background flex-shrink-0 transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 hover:translate-y-0.5" />
                    </div>
                    <div className="p-4  rounded-full border border-background text-xs sm:text-sm whitespace-nowrap transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                        Work Process
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ml-0 sm:ml-16 transition-all duration-500 hover:text-gray-200">
                        My Work Process
                    </h2>
                </div>



                {/* Process Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {processData.map((process, index) => (
                        <ProcessCard
                            key={process.title}
                            title={process.title}
                            description={process.description}
                            isStrategy={process.isStrategy}
                            className={`transition-all duration-300 hover:z-10 ${index % 2 === 0 ? "lg:hover:-rotate-1" : "lg:hover:rotate-1"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
