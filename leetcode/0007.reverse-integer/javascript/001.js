

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
  const MIN = -2147483648; // -2^31
  const MAX = 2147483647; // 2^31 - 1

  let res = 0;

  while(x) {
    const digit = x % 10;
    x = Math.trunc(x / 10);
    
    if(x > MAX / 10 || x == MAX / 10 && digit > MAX % 10) {
      return 0;
    }
    if(x < MIN / 10 || x == MIN / 10 && digit < MIN % 10) {
      return 0;
    }
    res = res * 10 + digit;
  }

  return res;
};