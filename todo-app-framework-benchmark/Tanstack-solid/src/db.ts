import Database from 'better-sqlite3'
import path from 'node:path'

const DB_PATH = path.resolve(process.cwd(), 'tmp', 'todos.db')

let _db: Database.Database | null = null

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH)
    _db.pragma('journal_mode = WAL')
    _db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      )
    `)
  }
  return _db
}

export interface Todo {
  id: number
  todo: string
}
