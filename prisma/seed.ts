import { db } from '../src/lib/db'

async function main() {
  // ── Seed Gallery Images ──
  const galleryData = [
    { title: 'Our Warehouse', description: 'Well-organized 10,000 sq.ft. warehouse in Howrah with ready stock', src: '/warehouse-interior.jpg', sortOrder: 0 },
    { title: 'Fast Delivery', description: 'Dedicated logistics for timely delivery across Eastern India', src: '/steel-delivery.jpg', sortOrder: 1 },
    { title: 'Steel Yard', description: 'Premium MS products from SAIL, TATA Steel, and other top manufacturers', src: '/steel-yard.jpg', sortOrder: 2 },
    { title: 'Project Supply', description: 'Bulk steel supply for large-scale construction projects', src: '/construction-site.jpg', sortOrder: 3 },
    { title: 'Quality Assurance', description: 'Every product inspected with mill test certificates', src: '/quality-control.jpg', sortOrder: 4 },
    { title: 'Product Range', description: 'Comprehensive range of MS sheets, plates, beams, channels, and more', src: '/ms-plate.jpg', sortOrder: 5 },
  ]

  for (const item of galleryData) {
    await db.galleryImage.upsert({
      where: { id: (galleryData.indexOf(item) + 1) },
      update: item,
      create: item,
    })
  }
  console.log(`✅ Seeded ${galleryData.length} gallery images`)

  // ── Seed Testimonials ──
  const testimonialsData = [
    { name: 'Rajesh Kumar', role: 'Project Head', company: 'Ganges Construction', location: 'Kolkata, WB', text: 'Omkara Commercial has been our go-to steel supplier for over 5 years. Their consistent quality and on-time delivery have been instrumental in keeping our projects on track.', rating: 5, sortOrder: 0 },
    { name: 'Anita Sharma', role: 'Purchase Manager', company: 'FabTech Industries', location: 'Jamshedpur, JH', text: 'Excellent service and competitive pricing. The team at Omkara understands our requirements perfectly and always delivers exactly what we need.', rating: 5, sortOrder: 1 },
    { name: 'Vikram Singh', role: 'Director', company: 'Singh Infrastructure', location: 'Patna, BR', text: 'We switched to Omkara Commercial two years ago and it was the best decision. Their dispatch times are unmatched and the mill test certificates give us complete peace of mind.', rating: 5, sortOrder: 2 },
    { name: 'Deepak Patel', role: 'Site Engineer', company: 'Patel Builders', location: 'Bhubaneswar, OD', text: 'Outstanding quality MS plates and beams. We have been sourcing from Omkara for our bridge and flyover projects. Highly recommended for bulk structural steel.', rating: 5, sortOrder: 3 },
    { name: 'Suman Ghosh', role: 'Proprietor', company: 'Ghosh Engineering Works', location: 'Howrah, WB', text: 'As a local fabricator, having Omkara just down the road is invaluable. Quick pickups, fair prices, and they always have stock of odd sizes that others do not carry.', rating: 4, sortOrder: 4 },
  ]

  for (const t of testimonialsData) {
    await db.testimonial.upsert({
      where: { id: (testimonialsData.indexOf(t) + 1) },
      update: t,
      create: t,
    })
  }
  console.log(`✅ Seeded ${testimonialsData.length} testimonials`)

  // ── Seed Steel Rates (today's fallback) ──
  const today = new Date().toISOString().split('T')[0]
  const existing = await db.steelRate.findFirst({ where: { date: today } })
  if (!existing) {
    const rates = [
      { product: 'MS Sheet (HR)', rangeLow: 52, rangeHigh: 58, trend: 'stable' },
      { product: 'MS Sheet (CR)', rangeLow: 56, rangeHigh: 62, trend: 'up' },
      { product: 'MS Plate', rangeLow: 50, rangeHigh: 56, trend: 'stable' },
      { product: 'MS Beam (ISMB)', rangeLow: 48, rangeHigh: 55, trend: 'down' },
      { product: 'MS Channel', rangeLow: 50, rangeHigh: 56, trend: 'stable' },
      { product: 'MS Angle', rangeLow: 49, rangeHigh: 55, trend: 'up' },
      { product: 'MS Round Bar', rangeLow: 51, rangeHigh: 57, trend: 'stable' },
      { product: 'MS Hollow Pipe', rangeLow: 55, rangeHigh: 62, trend: 'up' },
    ]
    for (const r of rates) {
      await db.steelRate.create({ data: { ...r, date: today, source: 'manual' } })
    }
    console.log(`✅ Seeded ${rates.length} steel rates for ${today}`)
  } else {
    console.log(`ℹ️ Steel rates already exist for ${today}`)
  }
}

main()
  .then(() => { console.log('\n✅ Seed complete'); process.exit(0) })
  .catch((e) => { console.error('Seed error:', e); process.exit(1) })