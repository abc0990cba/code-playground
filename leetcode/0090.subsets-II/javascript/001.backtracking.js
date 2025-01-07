/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    nums.sort((a, b) => a - b);

    const subsets = [];

    const backtrack = (i, subset) => {
      subsets.push([...subset]);

      for(let j = i; j < nums.length; j++) {
        if(j > i && nums[j] === nums[j-1]) {
          continue;
        }

        subset.push(nums[j]);
        backtrack(j+1, subset);
        subset.pop()
      }
    }

    backtrack(0, []);

    return subsets
};