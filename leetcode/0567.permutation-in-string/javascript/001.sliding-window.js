/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function(s1, s2) {
  if (s1.length > s2.length) return false;
  const ABC_LENGTH = 26;
  const FIRST_CHAR_CODE = 97; // a

  let s1Count = new Array(ABC_LENGTH).fill(0);
  let s2Count = new Array(ABC_LENGTH).fill(0);
  for (let i = 0; i < s1.length; i++) {
      s1Count[s1.charCodeAt(i) - FIRST_CHAR_CODE]++;
      s2Count[s2.charCodeAt(i) - FIRST_CHAR_CODE]++;
  }

  let matches = 0;
  for (let i = 0; i < ABC_LENGTH; i++) {
      if (s1Count[i] === s2Count[i]) {
          matches++;
      }
  }

  let l = 0;
  let r = s1.length;
  while (r < s2.length) {
      if (matches === ABC_LENGTH) {
          return true;
      }

      let index = s2.charCodeAt(r) - FIRST_CHAR_CODE;
      s2Count[index]++;
      if (s1Count[index] === s2Count[index]) {
          matches++;
      } else if (s1Count[index] + 1 === s2Count[index]) {
          matches--;
      }

      index = s2.charCodeAt(l) - FIRST_CHAR_CODE;
      s2Count[index]--;
      if (s1Count[index] === s2Count[index]) {
          matches++;
      } else if (s1Count[index] - 1 === s2Count[index]) {
          matches--;
      }
      
      l++;
      r++
  }

  return matches === ABC_LENGTH;
};