// 4 kyu
// Strip Comments
// https://www.codewars.com/kata/51c8e37cee245da6b40000bd


// Task description:
// Complete the solution so that it strips all text that follows any of a set of comment markers passed in.
// Any whitespace at the end of the line should also be stripped out.

// Example:
// Given an input string of:

// apples, pears # and bananas
// grapes
// bananas !apples

// The output expected would be:
// apples, pears
// grapes
// bananas

// The code would be called like so:
// var result = solution("apples, pears # and bananas\ngrapes\nbananas !apples", ["#", "!"])
// result should == "apples, pears\ngrapes\nbananas"

// Solution 1
function solution(input, markers) {
  let resultArr = input.split('\n');
  
  for (let i = 0; i < markers.length; i++) {
    let reg = new RegExp(`\\${markers[i]}.+`, 'g');
    resultArr = resultArr.map(s => s.replace(reg, '').trim());
  }
  return resultArr.join('\n');
};

// Solution 2
function solution(input, markers) {
  //`RegExp(..)` has some reasonable utility: to dynamically define the pattern for a regular expression.
  //https://github.com/getify/You-Dont-Know-JS/blob/master/types%20%26%20grammar/ch3.md#object-function-and-regexp
  const pattern = new RegExp("[" + markers.join("") + "]");
  
  return (
    input
     .split("\n")
     .map((a) => 
            a.split(pattern)[0].trim())
     .join("\n")
  );
}
