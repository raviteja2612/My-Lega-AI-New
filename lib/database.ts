import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "@/entities/User"
import { Case } from "@/entities/Case"
import { Document } from "@/entities/Document"

// This is a singleton pattern to ensure we only create one connection
let dataSourceInstance: DataSource | null = null

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: process.env.NODE_ENV !== "production", // Auto-create database schema in development
  logging: process.env.NODE_ENV !== "production",
  entities: [User, Case, Document],
  migrations: [],
  subscribers: [],
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export async function getDataSource(): Promise<DataSource> {
  if (dataSourceInstance === null || !dataSourceInstance.isInitialized) {
    dataSourceInstance = await AppDataSource.initialize()
  }

  return dataSourceInstance
}

// For use in server components and API routes
export async function getRepository<T>(entity: any): Promise<import("typeorm").Repository<T>> {
  const dataSource = await getDataSource()
  return dataSource.getRepository(entity)
}
