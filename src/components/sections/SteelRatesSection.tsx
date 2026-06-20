'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TrendingUp, TrendingDown, Minus, RefreshCw, AlertTriangle } from 'lucide-react'

interface SteelRate {
  product: string
  range: string
  trend: 'up' | 'down' | 'stable'
}

interface SteelRatesData {
  updated: string
  rates: SteelRate[]
  disclaimer: string
}

function TrendIcon({ trend }: { trend: string }) {
  switch (trend) {
    case 'up':
      return <TrendingUp className="size-4 text-emerald-400" />
    case 'down':
      return <TrendingDown className="size-4 text-red-400" />
    default:
      return <Minus className="size-4 text-stone-500" />
  }
}

function RateCardSkeleton() {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5 min-w-[200px] flex-shrink-0">
      <Skeleton className="h-4 w-24 bg-white/10 mb-3" />
      <Skeleton className="h-7 w-32 bg-white/10 mb-3" />
      <Skeleton className="h-4 w-12 bg-white/10" />
    </div>
  )
}

export default function SteelRatesSection() {
  const [data, setData] = useState<SteelRatesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchRates = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)
    setError(false)

    try {
      const res = await fetch('/api/steel-rates')
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      setData(json)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
  }, [fetchRates])

  return (
    <section className="bg-stone-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
              Live Market Data
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Today&apos;s Steel Rates
            </h2>
            <p className="mt-2 text-sm text-stone-400 max-w-lg">
              Indicative market rates updated regularly
            </p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-stone-400 hover:text-white hover:bg-white/10 self-start sm:self-auto"
            onClick={() => fetchRates(true)}
            disabled={refreshing}
          >
            <RefreshCw className={cn('size-4 mr-2', refreshing && 'animate-spin')} />
            Refresh
          </Button>
        </div>

        {/* Rates Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <RateCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center">
            <AlertTriangle className="size-8 text-red-400 mx-auto mb-3" />
            <p className="text-stone-300 font-medium mb-1">Unable to load steel rates</p>
            <p className="text-sm text-stone-500 mb-4">
              We couldn&apos;t fetch the latest rates. Please try again.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-300 hover:bg-red-500/10 hover:text-red-200"
              onClick={() => fetchRates(true)}
            >
              <RefreshCw className="size-4 mr-2" />
              Try Again
            </Button>
          </div>
        ) : data ? (
          <>
            {/* Mobile: horizontal scroll, Desktop: 4-column grid */}
            <div className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-thin">
              {data.rates.map((rate) => (
                <div
                  key={rate.product}
                  className="snap-start flex-shrink-0 w-[180px] sm:w-[200px] md:w-auto rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="text-sm font-medium text-stone-300 group-hover:text-white transition-colors leading-snug">
                      {rate.product}
                    </h3>
                    <TrendIcon trend={rate.trend} />
                  </div>
                  <p className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {rate.range}
                  </p>
                  <div
                    className={cn(
                      'mt-2 text-xs font-medium',
                      rate.trend === 'up' && 'text-emerald-400',
                      rate.trend === 'down' && 'text-red-400',
                      rate.trend === 'stable' && 'text-stone-500',
                    )}
                  >
                    {rate.trend === 'up' && '↑ Price increasing'}
                    {rate.trend === 'down' && '↓ Price decreasing'}
                    {rate.trend === 'stable' && '— Stable'}
                  </div>
                </div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 flex items-start gap-3">
              <AlertTriangle className="size-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-200/80 leading-relaxed">
                {data.disclaimer} Actual prices may vary based on quantity, grade, and location.
                Last updated: <span className="font-medium text-amber-200">{data.updated}</span>
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href="https://wa.me/919876543210?text=Hi%2C%20I%27d%20like%20to%20get%20a%20confirmed%20steel%20rate%20quote."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 shadow-lg shadow-emerald-600/20 transition-all hover:shadow-emerald-600/30"
                >
                  Get Confirmed Quote
                  <svg
                    className="size-4 ml-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </Button>
              </a>
            </div>
          </>
        ) : null}
      </div>
    </section>
  )
}