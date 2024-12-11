/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
const isAnagram = function(s, t) {
  if(s.length !== t.length) return false;
  
  const count = new Array(26).fill(0);
  const A_CHAR_CODE = 97;
  
  for(let i = 0; i < s.length; i++) {
      const sIdx = s.charCodeAt(i) - A_CHAR_CODE;
      const tIdx = t.charCodeAt(i) - A_CHAR_CODE;
      count[sIdx]++;
      count[tIdx]--;
  }
  
  return count.every(x => x === 0);
};