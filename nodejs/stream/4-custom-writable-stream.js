const { Writable } = require("stream");
const events = require("events");

class Counter extends Writable {
    _write(chunk, encoding, callback) {
        console.log(chunk.toString());

        callback();
    }
}

const counter = new Counter({ highWaterMark: 2 });

(async () => {
    for (let i = 1; i <= 1000; ++i) {
        const canWrite = counter.write(Buffer.from(`${i}`, "utf-8"));

        console.log("Can we write bunch of data? ", canWrite.toString());

        if (!canWrite) {
            await events.once(counter, "drain");
            console.log("'drain' event fired");
        }
    }
})()