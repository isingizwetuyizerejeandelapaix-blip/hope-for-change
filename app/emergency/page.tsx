"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { AlertTriangle, MapPin, Heart, ArrowRight, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { emergencyResponses } from "@/lib/data"

export default function EmergencyPage() {
  const heroRef = useRef(null)
  const responsesRef = useRef(null)
  const responsesInView = useInView(responsesRef, { once: true, margin: "-100px" })

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/logo23.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/80 to-foreground/60 dark:from-background/95 dark:via-background/85 dark:to-background/70" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-foreground mt-4 mb-6 text-balance"
            >
              Emergency Response: When Every Second Counts
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 dark:text-muted-foreground mb-8"
            >
              Our rapid response teams are on the ground in crisis zones, ready to support communities in need,
              providing life-saving healthcare and support to those caught in the midst of disasters and conflicts.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg">
                <Link href="/donate?campaign=emergency">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate to Emergency Fund
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Responses */}
      <section ref={responsesRef} className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={responsesInView ? { opacity: 1, y: 0 } : {}}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Current Crisis Response Operations
            </h2>
            <p className="text-lg text-muted-foreground">
       Responding to emergencies and disasters by providing immediate humanitarian support to affected communities during crises.
            </p>
          </motion.div>

          <div className="space-y-8">
            {emergencyResponses.map((emergency, index) => {
              return (
                <motion.div
                  key={emergency.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={responsesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="grid lg:grid-cols-3">
                      {/* Image */}
                      <div className="relative h-64 lg:h-auto">
                        <Image
                          src={emergency.image}
                          alt={emergency.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content */}
                      <CardContent className="lg:col-span-2 p-6 lg:p-8">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                              <MapPin className="w-4 h-4" />
                              {emergency.location}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-3">
                              {emergency.title}
                            </h3>
                            <p className="text-muted-foreground mb-6">
                              {emergency.description}
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild className="flex-1">
                              <Link href={`/donate?campaign=${emergency.id}`}>
                                <Heart className="w-4 h-4 mr-2" />
                                Donate Now
                              </Link>
                            </Button>
                            <Button asChild variant="outline">
                              <Link href={`/news?category=${emergency.id}`}>
                                Learn More
                                <ArrowRight className="w-4 h-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How We Respond */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-balance">
              How We Respond to Emergencies
            </h2>
            <p className="text-lg text-muted-foreground">
              Our emergency response protocol ensures rapid, effective aid reaches 
              those in need within 72 hours of a crisis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Alert & Assessment",
                description: "Our monitoring team identifies emerging crises and assesses community needs on the ground.",
              },
              {
                step: "02",
                title: "Team Mobilization",
                description: "Specialized emergency response teams are deployed within 24-72 hours of crisis onset.",
              },
              {
                step: "03",
                title: "Field Operations",
                description: "Field hospitals and mobile clinics are established to provide comprehensive care.",
              },
              {
                step: "04",
                title: "Sustained Support",
                description: "We maintain presence as long as needed, transitioning to long-term recovery programs.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl font-bold text-primary/20 mb-4">{item.step}</div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Fund CTA */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <AlertTriangle className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
              Support Our Emergency Response Fund
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Unrestricted emergency funds allow us to respond immediately when disaster strikes, 
              without waiting for campaign-specific donations. Your support today saves lives tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/donate?campaign=emergency">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate to Emergency Fund
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/volunteer">
                  <Users className="w-5 h-5 mr-2" />
                  Join Response Team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
