import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

// Extract Supabase project ID from the PostgreSQL URL
// URL format: postgresql://postgres:Raviteja_0612@db.vusrqrhjebxnejeoiymy.supabase.co:5432/postgres
const extractProjectId = (pgUrl: string) => {
  const regex = /db\.([a-zA-Z0-9]+)\.supabase\.co/
  const match = pgUrl.match(regex)
  return match ? match[1] : null
}

const pgUrl =
  process.env.DATABASE_URL || "postgresql://postgres:Raviteja_0612@db.vusrqrhjebxnejeoiymy.supabase.co:5432/postgres"
const projectId = extractProjectId(pgUrl)

// Construct Supabase URL from project ID
const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// For direct PostgreSQL access (if needed)
export const pgConnection = {
  connectionString: pgUrl,
}

// Type definitions for our database tables
export type User = {
  id: string
  name: string
  email: string
  role: string
  created_at: string
  updated_at: string
}

export type Case = {
  id: string
  title: string
  description: string
  status: string
  user_id: string
  created_at: string
  updated_at: string
}

export type Document = {
  id: string
  title: string
  content: string
  user_id: string
  case_id: string
  created_at: string
  updated_at: string
}
