/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function(s) {
    const stack = [];
    const bracketPairs = {
      ']': '[',
      '}': '{',
      ')': '('
    };

    for (const letter of s) {
      if(bracketPairs[letter]) {
        if(stack.length && stack[stack.length-1] === bracketPairs[letter]) {
          stack.pop()
        } else {
          return false;
        }
      } else {
        stack.push(letter);
      }
    }

    return stack.length === 0;
};