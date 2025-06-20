"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Nav } from "./nav";
import { MobileMenu } from "./mobile-menu";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRightIcon } from "@workspace/ui/components/icons/arrow-right-icon";

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="flex items-center ">
            <ThemeToggle />

            <Button
              asChild
              className={cn(
                "hidden sm:inline-flex",
                " text-foreground hover:bg-foreground/10",
                "rounded-full px-0",
                "font-medium text-sm",
                "transition-all duration-200",
                "shadow-sm hover:shadow-md"
              )}
            >
              <Link href="/contact">
                <span className="rounded-full p-2 border border-foreground">
                  <ArrowRightIcon className="size-4 " />
                </span>
                <span className="text-foreground pr-4">Start Project</span>
              </Link>
            </Button>

            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
