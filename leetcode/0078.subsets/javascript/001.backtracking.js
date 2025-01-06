/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const subsets = [];

  const subset = [];
  const dfs = (idx) => {
    if(idx >= nums.length) {
      subsets.push([...subset]);
      return;
    }

    subset.push(nums[idx]);
    dfs(idx+1);

    subset.pop();
    dfs(idx+1);
  }

  dfs(0);

  return subsets;
};

// Time: O(n*2^n)
// Space: O(n)