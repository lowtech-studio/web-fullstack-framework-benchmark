import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';

var index = readFileSync('index.html', 'utf8');
const hostname = '0.0.0.0';
const port = 3000;

const server = createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index);
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});