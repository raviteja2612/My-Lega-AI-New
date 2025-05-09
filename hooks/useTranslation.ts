"use client"

import { useCallback } from "react"
import en from "@/i18n/en/common.json"
import es from "@/i18n/es/common.json"

const translations = {
  en,
  es,
}

export function useTranslation(locale = "en") {
  const t = translations[locale as keyof typeof translations] || translations.en

  const translate = useCallback(
    (key: string, params?: Record<string, string>) => {
      const keys = key.split(".")
      let value = t

      for (const k of keys) {
        if (value[k] === undefined) {
          return key
        }
        value = value[k]
      }

      if (params) {
        return Object.entries(params).reduce((acc, [key, val]) => {
          return acc.replace(new RegExp(`{{${key}}}`, "g"), val)
        }, value as string)
      }

      return value as string
    },
    [t],
  )

  return { t, translate }
}
