import { DatabaseSync } from 'node:sqlite'
import { join } from 'node:path'

function getDb() {
  return new DatabaseSync(join(process.cwd(), '..', 'VanillaJS', 'SSR', 'todos.db'))
}

export function getTodos() {
  const db = getDb()
  return db.prepare('SELECT todo FROM todos').all()
}

export function createTodo(todo: string) {
  const db = getDb()
  db.prepare('INSERT INTO todos (todo) VALUES (?)').run(todo)
}

export function deleteTodo(todo: string) {
  const db = getDb()
  db.prepare('DELETE FROM todos WHERE todo = ?').run(todo)
}