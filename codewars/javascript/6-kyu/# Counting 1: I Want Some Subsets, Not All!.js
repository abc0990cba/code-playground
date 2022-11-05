// 6 kyu
// Counting 1: I Want Some Subsets, Not All!
// https://www.codewars.com/kata/591392af88a4994caa0000e0

// Task description
// We have a set of consecutive numbers from 1 to n.
// We want to count all the subsets that do not contain consecutive numbers.
// E.g. If our set S1 is equal to [1,2,3,4,5] The subsets that fulfill these property are:
// [1],[2],[3],[4],[5],[1,3],[1,4],[1,5],[2,4],[2,5],[3,5],[1,3,5]
// A total of 12 subsets.

// From the set S2 equals to [1,2,3], it is obvious that we have only 4 subsets and are:
// [1],[2],[3],[1,3]
// Make a code that may give the amount of all these subsets for any integer n >= 2    .

// Features of the random tests:
// number of tests = 100 
// 10 <= n <= 75

// Solution:
// using Fibonacci numbers
// https://math.stackexchange.com/questions/2121060/counting-the-number-of-non-consecutive-subsets-of-integers-from-1-to-n

// Version 1
function f(n) {
  const arr = [0, 1];

  while (arr.length <= n) {
    const lastNumIdx = arr.length - 1;
    const nextNum = arr[lastNumIdx] + arr[lastNumIdx - 1] + 1;
    arr.push(nextNum);
  }
  return arr[arr.length - 1];
}

// Version 2
function f(n) {
  let a = 0;
  let b = 1;

  for (let i = 1; i < n; i++) {
    [a, b] = [b, a + b + 1];
  }

  return b;
}
