/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let res = '';
  let resLen = 0;

  for(let i = 0; i < s.length; i++) {
    // odd
    let l = i;
    let r = i;

    while(l>=0 && r<s.length && s[l] === s[r]) {
      const diff = r-l+1;
      if(diff > resLen) {
        resLen = diff;
        res = s.slice(l, r+1);
      }
      l--;
      r++
    }

    // even
    l = i;
    r = i+1;
  
    while(l>=0 && r<s.length && s[l] === s[r]) {
      const diff = r-l+1;
      if(diff > resLen) {
        resLen = diff;
        res = s.slice(l, r+1);
      }
      l--;
      r++
    }
}

return res;
};