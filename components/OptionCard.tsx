"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// Animation variants with optimized durations
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

interface OptionCardProps {
  title: string
  description: string
  buttonText: string
  features: string[]
  icon: ReactNode
  onClick: () => void
  delay?: number
}

export default function OptionCard({
  title,
  description,
  buttonText,
  features,
  icon,
  onClick,
  delay = 0,
}: OptionCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={cardVariant}
      transition={{ delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="bg-white rounded-lg p-8 transition-all duration-300 transform shadow-[0_8px_30px_rgba(59,130,246,0.15)] hover:shadow-[0_15px_35px_rgba(59,130,246,0.25)]"
    >
      <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">{icon}</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">{title}</h2>
      <p className="text-gray-600 mb-6 text-center text-lg">{description}</p>

      <div className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="text-blue-600 mr-3 mt-1">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-lg">{feature}</p>
          </div>
        ))}
      </div>

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 inline-flex items-center justify-center text-lg font-semibold"
      >
        {buttonText}
        <ArrowRight className="ml-2 h-5 w-5" />
      </motion.button>
    </motion.div>
  )
}
