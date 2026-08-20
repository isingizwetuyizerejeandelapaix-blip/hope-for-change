import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const sections = [
  ["Using this website", "This website exists to share Hope For Changes programs, stories, opportunities, and ways to support our work. Please use it lawfully and respectfully."],
  ["Donations", "Donation amounts and designations are submitted through our payment provider. Please review your details before submitting. Donation confirmations and receipts are sent to the contact information you provide."],
  ["Content and stories", "Site content is provided for general information. Stories, images, and program details may change as our work develops. Please contact us before relying on information for a time-sensitive decision."],
  ["External services", "Some links lead to third-party services, including payment, mapping, social, and communication platforms. Their own terms and privacy policies apply when you use them."],
  ["Questions", "Questions about these terms can be sent to hopeforchangesorganization@gmail.com. We may update these terms as the organization and website evolve."],
]

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="border-b border-border bg-secondary/30 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Website Guidelines</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">Terms of Service</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">The simple guidelines for using the Hope For Changes website and supporting our work online.</p>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: August 20, 2026</p>
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map(([title, body]) => (
              <section key={title}>
                <h2 className="mb-3 text-2xl font-bold text-foreground">{title}</h2>
                <p className="leading-8 text-muted-foreground">{body}</p>
              </section>
            ))}
          </div>
          <Button asChild variant="outline" className="mt-12">
            <Link href="/contact"><ArrowLeft className="mr-2 h-4 w-4" />Contact us</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </main>
  )
}
