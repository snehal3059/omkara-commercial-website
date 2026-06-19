"use client"

import { Phone, Mail, MapPin, MessageCircle, ChevronRight, ArrowUp } from "lucide-react"

const productCategories = [
  { name: "MS Sheet", key: "products", filter: "ms-sheet" },
  { name: "MS Plate", key: "products", filter: "ms-plate" },
  { name: "MS Beam", key: "products", filter: "ms-beam" },
  { name: "MS Channel", key: "products", filter: "ms-channel" },
  { name: "MS Angle", key: "products", filter: "ms-angle" },
  { name: "MS Round", key: "products", filter: "ms-round" },
  { name: "MS Hollow Pipes", key: "products", filter: "ms-hollow-pipes" },
]

interface FooterProps {
  onNavigate: (page: string) => void
  onProductFilter: (category: string) => void
}

export function Footer({ onNavigate, onProductFilter }: FooterProps) {
  const handleProductClick = (filter: string) => {
    onProductFilter(filter)
    onNavigate("products")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-stone-950 text-stone-300 mt-auto">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2.5 mb-5">
              <img src="/white.svg" alt="OMKARA COMMERCIAL" className="h-9 w-auto" />
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">OMKARA</span>
                <span className="font-extrabold text-lg text-primary ml-1.5 tracking-tight">COMMERCIAL</span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-stone-400 mb-6">
              Howrah-based iron and steel traders supplying high-quality MS Flat Products 
              and Long Structural Steel for construction and industrial needs since 2008.
            </p>
            <a
              href="https://wa.me/919123857784"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Products column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Our Products
            </h3>
            <ul className="space-y-3">
              {productCategories.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleProductClick(item.filter)}
                    className="text-sm text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-colors" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "About Us", key: "about" },
                { label: "All Products", key: "products" },
                { label: "Grades & Specifications", key: "grades" },
                { label: "Weight Calculator", key: "weight-calc" },
                { label: "Contact Us", key: "contact" },
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => { onNavigate(item.key); window.scrollTo({ top: 0, behavior: "smooth" }) }}
                    className="text-sm text-stone-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="h-3 w-3 text-stone-600 group-hover:text-primary transition-colors" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info column */}
          <div>
            <h3 className="text-xs font-semibold text-white uppercase tracking-[0.2em] mb-5">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                <a
                  href="https://maps.app.goo.gl/HRctjJiCb6ztU5UZ9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-stone-400 hover:text-white transition-colors"
                >
                  77/5/6, Benaras Rd, Belgachia, Salkia, Howrah, West Bengal 711101
                </a>
              </li>
              <li>
                <a href="tel:+919123857784" className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +91 91238 57784
                </a>
              </li>
              <li>
                <a href="tel:+919830031148" className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  +91 98300 31148
                </a>
              </li>
              <li>
                <a href="mailto:OMKARA_COMMLPVTLTD@HOTMAIL.COM" className="flex items-center gap-3 text-sm text-stone-400 hover:text-white transition-colors break-all">
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  OMKARA_COMMLPVTLTD@HOTMAIL.COM
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-stone-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-stone-500">
            &copy; {new Date().getFullYear()} OMKARA COMMERCIAL PVT. LTD. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-white transition-colors group"
          >
            Back to top
            <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  )
}