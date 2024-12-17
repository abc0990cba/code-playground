/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function(tokens) {
  const stack = [];

  for (const letter of tokens) {
    if(letter === '+') {
      const x = stack.pop();
      const y = stack.pop();
      stack.push(x + y);
    } else if(letter === '-') {
      const x = stack.pop();
      const y = stack.pop();
      stack.push(y - x);
    } else if(letter === '*') {
      const x = stack.pop();
      const y = stack.pop();
      stack.push(x * y);
    } else if (letter === '/') {
      const x = stack.pop();
      const y = stack.pop();
      stack.push(Math.trunc(y / x));
    } else {
      stack.push(parseInt(letter, 10));
    }
  }

  return stack.pop()
};