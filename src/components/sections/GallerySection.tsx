'use client'

import { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const galleryItems = [
  {
    src: '/warehouse-interior.jpg',
    title: 'Our Warehouse',
    description:
      'Well-organized 10,000 sq.ft. warehouse in Howrah with ready stock',
  },
  {
    src: '/steel-delivery.jpg',
    title: 'Fast Delivery',
    description:
      'Dedicated logistics for timely delivery across Eastern India',
  },
  {
    src: '/steel-yard.jpg',
    title: 'Steel Yard',
    description:
      'Premium MS products from SAIL, TATA Steel, and other top manufacturers',
  },
  {
    src: '/construction-site.jpg',
    title: 'Project Supply',
    description:
      'Bulk steel supply for large-scale construction projects',
  },
  {
    src: '/quality-control.jpg',
    title: 'Quality Assurance',
    description:
      'Every product inspected with mill test certificates',
  },
  {
    src: '/ms-plate.jpg',
    title: 'Product Range',
    description:
      'Comprehensive range of MS sheets, plates, beams, channels, and more',
  },
]

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index)
    // Defer visibility to trigger animation
    requestAnimationFrame(() => setIsVisible(true))
  }, [])

  const closeLightbox = useCallback(() => {
    setIsVisible(false)
    // Wait for fade-out before removing from DOM
    setTimeout(() => setActiveIndex(null), 200)
  }, [])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryItems.length) % galleryItems.length
        : null
    )
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null ? (prev + 1) % galleryItems.length : null
    )
  }, [])

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') goToPrev()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [activeIndex, closeLightbox, goToPrev, goToNext])

  const currentItem = activeIndex !== null ? galleryItems[activeIndex] : null

  return (
    <section className="bg-background py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <div className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-600">
            Gallery
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Our Operations
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-stone-500 leading-relaxed">
            Take a look inside our warehouse, delivery operations, and quality
            assurance processes that keep our customers coming back.
          </p>
        </div>

        {/* ── Gallery Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryItems.map((item, index) => (
            <div
              key={item.src}
              className={cn(
                'group relative cursor-pointer overflow-hidden rounded-xl',
                // First image spans 2 cols on lg
                index === 0 && 'sm:col-span-2 lg:col-span-2'
              )}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openLightbox(index)
                }
              }}
              aria-label={`View ${item.title}`}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 66vw"
                  className={cn(
                    'object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                  )}
                />
              </div>

              {/* Hover overlay */}
              <div
                className={cn(
                  'absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-black/30 to-transparent',
                  'opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                )}
              >
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-white/80 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-teal-300 text-sm font-medium">
                    <Maximize2 className="h-4 w-4" />
                    <span>View</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {activeIndex !== null && currentItem && (
        <div
          className={cn(
            'fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm transition-opacity duration-200',
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
          onClick={(e) => {
            // Close when clicking outside the image area
            if (e.target === e.currentTarget) closeLightbox()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Previous button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              goToPrev()
            }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Next button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 z-10 h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Image */}
          <div
            className="flex max-h-[85vh] flex-1 flex-col items-center justify-center px-16 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full max-w-4xl">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                width={1344}
                height={768}
                className="max-h-[75vh] w-auto rounded-lg object-contain mx-auto"
                priority
              />
            </div>
            <div className="mt-4 text-center">
              <h3 className="text-lg font-bold text-white">
                {currentItem.title}
              </h3>
              <p className="mt-1 text-sm text-white/70 max-w-xl mx-auto">
                {currentItem.description}
              </p>
              <p className="mt-2 text-xs text-white/40">
                {activeIndex + 1} / {galleryItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}