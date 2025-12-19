"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../ui/theme-toggle";
import { cn } from "../../lib/utils";
import { Logo } from "../ui/logo";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export function Navbar({
  logo,
  items = [],
  ctaLabel = "Começar",
  ctaHref = "#",
  className,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[#f4f4f4] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:border-[#2a2a2a] dark:bg-[#0a0a0a]/95 dark:supports-[backdrop-filter]:bg-[#0a0a0a]/80",
        className
      )}
    >
      <div className="container">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo - Esquerda */}
          <div className="flex items-center">
            {logo || <Logo width={200} height={40} />}
          </div>

          {/* Desktop Navigation - Centralizado */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 transform md:flex md:items-center md:space-x-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[#5e5e5e] transition-colors hover:text-[#007c79] dark:text-[#919191] dark:hover:text-[#1fa093]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button, Theme Toggle e Mobile Menu - Direita */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle - Desktop */}
            <div className="hidden md:flex">
              <ThemeToggle variant="icon" />
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden md:flex">
              <Button variant="primary" size="sm" asChild>
                <Link href={ctaHref}>{ctaLabel}</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#5e5e5e] transition-colors hover:text-[#007c79] dark:text-[#919191] dark:hover:text-[#1fa093]"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-[#f4f4f4] dark:border-[#2a2a2a] py-4">
            <div className="flex flex-col space-y-4">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-[#5e5e5e] transition-colors hover:text-[#007c79] dark:text-[#919191] dark:hover:text-[#1fa093]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-2">
                <ThemeToggle variant="button" />
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 ml-4"
                  asChild
                >
                  <Link href={ctaHref} onClick={() => setIsOpen(false)}>
                    {ctaLabel}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
