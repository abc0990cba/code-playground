'use strict';

const http = require('http');

const hostname = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello world!');
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

server.on('error', (error) => {
    // Non-privileged user (not root) can't open
    //  a listening socket on ports below 1024.
    if (error.code == 'EACCES') {
        console.log(`No access to to port: ${port}`)
    }
})