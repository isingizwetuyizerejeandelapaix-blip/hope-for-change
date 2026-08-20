import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, Users } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { careers } from "@/lib/data"

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border bg-secondary/30 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-primary text-sm font-medium uppercase tracking-wider">Join Our Team</span>
            <h1 className="mt-4 mb-6 text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl text-balance">
              Work that moves communities forward.
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Bring your skills, curiosity, and care to a team building practical solutions with communities across the world.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Open Positions</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">Find your place in the work</h2>
            </div>
            <p className="max-w-md text-muted-foreground">We value thoughtful collaboration, local knowledge, and people who turn good intentions into measurable progress.</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {careers.map((career) => (
              <Card key={career.id} className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BriefcaseBusiness className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary">{career.type}</Badge>
                  </div>
                  <CardTitle className="text-xl">{career.title}</CardTitle>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span>{career.department}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-5 text-muted-foreground">{career.description}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {career.requirements.map((requirement) => (
                      <Badge key={requirement} variant="outline">{requirement}</Badge>
                    ))}
                  </div>
                  <Button asChild>
                    <Link href={`/contact?career=${career.id}`}>
                      Ask about this role
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-secondary/30 p-8 md:flex-row md:items-center">
            <div className="flex gap-4">
              <Users className="mt-1 h-6 w-6 shrink-0 text-primary" />
              <div>
                <h2 className="text-xl font-bold text-foreground">Do not see the right opening?</h2>
                <p className="mt-1 text-muted-foreground">Tell us how your experience could strengthen our work.</p>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link href="/contact">Contact our team</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
