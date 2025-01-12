/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  const digitToChar = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "qprs",
    "8": "tuv",
    "9": "wxyz"
  };
  const res = [];

   if(!digits.length) return res;

  const backtrack = (i, curStr) => {
    if(digits.length === curStr.length) {
      res.push(curStr);
      return;
    }

    const str = digitToChar[digits[i]];

    for(const s of str) {
      backtrack(i + 1, curStr + s);
    }

  }

  backtrack(0, "");

  return res;
};