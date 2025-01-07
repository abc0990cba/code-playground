/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const subsets = [];

  const subset = [];
  const backtrack = (idx) => {
    if(idx >= nums.length) {
      subsets.push([...subset]);
      return;
    }

    subset.push(nums[idx]);
    backtrack(idx+1);

    subset.pop();
    backtrack(idx+1);
  }

  backtrack(0);

  return subsets;
};

// Time: O(n*2^n)
// Space: O(n)