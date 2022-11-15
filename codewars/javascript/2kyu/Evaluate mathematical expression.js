// 2 kyu
// Evaluate mathematical expression
// https://www.codewars.com/kata/52a78825cdfc2cfc87000005

// // Task description:
// Instructions
// Given a mathematical expression as a string you must return the result as a number.

// Numbers
// Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.

// Operators
// You need to support the following mathematical operators:

// Multiplication *
// Division / (as floating point division)
// Addition +
// Subtraction -
// Operators are always evaluated from left-to-right, and * and / must be evaluated before + and -.

// Parentheses
// You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6

// Whitespace
// There may or may not be whitespace between numbers and operators.

// An addition to this rule is that the minus sign (-) used for negating numbers and parentheses will never be separated by whitespace. I.e all of the following are valid expressions.

// 1-1    // 0
// 1 -1   // 0
// 1- 1   // 0
// 1 - 1  // 0
// 1- -1  // 2
// 1 - -1 // 2
// 1--1   // 2

// 6 + -(4)   // 2
// 6 + -( -4) // 10
// And the following are invalid expressions

// 1 - - 1    // Invalid
// 1- - 1     // Invalid
// 6 + - (4)  // Invalid
// 6 + -(- 4) // Invalid
// Validation
// You do not need to worry about validation - you will only receive valid mathematical expressions following the above rules.

// Restricted APIs
// NOTE: Both eval and Function are disabled.


// Solution
// Based on Recursive descent parser
// http://en.wikipedia.org/wiki/Recursive_descent_parser
const run = (str) => expression(str);
const peek = (str) => str[0] || '';
const get = (str) => str.shift();

const factor = (str) => {
  const makeNumber = (str) => {
    let result = '';
    while(/[0-9\.]/.test(peek(str))) {
      result += get(str);
    }
    return Number(result);
  }
	
  if(peek(str) === "-") {
    // rule - factor
    get(str);
    return -1 * factor(str);
  } else if(!isNaN(peek(str))) {
      return makeNumber(str);
  } else if(peek(str) === "(") {
      get(str);  //consume opening parenthesis
      const number = expression(str);
      get(str); // consume closing parenthesis
      return number;
  }
};

const term = (str) => {
  let result = factor(str);
  while (peek(str) == '*' || peek(str) == '/') {
    if (get(str) == '*') {
      result *= factor(str);
    } else {
      result /= factor(str);
    }
  }
  return result;
};

const expression = (str) => {
  let result = term(str);
  while (peek(str) == '+' || peek(str) == '-') {
    if (get(str) == '+') {
      result += term(str);
    } else {
      result -= term(str);
    }
  }
  return result;
};

const calc = (expression) => {
  const expressionToParse = expression.replace(/\s+/g, '').split('');
  return run(expressionToParse);
}
