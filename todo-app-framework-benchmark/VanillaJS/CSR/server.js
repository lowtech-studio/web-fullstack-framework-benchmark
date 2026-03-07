import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('todos.db');
const hostname = '0.0.0.0';
const port = 3001;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');

  if (req.url === '/create') {
    let data = {};
    req.on('data', (chunk) => { data = JSON.parse(chunk.toString());  console.log(data); });
    req.on('end', () => {
      if (!data.todo) { res.end('{"status": "error", "message": "todo is required"}'); return; }
      const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
      insert.run(data.todo);
      res.end('{"status": "ok"}');
    });
  } else if (req.url === '/delete') {
    let data = {};
    req.on('data', (chunk) => { data = JSON.parse(chunk.toString());  console.log(data); });
    req.on('end', () => {
      if (!data.todo) { res.end('{"status": "error", "message": "todo is required"}'); return; }
      const deleteQuery = db.prepare('DELETE FROM todos WHERE todo = ?');
      deleteQuery.run(data.todo);
      res.end('{"status": "ok"}');
    });
  } else {
    res.end(JSON.stringify(db.prepare('SELECT todo FROM todos').all()));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});