'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'HOME', href: '#' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },

]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

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

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" className="text-green font-bold text-xl tracking-wide">
          EPIC SOFTWARES.SHOP
        </Link>

        {/* Desktop Menu */}
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

        {/* Mobile Hamburger Button */}
        <button onClick={toggleMenu} className="md:hidden text-white">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-black bg-opacity-95 px-6 pb-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '')
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)} // close on link click
                    className={classNames(
                      'text-white font-medium transition-colors',
                      activeSection === id ? 'text-white' : 'text-gray-400 hover:text-white'
                    )}
                  >
                    {link.name}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
