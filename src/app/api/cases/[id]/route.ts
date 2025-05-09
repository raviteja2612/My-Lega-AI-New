import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { getCaseById, updateCase, deleteCase } from "@/lib/case-service"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const caseData = await getCaseById(params.id)

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  // Check if the user owns this case
  if (caseData.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  return NextResponse.json(caseData)
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const caseData = await getCaseById(params.id)

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  // Check if the user owns this case
  if (caseData.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const data = await request.json()
  const updatedCase = await updateCase(params.id, data)

  if (!updatedCase) {
    return NextResponse.json({ error: "Failed to update case" }, { status: 500 })
  }

  return NextResponse.json(updatedCase)
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession()

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const caseData = await getCaseById(params.id)

  if (!caseData) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 })
  }

  // Check if the user owns this case
  if (caseData.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const success = await deleteCase(params.id)

  if (!success) {
    return NextResponse.json({ error: "Failed to delete case" }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
