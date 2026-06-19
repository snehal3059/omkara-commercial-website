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
} from "lucide-react"
import { products } from "@/lib/product-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
  { slug: "ms-hollow-pipes", name: "MS Hollow Pipes" },
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
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => {
              setSelectedProduct(null)
              setFormSuccess(false)
            }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Products
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column — Product Info (2/3) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Image */}
              <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted">
                <Image
                  src={getProductImage(currentProduct.category)}
                  alt={currentProduct.title}
                  width={800}
                  height={450}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Category Badge + Title */}
              <div>
                <Badge variant="secondary" className="mb-3">
                  {currentProduct.categoryName}
                </Badge>
                <h1 className="text-3xl font-bold tracking-tight">
                  {currentProduct.title}
                </h1>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed text-lg">
                {currentProduct.description}
              </p>

              {/* Specifications */}
              {currentProduct.specifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
                      {currentProduct.specifications.map((spec) => (
                        <div
                          key={spec.key}
                          className="flex items-center justify-between px-4 py-3 first:pl-0 last:pr-0 sm:first:pl-4 sm:last:pr-4"
                        >
                          <span className="text-sm text-muted-foreground font-medium">
                            {spec.key}
                          </span>
                          <span className="text-sm font-semibold text-right ml-4">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5" />
                    Inquire on WhatsApp
                  </a>
                </Button>
                {currentProduct.pdfUrl && (
                  <Button asChild variant="outline" size="lg">
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
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-xl">Request a Quote</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fill in your details and we&apos;ll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {formSuccess ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <Check className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-lg">Quote Request Sent!</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        We&apos;ll contact you shortly with pricing and availability.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setFormSuccess(false)}
                      >
                        Send Another Request
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="quote-name">Full Name *</Label>
                        <Input
                          id="quote-name"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-email">Email *</Label>
                        <Input
                          id="quote-email"
                          type="email"
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="you@company.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-phone">Phone *</Label>
                        <Input
                          id="quote-phone"
                          type="tel"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-company">Company</Label>
                        <Input
                          id="quote-company"
                          value={formCompany}
                          onChange={(e) => setFormCompany(e.target.value)}
                          placeholder="Company name (optional)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-quantity">Quantity</Label>
                        <Input
                          id="quote-quantity"
                          value={formQuantity}
                          onChange={(e) => setFormQuantity(e.target.value)}
                          placeholder="e.g. 10 MT"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="quote-message">Message</Label>
                        <Textarea
                          id="quote-message"
                          value={formMessage}
                          onChange={(e) => setFormMessage(e.target.value)}
                          placeholder="Additional requirements or notes..."
                          rows={3}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full"
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
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ─── Product Listing View ───────────────────────────────────────────
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Browse our comprehensive range of {allProductsList.length} MS steel
            products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar — Categories */}
          <aside className="lg:w-64 shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                <button
                  onClick={() => setActiveCategory("")}
                  className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    !activeCategory
                      ? "bg-primary text-primary-foreground font-medium"
                      : "hover:bg-muted"
                  }`}
                >
                  <span>All Products</span>
                  <span className="text-xs opacity-70">
                    {allProductsList.length}
                  </span>
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => setActiveCategory(cat.slug)}
                    className={`flex w-full items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      activeCategory === cat.slug
                        ? "bg-primary text-primary-foreground font-medium"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs opacity-70">
                      {categoryCounts[cat.slug] || 0}
                    </span>
                  </button>
                ))}
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground mb-4">
              {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""} found
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try a different search term or category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <button
                    key={product.slug}
                    onClick={() => setSelectedProduct(product.slug)}
                    className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg hover:border-primary/50 transition-all duration-300 text-left w-full"
                  >
                    <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                      <Image
                        src={getProductImage(product.category)}
                        alt={product.categoryName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <Badge variant="secondary" className="text-xs">
                          {product.categoryName}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
