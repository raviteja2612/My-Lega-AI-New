"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { FcGoogle } from "react-icons/fc"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState("consumer")

  const { signup, loginWithGoogle } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get role from query parameter
  useEffect(() => {
    const roleParam = searchParams.get("role")
    if (roleParam) {
      setRole(roleParam)
      localStorage.setItem("tempRole", roleParam)
    } else if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("tempRole")
      if (storedRole) {
        setRole(storedRole)
      }
    }
  }, [searchParams])

  const redirectPath = role === "consumer" ? "/dashboard/consumer" : "/dashboard/professional"

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (password !== confirmPassword) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(email, password, role)
      router.push(redirectPath)
    } catch (err: any) {
      setError("Failed to create an account")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogleSignUp() {
    try {
      setError("")
      setLoading(true)
      await loginWithGoogle(role)
      router.push(redirectPath)
    } catch (err: any) {
      setError("Failed to sign up with Google")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-['Inter',sans-serif]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="flex flex-col items-center">
          <Link href="/">
            <div className="flex items-center justify-center cursor-pointer group">
              <img
                src="/scales-of-justice.png"
                alt="My Legal AI Logo"
                className="h-12 w-12 transition-transform group-hover:scale-110"
              />
            </div>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {role === "consumer" ? "Start your legal journey today" : "Join our professional network"}
          </p>
          <div className="mt-2 flex items-center text-sm">
            <span className="mr-2">Already have an account?</span>
            <Link
              href={`/signin?role=${role}`}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              Sign in instead
            </Link>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 border border-gray-100">
          <div className="mb-6 flex justify-between items-center">
            <Link href="/" className="flex items-center text-gray-500 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back to home</span>
            </Link>
            <div className="text-sm font-medium text-blue-600">
              {role === "consumer" ? "Individual Account" : "Professional Account"}
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700"
            >
              <p>{error}</p>
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
              >
                {loading ? "Creating account..." : "Sign up"}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <motion.button
                onClick={handleGoogleSignUp}
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <FcGoogle className="h-5 w-5 mr-2" />
                Sign up with Google
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
