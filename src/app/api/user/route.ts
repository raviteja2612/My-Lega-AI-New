import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getUserById } from "@/lib/user-service"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await getUserById(session.user.id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Remove sensitive information
  const { password, ...userWithoutPassword } = user

  return NextResponse.json(userWithoutPassword)
}
