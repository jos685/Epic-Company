'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6"
      role="banner" // Added for accessibility
      aria-label="Main hero section" // Added for screen readers
    >
      {/* Semantic header within section */}
      <header className="text-center max-w-3xl">
        {/* Main heading with proper hierarchy */}
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          itemProp="headline" // Added for structured data
        >
          Empower Your Business with AI Solutions That 
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Boost Productivity by 40%
          </span>
        </motion.h1>

        {/* Supporting paragraph with keyword-rich content */}
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          itemProp="description" // Added for structured data
        >
          Cut operational costs by 30% with our intelligent AI agents, robotic process automation, 
          and high-performance web applications. No technical expertise required - 
          <strong> start seeing results in weeks, not months</strong>.
        </motion.p>

        {/* Primary call-to-action */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900" // Added focus styles for accessibility
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get started with AI solutions for your business" // Added for accessibility
          role="button" // Explicit role for better semantics
        >
          <span className="flex items-center gap-2">
            🚀 Start Your AI Transformation
            <ArrowRight size={20} aria-hidden="true" /> {/* Hide decorative icon from screen readers */}
          </span>
        </motion.a>

        {/* Secondary trust indicators */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>No Coding Required</span>
          </div>
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <span>Setup in 48 Hours</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>30-Day Money Back</span>
          </div>
        </motion.div>
      </header>
    </section>
  )
}