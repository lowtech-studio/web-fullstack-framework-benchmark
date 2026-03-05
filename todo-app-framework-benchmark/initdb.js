import { DatabaseSync } from 'node:sqlite';
const db = new DatabaseSync('./VanillaJS/todos.db');

// Execute SQL statements from strings.
db.exec(`
    DROP TABLE IF EXISTS todos;
    CREATE TABLE todos(
        todo TEXT
    );
`);

for (let i = 1; i <= 10000; i++) {
  const stmt = db.prepare('INSERT INTO todos (todo) VALUES (?)');
  stmt.run(`Todo ${i}`);
}

db.close();