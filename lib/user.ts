import { supabase } from "./supabase"
import type { User } from "./supabase"

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabase.from("users").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching user:", error)
    return null
  }

  return data
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error) {
    console.error("Error fetching user by email:", error)
    return null
  }

  return data
}

export async function createUser(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        ...user,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) {
    console.error("Error creating user:", error)
    return null
  }

  return data
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase
    .from("users")
    .update({
      ...userData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating user:", error)
    return null
  }

  return data
}

export async function deleteUser(id: string): Promise<boolean> {
  const { error } = await supabase.from("users").delete().eq("id", id)

  if (error) {
    console.error("Error deleting user:", error)
    return false
  }

  return true
}
