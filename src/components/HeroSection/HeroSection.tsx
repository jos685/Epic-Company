'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'


export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6">

      <div className="text-center max-w-3xl">
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Empowering Businesses with AI, Robotics & High-Performance Web Solutions
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          From intelligent agents to automated systems and scalable websites - we bring your next big idea to life.
        </motion.p>

        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >

          🚀 Build with AI Now 

          <ArrowRight size={20} />
        </motion.a>
      </div>
    </section>
  )
}
