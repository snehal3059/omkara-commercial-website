"use client"

import { useState, useMemo, type FormEvent } from "react"
import Image from "next/image"
import {
  ArrowRight,
  ArrowLeft,
  Search,
  Loader2,
  Check,
  Download,
  MessageCircle,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { products } from "@/lib/product-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductsSectionProps {
  initialCategory?: string
}

interface ProductListItem {
  title: string
  slug: string
  category: string
  categoryName: string
  description: string
}

function getProductImage(category: string): string {
  const catMap: Record<string, string> = {
    "ms-sheet": "/ms-sheet.jpg",
    "ms-plate": "/ms-plate.jpg",
    "ms-beam": "/ms-beam.jpg",
    "ms-channel": "/ms-channel.jpg",
    "ms-angle": "/ms-angle.jpg",
    "ms-round": "/ms-round.jpg",
    "ms-hollow-pipes": "/ms-pipes.jpg",
  }
  return catMap[category] || "/ms-sheet.jpg"
}

const categories = [
  { slug: "ms-sheet", name: "MS Sheet" },
  { slug: "ms-plate", name: "MS Plate" },
  { slug: "ms-beam", name: "MS Beam" },
  { slug: "ms-channel", name: "MS Channel" },
  { slug: "ms-angle", name: "MS Angle" },
  { slug: "ms-round", name: "MS Round" },
  { slug: "ms-hollow-pipes", name: "Hollow Pipes" },
]

const allProductsList: ProductListItem[] = Object.entries(products).map(
  ([slug, p]) => ({
    title: p.title,
    slug,
    category: p.category,
    categoryName: p.categoryName,
    description: p.description,
  })
)

const categoryCounts: Record<string, number> = {}
for (const p of allProductsList) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
}

export function ProductsSection({ initialCategory }: ProductsSectionProps) {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(initialCategory || "")
  const [searchQuery, setSearchQuery] = useState("")

  // Form state
  const [formName, setFormName] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formPhone, setFormPhone] = useState("")
  const [formCompany, setFormCompany] = useState("")
  const [formQuantity, setFormQuantity] = useState("")
  const [formMessage, setFormMessage] = useState("")
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  const filteredProducts = useMemo(() => {
    return allProductsList.filter((p) => {
      const matchCategory = !activeCategory || p.category === activeCategory
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [activeCategory, searchQuery])

  const currentProduct = selectedProduct ? products[selectedProduct] : null

  async function handleInquirySubmit(e: FormEvent) {
    e.preventDefault()
    if (!currentProduct) return
    setFormSubmitting(true)

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          product_title: currentProduct.title,
          product_slug: selectedProduct,
          company: formCompany || undefined,
          quantity: formQuantity || undefined,
          message: formMessage || undefined,
        }),
      })

      if (res.ok) {
        setFormSuccess(true)
        setFormName("")
        setFormEmail("")
        setFormPhone("")
        setFormCompany("")
        setFormQuantity("")
        setFormMessage("")
      }
    } catch {
      // silently handle
    } finally {
      setFormSubmitting(false)
    }
  }

  // ─── Product Detail View ────────────────────────────────────────────
  if (selectedProduct && currentProduct) {
    const whatsappText = encodeURIComponent(
      `Hi, I'm interested in ${currentProduct.title}.\n\n${currentProduct.description}\n\nPlease share pricing and availability details.`
    )
    const whatsappUrl = `https://wa.me/919123857784?text=${whatsappText}`

    return (
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedProduct(null)
              setFormSuccess(false)
            }}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column — Product Info (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100">
                <Image
                  src={getProductImage(currentProduct.category)}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-stone-800 hover:bg-white/90 backdrop-blur-sm text-xs font-semibold">
                    {currentProduct.categoryName}
                  </Badge>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                  {currentProduct.title}
                </h1>
              </div>

              {/* Description */}
              <p className="text-stone-600 leading-relaxed text-base sm:text-lg">
                {currentProduct.description}
              </p>

              {/* Specifications */}
              {currentProduct.specifications.length > 0 && (
                <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden">
                  <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50">
                    <h2 className="text-lg font-bold text-stone-900">Specifications</h2>
                  </div>
                  <div className="divide-y divide-stone-100">
                    {currentProduct.specifications.map((spec) => (
                      <div
                        key={spec.key}
                        className="flex items-center justify-between px-6 py-3.5"
                      >
                        <span className="text-sm text-stone-500 font-medium">
                          {spec.key}
                        </span>
                        <span className="text-sm font-semibold text-stone-900 text-right ml-4">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Inquire on WhatsApp
                  </a>
                </Button>
                {currentProduct.pdfUrl && (
                  <Button asChild variant="outline" size="lg" className="border-stone-300">
                    <a
                      href={currentProduct.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-5 w-5" />
                      Download Spec Sheet
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Right Column — Quote Form (1/3) */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-stone-200 bg-white p-6 sticky top-28 shadow-sm">
                <h2 className="text-xl font-bold text-stone-900">Request a Quote</h2>
                <p className="text-sm text-stone-500 mt-1 mb-6">
                  We&apos;ll get back to you within 24 hours.
                </p>
                {formSuccess ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="h-14 w-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                      <Check className="h-7 w-7 text-emerald-600" />
                    </div>
                    <h3 className="font-bold text-lg text-stone-900">Quote Sent!</h3>
                    <p className="text-sm text-stone-500 mt-1">
                      We&apos;ll contact you shortly with pricing and availability.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-stone-300"
                      onClick={() => setFormSuccess(false)}
                    >
                      Send Another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quote-name" className="text-stone-700">Full Name *</Label>
                      <Input
                        id="quote-name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-email" className="text-stone-700">Email *</Label>
                      <Input
                        id="quote-email"
                        type="email"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-phone" className="text-stone-700">Phone *</Label>
                      <Input
                        id="quote-phone"
                        type="tel"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        required
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-company" className="text-stone-700">Company</Label>
                      <Input
                        id="quote-company"
                        value={formCompany}
                        onChange={(e) => setFormCompany(e.target.value)}
                        placeholder="Company name (optional)"
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-quantity" className="text-stone-700">Quantity</Label>
                      <Input
                        id="quote-quantity"
                        value={formQuantity}
                        onChange={(e) => setFormQuantity(e.target.value)}
                        placeholder="e.g. 10 MT"
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quote-message" className="text-stone-700">Message</Label>
                      <Textarea
                        id="quote-message"
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Additional requirements..."
                        rows={3}
                        className="border-stone-200"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      disabled={formSubmitting}
                    >
                      {formSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Inquiry"
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── Product Listing View ───────────────────────────────────────────
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Our Products
          </h1>
          <p className="mt-3 text-lg text-stone-500">
            Browse our comprehensive range of {allProductsList.length} MS steel products
          </p>
        </div>

        {/* Search + Filter Bar */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <Input
                placeholder="Search products by name, category, or specification..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 border-stone-200 bg-white rounded-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category filter chips */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="h-4 w-4 text-stone-400 shrink-0" />
            <button
              onClick={() => setActiveCategory("")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                !activeCategory
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              )}
            >
              All Products
              <span className="ml-1.5 text-xs opacity-70">({allProductsList.length})</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  activeCategory === cat.slug
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                )}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-70">({categoryCounts[cat.slug] || 0})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-stone-400 mb-6">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          {activeCategory && <span> in <strong className="text-stone-600">{categories.find(c => c.slug === activeCategory)?.name}</strong></span>}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-stone-100 flex items-center justify-center mb-4">
              <Search className="h-7 w-7 text-stone-400" />
            </div>
            <p className="text-stone-600 text-lg font-semibold">No products found</p>
            <p className="text-sm text-stone-400 mt-1">
              Try a different search term or category filter.
            </p>
            <Button
              variant="outline"
              className="mt-4 border-stone-300"
              onClick={() => { setSearchQuery(""); setActiveCategory("") }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <button
                key={product.slug}
                onClick={() => setSelectedProduct(product.slug)}
                className="group card-modern rounded-2xl border border-stone-200 bg-white overflow-hidden text-left"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={getProductImage(product.category)}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-stone-700 hover:bg-white/90 backdrop-blur-sm text-[11px] font-semibold">
                      {product.categoryName}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-stone-700" />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-stone-900 group-hover:text-primary transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-stone-500 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}