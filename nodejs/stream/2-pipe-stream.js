const fs = require("fs");

let writeableStream0 = fs.createWriteStream("hello.txt");
writeableStream0.write("Start\n");
writeableStream0.write("String\n");
writeableStream0.write("Finish");

let readableStream = fs.createReadStream("hello.txt", "utf-8");

// Without pipe.
let writeableStream1 = fs.createWriteStream("copy1.txt");
readableStream.on("data", function (chunk) {
  writeableStream1.write(chunk);
});

// With pipe.
let writeableStream2 = fs.createWriteStream("copy2.txt");
readableStream.pipe(writeableStream2);
