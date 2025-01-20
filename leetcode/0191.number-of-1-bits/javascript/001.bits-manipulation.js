/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function(n) {
  let total = 0;
  // 001 % 2 = 1
  // 011 % 2 = 1
  // 000 % 2 = 0
  // 010 % 2 = 0
  while(n) {
    total += n % 2;
    n >>= 1;
  }

  return total;
};