/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function(n) {
  const arr = new Array(n+1).fill(0);
  
  for(let i = 0; i <= n; i++) {
    let num = i;
    while(num !== 0) {
      arr[i]++;
      num &= num - 1;
    }
  }

  return arr;
};