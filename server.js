const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.jpg': 'image/jpeg' };
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad request'); return; }
  const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
  if (!['index.html', 'style.css', 'index.js'].includes(relative) && !/^image\/photo_\d+_y\.jpg$/.test(relative)) {
    res.writeHead(404).end('Not found'); return;
  }
  fs.readFile(path.join(__dirname, relative), (error, content) => {
    if (error) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(relative)] || 'application/octet-stream' });
    res.end(content);
  });
});
server.listen(Number(process.env.PORT) || 3000, '127.0.0.1', () => console.log(`Local: http://localhost:${server.address().port}`));
