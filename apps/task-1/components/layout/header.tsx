"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@workspace/ui/components/button"
import { Nav } from "./nav"
import { MobileMenu } from "./mobile-menu"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@workspace/ui/lib/utils"

export default function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "top-0  mx-auto left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "fixed bg-background/80 backdrop-blur-md border-b border-border/40"
                    : "bg-transparent"
            )}
        >
            <div className="container max-w-xxl mx-auto  sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
                    >
                        <span className="text-foreground">DEVLOP.ME</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <Nav />

                    {/* Right side actions */}
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />

                        <Button
                            asChild
                            className={cn(
                                "hidden sm:inline-flex",
                                "bg-foreground text-background hover:bg-foreground/90",
                                "rounded-full px-6 py-2 h-9",
                                "font-medium text-sm",
                                "transition-all duration-200",
                                "shadow-sm hover:shadow-md"
                            )}
                        >
                            <Link href="/contact">
                                <ArrowRightIcon className="size-4 mr-2" />
                                Start Project
                            </Link>
                        </Button>

                        <MobileMenu />
                    </div>
                </div>
            </div>
        </header>
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
