import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export const dynamic = "force-dynamic"

// GET /api/gallery — list all active gallery images
export async function GET() {
  try {
    const images = await db.galleryImage.findMany({
      where: { active: true },
      orderBy: { sortOrder: "asc" },
    })

    const formatted = images.map((img) => ({
      id: img.id,
      title: img.title,
      description: img.description,
      src: img.src,
      sortOrder: img.sortOrder,
    }))

    return NextResponse.json({ images: formatted })
  } catch (err) {
    console.error("Gallery GET error:", err)
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    )
  }
}

// POST /api/gallery — create a new gallery image
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { title, description, src, sortOrder } = body

    if (!title || !src) {
      return NextResponse.json(
        { error: "title and src are required" },
        { status: 400 }
      )
    }

    const image = await db.galleryImage.create({
      data: {
        title,
        description: description || null,
        src,
        sortOrder: sortOrder ?? 0,
      },
    })

    return NextResponse.json({
      id: image.id,
      title: image.title,
      description: image.description,
      src: image.src,
      sortOrder: image.sortOrder,
    })
  } catch (err) {
    console.error("Gallery POST error:", err)
    return NextResponse.json(
      { error: "Failed to create gallery image" },
      { status: 500 }
    )
  }
}

// PATCH /api/gallery — update a gallery image
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, title, description, src, sortOrder, active } = body

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const imageId = parseInt(id, 10)
    if (isNaN(imageId)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 })
    }

    const updated = await db.galleryImage.update({
      where: { id: imageId },
      data: {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(src !== undefined ? { src } : {}),
        ...(sortOrder !== undefined ? { sortOrder } : {}),
        ...(active !== undefined ? { active } : {}),
      },
    })

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      description: updated.description,
      src: updated.src,
      sortOrder: updated.sortOrder,
    })
  } catch (err) {
    console.error("Gallery PATCH error:", err)
    return NextResponse.json(
      { error: "Failed to update gallery image" },
      { status: 500 }
    )
  }
}

// DELETE /api/gallery — delete a gallery image
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { id } = body

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 })
    }

    const imageId = parseInt(id, 10)
    if (isNaN(imageId)) {
      return NextResponse.json({ error: "Invalid image ID" }, { status: 400 })
    }

    await db.galleryImage.delete({ where: { id: imageId } })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("Gallery DELETE error:", err)
    return NextResponse.json(
      { error: "Failed to delete gallery image" },
      { status: 500 }
    )
  }
}
