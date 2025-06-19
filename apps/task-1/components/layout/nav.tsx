"use client"

import * as React from "react"
import { NavLink } from "./nav-link"

const navigationItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
] as const

export function Nav() {
    return (
        <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                    {item.label}
                </NavLink>
            ))}
        </nav>
    )
}
