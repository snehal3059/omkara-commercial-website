"use client"

import { useState } from "react"
import { X } from "lucide-react"

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-teal-700 via-primary to-teal-700 text-white relative overflow-hidden">
      {/* Scrolling text */}
      <div className="flex items-center justify-center py-2 px-10">
        <div className="overflow-hidden whitespace-nowrap max-w-4xl">
          <div className="inline-block animate-[marquee_25s_linear_infinite]">
            <span className="inline-flex items-center gap-6 text-sm font-medium">
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Competitive bulk pricing available for all MS products
              </span>
              <span className="text-teal-300">•</span>
              <span>Free delivery within Howrah on orders above ₹50,000</span>
              <span className="text-teal-300">•</span>
              <span>Mill Test Certificates provided with every delivery</span>
              <span className="text-teal-300">•</span>
              <span>Same-day quotation on WhatsApp — Call or message now!</span>
              <span className="text-teal-300">•</span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                Competitive bulk pricing available for all MS products
              </span>
              <span className="text-teal-300">•</span>
              <span>Free delivery within Howrah on orders above ₹50,000</span>
              <span className="text-teal-300">•</span>
              <span>Mill Test Certificates provided with every delivery</span>
              <span className="text-teal-300">•</span>
              <span>Same-day quotation on WhatsApp — Call or message now!</span>
            </span>
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
        aria-label="Close announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  )
}