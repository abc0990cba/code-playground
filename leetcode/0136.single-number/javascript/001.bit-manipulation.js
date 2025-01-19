/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
  let res = 0; // res ^ 0 = res

  // for [3,2,1,2,1]
  // 3 - 011
  // 2 - 010
  // 1 - 001
  // 2 - 010
  // 1 - 001
  // 3 ^ 2 ^ 1 ^ 2 ^ 1 = 3

  for(const n of nums) {
    res ^= n;
  }

  return res
};