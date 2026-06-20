import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      product_slug,
      product_title,
      name,
      email,
      phone,
      company,
      quantity,
      message,
    } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, and phone are required" },
        { status: 400 }
      )
    }

    const inquiry = await db.inquiry.create({
      data: {
        productSlug: product_slug || null,
        productTitle: product_title || null,
        name,
        email,
        phone,
        company: company || null,
        quantity: quantity || null,
        message: message || null,
      },
    })

    // Also create a Lead from this inquiry
    await db.lead.create({
      data: {
        name,
        email,
        phone,
        company: company || null,
        source: "inquiry",
        sourceId: String(inquiry.id),
        value: null,
        notes: message || null,
        activities: {
          create: {
            type: "note",
            content: `Lead created from inquiry #${inquiry.id}${
              product_title ? ` for ${product_title}` : ""
            }`,
          },
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Inquiry error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
