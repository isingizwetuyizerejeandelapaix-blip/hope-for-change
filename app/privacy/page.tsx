import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const sections = [
  ["Information we collect", "We collect information you choose to share with us, such as your name, email address, donation details, and messages sent through our forms. We may also collect basic usage information that helps us improve the site."],
  ["How we use information", "We use information to process donations, respond to inquiries, coordinate volunteering, share updates you request, and keep our services secure. We do not sell personal information."],
  ["Donations and payments", "Payments are handled by trusted payment providers. Hope For Changes does not store complete payment card numbers on this website."],
  ["Your choices", "You can contact us to update your information, unsubscribe from communications, or ask questions about how your information is used."],
  ["Contact", "For privacy questions, please contact hopeforchangesorganization@gmail.com. We will review and respond to reasonable requests as promptly as possible."],
]

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="border-b border-border bg-secondary/30 pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Your Privacy</p>
          <h1 className="mt-4 text-4xl font-bold text-foreground sm:text-5xl">Privacy Policy</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">How Hope For Changes collects, uses, and protects the information you share with us.</p>
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
