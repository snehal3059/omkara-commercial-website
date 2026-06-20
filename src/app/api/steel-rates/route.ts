import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'
import { db, ensureSeeded } from '@/lib/db'

// ── Types ──────────────────────────────────────────────────────────────────

interface RateEntry {
  product: string
  range: string
  trend: 'up' | 'down' | 'stable'
}

interface SteelRatesResponse {
  updated: string
  rates: RateEntry[]
  disclaimer: string
  history?: {
    dates: string[]
    products: Record<string, { low: number[]; high: number[] }>
  }
}

interface ParsedRate {
  product: string
  low: number
  high: number
  trend: 'up' | 'down' | 'stable'
}

// ── Fallback data ──────────────────────────────────────────────────────────

const FALLBACK_RATES: ParsedRate[] = [
  { product: 'MS Sheet (HR)', low: 52, high: 58, trend: 'stable' },
  { product: 'MS Sheet (CR)', low: 56, high: 62, trend: 'up' },
  { product: 'MS Plate', low: 50, high: 56, trend: 'stable' },
  { product: 'MS Beam (ISMB)', low: 48, high: 55, trend: 'down' },
  { product: 'MS Channel', low: 50, high: 56, trend: 'stable' },
  { product: 'MS Angle', low: 49, high: 55, trend: 'up' },
  { product: 'MS Round Bar', low: 51, high: 57, trend: 'stable' },
  { product: 'MS Hollow Pipe', low: 55, high: 62, trend: 'up' },
]

const DISCLAIMER = 'Indicative rates only. Contact us for confirmed pricing.'

// ── Helpers ────────────────────────────────────────────────────────────────

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

function parsedToResponse(rates: ParsedRate[], date: string): RateEntry[] {
  return rates.map((r) => ({
    product: r.product,
    range: `₹${r.low}-${r.high}/kg`,
    trend: r.trend,
  }))
}

function getDateRange(nDays: number): string[] {
  const dates: string[] = []
  for (let i = nDays - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dates.push(d.toISOString().split('T')[0])
  }
  return dates
}

// ── DB layer ───────────────────────────────────────────────────────────────

async function getTodayRates(): Promise<ParsedRate[] | null> {
  const today = todayStr()
  const rows = await db.steelRate.findMany({
    where: { date: today },
    orderBy: { product: 'asc' },
  })

  if (rows.length === 0) return null

  return rows.map((r) => ({
    product: r.product,
    low: r.rangeLow,
    high: r.rangeHigh,
    trend: r.trend as 'up' | 'down' | 'stable',
  }))
}

async function saveRates(rates: ParsedRate[]): Promise<void> {
  const today = todayStr()

  // Fetch yesterday's rates for trend comparison
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]
  const yesterdayRows = await db.steelRate.findMany({
    where: { date: yesterdayStr },
  })
  const yesterdayMap = new Map(yesterdayRows.map((r) => [r.product, r]))

  // Determine trends by comparing with yesterday
  const ratesWithTrend = rates.map((r) => {
    const prev = yesterdayMap.get(r.product)
    if (!prev) return r // keep original trend if no previous data

    const midCurrent = (r.low + r.high) / 2
    const midPrev = (prev.rangeLow + prev.rangeHigh) / 2
    const diff = midCurrent - midPrev
    const threshold = 0.5 // at least ₹0.5/kg change to count as up/down

    let trend: 'up' | 'down' | 'stable' = 'stable'
    if (diff > threshold) trend = 'up'
    else if (diff < -threshold) trend = 'down'

    return { ...r, trend }
  })

  // Save to DB in a transaction
  await db.$transaction(
    ratesWithTrend.map((r) =>
      db.steelRate.create({
        data: {
          product: r.product,
          rangeLow: r.low,
          rangeHigh: r.high,
          unit: 'kg',
          trend: r.trend,
          source: 'web_search',
          date: today,
        },
      })
    )
  )
}

async function getHistoryRates(
  days: number
): Promise<{ dates: string[]; products: Record<string, { low: number[]; high: number[] }> }> {
  const dates = getDateRange(days)
  const rows = await db.steelRate.findMany({
    where: { date: { in: dates } },
    orderBy: [{ date: 'asc' }, { product: 'asc' }],
  })

  const products: Record<string, { low: number[]; high: number[] }> = {}

  for (const row of rows) {
    if (!products[row.product]) {
      // Initialize arrays with nulls for missing dates
      products[row.product] = {
        low: new Array(dates.length).fill(0),
        high: new Array(dates.length).fill(0),
      }
    }
    const dateIndex = dates.indexOf(row.date)
    if (dateIndex !== -1) {
      products[row.product].low[dateIndex] = row.rangeLow
      products[row.product].high[dateIndex] = row.rangeHigh
    }
  }

  return { dates, products }
}

// ── Web search (existing logic) ────────────────────────────────────────────

const PRODUCT_KEYWORDS: Record<string, string> = {
  'ms sheet hr': 'MS Sheet (HR)',
  'ms sheet cr': 'MS Sheet (CR)',
  'hr sheet': 'MS Sheet (HR)',
  'cr sheet': 'MS Sheet (CR)',
  'hot rolled sheet': 'MS Sheet (HR)',
  'cold rolled sheet': 'MS Sheet (CR)',
  'ms plate': 'MS Plate',
  'plate': 'MS Plate',
  'beam': 'MS Beam (ISMB)',
  'ismb': 'MS Beam (ISMB)',
  'channel': 'MS Channel',
  'angle': 'MS Angle',
  'round bar': 'MS Round Bar',
  'rod': 'MS Round Bar',
  'hollow': 'MS Hollow Pipe',
  'pipe': 'MS Hollow Pipe',
  'tube': 'MS Hollow Pipe',
  'hollow section': 'MS Hollow Pipe',
  'square tube': 'MS Hollow Pipe',
  'rectangular tube': 'MS Hollow Pipe',
}

function tryParseRatesFromText(text: string): ParsedRate[] | null {
  const ratePattern =
    /(?:₹|Rs\.?|INR)\s*([\d,.]+)\s*[-–to]+\s*₹?\s*([\d,.]+)\s*\/?\s*(?:per\s*)?kg/i
  const lines = text.split(/\n|,/)

  const found: ParsedRate[] = []

  for (const line of lines) {
    const lower = line.toLowerCase().trim()
    let matchedProduct: string | null = null

    for (const [keyword, name] of Object.entries(PRODUCT_KEYWORDS)) {
      if (lower.includes(keyword)) {
        matchedProduct = name
        break
      }
    }

    if (!matchedProduct) continue

    const match = line.match(ratePattern)
    if (match) {
      const low = parseFloat(match[1].replace(/,/g, ''))
      const high = parseFloat(match[2].replace(/,/g, ''))

      if (isNaN(low) || isNaN(high) || low <= 0 || high <= 0) continue

      let trend: 'up' | 'down' | 'stable' = 'stable'
      if (/\b(up|increased|rise|higher|gained)\b/i.test(line)) trend = 'up'
      if (/\b(down|decreased|fall|lower|dropped|declined)\b/i.test(line))
        trend = 'down'

      found.push({ product: matchedProduct, low, high, trend })
    }
  }

  // Need at least 3 parsed rates to consider the search successful
  if (found.length >= 3) return found
  return null
}

async function fetchRatesFromWeb(): Promise<ParsedRate[]> {
  const zai = await ZAI.create()

  const [search1, search2] = await Promise.allSettled([
    zai.functions.invoke('web_search', {
      query: 'steel price today India MS plate sheet rate per kg 2025',
    }),
    zai.functions.invoke('web_search', {
      query: 'TATA steel price list today SAIL steel rate 2025',
    }),
  ])

  let allText = ''

  for (const result of [search1, search2]) {
    if (result.status === 'fulfilled' && result.value) {
      const data = result.value as unknown as {
        results?: Array<{ snippet?: string; title?: string; content?: string }>
      }
      if (Array.isArray(data?.results)) {
        for (const r of data.results) {
          allText +=
            (r.snippet || '') + ' ' + (r.title || '') + ' ' + (r.content || '') + '\n'
        }
      }
    }
  }

  const parsedRates = tryParseRatesFromText(allText)

  if (parsedRates && parsedRates.length >= 4) {
    // Merge with fallback to ensure we have all 8 products
    const existingProducts = new Set(parsedRates.map((r) => r.product))
    const merged = [...parsedRates]
    for (const fb of FALLBACK_RATES) {
      if (!existingProducts.has(fb.product)) {
        merged.push(fb)
      }
    }
    return merged.slice(0, 8)
  }

  return FALLBACK_RATES
}

// ── Route handler ──────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const historyDays = searchParams.get('history')
  const history = historyDays ? parseInt(historyDays, 10) : null

  try {
    await ensureSeeded()
    // Step 1: Try to get today's rates from DB
    let rates = await getTodayRates()

    // Step 2: If not in DB, fetch from web and save
    if (!rates) {
      rates = await fetchRatesFromWeb()
      await saveRates(rates)
    }

    const today = todayStr()
    const baseResponse: SteelRatesResponse = {
      updated: today,
      rates: parsedToResponse(rates, today),
      disclaimer: DISCLAIMER,
    }

    // Step 3: If history is requested, append historical data
    if (history && history > 0) {
      const historyData = await getHistoryRates(history)
      baseResponse.history = historyData
    }

    return NextResponse.json(baseResponse)
  } catch (error) {
    console.error('Steel rates API error:', error)

    // Final fallback: return hardcoded rates even on DB/error failure
    const today = todayStr()
    return NextResponse.json({
      updated: today,
      rates: parsedToResponse(FALLBACK_RATES, today),
      disclaimer: DISCLAIMER,
    })
  }
}