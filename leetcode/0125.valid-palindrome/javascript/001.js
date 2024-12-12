const isAlphaNum = (s) => {
  return (s >= 'a' && s <= 'z') ||
         (s >= 'A' && s <= 'Z') ||
         (s >= '0' && s <= '9')
}

/**
* @param {string} s
* @return {boolean}
*/
const isPalindrome = function(s) {
  let l = 0;
  let r = s.length - 1;

  while(l < r) {
    while(l < r && !isAlphaNum(s[l])) {
      l++;
    }

    while(l < r && !isAlphaNum(s[r])) {
      r--;
    }

    if(s[l].toLowerCase() !== s[r].toLowerCase()) return false;

    l++;
    r--;
  }

  return true;
};

// Time: O(n)
// Space: O(1)