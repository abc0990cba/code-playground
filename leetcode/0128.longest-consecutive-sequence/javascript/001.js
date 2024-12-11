/**
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function(nums) {
  const set = new Set(nums);
  let maxLen = 0;
  
  for(const num of nums) {
    if(!set.has(num - 1)) {
      let len = 1;
        
      while(set.has(num+len)) {
        len++;
      }
        
      maxLen = Math.max(maxLen, len);
    }
  }

  return maxLen;
};