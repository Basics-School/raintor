"use client"
import React, { useState } from 'react'
import { Send, Mail } from 'lucide-react'
import { Button } from "@workspace/ui/components/button"
import { FacebookIcon } from '@workspace/ui/components/icons/facebook-icon'
import { InstagramIcon } from '@workspace/ui/components/icons/instagram-icon'
import { TwitterIcon } from '@workspace/ui/components/icons/twitter-icon'

interface ContactFormProps {
    className?: string
    onSubmit?: (data: FormData) => void
}

interface FormData {
    name: string
    email: string
    project: string
}

const ContactForm: React.FC<ContactFormProps> = ({ className = "", onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        project: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit?.(formData)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className={`bg-black rounded-3xl p-8 lg:p-12 text-white max-w-2xl ${className}`}>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name Input */}
                <div className="space-y-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-0 border-b-2 border-gray-600 pb-3 text-white text-lg placeholder-gray-400 focus:border-white focus:outline-none transition-colors duration-300"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-0 border-b-2 border-gray-600 pb-3 text-white text-lg placeholder-gray-400 focus:border-white focus:outline-none transition-colors duration-300"
                        required
                    />
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                    <textarea
                        name="project"
                        placeholder="Describe your project"
                        value={formData.project}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full bg-transparent border-0 border-b-2 border-gray-600 pb-3 text-white text-lg placeholder-gray-400 focus:border-white focus:outline-none transition-colors duration-300 resize-none"
                        required
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 items-center">
                    <Button
                        type="submit"
                        size="lg"
                        className="w-min cursor-pointer py-4 px-0"
                    >
                        <span className='rounded-full border border-foreground p-2'>
                        <Send size={20} /></span>
                        <span className="pr-4">Send</span>
                    </Button>

                    <span className="text-gray-400 text-lg flex items-center justify-center">or</span>

                    <Button
                        type="button"
                        size="lg"
                        className="w-min cursor-pointer py-4 px-0"
                    >
                        <span className='rounded-full border border-foreground p-2'>
                        <Mail size={20} /></span>
                        <span className="pr-4">Contact me</span>
                    </Button>
                </div>
            </form>

            {/* Social Section */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-12 mt-12 border-t border-gray-700">
                {/* Username */}
                <div className="text-gray-400 text-lg mb-6 sm:mb-0">
                    @williamrey
                </div>

                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                        aria-label="Facebook"
                    >
                        <FacebookIcon className="w-8 h-8 rotate-90" />
                    </a>
                    <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                        aria-label="Instagram"
                    >
                        <InstagramIcon className="w-8 h-8 rotate-90" />
                    </a>
                    <a
                        href="#"
                        className="text-white hover:text-gray-300 transition-colors duration-300"
                        aria-label="Twitter"
                    >
                        <TwitterIcon className="w-8 h-8 rotate-90" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ContactForm
