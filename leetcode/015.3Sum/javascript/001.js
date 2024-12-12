/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  const target = 0;
   
  for(let i = 0; i < nums.length; i++) {
    if(nums[i] > 0) break;
    if(i > 0 && nums[i] == nums[i-1]) continue;

    let l = i + 1;
    let r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
  
      if(sum < target) {
        l++;
      } else if (sum > target) {
        r--;
      } else {
        res.push([nums[i], nums[l], nums[r]])

        l++;
        r--
        while(l < r && nums[l] == nums[l-1]) {
          l++;
        }
      }
    }
  } 

  return res;
};

// Time: O(n^2)
// Space: O(1), because js sort(): O(n log n) time complexity and O(1) space complexity