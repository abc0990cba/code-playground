const fs = require("node:fs");
const zlib = require("node:zlib");

const rs = fs.createReadStream("8-gzip-pipe.js", "utf-8");
const ws = fs.createWriteStream("8-gzip-pipe.js.gz", "utf-8");
const gz = zlib.createGzip();

rs.pipe(gz).pipe(ws);

rs.on("end", () => {
    console.log("Done.");
})