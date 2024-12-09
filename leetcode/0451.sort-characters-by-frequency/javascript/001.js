/**
 * @param {string} s
 * @return {string}
 */
const frequencySort = function(s) {
  const count = {};

  for(letter of s) {
    count[letter] = (count[letter] || 0) + 1;
  }

  const sortedKeys =
    Object.keys(count)
          .sort((a, b) => count[b] - count[a]);

  let res = "";
  for(key of sortedKeys) {
    for(let i = 0; i < count[key]; i++) {
      res += key;
    }
  }

  return res;
};