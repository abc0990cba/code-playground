/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function(nums, target, left = 0, right = nums.length - 1) {
  if(left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if(nums[mid] === target) return mid;

  if(nums[mid] > target) {
      return search(nums, target, left, mid - 1);
  } else {
      return search(nums, target, mid + 1, right);
  }
};

// Time Complexity: O(logN)
// Auxiliary Space: O(1) 