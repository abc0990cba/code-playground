// 6 kyu
// (Dis)member functions
// https://www.codewars.com/kata/545b860f82e55db165000554


// Task Description:
// As a part of this Kata, you need to write a function to dismember functions.
// You need to extract the names of all formal arguments of the function from its definition as an array.
// For example, given is a function as shown below:
// function add (a, b) {
//     return a + b;
// }
// Running dismember on the function would provide:
// dismember(add) => ["a", "b"]
// There could be functions that are declared without any explicitly named variables, for example:
// function average () {
//     return Array.prototype.slice.apply(arguments).reduce(function (a, c) {
//         return a + c;
//     }, 0) / arguments.length;
}
// I'm sure the above function implementation is not the best, it's not even great and would run into issues
// when no arguments are passed. For such functions, return an empty array.
// dismember(average) => []
// Please note: The internal implementation of the function holds no importance in this Kata,
// one just needs to dismember the arguments and return them in the sequence in which they are named.

// Solution 1
function dismember1 (func) {
  // \( - mathces character '('
  // .  - matches any character (except for line terminators)
  // *  - matches the previous token between zero and unlimited times, as many times as possible, giving back as needed (greedy)
  // \) - mathces character ')'
  const regExp = new RegExp(/\(.*\)/);
  let funcArgs = func.toString().match(regExp)[0];
  
  // no arguments
  // only two brackets
  if (funcArgs.length === 2) {
    return []
  }

  return (
    funcArgs
      .slice(1,-1)
      .split(',')
      .map(v => v.trim())
    )
}

// Solution 2
function dismember (func) {
  return func
    .toString()              // get function signature
    .match(/\((.*?)\)/)[1]   // extract params csv
    .split(/\s*,\s*/)        // split csv to params array
    .filter((a) => a);       // filter empty params
}
