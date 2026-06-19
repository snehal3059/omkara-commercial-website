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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center gap-8">
          <button onClick={() => handleNav("home")} className="flex items-center space-x-2" aria-label="OMKARA COMMERCIAL Home">
            <img src="/mini.svg" alt="OMKARA COMMERCIAL" className="h-10 w-auto" />
            <span className="hidden font-bold text-xl sm:block leading-tight">
              OMKARA <span className="text-primary">COMMERCIAL</span>
            </span>
          </button>

          <div className="hidden md:flex md:gap-6">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.key)}
                className={cn(
                  "text-sm font-medium transition-colors",
                  activePage === item.key
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-4">
          <a
            href="tel:+919123857784"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>+91 91238 57784</span>
          </a>
          <a
            href="tel:+919830031148"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4 shrink-0" />
            <span>+91 98300 31148</span>
          </a>
          <a
            href="https://wa.me/919123857784"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-white py-4">
          <div className="space-y-4 px-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNav(item.key)}
                className={cn(
                  "block text-base font-medium transition-colors w-full text-left",
                  activePage === item.key
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t space-y-3">
              <a
                href="tel:+919123857784"
                className="flex items-center gap-3 text-gray-600 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>+91 91238 57784</span>
              </a>
              <a
                href="tel:+919830031148"
                className="flex items-center gap-3 text-gray-600 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Phone className="h-5 w-5" />
                <span>+91 98300 31148</span>
              </a>
              <a
                href="https://wa.me/919123857784"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}