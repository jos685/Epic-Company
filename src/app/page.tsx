import React from 'react';
import Hero from '@/components/HeroSection/HeroSection';
import Navbar from '@/components/NavBar/NavBar';
import type { Metadata } from 'next'
import Services from '@/components/Services/services';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import Project from "@/components/Projects/Projects"

export const metadata: Metadata = {
  title: 'AI Solutions for Small Business | EpicAI - Boost Productivity 40%',
  description: 'Cut operational costs by 30% with our AI tools. Easy setup, no technical skills needed. Start your free trial today.',
  keywords: 'AI solutions, small business automation, productivity tools, cost reduction, AI software',
  openGraph: {
    title: 'AI Solutions for Small Business | EpicAI - Boost Productivity 40%',
    description: 'Cut operational costs by 30% with our AI tools. Easy setup, no technical skills needed.',
    type: 'website',
    locale: 'en_US',
    url: 'https://epicsoftwares.shop', // ← REPLACE WITH YOUR ACTUAL DOMAIN
    siteName: 'EpicAI',
    images: [
      {
        url: '/og-image.jpg', // ← CREATE THIS IMAGE (1200x630px)
        width: 1200,
        height: 630,
        alt: 'EpicAI - AI Solutions for Small Business',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // ADD THIS FOR BETTER SEO
  alternates: {
    canonical: 'https://epicsoftwares.shop', // ← REPLACE WITH YOUR DOMAIN
  },
}

// Add structured data for better rich snippets
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "EpicAI",
  "url": "https://epicsoftwares.shop", // ← REPLACE
  "logo": "https://epicsoftwares.shop/logo.png", // ← REPLACE
  "description": "AI solutions for small businesses to boost productivity and reduce costs",
  "sameAs": [
    // Add your social media profiles here when you have them
    // "https://twitter.com/youraccount",
    // "https://linkedin.com/company/youraccount"
  ]
}

export default function Home() {
  return (
    <>
      {/* Add structured data to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Semantic main landmark for better accessibility & SEO */}
      <main itemScope itemType="https://schema.org/WebPage">
        <Navbar/>
        <Hero />
        <Services/>
        <Project/>
        <Contact/>
        <Footer/>
        <ThemeToggle/>
      </main>
    </>
  );
}