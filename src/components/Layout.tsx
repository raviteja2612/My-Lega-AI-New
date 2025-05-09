"use client"

import type React from "react"

import { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import LanguageSelector from "./LanguageSelector"

interface LayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export default function Layout({ children, title, description = "AI-powered legal assistance platform" }: LayoutProps) {
  const router = useRouter()
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const isActive = (path: string) => {
    return router.pathname === path
  }

  return (
    <div className="min-h-screen font-['Inter',sans-serif]">
      <Head>
        <title>{title} | My Legal AI</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Navigation */}
      <nav className="bg-white py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/">
                <div className="flex items-center cursor-pointer">
                  <img src="/scales-of-justice.png" alt="My Legal AI Logo" className="h-8 w-8 mr-2" />
                  <span className="text-gray-900 font-medium">My Legal, AI</span>
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/") ? "text-blue-600 font-medium" : ""}`}
              >
                <span className="flex items-center">
                  {isActive("/") && <span className="text-blue-500 mr-1">•</span>}
                  Home
                </span>
              </Link>
              <Link
                href="/personal"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/personal") ? "text-blue-600 font-medium" : ""}`}
              >
                Personal
              </Link>
              <Link
                href="/lawyers"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/lawyers") ? "text-blue-600 font-medium" : ""}`}
              >
                Lawyers
              </Link>
              <Link
                href="/features"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/features") ? "text-blue-600 font-medium" : ""}`}
              >
                Features
              </Link>
              <Link
                href="/about"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/about") ? "text-blue-600 font-medium" : ""}`}
              >
                About
              </Link>
              <Link
                href="/pricing"
                className={`text-gray-600 hover:text-gray-900 ${isActive("/pricing") ? "text-blue-600 font-medium" : ""}`}
              >
                Pricing
              </Link>
              <LanguageSelector currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage} />
            </div>

            {/* Mobile menu button - hidden in desktop */}
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">PLATFORM</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">LEGAL</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gray-900 font-semibold uppercase text-sm tracking-wider mb-4">COMPANY</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100">
            <p className="text-gray-500 text-sm text-center">© 2023 My Legal, AI. All rights reserved.</p>
            <p className="text-gray-500 text-sm text-center mt-2">
              Disclaimer: Not legal advice. Regardless of information provided you should consult an attorney regarding
              your legal issues before making legal decisions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
