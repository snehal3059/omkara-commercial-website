# Task 8 — Dynamic Data Fetching for Gallery & Testimonials

**Agent**: full-stack-developer
**Date**: 2025-01-01

## Summary
Updated two frontend components (`GallerySection.tsx` and `HomeSection.tsx`) to fetch data from database-backed API routes instead of using hardcoded arrays.

## Changes

### GallerySection.tsx
- Removed hardcoded `galleryItems` array
- Added `GalleryItem` interface
- Added state: `galleryItems`, `isLoading`, `hasError`
- Added `useEffect` fetching from `/api/gallery` with cancellation guard
- Skeleton loading grid (6 items, first spans 2 cols)
- Error fallback message
- Empty state handling
- Updated `goToPrev`/`goToNext` with `galleryItems.length` dependency
- All lightbox/keyboard/hover logic preserved

### HomeSection.tsx
- Removed hardcoded `testimonials` array
- Added `TestimonialItem` interface
- Added state: `testimonials`, `testimonialsLoading`
- Added `useEffect` fetching from `/api/testimonials` with cancellation guard
- Fallback to empty array on error
- Skeleton loading placeholder in carousel
- Updated carousel callbacks with `Math.max(testimonials.length, 1)` for safety
- Auto-rotation stops when no testimonials
- Dot indicators conditionally rendered
- All carousel logic preserved

## Verification
- `bun run lint` passes with zero errors
- No other files modified
