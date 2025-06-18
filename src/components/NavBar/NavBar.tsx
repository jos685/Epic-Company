'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-white font-bold text-xl tracking-wide">
          Epic Softwares
        </Link>
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((link) => {
            const id = link.href.replace('#', '')
            return (
              <a
                key={link.name}
                href={link.href}
                className={classNames(
                  'transition-colors font-medium',
                  activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'
                )}
              >
                {link.name}
              </a>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}
