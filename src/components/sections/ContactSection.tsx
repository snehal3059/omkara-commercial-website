'use client'

import { useState, type FormEvent } from 'react'
import { Phone, Mail, MapPin, MessageCircle, Clock, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject || undefined,
          message: formData.message,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact">
      {/* Banner */}
      <div className="relative overflow-hidden bg-stone-950 py-20 sm:py-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-stone-400 max-w-2xl mx-auto">
            Get in touch with OMKARA COMMERCIAL PVT. LTD. for all your steel and iron requirements.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left: Contact Form (2/3 width) */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-2xl font-extrabold text-stone-900 mb-1">Send Us a Message</h2>
              <p className="text-sm text-stone-500 mb-6">
                Fill out the form below and our team will get back to you promptly.
              </p>

              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-4">
                    <Check className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-2">Message Sent!</h3>
                  <p className="text-sm text-stone-500 max-w-md mb-6">
                    Thank you for reaching out. We&apos;ve received your message and will respond soon.
                  </p>
                  <Button
                    variant="outline"
                    className="border-stone-300"
                    onClick={() => setSuccess(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-stone-700">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-stone-700">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="border-stone-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-stone-700">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="border-stone-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-stone-700">Company Name</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="border-stone-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-stone-700">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="What is this regarding?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="border-stone-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-stone-700">
                      Message <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="border-stone-200"
                    />
                  </div>

                  {error && (
                    <p className="text-sm text-red-600">{error}</p>
                  )}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Right: Contact Info (1/3 width) */}
          <div className="lg:col-span-1 space-y-5">
            {/* Contact Information Card */}
            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-stone-900 mb-5">
                Contact Information
              </h3>
              <ul className="space-y-5">
                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Address</p>
                    <a
                      href="https://maps.app.goo.gl/HRctjJiCb6ztU5UZ9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-stone-500 hover:text-primary transition-colors"
                    >
                      77/5/6, Benaras Rd, Belgachia, Salkia, Howrah, West Bengal 711101
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Phone</p>
                    <a href="tel:+919123857784" className="block text-sm text-stone-500 hover:text-primary transition-colors">
                      +91 91238 57784
                    </a>
                    <a href="tel:+919830031148" className="block text-sm text-stone-500 hover:text-primary transition-colors">
                      +91 98300 31148
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Email</p>
                    <a href="mailto:OMKARA_COMMLPVTLTD@HOTMAIL.COM" className="block text-sm text-stone-500 hover:text-primary transition-colors break-all">
                      OMKARA_COMMLPVTLTD@HOTMAIL.COM
                    </a>
                    <a href="mailto:OMKARA.COMMLPVTLTD@GMAIL.COM" className="block text-sm text-stone-500 hover:text-primary transition-colors break-all">
                      OMKARA.COMMLPVTLTD@GMAIL.COM
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 shrink-0">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-900">Working Hours</p>
                    <p className="text-sm text-stone-500">Mon - Sat: 9:00 AM - 7:00 PM</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Inquiry Card */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Quick Inquiry
              </h3>
              <p className="text-sm text-stone-500 mb-4">
                Need an urgent response? Reach out on WhatsApp for faster communication.
              </p>
              <a
                href="https://wa.me/919123857784"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/25"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}