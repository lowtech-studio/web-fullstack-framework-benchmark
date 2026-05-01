import Database from "better-sqlite3";
import path from "node:path";

const DB_PATH = path.resolve(process.cwd(), "todos.db");

let db: Database.Database;

function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    db.pragma("journal_mode = WAL");
    db.exec(`
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo TEXT NOT NULL
      )
    `);
  }
  return db;
}

export function getTodos(): { id: number; todo: string }[] {
  return getDb().prepare("SELECT id, todo FROM todos").all() as {
    id: number;
    todo: string;
  }[];
}

export function createTodo(todo: string): void {
  getDb().prepare("INSERT INTO todos (todo) VALUES (?)").run(todo);
}

export function deleteTodo(id: number): void {
  getDb().prepare("DELETE FROM todos WHERE id = ?").run(id);
}
