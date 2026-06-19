import { NextResponse } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { products } from "@/lib/product-data"
import fs from "fs"
import path from "path"

const categoryOrder = ["ms-sheet", "ms-plate", "ms-beam", "ms-channel", "ms-angle", "ms-round", "ms-hollow-pipes"]

const categoryDisplay: Record<string, { name: string; image: string }> = {
  "ms-sheet": { name: "MS Sheet", image: "ms-sheet.jpg" },
  "ms-plate": { name: "MS Plate", image: "ms-plate.jpg" },
  "ms-beam": { name: "MS Beam", image: "ms-beam.jpg" },
  "ms-channel": { name: "MS Channel", image: "ms-channel.jpg" },
  "ms-angle": { name: "MS Angle", image: "ms-angle.jpg" },
  "ms-round": { name: "MS Round", image: "ms-round.jpg" },
  "ms-hollow-pipes": { name: "MS Hollow Pipes", image: "ms-pipes.jpg" },
}

const WIDTH = 595.28
const HEIGHT = 841.89
const MARGIN = 50
const CONTENT = WIDTH - MARGIN * 2

const DARK_BLUE = rgb(0.12, 0.23, 0.37)
const BLUE = rgb(0.15, 0.39, 0.92)
const GRAY = rgb(0.4, 0.4, 0.4)
const LIGHT_GRAY = rgb(0.6, 0.6, 0.6)
const WHITE = rgb(1, 1, 1)

export async function GET() {
  const pdfDoc = await PDFDocument.create()
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // --- Cover page ---
  let page = pdfDoc.addPage([WIDTH, HEIGHT])
  page.drawText("OMKARA COMMERCIAL", { x: MARGIN, y: 600, size: 36, font: helveticaBold, color: DARK_BLUE })
  page.drawText("PVT. LTD.", { x: MARGIN, y: 560, size: 28, font: helveticaBold, color: BLUE })

  page.drawLine({ start: { x: MARGIN + 120, y: 520 }, end: { x: WIDTH - MARGIN - 120, y: 520 }, thickness: 2, color: BLUE })

  page.drawText("PRODUCT CATALOGUE", { x: MARGIN, y: 490, size: 20, font: helveticaBold, color: DARK_BLUE })
  page.drawText("Premium Iron & Steel Products", { x: MARGIN, y: 450, size: 14, font: helvetica, color: GRAY })
  page.drawText("Howrah, West Bengal, India", { x: MARGIN, y: 420, size: 11, font: helvetica, color: LIGHT_GRAY })
  page.drawText("Est. 2008", { x: MARGIN, y: 402, size: 11, font: helvetica, color: LIGHT_GRAY })

  page.drawText("OMKARA COMMERCIAL PVT. LTD. — Product Catalogue", {
    x: MARGIN, y: 30, size: 8, font: helvetica, color: LIGHT_GRAY
  })

  // --- Table of Contents ---
  page = pdfDoc.addPage([WIDTH, HEIGHT])
  page.drawText("CONTENTS", { x: MARGIN, y: HEIGHT - MARGIN - 30, size: 22, font: helveticaBold, color: DARK_BLUE })

  let yPos = HEIGHT - MARGIN - 70
  categoryOrder.forEach((cat, i) => {
    const info = categoryDisplay[cat]
    page.drawText(`${i + 1}. ${info.name}`, { x: MARGIN + 40, y: yPos, size: 12, font: helvetica, color: rgb(0.2, 0.2, 0.2) })
    yPos -= 22
  })

  page.drawText("OMKARA COMMERCIAL PVT. LTD. — Product Catalogue", {
    x: MARGIN, y: 30, size: 8, font: helvetica, color: LIGHT_GRAY
  })

  // --- Category pages ---
  for (const cat of categoryOrder) {
    const info = categoryDisplay[cat]
    const catProducts = Object.entries(products).filter(([, p]) => p.category === cat)

    page = pdfDoc.addPage([WIDTH, HEIGHT])

    // Category image
    const imgPath = path.join(process.cwd(), "public", info.image)
    if (fs.existsSync(imgPath)) {
      try {
        const imgBytes = fs.readFileSync(imgPath)
        const img = await pdfDoc.embedJpg(imgBytes)
        page.drawImage(img, { x: MARGIN, y: HEIGHT - MARGIN - 130, width: CONTENT, height: 120 })
      } catch {
        // skip image
      }
    }

    page.drawText(info.name, { x: MARGIN, y: HEIGHT - MARGIN - 160, size: 22, font: helveticaBold, color: DARK_BLUE })
    page.drawLine({ start: { x: MARGIN, y: HEIGHT - MARGIN - 175 }, end: { x: WIDTH - MARGIN, y: HEIGHT - MARGIN - 175 }, thickness: 1.5, color: BLUE })

    yPos = HEIGHT - MARGIN - 200
    for (const [slug, product] of catProducts) {
      if (yPos < 80) {
        yPos = HEIGHT - MARGIN - 30
        page.drawText("OMKARA COMMERCIAL PVT. LTD. — Product Catalogue", {
          x: MARGIN, y: 30, size: 8, font: helvetica, color: LIGHT_GRAY
        })
        page = pdfDoc.addPage([WIDTH, HEIGHT])
      }

      page.drawText(product.title, { x: MARGIN, y: yPos, size: 10, font: helveticaBold, color: DARK_BLUE })
      yPos -= 16

      const specs = product.specifications.map(s => `${s.key}: ${s.value}`).join("  |  ")
      page.drawText(specs, { x: MARGIN, y: yPos, size: 7.5, font: helvetica, color: GRAY })
      yPos -= 14

      page.drawText(slug, { x: WIDTH - MARGIN - 200, y: yPos, size: 7, font: helvetica, color: LIGHT_GRAY })
      yPos -= 10

      page.drawLine({ start: { x: MARGIN, y: yPos }, end: { x: WIDTH - MARGIN, y: yPos }, thickness: 0.5, color: rgb(0.9, 0.9, 0.9) })
      yPos -= 8
    }

    page.drawText("OMKARA COMMERCIAL PVT. LTD. — Product Catalogue", {
      x: MARGIN, y: 30, size: 8, font: helvetica, color: LIGHT_GRAY
    })
  }

  const pdfBytes = Buffer.from(await pdfDoc.save())

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="omkara-catalogue.pdf"',
    },
  })
}
