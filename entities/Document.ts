import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { User } from "./User"
import { Case } from "./Case"

@Entity("documents")
export class Document {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column("text")
  content: string

  @Column()
  userId: string

  @Column({ nullable: true })
  caseId?: string

  @ManyToOne(
    () => User,
    (user) => user.documents,
  )
  @JoinColumn({ name: "userId" })
  user: User

  @ManyToOne(
    () => Case,
    (caseEntity) => caseEntity.documents,
    { nullable: true },
  )
  @JoinColumn({ name: "caseId" })
  case?: Case

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
