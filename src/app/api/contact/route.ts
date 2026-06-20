import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }
    const contact = await db.contact.create({
      data: { name, email, phone: phone || null, subject: subject || null, message },
    })

    // Auto-create a lead from contact submission
    try {
      await db.lead.create({
        data: {
          name,
          email,
          phone: phone || 'N/A',
          source: 'contact',
          sourceId: String(contact.id),
          notes: `Subject: ${subject || 'General'}\n${message}`,
        },
      })
    } catch {
      // Non-blocking — lead creation failure should not affect contact submission
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Contact error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
