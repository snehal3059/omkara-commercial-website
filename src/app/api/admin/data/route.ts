import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // ── Existing: inquiries and contacts ──
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })

    const formatInquiries = inquiries.map((i) => ({
      id: i.id,
      product_slug: i.productSlug,
      product_title: i.productTitle,
      name: i.name,
      email: i.email,
      phone: i.phone,
      company: i.company,
      quantity: i.quantity,
      message: i.message,
      created_at: i.createdAt.toISOString(),
    }))
    const formatContacts = contacts.map((c) => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      subject: c.subject,
      message: c.message,
      created_at: c.createdAt.toISOString(),
    }))

    // ── Lead count by status ──
    const leadsByStatusRaw = await db.lead.groupBy({
      by: ["status"],
      _count: { status: true },
    })
    const leadCounts: Record<string, number> = {}
    for (const row of leadsByStatusRaw) {
      leadCounts[row.status] = row._count.status
    }

    // ── Quotations: total count, total value, recent 5 ──
    const [quotationCount, quotationAgg, recentQuotations] = await Promise.all([
      db.quotation.count(),
      db.quotation.aggregate({
        _sum: { grandTotal: true },
      }),
      db.quotation.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
    ])

    const totalQuotationValue = quotationAgg._sum.grandTotal ?? 0

    const formatRecentQuotations = recentQuotations.map((q) => ({
      id: q.id,
      quoteNumber: q.quoteNumber,
      customerName: q.customerName,
      companyName: q.companyName,
      grandTotal: q.grandTotal,
      status: q.status,
      createdAt: q.createdAt.toISOString(),
      itemCount: q.items.length,
    }))

    // ── Steel rates: last update date ──
    const latestRate = await db.steelRate.findFirst({
      orderBy: { createdAt: "desc" },
    })
    const steelRatesLastUpdate = latestRate
      ? latestRate.createdAt.toISOString()
      : null

    return NextResponse.json({
      inquiries: formatInquiries,
      contacts: formatContacts,
      leadCounts,
      quotationCount,
      totalQuotationValue,
      recentQuotations: formatRecentQuotations,
      steelRatesLastUpdate,
    })
  } catch (err) {
    console.error("Admin data error:", err)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
