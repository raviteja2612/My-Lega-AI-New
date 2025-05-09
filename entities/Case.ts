import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { User } from "./User"
import { Document } from "./Document"

@Entity("cases")
export class Case {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  title: string

  @Column("text")
  description: string

  @Column({ default: "pending" })
  status: string

  @Column()
  userId: string

  @ManyToOne(
    () => User,
    (user) => user.cases,
  )
  @JoinColumn({ name: "userId" })
  user: User

  @OneToMany(
    () => Document,
    (document) => document.case,
  )
  documents: Document[]

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
