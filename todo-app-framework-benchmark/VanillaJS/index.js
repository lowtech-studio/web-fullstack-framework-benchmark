import { createServer } from 'node:http';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync('todos.db');
const hostname = '127.0.0.1';
const port = 3000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  if (req.url === '/create') {
    let data = [];
    req.on('data', (chunk) => { data['todo']= chunk.toString().split('=')[1]; });
    req.on('end', () => {
      const insert = db.prepare('INSERT INTO todos (todo) VALUES (?)');
      insert.run(data['todo']);
      res.writeHead(302, {
        'Location': '/'
      });
      res.end();
    });
  } else if (req.url.includes('/delete')) {
      const params =  new URL(`http://${process.env.HOST ?? 'localhost:3000'}${req.url}`).searchParams;
      const deleteQuery = db.prepare('DELETE FROM todos WHERE todo = ?');
      deleteQuery.run(params.get("todo"));
      res.writeHead(302, {
        'Location': '/'
      });
      res.end();
  } else {
    res.write(`<html lang="en"><head><title>ToDo App</title></head><body>
                <h1>ToDo App Benchmark</h1>
                <form action="/create" method="post" >
                  <input id="create-todo-field" type="text" name="todo" /><input id="create-todo-button" type="submit" value="Submit" />
                </form>
                <ul id="todos">`);
    db.prepare('SELECT todo FROM todos').all().map(row => res.write(`<li>${row.todo} <a id="delete-todo-link-${row.todo}" href="/delete?todo=${row.todo}">Delete</a></li>`));
    res.end(`</ul></body></html>`);
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});