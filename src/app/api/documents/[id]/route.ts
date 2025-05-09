import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getDocumentById, updateDocument, deleteDocument } from "@/lib/document"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const document = await getDocumentById(params.id)

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  // Check if the user owns this document
  if (document.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(document)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const document = await getDocumentById(params.id)

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  // Check if the user owns this document
  if (document.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const data = await request.json()
  const updatedDocument = await updateDocument(params.id, data)

  if (!updatedDocument) {
    return NextResponse.json({ error: "Failed to update document" }, { status: 500 })
  }

  return NextResponse.json(updatedDocument)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const document = await getDocumentById(params.id)

  if (!document) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  // Check if the user owns this document
  if (document.user_id !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const success = await deleteDocument(params.id)

  if (!success) {
    return NextResponse.json({ error: "Failed to delete document" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
