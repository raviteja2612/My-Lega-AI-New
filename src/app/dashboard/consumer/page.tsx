"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import ProtectedRoute from "@/components/ProtectedRoute"
import { motion } from "framer-motion"
import { LogOut, User, FileText, MessageSquare, Scale, Calendar } from "lucide-react"

export default function ConsumerDashboard() {
  const { currentUser, logout } = useAuth()
  const router = useRouter()

  async function handleLogout() {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Failed to log out", error)
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 font-['Inter',sans-serif]">
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-8" src="/scales-of-justice.png" alt="My Legal AI" />
                  <span className="ml-2 text-xl font-semibold">My Legal AI</span>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-sm text-gray-600">{currentUser?.email}</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </motion.button>
              </div>
            </div>
          </div>
        </nav>

        <div className="py-10">
          <header>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="text-3xl font-bold leading-tight text-gray-900"
              >
                Individual Dashboard
              </motion.h1>
            </div>
          </header>
          <main>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 py-8 sm:px-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center mb-6">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <h2 className="text-lg font-medium text-gray-900">
                          Welcome, {currentUser?.email?.split("@")[0]}
                        </h2>
                        <p className="text-sm text-gray-500">Individual Account</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Your Legal Journey</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div whileHover={{ y: -5 }} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-3">
                            <FileText className="h-5 w-5 text-blue-600 mr-2" />
                            <h4 className="font-medium text-gray-900">My Cases</h4>
                          </div>
                          <p className="text-sm text-gray-600">
                            You have no active cases. Start by creating a new case.
                          </p>
                          <button className="mt-3 text-sm text-blue-600 font-medium">Create a case</button>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-3">
                            <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                            <h4 className="font-medium text-gray-900">Legal Assistant</h4>
                          </div>
                          <p className="text-sm text-gray-600">Ask Justice any legal questions you have.</p>
                          <button className="mt-3 text-sm text-blue-600 font-medium">Chat now</button>
                        </motion.div>

                        <motion.div whileHover={{ y: -5 }} className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <div className="flex items-center mb-3">
                            <Scale className="h-5 w-5 text-blue-600 mr-2" />
                            <h4 className="font-medium text-gray-900">Find an Attorney</h4>
                          </div>
                          <p className="text-sm text-gray-600">Connect with attorneys specialized in your case type.</p>
                          <button className="mt-3 text-sm text-blue-600 font-medium">Search attorneys</button>
                        </motion.div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 mt-6 pt-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Events</h3>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="h-5 w-5 mr-2" />
                        <p>No upcoming events scheduled</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
