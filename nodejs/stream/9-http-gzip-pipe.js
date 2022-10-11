const fs = require("node:fs");
const zlib = require("node:zlib");
const http = require("node:http");

const once = (fn) => (...args) => {
    if (!fn) {
        return;
    }
    const res = fn(...args);
    fn = null;
    return res;
}

const prepareCache = (callback) => {
    callback = once(callback);

    const rs = fs.createReadStream("index.html");
    const gz = zlib.createGzip();

    const buffers = [];
    let buffer = null;

    gz.on("data", (buffer) => {
        buffers.push(buffer);
    });

    gz.once("end", () => {
        buffer = Buffer.concat(buffers);
        callback(null, buffer);
    })

    gz.on("error", callback);
    rs.on("error", callback);

    rs.pipe(gz);

}

const startServer = (err, buffer) => {
    if (err) {
        throw err;
    }

    const server = http.createServer((request, response) => {
        console.log(request.url);
        response.writeHead("200", { "Content-Encoding": "gzip" });
        response.end(buffer);
    })

    server.listen(8100);
}

prepareCache(startServer);