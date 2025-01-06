/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    const combinations = [];
    candidates.sort((a,b) => a-b);

    const backtrack = (idx, arr, total) => {
      if(total === target) {
        combinations.push([...arr]);
        return;
      }
      if(total > target || idx >= candidates.length) {
        return;
      }

      arr.push(candidates[idx]);
      backtrack(idx+1, arr, total + candidates[idx]);

      arr.pop();
      while(idx+1 < candidates.length && candidates[idx] === candidates[idx+1]) {
        idx++;
      }
      backtrack(idx+1, arr, total);
    }

    backtrack(0, [], 0);

    return combinations;
};