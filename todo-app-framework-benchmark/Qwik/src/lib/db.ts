import Database from "better-sqlite3";
import { join } from "node:path";

const DB_PATH = join(process.cwd(), "todos.db");

let _db: Database.Database | null = null;
let _stmtGetAll: Database.Statement | null = null;
let _stmtInsert: Database.Statement | null = null;
let _stmtDelete: Database.Statement | null = null;

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
  if (!_stmtGetAll) _stmtGetAll = getDb().prepare("SELECT id, todo FROM todos");
  return _stmtGetAll.all() as Todo[];
}

export function createTodo(todo: string): void {
  if (!_stmtInsert) _stmtInsert = getDb().prepare("INSERT INTO todos (todo) VALUES (?)");
  _stmtInsert.run(todo);
}

export function deleteTodo(id: number): void {
  if (!_stmtDelete) _stmtDelete = getDb().prepare("DELETE FROM todos WHERE id = ?");
  _stmtDelete.run(id);
}

export const deleteTodoById = deleteTodo;
