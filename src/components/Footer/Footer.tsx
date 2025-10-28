'use client';
import { 
  Facebook, 
  Github, 
  Linkedin, 
  Twitter, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Shield,
  Heart,
  ArrowUp
} from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

   // Enhanced scroll to top function
   const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    // If we're already on the page, scroll to the section
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80; // Offset for header
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      } else {
        // If element not found, go to home page and then scroll
        window.location.href = `/#${sectionId}`;
      }
    }
  };

  // Handle footer link clicks
  const handleFooterLinkClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    
    // If we're on the home page, scroll to section
    if (window.location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      // If we're on another page, navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    }
  };
  
  // Schema.org structured data for organization
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EpicAI - AI Solutions & Web Development",
    "description": "AI solutions, web development, and automation services for businesses in Kenya and worldwide",
    "url": "https://epicsoftwares.shop",
    "logo": "https://epicsoftwares.shop/logo.png",
    "foundingDate": "2023",
    "founders": [
      {
        "@type": "Person",
        "name": "Joseph Owang"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Nairobi",
      "addressCountry": "KE"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+254768131905",
      "contactType": "customer service",
      "areaServed": "KE",
      "availableLanguage": ["English", "Swahili"]
    },
    "sameAs": [
      "https://github.com/jos685",
      "https://linkedin.com/in/joseph-owang254",
      "https://twitter.com/epicsoftwares",
      "https://facebook.com/epicsoftwares"
    ]
  };

  return (
    <footer 
      className="bg-gray-900 text-white relative overflow-hidden"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData) }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Epic<span className="text-white">AI</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Transforming businesses with cutting-edge AI solutions, web development, 
              and automation technologies. Based in Nairobi, serving clients worldwide 
              with measurable results and exceptional service.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Secure Development</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links - UPDATED */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={(e) => handleFooterLinkClick(e, 'services')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline cursor-pointer text-left w-full"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleFooterLinkClick(e, 'projects')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline cursor-pointer text-left w-full"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button 
                  onClick={(e) => handleFooterLinkClick(e, 'contact')}
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline cursor-pointer text-left w-full"
                >
                  Get Quote
                </button>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact Info</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a 
                    href="tel:+254768131905" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 block hover:underline"
                    itemProp="telephone"
                  >
                    +254 768 131 905
                  </a>
                  <a 
                    href="tel:+254783069010" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 block hover:underline"
                  >
                    +254 783 069 010
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:epicsoftwaredesigners@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 hover:underline"
                  itemProp="email"
                >
                  epicsoftwaredesigners@gmail.com
                </a>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="addressLocality">Nairobi</span>, <span itemProp="addressCountry">Kenya</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>© {currentYear} Epic Softwares. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> in Kenya
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-gray-400 text-sm hidden md:block">Follow us:</span>
            <div className="flex gap-4">
              <a 
                href="https://github.com/jos685" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Visit our GitHub profile"
                itemProp="sameAs"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com/in/joseph-owang254" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Visit our LinkedIn profile"
                itemProp="sameAs"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/epicsoftwares" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Visit our Twitter profile"
                itemProp="sameAs"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/epicsoftwares" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-800"
                aria-label="Visit our Facebook profile"
                itemProp="sameAs"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm group"
            aria-label="Scroll back to top"
          >
            Back to Top
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            EpicAI specializes in AI solutions, web development, mobile apps, e-commerce, 
            SEO optimization, cybersecurity, and IoT systems for businesses in Kenya and worldwide. 
            Services include M-Pesa integration, automation, and custom software development.
          </p>
        </div>
      </div>
    </footer>
  );
}