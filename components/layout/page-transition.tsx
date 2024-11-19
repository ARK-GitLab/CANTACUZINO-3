'use client'

import { motion } from 'framer-motion'

const fadeIn = {
  hidden: { 
    opacity: 0,
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.22, 1, 0.36, 1],
    } 
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1],
    } 
  }
}

const slideUp = {
  hidden: { 
    opacity: 0, 
    y: 20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    }
  }
}

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: 0,
          transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }
        }}
      />
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={fadeIn}
      >
        {children}
      </motion.div>
    </>
  )
}

export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export function StaggerChildren({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
} 