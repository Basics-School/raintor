"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    const [isPending, startTransition] = React.useTransition()

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        startTransition(() => {
            setTheme(theme === "dark" ? "light" : "dark")
        })
    }

    if (!mounted) {
        return (
            <Button

                size="icon"
                className="size-9"
                disabled
            >
                <div className="size-8" />
            </Button>
        )
    }

    return (
        <Button

            size="icon"
            onClick={toggleTheme}
            className={cn(
                "size-9 transition-opacity duration-200",
                isPending && "opacity-50"
            )}
            aria-label="Toggle theme"
        >
            {theme === "dark" ? (
                <SunIcon className="size-8" />
            ) : (
                <MoonIcon className="size-8" />
            )}
        </Button>
    )
}

function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
    )
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    )
}
