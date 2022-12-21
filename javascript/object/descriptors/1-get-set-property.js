let obj = {
    a: 'prop_a'
}

const descriptor = Object.getOwnPropertyDescriptor(obj, 'a');

console.log(JSON.stringify(descriptor, null, 2 ));
// Output: 
// {
//   "value": "prop_a",
//   "writable": true,
//   "enumerable": true,
//   "configurable": true
// }

///////////////////////////////////////////////////////////////

const user = {};
Object.defineProperty(user, 'name', {
    value: 'John'
});

const userDescriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(userDescriptor, null, 2 ));
// Output: 
// {
//   "value": "John",
//   "writable": false,
//   "enumerable": false,
//   "configurable": false
// }
