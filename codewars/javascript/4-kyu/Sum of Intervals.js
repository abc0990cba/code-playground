// 4 kyu
// Sum of Intervals
// https://www.codewars.com/kata/52b7ed099cdc285c300001cd

// Task Description:
// Write a function called sumIntervals/sum_intervals() that accepts an array of intervals,
// and returns the sum of all the interval lengths. Overlapping intervals should only be counted once.
// Intervals
// Intervals are represented by a pair of integers in the form of an array.
// The first value of the interval will always be less than the second value.
// Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.
// Overlapping Intervals
// List containing overlapping intervals:
// [
//    [1,4],
//    [7, 10],
//    [3, 5]
// ]
// The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap,
// we can treat the interval as [1, 5], which has a length of 4.

// Examples:

// sumIntervals( [
//    [1,2],
//    [6, 10],
//    [11, 15]
// ] ); // => 9

// sumIntervals( [
//    [1,4],
//    [7, 10],
//    [3, 5]
// ] ); // => 7

// sumIntervals( [
//    [1,5],
//    [10, 20],
//    [1, 6],
//    [16, 19],
//    [5, 11]
// ] ); // => 19


// Solution 1
// Based  on https://gist.github.com/jricaldi/4c29ca1d74845835532d3d1340d36e17
// O(n) + O(n) + O(2n) = 3O(n) = O(n)
function sumIntervals1(intervals) {
  // O(n)
  intervals = intervals.sort((a, b)  => a[0] - b[0]);
  
  // O(n)
  intervals = intervals.reduce((acc, el, index, array) => { 
    const anterior = array[index - 1];
    const accLastIndex = acc.length - 1;
    
    if (array.length > 1 && anterior !== undefined) {
      if (el[0] < acc[accLastIndex]) {
        if (el[1] >= acc[accLastIndex]) {
          acc[accLastIndex] = el[1];
        }
      } else {
        acc.push(...el);
      }
    } else {
      acc.push(...el);
    }
    return acc;
  }, []);
  
  // O(2n)
  let result = 0;
  for (let i = 0; i < intervals.length - 1 ; i += 2) { 
    result += (intervals[i + 1] - intervals[i]);
  }
  
  return result;
} 


// Solution 2.
function sumIntervals2(intervals) {
  let intervalsSorted = intervals.sort(( [a, b], [c, d] ) => a - c);
  let max = -Number.MAX_VALUE;
  let result = 0;
  for (let [start, end] of intervalsSorted) {
    max = Math.max(max, start);
    result += Math.max(0, end - max);
    max = Math.max(max, end);
  }
  return result;
}
