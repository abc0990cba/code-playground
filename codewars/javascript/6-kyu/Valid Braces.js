// 6 kyu
// Valid Braces
// https://www.codewars.com/kata/5277c8a221e209d3f6000b56

// Task description:
// Write a function that takes a string of braces, and determines if the order of the braces is valid.
// It should return true if the string is valid, and false if it's invalid.

// This Kata is similar to the Valid Parentheses Kata, but introduces new characters: brackets [],
// and curly braces {}. Thanks to @arnedag for the idea!

// All input strings will be nonempty, and will only consist of parentheses, brackets and curly braces: ()[]{}.

// What is considered Valid?
// A string of braces is considered valid if all braces are matched with the correct brace.

// Examples:
// "(){}[]"   =>  True
// "([{}])"   =>  True
// "(}"       =>  False
// "[(])"     =>  False
// "[({})](]" =>  False

// Solution 1
const bracesRegex = /\(\)|\[\]|\{\}/;

// recursively remove the inner right brackets
const validBraces = braces =>
  bracesRegex.test(braces)
    ? validBraces(braces.replace(bracesRegex, ''))
    : '' === braces;


// Solution 2
function validBraces(braces) {
  const matches = {
    '(':')',
    '{':'}',
    '[':']'
  };
  const stack = [];
  let currentChar;

  for (let i = 0; i < braces.length; i++) {
    currentChar = braces[i];
    
    if (matches[currentChar]) { 
      // opening braces
      stack.push(currentChar);
    } else { 
      // closing braces
      if (currentChar !== matches[stack.pop()]) {
        return false;
      }
    }
  }

  return stack.length === 0; 
}
