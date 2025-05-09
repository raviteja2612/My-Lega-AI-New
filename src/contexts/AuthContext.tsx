"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  type User,
  type UserCredential,
} from "firebase/auth"
import { auth } from "../lib/firebase"

interface AuthContextType {
  currentUser: User | null
  userRole: string | null
  loading: boolean
  signup: (email: string, password: string, role: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  loginWithGoogle: (role: string) => Promise<UserCredential>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  setUserRole: (role: string) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function useAuth() {
  return useContext(AuthContext) as AuthContextType
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string, role: string) {
    localStorage.setItem("userRole", role)
    setUserRole(role)
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function loginWithGoogle(role: string) {
    localStorage.setItem("userRole", role)
    setUserRole(role)
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  }

  function logout() {
    localStorage.removeItem("userRole")
    setUserRole(null)
    return signOut(auth)
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      const storedRole = localStorage.getItem("userRole")
      if (storedRole) {
        setUserRole(storedRole)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    userRole,
    loading,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    setUserRole,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
