import { NextRequest, NextResponse } from "next/server"
import PDFDocument from "pdfkit"
import { db } from "@/lib/db"

interface QuotationItem {
  product: string
  specification: string
  quantity: string
  unit: string
  rate: string
}

interface QuotationBody {
  companyName: string
  customerName: string
  email: string
  phone: string
  address: string
  items: QuotationItem[]
  notes?: string
  date?: string
}

function formatINR(num: number): string {
  return num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export async function POST(request: NextRequest) {
  try {
    const body: QuotationBody = await request.json()

    const {
      companyName,
      customerName,
      email,
      phone,
      address,
      items,
      notes,
      date: providedDate,
    } = body

    if (!companyName || !customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: companyName, customerName, and at least one item" },
        { status: 400 }
      )
    }

    const quotationNumber = `QT-OC-${Date.now()}`
    const quotationDate = providedDate || new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })

    // ── Calculate totals for DB storage ──
    const subtotal = items.reduce((sum, item) => {
      const qty = parseFloat(item.quantity) || 0
      const rate = parseFloat(item.rate) || 0
      return sum + qty * rate
    }, 0)
    const gst = subtotal * 0.18
    const grandTotal = subtotal + gst

    // ── Save quotation to database (non-blocking) ──
    try {
      await db.quotation.create({
        data: {
          quoteNumber: quotationNumber,
          customerName,
          companyName: companyName || null,
          email: email || null,
          phone: phone || null,
          address: address || null,
          notes: notes || null,
          subtotal,
          gst,
          grandTotal,
          status: "draft",
          items: {
            create: items.map((item, index) => ({
              product: item.product,
              specification: item.specification || null,
              quantity: parseFloat(item.quantity) || 0,
              unit: item.unit,
              rate: parseFloat(item.rate) || 0,
              amount: (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0),
              sortOrder: index,
            })),
          },
        },
      })
    } catch (dbError) {
      console.error("Failed to save quotation to database:", dbError)
      // Continue with PDF generation even if DB save fails
    }

    const pdfDoc = new PDFDocument({
      size: "A4",
      margins: { top: 40, bottom: 40, left: 50, right: 50 },
      info: {
        Title: `Quotation ${quotationNumber}`,
        Author: "OMKARA COMMERCIAL PVT. LTD.",
        Subject: "Steel Products Quotation",
      },
    })

    const chunks: Buffer[] = []
    pdfDoc.on("data", (chunk: Buffer) => chunks.push(chunk))
    pdfDoc.on("end", () => {})

    const pageWidth = pdfDoc.page.width
    const contentWidth = pageWidth - 100

    // ── Color palette ──
    const DARK = "#1a1a2e"
    const PRIMARY = "#0f766e"
    const GRAY = "#555555"
    const LIGHT_GRAY = "#888888"
    const TABLE_HEADER_BG = "#0f766e"
    const TABLE_ALT_BG = "#f0fdfa"
    const LINE_COLOR = "#cccccc"
    const AMOUNT_COLOR = "#1a1a2e"

    // ── Header: Company branding ──
    pdfDoc.rect(0, 0, pageWidth, 95).fill("#f8fffe")

    pdfDoc.fontSize(18).font("Helvetica-Bold").fillColor(PRIMARY)
    pdfDoc.text("OMKARA COMMERCIAL PVT. LTD.", 50, 25, { align: "left" })

    pdfDoc.fontSize(8).font("Helvetica").fillColor(GRAY)
    pdfDoc.text("77/5/6, Benaras Rd, Belgachia, Salkia, Howrah, West Bengal 711101", 50, 48)

    pdfDoc.fontSize(8).fillColor(LIGHT_GRAY)
    pdfDoc.text("+91 91238 57784 / +91 98300 31148", 50, 62)

    pdfDoc.text(`GSTIN: Available on request`, 50, 76)

    // Quotation number and date on the right
    pdfDoc.fontSize(9).font("Helvetica-Bold").fillColor(PRIMARY)
    pdfDoc.text(quotationNumber, pageWidth - 50 - 130, 25, { align: "right", width: 130 })
    pdfDoc.fontSize(8).font("Helvetica").fillColor(GRAY)
    pdfDoc.text(`Date: ${quotationDate}`, pageWidth - 50 - 130, 40, { align: "right", width: 130 })

    // ── Separator ──
    pdfDoc.moveTo(50, 95).lineTo(pageWidth - 50, 95).lineWidth(2).strokeColor(PRIMARY).stroke()

    // ── Quotation Title ──
    pdfDoc.moveDown(1)
    pdfDoc.fontSize(22).font("Helvetica-Bold").fillColor(DARK)
    pdfDoc.text("QUOTATION", 50, 115, { align: "center", width: contentWidth })

    pdfDoc.moveTo(180, 142).lineTo(pageWidth - 180, 142).lineWidth(1).strokeColor(LINE_COLOR).stroke()

    // ── Bill To Section ──
    let y = 160
    pdfDoc.fontSize(9).font("Helvetica-Bold").fillColor(PRIMARY)
    pdfDoc.text("BILL TO", 50, y)
    pdfDoc.moveTo(50, y + 14).lineTo(230, y + 14).lineWidth(0.5).strokeColor(PRIMARY).stroke()

    y += 22
    pdfDoc.fontSize(11).font("Helvetica-Bold").fillColor(DARK)
    pdfDoc.text(customerName, 50, y)
    y += 16

    if (companyName) {
      pdfDoc.fontSize(9).font("Helvetica").fillColor(GRAY)
      pdfDoc.text(companyName, 50, y)
      y += 14
    }

    if (address) {
      pdfDoc.fontSize(8).font("Helvetica").fillColor(LIGHT_GRAY)
      pdfDoc.text(address, 50, y, { width: 250 })
      y += 14
    }

    if (email) {
      pdfDoc.fontSize(8).font("Helvetica").fillColor(LIGHT_GRAY)
      pdfDoc.text(email, 50, y)
      y += 12
    }

    if (phone) {
      pdfDoc.fontSize(8).font("Helvetica").fillColor(LIGHT_GRAY)
      pdfDoc.text(`Ph: ${phone}`, 50, y)
      y += 18
    }

    // ── Items Table ──
    const tableTop = Math.max(y + 10, 285)
    const colWidths = [30, 120, 120, 55, 45, 65, 75] // S.No, Product, Spec, Qty, Unit, Rate, Amount
    const rowHeight = 24
    const tableWidth = colWidths.reduce((a, b) => a + b, 0)

    const headers = ["S.No", "Product", "Specification", "Qty", "Unit", "Rate (₹)", "Amount (₹)"]

    // Table header
    let x = 50
    pdfDoc.rect(x, tableTop, tableWidth, rowHeight).fill(TABLE_HEADER_BG)

    pdfDoc.fontSize(8).font("Helvetica-Bold").fillColor("#ffffff")
    let cx = x
    for (let i = 0; i < headers.length; i++) {
      pdfDoc.text(headers[i], cx + 4, tableTop + 7, { width: colWidths[i] - 8, align: "left" })
      cx += colWidths[i]
    }

    // Table rows
    let rowY = tableTop + rowHeight

    items.forEach((item, index) => {
      const qty = parseFloat(item.quantity) || 0
      const rate = parseFloat(item.rate) || 0
      const amount = qty * rate

      // Alternating row background
      if (index % 2 === 0) {
        pdfDoc.rect(x, rowY, tableWidth, rowHeight).fill(TABLE_ALT_BG)
      }

      // Row border
      pdfDoc.moveTo(x, rowY + rowHeight).lineTo(x + tableWidth, rowY + rowHeight).lineWidth(0.3).strokeColor(LINE_COLOR).stroke()

      const rowData = [
        `${index + 1}`,
        item.product,
        item.specification,
        item.quantity,
        item.unit,
        formatINR(rate),
        formatINR(amount),
      ]

      pdfDoc.fontSize(8).font("Helvetica").fillColor(DARK)
      let rx = x
      for (let i = 0; i < rowData.length; i++) {
        const align = i >= 5 ? "right" : i === 0 ? "center" : "left"
        const font = i >= 5 ? "Helvetica-Bold" : "Helvetica"
        pdfDoc.font(font).text(rowData[i], rx + 4, rowY + 8, { width: colWidths[i] - 8, align: align as any })
        rx += colWidths[i]
      }

      rowY += rowHeight
    })

    // ── Totals Section ──
    const totalsStart = rowY + 12

    pdfDoc.moveTo(x, totalsStart - 4).lineTo(x + tableWidth, totalsStart - 4).lineWidth(1).strokeColor(PRIMARY).stroke()

    // Subtotal
    pdfDoc.rect(x + 430, totalsStart, 210, 22).fill("#f8fffe")
    pdfDoc.fontSize(9).font("Helvetica").fillColor(GRAY)
    pdfDoc.text("Subtotal:", x + 434, totalsStart + 6, { width: 100, align: "left" })
    pdfDoc.fontSize(9).font("Helvetica-Bold").fillColor(AMOUNT_COLOR)
    pdfDoc.text(`₹ ${formatINR(subtotal)}`, x + 530, totalsStart + 6, { width: 108, align: "right" })

    // GST
    pdfDoc.rect(x + 430, totalsStart + 24, 210, 22).fill("#f8fffe")
    pdfDoc.fontSize(9).font("Helvetica").fillColor(GRAY)
    pdfDoc.text("GST (18%):", x + 434, totalsStart + 30, { width: 100, align: "left" })
    pdfDoc.fontSize(9).font("Helvetica-Bold").fillColor(AMOUNT_COLOR)
    pdfDoc.text(`₹ ${formatINR(gst)}`, x + 530, totalsStart + 30, { width: 108, align: "right" })

    // Grand Total
    pdfDoc.rect(x + 430, totalsStart + 48, 210, 26).fill(PRIMARY)
    pdfDoc.fontSize(10).font("Helvetica-Bold").fillColor("#ffffff")
    pdfDoc.text("Grand Total:", x + 434, totalsStart + 54, { width: 100, align: "left" })
    pdfDoc.text(`₹ ${formatINR(grandTotal)}`, x + 530, totalsStart + 54, { width: 108, align: "right" })

    // Amount in words
    pdfDoc.fontSize(8).font("Helvetica").fillColor(GRAY)
    pdfDoc.text(`Amount in Words: Rupees ${numberToWords(Math.round(grandTotal))} Only`, 50, totalsStart + 86, { width: contentWidth })

    // ── Notes Section ──
    let notesY = totalsStart + 106
    if (notes && notes.trim()) {
      pdfDoc.fontSize(9).font("Helvetica-Bold").fillColor(PRIMARY)
      pdfDoc.text("Notes:", 50, notesY)
      notesY += 14
      pdfDoc.fontSize(8).font("Helvetica").fillColor(GRAY)
      pdfDoc.text(notes, 50, notesY, { width: contentWidth })
      notesY += 20
    }

    // ── Footer / Terms ──
    const footerY = notesY + 10

    pdfDoc.moveTo(50, footerY).lineTo(pageWidth - 50, footerY).lineWidth(0.5).strokeColor(LINE_COLOR).stroke()

    pdfDoc.fontSize(7).font("Helvetica").fillColor(LIGHT_GRAY)
    pdfDoc.text("Terms & Conditions:", 50, footerY + 8)
    pdfDoc.text("1. Prices are ex-works Howrah. GST extra as applicable.", 50, footerY + 18)
    pdfDoc.text("2. Delivery within 48 hours of order confirmation, subject to availability.", 50, footerY + 28)
    pdfDoc.text("3. All disputes are subject to Howrah jurisdiction.", 50, footerY + 38)

    pdfDoc.moveDown(1)
    const finalY = footerY + 52

    // Authorized signatory line
    pdfDoc.moveTo(pageWidth - 200, finalY).lineTo(pageWidth - 50, finalY).lineWidth(0.5).strokeColor(DARK).stroke()
    pdfDoc.fontSize(8).font("Helvetica").fillColor(GRAY)
    pdfDoc.text("Authorized Signatory", pageWidth - 200, finalY + 6, { width: 150, align: "center" })

    // Disclaimer
    pdfDoc.fontSize(7).font("Helvetica").fillColor(LIGHT_GRAY)
    pdfDoc.text("This is a computer-generated quotation. Valid for 7 days from the date of issue.", 50, pageHeight(pdfDoc) - 50, { align: "center", width: contentWidth })

    // End the document
    pdfDoc.end()

    // Wait for all chunks to be collected
    await new Promise<void>((resolve) => {
      pdfDoc.on("end", () => resolve())
    })

    const pdfBuffer = Buffer.concat(chunks)

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="quotation-${quotationNumber}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Quotation generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate quotation PDF" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const quotations = await db.quotation.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        items: {
          orderBy: { sortOrder: "asc" },
        },
      },
    })

    const serialized = quotations.map((q) => ({
      ...q,
      createdAt: q.createdAt.toISOString(),
      updatedAt: q.updatedAt.toISOString(),
      items: q.items.map((item) => ({
        ...item,
      })),
    }))

    return NextResponse.json({ quotations: serialized })
  } catch (error) {
    console.error("Failed to fetch quotations:", error)
    return NextResponse.json(
      { error: "Failed to fetch quotations" },
      { status: 500 }
    )
  }
}

function pageHeight(doc: PDFDocument): number {
  return doc.page.height
}

function numberToWords(num: number): string {
  if (num === 0) return "Zero"

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"]
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]

  function convert(n: number): string {
    if (n < 20) return ones[n]
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + ones[n % 10] : "")
    if (n < 1000) return ones[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + convert(n % 100) : "")
    if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + convert(n % 1000) : "")
    if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 !== 0 ? " " + convert(n % 100000) : "")
    return convert(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 !== 0 ? " " + convert(n % 10000000) : "")
  }

  return convert(num)
}
