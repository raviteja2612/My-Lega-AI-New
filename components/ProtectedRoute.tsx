"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading, userRole } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading) {
      if (!currentUser) {
        router.push("/signin")
      } else {
        // Check if user is on the correct dashboard based on their role
        if (userRole === "consumer" && pathname === "/dashboard/professional") {
          router.push("/dashboard/consumer")
        } else if (userRole === "professional" && pathname === "/dashboard/consumer") {
          router.push("/dashboard/professional")
        }
      }
    }
  }, [currentUser, loading, router, userRole, pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    )
  }

  return currentUser ? <>{children}</> : null
}
