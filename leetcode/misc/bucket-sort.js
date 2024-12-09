/**
 * @param {number[]} bucket
 */
const insertionSort = (bucket) => {
  for(let i = 1; i < bucket.length; i++) {
    const key = bucket[i];
    let j = i - 1;
      
    while(j >= 0 && key<bucket[j]) {
      bucket[j+1] = bucket[j];
      j--;
    }
      
    bucket[j+1] = key;
  }
}


/**
* @param {number[]} nums
* @return {number[]}
*/
const bucketSort = function(nums) {
  const n = nums.length;
  const buckets = Array.from({length: n}, () => []);

  for(let i = 0; i < n; i++) {
    const bIdx = Math.floor(nums[i] * n);
    buckets[bIdx].push(nums[i]);
  }
  
  for(let i = 0; i < n; i++) {
    insertionSort(buckets[i]);
  }
 
  let idx = 0;
  for(let i = 0; i < buckets.length; i++) {
    for(let j = 0; j < buckets[i].length; j++) {
      nums[idx] = buckets[i][j];
      idx++;
    }
  }
};

const arr = [0.9, 0.2, 0, 0.3, 0.2, 0.7];
bucketSort(arr)
console.log(arr)