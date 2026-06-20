import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// Helper to format a single lead for JSON response
function formatLead(l: {
  id: number
  name: string
  email: string | null
  phone: string
  company: string | null
  source: string
  sourceId: string | null
  status: string
  value: number | null
  notes: string | null
  followUpDate: string | null
  createdAt: Date
  updatedAt: Date
  activities: { id: number }[]
}) {
  return {
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
    activityCount: l.activities.length,
  }
}

// GET /api/leads/[id] — fetch single lead with activities
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leadId = parseInt(id, 10)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    const lead = await db.lead.findUnique({
      where: { id: leadId },
      include: {
        activities: {
          orderBy: { createdAt: "desc" },
        },
      },
    })

    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

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
      activities: lead.activities.map((a) => ({
        id: a.id,
        type: a.type,
        content: a.content,
        createdAt: a.createdAt.toISOString(),
      })),
    })
  } catch (err) {
    console.error("Lead GET error:", err)
    return NextResponse.json(
      { error: "Failed to load lead" },
      { status: 500 }
    )
  }
}

// PATCH /api/leads/[id] — update lead (status, notes, followUpDate, value)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leadId = parseInt(id, 10)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    const body = await req.json()
    const { status, notes, followUpDate, value } = body

    // If status is being changed, look up current status first
    let previousStatus: string | null = null
    if (status !== undefined) {
      const existing = await db.lead.findUnique({ where: { id: leadId } })
      if (!existing) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 })
      }
      previousStatus = existing.status
    }

    const updated = await db.lead.update({
      where: { id: leadId },
      data: {
        ...(status !== undefined ? { status } : {}),
        ...(notes !== undefined ? { notes } : {}),
        ...(followUpDate !== undefined ? { followUpDate } : {}),
        ...(value !== undefined ? { value } : {}),
      },
      include: { activities: { select: { id: true } } },
    })

    // Auto-create activity if status changed
    if (status !== undefined && previousStatus !== status) {
      await db.leadActivity.create({
        data: {
          leadId,
          type: "status_change",
          content: `Status changed to ${status}`,
        },
      })
      // Re-fetch to include the new activity count
      const refreshed = await db.lead.findUnique({
        where: { id: leadId },
        include: { activities: { select: { id: true } } },
      })
      if (refreshed) {
        return NextResponse.json(formatLead(refreshed))
      }
    }

    return NextResponse.json(formatLead(updated))
  } catch (err) {
    console.error("Lead PATCH error:", err)
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    )
  }
}

// DELETE /api/leads/[id] — delete lead and its activities (cascade)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leadId = parseInt(id, 10)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    await db.lead.delete({ where: { id: leadId } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Lead DELETE error:", err)
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    )
  }
}

// POST /api/leads/[id] — add a new activity to a lead
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const leadId = parseInt(id, 10)
    if (isNaN(leadId)) {
      return NextResponse.json({ error: "Invalid lead ID" }, { status: 400 })
    }

    const body = await req.json()
    const { type, content } = body

    const validTypes = ["call", "email", "meeting", "note", "status_change"]
    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        { error: `type must be one of: ${validTypes.join(", ")}` },
        { status: 400 }
      )
    }

    // Verify lead exists
    const lead = await db.lead.findUnique({ where: { id: leadId } })
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 })
    }

    const activity = await db.leadActivity.create({
      data: {
        leadId,
        type,
        content: content || null,
      },
    })

    return NextResponse.json({
      id: activity.id,
      leadId: activity.leadId,
      type: activity.type,
      content: activity.content,
      createdAt: activity.createdAt.toISOString(),
    })
  } catch (err) {
    console.error("Lead activity POST error:", err)
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 }
    )
  }
}
