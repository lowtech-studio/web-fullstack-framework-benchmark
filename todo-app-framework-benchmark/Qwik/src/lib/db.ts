import Database from "better-sqlite3";
import { join } from "node:path";

const DB_PATH = join(process.cwd(), "todos.db");

let _db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (!_db) {
    _db = new Database(DB_PATH);
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
  return getDb().prepare("SELECT id, todo FROM todos").all() as Todo[];
}

export function createTodo(todo: string): void {
  getDb().prepare("INSERT INTO todos (todo) VALUES (?)").run(todo);
}

export function deleteTodo(id: number): void {
  getDb().prepare("DELETE FROM todos WHERE id = ?").run(id);
}
