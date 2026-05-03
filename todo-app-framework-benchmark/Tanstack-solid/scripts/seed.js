import Database from 'better-sqlite3'
import path from 'node:path'
import fs from 'node:fs'

const DB_DIR = path.resolve(process.cwd(), 'tmp')
const DB_PATH = path.join(DB_DIR, 'todos.db')

// Ensure tmp directory exists
fs.mkdirSync(DB_DIR, { recursive: true })

// Remove existing DB to start fresh
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH)
  console.log('Removed existing database.')
}

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`)

const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)')

const insertMany = db.transaction((todos) => {
  for (const todo of todos) {
    insert.run(todo)
  }
})

const todos = Array.from({ length: 10000 }, (_, i) => `Todo ${i + 1}`)
insertMany(todos)

console.log(`Seeded ${todos.length} todos into ${DB_PATH}`)
db.close()
