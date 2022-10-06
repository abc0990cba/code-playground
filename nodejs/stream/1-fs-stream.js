const fs = require("fs");

let writeableStream = fs.createWriteStream("hello.txt");

writeableStream.write("Start!\n");
for (let i = 1; i <= 1e4; ++i) {
    writeableStream.write("String string string string string string.\n");
}
writeableStream.end("Finish.");

let readableStream = fs.createReadStream("hello.txt", "utf8");

let chunksAmount = 0;
readableStream.on("data", function (chunk) {
    ++chunksAmount;
    console.log(`chunk ${chunksAmount}: `, chunk);
    console.log("Chunks amount: ", chunksAmount);
});

