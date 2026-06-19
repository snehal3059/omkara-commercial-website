import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const grades = [
  {
    category: "Structural Steel (IS 2062)",
    description:
      "For beams, channels, angles, plates, and structural applications",
    specs: [
      {
        grade: "E250 (Fe410W)",
        yield: "250 MPa min",
        tensile: "410 MPa min",
        elongation: "23% min",
        application:
          "General structural — beams, channels, angles, plates",
      },
      {
        grade: "E350 (Fe490)",
        yield: "350 MPa min",
        tensile: "490 MPa min",
        elongation: "22% min",
        application:
          "High-strength structural — bridges, cranes, heavy equipment",
      },
      {
        grade: "E410 (Fe540)",
        yield: "410 MPa min",
        tensile: "540 MPa min",
        elongation: "20% min",
        application:
          "Extra-high strength — offshore, pressure vessels, heavy structurals",
      },
      {
        grade: "E450 (Fe590)",
        yield: "450 MPa min",
        tensile: "590 MPa min",
        elongation: "20% min",
        application:
          "Premium strength — mining, defence, ultra-heavy structures",
      },
    ],
  },
  {
    category: "Cold Rolled Steel (IS 513)",
    description:
      "For CR sheets with superior surface finish and tight tolerances",
    specs: [
      {
        grade: "DQ (Drawing Quality)",
        yield: "170-330 MPa",
        tensile: "270-410 MPa",
        elongation: "30% min",
        application:
          "General fabrication, automotive panels, enclosures",
      },
      {
        grade: "DD (Deep Drawing)",
        yield: "140-280 MPa",
        tensile: "270-410 MPa",
        elongation: "33% min",
        application: "Deep-drawn parts, press-formed components",
      },
      {
        grade: "EDD (Extra Deep Drawing)",
        yield: "130-260 MPa",
        tensile: "270-390 MPa",
        elongation: "38% min",
        application:
          "Complex automotive stampings, intricate press-work",
      },
    ],
  },
  {
    category: "Hot Rolled Steel (IS 2062 / IS 1079)",
    description:
      "For HR sheets and plates in structural and general engineering",
    specs: [
      {
        grade: "HR1 (E250)",
        yield: "250 MPa min",
        tensile: "410-540 MPa",
        elongation: "28% min",
        application:
          "General structural, industrial flooring, light fabrication",
      },
      {
        grade: "HR2 (E350)",
        yield: "350 MPa min",
        tensile: "490-630 MPa",
        elongation: "23% min",
        application:
          "Heavy machinery, pressure vessels, high-stress structures",
      },
      {
        grade: "HR3 (E410)",
        yield: "410 MPa min",
        tensile: "540-680 MPa",
        elongation: "20% min",
        application:
          "Bridges, cranes, offshore platforms, heavy engineering",
      },
    ],
  },
  {
    category: "Steel Pipes & Tubes",
    description: "For ERW, seamless, GP, and hollow sections",
    specs: [
      {
        grade: "IS 1239 (Medium/Heavy)",
        yield: "200 MPa min",
        tensile: "320-440 MPa",
        elongation: "20% min",
        application:
          "GP pipes, water lines, scaffolding, handrails",
      },
      {
        grade: "IS 1161 (ERW)",
        yield: "250-350 MPa",
        tensile: "410-540 MPa",
        elongation: "20% min",
        application:
          "Structural tubes, scaffolding, columns, piling",
      },
      {
        grade: "IS 3589 (ERW Large Dia)",
        yield: "250-410 MPa",
        tensile: "410-590 MPa",
        elongation: "20% min",
        application: "Large-diameter pipes, water mains, oil & gas",
      },
      {
        grade: "IS 4923 (Hollow Sections)",
        yield: "250-350 MPa",
        tensile: "410-540 MPa",
        elongation: "15% min",
        application:
          "Square & rectangular hollow sections, structural frames",
      },
      {
        grade: "API 5L Gr.B",
        yield: "241 MPa min",
        tensile: "414 MPa min",
        elongation: "21% min",
        application:
          "Oil & gas pipelines, high-pressure transmission",
      },
      {
        grade: "ASTM A106 Gr.B",
        yield: "240 MPa min",
        tensile: "415 MPa min",
        elongation: "22% min",
        application:
          "Seamless pipes for high-temperature, boilers, refineries",
      },
    ],
  },
  {
    category: "Engineering Steels (EN Series)",
    description: "For round bars, shafts, and precision components",
    specs: [
      {
        grade: "EN8 (080M40)",
        yield: "280-465 MPa",
        tensile: "550-700 MPa",
        elongation: "16% min",
        application:
          "General shafts, studs, bolts, light engineering",
      },
      {
        grade: "EN9 (070M55)",
        yield: "310-495 MPa",
        tensile: "620-770 MPa",
        elongation: "14% min",
        application:
          "Heavy-duty shafts, gears, wear-resistant parts",
      },
      {
        grade: "EN19 (709M40)",
        yield: "540-785 MPa",
        tensile: "700-1000 MPa",
        elongation: "13% min",
        application:
          "High-strength shafts, connecting rods, heavy forgings",
      },
      {
        grade: "EN24 (817M40)",
        yield: "600-925 MPa",
        tensile: "850-1200 MPa",
        elongation: "12% min",
        application:
          "Premium shafts, aircraft components, gears, heavy axles",
      },
    ],
  },
  {
    category: "Structural Sections (IS 808)",
    description:
      "Standard specifications for beams, channels, and angles",
    specs: [
      {
        grade: "ISMB (I-Beams)",
        yield: "250-410 MPa",
        tensile: "410-590 MPa",
        elongation: "23% min",
        application:
          "Building frames, bridges, industrial sheds (100mm - 400mm)",
      },
      {
        grade: "ISMC (Channels)",
        yield: "250-410 MPa",
        tensile: "410-590 MPa",
        elongation: "23% min",
        application:
          "Roof purlins, structural supports, frames (75mm - 300mm)",
      },
      {
        grade: "Equal Angles",
        yield: "250-410 MPa",
        tensile: "410-590 MPa",
        elongation: "23% min",
        application:
          "Framing, towers, trusses, general fabrication",
      },
      {
        grade: "Unequal Angles",
        yield: "250-350 MPa",
        tensile: "410-540 MPa",
        elongation: "23% min",
        application:
          "Asymmetric loads, special frames, customized structures",
      },
    ],
  },
]

export function GradesSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-10 md:mb-14">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Grades & Specifications
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
            Comprehensive reference of Indian Standard (IS) and international
            steel grades with mechanical properties and typical applications.
            All values are minimum unless a range is stated.
          </p>
        </div>

        {/* Grade categories */}
        <div className="space-y-12 md:space-y-16">
          {grades.map((cat) => (
            <article key={cat.category} id={cat.category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2 text-xs font-medium uppercase tracking-wider">
                  {cat.category}
                </Badge>
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {cat.category}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  {cat.description}
                </p>
              </div>

              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="max-h-[500px] overflow-y-auto custom-scrollbar">
                    <Table>
                      <TableHeader className="sticky top-0 z-10 bg-background">
                        <TableRow className="hover:bg-background">
                          <TableHead className="min-w-[140px] font-semibold">
                            Grade
                          </TableHead>
                          <TableHead className="min-w-[120px] font-semibold">
                            Yield Strength
                          </TableHead>
                          <TableHead className="min-w-[120px] font-semibold">
                            Tensile Strength
                          </TableHead>
                          <TableHead className="min-w-[100px] font-semibold">
                            Elongation
                          </TableHead>
                          <TableHead className="min-w-[220px] font-semibold hidden lg:table-cell">
                            Typical Applications
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cat.specs.map((spec, idx) => (
                          <TableRow key={spec.grade}>
                            <TableCell className="font-medium whitespace-normal">
                              {spec.grade}
                            </TableCell>
                            <TableCell>
                              <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-mono">
                                {spec.yield}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-mono">
                                {spec.tensile}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="inline-block rounded-md bg-muted px-2 py-0.5 text-xs font-mono">
                                {spec.elongation}
                              </span>
                            </TableCell>
                            <TableCell className="hidden whitespace-normal text-sm text-muted-foreground lg:table-cell">
                              {spec.application}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Mobile: show application as stacked cards below table */}
              <div className="mt-3 space-y-2 lg:hidden">
                {cat.specs.map((spec) => (
                  <details
                    key={spec.grade}
                    className="rounded-lg border bg-muted/30 px-3 py-2 text-sm"
                  >
                    <summary className="cursor-pointer font-medium">
                      {spec.grade}
                    </summary>
                    <p className="mt-1.5 text-muted-foreground">
                      {spec.application}
                    </p>
                  </details>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Help box */}
        <div className="mt-14 rounded-2xl border bg-gradient-to-br from-primary/5 via-primary/5 to-accent/5 p-6 md:mt-18 md:p-8 lg:mt-20">
          <Card className="border-0 bg-background/80 shadow-none">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Need Help Choosing the Right Grade?
              </CardTitle>
              <CardDescription className="text-base">
                Our metallurgical experts can guide you to the perfect grade
                for your project requirements.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Phone numbers */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a
                        href="tel:+919876543210"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        +91 98765 43210
                      </a>
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      <a
                        href="tel:+919876543211"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        +91 98765 43211
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      <a
                        href="mailto:sales@steeltraders.com"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        sales@steeltraders.com
                      </a>
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      <a
                        href="mailto:info@steeltraders.com"
                        className="underline-offset-4 hover:text-primary hover:underline"
                      >
                        info@steeltraders.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Working Hours</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Mon – Sat: 9:00 AM – 7:00 PM
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
