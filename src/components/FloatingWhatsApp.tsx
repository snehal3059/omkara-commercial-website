"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500)
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000)
    const hideTooltip = setTimeout(() => setShowTooltip(false), 8000)
    return () => {
      clearTimeout(timer)
      clearTimeout(tooltipTimer)
      clearTimeout(hideTooltip)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center bg-white rounded-xl shadow-2xl border border-stone-100 px-4 py-3 animate-fade-in-up max-w-[220px]">
          <div className="relative">
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-r border-t border-stone-100 rotate-45" />
            <p className="text-sm font-semibold text-stone-900">Need a quick quote?</p>
            <p className="text-xs text-stone-500 mt-0.5">Chat with us on WhatsApp!</p>
          </div>
          <button
            onClick={() => setShowTooltip(false)}
            className="ml-3 text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Dismiss tooltip"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919123857784?text=Hi%2C%20I%27m%20interested%20in%20your%20steel%20products.%20Please%20share%20details."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-10" />
        
        <MessageCircle className="h-7 w-7 relative z-10 transition-transform group-hover:scale-110" />
      </a>
    </div>
  )
}