'use strict'

// Writable.
let user = {
  name: 'Jim'
};

Object.defineProperty(user, 'name', {
  writable: false
});

// in 'use strict'
// TypeError: Cannot assign to read only property 'name' of object
// user.name = 'Dwight'; 

///////////////////////////////////////////////////////////////////

// Enumerable.
const user2 = { };
const user3 = { };

Object.defineProperty(user2, 'name', {
  value: 'Andy',
});

for(let key in user2) {
    console.log(user.name); // Empty, enumerable is false
}

Object.defineProperty(user3, 'name', {
  value: 'Stanley',
  enumerable: true
});

for(let key in user3) {
    console.log(key, ': ', user3[key]); // name: Stanley
}

///////////////////////////////////////////////////////////////////

// Configurable.
const descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(JSON.stringify(descriptor, null, 2));
// Output:
// {
//   "value": 3.141592653589793,
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }
