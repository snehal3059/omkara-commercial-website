"use client"

import { useState, useRef, useEffect, useCallback } from "react"

interface UseAnimatedCounterOptions {
  end: number
  duration?: number
  startOnView?: boolean
}

export function useAnimatedCounter({ end, duration = 2000, startOnView = true }: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const animate = useCallback((startTime: number) => {
    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }
    requestAnimationFrame(tick)
  }, [end, duration])

  useEffect(() => {
    if (!startOnView) {
      animate(performance.now())
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true)
          animate(performance.now())
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    const el = ref.current
    if (el) {
      observer.observe(el)
    }

    return () => {
      observer.disconnect()
    }
  }, [animate, startOnView, hasStarted])

  return { count, ref }
}

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
}

export function AnimatedCounter({ end, suffix = "", prefix = "", label, duration = 2000 }: AnimatedCounterProps) {
  const { count, ref } = useAnimatedCounter({ end, duration })

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
        {prefix}{count}{suffix}
      </p>
      <p className="mt-2 text-sm text-stone-400 uppercase tracking-wider font-medium">
        {label}
      </p>
    </div>
  )
}