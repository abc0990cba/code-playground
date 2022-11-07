// 4 kyu
// Explosive Sum
// https://www.codewars.com/kata/52ec24228a515e620b0005ef

// Task description:
// How many ways can you make the sum of a number?
// From wikipedia: https://en.wikipedia.org/wiki/Partition_(number_theory)#
// In number theory and combinatorics, a partition of a positive integer n, also called an integer partition,
// is a way of writing n as a sum of positive integers. Two sums that differ only in the order of their summands
// are considered the same partition. If order matters, the sum becomes a composition. For example,
// 4 can be partitioned in five distinct ways:
// 4
// 3 + 1
// 2 + 2
// 2 + 1 + 1
// 1 + 1 + 1 + 1

// Examples:

// Basic:
// sum(1) // 1
// sum(2) // 2  -> 1+1 , 2
// sum(3) // 3 -> 1+1+1, 1+2, 3
// sum(4) // 5 -> 1+1+1+1, 1+1+2, 1+3, 2+2, 4
// sum(5) // 7 -> 1+1+1+1+1, 1+1+1+2, 1+1+3, 1+2+2, 1+4, 5, 2+3
// sum(10) // 42

// Explosive:
// sum(50) // 204226
// sum(80) // 15796476
// sum(100) // 190569292

// Solution 1
// https://yurukute.github.io/Blog/en/post/explosivesum/
function sum1(n) {
    const ways = new Array(n+1).fill(0);
    ways[0] = 1;
    for(let i = 1; i <= n; i++) {
        for(let j = i; j <= n; j++){
            ways[j] += ways[j - i];
        }
    }
    return ways[n];
}

// Solition 2
// https://yurukute.github.io/Blog/en/post/explosivesum/
let cache = [];
function sum2(num, prev = num) {
    if (num == 0) {
      return 1;
    }
  
    if (num < 0 || prev == 0) {
      return 0;
    }
  
    if (cache[num] && cache[num][prev]) {
      return cache[num][prev];
    }
  
    let total = sum(num, prev - 1) + sum(num - prev, prev);
  
    if (!cache[num]) {
        cache[num] = [];
    }
    cache[num][prev] = total;
  
    return total;
}
