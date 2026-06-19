import {
  ShieldCheck,
  Users,
  Building2,
  Award,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "500+", label: "Products" },
  { value: "1000+", label: "Happy Clients" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We source only from reputed manufacturers like SAIL and TATA Steel, ensuring every product meets stringent quality standards before it reaches you.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Our customers are at the heart of everything we do. We provide personalised service, transparent pricing, and dedicated after-sales support.",
  },
  {
    icon: Building2,
    title: "Industry Expertise",
    description:
      "With over 15 years in iron and steel trading, our team possesses deep domain knowledge to guide you to the right products for your projects.",
  },
  {
    icon: Award,
    title: "Reliability",
    description:
      "Timely dispatch, consistent quality, and dependable supply chains have made us a trusted name across West Bengal and beyond.",
  },
];

const flatProducts = [
  "HR Sheet",
  "CR Sheet",
  "MS Plate",
  "Chequered Plate",
];

const longProducts = [
  "I-Beam",
  "C-Channel",
  "Equal & Unequal Angles",
  "MS Round Bars",
  "Hollow Pipes",
  "Square & Rectangular Hollow Sections",
];

const highlights = [
  {
    icon: Clock,
    text: "Dispatch within 48 hours of order confirmation",
  },
  {
    icon: CheckCircle2,
    text: "Competitive and transparent pricing with no hidden costs",
  },
  {
    icon: ShieldCheck,
    text: "Products sourced directly from SAIL, TATA Steel, and other premium mills",
  },
  {
    icon: Users,
    text: "Dedicated account managers for every client",
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function StatsCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border bg-muted/40 p-6 text-center">
      <span className="text-4xl font-bold tracking-tight text-primary">
        {value}
      </span>
      <span className="mt-1 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <Card className="transition-shadow duration-300 hover:shadow-md">
      <CardHeader>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

function ProductList({
  heading,
  items,
}: {
  heading: string;
  items: string[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
        {heading}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-muted-foreground"
          >
            <span className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                       */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-20">
      {/* ── Banner ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        {/* Decorative blurred circles */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <Badge
          variant="secondary"
          className="mb-6 gap-1.5 border-blue-400/30 bg-blue-950/60 px-4 py-1.5 text-blue-100"
        >
          <MapPin className="h-3.5 w-3.5" />
          Howrah, West Bengal &nbsp;|&nbsp; Est. 2008
        </Badge>

        <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          About OMKARA COMMERCIAL PVT. LTD.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-blue-100/80 sm:text-lg">
          Your trusted partner in iron and steel trading since 2008
        </p>
      </div>

      {/* ── Who We Are ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left – Narrative */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Who We Are
            </h3>
            <Separator className="mt-3 w-16 bg-primary" />

            <p className="mt-6 leading-relaxed text-muted-foreground">
              Founded in <strong className="text-foreground">2008</strong> by{" "}
              <strong className="text-foreground">Shri Somnath Gupta</strong>,
              Omkara Commercial Pvt. Ltd. has grown from a modest trading firm
              into one of Howrah&apos;s most dependable iron and steel suppliers.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              We specialise in{" "}
              <strong className="text-foreground">Flat Products</strong> (HR/CR
              Sheets, MS Plates, Chequered Plates) and{" "}
              <strong className="text-foreground">Long Structural Products</strong>{" "}
              (I-Beams, Channels, Angles, Hollow Sections), sourced exclusively
              from India&apos;s premier steel mills —{" "}
              <strong className="text-foreground">
                SAIL, TATA Steel, Gagan Gold, Shyam SEL
              </strong>{" "}
              and{" "}
              <strong className="text-foreground">Elegant</strong>.
            </p>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Our commitment to quality, timely delivery, and customer
              satisfaction has earned us the trust of over a thousand businesses
              across construction, manufacturing, and infrastructure sectors.
            </p>
          </div>

          {/* Right – Stats */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-6">
            {stats.map((s) => (
              <StatsCard key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Our Values ──────────────────────────────────────────── */}
      <div className="bg-muted/30 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our Values
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              The principles that drive every decision we make.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <ValueCard
                key={v.title}
                icon={v.icon}
                title={v.title}
                description={v.description}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── What We Offer ────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left – Product Lists */}
          <div className="rounded-xl border bg-muted/20 p-6 sm:p-8">
            <h3 className="mb-6 text-xl font-bold tracking-tight">
              Product Categories
            </h3>

            <div className="grid gap-8 sm:grid-cols-2">
              <ProductList heading="Flat Products" items={flatProducts} />
              <ProductList heading="Long Structural" items={longProducts} />
            </div>
          </div>

          {/* Right – Service Highlights */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
              What We Offer
            </h3>
            <Separator className="mt-3 w-16 bg-primary" />

            <p className="mt-6 leading-relaxed text-muted-foreground">
              We don&apos;t just supply steel — we deliver peace of mind. From the
              moment you place an order to the time it arrives at your site, our
              team ensures a seamless experience backed by industry-leading
              logistics.
            </p>

            <ul className="mt-6 space-y-4">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <li key={h.text} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{h.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
