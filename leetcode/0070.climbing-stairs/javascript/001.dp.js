/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let a = 1, b = 1;

    for(let i = 0; i < n; i++) {
      const temp = b;
      b = a + b;
      a = temp; 
    }

    return a;
};