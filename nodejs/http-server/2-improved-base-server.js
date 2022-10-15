'use strict';

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 8000;

const user = {
    nickname: 'Bill Mill',
    city: 'Adelaida',
}

const server = http.createServer((req, res) => {
    res.end(`${user.nickname} said 'Hello!' from ${user.city}.11`);
})

server.on('clientError', (err, socker) => {
    socket.end('HTTP/1.1 400 Bad request\r\n\r\n')
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});