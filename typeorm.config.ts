import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Case } from "./entities/Case"
import { Document } from "./entities/Document"

// This configuration is used for CLI commands
const dataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [User, Case, Document],
  migrations: ["migrations/*.ts"],
  synchronize: false, // Never use synchronize in production
  logging: true,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

export default dataSource
