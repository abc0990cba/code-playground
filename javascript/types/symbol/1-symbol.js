const a = Symbol('a');
const b = Symbol('a');
const c = Symbol('b') === Symbol('b');

console.log(a);             // Symbol(a)
console.log(a.toString());  // Symbol(a)
console.log(a.description); // a

console.log(a == b);  // false
console.log(a === b); // false
console.log(c);       // false
