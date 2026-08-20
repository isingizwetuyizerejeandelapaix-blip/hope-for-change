import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { StatsSection } from "@/components/home/stats-section"
import { ProgramsSection } from "@/components/home/programs-section"
import { EmergencySection } from "@/components/home/emergency-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { DonationCTASection } from "@/components/home/donation-cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProgramsSection />
      <EmergencySection />
      <TestimonialsSection />
      <DonationCTASection />
      <Footer />
    </main>
  )
}
