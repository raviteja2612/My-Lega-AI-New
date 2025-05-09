"use client"

import { motion } from "framer-motion"

// Animation variants with optimized durations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeIn}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="mt-4 text-xl text-gray-600">{subtitle}</p>}
    </motion.div>
  )
}
