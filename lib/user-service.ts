import { getRepository } from "./database"
import { User } from "@/entities/User"
import bcrypt from "bcrypt"

export async function getUserById(id: string): Promise<User | null> {
  try {
    const userRepository = await getRepository<User>(User)
    return await userRepository.findOne({ where: { id } })
  } catch (error) {
    console.error("Error fetching user by ID:", error)
    return null
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const userRepository = await getRepository<User>(User)
    return await userRepository.findOne({ where: { email } })
  } catch (error) {
    console.error("Error fetching user by email:", error)
    return null
  }
}

export async function createUser(data: {
  name: string
  email: string
  password?: string
  role: string
}): Promise<User | null> {
  try {
    const userRepository = await getRepository<User>(User)

    // Hash password if provided
    let hashedPassword = undefined
    if (data.password) {
      hashedPassword = await bcrypt.hash(data.password, 10)
    }

    const user = userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    })

    return await userRepository.save(user)
  } catch (error) {
    console.error("Error creating user:", error)
    return null
  }
}

export async function updateUser(id: string, data: Partial<User>): Promise<User | null> {
  try {
    const userRepository = await getRepository<User>(User)

    // Hash password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10)
    }

    await userRepository.update(id, data)
    return await getUserById(id)
  } catch (error) {
    console.error("Error updating user:", error)
    return null
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const userRepository = await getRepository<User>(User)
    const result = await userRepository.delete(id)
    return result.affected ? result.affected > 0 : false
  } catch (error) {
    console.error("Error deleting user:", error)
    return false
  }
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  if (!user.password) return false
  return bcrypt.compare(password, user.password)
}
