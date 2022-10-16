const buff = Buffer.from("this is a buffer");

console.log(buff.includes("this")); // true
console.log(buff.includes(Buffer.from("this is a buffer"))); // true