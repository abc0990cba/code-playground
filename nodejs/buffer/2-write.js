const buf = Buffer.alloc(10);
const len = buf.write("Hi!");

console.log(len); // 3
console.log(buf); // <Buffer 48 69 21 00 00 00 00 00 00 00>