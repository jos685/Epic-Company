// components/HashLink/HashLink.tsx
'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface HashLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  isActive?: boolean
}

export default function HashLink({ href, children, className, onClick, isActive }: HashLinkProps) {
  const pathname = usePathname()
  const router = useRouter()
  
  // Handle home link (just #)
  if (href === '#') {
    const handleHomeClick = (e: React.MouseEvent) => {
      if (onClick) onClick()
      
      if (pathname === '/') {
        e.preventDefault()
        // Scroll to top of home page
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Update URL without reload
        window.history.pushState(null, '', '/')
      } else {
        // Navigate to home page using Next.js router
        router.push('/')
      }
    }

    return (
      <button 
        onClick={handleHomeClick} 
        className={`${className} ${isActive ? '!text-green-400 font-semibold' : ''}`}
      >
        {children}
      </button>
    )
  }
  
  // Check if it's a hash link (starts with #)
  if (href.startsWith('#')) {
    const sectionId = href.substring(1)
    
    const handleClick = (e: React.MouseEvent) => {
      if (onClick) onClick()
      
      if (pathname === '/') {
        e.preventDefault()
        const element = document.getElementById(sectionId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          // Update URL hash without page reload
          window.history.pushState(null, '', `#${sectionId}`)
        }
      } else {
        e.preventDefault()
        // Navigate to home page with hash using Next.js router
        router.push(`/#${sectionId}`)
      }
    }

    return (
      <button 
        onClick={handleClick} 
        className={`${className} ${isActive ? '!text-green-400 font-semibold' : ''}`}
      >
        {children}
      </button>
    )
  }

  // Regular link
  const isPageActive = pathname === href
  
  return (
    <Link 
      href={href} 
      className={`${className} ${isPageActive || isActive ? '!text-green-400 font-semibold' : ''}`}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}