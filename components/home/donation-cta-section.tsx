"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DonationCTASection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-primary/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8">
            <Heart className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Your Donation Saves Lives
          </h2>
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Every contribution, no matter the size, helps us deliver critical support 
            to those who need it most. Join us in our mission to create a healthier world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-base">
              <Link href="/donate">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="text-base bg-transparent border-white text-white hover:bg-white/10"
            >
              <Link href="/volunteer">
                Join Our Team
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Donation amounts */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[25, 50, 100].map((amount) => (
              <motion.div
                key={amount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={`/donate?amount=${amount}`}
                  className="block py-4 px-6 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white font-bold text-lg"
                >
                  ${amount}
                </Link>
              </motion.div>
            ))}
          </div>
          
          <p className="mt-6 text-sm text-white/70">
            85% of every donation goes directly to community programs
          </p>
        </motion.div>
      </div>
    </section>
  )
}
