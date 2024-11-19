'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    // First, fade out the current page
    const fadeOut = document.createElement('div')
    fadeOut.style.position = 'fixed'
    fadeOut.style.inset = '0'
    fadeOut.style.backgroundColor = 'black'
    fadeOut.style.zIndex = '100'
    fadeOut.style.opacity = '0'
    fadeOut.style.transition = 'opacity 0.5s ease'
    fadeOut.style.pointerEvents = 'none'
    document.body.appendChild(fadeOut)

    // Trigger fade out
    requestAnimationFrame(() => {
      fadeOut.style.opacity = '1'
      
      // After fade out completes, navigate
      setTimeout(() => {
        router.push('/')
        // Cleanup
        document.body.removeChild(fadeOut)
      }, 500)
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-8 left-8 z-50"
    >
      <button
        onClick={handleBack}
        className="w-12 h-12 rounded-full bg-[rgb(201,171,129)] flex items-center justify-center transition-all duration-300 hover:bg-[rgb(181,151,109)] hover:scale-110"
      >
        <ArrowLeft className="w-6 h-6 text-black" />
      </button>
    </motion.div>
  )
} 