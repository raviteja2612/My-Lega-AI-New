"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

// Animation variants with optimized durations
const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

interface FeatureCardProps {
  title: string
  description: string
  icon: ReactNode
  borderTop?: boolean
}

export default function FeatureCard({ title, description, icon, borderTop = true }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`bg-white rounded-lg overflow-hidden ${
        borderTop
          ? "border-t-4 border-blue-500 transition-all duration-300 hover:border-blue-600 hover:bg-blue-50"
          : "border border-gray-200 transition-all duration-300"
      } shadow-[0_4px_14px_0_rgba(59,130,246,0.2)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.3)]`}
    >
      <div className="p-6">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">{icon}</div>
        <h4 className="text-2xl font-semibold text-center mb-3 text-blue-700">{title}</h4>
        <p className="text-gray-600 text-center text-lg">{description}</p>
      </div>
    </motion.div>
  )
}
