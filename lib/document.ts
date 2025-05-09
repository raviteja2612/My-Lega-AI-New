import { supabase } from "./supabase"
import type { Document } from "./supabase"

export async function getDocumentById(id: string): Promise<Document | null> {
  const { data, error } = await supabase.from("documents").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching document:", error)
    return null
  }

  return data
}

export async function getDocumentsByUserId(userId: string): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching documents by user ID:", error)
    return []
  }

  return data || []
}

export async function getDocumentsByCaseId(caseId: string): Promise<Document[]> {
  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .eq("case_id", caseId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching documents by case ID:", error)
    return []
  }

  return data || []
}

export async function createDocument(
  documentData: Omit<Document, "id" | "created_at" | "updated_at">,
): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .insert([
      {
        ...documentData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating document:", error)
    return null
  }

  return data
}

export async function updateDocument(id: string, documentData: Partial<Document>): Promise<Document | null> {
  const { data, error } = await supabase
    .from("documents")
    .update({
      ...documentData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating document:", error)
    return null
  }

  return data
}

export async function deleteDocument(id: string): Promise<boolean> {
  const { error } = await supabase.from("documents").delete().eq("id", id)

  if (error) {
    console.error("Error deleting document:", error)
    return false
  }

  return true
}
