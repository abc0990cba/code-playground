// 5 kyu
// Not very secure
// https://www.codewars.com/kata/526dbd6c8c0eb53254000110/train/javascript

// Task description:
// In this example you have to validate if a user input string is alphanumeric.
// The given string is not nil/null/NULL/None, so you don't have to check that.

// The string has the following conditions to be alphanumeric:

// At least one character ("" is not valid)
// Allowed characters are uppercase / lowercase latin letters and digits from 0 to 9
// No whitespaces / underscore

// Solution 1
function alphanumeric1(str) {
  // \s - whitespace
  return (
    /[a-zA-Z0-9]/g.test(str) && 
    !/[\s_!]/.test(str)
  );
}

// Solution 2
// ^ - beginning.
// \d - digit.
// + - quatifier. Match 1 or more preceding token.
// $ - end.
// /.../i - ignore case.
let alphanumeric2 = str => /^[a-z\d]+$/i.test(str);
