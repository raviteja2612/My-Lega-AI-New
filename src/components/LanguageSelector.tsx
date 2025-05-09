"use client"

import { useState } from "react"
import { Globe, ChevronDown } from "lucide-react"

interface LanguageSelectorProps {
  currentLanguage: string
  setCurrentLanguage: (lang: string) => void
}

const LanguageSelector = ({ currentLanguage, setCurrentLanguage }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
  ]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const selectLanguage = (code: string) => {
    setCurrentLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-gray-600 hover:text-gray-900 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-5 w-5 mr-1" />
        <span className="hidden sm:inline-block">{currentLanguage.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4 ml-1" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => selectLanguage(language.code)}
                className={`${
                  currentLanguage === language.code ? "bg-gray-100 text-gray-900" : "text-gray-700"
                } block px-4 py-2 text-sm w-full text-left hover:bg-gray-100`}
                role="menuitem"
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
