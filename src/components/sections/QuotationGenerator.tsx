'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Plus, Trash2, FileText, MessageCircle, IndianRupee, Loader2, Send } from 'lucide-react'
import { toast } from 'sonner'

interface LineItem {
  id: string
  product: string
  specification: string
  quantity: string
  unit: string
  rate: string
}

const UNIT_OPTIONS = ['MT', 'Pcs', 'Bundle', 'Kg', 'Ton', 'Set']

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

export function QuotationGenerator() {
  const [customerName, setCustomerName] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [items, setItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), product: '', specification: '', quantity: '', unit: 'MT', rate: '' },
  ])
  const [isGenerating, setIsGenerating] = useState(false)

  const addItem = useCallback(() => {
    setItems((prev) => [
      ...prev,
      { id: crypto.randomUUID(), product: '', specification: '', quantity: '', unit: 'MT', rate: '' },
    ])
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((item) => item.id !== id)
    })
  }, [])

  const updateItem = useCallback((id: string, field: keyof LineItem, value: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }, [])

  const calculations = useMemo(() => {
    let subtotal = 0
    const itemAmounts = items.map((item) => {
      const qty = parseFloat(item.quantity) || 0
      const rate = parseFloat(item.rate) || 0
      const amount = qty * rate
      subtotal += amount
      return amount
    })
    const gst = subtotal * 0.18
    const grandTotal = subtotal + gst
    return { subtotal, gst, grandTotal, itemAmounts }
  }, [items])

  const canGenerate = useMemo(() => {
    if (!customerName.trim()) return false
    if (items.length === 0) return false
    return items.some((item) => item.product.trim() && parseFloat(item.quantity) > 0 && parseFloat(item.rate) > 0)
  }, [customerName, items])

  const generatePDF = async () => {
    if (!canGenerate) {
      toast.error('Please fill in customer name and at least one item with quantity and rate.')
      return
    }

    setIsGenerating(true)
    try {
      const response = await fetch('/api/quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName.trim(),
          customerName: customerName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          items: items
            .filter((item) => item.product.trim() && parseFloat(item.quantity) > 0)
            .map((item) => ({
              product: item.product.trim(),
              specification: item.specification.trim(),
              quantity: item.quantity,
              unit: item.unit,
              rate: item.rate,
            })),
          notes: notes.trim() || undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to generate PDF')
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `quotation-${Date.now()}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      toast.success('Quotation PDF generated successfully!')
    } catch (error) {
      console.error('PDF generation error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to generate quotation')
    } finally {
      setIsGenerating(false)
    }
  }

  const sendWhatsApp = () => {
    const validItems = items.filter(
      (item) => item.product.trim() && parseFloat(item.quantity) > 0
    )
    if (validItems.length === 0) {
      toast.error('Please add at least one item with details.')
      return
    }

    let message = `*QUOTATION - OMKARA COMMERCIAL PVT. LTD.*\n\n`
    message += `*Customer:* ${customerName || 'N/A'}\n`
    if (companyName) message += `*Company:* ${companyName}\n`
    message += `\n*Items:*\n`

    validItems.forEach((item, i) => {
      const qty = parseFloat(item.quantity) || 0
      const rate = parseFloat(item.rate) || 0
      const amount = qty * rate
      message += `${i + 1}. ${item.product}`
      if (item.specification) message += ` (${item.specification})`
      message += `\n   ${item.quantity} ${item.unit} × ${formatCurrency(rate)} = ${formatCurrency(amount)}\n`
    })

    message += `\n*Subtotal:* ${formatCurrency(calculations.subtotal)}\n`
    message += `*GST (18%):* ${formatCurrency(calculations.gst)}\n`
    message += `*Grand Total:* ${formatCurrency(calculations.grandTotal)}\n`

    if (notes) message += `\n*Notes:* ${notes}\n`

    message += `\n_Terms: Prices ex-works Howrah. GST extra as applicable. Delivery within 48 hours._`

    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/919123857784?text=${encoded}`, '_blank')
    toast.success('Opening WhatsApp...')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Section Header ── */}
      <section className="border-b border-stone-200/50 bg-gradient-to-b from-teal-50/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold text-teal-700 mb-4">
            <FileText className="h-3.5 w-3.5" />
            Quotation Tool
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
            Quotation Generator
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-stone-500 text-lg">
            Create professional quotations instantly with auto-calculated GST and totals
          </p>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left: Form */}
          <div className="space-y-6">
            {/* Customer Details */}
            <Card className="rounded-2xl border-stone-200/80 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-stone-900">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Customer Name *</Label>
                    <Input
                      id="customerName"
                      placeholder="Enter customer name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      placeholder="Enter company name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="customer@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Full billing address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card className="rounded-2xl border-stone-200/80 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-stone-900">Line Items</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addItem}
                    className="gap-1.5 text-xs border-teal-200 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Items Header (desktop) */}
                <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_80px_80px_100px_auto] gap-3 px-1 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                  <span>Product</span>
                  <span>Specification</span>
                  <span>Quantity</span>
                  <span>Unit</span>
                  <span>Rate (₹)</span>
                  <span className="w-8" />
                </div>
                <Separator className="hidden sm:block" />

                {/* Item Rows */}
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={item.id} className="rounded-xl border border-stone-200/60 bg-stone-50/50 p-3 sm:p-4 space-y-3 sm:space-y-0">
                      {/* Mobile: stacked */}
                      <div className="sm:hidden space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-stone-400">Item #{index + 1}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-7 w-7 p-0 text-stone-400 hover:text-red-500 hover:bg-red-50"
                            disabled={items.length <= 1}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <Input
                            placeholder="Product name"
                            value={item.product}
                            onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                            className="h-9 text-sm"
                          />
                          <Input
                            placeholder="Specification"
                            value={item.specification}
                            onChange={(e) => updateItem(item.id, 'specification', e.target.value)}
                            className="h-9 text-sm"
                          />
                          <div className="grid grid-cols-3 gap-2">
                            <Input
                              type="number"
                              placeholder="Qty"
                              value={item.quantity}
                              onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                              className="h-9 text-sm"
                            />
                            <select
                              value={item.unit}
                              onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                              className="h-9 rounded-md border border-stone-200 bg-white px-2 text-sm"
                            >
                              {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>{u}</option>
                              ))}
                            </select>
                            <Input
                              type="number"
                              placeholder="Rate ₹"
                              value={item.rate}
                              onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                              className="h-9 text-sm"
                            />
                          </div>
                          {calculations.itemAmounts[index] > 0 && (
                            <p className="text-sm font-semibold text-teal-700 flex items-center gap-1">
                              <IndianRupee className="h-3.5 w-3.5" />
                              {formatCurrency(calculations.itemAmounts[index])}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Desktop: inline */}
                      <div className="hidden sm:grid sm:grid-cols-[1fr_1fr_80px_80px_100px_auto] gap-3 items-center">
                        <Input
                          placeholder="Product name"
                          value={item.product}
                          onChange={(e) => updateItem(item.id, 'product', e.target.value)}
                          className="h-9 text-sm"
                        />
                        <Input
                          placeholder="Specification"
                          value={item.specification}
                          onChange={(e) => updateItem(item.id, 'specification', e.target.value)}
                          className="h-9 text-sm"
                        />
                        <Input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                          className="h-9 text-sm text-center"
                        />
                        <select
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          className="h-9 rounded-md border border-stone-200 bg-white px-2 text-sm text-center"
                        >
                          {UNIT_OPTIONS.map((u) => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                        <Input
                          type="number"
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => updateItem(item.id, 'rate', e.target.value)}
                          className="h-9 text-sm text-right"
                        />
                        <div className="flex items-center gap-2 w-[120px]">
                          {calculations.itemAmounts[index] > 0 && (
                            <span className="text-sm font-semibold text-teal-700 whitespace-nowrap">
                              {formatCurrency(calculations.itemAmounts[index])}
                            </span>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-7 w-7 shrink-0 p-0 text-stone-400 hover:text-red-500 hover:bg-red-50"
                            disabled={items.length <= 1}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card className="rounded-2xl border-stone-200/80 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-stone-900">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any additional notes, terms, or instructions for the customer..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                onClick={generatePDF}
                disabled={!canGenerate || isGenerating}
                className="flex-1 h-12 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold shadow-lg shadow-teal-700/20"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Generate PDF
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={sendWhatsApp}
                className="flex-1 h-12 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 text-sm font-semibold"
              >
                <Send className="mr-2 h-4 w-4" />
                Send via WhatsApp
              </Button>
            </div>
          </div>

          {/* Right: Summary Card */}
          <div className="lg:sticky lg:top-28 lg:self-start space-y-6">
            <Card className="rounded-2xl border-teal-200/80 bg-gradient-to-b from-teal-50/60 to-white shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-stone-900 flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-teal-600" />
                  Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items
                    .filter((item) => item.product.trim() && parseFloat(item.quantity) > 0)
                    .map((item, index) => {
                      const origIndex = items.indexOf(item)
                      return (
                        <div key={item.id} className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-stone-800 truncate">
                              {item.product}
                            </p>
                            <p className="text-xs text-stone-500">
                              {item.quantity} {item.unit} × {formatCurrency(parseFloat(item.rate) || 0)}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-stone-900 shrink-0">
                            {formatCurrency(calculations.itemAmounts[origIndex])}
                          </p>
                        </div>
                      )
                    })}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">Subtotal</span>
                    <span className="text-sm font-semibold text-stone-800">
                      {formatCurrency(calculations.subtotal)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-stone-500">GST (18%)</span>
                    <span className="text-sm font-semibold text-stone-800">
                      {formatCurrency(calculations.gst)}
                    </span>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between rounded-xl bg-teal-700 p-3 -mx-2">
                    <span className="text-sm font-bold text-white">Grand Total</span>
                    <span className="text-lg font-extrabold text-white">
                      {formatCurrency(calculations.grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-stone-100 p-3 space-y-1">
                  <p className="text-xs font-semibold text-stone-600">Quick Info</p>
                  <p className="text-xs text-stone-500">
                    {items.filter((i) => i.product.trim()).length} item(s)
                  </p>
                  <p className="text-xs text-stone-500">
                    Prices ex-works Howrah
                  </p>
                  <p className="text-xs text-stone-500">
                    Quotation valid for 7 days
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
