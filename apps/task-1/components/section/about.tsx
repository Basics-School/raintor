import React from 'react'
import { ArrowDown, ChevronDown } from 'lucide-react'

interface AboutSectionProps {
    mainText?: string
    highlightedWord?: string
    secondaryText?: string
    highlightedYear?: string
    description?: string
    previouslyWorkedText?: string
    companies?: string[]
    showScrollButton?: boolean
    showAboutButton?: boolean
}

// Gradient Background Component
const GradientBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 1440 809"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
        >
            <g filter="url(#filter0_f_90_221)">
                <path
                    d="M1440 68.0001L0 68.0006V248.585C485.903 447.932 572.963 741.002 1100.52 741.001C1242.6 741.001 1353.91 730.012 1440 710.841V68.0001Z"
                    fill="url(#paint0_radial_90_221)"
                />
            </g>
            <defs>
                <filter id="filter0_f_90_221" x="-68" y="0" width="1576" height="809.001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="34" result="effect1_foregroundBlur_90_221" />
                </filter>
                <radialGradient id="paint0_radial_90_221" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(740.969 -362.899) rotate(69.3397) scale(1290.58 7625.52)">
                    <stop offset="0.223958" stopColor="#CCFF02" />
                    <stop offset="0.651042" stopColor="#59FFCD" stopOpacity="0" />
                    <stop offset="1" stopColor="#161616" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    </div>
)

// Company Badge Component
const CompanyBadge = ({ name, variant = 'light', className = "", children }: {
    name?: string;
    variant?: 'light' | 'dark';
    className?: string;
    children?: React.ReactNode;
}) => (
    <div
        className={`
            px-6 py-4 rounded-full text-base font-medium transition-all duration-300 hover:scale-105
            relative shadow-lg backdrop-blur-sm
            ${variant === 'dark'
                ? 'bg-gray-900/95 text-white border border-gray-700'
                : 'bg-white/95 text-gray-900 border border-gray-200'
            }
            ${className}
        `}
    >
        {children || name}
    </div>
)

// Navigation Button Component
const NavButton = ({ children, variant = 'icon', onClick }: {
    children: React.ReactNode
    variant?: 'icon' | 'text'
    onClick?: () => void
}) => (
    <button
        onClick={onClick}
        className={`
            rounded-full border-2 border-foreground hover:bg-background text-foreground
            transition-all duration-300 font-medium bg-transparent backdrop-blur-sm
            ${variant === 'icon' ? 'p-3' : 'px-6 py-3'}
        `}
    >
        {children}
    </button>
)

// Highlighted Text Component
const HighlightedText = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-foreground text-background px-3 sm:px-4 py-2 rounded-lg inline-block">
        {children}
    </span>
)

// Hero Text Component
const HeroText = ({
    mainText,
    highlightedWord,
    secondaryText,
    highlightedYear
}: {
    mainText: string
    highlightedWord: string
    secondaryText: string
    highlightedYear: string
}) => (
    <h1 className="text-4xl sm:text-5xl md:text-7xl  font-bold text-right leading-24 mb-8">
        <span className="text-foreground">{mainText} </span>
        <HighlightedText>{highlightedWord}</HighlightedText>
        <br />
        <span className="text-foreground">{secondaryText} </span>
        <HighlightedText>{highlightedYear}</HighlightedText>
    </h1>
)

// Companies Section Component
const CompaniesSection = ({
    previouslyWorkedText,
    companies
}: {
    previouslyWorkedText: string
    companies: string[]
}) => (
    <div className="max-w-5xl mx-auto">
        <h3 className="text-foreground font-bold text-xl tracking-wider mb-12 text-left">
            {previouslyWorkedText}
        </h3>

        {/* Organic curved layout inspired by the image */}
        <div className="relative min-h-[350px] w-full">
            {/* Top row - left aligned */}
            <div className="absolute top-0 left-0 lg:left-16 flex gap-6 z-10">
                <CompanyBadge name="awwwards." variant="dark" />
                <CompanyBadge name="facebook" variant="light" />
            </div>

            {/* Middle row - center-right positioned */}
            <div className="absolute top-20 left-1/3 lg:left-1/2 transform -translate-x-1/4 lg:-translate-x-1/2 flex gap-6 z-20">
                <CompanyBadge name="/thoughtworks" variant="light" />
                <CompanyBadge variant="light" className="flex items-center gap-1">
                    <span className="text-xl font-bold">S</span>
                    <span>CSSDesign</span><span className="font-bold">Awards</span>
                </CompanyBadge>
            </div>

            {/* Bottom row - right aligned with offset */}
            <div className="absolute top-40 right-0 lg:right-16 flex gap-6 z-10">
                <CompanyBadge name="CSS WINNER" variant="light" />
                <CompanyBadge name="AUTODESK" variant="light" className="font-bold tracking-wide" />
            </div>
        </div>
    </div>
)

const AboutSection: React.FC<AboutSectionProps> = ({
    mainText = "I've been",
    highlightedWord = "Developing",
    secondaryText = "Websites since",
    highlightedYear = "2013",
    description = "We start every new client interaction with an in-depth discovery call where we get to know each other and recommend the best course of action.",
    previouslyWorkedText = "PREVIOUSLY WORKED ON",
    companies = ["awwwards.", "CSS WINNER", "/thoughtworks", "facebook", "CSS Design Awards", "AUTODESK"],
    showScrollButton = true,
    showAboutButton = true
}) => {
    return (
        <section className="relative min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 overflow-hidden">
            {/* Gradient Background */}
            <GradientBackground />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-xxl px-6 lg:px-18 py-20">
                {/* Top Navigation Buttons */}
                {(showScrollButton || showAboutButton) && (
                    <div className="flex justify-end items-center  mb-20">
                        {showScrollButton && (
                            <NavButton variant="icon">
                                <ArrowDown size={20} />
                            </NavButton>
                        )}
                        {showAboutButton && (
                            <NavButton variant="text">
                                About
                            </NavButton>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <div className="max-w-6xl mx-auto">
                    {/* Hero Text */}
                    <div className="text-center mb-16 lg:mb-24">
                        <HeroText
                            mainText={mainText}
                            highlightedWord={highlightedWord}
                            secondaryText={secondaryText}
                            highlightedYear={highlightedYear}
                        />

                        <p className="text-foreground text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>

                    {/* Companies Section */}
                    <CompaniesSection
                        previouslyWorkedText={previouslyWorkedText}
                        companies={companies}
                    />
                </div>
            </div>
        </section>
    )
}

export default AboutSection
