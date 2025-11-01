'use client'

import { useEffect, useState } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import HashLink from '@/components/HashLink/HashLink'
import { usePathname } from 'next/navigation'

const navLinks = [
  { name: 'HOME', href: '#' },
  { name: 'SERVICES', href: '#services' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
  { name: 'M-PESA', href: '/mpesa' },
  { name: 'BLOG', href: '/blog' }
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathname = usePathname()

  useEffect(() => {
    // Reset active section when navigating away from home
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    // Handle initial hash on home page load
    const handleInitialHash = () => {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        if (['services', 'projects', 'contact'].includes(hash)) {
          setActiveSection(hash)
          // Scroll to the section after a brief delay
          setTimeout(() => {
            const element = document.getElementById(hash)
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }, 100)
        } else {
          setActiveSection('home')
        }
      } else {
        setActiveSection('home')
      }
    }

    handleInitialHash()

    // Set up intersection observer for scroll detection
    const sections = ['home', 'services', 'projects', 'contact']
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
            // Update URL hash without page reload
            window.history.replaceState(null, '', `#${entry.target.id}`)
          }
        })
      },
      { 
        threshold: 0.6,
        rootMargin: '-10% 0px -10% 0px'
      }
    )

    // Observe all sections
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Handle hash changes (browser back/forward buttons)
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (sections.includes(hash)) {
        setActiveSection(hash)
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      } else if (hash === '') {
        setActiveSection('home')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('hashchange', handleHashChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  // Listen for custom events from section clicks
  useEffect(() => {
    const handleSectionClick = (event: CustomEvent) => {
      const sectionId = event.detail.sectionId
      setActiveSection(sectionId)
    }

    window.addEventListener('sectionClick', handleSectionClick as EventListener)

    return () => {
      window.removeEventListener('sectionClick', handleSectionClick as EventListener)
    }
  }, [])

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Function to determine if a link is active
  const isLinkActive = (linkHref: string) => {
    if (linkHref.startsWith('#')) {
      // Only check section active state if we're on home page
      if (pathname !== '/') return false
      
      const sectionId = linkHref.replace('#', '')
      if (sectionId === '') {
        // Home link
        return activeSection === 'home'
      }
      return activeSection === sectionId
    } else {
      // For regular page links
      return pathname === linkHref
    }
  }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-90 shadow-md backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link 
          href="/" 
          className="text-green-400 font-bold text-xl tracking-wide hover:text-green-300 transition-colors"
          onClick={() => setActiveSection('home')}
        >
          EPIC SOFTWARES
        </Link>

        {/* Desktop Menu */}
        <div className="space-x-6 hidden md:flex">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href)
            
            return (
              <HashLink
                key={link.name}
                href={link.href}
                isActive={isActive}
                className={classNames(
                  'transition-colors font-medium relative py-2 px-1',
                  isActive 
                    ? 'text-green-400 font-semibold' 
                    : 'text-gray-300 hover:text-white'
                )}
              >
                {link.name}
                {/* Active indicator underline */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </HashLink>
            )
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-gray-300 hover:text-white transition-colors"
        >
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
            className="md:hidden bg-black bg-opacity-95 px-6 pb-4 backdrop-blur-sm"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href)
                
                return (
                  <HashLink
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    isActive={isActive}
                    className={classNames(
                      'transition-colors font-medium py-3 px-4 rounded-lg border-l-4',
                      isActive 
                        ? 'text-green-400 font-semibold bg-green-400 bg-opacity-10 border-green-400' 
                        : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5 border-transparent'
                    )}
                  >
                    {link.name}
                  </HashLink>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}