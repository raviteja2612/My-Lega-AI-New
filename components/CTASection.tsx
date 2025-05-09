"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Animation variants with optimized durations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

interface CTASectionProps {
  title: string
  subtitle: string
  buttonText: string
  onClick: () => void
}

export default function CTASection({ title, subtitle, buttonText, onClick }: CTASectionProps) {
  return (
    <div className="relative">
      <div className="w-full h-[250px] relative">
        <Image
          src="/legal-ai-vehicle.png"
          alt="My Legal AI Vehicle"
          fill
          className="object-cover object-bottom"
          loading="lazy"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-900/40 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="max-w-2xl"
            >
              <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
              <p className="text-xl text-gray-200 mb-5">{subtitle}</p>
              <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium text-xl"
              >
                {buttonText}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
