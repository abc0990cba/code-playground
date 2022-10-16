const a = Buffer.from('Belgium');
const b = Buffer.from(a);

console.log('a: ', a); // a:  <Buffer 42 65 6c 67 69 75 6d>
console.log('b: ', b); // b:  <Buffer 42 65 6c 67 69 75 6d>

const arr1 = [1, 50, 100];
const buffArr1 = Buffer.from(arr1);

// { type: 'Buffer', data: [ 1, 50, 100 ] }
console.log(buffArr1.toJSON());


// The array bytes should fall between the range of 0 and 255.
const arr2 = [300, 400, 500];
const buffArr2 = Buffer.from(arr2);

// { type: 'Buffer', data: [ 44, 144, 244 ] }
console.log(buffArr2.toJSON()); 
