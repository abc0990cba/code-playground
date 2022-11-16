// 4 kyu
// Adding Big Numbers
// https://www.codewars.com/kata/525f4206b73515bffb000b21/

// Task description:
// We need to sum big numbers and we require your help.
// Write a function that returns the sum of two numbers. The input numbers are strings and the function must return a string.

// Example
// add("123", "321"); -> "444"
// add("11", "99");   -> "110"
// Notes:
// The input numbers are big.
// The input is a string of only digits
// The numbers are positives

// Solution
function add(a, b) {
  let sum = '';
  let carry = 0;
  arrA = a.split('');
  arrB = b.split('');
  
  const toNumber = s => parseInt(s || 0, 10);
  
  while (arrA.length || arrB.length || carry) {
    carry += toNumber(arrA.pop()) + toNumber(arrB.pop());
    sum = carry % 10 + sum; // number + string = string
    carry = Number(carry > 9);
  }
  return sum;
}
