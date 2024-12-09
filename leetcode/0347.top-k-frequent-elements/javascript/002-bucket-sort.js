/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function(nums, k) {
  const count = {}

  const freq = Array.from({ length: nums.length+1 }, () => []);

  for(const num of nums) {
    count[num] = (count[num] || 0) + 1; 
  }

  for(const c in count) {
    const fIdx = count[c];
    freq[fIdx].push(Number(c)); 
  }

  const res = [];
  
  for(let i = freq.length-1; i >= 0; i--) {
    for(const a of freq[i]) {
      res.push(a);
      if(res.length == k) return res;
    }
  } 
};

// Time: O(n)
// Space: O(n)