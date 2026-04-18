import { DatabaseSync } from "node:sqlite";

const DB_PATH = "./todos.db";

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!_db) {
    _db = new DatabaseSync(DB_PATH);
    _db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      )
    `);
  }
  return _db;
}

export interface Todo {
  id: number;
  todo: string;
}

export function getAllTodos(): Todo[] {
  const db = getDb();
  return db.prepare("SELECT id, todo FROM todos").all() as Todo[];
}

export function createTodo(todo: string): void {
  const db = getDb();
  db.prepare("INSERT INTO todos (todo) VALUES (?)").run(todo);
}

export function deleteTodo(todo: string): void {
  const db = getDb();
  db.prepare("DELETE FROM todos WHERE todo = ?").run(todo);
}
