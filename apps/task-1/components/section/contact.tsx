import React from 'react'
import { ChevronDown } from 'lucide-react'
import ScheduleCallButton from '@/components/ui/schedule-call-button'
import ContactForm from '@/components/ui/contact-form'

interface ContactSectionProps {
    titleStart?: string
    highlightedWord?: string
    titleEnd?: string
    description?: string
    buttonText?: string
    showScrollButton?: boolean
    showContactButton?: boolean
}

// Contact Gradient Background Component
const ContactGradientBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
        <svg
            width="1440"
            height="809"
            viewBox="0 0 1440 809"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full object-cover"
            preserveAspectRatio="xMidYMid slice"
        >
            <g filter="url(#filter0_f_90_80)">
                <path
                    d="M0 741.001L1440 741.001V560.416C954.097 361.07 867.037 67.9999 339.48 68C197.399 68 86.0873 78.9897 0 98.1605V741.001Z"
                    fill="url(#paint0_radial_90_80)"
                />
            </g>
            <defs>
                <filter id="filter0_f_90_80" x="-68" y="0" width="1576" height="809.001" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="34" result="effect1_foregroundBlur_90_80" />
                </filter>
                <radialGradient id="paint0_radial_90_80" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(699.031 1171.9) rotate(-110.66) scale(1290.58 7625.52)">
                    <stop offset="0.223958" stopColor="#CCFF02" />
                    <stop offset="0.651042" stopColor="#59FFCD" stopOpacity="0" />
                    <stop offset="1" stopColor="#161616" stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
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
      rounded-full border-2 border-foreground hover:bg-foreborder-foreground hover:text-white
      transition-all duration-300 font-medium text-foreborder-foreground  backdrop-blur-sm
      ${variant === 'icon' ? 'p-3' : 'px-6 py-3'}
    `}
    >
        {children}
    </button>
)

// Highlighted Text Component for Contact
const HighlightedText = ({ children }: { children: React.ReactNode }) => (
    <span className="bg-foreground border-foreground text-background px-4 py-2 rounded-lg inline-block mx-2">
        {children}
    </span>
)

// Contact Hero Text Component
const ContactHeroText = ({
    titleStart,
    highlightedWord,
    titleEnd
}: {
    titleStart: string
    highlightedWord: string
    titleEnd: string
}) => (
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl  font-bold leading-tight mb-8 text-foreground">
        <span>{titleStart} </span>
        <br />
        <HighlightedText>{highlightedWord}</HighlightedText>
        <span> {titleEnd}</span>
    </h1>
)

const ContactSection: React.FC<ContactSectionProps> = ({
    titleStart = "Interested in",
    highlightedWord = "work",
    titleEnd = "together?",
    description = "We start every new client interaction with an in-depth discovery call where we get to know each other",
    buttonText = "Schedule a Call",
    showScrollButton = true,
    showContactButton = true
}) => {
    return (
        <section className="relative min-h-screen  overflow-hidden">
            {/* Contact Gradient Background */}
            <ContactGradientBackground />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-12 lg:py-20">
                {/* Top Navigation Buttons */}
                {(showScrollButton || showContactButton) && (
                    <div className="flex justify-start items-center  mb-12 lg:mb-20">
                        {showScrollButton && (
                            <NavButton variant="icon">
                                <ChevronDown size={20} />
                            </NavButton>
                        )}
                        {showContactButton && (
                            <NavButton variant="text">
                                Contact
                            </NavButton>
                        )}
                    </div>
                )}

                {/* Main Content */}
                <div className="flex  justify-between">
                    {/* Left Side - Hero Text */}
                    <div className="lg:max-w-2xl">
                        <ContactHeroText
                            titleStart={titleStart}
                            highlightedWord={highlightedWord}
                            titleEnd={titleEnd}
                        />

                        <p className="text-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
                            {description}
                        </p>

                        {/* Schedule Call Button */}
                        <ScheduleCallButton>
                            {buttonText}
                        </ScheduleCallButton>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="flex justify-center lg:justify-end">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection
