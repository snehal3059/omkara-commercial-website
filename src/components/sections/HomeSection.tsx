'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
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
} from 'lucide-react'

interface HomeSectionProps {
  onNavigate: (page: string) => void
}

const manufacturers = [
  { name: 'SAIL', fullName: 'Steel Authority of India Limited' },
  { name: 'TATA Steel', fullName: 'Tata Steel Limited' },
  { name: 'GAGAN GOLD', fullName: 'Gagan Gold Steel' },
  { name: 'SHYAM SEL', fullName: 'Shyam Steel Industries' },
  { name: 'ELEGANT', fullName: 'Elegant Steel' },
]

const productCategories = [
  { name: 'MS Sheet', icon: '📄', description: 'Mild steel sheets in various thicknesses and sizes' },
  { name: 'MS Plate', icon: '🛡️', description: 'Heavy-duty mild steel plates for structural use' },
  { name: 'MS Beam', icon: '🏗️', description: 'I-beams and H-beams for construction frameworks' },
  { name: 'MS Channel', icon: '📐', description: 'C-channel and U-channel for support structures' },
  { name: 'MS Angle', icon: '📐', description: 'L-shaped angles for fabrication and construction' },
  { name: 'MS Round', icon: '⭕', description: 'Round bars and rods for diverse applications' },
  { name: 'MS Hollow Pipes', icon: '🔧', description: 'Square, rectangular, and round hollow sections' },
]

const whyChooseUs = [
  {
    icon: BadgeCheck,
    title: 'Premium Quality',
    description: 'All products sourced directly from top manufacturers like SAIL and TATA Steel with mill test certificates.',
  },
  {
    icon: Clock,
    title: '<48 Hrs Dispatch',
    description: 'Rapid processing and dispatch from our well-stocked Howrah warehouse to keep your projects on schedule.',
  },
  {
    icon: ShieldCheck,
    title: 'Best Pricing',
    description: 'Competitive wholesale rates with transparent pricing. Bulk order discounts available for all product categories.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Dedicated team of steel experts to help you choose the right grade, size, and quantity for your needs.',
  },
]

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Project Head',
    company: 'Ganges Construction',
    location: 'Kolkata, WB',
    text: 'Omkara Commercial has been our go-to steel supplier for over 5 years. Their consistent quality and on-time delivery have been instrumental in keeping our projects on track. Highly recommended for any construction firm in Eastern India.',
    rating: 5,
  },
  {
    name: 'Anita Sharma',
    role: 'Purchase Manager',
    company: 'FabTech Industries',
    location: 'Jamshedpur, JH',
    text: 'Excellent service and competitive pricing. The team at Omkara understands our requirements perfectly and always delivers exactly what we need. Their product range is comprehensive and quality is never compromised.',
    rating: 5,
  },
  {
    name: 'Vikram Singh',
    role: 'Director',
    company: 'Singh Infrastructure',
    location: 'Patna, BR',
    text: 'We switched to Omkara Commercial two years ago and it was the best decision. Their dispatch times are unmatched — most orders reach us within 48 hours. The mill test certificates give us complete peace of mind.',
    rating: 4,
  },
  {
    name: 'Priya Das',
    role: 'Procurement Lead',
    company: 'East India Engineering',
    location: 'Bhubaneswar, OD',
    text: 'Professional approach, transparent pricing, and a wide range of products. Omkara Commercial has simplified our procurement process significantly. Their expert team helps us select the right specifications every time.',
    rating: 5,
  },
]

export function HomeSection({ onNavigate }: HomeSectionProps) {
  return (
    <div className="w-full">
      {/* ─── 1. Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-400" />
              Howrah, West Bengal | Est. 2008
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Your Trusted Partner in{' '}
              <span className="text-blue-400">Iron &amp; Steel Trading</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Supplying premium quality mild steel products from India&apos;s leading
              manufacturers. From MS sheets to structural steel, we deliver
              reliability, quality, and competitive pricing to businesses across
              Eastern India.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 bg-blue-600 px-8 text-base font-semibold hover:bg-blue-700"
                onClick={() => onNavigate('products')}
              >
                Explore Products
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-blue-400/40 bg-transparent px-8 text-base font-semibold text-blue-300 hover:bg-blue-500/10 hover:text-blue-200"
                onClick={() => onNavigate('contact')}
              >
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 60V20C240 0 480 40 720 30C960 20 1200 0 1440 20V60H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* ─── 2. Manufacturer Logos ─── */}
      <section className="bg-background py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Authorized Distributor for India&apos;s Top Manufacturers
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {manufacturers.map((mfr) => (
              <Card
                key={mfr.name}
                className="items-center justify-center border-muted py-4 hover:border-blue-300/50 hover:shadow-md transition-all"
              >
                <CardContent className="flex flex-col items-center gap-2 px-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-700 sm:h-14 sm:w-14 sm:text-xl">
                    {mfr.name.charAt(0)}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground">
                      {mfr.name}
                    </p>
                    <p className="hidden text-xs text-muted-foreground sm:block">
                      {mfr.fullName}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Introduction ─── */}
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left column */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
                About Us
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Welcome to{' '}
                <span className="text-blue-600">OMKARA COMMERCIAL PVT. LTD.</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Founded in 2008, Omkara Commercial Pvt. Ltd. has grown into one of
                Eastern India&apos;s most trusted names in iron and steel trading.
                Based in Howrah, the industrial heart of West Bengal, we have built
                our reputation on a foundation of quality products, competitive
                pricing, and unwavering commitment to customer satisfaction.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                We are authorized distributors for some of India&apos;s premier steel
                manufacturers including SAIL, TATA Steel, and others. Our extensive
                inventory includes MS sheets, plates, beams, channels, angles, rounds,
                and hollow pipes — all readily available for prompt dispatch.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Whether you are a large construction company, a fabrication shop, or
                an individual buyer, we cater to all scales of requirement with the
                same dedication and professionalism.
              </p>
            </div>

            {/* Right column: Stats + Legacy */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-3 gap-4">
                <Card className="border-muted py-6 text-center">
                  <CardContent className="px-4">
                    <p className="text-3xl font-bold text-blue-600 sm:text-4xl">
                      15+
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Years Experience
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-muted py-6 text-center">
                  <CardContent className="px-4">
                    <p className="text-3xl font-bold text-blue-600 sm:text-4xl">
                      500+
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Products
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-muted py-6 text-center">
                  <CardContent className="px-4">
                    <p className="text-3xl font-bold text-blue-600 sm:text-4xl">
                      1000+
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Happy Clients
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-blue-200 bg-blue-50/50">
                <CardContent className="px-6 py-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21h18" />
                        <path d="M5 21V7l7-4 7 4v14" />
                        <path d="M9 21v-6h6v6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900">
                        Our Legacy
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-blue-800/80">
                        Est. 2008 by <strong>Shri Somnath Gupta</strong>, Under{' '}
                        <strong>2nd Generation Leadership</strong> — continuing a
                        family tradition of excellence in the steel trading industry.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Product Categories ─── */}
      <section className="bg-slate-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Products
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Product Categories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Browse our comprehensive range of mild steel products, all sourced from
              certified manufacturers and available for immediate dispatch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {productCategories.map((cat) => (
              <Card
                key={cat.name}
                className="group cursor-pointer border-muted hover:border-blue-300 hover:shadow-md transition-all"
                onClick={() => onNavigate('products')}
              >
                <CardContent className="px-6 py-5">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-2xl transition-colors group-hover:bg-blue-200">
                    {cat.icon}
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                  <p className="mt-3 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                    View Products
                    <ArrowRight className="ml-1 size-3.5" />
                  </p>
                </CardContent>
              </Card>
            ))}

            {/* 7th card spans wider for the last item on larger screens */}
          </div>
        </div>
      </section>

      {/* ─── 5. Why Choose Us ─── */}
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Our Strengths
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              With over 15 years of industry experience, we offer unparalleled
              service and reliability.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((feature) => (
              <Card
                key={feature.title}
                className="border-muted hover:border-blue-200 hover:shadow-md transition-all"
              >
                <CardContent className="px-6 py-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Testimonials ─── */}
      <section className="bg-slate-50 py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Trusted by hundreds of businesses across Eastern India for quality
              steel products and reliable service.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-muted hover:shadow-md transition-shadow"
              >
                <CardContent className="px-6 py-6">
                  {/* Star rating */}
                  <div className="mb-4 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'size-4',
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-muted text-muted'
                        )}
                      />
                    ))}
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="mt-5 flex items-center gap-3 border-t pt-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Technical Resources ─── */}
      <section className="bg-background py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Resources
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Technical Resources
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Access steel grades, calculate weights, and download our complete
              product catalogue.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {/* Grades & Specifications */}
            <Card
              className="group cursor-pointer border-muted hover:border-blue-300 hover:shadow-md transition-all"
              onClick={() => onNavigate('grades')}
            >
              <CardContent className="px-6 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
                  <BookOpen className="size-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Grades &amp; Specifications
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Detailed information about steel grades, chemical compositions, and
                  mechanical properties for all product categories.
                </p>
                <p className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  View Grades
                  <ArrowRight className="ml-1 size-3.5" />
                </p>
              </CardContent>
            </Card>

            {/* Weight Calculator */}
            <Card
              className="group cursor-pointer border-muted hover:border-blue-300 hover:shadow-md transition-all"
              onClick={() => onNavigate('weight-calc')}
            >
              <CardContent className="px-6 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
                  <Calculator className="size-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Weight Calculator
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Calculate the weight of steel products based on dimensions, thickness,
                  and grade. Supports all product types.
                </p>
                <p className="mt-4 flex items-center text-sm font-medium text-blue-600">
                  Open Calculator
                  <ArrowRight className="ml-1 size-3.5" />
                </p>
              </CardContent>
            </Card>

            {/* Product Catalogue */}
            <Card className="group border-muted hover:border-blue-300 hover:shadow-md transition-all">
              <CardContent className="px-6 py-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors group-hover:bg-blue-200">
                  <FileText className="size-6" />
                </div>
                <h3 className="text-base font-semibold text-foreground">
                  Product Catalogue
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Download our complete product catalogue with specifications, sizes,
                  and pricing information in PDF format.
                </p>
                <a
                  href="/api/catalogue"
                  className="mt-4 flex items-center text-sm font-medium text-blue-600"
                >
                  Download PDF
                  <ArrowRight className="ml-1 size-3.5" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 8. CTA Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-400/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Place Your Order?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
            Get in touch with our team for competitive quotes, product availability,
            and bulk pricing. We&apos;re here to help you find the right steel
            solutions.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 bg-white px-8 text-base font-semibold text-blue-700 hover:bg-blue-50"
              onClick={() => onNavigate('contact')}
            >
              Contact Us
              <ArrowRight className="ml-2 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/30 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              onClick={() => {
                window.open('https://wa.me/919876543210', '_blank')
              }}
            >
              <MessageCircle className="mr-2 size-4" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}