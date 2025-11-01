'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

// Pre-defined positions to avoid Math.random() during SSR
const PARTICLE_POSITIONS = [
  { x: [100, -50, 150], y: [-100, 50, -150] },
  { x: [-150, 100, -200], y: [50, -100, 200] },
  { x: [200, -100, 50], y: [-50, 150, -200] },
  { x: [-50, 200, -150], y: [150, -200, 100] },
  { x: [150, -200, 100], y: [-150, 200, -50] },
  { x: [-100, 150, -50], y: [200, -150, 50] },
  { x: [50, -150, 200], y: [-200, 100, -100] },
  { x: [-200, 50, -100], y: [100, -50, 150] },
  { x: [100, -200, 150], y: [-50, 150, -200] },
  { x: [-150, 100, -50], y: [150, -200, 100] },
  { x: [200, -150, 100], y: [-100, 50, -150] },
  { x: [-50, 200, -100], y: [50, -150, 200] },
]

const DELAYS = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0, 2.2]

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Floating AI Brain Animation
  const FloatingAIBrain = () => (
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 1 }}
      style={{
        borderRadius: '60% 40% 60% 40%',
      }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="absolute inset-0 border-2 border-blue-300 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="text-white text-4xl"
        animate={{ 
          rotateY: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🧠
      </motion.div>
    </motion.div>
  )

  // Data Particles Component - Fixed for SSR
  const DataParticles = () => {
    if (!isMounted) {
      // Return a simplified version during SSR or null
      return null
    }
    
    return (
      <>
        {PARTICLE_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            initial={{
              x: position.x[0],
              y: position.y[0],
              scale: 0,
            }}
            animate={{
              x: position.x,
              y: position.y,
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + (i % 3), // Deterministic duration based on index
              repeat: Infinity,
              delay: DELAYS[i],
              ease: "easeInOut"
            }}
            style={{
              left: '50%',
              top: '50%',
            }}
          />
        ))}
      </>
    )
  }

  // Robot Arm Animation
  const RobotArm = () => (
    <motion.div
      className="absolute bottom-8 right-8 w-16 h-24"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
    >
      <motion.div
        className="absolute bottom-0 right-1/2 w-2 h-20 bg-gradient-to-t from-gray-400 to-gray-600 rounded-t-lg"
        animate={{
          rotate: [0, -15, 0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transformOrigin: 'bottom center' }}
      />
      <motion.div
        className="absolute bottom-16 right-1/2 w-2 h-16 bg-gradient-to-t from-gray-500 to-gray-700 rounded-t-lg"
        animate={{
          rotate: [0, 25, 0, -25, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ 
          transformOrigin: 'bottom center',
          transform: 'translateX(1px) rotate(-30deg)'
        }}
      />
      <motion.div
        className="absolute bottom-28 right-1/2 w-4 h-4 bg-gray-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateX(2px)' }}
      />
    </motion.div>
  )

  // Circuit Background Pattern
  const CircuitBackground = () => (
    <motion.div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
      }}
      animate={{
        backgroundPosition: ['0px 0px', '50px 50px'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )

  // Floating Code Elements - Fixed for SSR
  const FloatingCodeElements = () => {
    const codeElements = [
      { text: "<AI />", x: '10%', y: '20%' },
      { text: "robot()", x: '80%', y: '30%' },
      { text: "automate()", x: '15%', y: '70%' },
      { text: "learn()", x: '85%', y: '60%' },
    ]

    return (
      <>
        {codeElements.map((element, index) => (
          <motion.div
            key={index}
            className="absolute text-blue-300/40 font-mono text-sm"
            style={{
              left: element.x,
              top: element.y,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + index * 0.3, duration: 0.8 }}
            whileHover={{ opacity: 0.8, scale: 1.1 }}
          >
            {element.text}
          </motion.div>
        ))}
      </>
    )
  }

  return (
    <section 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-6 overflow-hidden relative"
      role="banner"
      aria-label="Main hero section"
    >
      {/* Background Animations */}
      <CircuitBackground />
      
      {/* Animation Container */}
      <div className="absolute inset-0 pointer-events-none">
        <FloatingAIBrain />
        <DataParticles />
        <RobotArm />
        <FloatingCodeElements />
      </div>

      {/* Semantic header within section */}
      <header className="text-center max-w-3xl relative z-10">
        {/* Main heading with proper hierarchy */}
        <motion.h1
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          itemProp="headline"
        >
          Empower Your Business with AI Solutions That 
          <motion.span 
            className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Boost Productivity by 40%
          </motion.span>
        </motion.h1>

        {/* Supporting paragraph with keyword-rich content */}
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          itemProp="description"
        >
          Cut operational costs by 30% with our intelligent AI agents, robotic process automation, 
          and high-performance web applications. No technical expertise required - 
          <strong> start seeing results in weeks, not months</strong>.
        </motion.p>

        {/* Primary call-to-action */}
        <motion.a
          href="#contact"
          className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 relative z-10"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get started with AI solutions for your business"
          role="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.span
            className="flex items-center gap-2"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            🚀 Start Your AI Transformation
            <ArrowRight size={20} aria-hidden="true" />
          </motion.span>
        </motion.a>

        {/* Secondary trust indicators */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            { icon: "✅", text: "Increase your Market" },
            { icon: "⚡", text: "Setup in 48 Hours" },
            { icon: "💰", text: "30-Day Money Back" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <span>{item.icon}</span>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </header>
    </section>
  )
}