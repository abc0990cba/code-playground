const a = Buffer.from('a');
const b = Buffer.from('b');
const c = Buffer.from('a');

console.log(Buffer.compare(a, b)); // -1
console.log(Buffer.compare(b, a)); //  1
console.log(Buffer.compare(a, c)); //  0