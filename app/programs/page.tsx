"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowRight, Ambulance, Heart, Syringe, Scissors, Brain, Apple, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { programs } from "@/lib/data"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ambulance: Ambulance,
  heart: Heart,
  syringe: Syringe,
  scissors: Scissors,
  brain: Brain,
  apple: Apple,
}

const categories = ["All", "Emergency", "Primary Care", "Specialized Care", "Prevention"]

export default function ProgramsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const heroRef = useRef(null)
  const programsRef = useRef(null)
  const programsInView = useInView(programsRef, { once: true, margin: "-100px" })

  const filteredPrograms = programs.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      program.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

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
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-medium text-sm uppercase tracking-wider"
            >
              Our Programs
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white dark:text-foreground mt-4 mb-6 text-balance"
            >
              Featured Programs That Transform Lives
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/80 dark:text-muted-foreground mb-8"
            >
              From emergency response to long-term healthcare development, our comprehensive 
              programs address critical community needs in vulnerable communities.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative max-w-md"
            >
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 dark:bg-background/50 dark:border-border dark:text-foreground"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">6</div>
              <div className="text-sm text-primary-foreground/80">Core Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24/7</div>
              <div className="text-sm text-primary-foreground/80">Community Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold">2.5M+</div>
              <div className="text-sm text-primary-foreground/80">Lives Impacted</div>
            </div>
            <div>
              <div className="text-3xl font-bold">3,500+</div>
              <div className="text-sm text-primary-foreground/80">Program Staff</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section ref={programsRef} className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Programs */}
          <div className="space-y-16">
            {filteredPrograms.map((program, index) => {
              const IconComponent = iconMap[program.icon] || Heart
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={program.id}
                  id={program.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={programsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Image */}
                  <div className={`relative ${isEven ? "" : "lg:col-start-2"}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                      />
                      {program.featured && (
                        <Badge className="absolute top-4 left-4">Featured Program</Badge>
                      )}
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                      <IconComponent className="w-12 h-12 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={isEven ? "" : "lg:col-start-1 lg:row-start-1"}>
                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                      {program.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {program.description}
                    </p>

                    {program.budget && (
                      <div className="mb-6">
                        <div className="mb-2 flex items-center justify-between text-sm gap-3">
                          <span className="text-muted-foreground">${program.budget.raised.toLocaleString()} raised</span>
                          <span className="font-medium text-foreground">Goal: ${program.budget.goal.toLocaleString()}</span>
                        </div>
                        <Progress
                          value={(program.budget.raised / program.budget.goal) * 100}
                          className="h-3"
                        />
                      </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{program.stats.helped}</div>
                          <div className="text-sm text-muted-foreground">People Helped</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">{program.stats.countries}</div>
                          <div className="text-sm text-muted-foreground">Service Area</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-primary">
                            {Object.values(program.stats)[2]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {Object.keys(program.stats)[2] === "teams" ? "Teams" : 
                             Object.keys(program.stats)[2] === "clinics" ? "Clinics" :
                             Object.keys(program.stats)[2] === "vaccines" ? "Vaccines" :
                             Object.keys(program.stats)[2] === "surgeries" ? "Surgeries" :
                             Object.keys(program.stats)[2] === "counselors" ? "Counselors" :
                             Object.keys(program.stats)[2] === "centers" ? "Centers" : "Active"}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <Button asChild>
                        <Link href={`/donate?program=${program.id}`}>
                          <Heart className="w-4 h-4 mr-2" />
                          Support This Program
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/volunteer">
                          <Users className="w-4 h-4 mr-2" />
                          Volunteer
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Budget Overview */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-10 text-center">
              <div className="text-sm uppercase tracking-[0.2em] text-primary font-medium">Funding Overview</div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">Program Budget Progress</h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {programs.map((program) => (
                <div key={program.id} className="rounded-2xl border border-border bg-background p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                      {Math.min(Math.round((program.budget.raised / program.budget.goal) * 100), 100)}%
                    </span>
                  </div>

                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Raised: ${program.budget.raised.toLocaleString()}</span>
                    <span className="font-medium text-foreground">Goal: ${program.budget.goal.toLocaleString()}</span>
                  </div>

                  <Progress value={(program.budget.raised / program.budget.goal) * 100} className="h-2.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-balance">
              Help Us Expand Our Reach
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Your support enables us to scale our programs and reach more communities in need. 
              Together, we can build a healthier world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/donate">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10"
              >
                <Link href="/contact">
                  Partner With Us
                  <ArrowRight className="w-5 h-5 ml-2" />
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
