import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { createDocument, getDocumentsByUserId } from "@/lib/document"

export async function GET() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const documents = await getDocumentsByUserId(session.user.id)
  return NextResponse.json(documents)
}

export async function POST(request: Request) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const data = await request.json()

  if (!data.title || !data.content) {
    return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
  }

  const newDocument = await createDocument({
    title: data.title,
    content: data.content,
    user_id: session.user.id,
  })

  if (!newDocument) {
    return NextResponse.json({ error: "Failed to create document" }, { status: 500 })
  }

  return NextResponse.json(newDocument, { status: 201 })
}
