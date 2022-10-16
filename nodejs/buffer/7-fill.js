const buf = Buffer.alloc(5).fill('k');

console.log(buf); // <Buffer 6b 6b 6b 6b 6b>
console.log(buf.toString()); // kkkkk