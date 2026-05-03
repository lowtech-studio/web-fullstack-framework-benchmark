import Database from "better-sqlite3";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_PATH = join(__dirname, "..", "todos.db");

const db = new Database(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

const count = db.prepare("SELECT COUNT(*) as count FROM todos").get();
if (count.count >= 10000) {
  console.log(`Database already has ${count.count} todos. Skipping seed.`);
  process.exit(0);
}

console.log("Seeding database with 10000 todos...");

const insert = db.prepare("INSERT INTO todos (todo) VALUES (?)");
const insertMany = db.transaction((todos) => {
  for (const todo of todos) {
    insert.run(todo);
  }
});

const todos = Array.from({ length: 10000 }, (_, i) => `Todo ${i + 1}`);
insertMany(todos);

console.log("Done! 10000 todos inserted.");
db.close();
