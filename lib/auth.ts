import { getServerSession } from "next-auth/next"
import { db } from "./db"
import { compare } from "bcrypt"

export async function getUser() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return null
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email! },
  })

  return user
}

export async function verifyCredentials(email: string, password: string) {
  const user = await db.user.findUnique({
    where: { email },
  })

  if (!user) {
    return null
  }

  const isPasswordValid = await compare(password, user.password)

  if (!isPasswordValid) {
    return null
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  }
}
