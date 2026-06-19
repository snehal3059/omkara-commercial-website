"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedCounter } from "@/lib/useAnimatedCounter"

const faqs = [
  {
    question: "What is the minimum order quantity?",
    answer: "There is no strict minimum order quantity for retail buyers. However, for wholesale/bulk pricing, we recommend orders of 1 metric ton and above. Contact us for exact rates based on your quantity."
  },
  {
    question: "Do you provide Mill Test Certificates (MTC)?",
    answer: "Yes, we provide authentic Mill Test Certificates with every delivery. These certificates verify the chemical composition, mechanical properties, and grade of the steel — ensuring full traceability to the manufacturer."
  },
  {
    question: "What are your delivery timelines?",
    answer: "For products in stock at our Howrah warehouse, we can dispatch within 24–48 hours. For out-of-stock items sourced from mills, delivery typically takes 5–7 working days depending on the manufacturer and product."
  },
  {
    question: "Do you deliver outside Howrah?",
    answer: "Yes, we deliver across West Bengal and Eastern India. We have tie-ups with reliable logistics partners for safe and timely delivery. Delivery charges vary based on distance and order volume."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept RTGS/NEFT bank transfers, UPI payments, and cheques. For established business customers, we also offer credit terms (subject to approval). All transactions are fully invoiced with GST."
  },
  {
    question: "Are your products BIS certified?",
    answer: "Yes, all our products are sourced from BIS-certified manufacturers including SAIL, TATA Steel, and other reputed mills. Each product comes with proper certification and documentation."
  },
  {
    question: "Can I get custom-cut sizes?",
    answer: "Yes, we offer custom cutting services for MS plates, sheets, and pipes. Simply share your required dimensions and quantity, and we'll provide a quotation including cutting charges."
  },
  {
    question: "Do you offer GST invoices?",
    answer: "Absolutely. We are a registered private limited company (OMKARA COMMERCIAL PVT. LTD.) and provide proper GST invoices for all purchases. Our GSTIN is available on request."
  },
]

const stats = [
  { end: 15, suffix: "+", label: "Years of Experience" },
  { end: 500, suffix: "+", label: "Steel Products" },
  { end: 1000, suffix: "+", label: "Happy Clients" },
  { end: 50000, suffix: "+", label: "Tons Delivered" },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="w-full">
      {/* ─── Animated Stats ─── */}
      <section className="bg-stone-900 py-14 sm:py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                end={stat.end}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-stone-900">
              Frequently Asked Questions
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-stone-500 text-lg">
              Everything you need to know about ordering steel from Omkara Commercial.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-stone-200 bg-white overflow-hidden transition-all duration-200 hover:border-stone-300"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={openIndex === index}
                >
                  <span className={cn(
                    "text-sm sm:text-base font-semibold pr-4 transition-colors",
                    openIndex === index ? "text-primary" : "text-stone-900"
                  )}>
                    {faq.question}
                  </span>
                  <ChevronDown className={cn(
                    "h-5 w-5 shrink-0 text-stone-400 transition-transform duration-300",
                    openIndex === index && "rotate-180 text-primary"
                  )} />
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}>
                  <div className="px-6 pb-5">
                    <p className="text-sm sm:text-base leading-relaxed text-stone-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after FAQ */}
          <div className="mt-12 text-center">
            <p className="text-stone-500 text-sm mb-4">Still have questions?</p>
            <a
              href="https://wa.me/919123857784?text=Hi%2C%20I%20have%20a%20question%20about%20your%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-[#25D366]/25 transition-all hover:shadow-[#25D366]/40"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}