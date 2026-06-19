"use client"

import { useState } from "react"
import { Menu, X, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", key: "home" },
  { name: "Products", key: "products" },
  { name: "Grades", key: "grades" },
  { name: "Weight Calculator", key: "weight-calc" },
  { name: "About Us", key: "about" },
  { name: "Contact", key: "contact" },
]

interface HeaderProps {
  activePage: string
  onNavigate: (page: string) => void
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNav = (key: string) => {
    onNavigate(key)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-1.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <a href="tel:+919123857784" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" />
              <span>+91 91238 57784</span>
            </a>
            <span className="text-stone-600">|</span>
            <a href="tel:+919830031148" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone className="h-3 w-3" />
              <span>+91 98300 31148</span>
            </a>
          </div>
          <p className="text-center sm:text-left text-[11px] tracking-wide">
            Howrah, West Bengal &middot; Est. 2008 &middot; Authorized SAIL &amp; TATA Steel Distributor
          </p>
          <a
            href="https://wa.me/919123857784"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="h-3 w-3" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>

      {/* Main nav - glassmorphism */}
      <nav className="glass border-b border-stone-200/50" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <button onClick={() => handleNav("home")} className="flex items-center space-x-2.5 group" aria-label="OMKARA COMMERCIAL Home">
            <img src="/mini.svg" alt="OMKARA COMMERCIAL" className="h-9 w-auto transition-transform group-hover:scale-105" />
            <div className="hidden sm:block">
              <span className="font-extrabold text-lg tracking-tight text-stone-900">
                OMKARA
              </span>
              <span className="font-extrabold text-lg tracking-tight text-primary ml-1.5">
                COMMERCIAL
              </span>
            </div>
          </button>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.key)}
                className={cn(
                  "relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  activePage === item.key
                    ? "text-primary bg-primary/8"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                )}
              >
                {item.name}
                {activePage === item.key && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <Button
              asChild
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
            >
              <a href="https://wa.me/919123857784" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Get a Quote
              </a>
            </Button>
          </div>

          <button
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu - slide down */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-stone-200 bg-white shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.key)}
                className={cn(
                  "block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activePage === item.key
                    ? "text-primary bg-primary/8"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="border-t border-stone-100 px-4 py-4 space-y-3">
            <div className="flex items-center gap-4">
              <a href="tel:+919123857784" className="flex items-center gap-2 text-sm text-stone-600">
                <Phone className="h-4 w-4" />
                +91 91238 57784
              </a>
            </div>
            <a
              href="https://wa.me/919123857784"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground w-full px-4 py-3 rounded-lg text-sm font-semibold"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Inquiry
            </a>
          </div>
        </div>
      )}
    </header>
  )
}