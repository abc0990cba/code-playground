/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const topKFrequent = function(nums, k) {
  const count = {}

  for (const num of nums) {
      count[num] = (count[num] || 0) + 1;
  }

  const arr = Object.entries(count).map(([num, freq]) => [Number(num), freq]).sort((a, b) => b[1] - a[1]);

  return arr.slice(0, k).map(x => x[0]) 
};

// Time: O(nlog(n))
// Space: O(n)