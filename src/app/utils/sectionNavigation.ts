// utils/sectionNavigation.ts
export const navigateToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return
    
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      // Update URL hash
      window.history.pushState(null, '', `#${sectionId}`)
      // Dispatch custom event for navbar to update active state
      window.dispatchEvent(new CustomEvent('sectionClick', { 
        detail: { sectionId } 
      }))
    }
  }