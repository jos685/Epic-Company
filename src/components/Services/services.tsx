'use client'

import { motion } from 'framer-motion'
import {
  Code,
  Paintbrush,
  ServerCog,
  ShoppingCart,
  ShieldCheck,
  Cloud,
  Wifi,
  MessageCircleCode,
  DatabaseZap,
  Globe,
} from 'lucide-react'

const services = [
  {
    title: 'Web Development',
    description:
      'We build fast, secure, responsive websites using modern stacks like Next.js, Laravel, Django, and Node.js.',
    icon: <Code size={40} className="text-blue-600" />,
  },
  {
    title: 'UI/UX Design',
    description:
      'Crafting beautiful and intuitive designs using Figma, Tailwind CSS, and clean user-centered interfaces.',
    icon: <Paintbrush size={40} className="text-pink-500" />,
  },
  {
    title: 'Cloud & DevOps',
    description:
      'Scalable deployments with AWS, Docker, Vercel, CI/CD pipelines, and cloud-native architecture.',
    icon: <ServerCog size={40} className="text-green-600" />,
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'We build feature-rich e-commerce platforms with vendor dashboards and M-Pesa/PayPal integration.',
    icon: <ShoppingCart size={40} className="text-purple-600" />,
  },
  {
    title: 'Cybersecurity & Pen Testing',
    description:
      'We secure applications with vulnerability testing, endpoint protection, and secure authentication flows.',
    icon: <ShieldCheck size={40} className="text-red-600" />,
  },
  {
    title: 'IoT & Smart Systems',
    description:
      'Smart farming and automation systems using IoT sensors, Python backends, and real-time dashboards.',
    icon: <Cloud size={40} className="text-indigo-600" />,
  },
  {
    title: 'Wi-Fi Payment Systems',
    description:
      'Offer secure internet access via M-Pesa or PayPal with device session tracking and real-time validation.',
    icon: <Wifi size={40} className="text-yellow-500" />,
  },
  {
    title: 'Chat & Real-Time Messaging',
    description:
      'Build real-time communication apps with Socket.io, JWT auth, push notifications, and chat features.',
    icon: <MessageCircleCode size={40} className="text-cyan-600" />,
  },
  {
    title: 'Database & API Engineering',
    description:
      'Optimized PostgreSQL, MySQL & MongoDB schemas with robust RESTful API architecture.',
    icon: <DatabaseZap size={40} className="text-teal-600" />,
  },
  {
    title: 'Google Business Profile Setup',
    description:
      'We help local businesses claim, verify, and optimize their Google listings for better visibility and SEO.',
    icon: <Globe size={40} className="text-orange-600" />,
  },
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gray-300 text-center px-6">
      <h2 className="text-4xl font-bold mb-12 text-red-500">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition duration-300"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-700">{service.title}</h3>
            <p className="text-sm text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
