"use client"

import { useState, useMemo, type FormEvent } from "react"
import Image from "next/image"
import {
  Search,
  Loader2,
  Check,
  Download,
  MessageCircle,
  X,
  ArrowUpDown,
  Eye,
  Phone,
  Ruler,
  ShieldCheck,
  Package,
} from "lucide-react"
import { products } from "@/lib/product-data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// ─── Types & Helpers ────────────────────────────────────────────

interface ProductsSectionProps {
  initialCategory?: string
}

interface ProductListItem {
  title: string
  slug: string
  category: string
  categoryName: string
  description: string
  grade: string
  primarySpec: string
  secondarySpec: string
}

type SortOption = "name-asc" | "name-desc" | "default"

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

// Extract key info from specs for inline display
function extractKeyInfo(specs: { key: string; value: string }[]) {
  const grade = specs.find(s => s.key.toLowerCase().includes("grade"))?.value || ""
  const thickness = specs.find(s => s.key.toLowerCase().includes("thickness"))?.value || ""
  const size = specs.find(s => s.key.toLowerCase().includes("size") || s.key.toLowerCase().includes("section"))?.value || ""
  const width = specs.find(s => s.key.toLowerCase().includes("width"))?.value || ""
  const length = specs.find(s => s.key.toLowerCase().includes("length"))?.value || ""

  // Primary spec: thickness or size
  const primarySpec = thickness || size
  // Secondary spec: grade or width
  const secondarySpec = grade || width || length

  return { grade, primarySpec, secondarySpec }
}

// ─── Data ──────────────────────────────────────────────────────

const categories = [
  { slug: "ms-sheet", name: "MS Sheet", icon: Package },
  { slug: "ms-plate", name: "MS Plate", icon: ShieldCheck },
  { slug: "ms-beam", name: "MS Beam", icon: Ruler },
  { slug: "ms-channel", name: "MS Channel", icon: Ruler },
  { slug: "ms-angle", name: "MS Angle", icon: Ruler },
  { slug: "ms-round", name: "MS Round", icon: Package },
  { slug: "ms-hollow-pipes", name: "Hollow Pipes", icon: Package },
]

const allProductsList: ProductListItem[] = Object.entries(products).map(
  ([slug, p]) => {
    const { grade, primarySpec, secondarySpec } = extractKeyInfo(p.specifications)
    return {
      title: p.title,
      slug,
      category: p.category,
      categoryName: p.categoryName,
      description: p.description,
      grade,
      primarySpec,
      secondarySpec,
    }
  }
)

const categoryCounts: Record<string, number> = {}
for (const p of allProductsList) {
  categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1
}

// ─── Component ─────────────────────────────────────────────────

export function ProductsSection({ initialCategory }: ProductsSectionProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState(initialCategory || "all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("default")

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
    let list = allProductsList.filter((p) => {
      const matchCategory = activeCategory === "all" || p.category === activeCategory
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.primarySpec.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })

    if (sortBy === "name-asc") list.sort((a, b) => a.title.localeCompare(b.title))
    else if (sortBy === "name-desc") list.sort((a, b) => b.title.localeCompare(a.title))

    return list
  }, [activeCategory, searchQuery, sortBy])

  const currentProduct = selectedSlug ? products[selectedSlug] : null

  async function handleInquirySubmit(e: FormEvent) {
    e.preventDefault()
    if (!currentProduct) return
    setFormSubmitting(true)
    try {
      await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          phone: formPhone,
          product_title: currentProduct.title,
          product_slug: selectedSlug,
          company: formCompany || undefined,
          quantity: formQuantity || undefined,
          message: formMessage || undefined,
        }),
      })
      setFormSuccess(true)
      setFormName("")
      setFormEmail("")
      setFormPhone("")
      setFormCompany("")
      setFormQuantity("")
      setFormMessage("")
    } catch {
      // silently handle
    } finally {
      setFormSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormSuccess(false)
  }

  const openProduct = (slug: string) => {
    setSelectedSlug(slug)
    resetForm()
  }

  const closeProduct = () => {
    setSelectedSlug(null)
    resetForm()
  }

  return (
    <section className="py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ─── Page Header ─── */}
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900">
                Product Catalogue
              </h1>
              <p className="mt-1.5 text-sm text-stone-500">
                {filteredProducts.length} of {allProductsList.length} products
                {activeCategory !== "all" && (
                  <span> in <strong className="text-stone-700">{categories.find(c => c.slug === activeCategory)?.name}</strong></span>
                )}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                <SelectTrigger className="w-[170px] h-9 text-xs border-stone-200">
                  <ArrowUpDown className="h-3.5 w-3.5 mr-1 text-stone-400" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default Order</SelectItem>
                  <SelectItem value="name-asc">Name A–Z</SelectItem>
                  <SelectItem value="name-desc">Name Z–A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* ─── Category Tabs ─── */}
        <div className="mb-5 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
            <button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeCategory === "all"
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              )}
            >
              All
              <span className="ml-1.5 text-xs opacity-60">{allProductsList.length}</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={cn(
                  "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  activeCategory === cat.slug
                    ? "bg-stone-900 text-white shadow-sm"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                )}
              >
                {cat.name}
                <span className="ml-1.5 text-xs opacity-60">{categoryCounts[cat.slug] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Search Bar ─── */}
        <div className="mb-5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <Input
              placeholder="Search by name, grade, or specification..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-stone-200 bg-white rounded-xl text-sm"
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

        {/* ─── Product List ─── */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-stone-100 flex items-center justify-center mb-3">
              <Search className="h-6 w-6 text-stone-400" />
            </div>
            <p className="text-stone-600 font-semibold">No products found</p>
            <p className="text-sm text-stone-400 mt-1">Try a different search or category.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 border-stone-300"
              onClick={() => { setSearchQuery(""); setActiveCategory("all") }}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            {/* Desktop Table Header */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-4 py-2.5 text-[11px] font-semibold text-stone-400 uppercase tracking-wider border-b border-stone-200 mb-1">
              <div className="col-span-4">Product</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-2">Primary Spec</div>
              <div className="col-span-3 text-right">Action</div>
            </div>

            <div className="space-y-1.5">
              {filteredProducts.map((product, i) => {
                const catObj = categories.find(c => c.slug === product.category)
                const CatIcon = catObj?.icon || Package

                return (
                  <div
                    key={product.slug}
                    className={cn(
                      "group rounded-xl border border-stone-200/70 bg-white hover:border-stone-300 hover:shadow-md transition-all duration-200",
                      selectedSlug === product.slug && "border-primary/30 bg-primary/[0.02] ring-1 ring-primary/20"
                    )}
                  >
                    {/* Desktop Row */}
                    <div className="hidden lg:grid lg:grid-cols-12 gap-4 items-center px-4 py-3.5">
                      {/* Product Name */}
                      <div className="col-span-4">
                        <button
                          onClick={() => openProduct(product.slug)}
                          className="text-left w-full"
                        >
                          <p className="text-sm font-semibold text-stone-900 group-hover:text-primary transition-colors truncate">
                            {product.title}
                          </p>
                          <p className="text-xs text-stone-400 mt-0.5 truncate">
                            {product.secondarySpec}
                          </p>
                        </button>
                      </div>

                      {/* Category */}
                      <div className="col-span-3">
                        <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-100 text-[11px] font-medium">
                          <CatIcon className="h-3 w-3 mr-1" />
                          {product.categoryName}
                        </Badge>
                        {product.grade && (
                          <Badge variant="outline" className="ml-1.5 text-[11px] font-medium border-primary/20 text-primary">
                            {product.grade}
                          </Badge>
                        )}
                      </div>

                      {/* Primary Spec */}
                      <div className="col-span-2">
                        {product.primarySpec && (
                          <p className="text-xs font-medium text-stone-700 bg-stone-50 rounded-md px-2.5 py-1.5 inline-block max-w-full truncate">
                            {product.primarySpec}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="col-span-3 flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-stone-500 hover:text-stone-900"
                          onClick={() => openProduct(product.slug)}
                        >
                          <Eye className="h-3.5 w-3.5 mr-1" />
                          Details
                        </Button>
                        <a
                          href={`https://wa.me/919123857784?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}. Please share pricing and availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          Quick Quote
                        </a>
                      </div>
                    </div>

                    {/* Mobile Row */}
                    <div className="lg:hidden px-4 py-3.5">
                      <div className="flex items-start justify-between gap-3">
                        <button
                          onClick={() => openProduct(product.slug)}
                          className="text-left flex-1 min-w-0"
                        >
                          <p className="text-sm font-semibold text-stone-900 truncate">
                            {product.title}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                            <Badge variant="secondary" className="bg-stone-100 text-stone-600 hover:bg-stone-100 text-[10px] font-medium px-2 py-0">
                              {product.categoryName}
                            </Badge>
                            {product.grade && (
                              <Badge variant="outline" className="text-[10px] font-medium border-primary/20 text-primary px-2 py-0">
                                {product.grade}
                              </Badge>
                            )}
                          </div>
                          {product.primarySpec && (
                            <p className="text-[11px] text-stone-500 mt-1.5 truncate">
                              {product.primarySpec}
                            </p>
                          )}
                        </button>
                        <a
                          href={`https://wa.me/919123857784?text=${encodeURIComponent(`Hi, I'm interested in ${product.title}. Please share pricing and availability.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 h-8 w-8 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 flex items-center justify-center text-[#25D366] transition-colors mt-0.5"
                          aria-label="Quick quote on WhatsApp"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Results footer */}
            <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
              <p className="text-xs text-stone-400">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-stone-400">
                Click &quot;Details&quot; for full specifications
              </p>
            </div>
          </>
        )}
      </div>

      {/* ─── Product Detail Sheet ─── */}
      <Sheet open={!!selectedSlug} onOpenChange={(open) => !open && closeProduct()}>
        <SheetContent
          side="right"
          className="w-[95vw] sm:max-w-[520px] p-0 overflow-hidden"
        >
          {currentProduct && (
            <>
              {/* Product Image */}
              <div className="relative aspect-[16/9] shrink-0">
                <Image
                  src={getProductImage(currentProduct.category)}
                  alt={currentProduct.title}
                  fill
                  className="object-cover"
                  sizes="520px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <Badge className="bg-white/90 text-stone-700 hover:bg-white/90 backdrop-blur-sm text-[11px] font-semibold mb-1.5">
                    {currentProduct.categoryName}
                  </Badge>
                  <SheetTitle className="text-lg font-bold text-white drop-shadow-sm leading-tight">
                    {currentProduct.title}
                  </SheetTitle>
                </div>
              </div>

              {/* Scrollable Content */}
              <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
                <div className="px-5 py-4 space-y-5">
                  {/* Description */}
                  <SheetDescription className="text-sm text-stone-600 leading-relaxed">
                    {currentProduct.description}
                  </SheetDescription>

                  {/* Key Specs Summary Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {currentProduct.specifications.slice(0, 4).map((spec) => (
                      <div
                        key={spec.key}
                        className="inline-flex items-center gap-1.5 bg-stone-50 border border-stone-100 rounded-lg px-2.5 py-1.5"
                      >
                        <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">
                          {spec.key}
                        </span>
                        <span className="text-[11px] font-semibold text-stone-800">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Full Specifications Table */}
                  {currentProduct.specifications.length > 0 && (
                    <div>
                      <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                        Full Specifications
                      </h3>
                      <div className="rounded-xl border border-stone-100 overflow-hidden">
                        {currentProduct.specifications.map((spec, i) => (
                          <div
                            key={spec.key}
                            className={cn(
                              "flex items-center justify-between px-3.5 py-2.5 text-sm",
                              i < currentProduct.specifications.length - 1 && "border-b border-stone-50"
                            )}
                          >
                            <span className="text-xs text-stone-500 font-medium">{spec.key}</span>
                            <span className="text-xs font-semibold text-stone-900 text-right ml-3">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Quick WhatsApp CTA */}
                  <a
                    href={`https://wa.me/919123857784?text=${encodeURIComponent(`Hi, I'm interested in ${currentProduct.title}.\n\n${currentProduct.description}\n\nPlease share pricing and availability details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white h-11 rounded-xl text-sm font-semibold shadow-lg shadow-[#25D366]/25 transition-all"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Inquire on WhatsApp
                  </a>

                  <Separator />

                  {/* Quote Form */}
                  <div>
                    <h3 className="text-sm font-bold text-stone-900 mb-1">Request a Quote</h3>
                    <p className="text-xs text-stone-400 mb-4">We&apos;ll respond within 24 hours.</p>

                    {formSuccess ? (
                      <div className="flex flex-col items-center py-6 text-center">
                        <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                          <Check className="h-6 w-6 text-emerald-600" />
                        </div>
                        <p className="text-sm font-semibold text-stone-900">Quote Sent!</p>
                        <p className="text-xs text-stone-500 mt-1">We&apos;ll contact you shortly.</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 border-stone-300"
                          onClick={resetForm}
                        >
                          Send Another
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleInquirySubmit} className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label htmlFor="q-name" className="text-xs text-stone-600">Name *</Label>
                            <Input
                              id="q-name"
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="Your name"
                              required
                              className="h-9 text-sm border-stone-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="q-phone" className="text-xs text-stone-600">Phone *</Label>
                            <Input
                              id="q-phone"
                              type="tel"
                              value={formPhone}
                              onChange={(e) => setFormPhone(e.target.value)}
                              placeholder="+91 98765 43210"
                              required
                              className="h-9 text-sm border-stone-200"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="q-email" className="text-xs text-stone-600">Email *</Label>
                          <Input
                            id="q-email"
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            className="h-9 text-sm border-stone-200"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <Label htmlFor="q-company" className="text-xs text-stone-600">Company</Label>
                            <Input
                              id="q-company"
                              value={formCompany}
                              onChange={(e) => setFormCompany(e.target.value)}
                              placeholder="Optional"
                              className="h-9 text-sm border-stone-200"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="q-qty" className="text-xs text-stone-600">Quantity</Label>
                            <Input
                              id="q-qty"
                              value={formQuantity}
                              onChange={(e) => setFormQuantity(e.target.value)}
                              placeholder="e.g. 10 MT"
                              className="h-9 text-sm border-stone-200"
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="q-msg" className="text-xs text-stone-600">Message</Label>
                          <Textarea
                            id="q-msg"
                            value={formMessage}
                            onChange={(e) => setFormMessage(e.target.value)}
                            placeholder="Additional requirements..."
                            rows={2}
                            className="text-sm border-stone-200"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground text-sm shadow-lg shadow-primary/25"
                          disabled={formSubmitting}
                        >
                          {formSubmitting ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            "Submit Inquiry"
                          )}
                        </Button>
                      </form>
                    )}
                  </div>

                  {/* Download spec sheet */}
                  {currentProduct.pdfUrl && (
                    <>
                      <Separator />
                      <a
                        href={currentProduct.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full border border-stone-200 hover:bg-stone-50 h-10 rounded-xl text-sm font-medium text-stone-600 transition-colors"
                      >
                        <Download className="h-4 w-4" />
                        Download Spec Sheet
                      </a>
                    </>
                  )}

                  {/* Bottom padding for scroll */}
                  <div className="h-4" />
                </div>
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Hide scrollbar utility for category tabs */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  )
}