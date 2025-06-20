'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const projects = [
  {
    title: 'Ecommerce Platform',
    image: '/images/ecommerce.jpg',
  },
  {
    title: 'Smart Farming App',
    image: '/images/farming.jpg',
  },
  {
    title: 'Wi-Fi Payment System',
    image: '/images/wifi.jpg',
  },
  {
    title: 'Multivendor Marketplace',
    image: '/images/marketplace.jpg',
  },
  {
    title: 'Multivendor Marketplace',
    image: '/images/marketplace.jpg',
  },
  {
    title: 'Multivendor Marketplace',
    image: '/images/marketplace.jpg',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-gray-100 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Portfolio</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="relative group rounded-lg overflow-hidden shadow-lg"
          >
            <Image  src={project.image} alt={project.title} className="w-full h-60 object-cover"  width={200}
           height={40} />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-lg font-semibold">
              {project.title}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
