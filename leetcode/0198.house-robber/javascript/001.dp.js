/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  let a = 0;
  let b = 0;

  // a, b, n, n+1, n+2, ...
  for(const n of nums) {
    const tmp = Math.max(a+n, b);
    a = b;
    b = tmp;
  }

  return b;
};