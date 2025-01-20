/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function(n) {
    const LEN = 32;
    let res = 0;

    for(let i = 0; i < LEN; i++) {
      const bit = (n >>> i) & 1; 
      res += bit << (LEN - 1 - i)
    }

    return res;
};