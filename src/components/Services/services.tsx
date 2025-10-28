'use client'

import { motion } from 'framer-motion'
import {
  Bot,
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
    title: 'AI Agents & Business Automation',
    description:
      'Deploy intelligent AI agents to automate customer service, data entry, and workflow processes. Reduce operational costs by up to 40% with 24/7 automated systems.',
    icon: <Bot size={40} className="text-blue-600" aria-hidden="true" />,
    keywords: 'AI automation, business process automation, intelligent agents'
  },
  {
    title: 'Web & Mobile App Development',
    description:
      'High-performance websites and mobile apps built with Next.js, React Native, and modern frameworks. Fast loading, SEO-optimized, and mobile-responsive designs.',
    icon: <Code size={40} className="text-blue-600" aria-hidden="true" />,
    keywords: 'web development, mobile apps, Next.js development'
  },
  {
    title: 'UI/UX Design & Branding',
    description:
      'User-centered designs that convert visitors into customers. Beautiful interfaces with Figma, responsive layouts with Tailwind CSS, and compelling brand identities.',
    icon: <Paintbrush size={40} className="text-pink-500" aria-hidden="true" />,
    keywords: 'UI/UX design, branding, web design'
  },
  {
    title: 'SEO Optimization Services',
    description:
      'Get your website ranking on Google\'s first page. Comprehensive SEO audits, keyword strategy, on-page optimization, and technical SEO implementation.',
    icon: <ServerCog size={40} className="text-green-600" aria-hidden="true" />,
    keywords: 'SEO services, Google ranking, search engine optimization'
  },
  {
    title: 'E-Commerce Solutions',
    description:
      'Complete online stores with vendor dashboards, inventory management, and secure payment gateways (M-Pesa, PayPal, Stripe). Mobile-optimized shopping experiences.',
    icon: <ShoppingCart size={40} className="text-purple-600" aria-hidden="true" />,
    keywords: 'e-commerce development, online store, payment integration'
  },
  {
    title: 'Cybersecurity & Penetration Testing',
    description:
      'Protect your business from threats with comprehensive security audits, vulnerability testing, and secure authentication systems. Enterprise-grade protection.',
    icon: <ShieldCheck size={40} className="text-red-600" aria-hidden="true" />,
    keywords: 'cybersecurity, penetration testing, web security'
  },
  {
    title: 'IoT & Smart Automation Systems',
    description:
      'Smart farming solutions, industrial automation, and real-time monitoring systems with IoT sensors, Python backends, and interactive dashboards.',
    icon: <Cloud size={40} className="text-indigo-600" aria-hidden="true" />,
    keywords: 'IoT solutions, smart systems, automation'
  },
  {
    title: 'Wi-Fi Payment & Access Systems',
    description:
      'Monetize your Wi-Fi with secure payment integration (M-Pesa, PayPal). Session management, user authentication, and real-time payment validation.',
    icon: <Wifi size={40} className="text-yellow-500" aria-hidden="true" />,
    keywords: 'Wi-Fi payment systems, internet monetization'
  },
  {
    title: 'Real-Time Chat & Messaging Apps',
    description:
      'Build engaging communication platforms with live chat, push notifications, and real-time features using Socket.io and WebSocket technology.',
    icon: <MessageCircleCode size={40} className="text-cyan-600" aria-hidden="true" />,
    keywords: 'chat applications, real-time messaging, live chat'
  },
  {
    title: 'Database & API Development',
    description:
      'Optimized database architecture (PostgreSQL, MongoDB) with scalable RESTful APIs. High-performance backend systems for your applications.',
    icon: <DatabaseZap size={40} className="text-teal-600" aria-hidden="true" />,
    keywords: 'database design, API development, backend services'
  },
  {
    title: 'Google Business Profile Optimization',
    description:
      'Get found locally with optimized Google Business listings. We handle verification, optimization, and review management to boost your local SEO rankings.',
    icon: <Globe size={40} className="text-orange-600" aria-hidden="true" />,
    keywords: 'Google Business Profile, local SEO, business listing'
  },
]

export default function Services() {
  return (
    <section 
      id="services" 
      className="py-24 bg-gray-50 text-center px-6" // Changed to lighter background for better contrast
      aria-labelledby="services-heading"
    >
      <div className="max-w-4xl mx-auto mb-16">
        {/* Optimized heading with semantic structure */}
        <motion.h2
          id="services-heading"
          className="text-4xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Comprehensive <span className="text-red-500">Digital Solutions</span> for Modern Businesses
        </motion.h2>
        
        {/* Supporting paragraph for context */}
        <motion.p
          className="text-lg text-gray-600 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          From AI automation to full-stack development, we provide end-to-end solutions 
          that drive growth and efficiency for businesses of all sizes.
        </motion.p>
      </div>

      {/* Services grid with semantic list */}
      <div 
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        role="list"
        aria-label="Our service offerings"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:border-red-200"
            role="listitem"
            itemScope
            itemType="https://schema.org/Service"
          >
            <div className="mb-6 flex justify-center">
              <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-red-50 transition-colors">
                {service.icon}
              </div>
            </div>
            
            <h3 
              className="text-xl font-semibold mb-4 text-gray-800 group-hover:text-red-600 transition-colors"
              itemProp="name"
            >
              {service.title}
            </h3>
            
            <p 
              className="text-gray-600 leading-relaxed mb-4"
              itemProp="description"
            >
              {service.description}
            </p>

            {/* Added call-to-action for better conversions */}
            <div className="mt-4">
              <button 
                className="text-red-500 font-medium text-sm hover:text-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Added trust section at bottom */}
      <motion.div
        className="mt-16 bg-white rounded-2xl p-8 max-w-4xl mx-auto shadow-lg border border-gray-200"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Why Choose Our Services?
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Proven Results & Case Studies</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>30-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-green-500 font-bold">✓</span>
            <span>Ongoing Support & Maintenance</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}