/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
  let xorRes = 0;

  for(let i = 0; i <= nums.length; i++) {
    xorRes ^= i ^ nums[i];
  }

  return xorRes
};