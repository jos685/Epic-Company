'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, MessageCircleCode } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with vendor dashboards, M-Pesa integration, and real-time inventory management.',
    image: '/images/ecommerce.jpg', 
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'M-Pesa API'],
    category: 'Web Development',
    liveUrl: 'https://frontend-git-main-jos685s-projects.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    title: 'AI-Powered Agents & Chat System',
    description: 'Intelligent chatbot with natural language processing, sentiment analysis, and multi-platform integration.',
    image: '/images/chatbot.jpg',
    technologies: ['Python', 'React', 'Socket.io', 'OpenAI API'],
    category: 'AI & Automation',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  },
  {
    title: 'Web & App Development',
    description: 'Designing and Developing websites for businessess .',
    image: '/images/website.jpg',
    technologies: ['Python', 'React', 'IoT Sensors', 'AWS'],
    category: 'IoT Systems',
    liveUrl: 'https://stmarys-mukuru.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    title: 'Mpesa Payment Intergration',
    description: 'Cross-platform payment for seamless payments and transaction history.',
    image: '/images/mpesa.jpg',
    technologies: ['React Native', 'Firebase', 'M-Pesa API', 'Redux'],
    category: 'Mobile Development',
    liveUrl: 'https://mpesa.epicsoftwares.shop',
    githubUrl: 'https://github.com/example',
    featured: true
  },
   
  {
    title: 'IoT Farm Monitoring',
    description: 'Smart farming system with sensor data collection, real-time dashboards, and automated reporting.',
    image: '/images/IOT.jpg',
    technologies: ['Python', 'React', 'IoT Sensors', 'AWS'],
    category: 'IoT Systems',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  },

  {
    title: 'Wi-Fi Payment Gateway',
    description: 'Secure internet access system with M-Pesa integration and session management.',
    image: '/images/wifi.png',
    technologies: ['Next.js', 'Node.js', 'M-Pesa API', 'MongoDB'],
    category: 'Payment Systems',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    title: 'Cybersecurity Dashboard',
    description: 'Comprehensive security monitoring platform with real-time threat detection and reporting.',
    image: '/images/cyber.jpg',
    technologies: ['React', 'Python', 'Cyber Security', 'API'],
    category: 'Cybersecurity',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example',
    featured: false
  },
  {
    title: 'Google Business Profile',
    description: 'Give your business an Online business location ',
    image: '/images/business.jpg',
    technologies: ['Python', 'React', 'IoT Sensors', 'AWS'],
    category: 'IoT Systems',
    liveUrl: 'https://kimap.org/find-school/',
    githubUrl: 'https://github.com/example',
    featured: true
  },
  {
    title: 'Parcel Delivery Websites',
    description: 'A website where one car place an order and his or her parcel get picked up and delivered to him ',
    image: '/images/delivery.jpg',
    technologies: ['React', 'Next JS', 'Supabase'],
    category: 'Web Development',
    liveUrl: 'https://errands-by-rita-jl4f.vercel.app/',
    githubUrl: 'https://github.com/example',
    featured: true
  },

]

const categories = ['All', 'Web Development', 'AI & Automation', 'IoT Systems', 'Payment Systems', 'Cybersecurity', 'Mobile Development']

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="py-24 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions that deliver real value and cutting-edge technology.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              {/* Project Image with Next.js Image Component */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
                {project.featured && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Featured
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="flex gap-4">
                    <a
                      href={project.liveUrl}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="bg-white text-gray-800 p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-red-500 bg-red-50 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <a
                    href={project.liveUrl}
                    className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Play size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Interested in working together on your next project?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-full font-medium hover:bg-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <MessageCircleCode size={20} />
            Start a Project
          </a>
        </motion.div>
      </div>
    </section>
  )
}