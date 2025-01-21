/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function(a, b) {
    while(b) {
      const tmp = (a & b) << 1; // calc carry
      a = a ^ b;
      b = tmp;
    }

    return a;
};