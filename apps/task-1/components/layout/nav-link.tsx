"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@workspace/ui/lib/utils"

interface NavLinkProps {
    href: string
    children: React.ReactNode
    className?: string
    onClick?: () => void
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = pathname === href
    const [isPending, startTransition] = React.useTransition()

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        startTransition(() => {
            onClick?.()
            // Navigation will be handled by Next.js Link
        })
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                "hover:text-foreground/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                    ? "text-foreground"
                    : "text-foreground/60",
                isPending && "opacity-70",
                className
            )}
        >
            {children}
            {isActive && (
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-foreground to-transparent opacity-60" />
            )}
        </Link>
    )
}
