import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createCase, getCasesByUserId } from "@/lib/case-service"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const cases = await getCasesByUserId(session.user.id)
  return NextResponse.json(cases)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  if (!data.title || !data.description) {
    return NextResponse.json({ error: "Title and description are required" }, { status: 400 })
  }

  const newCase = await createCase({
    title: data.title,
    description: data.description,
    status: data.status || "pending",
    userId: session.user.id,
  })

  if (!newCase) {
    return NextResponse.json({ error: "Failed to create case" }, { status: 500 })
  }

  return NextResponse.json(newCase, { status: 201 })
}
