'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  return (
<<<<<<< HEAD
    <section id="contact" className="py-24 px-6 bg-50">
=======
    <section id="contact" className="py-24 px-6 bg-gray-50 text-gray-800">
>>>>>>> 5dc3376 (Intialized the project to github after setting up everything)
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Get in Touch</h2>
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6"
        >
          <input type="text" placeholder="Your Name" className="p-4 border rounded-xl" />
          <input type="email" placeholder="Your Email" className="p-4 border rounded-xl" />
          <textarea placeholder="Your Message" rows={5} className="p-4 border rounded-xl" />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </motion.form>

        <div className="mt-12 w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500">
          {/* You can embed a map iframe or use Mapbox/Leaflet */}
          Map location coming soon
        </div>
      </div>
    </section>
  )
}
