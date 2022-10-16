const a = Buffer.from('a');
const b = Buffer.from('b');
const c = Buffer.from('c');

const res = Buffer.concat([a, b, c]);

console.log(res); // <Buffer 61 62 63>