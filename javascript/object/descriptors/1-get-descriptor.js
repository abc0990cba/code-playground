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
