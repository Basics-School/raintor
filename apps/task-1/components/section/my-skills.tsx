import { ArrowDown } from 'lucide-react'
import React from 'react'
import Carousel from '../carousel'

const MySkills = () => {
    return (
        <section className='bg-foreground mx-4 sm:mx-6 lg:mx-7 space-y-8 lg:space-y-12 rounded-4xl -mt-20 px-4 sm:px-6 md:px-8 lg:px-18 text-background py-16 sm:py-20 lg:py-24 relative z-10'>
            <div className="max-w-7xl mx-auto">
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                    <span className='border border-background p-3 sm:p-4 rounded-full flex-shrink-0'>
                        <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
                    </span>
                    <h2 className='border border-background rounded-full py-2 sm:py-3 px-4 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold'>
                        Why Choose Me
                    </h2>
                </div>

                <div className='flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8'>
                    <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight lg:leading-relaxed max-w-xs sm:max-w-sm lg:max-w-lg'>
                        My Extensive List of Skills
                    </h1>
                    <div className='lg:max-w-lg'>
                        <p className='text-sm sm:text-base lg:text-right border-b pb-8 sm:pb-10 lg:pb-12 border-background/80'>
                            Building the worlds best marketing <br className="hidden sm:block" />
                            Your trusted partner for strategy, design, and dev.
                        </p>
                    </div>
                </div>

                {/* Carousel here */}
                <div className="mt-8 lg:mt-12">
                    <Carousel />
                </div>
            </div>
        </section>
    )
}

export default MySkills
