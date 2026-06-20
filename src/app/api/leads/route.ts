import { NextRequest, NextResponse } from "next/server"
import { db, ensureSeeded } from "@/lib/db"

export const dynamic = "force-dynamic"

// GET /api/leads — list all leads (optional ?status= filter)
export async function GET(req: NextRequest) {
  try {
    await ensureSeeded()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get("status")

    const where = status ? { status } : {}

    const leads = await db.lead.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      include: {
        _count: { select: { activities: true } },
      },
    })

    const formatted = leads.map((l) => ({
      id: l.id,
      name: l.name,
      email: l.email,
      phone: l.phone,
      company: l.company,
      source: l.source,
      sourceId: l.sourceId,
      status: l.status,
      value: l.value,
      notes: l.notes,
      followUpDate: l.followUpDate,
      createdAt: l.createdAt.toISOString(),
      updatedAt: l.updatedAt.toISOString(),
      activityCount: l._count.activities,
    }))

    return NextResponse.json({ leads: formatted })
  } catch (err) {
    console.error("Leads GET error:", err)
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 })
  }
}

// POST /api/leads — create a new lead
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      company,
      source,
      sourceId,
      value,
      notes,
    } = body

    if (!name || !phone || !source) {
      return NextResponse.json(
        { error: "name, phone, and source are required" },
        { status: 400 }
      )
    }

    const validSources = [
      "inquiry",
      "contact",
      "whatsapp",
      "quotation",
      "referral",
      "website",
    ]

    if (!validSources.includes(source)) {
      return NextResponse.json(
        { error: `source must be one of: ${validSources.join(", ")}` },
        { status: 400 }
      )
    }

    const lead = await db.lead.create({
      data: {
        name,
        email: email || null,
        phone,
        company: company || null,
        source,
        sourceId: sourceId || null,
        value: value ?? null,
        notes: notes || null,
        activities: {
          create: {
            type: "note",
            content: `Lead created from ${source}`,
          },
        },
      },
      include: {
        _count: { select: { activities: true } },
      },
    })

    return NextResponse.json({
      id: lead.id,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      source: lead.source,
      sourceId: lead.sourceId,
      status: lead.status,
      value: lead.value,
      notes: lead.notes,
      followUpDate: lead.followUpDate,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      activityCount: lead._count.activities,
    })
  } catch (err) {
    console.error("Leads POST error:", err)
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    )
  }
}
