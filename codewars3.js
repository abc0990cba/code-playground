// Task(4 kyu) description:
// In this kata you have to create all permutations of a non empty input string and remove duplicates,
// if present. This means, you have to shuffle all letters from the input in all possible orders.

// Examples:
// With input 'a'
// Your function should return: ['a']

// With input 'ab'
// Your function should return ['ab', 'ba']

// With input 'aabb'
// Your function should return ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

// Solution 1.
function permutations1(str) {
  if(str.length == 1) {
    return [str];
  }
  
  let arr = str.split('');
  let tmp = arr.slice();
  const heads = [];
  const result = [];
 
  arr.forEach((elem, i, arr) => {
    if(heads.indexOf(elem) == -1) {
      heads.push(elem);
      tmp.splice(tmp.indexOf(elem), 1); // Removes 1 item(elem)
      permutations(tmp.join('')).forEach((w) => result.push(elem + w));
      tmp.push(elem);
    }
  });
  return result;
}

// Solution 2.
const unique = xs => [...new Set(xs)];
const concat = (a, b) => [...a, ...b]; 
const drop = i => xs => [...xs.slice(0, i), ...xs.slice(i + 1)];

const permute = (x, i, xs) => 
  combinations(drop(i)(xs)).map(y => x + y);

const combinations = s =>
  s.length === 1 ? [s] : [...s].map(permute).reduce(concat);

const permutations2 = s => unique(combinations(s));
