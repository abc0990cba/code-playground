/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function(n) {
  const res = [];

  const backtrack = (stack, opened, closed) => {
    if(opened === closed && opened === n) {
      res.push(stack);
      return;
    }

    if(opened < n) backtrack(stack + '(', opened + 1, closed);

    if(closed < opened) backtrack(stack + ')', opened, closed + 1);
  }

  backtrack('', 0, 0);

  return res;
};