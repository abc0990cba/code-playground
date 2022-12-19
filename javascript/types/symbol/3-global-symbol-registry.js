const a = Symbol.for('a');
const b = Symbol.for('a');

const a2 = Symbol('a');
const c = Symbol('c');

console.log(a == b);   // true
console.log(a === a2); // false
console.log(a === b);  // true

console.log(Symbol.keyFor(b)); // 'a'
console.log(Symbol.keyFor(c)); // undefined

console.log(a.description); // 'a'
console.log(a2.description); // 'a'
