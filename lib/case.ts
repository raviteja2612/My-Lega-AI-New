import { supabase } from "./supabase"
import type { Case } from "./supabase"

export async function getCaseById(id: string): Promise<Case | null> {
  const { data, error } = await supabase.from("cases").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching case:", error)
    return null
  }

  return data
}

export async function getCasesByUserId(userId: string): Promise<Case[]> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching cases by user ID:", error)
    return []
  }

  return data || []
}

export async function createCase(caseData: Omit<Case, "id" | "created_at" | "updated_at">): Promise<Case | null> {
  const { data, error } = await supabase
    .from("cases")
    .insert([
      {
        ...caseData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating case:", error)
    return null
  }

  return data
}

export async function updateCase(id: string, caseData: Partial<Case>): Promise<Case | null> {
  const { data, error } = await supabase
    .from("cases")
    .update({
      ...caseData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating case:", error)
    return null
  }

  return data
}

export async function deleteCase(id: string): Promise<boolean> {
  const { error } = await supabase.from("cases").delete().eq("id", id)

  if (error) {
    console.error("Error deleting case:", error)
    return false
  }

  return true
}
