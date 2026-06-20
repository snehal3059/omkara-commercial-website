export interface ProductData {
  title: string
  category: string
  categoryName: string
  description: string
  specifications: { key: string; value: string }[]
  pdfUrl?: string
}

export const products: Record<string, ProductData> = {
  "cr-sheet-0-5mm": {
    title: "CR Sheet 0.5mm (DQ Grade)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Cold rolled mild steel sheet manufactured to IS 513 DQ grade. Offers excellent surface finish, tight dimensional tolerances, and superior flatness. Ideal for automotive panels, light engineering, and general fabrication where precise surface quality is critical.",
    specifications: [
      { key: "Thickness", value: "0.5mm (0.45 - 0.55mm)" }, { key: "Width", value: "900mm - 1250mm" },
      { key: "Length", value: "2000mm - 3000mm" }, { key: "Grade", value: "IS 513 DQ" },
      { key: "Surface", value: "Bright / Matt Finish" }, { key: "Coil Weight", value: "5 - 10 MT" },
    ],
  },
  "cr-sheet-1mm": {
    title: "CR Sheet 1mm (DD Grade)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Deep drawing quality cold rolled sheet per IS 513 DD grade. Excellent drawability for press-formed components, enclosures, and deep-drawn parts. Consistent mechanical properties across the coil.",
    specifications: [
      { key: "Thickness", value: "1mm (0.90 - 1.10mm)" }, { key: "Width", value: "900mm - 1500mm" },
      { key: "Length", value: "2000mm - 3000mm" }, { key: "Grade", value: "IS 513 DD" },
      { key: "Yield Strength", value: "140 - 280 MPa" }, { key: "Tensile Strength", value: "270 - 410 MPa" },
    ],
  },
  "cr-sheet-1-5mm": {
    title: "CR Sheet 1.5mm (EDD Grade)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Extra deep drawing quality cold rolled steel to IS 513 EDD grade. Highest formability for complex automotive stampings, household appliance panels, and intricate press-work components.",
    specifications: [
      { key: "Thickness", value: "1.5mm (1.40 - 1.60mm)" }, { key: "Width", value: "900mm - 1500mm" },
      { key: "Length", value: "2000mm - 3000mm" }, { key: "Grade", value: "IS 513 EDD" },
      { key: "Elongation", value: "Min 38%" }, { key: "R Value", value: "Min 1.5" },
    ],
  },
  "cr-sheet-2mm": {
    title: "CR Sheet 2mm (DQ Grade)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Cold rolled sheet in 2mm thickness with DQ grade. Suitable for general fabrication, engineering components, and structural parts requiring good surface finish and dimensional precision.",
    specifications: [
      { key: "Thickness", value: "2mm (1.80 - 2.20mm)" }, { key: "Width", value: "1000mm - 1500mm" },
      { key: "Length", value: "2000mm - 4000mm" }, { key: "Grade", value: "IS 513 DQ" },
      { key: "Yield Strength", value: "170 - 330 MPa" }, { key: "Elongation", value: "Min 30%" },
    ],
  },
  "hr-sheet-2-5mm": {
    title: "HR Sheet 2.5mm (E250)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Hot rolled sheet per IS 2062 E250 grade. Ideal for structural applications, general fabrication, and heavy machinery enclosures. Cost-effective solution for non-critical structural parts.",
    specifications: [
      { key: "Thickness", value: "2.5mm (2.30 - 2.70mm)" }, { key: "Width", value: "1000mm - 2000mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E250" },
      { key: "Yield Strength", value: "Min 250 MPa" }, { key: "Tensile Strength", value: "410 MPa" },
    ],
  },
  "hr-sheet-3mm": {
    title: "HR Sheet 3mm (E350)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "High-strength hot rolled steel sheet to IS 2062 E350 grade. Offers superior strength for demanding industrial applications including heavy equipment, pressure vessels, and load-bearing structures.",
    specifications: [
      { key: "Thickness", value: "3mm (2.70 - 3.30mm)" }, { key: "Width", value: "1000mm - 2000mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E350" },
      { key: "Yield Strength", value: "Min 350 MPa" }, { key: "Elongation", value: "Min 23%" },
    ],
  },
  "hr-sheet-4mm": {
    title: "HR Sheet 4mm (E250)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Hot rolled sheet 4mm thick in E250 grade. Commonly used for structural fabrication, industrial flooring, and general engineering. Good weldability and formability.",
    specifications: [
      { key: "Thickness", value: "4mm (3.60 - 4.40mm)" }, { key: "Width", value: "1000mm - 2500mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E250" },
      { key: "Surface", value: "Hot Rolled / Pickled & Oiled" }, { key: "Elongation", value: "Min 28%" },
    ],
  },
  "hr-sheet-5mm": {
    title: "HR Sheet 5mm (E350)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Heavy-duty hot rolled sheet in E350 grade. Designed for high-stress applications including heavy machinery, earthmoving equipment, and industrial structures.",
    specifications: [
      { key: "Thickness", value: "5mm (4.50 - 5.50mm)" }, { key: "Width", value: "1000mm - 2500mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E350" },
      { key: "Carbon Equivalent", value: "Max 0.45%" }, { key: "Surface", value: "Hot Rolled" },
    ],
  },
  "hr-sheet-6mm": {
    title: "HR Sheet 6mm (E410)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Extra-thick hot rolled high-strength sheet per IS 2062 E410. Used in heavy structural applications, bridges, cranes, and offshore platforms requiring superior strength.",
    specifications: [
      { key: "Thickness", value: "6mm (5.50 - 6.50mm)" }, { key: "Width", value: "1000mm - 2500mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E410" },
      { key: "Yield Strength", value: "Min 410 MPa" }, { key: "Tensile Strength", value: "540 - 680 MPa" },
    ],
  },
  "chequered-plate-3mm": {
    title: "Chequered Plate 3mm (E250)", category: "ms-sheet", categoryName: "MS Sheet",
    description: "Patterned anti-skid floor plate with raised chequer pattern. Ideal for industrial flooring, walkways, stair treads, and platforms where slip resistance is essential.",
    specifications: [
      { key: "Thickness", value: "3mm (base) + 1.2mm (pattern)" }, { key: "Width", value: "1000mm - 1500mm" },
      { key: "Length", value: "2000mm - 6000mm" }, { key: "Grade", value: "IS 2062 E250" },
      { key: "Pattern Height", value: "1.2mm - 1.5mm" }, { key: "Pattern Type", value: "Lentil / Diamond" },
    ],
  },

  "ms-plate-6mm": {
    title: "MS Plate 6mm (E250)", category: "ms-plate", categoryName: "MS Plate",
    description: "Light-duty MS plate per IS 2062 E250 grade. Suitable for light structural fabrication, gussets, brackets, and general engineering applications requiring flat stock.",
    specifications: [
      { key: "Thickness", value: "6mm (5.50 - 6.50mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E250" },
      { key: "Weight", value: "47.1 kg/m\u00b2" }, { key: "Elongation", value: "Min 28%" },
    ],
  },
  "ms-plate-8mm": {
    title: "MS Plate 8mm (E350)", category: "ms-plate", categoryName: "MS Plate",
    description: "Medium-duty structural plate in E350 grade. Used for structural supports, machine frames, and medium-load applications where higher strength is needed.",
    specifications: [
      { key: "Thickness", value: "8mm (7.50 - 8.50mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E350" },
      { key: "Weight", value: "62.8 kg/m\u00b2" }, { key: "Yield Strength", value: "Min 350 MPa" },
    ],
  },
  "ms-plate-10mm": {
    title: "MS Plate 10mm (E250)", category: "ms-plate", categoryName: "MS Plate",
    description: "Standard structural plate for building frames, machinery bases, and general structural applications. Good weldability and formability with reliable strength.",
    specifications: [
      { key: "Thickness", value: "10mm (9.00 - 11.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E250" },
      { key: "Weight", value: "78.5 kg/m\u00b2" }, { key: "Carbon Content", value: "Max 0.23%" },
    ],
  },
  "ms-plate-12mm": {
    title: "MS Plate 12mm (E350)", category: "ms-plate", categoryName: "MS Plate",
    description: "Industrial plate for heavy equipment bases, load-bearing structures, and medium-duty bridges. Higher strength allows for optimized design and reduced weight.",
    specifications: [
      { key: "Thickness", value: "12mm (11.00 - 13.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E350" },
      { key: "Weight", value: "94.2 kg/m\u00b2" }, { key: "Tensile Strength", value: "490 - 630 MPa" },
    ],
  },
  "ms-plate-16mm": {
    title: "MS Plate 16mm (E410)", category: "ms-plate", categoryName: "MS Plate",
    description: "Heavy plate for bridges, cranes, pressure vessels, and earthmoving equipment. High-strength E410 grade ensures superior load capacity and durability.",
    specifications: [
      { key: "Thickness", value: "16mm (15.00 - 17.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E410" },
      { key: "Weight", value: "125.6 kg/m\u00b2" }, { key: "Impact Test", value: "27J @ 0\u00b0C" },
    ],
  },
  "ms-plate-20mm": {
    title: "MS Plate 20mm (E350)", category: "ms-plate", categoryName: "MS Plate",
    description: "Extra-heavy plate for large structural projects, transmission towers, and offshore platforms. High strength with excellent through-thickness properties.",
    specifications: [
      { key: "Thickness", value: "20mm (18.00 - 22.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E350" },
      { key: "Weight", value: "157.0 kg/m\u00b2" }, { key: "Elongation", value: "Min 23%" },
    ],
  },
  "ms-plate-25mm": {
    title: "MS Plate 25mm (E410)", category: "ms-plate", categoryName: "MS Plate",
    description: "Heavy-gauge plate for shipbuilding, heavy machinery, and mining equipment. High-strength E410 grade ensures exceptional durability under extreme loads.",
    specifications: [
      { key: "Thickness", value: "25mm (23.00 - 27.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E410" },
      { key: "Weight", value: "196.3 kg/m\u00b2" }, { key: "Yield Strength", value: "Min 410 MPa" },
    ],
  },
  "ms-plate-32mm": {
    title: "MS Plate 32mm (E450)", category: "ms-plate", categoryName: "MS Plate",
    description: "Ultra-heavy plate for heavy engineering, mining, and defence applications. Premium E450 grade delivers maximum strength for the most demanding structural requirements.",
    specifications: [
      { key: "Thickness", value: "32mm (29.00 - 35.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E450" },
      { key: "Weight", value: "251.2 kg/m\u00b2" }, { key: "Carbon Equivalent", value: "Max 0.47%" },
    ],
  },
  "ms-plate-40mm": {
    title: "MS Plate 40mm (E410)", category: "ms-plate", categoryName: "MS Plate",
    description: "Industrial jumbo plate for heavy presses, structural columns, and large-scale fabrication. Superior flatness and dimensional consistency for precision engineering.",
    specifications: [
      { key: "Thickness", value: "40mm (37.00 - 43.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E410" },
      { key: "Weight", value: "314.0 kg/m\u00b2" }, { key: "UT Certification", value: "Available" },
    ],
  },
  "ms-plate-50mm": {
    title: "MS Plate 50mm (E450)", category: "ms-plate", categoryName: "MS Plate",
    description: "Extra-jumbo plate for large-scale infrastructure, defence projects, and heavy engineering. The thickest plate in our range with full traceability and mill certification.",
    specifications: [
      { key: "Thickness", value: "50mm (46.00 - 54.00mm)" }, { key: "Width", value: "1500mm - 3000mm" },
      { key: "Length", value: "3000mm - 12000mm" }, { key: "Grade", value: "IS 2062 E450" },
      { key: "Weight", value: "392.5 kg/m\u00b2" }, { key: "Heat Number", value: "Traceable" },
    ],
  },

  "ismb-100x50": {
    title: "ISMB 100x50 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Light I-beam section for residential building frames, small sheds, and light structural applications.",
    specifications: [
      { key: "Section", value: "100 x 50mm" }, { key: "Weight", value: "8.9 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "42.0 cm\u00b3" },
    ],
  },
  "ismb-125x70": {
    title: "ISMB 125x70 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Medium I-beam for mezzanine floors, light industrial sheds, and residential/commercial buildings.",
    specifications: [
      { key: "Section", value: "125 x 70mm" }, { key: "Weight", value: "12.2 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "72.5 cm\u00b3" },
    ],
  },
  "ismb-150x75": {
    title: "ISMB 150x75 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Standard I-beam for building frames, support columns, and general structural steelwork. One of the most widely used sections in construction.",
    specifications: [
      { key: "Section", value: "150 x 75mm" }, { key: "Weight", value: "14.9 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808 / IS 2062" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "114.6 cm\u00b3" },
    ],
  },
  "ismb-175x85": {
    title: "ISMB 175x85 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Heavy I-beam for multi-storey buildings, bridges, and heavy industrial structures.",
    specifications: [
      { key: "Section", value: "175 x 85mm" }, { key: "Weight", value: "19.3 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "176.0 cm\u00b3" },
    ],
  },
  "ismb-200x100": {
    title: "ISMB 200x100 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Structural I-beam for industrial sheds, flyovers, and large commercial buildings.",
    specifications: [
      { key: "Section", value: "200 x 100mm" }, { key: "Weight", value: "21.3 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "226.8 cm\u00b3" },
    ],
  },
  "ismb-225x110": {
    title: "ISMB 225x110 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Extra-heavy beam for high-rise construction, crane gantries, and heavy-load applications.",
    specifications: [
      { key: "Section", value: "225 x 110mm" }, { key: "Weight", value: "26.9 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "315.0 cm\u00b3" },
    ],
  },
  "ismb-250x125": {
    title: "ISMB 250x125 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Large I-beam for factories, warehouses, stadiums, and infrastructure projects.",
    specifications: [
      { key: "Section", value: "250 x 125mm" }, { key: "Weight", value: "37.3 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "587.0 cm\u00b3" },
    ],
  },
  "ismb-300x140": {
    title: "ISMB 300x140 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Jumbo beam for large-span roofs, heavy industrial plants, and major infrastructure.",
    specifications: [
      { key: "Section", value: "300 x 140mm" }, { key: "Weight", value: "46.1 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "879.0 cm\u00b3" },
    ],
  },
  "ismb-350x140": {
    title: "ISMB 350x140 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Heavy jumbo beam for bridges, flyovers, and large-scale infrastructure. Maximum strength for the most demanding structural steel requirements.",
    specifications: [
      { key: "Section", value: "350 x 140mm" }, { key: "Weight", value: "52.4 kg/m" },
      { key: "Grade", value: "IS 2062 E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "1198.0 cm\u00b3" },
    ],
  },
  "ismb-400x140": {
    title: "ISMB 400x140 Beam", category: "ms-beam", categoryName: "MS Beam",
    description: "Extra-jumbo beam for mega projects, port structures, and heavy industrial complexes. The largest standard I-beam section in our range.",
    specifications: [
      { key: "Section", value: "400 x 140mm" }, { key: "Weight", value: "61.6 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / E450" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "1556.0 cm\u00b3" },
    ],
  },

  "ismc-75x40": {
    title: "ISMC 75x40 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Light channel section for cable trays, light structural framing, and secondary supports.",
    specifications: [
      { key: "Section", value: "75 x 40mm" }, { key: "Weight", value: "7.14 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "28.8 cm\u00b3" },
    ],
  },
  "ismc-100x50": {
    title: "ISMC 100x50 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Standard channel for roof purlins, structural supports, and building frames.",
    specifications: [
      { key: "Section", value: "100 x 50mm" }, { key: "Weight", value: "9.56 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "52.4 cm\u00b3" },
    ],
  },
  "ismc-125x65": {
    title: "ISMC 125x65 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Medium channel for mezzanine floors, building frames, and structural steelwork.",
    specifications: [
      { key: "Section", value: "125 x 65mm" }, { key: "Weight", value: "13.1 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "93.5 cm\u00b3" },
    ],
  },
  "ismc-150x75": {
    title: "ISMC 150x75 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Heavy channel for bridge girders, industrial structures, and crane rails.",
    specifications: [
      { key: "Section", value: "150 x 75mm" }, { key: "Weight", value: "16.2 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "145.0 cm\u00b3" },
    ],
  },
  "ismc-175x75": {
    title: "ISMC 175x75 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Extra-heavy channel for transmission towers, heavy framing, and industrial plant structures.",
    specifications: [
      { key: "Section", value: "175 x 75mm" }, { key: "Weight", value: "19.3 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "198.0 cm\u00b3" },
    ],
  },
  "ismc-200x75": {
    title: "ISMC 200x75 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Structural channel for heavy machinery foundations, plant structures, and heavy-load applications.",
    specifications: [
      { key: "Section", value: "200 x 75mm" }, { key: "Weight", value: "22.3 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "253.0 cm\u00b3" },
    ],
  },
  "ismc-225x80": {
    title: "ISMC 225x80 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Large channel for infrastructure projects, heavy-duty racking, and structural frames.",
    specifications: [
      { key: "Section", value: "225 x 80mm" }, { key: "Weight", value: "26.9 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "338.0 cm\u00b3" },
    ],
  },
  "ismc-250x80": {
    title: "ISMC 250x80 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Jumbo channel for bridges, docks, heavy construction, and large-scale industrial applications.",
    specifications: [
      { key: "Section", value: "250 x 80mm" }, { key: "Weight", value: "30.5 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410 / E450" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "415.0 cm\u00b3" },
    ],
  },
  "ismc-300x90": {
    title: "ISMC 300x90 Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Extra-jumbo channel for the largest industrial projects, heavy plant structures, and critical infrastructure.",
    specifications: [
      { key: "Section", value: "300 x 90mm" }, { key: "Weight", value: "36.3 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / E450" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "537.0 cm\u00b3" },
    ],
  },
  "mc-100x50-light": {
    title: "MC 100x50 Light Channel", category: "ms-channel", categoryName: "MS Channel",
    description: "Lightweight channel section for prefab structures, false ceilings, and lightweight framing.",
    specifications: [
      { key: "Section", value: "100 x 50mm" }, { key: "Weight", value: "6.8 kg/m" },
      { key: "Grade", value: "IS 2062 E250" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 10m" }, { key: "Thickness", value: "4.0mm" },
    ],
  },

  "equal-angle-25x25": {
    title: "Equal Angle 25x25x3mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Light equal angle for gates, grills, window frames, and light fabrication.",
    specifications: [
      { key: "Section", value: "25 x 25 x 3mm" }, { key: "Weight", value: "1.12 kg/m" },
      { key: "Grade", value: "IS 2062 E250" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Surface", value: "Black / Bright" },
    ],
  },
  "equal-angle-30x30": {
    title: "Equal Angle 30x30x3mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Small angle for brackets, light supports, railing frames, and general fabrication.",
    specifications: [
      { key: "Section", value: "30 x 30 x 3mm" }, { key: "Weight", value: "1.36 kg/m" },
      { key: "Grade", value: "IS 2062 E250" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Tolerances", value: "IS 1852" },
    ],
  },
  "equal-angle-40x40": {
    title: "Equal Angle 40x40x5mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Medium angle for structural frames, towers, and general construction.",
    specifications: [
      { key: "Section", value: "40 x 40 x 5mm" }, { key: "Weight", value: "2.97 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Elongation", value: "Min 28%" },
    ],
  },
  "equal-angle-45x45": {
    title: "Equal Angle 45x45x5mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Standard angle for building frames, rack structures, and support brackets.",
    specifications: [
      { key: "Section", value: "45 x 45 x 5mm" }, { key: "Weight", value: "3.38 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Yield Strength", value: "Min 250 MPa" },
    ],
  },
  "equal-angle-50x50": {
    title: "Equal Angle 50x50x5mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Multi-purpose equal angle for structural, fabrication, and general construction work.",
    specifications: [
      { key: "Section", value: "50 x 50 x 5mm" }, { key: "Weight", value: "3.77 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Tensile Strength", value: "410 - 540 MPa" },
    ],
  },
  "equal-angle-55x55": {
    title: "Equal Angle 55x55x6mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Heavy angle for transmission towers, industrial sheds, and heavy structural frames.",
    specifications: [
      { key: "Section", value: "55 x 55 x 6mm" }, { key: "Weight", value: "5.05 kg/m" },
      { key: "Grade", value: "IS 2062 E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "7.92 cm\u00b3" },
    ],
  },
  "equal-angle-60x60": {
    title: "Equal Angle 60x60x6mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Structural angle for bridges, trusses, heavy frames, and industrial construction.",
    specifications: [
      { key: "Section", value: "60 x 60 x 6mm" }, { key: "Weight", value: "5.52 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Carbon Content", value: "Max 0.23%" },
    ],
  },
  "equal-angle-65x65": {
    title: "Equal Angle 65x65x6mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Extra-heavy angle for heavy structural applications, industrial plant structures, and large fabrication works.",
    specifications: [
      { key: "Section", value: "65 x 65 x 6mm" }, { key: "Weight", value: "6.01 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Elongation", value: "Min 23%" },
    ],
  },
  "equal-angle-75x75": {
    title: "Equal Angle 75x75x6mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Heavy-duty angle for towers, cranes, heavy equipment, and infrastructure projects.",
    specifications: [
      { key: "Section", value: "75 x 75 x 6mm" }, { key: "Weight", value: "6.78 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "13.15 cm\u00b3" },
    ],
  },
  "equal-angle-80x80": {
    title: "Equal Angle 80x80x8mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Jumbo angle for large infrastructure, industrial frames, and heavy construction.",
    specifications: [
      { key: "Section", value: "80 x 80 x 8mm" }, { key: "Weight", value: "9.61 kg/m" },
      { key: "Grade", value: "IS 2062 E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Yield Strength", value: "Min 410 MPa" },
    ],
  },
  "equal-angle-90x90": {
    title: "Equal Angle 90x90x8mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Extra-jumbo angle for heavy bridges, port structures, and large-scale infrastructure.",
    specifications: [
      { key: "Section", value: "90 x 90 x 8mm" }, { key: "Weight", value: "10.88 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / E450" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "UT Certification", value: "Available" },
    ],
  },
  "equal-angle-100x100": {
    title: "Equal Angle 100x100x10mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Ultra-heavy angle for mega construction, defence projects, and extreme heavy engineering.",
    specifications: [
      { key: "Section", value: "100 x 100 x 10mm" }, { key: "Weight", value: "15.0 kg/m" },
      { key: "Grade", value: "IS 2062 E450" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Heat Number", value: "Fully Traceable" },
    ],
  },
  "unequal-angle-75x50": {
    title: "Unequal Angle 75x50x6mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Unequal leg angle for specialized structural and fabrication applications.",
    specifications: [
      { key: "Section", value: "75 x 50 x 6mm" }, { key: "Weight", value: "5.65 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Application", value: "Asymmetric loads" },
    ],
  },
  "unequal-angle-100x75": {
    title: "Unequal Angle 100x75x8mm", category: "ms-angle", categoryName: "MS Angle",
    description: "Heavy unequal angle for asymmetrical load-bearing structures, special frames, and customized structural steelwork.",
    specifications: [
      { key: "Section", value: "100 x 75 x 8mm" }, { key: "Weight", value: "10.4 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410" }, { key: "Standard", value: "IS 808" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "27.8 cm\u00b3 (X-X)" },
    ],
  },

  "ms-round-6mm": {
    title: "MS Round Bar 6mm", category: "ms-round", categoryName: "MS Round",
    description: "Thin round bar for pins, rivets, light machining, and small fasteners.",
    specifications: [
      { key: "Diameter", value: "6mm" }, { key: "Weight", value: "0.22 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / EN8" }, { key: "Finish", value: "Bright / Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Tolerance", value: "IS 1852" },
    ],
  },
  "ms-round-8mm": {
    title: "MS Round Bar 8mm", category: "ms-round", categoryName: "MS Round",
    description: "Small diameter bar for bolts, studs, general fasteners, and light engineering works.",
    specifications: [
      { key: "Diameter", value: "8mm" }, { key: "Weight", value: "0.39 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / EN8" }, { key: "Finish", value: "Bright / Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Tensile Strength", value: "410 MPa" },
    ],
  },
  "ms-round-10mm": {
    title: "MS Round Bar 10mm", category: "ms-round", categoryName: "MS Round",
    description: "Standard round bar for shafts, axles, engineering components, and general machining.",
    specifications: [
      { key: "Diameter", value: "10mm" }, { key: "Weight", value: "0.62 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / EN8 / EN9" }, { key: "Finish", value: "Bright / Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Yield Strength", value: "Min 250 MPa" },
    ],
  },
  "ms-round-12mm": {
    title: "MS Round Bar 12mm", category: "ms-round", categoryName: "MS Round",
    description: "Medium round for machine components, structural ties, dowels, and turned parts.",
    specifications: [
      { key: "Diameter", value: "12mm" }, { key: "Weight", value: "0.89 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / EN8 / EN9" }, { key: "Finish", value: "Bright / Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Elongation", value: "Min 28%" },
    ],
  },
  "ms-round-16mm": {
    title: "MS Round Bar 16mm", category: "ms-round", categoryName: "MS Round",
    description: "Industrial round for forging, coupling, heavy machining, and structural applications.",
    specifications: [
      { key: "Diameter", value: "16mm" }, { key: "Weight", value: "1.58 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350 / EN8" }, { key: "Finish", value: "Black / Bright" },
      { key: "Length", value: "3m - 6m" }, { key: "Tensile Strength", value: "490 - 630 MPa" },
    ],
  },
  "ms-round-20mm": {
    title: "MS Round Bar 20mm", category: "ms-round", categoryName: "MS Round",
    description: "Heavy round for large shafts, rollers, structural components, and heavy machining.",
    specifications: [
      { key: "Diameter", value: "20mm" }, { key: "Weight", value: "2.47 kg/m" },
      { key: "Grade", value: "IS 2062 E250 / E350 / EN8 / EN9" }, { key: "Finish", value: "Black / Bright" },
      { key: "Length", value: "3m - 6m" }, { key: "Surface", value: "Ground / Turned" },
    ],
  },
  "ms-round-25mm": {
    title: "MS Round Bar 25mm", category: "ms-round", categoryName: "MS Round",
    description: "Thick round for heavy forging, anchors, stabilizers, and large engineering components.",
    specifications: [
      { key: "Diameter", value: "25mm" }, { key: "Weight", value: "3.85 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black / Bright" },
      { key: "Length", value: "3m - 6m" }, { key: "Carbon Content", value: "0.15 - 0.45%" },
    ],
  },
  "ms-round-32mm": {
    title: "MS Round Bar 32mm", category: "ms-round", categoryName: "MS Round",
    description: "Extra-heavy round for heavy machinery, marine applications, and large structural parts.",
    specifications: [
      { key: "Diameter", value: "32mm" }, { key: "Weight", value: "6.31 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Yield Strength", value: "Min 350 MPa" },
    ],
  },
  "ms-round-36mm": {
    title: "MS Round Bar 36mm", category: "ms-round", categoryName: "MS Round",
    description: "Jumbo round for large-scale engineering, structural supports, and heavy industrial components.",
    specifications: [
      { key: "Diameter", value: "36mm" }, { key: "Weight", value: "7.99 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Tensile Strength", value: "540 - 680 MPa" },
    ],
  },
  "ms-round-40mm": {
    title: "MS Round Bar 40mm", category: "ms-round", categoryName: "MS Round",
    description: "Ultra-heavy round for presses, rams, heavy equipment shafts, and large forgings.",
    specifications: [
      { key: "Diameter", value: "40mm" }, { key: "Weight", value: "9.86 kg/m" },
      { key: "Grade", value: "IS 2062 E350 / E410 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black" },
      { key: "Length", value: "3m - 6m" }, { key: "UT Certification", value: "Available" },
    ],
  },
  "ms-round-50mm": {
    title: "MS Round Bar 50mm", category: "ms-round", categoryName: "MS Round",
    description: "Extra-jumbo round for hydraulic cylinders, heavy shafts, large forgings, and marine applications.",
    specifications: [
      { key: "Diameter", value: "50mm" }, { key: "Weight", value: "15.42 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black / Forged" },
      { key: "Length", value: "3m - 6m" }, { key: "Hardness", value: "As rolled / Normalized" },
    ],
  },
  "ms-round-60mm": {
    title: "MS Round Bar 60mm", category: "ms-round", categoryName: "MS Round",
    description: "Super-heavy round for industrial rollers, large forgings, and heavy engineering.",
    specifications: [
      { key: "Diameter", value: "60mm" }, { key: "Weight", value: "22.2 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / EN8 / EN9 / EN19" }, { key: "Finish", value: "Black" },
      { key: "Length", value: "3m - 6m" }, { key: "Heat Number Traceability", value: "Available" },
    ],
  },
  "ms-round-75mm": {
    title: "MS Round Bar 75mm", category: "ms-round", categoryName: "MS Round",
    description: "Massive round for naval, defence, and heavy infrastructure applications.",
    specifications: [
      { key: "Diameter", value: "75mm" }, { key: "Weight", value: "34.7 kg/m" },
      { key: "Grade", value: "IS 2062 E410 / E450 / EN19" }, { key: "Finish", value: "Black / Forged" },
      { key: "Length", value: "3m - 6m" }, { key: "Mill Certification", value: "Available" },
    ],
  },
  "ms-round-100mm": {
    title: "MS Round Bar 100mm", category: "ms-round", categoryName: "MS Round",
    description: "Jumbo round for heavy engineering, mega infrastructure projects, and defence applications.",
    specifications: [
      { key: "Diameter", value: "100mm" }, { key: "Weight", value: "61.7 kg/m" },
      { key: "Grade", value: "IS 2062 E450 / EN19 / EN24" }, { key: "Finish", value: "Black / Forged" },
      { key: "Length", value: "3m - 6m" }, { key: "Full Traceability", value: "Mill TC Available" },
    ],
  },

  "gp-pipe-half-inch": {
    title: "GP Pipe 1/2 inch Medium", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Light galvanized pipe for handrails, furniture, small plumbing, and electrical conduits.",
    specifications: [
      { key: "Size", value: "1/2 inch (15mm NB)" }, { key: "Thickness", value: "2.65mm (Medium)" },
      { key: "Grade", value: "IS 1239" }, { key: "Type", value: "Galvanized (GP)" },
      { key: "Length", value: "6m" }, { key: "Threading", value: "Both ends threaded / Plain" },
    ],
  },
  "gp-pipe-3quarter-inch": {
    title: "GP Pipe 3/4 inch Medium", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Standard galvanized pipe for domestic plumbing, water supply lines, and light structural handrails.",
    specifications: [
      { key: "Size", value: "3/4 inch (20mm NB)" }, { key: "Thickness", value: "2.65mm (Medium)" },
      { key: "Grade", value: "IS 1239" }, { key: "Type", value: "Galvanized (GP)" },
      { key: "Length", value: "6m" }, { key: "Test Pressure", value: "5 kg/cm\u00b2" },
    ],
  },
  "gp-pipe-1inch": {
    title: "GP Pipe 1 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Heavy-duty galvanized pipe for water lines, structural handrails, scaffolding, and industrial applications.",
    specifications: [
      { key: "Size", value: "1 inch (25mm NB)" }, { key: "Thickness", value: "3.25mm (Heavy)" },
      { key: "Grade", value: "IS 1239" }, { key: "Type", value: "Galvanized (GP)" },
      { key: "Length", value: "6m" }, { key: "Weight", value: "2.49 kg/m" },
    ],
  },
  "gp-pipe-1-25inch": {
    title: "GP Pipe 1.25 inch Medium", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Medium galvanized pipe for garden watering, light structural use, and industrial fluid handling.",
    specifications: [
      { key: "Size", value: "1.25 inch (32mm NB)" }, { key: "Thickness", value: "3.25mm (Medium)" },
      { key: "Grade", value: "IS 1239" }, { key: "Type", value: "Galvanized (GP)" },
      { key: "Length", value: "6m" }, { key: "Surface", value: "Hot Dip Galvanized" },
    ],
  },
  "gp-pipe-1-5inch": {
    title: "GP Pipe 1.5 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Heavy-duty galvanized pipe for scaffolding, water mains, and industrial applications.",
    specifications: [
      { key: "Size", value: "1.5 inch (40mm NB)" }, { key: "Thickness", value: "3.25mm (Heavy)" },
      { key: "Grade", value: "IS 1239" }, { key: "Type", value: "Galvanized (GP)" },
      { key: "Length", value: "6m" }, { key: "Weight", value: "3.55 kg/m" },
    ],
  },
  "erw-pipe-2inch": {
    title: "ERW Pipe 2 inch Medium", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "ERW steel pipe for plumbing, scaffolding, structural columns, and general piping.",
    specifications: [
      { key: "Size", value: "2 inch (50mm NB)" }, { key: "Thickness", value: "3.25mm / 4.0mm" },
      { key: "Grade", value: "IS 1239 / IS 1161" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Ends", value: "Plain / Beveled / Threaded" },
    ],
  },
  "erw-pipe-2-5inch": {
    title: "ERW Pipe 2.5 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Heavy ERW pipe for industrial water supply, structural applications, and high-pressure lines.",
    specifications: [
      { key: "Size", value: "2.5 inch (65mm NB)" }, { key: "Thickness", value: "4.0mm / 5.0mm" },
      { key: "Grade", value: "IS 1161 / IS 3589" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Test Pressure", value: "15 kg/cm\u00b2" },
    ],
  },
  "erw-pipe-3inch": {
    title: "ERW Pipe 3 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Large ERW pipe for fire mains, piling, heavy structures, and industrial piping systems.",
    specifications: [
      { key: "Size", value: "3 inch (80mm NB)" }, { key: "Thickness", value: "4.5mm / 5.0mm / 6.0mm" },
      { key: "Grade", value: "IS 1161 / IS 3589" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Schedule", value: "SCH40 / SCH80" },
    ],
  },
  "erw-pipe-4inch": {
    title: "ERW Pipe 4 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Extra-heavy ERW pipe for gas lines, industrial processing, and critical structural support.",
    specifications: [
      { key: "Size", value: "4 inch (100mm NB)" }, { key: "Thickness", value: "4.5mm / 6.0mm / 8.0mm" },
      { key: "Grade", value: "IS 1161 / IS 3589 / API 5L" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Hydrostatic Test", value: "Available" },
    ],
  },
  "erw-pipe-5inch": {
    title: "ERW Pipe 5 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Jumbo ERW pipe for large-diameter water mains, sewerage systems, and industrial process piping.",
    specifications: [
      { key: "Size", value: "5 inch (125mm NB)" }, { key: "Thickness", value: "5.0mm / 6.0mm / 8.0mm" },
      { key: "Grade", value: "IS 3589 / IS 1161" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Coating", value: "Black / Anti-corrosive" },
    ],
  },
  "erw-pipe-6inch": {
    title: "ERW Pipe 6 inch Heavy", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Super-heavy ERW pipe for piling, large infrastructure, and heavy industrial applications.",
    specifications: [
      { key: "Size", value: "6 inch (150mm NB)" }, { key: "Thickness", value: "5.0mm / 6.0mm / 8.0mm / 10.0mm" },
      { key: "Grade", value: "IS 3589 / IS 1161 / API 5L" }, { key: "Type", value: "ERW (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "NDT Testing", value: "Available" },
    ],
  },
  "seamless-pipe-2inch": {
    title: "Seamless Pipe 2 inch SCH40", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Seamless pipe for high-pressure applications, boilers, and critical service.",
    specifications: [
      { key: "Size", value: "2 inch (50mm NB)" }, { key: "Schedule", value: "SCH40 (3.91mm)" },
      { key: "Grade", value: "IS 1978 / API 5L Gr.B / ASTM A106" }, { key: "Type", value: "Seamless (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Application", value: "High pressure / Boiler" },
    ],
  },
  "seamless-pipe-3inch": {
    title: "Seamless Pipe 3 inch SCH80", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Heavy seamless pipe for oil & gas, chemical processing, and critical high-pressure services.",
    specifications: [
      { key: "Size", value: "3 inch (80mm NB)" }, { key: "Schedule", value: "SCH80 (7.62mm)" },
      { key: "Grade", value: "API 5L Gr.B / ASTM A106 Gr.B / IS 1978" }, { key: "Type", value: "Seamless (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Heat Treatment", value: "Normalized" },
    ],
  },
  "seamless-pipe-4inch": {
    title: "Seamless Pipe 4 inch SCH40", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Large seamless pipe for industrial process piping, high-pressure steam lines, and critical fluid handling.",
    specifications: [
      { key: "Size", value: "4 inch (100mm NB)" }, { key: "Schedule", value: "SCH40 (6.02mm)" },
      { key: "Grade", value: "API 5L Gr.B / ASTM A106 Gr.B / IS 1978" }, { key: "Type", value: "Seamless (Black)" },
      { key: "Length", value: "6m - 12m" }, { key: "Certification", value: "3.1 Mill TC" },
    ],
  },
  "ms-square-pipe-40x40": {
    title: "MS Square Pipe 40x40mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Square hollow section for gates, frames, structures, and general fabrication.",
    specifications: [
      { key: "Section", value: "40 x 40mm" }, { key: "Thickness", value: "2.0mm / 2.5mm / 3.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "ERW / Cold Formed" },
      { key: "Length", value: "6m - 12m" }, { key: "Surface", value: "Black / Painted" },
    ],
  },
  "ms-square-pipe-50x50": {
    title: "MS Square Pipe 50x50mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Heavy square section for columns, towers, trusses, and structural steelwork.",
    specifications: [
      { key: "Section", value: "50 x 50mm" }, { key: "Thickness", value: "2.5mm / 3.0mm / 4.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "ERW / Cold Formed" },
      { key: "Length", value: "6m - 12m" }, { key: "Weight (3mm)", value: "4.34 kg/m" },
    ],
  },
  "ms-rect-pipe-50x25": {
    title: "MS Rectangular Pipe 50x25mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Rectangular hollow section for handrails, balustrades, furniture, and light fabrication.",
    specifications: [
      { key: "Section", value: "50 x 25mm" }, { key: "Thickness", value: "2.0mm / 2.5mm / 3.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "Cold Formed (ERW)" },
      { key: "Length", value: "6m - 12m" }, { key: "Surface", value: "Black / Galvanized" },
    ],
  },
  "ms-rect-pipe-80x40": {
    title: "MS Rectangular Pipe 80x40mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Large rectangular section for structural frames, supports, and heavy-fabrication.",
    specifications: [
      { key: "Section", value: "80 x 40mm" }, { key: "Thickness", value: "2.5mm / 3.0mm / 4.0mm / 5.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "Cold Formed (ERW)" },
      { key: "Length", value: "6m - 12m" }, { key: "Section Modulus", value: "23.77 cm\u00b3 (X-X)" },
    ],
  },
  "ms-rect-pipe-100x50": {
    title: "MS Rectangular Pipe 100x50mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Jumbo rectangular section for heavy structural applications, portal frames, and large-span supports.",
    specifications: [
      { key: "Section", value: "100 x 50mm" }, { key: "Thickness", value: "3.0mm / 4.0mm / 5.0mm / 6.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "Cold Formed (ERW)" },
      { key: "Length", value: "6m - 12m" }, { key: "Weight (4mm)", value: "8.95 kg/m" },
    ],
  },
  "ms-square-pipe-100x100": {
    title: "MS Square Pipe 100x100mm", category: "ms-hollow-pipes", categoryName: "MS Hollow Pipes",
    description: "Extra-jumbo square section for large columns, towers, heavy industrial structures, and infrastructure projects.",
    specifications: [
      { key: "Section", value: "100 x 100mm" }, { key: "Thickness", value: "3.0mm / 4.0mm / 5.0mm / 6.0mm / 8.0mm" },
      { key: "Grade", value: "IS 4923 / IS 1161" }, { key: "Type", value: "Cold Formed / Hot Finished" },
      { key: "Length", value: "6m - 12m" }, { key: "Weight (5mm)", value: "14.9 kg/m" },
    ],
  },
}
