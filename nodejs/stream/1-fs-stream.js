const fs = require("fs");

let writeableStream = fs.createWriteStream("hello.txt");

writeableStream.write("Start!\n");
for (let i = 1; i <= 1e5; ++i) {
    writeableStream.write("String.\n");
}
writeableStream.end("Finish.");

let readableStream = fs.createReadStream("hello.txt", "utf8");

let chunksAmount = 0;
readableStream.on("data", function (chunk) {
    console.log("chunk: ", chunk);
    ++chunksAmount;
    console.log("Chunks amount: ", chunksAmount);
});

