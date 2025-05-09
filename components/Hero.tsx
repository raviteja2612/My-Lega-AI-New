"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"

// Animation variants with optimized durations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export default function Hero() {
const { t } = useTranslation()

  return (
    <div className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/hero-background.jpg"
          alt="Lady Justice Statue"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
        >
          {t.hero.title}
          <br />
          <span className="text-blue-600">{t.hero.subtitle}</span>
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-xl text-gray-300"
        >
          {t.hero.description}
        </motion.p>

        {/* Chat Input */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ delay: 0.2 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="bg-gray-800/60 rounded-lg backdrop-blur-sm border border-gray-700 overflow-hidden p-4">
            <div className="flex items-start mb-4">
              <div className="bg-blue-600 rounded-full p-2 mr-3 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white font-medium text-lg">{t.hero.assistantIntro}</p>
                <p className="text-gray-400 mt-1">{t.hero.assistantDescription}</p>
              </div>
            </div>
            <div className="relative flex items-center bg-gray-700/60 rounded-full overflow-hidden">
              <input
                type="text"
                placeholder={t.hero.searchPlaceholder}
                className="w-full py-3 px-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-2 p-2 text-gray-400 hover:text-white"
              >
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
