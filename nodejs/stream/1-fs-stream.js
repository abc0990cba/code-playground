const fs = require("fs");

let writeableStream = fs.createWriteStream("hello.txt");

writeableStream.write("Start!\n");
for (let i = 1; i <= 1e4; ++i) {
  writeableStream.write("String string string string string string.\n");
}
writeableStream.end("Finish.");

let readableStream = fs.createReadStream("hello.txt", "utf8");

let chunksCounter = 0;

// While buffering (segmenting the data into chunks),
// the size of the buffer depends on the highWaterMark parameter,
// which is passed to the stream constructor.

// The default value of this parameter
// is 16384 bytes (16kb) so if you don't override the parameter,
// the stream will read 16kb chunks and pass them to you to process.
readableStream.on("data", function (chunk) {
  ++chunksCounter;
  console.log(`chunk ${chunksCounter}: `, chunk);
  console.log("Chunks amount: ", chunksCounter);
});
