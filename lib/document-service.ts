import { getRepository } from "./database"
import { Document } from "@/entities/Document"

export async function getDocumentById(id: string): Promise<Document | null> {
  try {
    const documentRepository = await getRepository<Document>(Document)
    return await documentRepository.findOne({
      where: { id },
      relations: ["user", "case"],
    })
  } catch (error) {
    console.error("Error fetching document by ID:", error)
    return null
  }
}

export async function getDocumentsByUserId(userId: string): Promise<Document[]> {
  try {
    const documentRepository = await getRepository<Document>(Document)
    return await documentRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    })
  } catch (error) {
    console.error("Error fetching documents by user ID:", error)
    return []
  }
}

export async function getDocumentsByCaseId(caseId: string): Promise<Document[]> {
  try {
    const documentRepository = await getRepository<Document>(Document)
    return await documentRepository.find({
      where: { caseId },
      order: { createdAt: "DESC" },
    })
  } catch (error) {
    console.error("Error fetching documents by case ID:", error)
    return []
  }
}

export async function createDocument(data: {
  title: string
  content: string
  userId: string
  caseId?: string
}): Promise<Document | null> {
  try {
    const documentRepository = await getRepository<Document>(Document)

    const document = documentRepository.create({
      title: data.title,
      content: data.content,
      userId: data.userId,
      caseId: data.caseId,
    })

    return await documentRepository.save(document)
  } catch (error) {
    console.error("Error creating document:", error)
    return null
  }
}

export async function updateDocument(id: string, data: Partial<Document>): Promise<Document | null> {
  try {
    const documentRepository = await getRepository<Document>(Document)

    await documentRepository.update(id, data)
    return await getDocumentById(id)
  } catch (error) {
    console.error("Error updating document:", error)
    return null
  }
}

export async function deleteDocument(id: string): Promise<boolean> {
  try {
    const documentRepository = await getRepository<Document>(Document)
    const result = await documentRepository.delete(id)
    return result.affected ? result.affected > 0 : false
  } catch (error) {
    console.error("Error deleting document:", error)
    return false
  }
}
