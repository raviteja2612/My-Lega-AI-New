import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Case } from "./Case"
import { Document } from "./Document"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  password?: string

  @Column({ default: "consumer" })
  role: string

  @OneToMany(
    () => Case,
    (caseEntity) => caseEntity.user,
  )
  cases: Case[]

  @OneToMany(
    () => Document,
    (document) => document.user,
  )
  documents: Document[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
