import { DatabaseSync } from "node:sqlite";

const DB_PATH = "./todos.db";
const db = new DatabaseSync(DB_PATH);

db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT NOT NULL
  )
`);

// Clear existing data
db.exec("DELETE FROM todos");

// Insert 10000 todos inside a transaction for performance
const insert = db.prepare("INSERT INTO todos (todo) VALUES (?)");

console.log("Seeding 10000 todos...");
db.exec("BEGIN TRANSACTION");
for (let i = 1; i <= 10000; i++) {
  insert.run(`Todo item ${i}`);
}
db.exec("COMMIT");

console.log("Done! 10000 todos inserted.");
db.close();
