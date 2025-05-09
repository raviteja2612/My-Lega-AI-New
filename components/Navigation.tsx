"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/router"
import { Menu, X } from "lucide-react"
import { useTranslation } from "@/hooks/useTranslation"
import LanguageSelector from "@/src/components/LanguageSelector"

export default function Navigation() {
  const router = useRouter()
  const { t } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [router.pathname])

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src="/scales-of-justice.png"
                  alt="My Legal AI Logo"
                  fill
                  priority
                  sizes="32px"
                  className="object-contain"
                />
              </div>
              <span className="text-gray-900 font-medium">{t.nav.logo}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-gray-600 hover:text-gray-900 ${isActive("/") ? "text-blue-600 font-medium" : ""}`}
            >
              <span className="flex items-center">
                {isActive("/") && <span className="text-blue-500 mr-1">•</span>}
                {t.nav.home}
              </span>
            </Link>
            <Link
              href="/personal"
              className={`text-gray-600 hover:text-gray-900 ${
                isActive("/personal") ? "text-blue-600 font-medium" : ""
              }`}
            >
              {t.nav.personal}
            </Link>
            <Link
              href="/lawyers"
              className={`text-gray-600 hover:text-gray-900 ${isActive("/lawyers") ? "text-blue-600 font-medium" : ""}`}
            >
              {t.nav.lawyers}
            </Link>
            <Link
              href="/features"
              className={`text-gray-600 hover:text-gray-900 ${
                isActive("/features") ? "text-blue-600 font-medium" : ""
              }`}
            >
              {t.nav.features}
            </Link>
            <Link
              href="/about"
              className={`text-gray-600 hover:text-gray-900 ${isActive("/about") ? "text-blue-600 font-medium" : ""}`}
            >
              {t.nav.about}
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-600 hover:text-gray-900 ${isActive("/pricing") ? "text-blue-600 font-medium" : ""}`}
            >
              {t.nav.pricing}
            </Link>
            <LanguageSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/") ? "text-blue-600 font-medium" : ""}`}
              >
                {t.nav.home}
              </Link>
              <Link
                href="/personal"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/personal") ? "text-blue-600 font-medium" : ""
                }`}
              >
                {t.nav.personal}
              </Link>
              <Link
                href="/lawyers"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/lawyers") ? "text-blue-600 font-medium" : ""
                }`}
              >
                {t.nav.lawyers}
              </Link>
              <Link
                href="/features"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/features") ? "text-blue-600 font-medium" : ""
                }`}
              >
                {t.nav.features}
              </Link>
              <Link
                href="/about"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/about") ? "text-blue-600 font-medium" : ""}`}
              >
                {t.nav.about}
              </Link>
              <Link
                href="/pricing"
                className={`text-gray-600 hover:text-gray-900 ${
                  isActive("/pricing") ? "text-blue-600 font-medium" : ""
                }`}
              >
                {t.nav.pricing}
              </Link>
              <div className="pt-4">
                <LanguageSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
