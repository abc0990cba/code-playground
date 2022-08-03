'use strict'

const fs = require('fs');

async function main() {
    console.log('* START *');

    setTimeout(() => console.log('SetTimeout 1.'), 0);
    setImmediate(() => console.log('SetImmediate 1.'));

    Promise.resolve().then(() => {
        console.log('Promise 1.');
        process.nextTick(() => console.log('Promise next tick.'));
    })

    // Within I/O cycle setImmediate callback is alsways executes before setTimeout.
    fs.readFile('promise.js', () => {
        console.log('Read file.');
        setTimeout(() => console.log('Read file SetTimeout.'), 0);
        setImmediate(() => console.log('Read file SetImmediate.'));
        process.nextTick(() => console.log('Read file next tick.'));
    })

    const response = await Promise.resolve('Async/await.')
    console.log(response);

    process.nextTick(() => console.log('Next tick.'));
    setTimeout(() => console.log('SetTimeout 2.'), 0);

    console.log('* END *');
}

main();