import { WebApp } from 'meteor/webapp';
import { getDb } from '../../db.js';

const app = WebApp.handlers;

// Parse JSON body manually (no express body-parser needed)
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk.toString(); });
    req.on('end', () => {
      try { resolve(data ? JSON.parse(data) : {}); }
      catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function json(res, statusCode, body) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'POST, DELETE, OPTIONS',
  });
  res.end(JSON.stringify(body));
}

// GET / — list all todos
app.use('/', (req, res, next) => {
  if (req.method !== 'GET' || req.url !== '/') return next();
  const db = getDb();
  const todos = db.prepare('SELECT todo FROM todos').all();
  json(res, 200, todos);
});

// POST /create — create a todo
app.use('/create', async (req, res, next) => {
  if (req.method !== 'POST') return next();
  const body = await parseBody(req);
  if (!body.todo) return json(res, 400, { status: 'error', message: 'todo is required' });
  const db = getDb();
  db.prepare('INSERT INTO todos (todo) VALUES (?)').run(body.todo);
  json(res, 200, { status: 'ok' });
});

// DELETE /delete — delete a todo
app.use('/delete', async (req, res, next) => {
  if (req.method !== 'DELETE') return next();
  const body = await parseBody(req);
  if (!body.todo) return json(res, 400, { status: 'error', message: 'todo is required' });
  const db = getDb();
  db.prepare('DELETE FROM todos WHERE todo = ?').run(body.todo);
  json(res, 200, { status: 'ok' });
});

// OPTIONS preflight
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    json(res, 204, {});
  } else {
    next();
  }
});
