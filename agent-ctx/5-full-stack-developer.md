# Task 5 — Quotation API DB Persistence

## Agent: full-stack-developer

## Summary
Updated `/api/quotation/route.ts` to save every generated quotation to SQLite via Prisma before generating the PDF. Added a new GET endpoint for retrieving all saved quotations.

## Changes

### POST handler
- Added `import { db } from "@/lib/db"`
- Extracted `subtotal`, `gst`, `grandTotal` calculation before PDF generation (using `items.reduce()`)
- Added `db.quotation.create()` with nested `items.create[]` wrapped in try-catch
- If DB save fails, PDF generation still proceeds (non-blocking)
- All existing PDF generation logic preserved exactly

### GET handler (new)
- Returns `{ quotations: [...] }` — up to 50 records ordered by `createdAt desc`
- Includes all `QuotationItem` records per quotation (ordered by `sortOrder asc`)
- Serializes `createdAt`/`updatedAt` as ISO strings

## Verification
- ESLint: 0 errors
- No schema changes needed (Quotation + QuotationItem models already existed)