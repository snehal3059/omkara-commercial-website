"use client"

import { Phone, Mail, MapPin, MessageCircle, ChevronRight } from "lucide-react"

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

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/white.svg" alt="OMKARA COMMERCIAL" className="h-10 w-auto" />
              <span className="font-bold text-xl text-white">OMKARA COMMERCIAL</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              OMKARA COMMERCIAL PVT. LTD. - Howrah-based iron and steel traders. We provide high-quality MS Flat Products and Long Structural Steel for construction and industrial needs.
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/919123857784"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Products
            </h3>
            <ul className="space-y-3">
              {productCategories.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => handleProductClick(item.filter)}
                    className="text-sm hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    <ChevronRight className="h-3 w-3" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
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
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-primary" />
                <a href="https://maps.app.goo.gl/HRctjJiCb6ztU5UZ9" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  77 / 5 / 6, Benaras Rd, Belgachia,<br />Salkia, Howrah, West Bengal 711101
                </a>
              </li>
              <li>
                <a href="tel:+919123857784" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  <span>+91 91238 57784</span>
                </a>
              </li>
              <li>
                <a href="tel:+919830031148" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  <span>+91 98300 31148</span>
                </a>
              </li>
              <li>
                <a href="mailto:OMKARA_COMMLPVTLTD@HOTMAIL.COM" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <span>OMKARA_COMMLPVTLTD@HOTMAIL.COM</span>
                </a>
              </li>
              <li>
                <a href="mailto:OMKARA.COMMLPVTLTD@GMAIL.COM" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Mail className="h-5 w-5 shrink-0 text-primary" />
                  <span>OMKARA.COMMLPVTLTD@GMAIL.COM</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} OMKARA COMMERCIAL PVT. LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}