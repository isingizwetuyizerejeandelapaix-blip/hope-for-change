"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, MapPin, Clock, Check, Heart, ArrowRight, Globe, Award } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { volunteerPositions, faqs } from "@/lib/data"

const volunteerBenefits = [
  { icon: Globe, title: "Meaningful Impact", description: "Support communities directly with hands-on help where it matters most." },
  { icon: Award, title: "Professional Growth", description: "Gain valuable field experience and specialized training." },
  { icon: Users, title: "Community", description: "Join a network of dedicated healthcare professionals committed to local impact." },
  { icon: Heart, title: "Meaningful Work", description: "Directly save lives and improve health outcomes." },
]

const WEB3FORMS_ACCESS_KEY = '6427b36f-0970-4fab-9fad-044355178af7'

export default function VolunteerPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [selectedPosition, setSelectedPosition] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const positionsRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const positionsInView = useInView(positionsRef, { once: true, margin: "-100px" })
  const formInView = useInView(formRef, { once: true, margin: "-100px" })

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
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'Volunteer Application Submission')
    formData.append(
      'from_name',
      `${formData.get('firstName') ?? ''} ${formData.get('lastName') ?? ''}`.trim()
    )
    formData.append('redirect', '')

    const messageBody = [
      `Position of Interest: ${formData.get('position') ?? ''}`,
      `Current Profession: ${formData.get('profession') ?? ''}`,
      `Years of Experience: ${formData.get('experience') ?? ''}`,
      `Availability: ${formData.get('availability') ?? ''}`,
      `Current Location: ${formData.get('location') ?? ''}`,
      `Languages Spoken: ${formData.get('languages') ?? ''}`,
      `Phone: ${formData.get('phone') ?? ''}`,
      '',
      `Motivation:\n${formData.get('motivation') ?? ''}`,
    ].join('\n')

    formData.set('message', messageBody)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (response.ok && result.success) {
        setFormStatus('success')
        setFormSubmitted(true)
        formRef.current.reset()
        setSelectedPosition('')
        setSelectedExperience('')
        setSelectedAvailability('')
      } else {
        setFormStatus('error')
        setErrorMessage(result.message || 'Unable to submit your application. Please try again.')
      }
    } catch (error) {
      setFormStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/logo23.jpg')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60 dark:from-background/95 dark:via-background/85 dark:to-background/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Join Our Team
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-foreground mt-4 mb-6 text-balance"
            >
              Volunteer Your Skills, Save Lives
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 dark:text-muted-foreground mb-8"
            >
              Join thousands of healthcare professionals and support staff who have dedicated 
              their time and expertise to our humanitarian mission.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg">
                <Link href="#apply">
                  Apply Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 dark:bg-background/50 dark:border-border dark:text-foreground">
                <Link href="#positions">
                  View Positions
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">3+</div>
              <div className="text-sm text-primary-foreground/80">Active Volunteers</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-primary-foreground/80">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm text-primary-foreground/80">Specialties Needed</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-primary-foreground/80">Volunteer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Why Volunteer With Us
            </h2>
            <p className="text-lg text-muted-foreground">
              Volunteering with Hope For Changes is more than a job - it&apos;s an opportunity 
              to make a lasting difference while growing professionally.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {volunteerBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <benefit.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section ref={positionsRef} id="positions" className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              Current Volunteer Opportunities
            </h2>
            <p className="text-lg text-muted-foreground">
              We&apos;re seeking dedicated individuals across various specialties. 
              Find your place in our global team.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {volunteerPositions.map((position, index) => (
              <motion.div
                key={position.id}
                initial={{ opacity: 0, y: 20 }}
                animate={positionsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{position.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {position.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {position.commitment}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary">Volunteer</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{position.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Requirements:</p>
                      <ul className="space-y-1">
                        {position.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="w-full mt-6">
                      <Link href="#apply">Apply for This Role</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section ref={formRef} id="apply" className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
                Apply to Volunteer
              </h2>
              <p className="text-lg text-muted-foreground">
                Start your journey with Hpe For Changes. We&apos;ll review your application 
                and reach out within 2 weeks.
              </p>
            </motion.div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-8">
                  <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Application Submitted!
                </h3>
                <p className="text-muted-foreground mb-8">
                  Thank you for your interest in volunteering with Hope For Changes. 
                  Our recruitment team will review your application and contact you within 2 weeks.
                </p>
                <Button asChild>
                  <Link href="/">Return Home</Link>
                </Button>
              </motion.div>
            ) : (
              <motion.form
                ref={formRef}
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
              >
                <Card>
                  <CardContent className="p-6 lg:p-8 space-y-6">
                    {formStatus === 'error' && errorMessage ? (
                      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                        {errorMessage}
                      </div>
                    ) : null}

                    {/* Personal Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input id="firstName" name="firstName" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input id="lastName" name="lastName" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" name="email" type="email" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" name="phone" type="tel" className="mt-1" />
                        </div>
                        <div className="sm:col-span-2">
                          <Label htmlFor="location">Current Location *</Label>
                          <Input id="location" name="location" placeholder="City" className="mt-1" required />
                        </div>
                      </div>
                    </div>

                    {/* Professional Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Professional Background</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="position">Position of Interest *</Label>
                          <Select name="position" value={selectedPosition} onValueChange={setSelectedPosition} required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                            <SelectContent>
                              {volunteerPositions.map((pos) => (
                                <SelectItem key={pos.id} value={pos.id}>
                                  {pos.title}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="profession">Current Profession *</Label>
                          <Input id="profession" name="profession" className="mt-1" required />
                        </div>
                        <div>
                          <Label htmlFor="experience">Years of Experience *</Label>
                          <Select name="experience" value={selectedExperience} onValueChange={setSelectedExperience} required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select experience level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">0-2 years</SelectItem>
                              <SelectItem value="3-5">3-5 years</SelectItem>
                              <SelectItem value="6-10">6-10 years</SelectItem>
                              <SelectItem value="10+">10+ years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="languages">Languages Spoken</Label>
                          <Input id="languages" name="languages" placeholder="e.g., English, Spanish, French" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-4">Availability</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="availability">Commitment Availability *</Label>
                          <Select name="availability" value={selectedAvailability} onValueChange={setSelectedAvailability} required>
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1-3months">1-3 months</SelectItem>
                              <SelectItem value="3-6months">3-6 months</SelectItem>
                              <SelectItem value="6-12months">6-12 months</SelectItem>
                              <SelectItem value="flexible">Flexible</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="startDate">Earliest Start Date</Label>
                          <Input id="startDate" name="startDate" type="date" className="mt-1" />
                        </div>
                      </div>
                    </div>

                    {/* Motivation */}
                    <div>
                      <Label htmlFor="motivation">Why do you want to volunteer with Hope For Changes? *</Label>
                      <Textarea 
                        id="motivation"
                        name="motivation"
                        rows={4} 
                        className="mt-1" 
                        placeholder="Tell us about your motivation and what you hope to contribute..."
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full h-12 text-base" disabled={formStatus === 'submitting'}>
                      <Users className="w-5 h-5 mr-2" />
                      {formStatus === 'submitting' ? 'Submitting...' : 'Submit Application'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.filter(faq => faq.question.toLowerCase().includes('volunteer') || 
                faq.question.toLowerCase().includes('qualification')).concat(
                  faqs.filter(faq => !faq.question.toLowerCase().includes('volunteer') && 
                    !faq.question.toLowerCase().includes('qualification')).slice(0, 3)
                ).map((faq, index) => (
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
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
