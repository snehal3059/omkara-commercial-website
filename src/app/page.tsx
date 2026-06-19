"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { HomeSection } from "@/components/sections/HomeSection"
import { ProductsSection } from "@/components/sections/ProductsSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { GradesSection } from "@/components/sections/GradesSection"
import { WeightCalculatorSection } from "@/components/sections/WeightCalculatorSection"

export default function Page() {
  const [activePage, setActivePage] = useState("home")
  const [productCategory, setProductCategory] = useState<string | undefined>(undefined)

  const handleNavigate = useCallback((page: string) => {
    setActivePage(page)
    if (page === "products") {
      // Keep current category filter when navigating to products
    }
  }, [])

  const handleProductFilter = useCallback((category: string) => {
    setProductCategory(category)
    setActivePage("products")
  }, [])

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomeSection onNavigate={handleNavigate} />
      case "products":
        return <ProductsSection initialCategory={productCategory} />
      case "about":
        return <AboutSection />
      case "contact":
        return <ContactSection />
      case "grades":
        return <GradesSection />
      case "weight-calc":
        return <WeightCalculatorSection />
      default:
        return <HomeSection onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage={activePage} onNavigate={handleNavigate} />
      <main className="flex-1">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} onProductFilter={handleProductFilter} />
    </div>
  )
}