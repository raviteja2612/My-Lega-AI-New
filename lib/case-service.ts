import { getRepository } from "./database"
import { Case } from "@/entities/Case"

export async function getCaseById(id: string): Promise<Case | null> {
  try {
    const caseRepository = await getRepository<Case>(Case)
    return await caseRepository.findOne({
      where: { id },
      relations: ["user", "documents"],
    })
  } catch (error) {
    console.error("Error fetching case by ID:", error)
    return null
  }
}

export async function getCasesByUserId(userId: string): Promise<Case[]> {
  try {
    const caseRepository = await getRepository<Case>(Case)
    return await caseRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    })
  } catch (error) {
    console.error("Error fetching cases by user ID:", error)
    return []
  }
}

export async function createCase(data: {
  title: string
  description: string
  status?: string
  userId: string
}): Promise<Case | null> {
  try {
    const caseRepository = await getRepository<Case>(Case)

    const caseEntity = caseRepository.create({
      title: data.title,
      description: data.description,
      status: data.status || "pending",
      userId: data.userId,
    })

    return await caseRepository.save(caseEntity)
  } catch (error) {
    console.error("Error creating case:", error)
    return null
  }
}

export async function updateCase(id: string, data: Partial<Case>): Promise<Case | null> {
  try {
    const caseRepository = await getRepository<Case>(Case)

    await caseRepository.update(id, data)
    return await getCaseById(id)
  } catch (error) {
    console.error("Error updating case:", error)
    return null
  }
}

export async function deleteCase(id: string): Promise<boolean> {
  try {
    const caseRepository = await getRepository<Case>(Case)
    const result = await caseRepository.delete(id)
    return result.affected ? result.affected > 0 : false
  } catch (error) {
    console.error("Error deleting case:", error)
    return false
  }
}
