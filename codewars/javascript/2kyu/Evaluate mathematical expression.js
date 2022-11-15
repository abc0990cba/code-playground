// 2 kyu
// Evaluate mathematical expression
// https://www.codewars.com/kata/52a78825cdfc2cfc87000005

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
