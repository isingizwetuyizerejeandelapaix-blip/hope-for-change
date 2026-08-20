"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { AlertTriangle, ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { emergencyResponses } from "@/lib/data"

export function EmergencySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-destructive mb-4">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium text-sm uppercase tracking-wider">
                Active Projects
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Hope in Action
            </h2>
            <p className="text-lg text-muted-foreground">
              At Hope for Change, we believe every person deserves the opportunity to thrive. Your support enables us to empower communities, improve lives, and build a better future for generations to come.
            </p>
          </div>
          <Button asChild variant="outline" size="lg" className="self-start lg:self-auto">
            <Link href="/emergency">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>

        {/* Emergency Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {emergencyResponses.slice(0, 4).map((emergency, index) => {
            return (
              <motion.div
                key={emergency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-48 h-48 sm:h-auto shrink-0">
                      <Image
                        src={emergency.image}
                        alt={emergency.title}
                        fill
                        className="object-cover"
                      />
                      <Badge
                        variant={emergency.urgency === "critical" ? "destructive" : "secondary"}
                        className="absolute top-3 left-3"
                      >
                        {emergency.urgency === "critical" ? "Critical" : "High Priority"}
                      </Badge>
                    </div>
                    <CardContent className="flex-1 p-5">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {emergency.location}
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {emergency.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {emergency.description}
                      </p>
                      <Button asChild size="sm" className="mt-4 w-full">
                        <Link href={`/donate?campaign=${emergency.id}`}>
                          Donate to This Project
                        </Link>
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
