import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-full text-base font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-transparent border border-foreground dark:border-white hover:bg-foreground/10 dark:hover:bg-white/10 text-foreground dark:text-white shadow-lg",
    {
        variants: {
            size: {
                sm: "h-10 px-4 py-2 gap-2 text-sm [&_svg]:size-4",
                default: "h-12 px-6 py-3",
                lg: "h-14 px-8 py-4 gap-6 text-lg [&_svg]:size-6",
                icon: "size-12 px-0",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

function Button({
    className,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
