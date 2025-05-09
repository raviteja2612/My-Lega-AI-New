import { Pool } from "pg"
import { pgConnection } from "./supabase"

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: pgConnection.connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Supabase PostgreSQL connections
  },
})

// Helper function for executing SQL queries
export async function query(text: string, params: any[] = []) {
  const start = Date.now()
  const res = await pool.query(text, params)
  const duration = Date.now() - start
  console.log("Executed query", { text, duration, rows: res.rowCount })
  return res
}

// Helper function for transactions
export async function transaction<T>(callback: (client: any) => Promise<T>): Promise<T> {
  const client = await pool.connect()
  try {
    await client.query("BEGIN")
    const result = await callback(client)
    await client.query("COMMIT")
    return result
  } catch (e) {
    await client.query("ROLLBACK")
    throw e
  } finally {
    client.release()
  }
}
