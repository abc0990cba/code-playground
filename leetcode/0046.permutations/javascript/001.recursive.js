/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    if(!nums.length) return [[]];

    const perms = permute(nums.slice(1));
    const res = []
    for(const perm of perms) {
      for(let i = 0; i <= perm.length; i++) {
        const permCopy = [...perm];
        permCopy.splice(i, 0, nums[0]);
        res.push(permCopy)
      }
    }

    return res;
};