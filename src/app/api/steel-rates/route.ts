import { NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

interface SteelRate {
  product: string
  range: string
  trend: 'up' | 'down' | 'stable'
}

interface SteelRatesResponse {
  updated: string
  rates: SteelRate[]
  disclaimer: string
}

const FALLBACK_RATES: SteelRatesResponse = {
  updated: new Date().toISOString().split('T')[0],
  rates: [
    { product: 'MS Sheet (HR)', range: '₹52-58/kg', trend: 'stable' },
    { product: 'MS Sheet (CR)', range: '₹56-62/kg', trend: 'up' },
    { product: 'MS Plate', range: '₹50-56/kg', trend: 'stable' },
    { product: 'MS Beam (ISMB)', range: '₹48-55/kg', trend: 'down' },
    { product: 'MS Channel', range: '₹50-56/kg', trend: 'stable' },
    { product: 'MS Angle', range: '₹49-55/kg', trend: 'up' },
    { product: 'MS Round Bar', range: '₹51-57/kg', trend: 'stable' },
    { product: 'MS Hollow Pipe', range: '₹55-62/kg', trend: 'up' },
  ],
  disclaimer: 'Indicative rates only. Contact us for confirmed pricing.',
}

const CACHE_TTL = 6 * 60 * 60 * 1000 // 6 hours
let cachedResponse: SteelRatesResponse | null = null
let cacheTimestamp = 0

function tryParseRatesFromText(text: string): SteelRate[] | null {
  const ratePattern = /(?:₹|Rs\.?|INR)\s*([\d,.]+)\s*[-–to]+\s*₹?\s*([\d,.]+)\s*\/?\s*(?:per\s*)?kg/i
  const lines = text.split(/\n|,/)

  const found: SteelRate[] = []
  const productKeywords: Record<string, string> = {
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

  for (const line of lines) {
    const lower = line.toLowerCase().trim()
    let matchedProduct: string | null = null

    for (const [keyword, name] of Object.entries(productKeywords)) {
      if (lower.includes(keyword)) {
        matchedProduct = name
        break
      }
    }

    if (!matchedProduct) continue

    const match = line.match(ratePattern)
    if (match) {
      const low = match[1].replace(/,/g, '')
      const high = match[2].replace(/,/g, '')
      const range = `₹${low}-${high}/kg`

      // Determine trend from context
      let trend: 'up' | 'down' | 'stable' = 'stable'
      if (/\b(up|increased|rise|higher|gained)\b/i.test(line)) trend = 'up'
      if (/\b(down|decreased|fall|lower|dropped|declined)\b/i.test(line)) trend = 'down'

      found.push({ product: matchedProduct, range, trend })
    }
  }

  if (found.length >= 3) return found
  return null
}

export async function GET() {
  // Return cached data if still valid
  if (cachedResponse && Date.now() - cacheTimestamp < CACHE_TTL) {
    return NextResponse.json(cachedResponse)
  }

  try {
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
            allText += (r.snippet || '') + ' ' + (r.title || '') + ' ' + (r.content || '') + '\n'
          }
        }
      }
    }

    const parsedRates = tryParseRatesFromText(allText)

    if (parsedRates && parsedRates.length >= 4) {
      // Merge with fallback to ensure we have all 8 products
      const existingProducts = new Set(parsedRates.map((r) => r.product))
      const merged = [...parsedRates]
      for (const fb of FALLBACK_RATES.rates) {
        if (!existingProducts.has(fb.product)) {
          merged.push(fb)
        }
      }

      cachedResponse = {
        updated: new Date().toISOString().split('T')[0],
        rates: merged.slice(0, 8),
        disclaimer: FALLBACK_RATES.disclaimer,
      }
      cacheTimestamp = Date.now()
      return NextResponse.json(cachedResponse)
    }
  } catch (error) {
    console.error('Steel rates fetch error:', error)
  }

  // Fallback response
  const fallback = {
    ...FALLBACK_RATES,
    updated: new Date().toISOString().split('T')[0],
  }
  cachedResponse = fallback
  cacheTimestamp = Date.now()
  return NextResponse.json(cachedResponse)
}