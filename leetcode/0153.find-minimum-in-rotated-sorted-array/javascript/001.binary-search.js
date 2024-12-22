/**
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function(nums) {
  let res = nums[0];
  let l = 0;
  let r = nums.length - 1;

  while(l <= r){
    if(nums[l] < nums[r]) {
      res = Math.min(nums[l], res);
      break;
    }

    const mid = Math.floor((l + r) / 2);
    res = Math.min(nums[mid], res);

    if(nums[mid] >= nums[l]) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }

  return res;
};

// Time: O(log(n))
// Time: O(1)