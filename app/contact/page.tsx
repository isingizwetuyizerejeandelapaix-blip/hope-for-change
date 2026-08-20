"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Send, Check, MessageSquare, Globe, Building } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs } from "@/lib/data"

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team will respond within 24 hours",
    value: "hopeforchangesorganization@gmail.com",
    href: "mailto:hopeforchangesorganization@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon-Fri from 9am to 6pm EST",
    value: "+250 789 954 476",
    href: "tel:+250789954476",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters location",
    value: "HOPE FOR CHANGE, Musanze, Rwanda",
    href: "https://maps.google.com/?q=Musanze,Rwanda",
  },
]

const offices = [
  { city: "Musanze", type: "Headquarters" },
]

const inquiryTypes = [
  "General Inquiry",
  "Donation Questions",
  "Volunteering",
  "Media & Press",
  "Corporate Partnerships",
  "Career Opportunities",
  "Program Information",
  "Other",
]

const WEB3FORMS_ACCESS_KEY = '6427b36f-0970-4fab-9fad-044355178af7'

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const formSectionRef = useRef<HTMLDivElement>(null)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('submitting')
    setErrorMessage(null)

    if (!formRef.current) {
      setFormStatus('error')
      setErrorMessage('Form reference is unavailable.')
      return
    }

    const formData = new FormData(formRef.current)
    formData.append('subject', 'Hope For Change Contact Form Submission')
    formData.append(
      'from_name',
      `${formData.get('firstName') ?? ''} ${formData.get('lastName') ?? ''}`.trim()
    )
    formData.append('redirect', '')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormStatus('success')
        formRef.current.reset()
      } else {
        setFormStatus('error')
        setErrorMessage(result.message || 'Unable to send message. Please try again.')
      }
    } catch (error) {
      setFormStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  const handleSupportEmailClick = () => {
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      emailInputRef.current?.focus()
    }, 400)
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Contact Us
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-foreground mt-4 mb-6 text-balance"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground"
            >
              Have questions? We&apos;d love to hear from you. Send us a message 
              and we&apos;ll respond as soon as possible.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow hover:border-primary">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1">{method.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                    <p className="text-primary font-medium text-sm">{method.value}</p>
                  </CardContent>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12 lg:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div ref={formSectionRef} className="lg:col-span-3">
              {formStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card rounded-lg border p-8 lg:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Message Sent Successfully!
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Thank you for reaching out. Our team will review your message and 
                    get back to you within 1-2 business days.
                  </p>
                  <Button onClick={() => setFormStatus('idle')}>
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {formStatus === 'error' && errorMessage ? (
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                        {errorMessage}
                      </div>
                    ) : null}
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <input type="hidden" name="access_key" value={WEB3FORMS_ACCESS_KEY} />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" className="mt-1" required />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input ref={emailInputRef} id="email" name="email" type="email" className="mt-1" required />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" name="phone" type="tel" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                        <Select name="inquiryType" required>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input id="subject" name="subject" className="mt-1" required />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message"
                          name="message"
                          rows={5} 
                          className="mt-1" 
                          placeholder="How can we help you?"
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full h-12" disabled={formStatus === 'submitting'}>
                        <Send className="w-5 h-5 mr-2" />
                        {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Global Offices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Globe className="w-5 h-5 text-primary" />
                    Office Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="flex items-start gap-3">
                      <Building className="w-5 h-5 text-muted-foreground mt-0.5" />
                      <div>
                        <div className="font-medium text-foreground">
                          {office.city}
                        </div>
                        <div className="text-sm text-muted-foreground">{office.type}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">9:00 AM - 6:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday</span>
                      <span className="font-medium">10:00 AM - 2:00 PM EST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="font-medium">Closed</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    Emergency response operations are available 24/7
                  </p>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link href="/donate" className="block text-primary hover:underline">
                    Make a Donation
                  </Link>
                  <Link href="/volunteer" className="block text-primary hover:underline">
                    Volunteer Opportunities
                  </Link>
                  <Link href="/careers" className="block text-primary hover:underline">
                    Career Openings
                  </Link>
                  <Link href="/news" className="block text-primary hover:underline">
                    Latest News
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Find quick answers to common questions about our organization and programs.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <Button type="button" variant="outline" onClick={handleSupportEmailClick}>
                <Mail className="w-4 h-4 mr-2" />
                Email Our Support Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-secondary/50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-foreground mb-2">Our Headquarters</h3>
            <p className="text-muted-foreground">HOPE FOR CHANGE, Kigali</p>
            <Button asChild variant="outline" className="mt-4">
              <a href="https://maps.google.com/?q=Kigali,Rwanda" target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
