import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, "..", "todos.db");

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

// Clear existing todos
db.prepare("DELETE FROM todos").run();

// Insert 10000 todos in a transaction for performance
const insert = db.prepare("INSERT INTO todos (todo) VALUES (?)");
const insertMany = db.transaction((todos: string[]) => {
  for (const todo of todos) {
    insert.run(todo);
  }
});

const todos = Array.from({ length: 10000 }, (_, i) => `Todo ${i + 1}`);
insertMany(todos);

console.log("Seeded 10000 todos successfully.");
db.close();
