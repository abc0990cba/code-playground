// 6 kyu
// Array intersect all
// https://www.codewars.com/kata/52a4e42ce950ed50da000748


// Task Description:
// Instructions
// Write a function intersect that takes any number of arguments. The function must return an array containing
// all the values that is present in every argument given to the function.
// All arguments given will be arrays.
// The first argument determines the order of the returned values.
// Return an empty array for empty result set.
// Example
// var a = ['dog', 'bar', 'foo'];
// var b = ['foo', 'bar', 'cat'];
// var c = ['gin', 'bar', 'foo'];
// intersect(a, b, c); // ['bar', 'foo']

const intersect = (...arrs) => {
  const distinctValues = [...new Set([].concat(...arrs))];
  let result = [];
  
  for (let i = 0; i < distinctValues.length; i++) {
    if (arrs.every(v => v.includes(distinctValues[i]))){
      result.push(distinctValues[i]);
    }
  }
  return result;
};
