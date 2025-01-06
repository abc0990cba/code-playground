/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    const combinations = [];

    candidates.sort((a, b) => a - b);

    const backtrack = (idx, arr, total) => {
      if(total === target) {
        combinations.push([...arr]);
        return;
      }

      if(idx >= candidates.length || total > target) {
        return;
      }

      arr.push(candidates[idx]);
      backtrack(idx, arr, total + candidates[idx]);
      arr.pop();
      backtrack(idx+1, arr, total);
    }

    backtrack(0, [], 0);

    return combinations;
};