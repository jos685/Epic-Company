import React from 'react';
import Hero from '@/components/HeroSection/HeroSection';
import Navbar from '@/components/NavBar/NavBar';
import About from '@/components/About/About';
import Services from '@/components/Services/services';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <About/>
      <Services/>
     
      <Contact/>
      <Footer/>
      <ThemeToggle/>
     
    </div>
  );
}
