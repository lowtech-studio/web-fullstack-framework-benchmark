/**
 * Seed script: initializes the SQLite database with 10,000 todos.
 * Run with: npm run seed
 */
import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'

const dbPath = join(process.cwd(), 'todos.db')
const db = new DatabaseSync(dbPath)

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`)

const row = db.prepare('SELECT COUNT(*) as count FROM todos').get() as { count: number }
if (row.count >= 10000) {
  console.log(`Database already has ${row.count} todos. Skipping seed.`)
  process.exit(0)
}

const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)')
for (let i = 1; i <= 10000; i++) {
  insert.run(`Todo ${i}`)
}

console.log('Seeded 10,000 todos successfully.')
