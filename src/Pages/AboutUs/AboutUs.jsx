import Navbar from "@/components/Navbar"
import React from 'react'

const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div data-appearance="dark"
        className="min-h-screen bg-slate-950 text-salte-100 antialiased"
      >
        <main>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeout' }}
            className="relative overflow-hidden border-b border-white/10 bg-slate-950 py-20 sm:py-24"
          >
            <div className="pointer"></div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default AboutUs
