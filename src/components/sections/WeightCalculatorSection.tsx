"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Calculator, RotateCcw, Search, Phone, Mail } from "lucide-react"
import {
  allCategories,
  beams,
  channels,
  equalAngles,
  rounds,
} from "@/lib/steel-data"
import type { WeightEntry } from "@/lib/steel-data"

const SHAPES = [
  { value: "plate", label: "Plate/Sheet" },
  { value: "round", label: "Round/TMT Bar" },
  { value: "pipe", label: "Pipe/Tube (Round)" },
  { value: "squarePipe", label: "Square Hollow Section" },
  { value: "equalAngle", label: "Equal Angle" },
  { value: "unequalAngle", label: "Unequal Angle" },
  { value: "flat", label: "Flat Bar" },
  { value: "squareBar", label: "Square Bar" },
] as const

type ShapeKey = (typeof SHAPES)[number]["value"]

interface ShapeField {
  key: string
  label: string
  placeholder: string
}

const SHAPE_FIELDS: Record<ShapeKey, ShapeField[]> = {
  plate: [
    { key: "length", label: "Length (mm)", placeholder: "e.g. 2000" },
    { key: "width", label: "Width (mm)", placeholder: "e.g. 1000" },
    { key: "thickness", label: "Thickness (mm)", placeholder: "e.g. 6" },
  ],
  round: [
    { key: "diameter", label: "Diameter (mm)", placeholder: "e.g. 16" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  pipe: [
    { key: "od", label: "Outer Diameter (mm)", placeholder: "e.g. 48" },
    { key: "wallThickness", label: "Wall Thickness (mm)", placeholder: "e.g. 3" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  squarePipe: [
    { key: "side", label: "Outer Side (mm)", placeholder: "e.g. 50" },
    { key: "wallThickness", label: "Wall Thickness (mm)", placeholder: "e.g. 3" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  equalAngle: [
    { key: "leg", label: "Leg Size (mm)", placeholder: "e.g. 50" },
    { key: "thickness", label: "Thickness (mm)", placeholder: "e.g. 6" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  unequalAngle: [
    { key: "leg1", label: "Larger Leg (mm)", placeholder: "e.g. 75" },
    { key: "leg2", label: "Smaller Leg (mm)", placeholder: "e.g. 50" },
    { key: "thickness", label: "Thickness (mm)", placeholder: "e.g. 6" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  flat: [
    { key: "width", label: "Width (mm)", placeholder: "e.g. 50" },
    { key: "thickness", label: "Thickness (mm)", placeholder: "e.g. 6" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
  squareBar: [
    { key: "side", label: "Side (mm)", placeholder: "e.g. 25" },
    { key: "length", label: "Length (mm)", placeholder: "e.g. 6000" },
  ],
}

const DENSITY = 7850

function calculateWeight(
  shape: ShapeKey,
  values: Record<string, number>,
  lengthM: number
): number {
  const v = values
  switch (shape) {
    case "plate":
      return (v["length"] / 1000) * (v["width"] / 1000) * (v["thickness"] / 1000) * DENSITY
    case "round":
      return Math.PI * Math.pow(v["diameter"] / 2000, 2) * lengthM * DENSITY
    case "pipe":
      return (
        Math.PI * ((v["od"] - v["wallThickness"]) / 1000) * (v["wallThickness"] / 1000) * lengthM * DENSITY
      )
    case "squarePipe":
      return (
        4 *
        (v["wallThickness"] / 1000) *
        ((v["side"] - v["wallThickness"]) / 1000) *
        lengthM *
        DENSITY
      )
    case "equalAngle":
      return (
        ((2 * v["leg"] - v["thickness"]) / 1000) *
        (v["thickness"] / 1000) *
        lengthM *
        DENSITY
      )
    case "unequalAngle":
      return (
        ((v["leg1"] + v["leg2"] - v["thickness"]) / 1000) *
        (v["thickness"] / 1000) *
        lengthM *
        DENSITY
      )
    case "flat":
      return (v["width"] / 1000) * (v["thickness"] / 1000) * lengthM * DENSITY
    case "squareBar":
      return (v["side"] / 1000) * (v["side"] / 1000) * lengthM * DENSITY
    default:
      return 0
  }
}

const SECTION_CATEGORIES = [
  { value: "beams", label: "Beams (I-Sections)", data: beams },
  { value: "channels", label: "Channels", data: channels },
  { value: "equalAngles", label: "Equal Angles", data: equalAngles },
  { value: "rounds", label: "TOR / TMT / Rounds", data: rounds },
] as const

type SectionCategoryKey = (typeof SECTION_CATEGORIES)[number]["value"]

function getLengthFieldForShape(shape: ShapeKey): string | null {
  return SHAPE_FIELDS[shape].find((f) => f.key === "length")?.key ?? null
}

export function WeightCalculatorSection() {
  // Custom Shape Calculator state
  const [selectedShape, setSelectedShape] = useState<ShapeKey>("plate")
  const [shapeInputs, setShapeInputs] = useState<Record<string, string>>({
    length: "",
    width: "",
    thickness: "",
  })
  const [shapeQuantity, setShapeQuantity] = useState("1")
  const [customResult, setCustomResult] = useState<{
    weightPerMeter: number
    totalWeight: number
    totalMT: number
  } | null>(null)

  // Standard Section Lookup state
  const [selectedCategory, setSelectedCategory] = useState<SectionCategoryKey | "">("")
  const [selectedSection, setSelectedSection] = useState("")
  const [sectionLength, setSectionLength] = useState("")
  const [sectionQuantity, setSectionQuantity] = useState("1")
  const [sectionResult, setSectionResult] = useState<{
    weightPerMeter: number
    totalWeight: number
    totalMT: number
  } | null>(null)

  // Current shape fields
  const currentFields = useMemo(() => SHAPE_FIELDS[selectedShape], [selectedShape])
  const lengthFieldKey = useMemo(() => getLengthFieldForShape(selectedShape), [selectedShape])

  // Sections for selected category
  const categorySections: WeightEntry[] = useMemo(() => {
    if (!selectedCategory) return []
    const found = SECTION_CATEGORIES.find((c) => c.value === selectedCategory)
    return found ? found.data : []
  }, [selectedCategory])

  const selectedSectionEntry: WeightEntry | undefined = useMemo(() => {
    if (!selectedSection) return undefined
    return categorySections.find((s) => s.section === selectedSection)
  }, [selectedSection, categorySections])

  // Handle shape change — reset inputs
  const handleShapeChange = (value: string) => {
    setSelectedShape(value as ShapeKey)
    const fields = SHAPE_FIELDS[value as ShapeKey]
    const newInputs: Record<string, string> = {}
    fields.forEach((f) => {
      newInputs[f.key] = ""
    })
    setShapeInputs(newInputs)
    setCustomResult(null)
  }

  const handleShapeInputChange = (key: string, val: string) => {
    setShapeInputs((prev) => ({ ...prev, [key]: val }))
    setCustomResult(null)
  }

  const handleCalculateCustom = () => {
    const numericValues: Record<string, number> = {}
    for (const field of currentFields) {
      const v = parseFloat(shapeInputs[field.key])
      if (isNaN(v) || v <= 0) return
      numericValues[field.key] = v
    }
    const qty = parseFloat(shapeQuantity)
    if (isNaN(qty) || qty <= 0) return

    const lengthM = lengthFieldKey ? numericValues[lengthFieldKey] / 1000 : 0
    const singlePieceWeight = lengthFieldKey
      ? calculateWeight(selectedShape, numericValues, lengthM)
      : 0
    const wpm = lengthFieldKey ? singlePieceWeight / lengthM : singlePieceWeight
    const totalAll = singlePieceWeight * qty

    setCustomResult({
      weightPerMeter: parseFloat(wpm.toFixed(3)),
      totalWeight: parseFloat(totalAll.toFixed(3)),
      totalMT: parseFloat((totalAll / 1000).toFixed(4)),
    })
  }

  const handleResetCustom = () => {
    const fields = SHAPE_FIELDS[selectedShape]
    const newInputs: Record<string, string> = {}
    fields.forEach((f) => {
      newInputs[f.key] = ""
    })
    setShapeInputs(newInputs)
    setShapeQuantity("1")
    setCustomResult(null)
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value as SectionCategoryKey)
    setSelectedSection("")
    setSectionResult(null)
  }

  const handleSectionChange = (value: string) => {
    setSelectedSection(value)
    setSectionResult(null)
  }

  const handleCalculateSection = () => {
    if (!selectedSectionEntry) return
    const len = parseFloat(sectionLength)
    if (isNaN(len) || len <= 0) return
    const qty = parseFloat(sectionQuantity)
    if (isNaN(qty) || qty <= 0) return

    const lengthM = len / 1000
    const totalWeight = selectedSectionEntry.weight * lengthM * qty
    setSectionResult({
      weightPerMeter: selectedSectionEntry.weight,
      totalWeight: parseFloat(totalWeight.toFixed(3)),
      totalMT: parseFloat((totalWeight / 1000).toFixed(4)),
    })
  }

  return (
    <section className="w-full">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Steel Weight Calculator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate the weight of steel products instantly — plates, pipes, angles,
          bars &amp; more
        </p>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Left Column — Calculators */}
        <div className="space-y-6 lg:col-span-3">
          {/* Card 1: Custom Shape Calculator */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calculator className="size-5 text-primary" />
                <CardTitle className="text-lg">Custom Shape Calculator</CardTitle>
              </div>
              <CardDescription>
                Enter dimensions in millimeters to calculate steel weight using
                standard density (7850 kg/m³)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Shape Select */}
              <div className="space-y-2">
                <Label htmlFor="shape-select">Select Shape</Label>
                <Select value={selectedShape} onValueChange={handleShapeChange}>
                  <SelectTrigger id="shape-select" className="w-full">
                    <SelectValue placeholder="Choose a shape" />
                  </SelectTrigger>
                  <SelectContent>
                    {SHAPES.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Input Fields */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {currentFields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={`shape-${field.key}`}>{field.label}</Label>
                    <Input
                      id={`shape-${field.key}`}
                      type="number"
                      min="0"
                      step="any"
                      placeholder={field.placeholder}
                      value={shapeInputs[field.key] ?? ""}
                      onChange={(e) =>
                        handleShapeInputChange(field.key, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="max-w-[200px] space-y-2">
                <Label htmlFor="shape-qty">Quantity (pieces)</Label>
                <Input
                  id="shape-qty"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="1"
                  value={shapeQuantity}
                  onChange={(e) => {
                    setShapeQuantity(e.target.value)
                    setCustomResult(null)
                  }}
                />
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCalculateCustom} className="gap-2">
                  <Calculator className="size-4" />
                  Calculate
                </Button>
                <Button variant="outline" onClick={handleResetCustom} className="gap-2">
                  <RotateCcw className="size-4" />
                  Reset
                </Button>
              </div>

              {/* Results */}
              {customResult && (
                <div className="rounded-lg border bg-muted/40 p-4">
                  <h4 className="mb-3 font-semibold text-foreground">Results</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Weight per Meter
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {customResult.weightPerMeter} <span className="text-sm font-normal text-muted-foreground">kg/m</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Weight</p>
                      <p className="text-lg font-bold text-primary">
                        {customResult.totalWeight} <span className="text-sm font-normal text-muted-foreground">kg</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Weight</p>
                      <p className="text-lg font-bold text-primary">
                        {customResult.totalMT} <span className="text-sm font-normal text-muted-foreground">MT</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Standard Section Lookup */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Search className="size-5 text-primary" />
                <CardTitle className="text-lg">Standard Section Lookup</CardTitle>
              </div>
              <CardDescription>
                Look up theoretical weights from standard steel sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Category Select */}
              <div className="space-y-2">
                <Label htmlFor="section-category">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger id="section-category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {SECTION_CATEGORIES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Section Select */}
              <div className="space-y-2">
                <Label htmlFor="section-select">Section</Label>
                <Select
                  value={selectedSection}
                  onValueChange={handleSectionChange}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger id="section-select" className="w-full">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    {categorySections.map((s) => (
                      <SelectItem key={s.section} value={s.section}>
                        {s.section} — {s.weight} {s.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Length & Quantity */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="section-length">Length (mm)</Label>
                  <Input
                    id="section-length"
                    type="number"
                    min="0"
                    step="any"
                    placeholder="e.g. 6000"
                    value={sectionLength}
                    onChange={(e) => {
                      setSectionLength(e.target.value)
                      setSectionResult(null)
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="section-qty">Quantity (pieces)</Label>
                  <Input
                    id="section-qty"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="1"
                    value={sectionQuantity}
                    onChange={(e) => {
                      setSectionQuantity(e.target.value)
                      setSectionResult(null)
                    }}
                  />
                </div>
              </div>

              <Separator />

              {/* Calculate Button */}
              <Button onClick={handleCalculateSection} className="gap-2">
                <Calculator className="size-4" />
                Calculate
              </Button>

              {/* Results */}
              {sectionResult && (
                <div className="rounded-lg border bg-muted/40 p-4">
                  <h4 className="mb-3 font-semibold text-foreground">Results</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">
                        Weight per Meter
                      </p>
                      <p className="text-lg font-bold text-primary">
                        {sectionResult.weightPerMeter} <span className="text-sm font-normal text-muted-foreground">kg/m</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Weight</p>
                      <p className="text-lg font-bold text-primary">
                        {sectionResult.totalWeight} <span className="text-sm font-normal text-muted-foreground">kg</span>
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Total Weight</p>
                      <p className="text-lg font-bold text-primary">
                        {sectionResult.totalMT} <span className="text-sm font-normal text-muted-foreground">MT</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column — Weight Reference Chart */}
        <div className="lg:col-span-2">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="text-lg">
                Omkara Steel Weight Reference Chart
              </CardTitle>
              <CardDescription>
                Standard theoretical weights for all sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full">
                {allCategories.map((cat, index) => (
                  <AccordionItem key={cat.category} value={`cat-${index}`}>
                    <AccordionTrigger className="text-primary font-semibold">
                      {cat.category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="max-h-64 overflow-y-auto custom-scrollbar rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow className="sticky top-0 z-10 bg-background hover:bg-background">
                              <TableHead className="w-[60%]">Section</TableHead>
                              <TableHead>Unit Weight</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {cat.items.map((item) => (
                              <TableRow key={item.section}>
                                <TableCell className="font-mono text-sm">
                                  {item.section}
                                </TableCell>
                                <TableCell>
                                  {item.weight} {item.unit}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Help Box */}
      <div className="mt-10">
        <div className="rounded-xl border bg-gradient-to-r from-primary/5 via-primary/5 to-accent/5 p-6 sm:p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-xl font-bold text-foreground">
              Need Accurate Weights for Your Order?
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              The calculated weights are theoretical. Actual weights may vary based
              on manufacturing tolerances. Contact us for precise weights tailored to
              your requirements.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
              <a
                href="tel:+919123857784"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                <Phone className="size-4" />
                +91 91238 57784
              </a>
              <a
                href="mailto:omkaracommercial@gmail.com"
                className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Mail className="size-4" />
                omkaracommercial@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
