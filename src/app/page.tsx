import React from 'react';
import Hero from '@/components/HeroSection/HeroSection';
import Navbar from '@/components/NavBar/NavBar';

import Services from '@/components/Services/services';
import Contact from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import Project from "@/components/Projects/Projects"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero />
      <Services/>
       <Project/>
   
      <Contact/>
      <Footer/>
      <ThemeToggle/>
     
    </div>
  );
}
