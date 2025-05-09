"use client"

import { useRouter } from "next/router"
import en from "../i18n/en/common.json"

export function useTranslation() {
  const router = useRouter()
  const { locale } = router

  // For now, we only have English, but this can be expanded
  const t = en

  return {
    t,
    locale,
  }
}
