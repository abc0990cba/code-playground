const fs = require("node:fs");
const zlib = require("node:zlib");
const http = require("node:http");

const rs = fs.createReadStream("index.html");
const gz = zlib.createGzip();

const buffers = [];
let buffer = null;

gz.on("data", (buffer) => {
    buffers.push(buffer);
});

gz.on("end", () => {
    buffer = Buffer.concat(buffers);
})

rs.pipe(gz);

const server = http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead("200", { "Content-Encoding": "gzip" });
    response.end(buffer);
})

server.listen(8100);