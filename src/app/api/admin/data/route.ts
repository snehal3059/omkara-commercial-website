import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const inquiries = await db.inquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    const contacts = await db.contact.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
    })
    // Format dates as ISO strings for JSON
    const formatInquiries = inquiries.map(i => ({
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
    const formatContacts = contacts.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      phone: c.phone,
      subject: c.subject,
      message: c.message,
      created_at: c.createdAt.toISOString(),
    }))
    return NextResponse.json({ inquiries: formatInquiries, contacts: formatContacts })
  } catch (err) {
    console.error("Admin data error:", err)
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 })
  }
}
