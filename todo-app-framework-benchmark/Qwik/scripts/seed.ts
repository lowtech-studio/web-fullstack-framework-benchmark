import Database from "better-sqlite3";
import { join } from "node:path";

const DB_PATH = join(process.cwd(), "todos.db");
const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

const count = (db.prepare("SELECT COUNT(*) as count FROM todos").get() as { count: number }).count;

if (count === 0) {
  console.log("Seeding 10000 todos...");
  const insert = db.prepare("INSERT INTO todos (todo) VALUES (?)");
  const insertMany = db.transaction((todos: string[]) => {
    for (const todo of todos) {
      insert.run(todo);
    }
  });
  const todos = Array.from({ length: 10000 }, (_, i) => `Todo item ${i + 1}`);
  insertMany(todos);
  console.log("Done.");
} else {
  console.log(`Database already has ${count} todos, skipping seed.`);
}

db.close();
