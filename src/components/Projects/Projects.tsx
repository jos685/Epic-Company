'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, MessageCircleCode, Star, TrendingUp } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'E-Commerce Platform with M-Pesa Integration',
    description: 'Built a full-stack e-commerce solution that processes 500+ monthly transactions with real-time inventory management, vendor dashboards, and seamless M-Pesa payment integration. Increased client sales by 200% in first 3 months.',
    image: '/images/ecommerce.jpg', 
    alt: 'E-commerce platform dashboard showing sales analytics and M-Pesa payment integration',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'M-Pesa API'],
    category: 'Web Development',
    liveUrl: 'https://frontend-git-main-jos685s-projects.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['200% sales increase', '500+ monthly transactions', '2s page load time']
  },
  {
    title: 'AI-Powered Customer Service Chat System',
    description: 'Developed intelligent chatbot with natural language processing that handles 1,000+ daily customer inquiries, reducing response time from 5 minutes to 15 seconds with 94% customer satisfaction rate.',
    image: '/images/chatbot.jpg',
    alt: 'AI chatbot interface showing real-time customer conversations and analytics',
    technologies: ['Python', 'React', 'Socket.io', 'OpenAI API'],
    category: 'AI & Automation',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
    results: ['94% satisfaction', '1k+ daily queries', '15s response time']
  },
  {
    title: 'Business Website Development & SEO Optimization',
    description: 'Designed and developed responsive business websites with SEO optimization, resulting in 300% organic traffic growth and top 3 Google rankings for key service keywords within 90 days.',
    image: '/images/website.jpg',
    alt: 'Responsive business website design showing mobile and desktop optimization',
    technologies: ['Next.js', 'Tailwind CSS', 'SEO', 'Vercel'],
    category: 'Web Development',
    liveUrl: 'https://stmarys-mukuru.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['300% traffic growth', 'Top 3 rankings', '90-day results']
  },
  {
    title: 'M-Pesa Payment Integration API',
    description: 'Engineered secure M-Pesa payment gateway processing $50k+ monthly transactions with 99.9% uptime, featuring real-time validation, transaction history, and automated reconciliation.',
    image: '/images/mpesa.jpg',
    alt: 'M-Pesa payment integration dashboard showing transaction analytics and security features',
    technologies: ['React Native', 'Firebase', 'M-Pesa API', 'Redux'],
    category: 'Payment Systems',
    liveUrl: 'https://mpesa.epicsoftwares.shop',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['$50k+ monthly', '99.9% uptime', 'Secure API']
  },
  {
    title: 'IoT Smart Farm Monitoring System',
    description: 'Implemented IoT-based smart farming solution with sensor networks that reduced water usage by 40% and increased crop yield by 25% through real-time environmental monitoring.',
    image: '/images/IOT.jpg',
    alt: 'IoT farm monitoring dashboard showing sensor data and environmental analytics',
    technologies: ['Python', 'React', 'IoT Sensors', 'AWS'],
    category: 'IoT Systems',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
    results: ['40% water savings', '25% yield increase', 'Real-time monitoring']
  },
  {
    title: 'Wi-Fi Payment Gateway with Session Management',
    description: 'Built secure Wi-Fi monetization platform with M-Pesa integration, managing 10,000+ user sessions monthly with automated billing and real-time access control.',
    image: '/images/wifi.png',
    alt: 'Wi-Fi payment gateway interface showing user sessions and payment analytics',
    technologies: ['Next.js', 'Node.js', 'M-Pesa API', 'MongoDB'],
    category: 'Payment Systems',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['10k+ sessions', 'Automated billing', 'Secure access']
  },
  {
    title: 'Cybersecurity Threat Detection Dashboard',
    description: 'Developed comprehensive security monitoring platform that identified and prevented 1,200+ potential threats monthly with real-time alerts and automated response protocols.',
    image: '/images/cyber.jpg',
    alt: 'Cybersecurity dashboard showing threat detection metrics and security analytics',
    technologies: ['React', 'Python', 'Cyber Security', 'API'],
    category: 'Cybersecurity',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false,
    results: ['1.2k threats blocked', 'Real-time alerts', 'Automated response']
  },
  {
    title: 'Google Business Profile Optimization Service',
    description: 'Optimized 50+ local business Google listings resulting in 400% increase in map views and 150% growth in customer calls within 60 days through strategic SEO and review management.',
    image: '/images/business.jpg',
    alt: 'Google Business Profile optimization results showing increased visibility and engagement',
    technologies: ['Google API', 'SEO', 'Local Search', 'Analytics'],
    category: 'Local SEO',
    liveUrl: 'https://kimap.org/find-school/',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['400% map views', '150% call growth', '60-day results']
  },
  {
    title: 'Parcel Delivery & Logistics Platform',
    description: 'Created end-to-end parcel delivery system that streamlined operations for 200+ merchants, reducing delivery time by 60% and increasing customer satisfaction scores by 4.5 stars.',
    image: '/images/delivery.jpg',
    alt: 'Parcel delivery platform showing order tracking and logistics management',
    technologies: ['React', 'Next.js', 'Supabase', 'Map Integration'],
    category: 'Web Development',
    liveUrl: 'https://errands-by-rita-jl4f.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true,
    results: ['60% faster delivery', '200+ merchants', '4.5★ rating']
  },
]

const categories = ['All', 'Web Development', 'AI & Automation', 'IoT Systems', 'Payment Systems', 'Cybersecurity', 'Local SEO', 'Mobile Development']

// Schema.org structured data for portfolio
const portfolioStructuredData = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "EpicAI Project Portfolio",
  "description": "Collection of successful AI, web development, and automation projects delivering measurable business results",
  "numberOfItems": projects.length,
  "itemListElement": projects.map((project, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "CreativeWork",
      "name": project.title,
      "description": project.description,
      "url": project.liveUrl
    }
  }))
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <section 
      id="projects" 
      className="py-24 bg-white px-6"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-labelledby="projects-heading"
    >
      {/* Add structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioStructuredData) }}
      />
      
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-red-500 font-semibold text-lg mb-2 block">PROJECT PORTFOLIO</span>
          <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Proven <span className="text-red-500">Results</span> That Drive Business Growth
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore our track record of delivering measurable outcomes through cutting-edge 
            AI solutions, web development, and automation technologies.
          </p>
          
          {/* Social Proof Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">50+</div>
              <div className="text-sm text-gray-600">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">98%</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">200%</div>
              <div className="text-sm text-gray-600">Avg. ROI</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500 mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 ${
                activeCategory === category
                  ? 'bg-red-500 text-white border-red-500 shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50'
              }`}
              aria-label={`Filter projects by ${category}`}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Enhanced Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8" role="list" aria-label="Project portfolio items">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-red-200"
              role="listitem"
              itemScope
              itemType="https://schema.org/CreativeWork"
            >
              {/* Project Image with Enhanced SEO */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  priority={project.featured}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-30 transition-all duration-500" />
                
                {/* Featured Badge with Schema */}
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10 flex items-center gap-1">
                    <Star size={14} />
                    Featured
                  </div>
                )}
                
                {/* Enhanced Action Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                  <div className="flex gap-3">
                    <a
                      href={project.liveUrl}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      itemProp="url"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 transform hover:scale-110 shadow-lg"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View source code for ${project.title}`}
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Enhanced Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full border border-red-100">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2" itemProp="name">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed" itemProp="description">
                  {project.description}
                </p>

                {/* Results Metrics */}
                {project.results && (
                  <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-800 mb-2">
                      <TrendingUp size={16} />
                      Key Results:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.results.map((result, idx) => (
                        <span key={idx} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {result}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies with Better Semantics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200"
                      itemProp="keywords"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition-colors duration-300 group/live"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Launch live demo of ${project.title}`}
                  >
                    <Play size={16} className="group-hover/live:scale-110 transition-transform" />
                    View Live Project
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300 group/code ml-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Browse source code for ${project.title}`}
                  >
                    <Github size={16} className="group-hover/code:scale-110 transition-transform" />
                    Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-20 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Achieve Similar Results?</h3>
          <p className="text-xl mb-8 text-red-100 max-w-2xl mx-auto">
            Let&apos;s discuss how we can apply these proven strategies to grow your business.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl text-lg"
            aria-label="Start a new project with EpicAI"
          >
            <MessageCircleCode size={24} />
            Start Your Project Today
          </a>
          <p className="text-sm text-red-200 mt-4">
            Average response time: 2 hours • Free consultation
          </p>
        </motion.div>
      </div>
    </section>
  )
}