"use client"

import * as React from "react"
import { Button } from "@workspace/ui/components/button"
import { NavLink } from "./nav-link"
import { cn } from "@workspace/ui/lib/utils"

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
] as const

export function MobileMenu() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isPending, startTransition] = React.useTransition()

    const toggleMenu = () => {
        startTransition(() => {
            setIsOpen(!isOpen)
        })
    }

    const closeMenu = () => {
        startTransition(() => {
            setIsOpen(false)
        })
    }

    // Close menu on escape key
    React.useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeMenu()
            }
        }

        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen])

    return (
        <div className="md:hidden relative">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleMenu}
                className={cn(
                    "size-9 transition-opacity duration-200",
                    isPending && "opacity-50"
                )}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <XIcon className="size-4" />
                ) : (
                    <MenuIcon className="size-4" />
                )}
            </Button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
                        onClick={closeMenu}
                    />

                    {/* Menu */}
                    <div className="absolute top-full right-0 w-64 bg-background border border-border rounded-lg shadow-lg z-50 mt-2 animate-in slide-in-from-top-2 duration-200">
                        <nav className="p-4">
                            <div className="flex flex-col space-y-2">
                                {navigationItems.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        href={item.href}
                                        className="block w-full text-left px-3 py-2 rounded-md hover:bg-accent"
                                        onClick={closeMenu}
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                                <div className="border-t border-border pt-2 mt-2">
                                    <Button
                                        asChild
                                        className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-full"
                                        onClick={closeMenu}
                                    >
                                        <a href="/contact">
                                            <ArrowRightIcon className="size-4 mr-2" />
                                            Start Project
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </div>
    )
}

function MenuIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
    )
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="M18 6 6 18M6 6l12 12" />
        </svg>
    )
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    )
}
