// 6 kyu
// Anything to integer
// https://www.codewars.com/kata/52ac7cad98d1981a840004fc

// Description:
// Your task is to program a function which converts any input to an integer.
// Do not perform rounding, the fractional part should simply be discarded.
// If converting the input to an integer does not make sense (with an object, for instance), the function should return 0 (zero).
// Also, Math.floor(), parseInt() and parseFloat() are disabled for your unconvenience.
// Onegaishimasu!

// Solution 1
function toInteger1(n) {
  if (isNaN(n)) {
    return 0;
  }
  // The Math.trunc() function returns the integer part of a number by removing any fractional digits.
  const truncedN = Math.trunc(n);
  if (!Number.isFinite(truncedN)) {
    return 0;
  }
  return truncedN;  
}

// Solution 2
const toInteger2 = n => ~~n;

// Solution 3
const toInteger2 = n => 0 | n;
