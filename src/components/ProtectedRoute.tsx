"use client"

import type React from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading, userRole } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/signin")
      } else {
        // Check if user is on the correct dashboard based on their role
        const path = router.pathname
        if (userRole === "consumer" && path === "/professional-dashboard") {
          router.push("/consumer-dashboard")
        } else if (userRole === "professional" && path === "/consumer-dashboard") {
          router.push("/professional-dashboard")
        }
      }
    }
  }, [currentUser, loading, router, userRole])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return currentUser ? <>{children}</> : null
}
