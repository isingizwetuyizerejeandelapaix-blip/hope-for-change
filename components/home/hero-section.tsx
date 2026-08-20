"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Heart, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/logo23.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/50 dark:from-background/95 dark:via-background/80 dark:to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground dark:text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Future with good life
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-yellow-400 dark:text-foreground leading-tight mb-6"
          >
            Hope For Changes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 dark:text-muted-foreground mb-8 max-w-2xl"
          >
            To build empowered, educated and resilient communities where vulnerable people live with dignity, hope and equal opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="text-base">
              <Link href="/donate">
                <Heart className="w-5 h-5 mr-2" />
                Donate Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base bg-yellow-400/10 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/20 dark:bg-background/50 dark:border-border dark:text-foreground">
              <Link href="/about">
                Learn Our Story
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>

          {/* Video CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 flex items-center gap-4"
          > 
            <button className="w-14 h-14 rounded-full bg-yellow-400/20 backdrop-blur-sm flex items-center justify-center hover:bg-yellow-400/30 transition-colors group">
              <Play className="w-6 h-6 text-yellow-400 fill-yellow-400 ml-1 group-hover:scale-110 transition-transform" />
            </button>
            <div>
              <p className="text-yellow-400/90 dark:text-foreground font-medium">Watch Our Impact</p>
              <p className="text-yellow-400/60 dark:text-muted-foreground text-sm">2 minute video</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 rounded-full border-2 border-yellow-400/30 dark:border-border flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 rounded-full bg-yellow-400 dark:bg-primary"
          />
        </div>
      </motion.div>
    </section>
  )
}
