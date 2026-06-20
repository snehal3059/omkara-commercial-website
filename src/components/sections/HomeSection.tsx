'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import {
  BadgeCheck,
  Clock,
  ShieldCheck,
  HeadphonesIcon,
  Star,
  ArrowRight,
  FileText,
  Calculator,
  BookOpen,
  MessageCircle,
  Zap,
  TrendingUp,
  Truck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import SteelRatesSection from './SteelRatesSection'
import { GallerySection } from './GallerySection'

interface HomeSectionProps {
  onNavigate: (page: string) => void
}

const manufacturers = [
  { name: 'SAIL', logo: '/logo-sail.png' },
  { name: 'TATA Steel', logo: '/logo-tata-steel.png' },
  { name: 'GAGAN GOLD', logo: '/logo-gagan-gold.png' },
  { name: 'SHYAM METALLICS', logo: '/logo-shyam-metallics.png' },
  { name: 'ELEGANT', logo: '/logo-elegant.png' },
]

const productCategories = [
  { name: 'MS Sheet', image: '/ms-sheet.jpg', description: 'Cold rolled & hot rolled sheets in various thicknesses', slug: 'ms-sheet' },
  { name: 'MS Plate', image: '/ms-plate.jpg', description: 'Heavy-duty mild steel plates for structural use', slug: 'ms-plate' },
  { name: 'MS Beam', image: '/ms-beam.jpg', description: 'I-beams and H-beams for construction frameworks', slug: 'ms-beam' },
  { name: 'MS Channel', image: '/ms-channel.jpg', description: 'C-channel and U-channel for support structures', slug: 'ms-channel' },
  { name: 'MS Angle', image: '/ms-angle.jpg', description: 'L-shaped angles for fabrication and construction', slug: 'ms-angle' },
  { name: 'MS Round', image: '/ms-round.jpg', description: 'Round bars and rods for diverse applications', slug: 'ms-round' },
  { name: 'MS Hollow Pipes', image: '/ms-pipes.jpg', description: 'Square, rectangular, and round hollow sections', slug: 'ms-hollow-pipes' },
]

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: 'Certified Quality',
    description: 'Mill test certificates with every delivery. Products sourced directly from SAIL, TATA Steel and other premium manufacturers.',
    gradient: 'from-teal-500 to-emerald-600',
  },
  {
    icon: Clock,
    title: '48-Hour Dispatch',
    description: 'Well-stocked Howrah warehouse ensures rapid processing and dispatch to keep your projects running on schedule.',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'Transparent wholesale rates with bulk order discounts. No hidden costs, just honest steel trading since 2008.',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Guidance',
    description: 'Dedicated steel specialists help you select the right grade, size, and quantity for every project requirement.',
    gradient: 'from-rose-500 to-pink-600',
  },
]

interface TestimonialItem {
  id: number
  name: string
  role: string | null
  company: string | null
  location: string | null
  text: string
  rating: number
  sortOrder: number
}

export function HomeSection({ onNavigate }: HomeSectionProps) {
  // Testimonials data
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [testimonialsLoading, setTestimonialsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch('/api/testimonials')
        if (!res.ok) throw new Error('Failed to fetch testimonials')
        const data = await res.json()
        if (!cancelled) {
          setTestimonials(data.testimonials ?? [])
          setTestimonialsLoading(false)
        }
      } catch {
        if (!cancelled) {
          setTestimonials([])
          setTestimonialsLoading(false)
        }
      }
    })()
    return () => { cancelled = true }
  }, [])

  // Carousel state
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToIndex = useCallback((index: number) => {
    setActiveIndex(index % Math.max(testimonials.length, 1))
  }, [testimonials.length])

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % Math.max(testimonials.length, 1))
  }, [testimonials.length])

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + Math.max(testimonials.length, 1)) % Math.max(testimonials.length, 1))
  }, [testimonials.length])

  // Auto-rotation
  useEffect(() => {
    if (isPaused || testimonials.length === 0) {
      if (intervalRef.current) clearInterval(intervalRef.current)
      return
    }
    intervalRef.current = setInterval(goNext, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPaused, goNext, testimonials.length])

  return (
    <div className="w-full">
      {/* ─── 1. Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-stone-950">
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-teal-600/20 blur-[120px] animate-pulse-glow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-amber-600/15 blur-[100px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-teal-500/5 blur-[150px]" />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="space-y-8">
              <div className="animate-fade-in-up opacity-0 inline-flex items-center rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-1.5 text-sm text-teal-300 backdrop-blur-sm">
                <span className="mr-2 inline-block h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                Trusted by 1000+ businesses across Eastern India
              </div>

              <h1 className="animate-fade-in-up opacity-0 animation-delay-100 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Premium{' '}
                <span className="text-gradient">Iron &amp; Steel</span>
                {' '}Trading
              </h1>

              <p className="animate-fade-in-up opacity-0 animation-delay-200 max-w-xl text-lg leading-relaxed text-stone-400">
                Supplying certified mild steel products from India&apos;s leading manufacturers. 
                From sheets to structural steel — reliability, quality, and competitive pricing 
                delivered to your doorstep.
              </p>

              <div className="animate-fade-in-up opacity-0 animation-delay-300 flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
                  onClick={() => onNavigate('products')}
                >
                  Explore Products
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-stone-600 bg-transparent px-8 text-base font-semibold text-stone-200 hover:bg-stone-800 hover:text-white hover:border-stone-500 transition-all"
                  onClick={() => onNavigate('contact')}
                >
                  Request a Quote
                </Button>
              </div>

              {/* Quick stats row */}
              <div className="animate-fade-in-up opacity-0 animation-delay-400 flex items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold text-white">15+</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Years</p>
                </div>
                <div className="w-px h-10 bg-stone-800" />
                <div>
                  <p className="text-2xl font-bold text-white">500+</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Products</p>
                </div>
                <div className="w-px h-10 bg-stone-800" />
                <div>
                  <p className="text-2xl font-bold text-white">1000+</p>
                  <p className="text-xs text-stone-500 uppercase tracking-wider">Clients</p>
                </div>
              </div>
            </div>

            {/* Right - Feature cards grid */}
            <div className="hidden lg:grid grid-cols-2 gap-4 animate-fade-in-up opacity-0 animation-delay-300">
              <div className="space-y-4">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/20 flex items-center justify-center mb-4">
                    <Truck className="h-5 w-5 text-teal-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Fast Delivery</h3>
                  <p className="text-sm text-stone-400">Dispatch within 48 hours from our Howrah warehouse</p>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center mb-4">
                    <ShieldCheck className="h-5 w-5 text-amber-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Quality Assured</h3>
                  <p className="text-sm text-stone-400">Mill test certificates with every single delivery</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/20 flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-rose-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Best Pricing</h3>
                  <p className="text-sm text-stone-400">Competitive wholesale rates with transparent pricing</p>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 hover:bg-white/10 transition-colors">
                  <div className="h-10 w-10 rounded-xl bg-violet-500/20 flex items-center justify-center mb-4">
                    <HeadphonesIcon className="h-5 w-5 text-violet-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">Expert Support</h3>
                  <p className="text-sm text-stone-400">Steel specialists to guide your purchase decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ─── 2. Manufacturer Logos ─── */}
      <section className="bg-background py-14 sm:py-20 border-b border-stone-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {manufacturers.map((mfr) => (
              <div
                key={mfr.name}
                className="flex items-center justify-center h-16 sm:h-20 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300"
              >
                <Image
                  src={mfr.logo}
                  alt={mfr.name}
                  width={160}
                  height={64}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 2b. Today's Steel Rates ─── */}
      <SteelRatesSection />

      {/* ─── 3. Product Categories with Images ─── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Products
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Product Categories
            </h2>
            <p className="mt-4 max-w-2xl text-stone-500 text-lg">
              Browse our comprehensive range of mild steel products, sourced from certified manufacturers and available for immediate dispatch.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productCategories.map((cat, i) => (
              <button
                key={cat.name}
                className="group card-modern rounded-2xl border border-stone-200 bg-white overflow-hidden text-left"
                onClick={() => onNavigate('products')}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center rounded-lg bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-stone-800">
                      View All
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-stone-900 group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm text-stone-500 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. About / Introduction ─── */}
      <section className="bg-stone-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                About Us
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900 leading-tight">
                Eastern India&apos;s Trusted{' '}
                <span className="text-gradient">Steel Partner</span>{' '}
                Since 2008
              </h2>
              <p className="text-stone-600 leading-relaxed">
                Founded by <strong className="text-stone-900">Shri Somnath Gupta</strong>, Omkara Commercial Pvt. Ltd. 
                has grown into one of Howrah&apos;s most dependable iron and steel suppliers. We specialise in 
                Flat Products and Long Structural Products, sourced exclusively from India&apos;s premier steel mills.
              </p>
              <p className="text-stone-600 leading-relaxed">
                Whether you are a large construction company, a fabrication shop, or an individual buyer, 
                we cater to all scales of requirement with the same dedication and professionalism.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => onNavigate('about')}
              >
                Learn More About Us
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            {/* Right - Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-stone-100 p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-primary">15+</p>
                <p className="mt-1 text-sm text-stone-500">Years Experience</p>
              </div>
              <div className="rounded-2xl bg-white border border-stone-100 p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-primary">500+</p>
                <p className="mt-1 text-sm text-stone-500">Products</p>
              </div>
              <div className="rounded-2xl bg-white border border-stone-100 p-6 shadow-sm">
                <p className="text-4xl font-extrabold text-primary">1000+</p>
                <p className="mt-1 text-sm text-stone-500">Happy Clients</p>
              </div>
              <div className="rounded-2xl bg-stone-900 p-6 text-white shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white">Our Legacy</p>
                <p className="mt-1 text-xs text-stone-400">
                  Under 2nd Generation Leadership — continuing a family tradition of excellence
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. Why Choose Us ─── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Our Strengths
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Why Choose Omkara
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-lg">
              With over 15 years of industry experience, we offer unparalleled service and reliability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((feature) => (
              <div
                key={feature.title}
                className="card-modern rounded-2xl border border-stone-200 bg-white p-6 relative overflow-hidden"
              >
                {/* Gradient top bar */}
                <div className={cn('absolute top-0 left-0 right-0 h-1 bg-gradient-to-r', feature.gradient)} />
                <div className="h-12 w-12 rounded-xl bg-stone-100 flex items-center justify-center mb-5">
                  <feature.icon className="h-6 w-6 text-stone-700" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-stone-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5.5 Gallery ─── */}
      <GallerySection />

      {/* ─── 6. Testimonials ─── */}
      <section className="bg-stone-950 py-16 sm:py-24 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
              Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-400 text-lg">
              Trusted by hundreds of businesses across Eastern India
            </p>
          </div>

          {/* Carousel container */}
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left arrow — hidden on mobile */}
            <button
              onClick={goPrev}
              className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" />
            </button>

            {/* Right arrow — hidden on mobile */}
            <button
              onClick={goNext}
              className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-stone-300 backdrop-blur-sm hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Testimonial card with crossfade */}
            <div className="mx-auto max-w-[600px]">
              {testimonialsLoading ? (
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8">
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="h-5 w-5 rounded bg-white/10 animate-pulse" />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-4/5 rounded bg-white/10 animate-pulse" />
                    <div className="h-4 w-3/5 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-white/10 animate-pulse" />
                    <div className="space-y-2">
                      <div className="h-3 w-28 rounded bg-white/10 animate-pulse" />
                      <div className="h-3 w-40 rounded bg-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : testimonials.length === 0 ? null : (
              <>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={cn(
                    'rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-all duration-700',
                    index === activeIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'
                  )}
                  style={{
                    position: index === activeIndex ? 'relative' : 'absolute',
                  }}
                >
                  {/* Star rating */}
                  <div className="mb-5 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'size-5',
                          i < testimonial.rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-stone-700 text-stone-700'
                        )}
                      />
                    ))}
                  </div>

                  <p className="text-base leading-relaxed text-stone-300">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 text-sm font-bold text-white">
                      {testimonial.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                      <p className="text-xs text-stone-400">
                        {testimonial.role}, {testimonial.company}
                      </p>
                      <p className="text-xs text-stone-500">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              ))}
              </>
              )}
            </div>

            {/* Dot indicators */}
            {!testimonialsLoading && testimonials.length > 0 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === activeIndex
                      ? 'w-6 bg-teal-400'
                      : 'w-2 bg-stone-600 hover:bg-stone-500'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── 7. Technical Resources ─── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Resources
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Technical Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-lg">
              Access steel grades, calculate weights, and download our complete product catalogue.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              className="card-modern group cursor-pointer rounded-2xl border border-stone-200 bg-white p-6"
              onClick={() => onNavigate('grades')}
            >
              <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors">
                <BookOpen className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Grades &amp; Specifications</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                Detailed information about steel grades, chemical compositions, and mechanical properties.
              </p>
              <p className="mt-4 flex items-center text-sm font-semibold text-primary">
                View Grades
                <ArrowRight className="ml-1 size-3.5" />
              </p>
            </div>

            <div
              className="card-modern group cursor-pointer rounded-2xl border border-stone-200 bg-white p-6"
              onClick={() => onNavigate('weight-calc')}
            >
              <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center mb-5 group-hover:bg-amber-100 transition-colors">
                <Calculator className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Weight Calculator</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                Calculate the weight of steel products based on dimensions, thickness, and grade.
              </p>
              <p className="mt-4 flex items-center text-sm font-semibold text-primary">
                Open Calculator
                <ArrowRight className="ml-1 size-3.5" />
              </p>
            </div>

            <div className="card-modern group rounded-2xl border border-stone-200 bg-white p-6">
              <div className="h-12 w-12 rounded-xl bg-rose-50 flex items-center justify-center mb-5 group-hover:bg-rose-100 transition-colors">
                <FileText className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Product Catalogue</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                Download our complete product catalogue with specifications, sizes, and pricing.
              </p>
              <a
                href="/api/catalogue"
                className="mt-4 flex items-center text-sm font-semibold text-primary"
              >
                Download PDF
                <ArrowRight className="ml-1 size-3.5" />
              </a>
            </div>

            <div
              className="card-modern group cursor-pointer rounded-2xl border border-stone-200 bg-white p-6"
              onClick={() => onNavigate('quotation')}
            >
              <div className="h-12 w-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-5 group-hover:bg-emerald-100 transition-colors">
                <FileText className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-2">Quotation Generator</h3>
              <p className="text-sm leading-relaxed text-stone-500">
                Create professional PDF quotations for your clients with auto-calculated GST and totals.
              </p>
              <p className="mt-4 flex items-center text-sm font-semibold text-primary">
                Create Quotation
                <ArrowRight className="ml-1 size-3.5" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. CTA Section ─── */}
      <section className="relative overflow-hidden">
        <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-20 sm:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-teal-500/10 blur-[100px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to Place Your Order?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-stone-400">
              Get in touch for competitive quotes, product availability, and bulk pricing. 
              We&apos;re here to find the right steel solutions for you.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-8 text-base font-semibold shadow-lg shadow-primary/25"
                onClick={() => onNavigate('contact')}
              >
                Contact Us
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-stone-600 bg-transparent px-8 text-base font-semibold text-stone-200 hover:bg-stone-800 hover:text-white hover:border-stone-500"
                onClick={() => window.open('https://wa.me/919123857784', '_blank')}
              >
                <MessageCircle className="mr-2 size-4" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}