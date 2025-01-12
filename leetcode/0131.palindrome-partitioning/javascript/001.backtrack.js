/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
    const res = [];
    const part = [];

    const isPalindrom = (str, left, right) => {
      while(left < right) {
        if(str[left] !== str[right]) return false;
        left++;
        right--;
      }

      return true;
    }

    const backtrack = (i) => {
      if(i >= s.length) {
        res.push([...part]);
        return;
      }

      for(let j = i; j < s.length; j++) {
        if(isPalindrom(s,i, j)) {
          part.push(s.slice(i, j+1));
          backtrack(j+1);
          part.pop();
        }
      }
    }

    backtrack(0);

    return res;
};