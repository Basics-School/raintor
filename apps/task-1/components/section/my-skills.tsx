import { ArrowDown } from 'lucide-react'
import React from 'react'
import Carousel from '../carousel'

const MySkills = () => {
    return (
        <section className='bg-foreground mx-7 space-y-12 rounded-4xl -mt-20 lg:px-18 px-6 md:px-8 text-background py-24 relative z-10'>
            <div className="max-w-xxl mx-auto">
            <div className='flex items-center'>
                <span className='border border-background p-4 rounded-full'>
                    <ArrowDown />
                </span>
                <h2 className='border border-background  rounded-full pt-3 text-base px-4 md:text-3xl lg:text-4xl font-bold mt-6 mb-4'>
                    Why Choose Me
                </h2>
            </div>
            <div className='flex w-full justify-between'>
                <h1 className='text-2xl md:text-4xl leading-18 lg:text-5xl font-bold max-w-lg'>
                    My Extensive List of Skills
                </h1>
                <p className='max-w-lg text-right border-b  pb-12  border-background/80 h-min'>
                    Building the worlds best marketing <br /> Your trusted partner for strategy, design, and dev.
                </p>
            </div>

            {/* Carousel here */}
                <Carousel />
            </div>
        </section>
    )
}

export default MySkills
