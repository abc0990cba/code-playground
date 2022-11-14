// 6 kyu
// Feynman's square question
// https://www.codewars.com/kata/551186edce486caa61000f5c

// Task description:
// Richard Phillips Feynman was a well-known American physicist and a recipient of the Nobel Prize in Physics.
// He worked in theoretical physics and pioneered the field of quantum computing.

// Recently, an old farmer found some papers and notes that are believed to have belonged to Feynman.
// Among notes about mesons and electromagnetism, there was a napkin where he wrote a simple puzzle:
// "how many different squares are there in a grid of NxN squares?".
// For example, when N=2, the answer is 5: the 2x2 square itself, plus the four 1x1 squares in its corners

// Task
// Complete the function that solves Feynman's question in general. The input to your function will always be a positive integer.

// Examples:
// 1  -->   1
// 2  -->   5
// 3  -->  14

// Solution 1:
function countSquares(n) {
  let result = 0;
  
  for (let i = 0; i <= n; i++){
    result += (n - i) ** 2
  }
  
  return result;
}

// Solution 2:
function countSquares2(n) {
  if (n === 1) {
    return 1;
  }
  return n * n + countSquares(n - 1);
}

// Solution 3:
function countSquares3(n) {
  return n * (n + 1) * (2 * n + 1) / 6;
}

