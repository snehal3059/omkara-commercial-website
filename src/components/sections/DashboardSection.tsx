'use client'

import { useEffect, useState, useCallback } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import {
  Users,
  FileText,
  IndianRupee,
  TrendingUp,
  Phone,
  Mail,
  Building2,
  Clock,
  MessageSquare,
  CalendarPlus,
  Loader2,
  RefreshCw,
  ChevronDown,
  Plus,
  X,
  Eye,
  Activity,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

// ── Types ──────────────────────────────────────────────────────────────

interface AdminData {
  inquiries: unknown[]
  contacts: unknown[]
  leadCounts: Record<string, number>
  quotationCount: number
  totalQuotationValue: number
  recentQuotations: Quotation[]
  steelRatesLastUpdate: string | null
}

interface Quotation {
  id: number
  quoteNumber: string
  customerName: string
  companyName: string | null
  grandTotal: number
  status: string
  createdAt: string
  itemCount: number
}

interface Lead {
  id: number
  name: string
  email: string | null
  phone: string
  company: string | null
  source: string
  status: string
  value: number | null
  notes: string | null
  followUpDate: string | null
  createdAt: string
  updatedAt: string
  activityCount: number
}

interface LeadActivity {
  id: number
  type: string
  content: string | null
  createdAt: string
}

interface LeadDetail extends Omit<Lead, 'activityCount'> {
  activities: LeadActivity[]
}

// ── Constants ──────────────────────────────────────────────────────────

const PIPELINE_COLUMNS: { key: string; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-slate-500' },
  { key: 'contacted', label: 'Contacted', color: 'bg-sky-500' },
  { key: 'qualified', label: 'Qualified', color: 'bg-violet-500' },
  { key: 'proposal', label: 'Proposal', color: 'bg-amber-500' },
  { key: 'won', label: 'Won', color: 'bg-emerald-500' },
  { key: 'lost', label: 'Lost', color: 'bg-red-500' },
]

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'proposal', label: 'Proposal' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
]

const ACTIVITY_TYPES = [
  { value: 'call', label: 'Call' },
  { value: 'email', label: 'Email' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'note', label: 'Note' },
]

const SOURCE_BADGE_VARIANTS: Record<string, string> = {
  inquiry: 'bg-teal-100 text-teal-800 border-teal-200',
  contact: 'bg-blue-100 text-blue-800 border-blue-200',
  whatsapp: 'bg-green-100 text-green-800 border-green-200',
  quotation: 'bg-amber-100 text-amber-800 border-amber-200',
  referral: 'bg-purple-100 text-purple-800 border-purple-200',
  website: 'bg-stone-100 text-stone-800 border-stone-200',
}

const QUOTE_STATUS_STYLES: Record<string, string> = {
  draft: 'bg-stone-100 text-stone-700 border-stone-300',
  sent: 'bg-blue-100 text-blue-700 border-blue-300',
  accepted: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  rejected: 'bg-red-100 text-red-700 border-red-300',
  expired: 'bg-orange-100 text-orange-700 border-orange-300',
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

// ── Helpers ────────────────────────────────────────────────────────────

function formatRelativeTime(dateStr: string): string {
  try {
    return formatDistanceToNow(new Date(dateStr), { addSuffix: true })
  } catch {
    return dateStr
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  try {
    return format(new Date(dateStr), 'dd MMM yyyy')
  } catch {
    return dateStr
  }
}

function ActivityIcon({ type }: { type: string }) {
  switch (type) {
    case 'call':
      return <Phone className="size-3.5 text-blue-500" />
    case 'email':
      return <Mail className="size-3.5 text-purple-500" />
    case 'meeting':
      return <CalendarPlus className="size-3.5 text-amber-500" />
    case 'status_change':
      return <Activity className="size-3.5 text-teal-500" />
    default:
      return <MessageSquare className="size-3.5 text-stone-500" />
  }
}

// ── Sub-Components ─────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-lg bg-stone-200" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-24 bg-stone-200" />
            <Skeleton className="h-7 w-16 bg-stone-200" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LeadCardSkeleton() {
  return (
    <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm space-y-2">
      <Skeleton className="h-4 w-28 bg-stone-200" />
      <Skeleton className="h-3 w-20 bg-stone-100" />
      <Skeleton className="h-3 w-16 bg-stone-100" />
    </div>
  )
}

function PipelineColumnSkeleton() {
  return (
    <div className="min-w-[260px] sm:min-w-[280px] max-w-[280px] flex-shrink-0">
      <div className="flex items-center gap-2 mb-3">
        <Skeleton className="size-2.5 rounded-full" />
        <Skeleton className="h-4 w-20 bg-stone-200" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <LeadCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full bg-stone-100 rounded" />
      ))}
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────

export function DashboardSection() {
  // ── State ──
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Detail panel
  const [selectedLead, setSelectedLead] = useState<LeadDetail | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [detailLoading, setDetailLoading] = useState(false)

  // Status change
  const [statusUpdating, setStatusUpdating] = useState(false)

  // Add activity form
  const [activityType, setActivityType] = useState('')
  const [activityContent, setActivityContent] = useState('')
  const [activitySubmitting, setActivitySubmitting] = useState(false)

  // ── Fetchers ──
  const fetchAdminData = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/data')
      if (res.ok) {
        const data = await res.json()
        setAdminData(data)
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    }
  }, [])

  const fetchLeads = useCallback(async () => {
    try {
      const res = await fetch('/api/leads')
      if (res.ok) {
        const data = await res.json()
        setLeads(data.leads || [])
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err)
    }
  }, [])

  const fetchAll = useCallback(
    async (isRefresh = false) => {
      if (isRefresh) setRefreshing(true)
      else setLoading(true)
      await Promise.all([fetchAdminData(), fetchLeads()])
      if (isRefresh) setRefreshing(false)
      else setLoading(false)
    },
    [fetchAdminData, fetchLeads]
  )

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  // ── Handlers ──
  const handleRefresh = useCallback(() => {
    fetchAll(true)
  }, [fetchAll])

  const handleLeadClick = useCallback(
    async (lead: Lead) => {
      setDetailOpen(true)
      setDetailLoading(true)
      setSelectedLead(null)
      setActivityType('')
      setActivityContent('')
      try {
        const res = await fetch(`/api/leads/${lead.id}`)
        if (res.ok) {
          const data = await res.json()
          setSelectedLead(data)
        }
      } catch (err) {
        console.error('Failed to fetch lead detail:', err)
      } finally {
        setDetailLoading(false)
      }
    },
    []
  )

  const handleStatusChange = useCallback(
    async (newStatus: string) => {
      if (!selectedLead || selectedLead.status === newStatus) return
      setStatusUpdating(true)
      try {
        const res = await fetch(`/api/leads/${selectedLead.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        })
        if (res.ok) {
          const updated = await res.json()
          setSelectedLead(updated)
          // Refresh leads list to reflect new status
          fetchLeads()
          fetchAdminData()
        }
      } catch (err) {
        console.error('Failed to update status:', err)
      } finally {
        setStatusUpdating(false)
      }
    },
    [selectedLead, fetchLeads, fetchAdminData]
  )

  const handleAddActivity = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!selectedLead || !activityType) return
      setActivitySubmitting(true)
      try {
        const res = await fetch(`/api/leads/${selectedLead.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: activityType,
            content: activityContent || undefined,
          }),
        })
        if (res.ok) {
          setActivityType('')
          setActivityContent('')
          // Re-fetch lead detail to get updated activities
          const detailRes = await fetch(`/api/leads/${selectedLead.id}`)
          if (detailRes.ok) {
            const data = await detailRes.json()
            setSelectedLead(data)
          }
          fetchLeads()
        }
      } catch (err) {
        console.error('Failed to add activity:', err)
      } finally {
        setActivitySubmitting(false)
      }
    },
    [selectedLead, activityType, activityContent, fetchLeads]
  )

  // ── Computed ──
  const leadsByStatus = useCallback(
    (status: string) => leads.filter((l) => l.status === status),
    [leads]
  )

  const totalLeads =
    adminData?.leadCounts
      ? Object.values(adminData.leadCounts).reduce((a, b) => a + b, 0)
      : 0

  const activeInquiries =
    (adminData?.leadCounts?.new || 0) + (adminData?.leadCounts?.contacted || 0)

  // ── Render ──
  return (
    <section className="py-12 sm:py-16 lg:py-20" aria-labelledby="dashboard-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2
              id="dashboard-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900"
            >
              Lead Tracker &amp; Dashboard
            </h2>
            <p className="mt-1 text-sm sm:text-base text-stone-500">
              Monitor your sales pipeline, track inquiries, and manage quotations
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
            className="gap-2 self-start sm:self-auto w-fit"
          >
            <RefreshCw className={cn('size-4', refreshing && 'animate-spin')} />
            Refresh
          </Button>
        </div>

        {/* ── 1. Stats Row ── */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
            {/* Total Leads */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-teal-50 text-teal-600">
                    <Users className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-stone-500 truncate">
                      Total Leads
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {totalLeads}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Inquiries */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-sky-50 text-sky-600">
                    <FileText className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-stone-500 truncate">
                      Active Inquiries
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-stone-900 tabular-nums">
                      {activeInquiries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quotations Sent */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-amber-50 text-amber-600">
                    <IndianRupee className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-stone-500 truncate">
                      Quotations Sent
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-stone-900 tabular-nums">
                      {adminData?.quotationCount ?? 0}
                    </p>
                    <p className="text-xs text-stone-400 truncate">
                      {currencyFormatter.format(adminData?.totalQuotationValue ?? 0)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Steel Rates Last Updated */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-emerald-50 text-emerald-600">
                    <TrendingUp className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-stone-500 truncate">
                      Steel Rates Updated
                    </p>
                    <p className="text-sm sm:text-base font-semibold text-stone-900">
                      {adminData?.steelRatesLastUpdate
                        ? formatDate(adminData.steelRatesLastUpdate)
                        : 'Not available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── 2. Lead Pipeline (Kanban) ── */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-teal-500" />
            Lead Pipeline
          </h3>

          {loading ? (
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {Array.from({ length: 6 }).map((_, i) => (
                <PipelineColumnSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {PIPELINE_COLUMNS.map((col) => {
                const columnLeads = leadsByStatus(col.key)
                return (
                  <div
                    key={col.key}
                    className="min-w-[260px] sm:min-w-[280px] max-w-[300px] flex-shrink-0"
                  >
                    {/* Column Header */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <div className={cn('size-2.5 rounded-full', col.color)} />
                      <span className="text-sm font-semibold text-stone-700">
                        {col.label}
                      </span>
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs px-1.5 py-0 h-5 font-medium bg-stone-100 text-stone-600"
                      >
                        {columnLeads.length}
                      </Badge>
                    </div>

                    {/* Lead Cards */}
                    <div className="space-y-2">
                      {columnLeads.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 text-center">
                          <p className="text-xs text-stone-400">No leads</p>
                        </div>
                      ) : (
                        columnLeads.map((lead) => (
                          <button
                            key={lead.id}
                            type="button"
                            onClick={() => handleLeadClick(lead)}
                            className="w-full text-left rounded-lg border border-stone-200 bg-white p-3 shadow-sm hover:shadow-md hover:border-teal-300 transition-all group"
                          >
                            {/* Name & Company */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-stone-800 truncate group-hover:text-teal-700 transition-colors">
                                  {lead.name}
                                </p>
                                {lead.company && (
                                  <div className="flex items-center gap-1 mt-0.5">
                                    <Building2 className="size-3 text-stone-400 flex-shrink-0" />
                                    <p className="text-xs text-stone-500 truncate">
                                      {lead.company}
                                    </p>
                                  </div>
                                )}
                              </div>
                              {lead.value != null && lead.value > 0 && (
                                <span className="text-xs font-semibold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded whitespace-nowrap">
                                  {currencyFormatter.format(lead.value)}
                                </span>
                              )}
                            </div>

                            {/* Phone & Source */}
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <div className="flex items-center gap-1 text-xs text-stone-500">
                                <Phone className="size-3" />
                                <span className="truncate max-w-[100px]">
                                  {lead.phone}
                                </span>
                              </div>
                              <Badge
                                className={cn(
                                  'text-[10px] px-1.5 py-0 h-4 font-medium border',
                                  SOURCE_BADGE_VARIANTS[lead.source] ||
                                    'bg-stone-100 text-stone-700 border-stone-300'
                                )}
                              >
                                {lead.source}
                              </Badge>
                            </div>

                            {/* Footer: Time & Activity Count */}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                              <span className="text-[11px] text-stone-400 flex items-center gap-1">
                                <Clock className="size-3" />
                                {formatRelativeTime(lead.updatedAt)}
                              </span>
                              {lead.activityCount > 0 && (
                                <span className="text-[11px] text-stone-400 flex items-center gap-0.5">
                                  <Eye className="size-3" />
                                  {lead.activityCount}
                                </span>
                              )}
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── 4. Recent Quotations Table ── */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-stone-900 mb-4 flex items-center gap-2">
            <div className="w-1 h-5 rounded-full bg-amber-500" />
            Recent Quotations
          </h3>

          <Card className="shadow-sm overflow-hidden">
            {loading ? (
              <CardContent className="p-4 sm:p-6">
                <TableSkeleton />
              </CardContent>
            ) : !adminData?.recentQuotations ||
              adminData.recentQuotations.length === 0 ? (
              <CardContent className="p-8 sm:p-12 text-center">
                <FileText className="size-8 text-stone-300 mx-auto mb-3" />
                <p className="text-sm text-stone-500">No quotations yet</p>
              </CardContent>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-stone-50 hover:bg-stone-50">
                        <TableHead className="text-xs font-semibold text-stone-600">
                          Quote #
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-stone-600">
                          Customer
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-stone-600 hidden sm:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-stone-600 text-right">
                          Amount
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-stone-600 text-center">
                          Status
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminData.recentQuotations.map((q) => (
                        <TableRow key={q.id} className="hover:bg-stone-50/50">
                          <TableCell className="py-3 text-sm font-mono text-stone-700">
                            {q.quoteNumber}
                          </TableCell>
                          <TableCell className="py-3">
                            <div>
                              <p className="text-sm font-medium text-stone-800">
                                {q.customerName}
                              </p>
                              {q.companyName && (
                                <p className="text-xs text-stone-500">
                                  {q.companyName}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="py-3 text-sm text-stone-600 hidden sm:table-cell">
                            {formatDate(q.createdAt)}
                          </TableCell>
                          <TableCell className="py-3 text-sm font-semibold text-stone-800 text-right tabular-nums">
                            {currencyFormatter.format(q.grandTotal)}
                          </TableCell>
                          <TableCell className="py-3 text-center">
                            <Badge
                              className={cn(
                                'text-[10px] sm:text-xs px-2 py-0.5 h-5 font-semibold border capitalize',
                                QUOTE_STATUS_STYLES[q.status] ||
                                  'bg-stone-100 text-stone-700 border-stone-300'
                              )}
                            >
                              {q.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </Card>
        </div>
      </div>

      {/* ── 3. Lead Detail Panel (Sheet) ── */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-[480px] p-0 overflow-y-auto"
        >
          {detailLoading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-32 bg-stone-200" />
              <Skeleton className="h-4 w-48 bg-stone-100" />
              <Skeleton className="h-px w-full bg-stone-200" />
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full bg-stone-100 rounded-lg" />
                ))}
              </div>
            </div>
          ) : selectedLead ? (
            <div className="flex flex-col h-full">
              {/* Header */}
              <SheetHeader className="p-4 sm:p-6 pb-0">
                <SheetTitle className="text-xl font-bold text-stone-900">
                  {selectedLead.name}
                </SheetTitle>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {selectedLead.company && (
                    <span className="text-sm text-stone-500 flex items-center gap-1">
                      <Building2 className="size-3.5" />
                      {selectedLead.company}
                    </span>
                  )}
                  <Badge
                    className={cn(
                      'text-[10px] px-1.5 py-0 h-4 font-medium border',
                      SOURCE_BADGE_VARIANTS[selectedLead.source] ||
                        'bg-stone-100 text-stone-700 border-stone-300'
                    )}
                  >
                    {selectedLead.source}
                  </Badge>
                </div>
              </SheetHeader>

              <ScrollArea className="flex-1 px-4 sm:px-6 pb-6">
                <div className="mt-4 space-y-6">
                  {/* Lead Info */}
                  <div className="grid gap-3">
                    <InfoRow
                      icon={<Phone className="size-4 text-stone-400" />}
                      label="Phone"
                      value={selectedLead.phone}
                    />
                    <InfoRow
                      icon={<Mail className="size-4 text-stone-400" />}
                      label="Email"
                      value={selectedLead.email || '—'}
                    />
                    <InfoRow
                      icon={<Building2 className="size-4 text-stone-400" />}
                      label="Company"
                      value={selectedLead.company || '—'}
                    />
                    <InfoRow
                      icon={<IndianRupee className="size-4 text-stone-400" />}
                      label="Value"
                      value={
                        selectedLead.value != null
                          ? currencyFormatter.format(selectedLead.value)
                          : '—'
                      }
                    />
                    <InfoRow
                      icon={<CalendarPlus className="size-4 text-stone-400" />}
                      label="Follow-up"
                      value={formatDate(selectedLead.followUpDate)}
                    />
                    <InfoRow
                      icon={<Clock className="size-4 text-stone-400" />}
                      label="Created"
                      value={formatRelativeTime(selectedLead.createdAt)}
                    />
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Status Dropdown */}
                  <div>
                    <label className="text-sm font-medium text-stone-700 mb-2 block">
                      Status
                    </label>
                    <Select
                      value={selectedLead.status}
                      onValueChange={handleStatusChange}
                      disabled={statusUpdating}
                    >
                      <SelectTrigger className="w-full">
                        {statusUpdating ? (
                          <Loader2 className="size-4 animate-spin text-stone-400" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={cn(
                                  'size-2 rounded-full',
                                  PIPELINE_COLUMNS.find((c) => c.key === opt.value)
                                    ?.color || 'bg-stone-400'
                                )}
                              />
                              {opt.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Add Activity Form */}
                  <div>
                    <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                      <Plus className="size-4" />
                      Add Activity
                    </h4>
                    <form
                      onSubmit={handleAddActivity}
                      className="space-y-3"
                    >
                      <Select
                        value={activityType}
                        onValueChange={setActivityType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Activity type" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACTIVITY_TYPES.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Textarea
                        value={activityContent}
                        onChange={(e) => setActivityContent(e.target.value)}
                        placeholder="Add notes or details..."
                        rows={2}
                        className="resize-none text-sm"
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={!activityType || activitySubmitting}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        {activitySubmitting ? (
                          <Loader2 className="size-4 animate-spin mr-2" />
                        ) : (
                          <Plus className="size-4 mr-2" />
                        )}
                        Add Activity
                      </Button>
                    </form>
                  </div>

                  <Separator className="bg-stone-200" />

                  {/* Activity Timeline */}
                  <div>
                    <h4 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
                      <Activity className="size-4" />
                      Activity Timeline
                    </h4>
                    {selectedLead.activities.length === 0 ? (
                      <p className="text-sm text-stone-400 py-4 text-center">
                        No activities yet
                      </p>
                    ) : (
                      <div className="space-y-0">
                        {selectedLead.activities.map((activity, idx) => (
                          <div
                            key={activity.id}
                            className={cn(
                              'flex gap-3 pb-4',
                              idx < selectedLead.activities.length - 1 &&
                                'relative'
                            )}
                          >
                            {/* Timeline line */}
                            {idx < selectedLead.activities.length - 1 && (
                              <div className="absolute left-[11px] top-6 bottom-0 w-px bg-stone-200" />
                            )}
                            {/* Icon */}
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="flex items-center justify-center size-[22px] rounded-full bg-stone-100 border border-stone-200">
                                <ActivityIcon type={activity.type} />
                              </div>
                            </div>
                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium text-stone-700 capitalize">
                                  {activity.type.replace('_', ' ')}
                                </span>
                                <span className="text-[11px] text-stone-400">
                                  {formatRelativeTime(activity.createdAt)}
                                </span>
                              </div>
                              {activity.content && (
                                <p className="text-sm text-stone-600 mt-0.5 break-words">
                                  {activity.content}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Notes Section */}
                  {selectedLead.notes && (
                    <>
                      <Separator className="bg-stone-200" />
                      <div>
                        <h4 className="text-sm font-semibold text-stone-700 mb-2 flex items-center gap-2">
                          <MessageSquare className="size-4" />
                          Notes
                        </h4>
                        <div className="rounded-lg bg-stone-50 border border-stone-200 p-3">
                          <p className="text-sm text-stone-600 whitespace-pre-wrap break-words">
                            {selectedLead.notes}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-stone-400">No lead selected</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </section>
  )
}

// ── Info Row ────────────────────────────────────────────────────────────

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      {icon}
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">
          {label}
        </p>
        <p className="text-sm text-stone-700 truncate">{value}</p>
      </div>
    </div>
  )
}
