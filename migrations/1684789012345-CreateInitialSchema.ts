import type { MigrationInterface, QueryRunner } from "typeorm"

export class CreateInitialSchema1684789012345 implements MigrationInterface {
  name = "CreateInitialSchema1684789012345"

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create users table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "password" character varying,
        "role" character varying NOT NULL DEFAULT 'consumer',
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email"),
        CONSTRAINT "PK_users" PRIMARY KEY ("id")
      )
    `)

    // Create cases table
    await queryRunner.query(`
      CREATE TABLE "cases" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "description" text NOT NULL,
        "status" character varying NOT NULL DEFAULT 'pending',
        "userId" uuid NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_cases" PRIMARY KEY ("id")
      )
    `)

    // Create documents table
    await queryRunner.query(`
      CREATE TABLE "documents" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "title" character varying NOT NULL,
        "content" text NOT NULL,
        "userId" uuid NOT NULL,
        "caseId" uuid,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_documents" PRIMARY KEY ("id")
      )
    `)

    // Add foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "cases" ADD CONSTRAINT "FK_cases_users" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
    `)

    await queryRunner.query(`
      ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_users" 
      FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
    `)

    await queryRunner.query(`
      ALTER TABLE "documents" ADD CONSTRAINT "FK_documents_cases" 
      FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE SET NULL
    `)

    // Create extension for UUID generation if it doesn't exist
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_cases"`)
    await queryRunner.query(`ALTER TABLE "documents" DROP CONSTRAINT "FK_documents_users"`)
    await queryRunner.query(`ALTER TABLE "cases" DROP CONSTRAINT "FK_cases_users"`)

    // Drop tables
    await queryRunner.query(`DROP TABLE "documents"`)
    await queryRunner.query(`DROP TABLE "cases"`)
    await queryRunner.query(`DROP TABLE "users"`)
  }
}
