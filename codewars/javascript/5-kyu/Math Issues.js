// 5 kyu
// Math Issues
// https://www.codewars.com/kata/5267faf57526ea542e0007fb

// Task Description:
// Oh no, our Math object was "accidently" reset. Can you re-implement some of those functions?
// We can assure, that only non-negative numbers are passed as arguments.
// So you don't have to consider things like undefined, null, NaN, negative numbers, strings and so on.
// Here is a list of functions, we need:
// Math.round()
// Math.ceil()
// Math.floor()


// Solution 1
// It rounds the number to the closest integer - it either "ceils" the number, or "floors" it, based on its value:
Math.round = function(num) {
  return (num - parseInt(num) >= 0.5) ? parseInt(num) + 1 : parseInt(num) ;
};

// Rounds a number to the closest integer value larger than the current number.
Math.ceil = function(num) {
  return (parseInt(num) === num) ? num : parseInt(num) + 1;
};

// Rounds the integer to the closest integer smaller than the current one:
Math.floor = function(num) {
  return parseInt(num);
};


// Solution 2
Math.floor = num => parseInt(num);
Math.round = num => Math.floor(num + 0.5);
Math.ceil  = num => Number.isInteger(num) ? num : Math.floor(num + 1);
