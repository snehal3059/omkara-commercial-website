import { NextRequest, NextResponse } from "next/server"
import { db, ensureSeeded } from "@/lib/db"

export const dynamic = "force-dynamic"

// GET /api/testimonials — list all active testimonials
export async function GET() {
  try {
    await ensureSeeded()
    const testimonials = await db.testimonial.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    })

    const formatted = testimonials.map((t) => ({
      id: t.id,
      name: t.name,
      role: t.role,
      company: t.company,
      location: t.location,
      text: t.text,
      rating: t.rating,
      sortOrder: t.sortOrder,
    }))

    return NextResponse.json({ testimonials: formatted })
  } catch (err) {
    console.error("Testimonials GET error:", err)
    return NextResponse.json(
      { error: "Failed to load testimonials" },
      { status: 500 }
    )
  }
}

// POST /api/testimonials — create a new testimonial
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, role, company, location, text, rating, sortOrder } = body

    if (!name || !text) {
      return NextResponse.json(
        { error: "name and text are required" },
        { status: 400 }
      )
    }

    const testimonial = await db.testimonial.create({
      data: {
        name,
        role: role || null,
        company: company || null,
        location: location || null,
        text,
        rating: rating ?? 5,
        sortOrder: sortOrder ?? 0,
      },
    })

    return NextResponse.json({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      location: testimonial.location,
      text: testimonial.text,
      rating: testimonial.rating,
      sortOrder: testimonial.sortOrder,
    })
  } catch (err) {
    console.error("Testimonials POST error:", err)
    return NextResponse.json(
      { error: "Failed to create testimonial" },
      { status: 500 }
    )
  }
}

// PATCH /api/testimonials — update a testimonial
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      id,
      name,
      role,
      company,
      location,
      text,
      rating,
      active,
      sortOrder,
    } = body

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const testimonialId = parseInt(id, 10)
    if (isNaN(testimonialId)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      )
    }

    const updated = await db.testimonial.update({
      where: { id: testimonialId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(company !== undefined ? { company } : {}),
        ...(location !== undefined ? { location } : {}),
        ...(text !== undefined ? { text } : {}),
        ...(rating !== undefined ? { rating } : {}),
        ...(active !== undefined ? { active } : {}),
        ...(sortOrder !== undefined ? { sortOrder } : {}),
      },
    })

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      role: updated.role,
      company: updated.company,
      location: updated.location,
      text: updated.text,
      rating: updated.rating,
      sortOrder: updated.sortOrder,
    })
  } catch (err) {
    console.error("Testimonials PATCH error:", err)
    return NextResponse.json(
      { error: "Failed to update testimonial" },
      { status: 500 }
    )
  }
}

// DELETE /api/testimonials — delete a testimonial
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const testimonialId = parseInt(id, 10)
    if (isNaN(testimonialId)) {
      return NextResponse.json(
        { error: "Invalid testimonial ID" },
        { status: 400 }
      )
    }

    await db.testimonial.delete({ where: { id: testimonialId } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Testimonials DELETE error:", err)
    return NextResponse.json(
      { error: "Failed to delete testimonial" },
      { status: 500 }
    )
  }
}
