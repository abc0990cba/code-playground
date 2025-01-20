/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  const robForNoCycle = (arr) => {
    let a = 0;
    let b = 0;

    for(const num of arr) {
      const newB = Math.max(a + num, b);
      a = b;
      b = newB;
    }

    return b;
  }  

  return Math.max(
     nums[0],
     robForNoCycle(nums.slice(1)),
     robForNoCycle(nums.slice(0, -1))
  )
};